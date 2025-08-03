import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Pedido } from 'src/app/core/models/pedido.model';
import { Produto } from 'src/app/core/models/produto.model';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { ProdutoService } from '../../../core/services/produto/produto.service';
import { EfetuarPedidoComponent } from './efetuar-pedido.component';

describe('EfetuarPedidoComponent', () => {
  let component: EfetuarPedidoComponent;
  let fixture: ComponentFixture<EfetuarPedidoComponent>;
  let pedidoServiceSpy: jasmine.SpyObj<PedidoService>;
  let produtoServiceSpy: jasmine.SpyObj<ProdutoService>;

  const produtoMock: Produto = {
    id: 1,
    nome: 'Produto Teste',
    preco: 100,
    estoque: 10
  };

  const pedidoMock: Pedido = {
    id: 1,
    produto: produtoMock,
    descricao: 'Pedido Teste',
    quantidade: 2,
    precoUnitario: 100,
    status: 'ativo'
  };

  beforeEach(async () => {
    pedidoServiceSpy = jasmine.createSpyObj('PedidoService', ['efetuar']);
    produtoServiceSpy = jasmine.createSpyObj('ProdutoService', ['listar', 'obterPorId', 'recalcularEstoque']);

    await TestBed.configureTestingModule({
      declarations: [EfetuarPedidoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PedidoService, useValue: pedidoServiceSpy },
        { provide: ProdutoService, useValue: produtoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EfetuarPedidoComponent);
    component = fixture.componentInstance;

    produtoServiceSpy.listar.and.returnValue(of([produtoMock]));
    produtoServiceSpy.obterPorId.and.returnValue(of(produtoMock));
    produtoServiceSpy.recalcularEstoque.and.returnValue(of({ ...produtoMock, estoque: 8 }));
    pedidoServiceSpy.efetuar.and.returnValue(of(pedidoMock));

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve popular produtos no ngOnInit', () => {
    expect(component.produtos.length).toBe(1);
    expect(component.produtos[0].nome).toBe('Produto Teste');
  });

  it('deve atualizar produtoSelecionado e precoUnitario ao trocar produto', () => {
    component.onValueChange(1);
    expect(produtoServiceSpy.obterPorId).toHaveBeenCalledWith(1);
    // O patchValue é chamado no subscribe, então precisamos aguardar o Observable
    fixture.whenStable().then(() => {
      expect(component.produtoSelecionado.id).toBe(1);
      expect(component.pedidoForm.get('precoUnitario')?.value).toBe(100);
    });
  });

  it('deve exibir erro se quantidade exceder estoque', () => {
    component.produtoSelecionado = { ...produtoMock };
    component.pedidoForm.setValue({
      produtoId: 1,
      descricao: 'Teste',
      quantidade: 20,
      precoUnitario: 100
    });

    component.efetuarPedido();

    expect(component.erro).toBe('Quantidade solicitada excede o estoque disponível.');
    expect(pedidoServiceSpy.efetuar).not.toHaveBeenCalled();
  });

  it('deve exibir erro se preço unitário não corresponder ao produto', () => {
    component.produtoSelecionado = { ...produtoMock };
    component.pedidoForm.setValue({
      produtoId: 1,
      descricao: 'Teste',
      quantidade: 2,
      precoUnitario: 999
    });

    component.efetuarPedido();

    expect(component.erro).toBe('Preço unitário não corresponde ao preço do produto selecionado.');
    expect(component.pedidoForm.get('precoUnitario')?.value).toBe(produtoMock.preco);
    expect(pedidoServiceSpy.efetuar).not.toHaveBeenCalled();
  });

  it('deve efetuar pedido com sucesso', () => {
    component.produtoSelecionado = { ...produtoMock };
    component.pedidoForm.setValue({
      produtoId: 1,
      descricao: 'Teste',
      quantidade: 2,
      precoUnitario: 100
    });

    component.efetuarPedido();

    expect(pedidoServiceSpy.efetuar).toHaveBeenCalled();
    expect(produtoServiceSpy.recalcularEstoque).toHaveBeenCalledWith(1, 8);
    expect(component.mensagem).toBe('Pedido efetuado com sucesso!');
    expect(component.erro).toBe('');
  });

  it('deve exibir erro se formulário for inválido', () => {
    component.pedidoForm.setValue({
      produtoId: null,
      descricao: '',
      quantidade: 0,
      precoUnitario: 0
    });

    component.efetuarPedido();

    expect(component.erro).toBeTruthy();
    expect(pedidoServiceSpy.efetuar).not.toHaveBeenCalled();
  });
});

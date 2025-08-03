import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarPedidosComponent } from './listar-pedidos.component';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { ProdutoService } from '../../../core/services/produto/produto.service';
import { of } from 'rxjs';
import { Pedido } from '../../../core/models/pedido.model';
import { Produto } from '../../../core/models/produto.model';

describe('ListarPedidosComponent', () => {
  let component: ListarPedidosComponent;
  let fixture: ComponentFixture<ListarPedidosComponent>;
  let pedidoServiceSpy: jasmine.SpyObj<PedidoService>;
  let produtoServiceSpy: jasmine.SpyObj<ProdutoService>;

  const produtoMock: Produto = {
    id: 1,
    nome: 'Produto Teste',
    preco: 100,
    estoque: 10
  };

  const pedidosMock: Pedido[] = [
    {
      id: 1,
      produto: produtoMock,
      descricao: 'Pedido 1',
      quantidade: 2,
      precoUnitario: 100,
      status: 'ativo'
    }
  ];

  beforeEach(async () => {
    pedidoServiceSpy = jasmine.createSpyObj('PedidoService', ['listar', 'cancelar']);
    produtoServiceSpy = jasmine.createSpyObj('ProdutoService', ['obterPorId', 'recalcularEstoque']);

    await TestBed.configureTestingModule({
      declarations: [ListarPedidosComponent],
      providers: [
        { provide: PedidoService, useValue: pedidoServiceSpy },
        { provide: ProdutoService, useValue: produtoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarPedidosComponent);
    component = fixture.componentInstance;

    pedidoServiceSpy.listar.and.returnValue(of(pedidosMock));
    pedidoServiceSpy.cancelar.and.returnValue(of(pedidosMock[0]));
    produtoServiceSpy.obterPorId.and.returnValue(of(produtoMock));
    produtoServiceSpy.recalcularEstoque.and.returnValue(of({ ...produtoMock, estoque: 12 }));

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar pedidos no ngOnInit', () => {
    expect(pedidoServiceSpy.listar).toHaveBeenCalled();
    expect(component.pedidos.length).toBe(1);
    expect(component.pedidos[0].descricao).toBe('Pedido 1');
  });

  it('deve carregar pedidos ao chamar carregarPedidos', () => {
    component.pedidos = [];
    component.carregarPedidos();
    expect(component.pedidos.length).toBe(1);
  });

  it('deve cancelar pedido e recalcular estoque', () => {
    spyOn(component, 'carregarPedidos').and.callThrough();

    component.cancelarPedido(pedidosMock[0]);

    expect(pedidoServiceSpy.cancelar).toHaveBeenCalledWith(1);
    expect(produtoServiceSpy.obterPorId).toHaveBeenCalledWith(1);
    expect(produtoServiceSpy.recalcularEstoque).toHaveBeenCalledWith(1, 12);
    expect(component.mensagem).toContain('Pedido #1 cancelado com sucesso.');
    expect(component.carregarPedidos).toHaveBeenCalled();
  });
});

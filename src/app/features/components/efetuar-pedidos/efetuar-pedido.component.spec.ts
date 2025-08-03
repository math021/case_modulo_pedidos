import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { EfetuarPedidoComponent } from './efetuar-pedido.component';

describe('EfetuarPedidoComponent', () => {
  let component: EfetuarPedidoComponent;
  let fixture: ComponentFixture<EfetuarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EfetuarPedidoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ProdutoService,
          useValue: {
            listar: () => of([{ id: 1, nome: 'Produto Teste', preco: 100, estoque: 5 }])
          }
        },
        {
          provide: PedidoService,
          useValue: {
            efetuar: () => of({})
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EfetuarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar o formulário inválido no início', () => {
    expect(component.pedidoForm.valid).toBeFalse();
  });

  it('deve permitir submeter pedido válido após selecionar produto', () => {
    component.pedidoForm.get('produtoId')?.setValue(1);
    fixture.detectChanges();

    const preco = component.pedidoForm.get('precoUnitario')?.value;
    expect(preco).toBe(100);

    component.pedidoForm.get('descricao')?.setValue('Pedido de teste');
    component.pedidoForm.get('quantidade')?.setValue(2);

    expect(component.pedidoForm.valid).toBeTrue();
  });

  it('deve exibir erro se quantidade exceder o estoque disponível', () => {
    component.pedidoForm.get('produtoId')?.setValue(1);
    component.pedidoForm.get('quantidade')?.setValidators([
      Validators.required,
      Validators.min(1)
    ]);

    component.pedidoForm.get('descricao')?.setValue('Teste excedente');
    component.pedidoForm.get('quantidade')?.setValue(11); // maior que estoque
    component.pedidoForm.get('precoUnitario')?.setValue(100);

    component.pedidoForm.updateValueAndValidity();
    fixture.detectChanges();

    component.efetuarPedido();

    expect(component.erro).toBe('Quantidade solicitada excede o estoque disponível.');
    expect(component.mensagem).toBe('');
  });

});

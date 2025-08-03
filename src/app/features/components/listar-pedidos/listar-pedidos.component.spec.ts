import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarPedidosComponent } from './listar-pedidos.component';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { of } from 'rxjs';

describe('ListarPedidosComponent', () => {
  let component: ListarPedidosComponent;
  let fixture: ComponentFixture<ListarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPedidosComponent],
      providers: [
        {
          provide: PedidoService,
          useValue: {
            listar: () => of([
              {
                id: 1,
                produtoId: 1,
                descricao: 'Pedido 1',
                quantidade: 2,
                precoUnitario: 100,
                status: 'ativo'
              }
            ]),
            cancelar: () => of({})
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar pedidos', () => {
    expect(component.pedidos.length).toBe(1);
    expect(component.pedidos[0].descricao).toContain('Pedido 1');
  });
});

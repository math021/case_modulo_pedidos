import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PedidoService } from './pedido.service';
import { Pedido } from '../../models/pedido.model';

describe('PedidoService', () => {
  let service: PedidoService;
  let httpMock: HttpTestingController;

  const dummyPedidos: Pedido[] = [
    {
      id: 1,
      produtoId: 1,
      descricao: 'Pedido teste',
      quantidade: 2,
      precoUnitario: 100,
      status: 'ativo'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PedidoService]
    });
    service = TestBed.inject(PedidoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve retornar pedidos ativos (GET)', () => {
    service.listar().subscribe(pedidos => {
      expect(pedidos.length).toBe(1);
      expect(pedidos).toEqual(dummyPedidos);
    });

    const req = httpMock.expectOne('http://localhost:3000/pedidos?status=ativo');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPedidos);
  });

  it('deve efetuar pedido (POST)', () => {
    const novoPedido = dummyPedidos[0];

    service.efetuar(novoPedido).subscribe(pedido => {
      expect(pedido).toEqual(novoPedido);
    });

    const req = httpMock.expectOne('http://localhost:3000/pedidos');
    expect(req.request.method).toBe('POST');
    req.flush(novoPedido);
  });

  it('deve cancelar pedido (PATCH)', () => {
    const pedidoCancelado = { ...dummyPedidos[0], status: 'cancelado' };

    service.cancelar(1).subscribe(pedido => {
      expect(pedido.status).toBe('cancelado');
    });

    const req = httpMock.expectOne('http://localhost:3000/pedidos/1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: 'cancelado' });
    req.flush(pedidoCancelado);
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProdutoService } from './produto.service';
import { Produto } from '../../models/pedido.model';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let httpMock: HttpTestingController;

  const dummyProdutos: Produto[] = [
    { id: 1, nome: 'Notebook', preco: 3500, estoque: 10 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProdutoService]
    });
    service = TestBed.inject(ProdutoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve listar produtos (GET)', () => {
    service.listar().subscribe(produtos => {
      expect(produtos.length).toBe(1);
      expect(produtos).toEqual(dummyProdutos);
    });

    const req = httpMock.expectOne('http://localhost:3000/produtos');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProdutos);
  });

  it('deve buscar produto por ID (GET)', () => {
    const produto = dummyProdutos[0];

    service.obterPorId(1).subscribe(res => {
      expect(res).toEqual(produto);
    });

    const req = httpMock.expectOne('http://localhost:3000/produtos/1');
    expect(req.request.method).toBe('GET');
    req.flush(produto);
  });
});

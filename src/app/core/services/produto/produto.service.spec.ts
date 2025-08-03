import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProdutoService } from './produto.service';
import { Produto } from '../../models/produto.model';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let httpMock: HttpTestingController;

  const dummyProdutos: Produto[] = [
    { id: 1, nome: 'Produto Teste', preco: 100, estoque: 10 },
    { id: 2, nome: 'Outro Produto', preco: 200, estoque: 5 }
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
      expect(produtos.length).toBe(2);
      expect(produtos).toEqual(dummyProdutos);
    });

    const req = httpMock.expectOne('http://localhost:3000/produtos');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProdutos);
  });

  it('deve recalcular estoque (PATCH)', () => {
    const produtoAtualizado = { ...dummyProdutos[0], estoque: 7 };

    service.recalcularEstoque(1, 7).subscribe(produto => {
      expect(produto.estoque).toBe(7);
    });

    const req = httpMock.expectOne('http://localhost:3000/produtos/1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ estoque: 7 });
    req.flush(produtoAtualizado);
  });

  it('deve obter produto por ID (GET)', () => {
    const produto = dummyProdutos[1];

    service.obterPorId(2).subscribe(res => {
      expect(res).toEqual(produto);
    });

    const req = httpMock.expectOne('http://localhost:3000/produtos/2');
    expect(req.request.method).toBe('GET');
    req.flush(produto);
  });
});

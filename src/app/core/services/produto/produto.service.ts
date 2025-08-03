import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private baseUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  recalcularEstoque(produtoId: number, quantidadeRecalculada: number): Observable<Produto> {
    return this.http.patch<Produto>(`${this.baseUrl}/${produtoId}`, { estoque: quantidadeRecalculada });
  }

  obterPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }
}

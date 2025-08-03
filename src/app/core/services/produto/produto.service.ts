import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Produto } from '../../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private baseUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl).pipe(
      catchError(err => {
        console.log('Erro ao listar produtos:', err);
        alert('Erro ao carregar produtos. Tente novamente mais tarde.');
        return throwError(() => err);
      })
    );
  }

  listarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.log(`Erro ao obter produto ID: ${id}:`, err);
        alert(`Erro ao buscar detalhes do produto #${id}.`);
        return throwError(() => err);
      })
    );
  }

  recalcularEstoque(produtoId: number, quantidadeAjustada: number): Observable<Produto> {
    return this.http.patch<Produto>(`${this.baseUrl}/${produtoId}`, { estoque: quantidadeAjustada }).pipe(
      catchError(err => {
        console.log(`Erro ao recalcular estoque do produto ID: ${produtoId}:`, err);
        alert(`Erro ao recalcular estoque do produto #${produtoId}.`);
        return throwError(() => err);
      })
    );;
  }
}

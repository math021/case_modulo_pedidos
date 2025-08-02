import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private baseUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  obterPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }
}

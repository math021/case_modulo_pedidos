import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private baseUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}?status=ativo`);
  }

  efetuar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl, pedido);
  }

  cancelar(id: number): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.baseUrl}/${id}`, { status: 'cancelado' });
  }
}

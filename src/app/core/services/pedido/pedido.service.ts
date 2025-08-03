import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pedido } from '../../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private baseUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}?status=ativo`).pipe(
      catchError(err => {
        console.log('Erro ao listar pedidos:', err);
        alert('Erro ao carregar pedidos. Tente novamente mais tarde.');
        return throwError(() => err);
      })
    );
  }

  efetuar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl, pedido).pipe(
      catchError(err => {
        console.log('Erro ao efetuar pedido:', err);
        alert('Não foi possível efetuar o pedido. Verifique os dados ou tente novamente.');
        return throwError(() => err);
      })
    );
  }

  cancelar(id: number): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.baseUrl}/${id}`, { status: 'cancelado' }).pipe(
      catchError(err => {
        console.log(`Erro ao cancelar pedido ID ${id}:`, err);
        alert(`Erro ao cancelar o pedido #${id}.`);
        return throwError(() => err);
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido.service';
import { Pedido } from '../../../core/models/pedido.model';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.scss']
})
export class ListarPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  mensagem: string = '';

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.pedidoService.listar().subscribe(pedidos => this.pedidos = pedidos);
  }

  cancelarPedido(id: number) {
    this.pedidoService.cancelar(id).subscribe(() => {
      this.mensagem = `Pedido #${id} cancelado com sucesso.`;
      this.carregarPedidos();
    });
  }
}
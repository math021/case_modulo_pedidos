import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../../core/services/pedido.service';
import { Pedido } from '../../../../core/models/pedido.model';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html'
})
export class ListarPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.pedidoService.listar().subscribe(pedidos => this.pedidos = pedidos);
  }
}
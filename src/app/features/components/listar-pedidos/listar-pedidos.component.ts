import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { Pedido } from '../../../core/models/pedido.model';
import { PedidoService } from '../../../core/services/pedido/pedido.service';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.scss']
})
export class ListarPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  mensagem: string = '';

  constructor(
    private pedidoService: PedidoService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.pedidoService.listar().subscribe((pedidos) => {
      this.pedidos = pedidos
    })
  }

  cancelarPedido(pedido: Pedido) {
    this.pedidoService.cancelar(pedido.id).subscribe(() => {

      this.produtoService.obterPorId(pedido.produto.id).subscribe(produto => {
        this.produtoService.recalcularEstoque(produto.id, produto.estoque + pedido.quantidade).subscribe();
      });

      this.mensagem = `Pedido #${pedido.id} cancelado com sucesso.`;
      this.carregarPedidos();
    });
  }


}

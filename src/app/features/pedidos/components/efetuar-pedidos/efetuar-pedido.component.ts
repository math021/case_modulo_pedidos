import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../../../core/services/pedido.service';
import { Pedido } from '../../../../core/models/pedido.model';

@Component({
  selector: 'app-efetuar-pedido',
  templateUrl: './efetuar-pedido.component.html'
})
export class EfetuarPedidoComponent {
  pedidoForm: FormGroup;

  constructor(private fb: FormBuilder, private pedidoService: PedidoService) {
    this.pedidoForm = this.fb.group({
      descricao: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      precoUnitario: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  efetuarPedido() {
    if (this.pedidoForm.valid) {
      const pedido: Pedido = {
        ...this.pedidoForm.value,
        status: 'ativo',
        id: 0 // será ignorado no JSON Server
      };
      this.pedidoService.efetuar(pedido).subscribe();
    }
  }
}
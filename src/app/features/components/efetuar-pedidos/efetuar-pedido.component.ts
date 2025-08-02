import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { ProdutoService } from '../../../core/services/produto/produto.service';
import { Pedido, Produto } from '../../../core/models/pedido.model';

@Component({
  selector: 'app-efetuar-pedido',
  templateUrl: './efetuar-pedido.component.html',
  styleUrls: ['./efetuar-pedido.component.scss']
})
export class EfetuarPedidoComponent implements OnInit {
  pedidoForm: FormGroup;
  produtos: Produto[] = [];
  estoqueDisponivel: number = 0;
  precoUnitario: number = 0;
  mensagem: string = '';
  erro: string = '';

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService
  ) {
    this.pedidoForm = this.fb.group({
      produtoId: [null, Validators.required],
      descricao: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      precoUnitario: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit() {
    this.produtoService.listar().subscribe(produtos => this.produtos = produtos);

    this.pedidoForm.get('produtoId')?.valueChanges.subscribe((produtoId) => {
      const produto = this.produtos.find(p => p.id === +produtoId);
      if (produto) {
        this.estoqueDisponivel = produto.estoque;
        this.precoUnitario = produto.preco;
        this.pedidoForm.patchValue({ precoUnitario: produto.preco });
      }
    });
  }

  efetuarPedido() {
    if (this.pedidoForm.valid) {
      const formValue = this.pedidoForm.getRawValue();

      if (formValue.quantidade > this.estoqueDisponivel) {
        this.erro = 'Quantidade solicitada excede o estoque disponível.';
        return;
      }

      const pedido: Pedido = {
        id: 0,
        produtoId: formValue.produtoId,
        descricao: formValue.descricao,
        quantidade: formValue.quantidade,
        precoUnitario: formValue.precoUnitario,
        status: 'ativo'
      };

      this.pedidoService.efetuar(pedido).subscribe(() => {
        this.mensagem = 'Pedido efetuado com sucesso!';
        this.erro = '';
        this.pedidoForm.reset();
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/core/models/produto.model';
import { Pedido } from '../../../core/models/pedido.model';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { ProdutoService } from '../../../core/services/produto/produto.service';

@Component({
  selector: 'app-efetuar-pedido',
  templateUrl: './efetuar-pedido.component.html',
  styleUrls: ['./efetuar-pedido.component.scss']
})
export class EfetuarPedidoComponent implements OnInit {
  pedidoForm: FormGroup;
  produtos: Produto[] = [];
  produtoSelecionado: Produto = {} as Produto;
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
      precoUnitario: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.produtoService.listar().subscribe(produtos => this.produtos = produtos);
    this.pedidoForm.get('produtoId')?.valueChanges.subscribe((produtoId) => {
      if (produtoId) this.onValueChange(produtoId);
    });
  }

  onValueChange(produtoId: number) {
    this.produtoService.listarPorId(produtoId).subscribe(produto => {
      if (produto) {
        this.produtoSelecionado = produto;

        this.pedidoForm.patchValue({ precoUnitario: produto.preco });
        //força a revalidação do campo
        this.pedidoForm.get('precoUnitario')?.updateValueAndValidity();
      }
    });
  }

  efetuarPedido() {
    if (this.pedidoForm.valid) {
      const rawForm = this.pedidoForm.getRawValue();

      if (rawForm.quantidade > this.produtoSelecionado.estoque) {
        this.erro = 'Quantidade solicitada excede o estoque disponível.';
        return;
      }

      if (rawForm.precoUnitario !== this.produtoSelecionado.preco) {
        this.pedidoForm.get('precoUnitario')?.setValue(this.produtoSelecionado.preco);
        this.erro = 'Preço unitário não corresponde ao preço do produto selecionado.';
        return;
      }

      const pedido: Pedido = {
        id: 0,
        produto: this.produtoSelecionado,
        descricao: rawForm.descricao,
        quantidade: rawForm.quantidade,
        precoUnitario: rawForm.precoUnitario,
        status: 'ativo'
      };

      this.pedidoService.efetuar(pedido).subscribe(() => {
        this.mensagem = 'Pedido efetuado com sucesso!';
        this.erro = '';
        this.pedidoForm.reset();
      });

      this.produtoService
        .recalcularEstoque(pedido.produto.id, pedido.produto.estoque - pedido.quantidade)
        .subscribe((res) => {
          this.produtoSelecionado.estoque = res.estoque;
        });
    } else {
      Object.keys(this.pedidoForm.controls).forEach(field => {
        const control = this.pedidoForm.get(field);
        if (control?.errors) {
          if (field === 'produtoId') this.erro = 'Selecione um produto válido.';
          if (field === 'descricao') this.erro = 'Descrição é obrigatória.';
          if (field === 'quantidade') this.erro = 'Quantidade deve ser maior que zero e não exceder o estoque.'
          if (field === 'precoUnitario') this.erro = 'Preço unitário não corresponde ao preço do produto selecionado.';
        }
      })
    }
  }
}

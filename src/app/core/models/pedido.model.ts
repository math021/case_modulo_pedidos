export interface Pedido {
  id: number;
  produtoId: number;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  status: 'ativo' | 'cancelado';
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

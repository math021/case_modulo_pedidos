import { Produto } from "./produto.model";

export interface Pedido {
  id: number;
  produto: Produto;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  status: 'ativo' | 'cancelado';
}

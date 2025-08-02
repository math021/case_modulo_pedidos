import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPedidosComponent } from './features/components/listar-pedidos/listar-pedidos.component';
import { EfetuarPedidoComponent } from './features/components/efetuar-pedidos/efetuar-pedido.component';

const routes: Routes = [
  { path: 'pedidos', component: ListarPedidosComponent },
  { path: 'pedidos/novo', component: EfetuarPedidoComponent },
  { path: '', redirectTo: 'pedidos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

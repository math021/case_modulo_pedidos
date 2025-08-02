import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ListarPedidosComponent } from './features/pedidos/components/listar-pedidos/listar-pedidos.component';
import { EfetuarPedidoComponent } from './features/pedidos/components/efetuar-pedidos/efetuar-pedido.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarPedidosComponent,
    EfetuarPedidoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
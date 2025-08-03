import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EfetuarPedidoComponent } from './features/components/efetuar-pedidos/efetuar-pedido.component';
import { ListarPedidosComponent } from './features/components/listar-pedidos/listar-pedidos.component';

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
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModule } from '../bootstrap.module' ; 
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProductsComponent } from './products/products.component';
import { CarrinhoService } from '../services/carrinho.service';


@NgModule({
  declarations: [
    HeaderComponent,
    UserComponent,
    ProductsComponent,
  ],
  imports: [
    BootstrapModule,
    ModalModule.forRoot(),
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    RouterModule.forChild([
      // Defina as rotas específicas do User aqui
      { path: '', component: UserComponent }, // Exemplo de rota para a página principal do User
    ])
  ],
  providers: [CarrinhoService]
})
export class UserModule { }

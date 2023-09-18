import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModule } from '../bootstrap.module' ; 
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminComponent,
    ProductsComponent
  ],
  imports: [
    BootstrapModule,
    ModalModule.forRoot(),
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule, // Adicione o HttpClientModule aqui
    FormsModule,
    RouterModule.forChild([
      // Defina as rotas específicas do admin aqui
      { path: '', component: AdminComponent }, // Exemplo de rota para a página principal do admin
    ])
  ]
})
export class AdminModule { }

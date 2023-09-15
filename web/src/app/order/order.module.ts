import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalizeOrderComponent } from './finalize-order/finalize-order.component';
import { OrderComponent } from './order.component';
import { CarrinhoService } from '../services/carrinho.service';


@NgModule({
  declarations: [
    FinalizeOrderComponent,
    OrderComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [CarrinhoService]
})
export class OrderModule { }

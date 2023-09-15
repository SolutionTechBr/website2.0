import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { OrderComponent } from './order/order.component';
import { OrderModule } from './order/order.module';

const routes: Routes = [
    { path: 'user', component: UserComponent, title:'Cátalogo' },
    { path: 'admin', component: AdminComponent, title:'Cátalogo' },
    { path: 'pedido', component: OrderComponent, title:'Pedido' },
    // Pode adicionar mais rotas aqui, como uma página de login, etc.
    { path: '', redirectTo: '/user', pathMatch: 'full' }, // Redirecionar para /user por padrão
];


@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      UserModule, // Adicione o UserModule aqui
      AdminModule, // Adicione o AdminModule aqui
      OrderModule, //Adicionando o modulo Fializar Compra
    ],
  exports: [RouterModule],  
})

export class AppRoutingModule { }
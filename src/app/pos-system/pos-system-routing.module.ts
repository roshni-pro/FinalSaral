import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBackendOrderComponent } from './Component/create-backend-order/create-backend-order.component';
import { BackedOrderInvoiceComponent } from './Component/backed-order-invoice/backed-order-invoice.component';


const routes: Routes = [
  {
    path: 'BackendOrderList',
    component: CreateBackendOrderComponent
  },
  {
    path: 'BackedOrderInvoice/:orderid',
    component: BackedOrderInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosSystemRoutingModule { }

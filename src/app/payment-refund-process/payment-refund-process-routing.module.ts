import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefundPaymentComponent } from './components/refund-payment/refund-payment.component';

const routes: Routes = [
  {
    path: 'refundPayment',
    component: RefundPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRefundProcessRoutingModule { }

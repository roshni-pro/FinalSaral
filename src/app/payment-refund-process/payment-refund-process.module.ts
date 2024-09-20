import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PaymentRefundProcessRoutingModule } from './payment-refund-process-routing.module';
import { RefundPaymentComponent } from './components/refund-payment/refund-payment.component';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [RefundPaymentComponent],
  imports: [
    CommonModule,
    PaymentRefundProcessRoutingModule,
    ShaopkiranaSharedModule,
    TabMenuModule,
    NgbModule,
    SharedModule

  ]
})
export class PaymentRefundProcessModule { }

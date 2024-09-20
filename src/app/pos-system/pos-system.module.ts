import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosSystemRoutingModule } from './pos-system-routing.module';
import { CreateBackendOrderComponent } from './Component/create-backend-order/create-backend-order.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { BackedOrderInvoiceComponent } from './Component/backed-order-invoice/backed-order-invoice.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [CreateBackendOrderComponent, BackedOrderInvoiceComponent],
  imports: [
    CommonModule,
    PosSystemRoutingModule,
    SkSharedModule,
    FormsModule,
    ShaopkiranaSharedModule,
    NgxPrintModule
  ]
})
export class PosSystemModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { OrderRoutingModule } from './order-routing.module';
import { RedeemMasterComponent } from './components/redeem-master/redeem-master.component';
import { NgxPrintModule } from 'ngx-print';
import { OrderSettleComponent } from './components/order-settle/order-settle.component';
import { PendingOrderComponent } from './components/pending-order/pending-order.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from "primeng/calendar";
import { MopComponent } from './components/mop/mop.component';
import { EtaUpdateOrderComponent } from './components/eta-update-order/eta-update-order.component';
import { ExpectedRtdDateComponent } from './components/expected-rtd-date/expected-rtd-date.component';


@NgModule({
  declarations: [RedeemMasterComponent, OrderSettleComponent, PendingOrderComponent, MopComponent, EtaUpdateOrderComponent, ExpectedRtdDateComponent],
  // declarations: [RedeemMasterComponent, PendingOrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    NgbModule,
    DialogModule,
    ButtonModule,
    NgxPrintModule,
    InputTextModule,
    CalendarModule
  ]
})
export class OrderModule { }

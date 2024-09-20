import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';

import { OrderMasterRoutingModule } from './order-master-routing.module';
import { OrderMasterComponent } from './order-master/order-master.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgxPrintModule } from 'ngx-print';
import { InvoiceDispatchComponent } from './invoice-dispatch/invoice-dispatch.component';
import { MarketingDashboardComponent } from './marketing-dashboard/marketing-dashboard.component';


@NgModule({
  declarations: [OrderMasterComponent, InvoiceComponent, InvoiceDispatchComponent, MarketingDashboardComponent],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DynamicDialogModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    OrderMasterRoutingModule,
    NgxPrintModule,
  ]
})
export class OrderMasterModule { }

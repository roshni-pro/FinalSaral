import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStatusSalseReportRoutingModule } from './order-status-salse-report-routing.module';
import { OrderStatusSalseReportComponent } from './components/order-status-salse-report/order-status-salse-report.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderStatusSalseReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    OrderStatusSalseReportRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class OrderStatusSalseReportModule { }

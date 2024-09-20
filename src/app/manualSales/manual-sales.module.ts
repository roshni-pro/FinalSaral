import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualSalesRoutingModule } from './manual-sales-routing.module';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ManualSalesOrdersComponent } from './manual-sales-orders/manual-sales-orders.component';
import { AddManualSalesOrderComponent } from './add-manual-sales-order/add-manual-sales-order.component';


@NgModule({
  declarations: [ManualSalesOrdersComponent, AddManualSalesOrderComponent],

  imports: [
    CommonModule,
    ManualSalesRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule

  ]


})
export class ManualSalesModule { }

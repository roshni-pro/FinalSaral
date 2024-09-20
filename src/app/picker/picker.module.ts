import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickerRoutingModule } from './picker-routing.module';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { OrderPickerComponent } from './components/order-picker/order-picker.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { PrintOrderItemComponent } from './components/print-order-item/print-order-item.component';
import { NgxPrintModule } from 'ngx-print';
import { OrderPickerViewComponent } from './components/order-picker-view/order-picker-view.component';
import { PickerStatisticComponent } from './components/picker-statistic/picker-statistic.component';
import { OrderPickerReiviewerComponent } from './components/order-picker-reiviewer/order-picker-reiviewer.component';
import { OrdermasterComponent } from './components/ordermaster/ordermaster.component';
import { PickerMongoOrderComponent } from './components/picker-mongo-order/picker-mongo-order.component';
import { RejectedPickerComponent } from './components/rejected-picker/rejected-picker.component';
import { RejectedPickerReportComponent } from './components/rejected-picker-report/rejected-picker-report.component';



@NgModule({
  declarations: [OrderPickerComponent, OrderDetailComponent, PrintOrderItemComponent, OrderPickerViewComponent, PickerStatisticComponent, OrderPickerReiviewerComponent, OrdermasterComponent, PickerMongoOrderComponent, RejectedPickerComponent, RejectedPickerReportComponent],

  imports: [
    CommonModule,
    PickerRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    NgxPrintModule

  ]


})
export class PickerModule { }

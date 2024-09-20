import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';

import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { TradeModule } from 'app/trade/trade.module';
import { OpreportsRoutingModule } from './opreports-routing.module';
import { OpreportdisplayComponent } from './components/opreportdisplay/opreportdisplay.component';
import { OrderProcessReportComponent } from './components/order-process-report/order-process-report.component';


@NgModule({
  declarations: [OpreportdisplayComponent, OrderProcessReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    NgbModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule,
    BlockUIModule,
    OpreportsRoutingModule,
    CommonModule,
    TradeModule,
    ShaopkiranaSharedModule,
    SkSharedModule,
    CalendarModule,
    DialogModule,
    MultiSelectModule,
    OpreportsRoutingModule
  ]
})
export class OpreportsModule { }

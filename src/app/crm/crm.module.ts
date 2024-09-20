import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from "primeng/calendar";
import {DialogModule} from 'primeng/dialog';

import { CrmRoutingModule } from './crm-routing.module';
import { FirstTimeOrderComponent } from './components/first-time-order/first-time-order.component'
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { InActiveCustOrderComponent } from './components/in-active-cust-order/in-active-cust-order.component';


@NgModule({
  declarations: [FirstTimeOrderComponent, InActiveCustOrderComponent],
  imports: [
    CommonModule,
    CrmRoutingModule,
    ShaopkiranaSharedModule,
    CalendarModule,
    DialogModule
  ]
})
export class CrmModule { }

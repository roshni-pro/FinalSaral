import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { DamageviewOrderRoutingModule } from './damageview-order-routing.module';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DamageviewOrderComponent } from './components/damageview-order/damageview-order.component';


@NgModule({
  declarations: [DamageviewOrderComponent],
  imports: [
    CommonModule,
    DamageviewOrderRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DynamicDialogModule,
    DropdownModule,
    ShaopkiranaSharedModule
  ]
})
export class DamageviewOrderModule { }
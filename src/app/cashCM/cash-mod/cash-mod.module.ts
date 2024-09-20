import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashModRoutingModule } from './cash-mod-routing.module';
import { CashCompComponent } from './cash-comp/cash-comp.component';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms'; 
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [CashCompComponent],
  imports: [
    CommonModule,
    CashModRoutingModule,
    CardModule,DropdownModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule ,
    CalendarModule,
    // ShaopkiranaSharedModule
  ]
})
export class CashModModule { }

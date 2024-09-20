import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


import { CurrentNetStockRoutingModule } from './current-net-stock-routing.module';
import { CurrentnetStockComponent } from './components/currentnet-stock/currentnet-stock.component';


@NgModule({
  declarations: [CurrentnetStockComponent],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DynamicDialogModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    CurrentNetStockRoutingModule
  ]
})
export class CurrentNetStockModule { }

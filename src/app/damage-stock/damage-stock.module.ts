import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';

import { DamageStockRoutingModule } from './damage-stock-routing.module';
import { DamagestockComponent } from './components/damagestock/damagestock.component';


@NgModule({
  declarations: [DamagestockComponent],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DynamicDialogModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    DamageStockRoutingModule
  ]
})
export class DamageStockModule { }

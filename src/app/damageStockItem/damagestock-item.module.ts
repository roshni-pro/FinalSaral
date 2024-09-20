import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';

import { DamagestockItemRoutingModule } from './damagestock-item-routing.module';
import { DamagestockItemComponent } from './components/damagestock-item/damagestock-item.component';


@NgModule({
  declarations: [
    DamagestockItemComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DynamicDialogModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    DamagestockItemRoutingModule
  ]
})
export class DamagestockItemModule { }

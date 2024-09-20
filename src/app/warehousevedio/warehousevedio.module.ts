import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousevedioRoutingModule } from './warehousevedio-routing.module';
import {TableModule} from 'primeng/table';


//import { AddPeopleComponent } from './components/people-add/people-add.component';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AddwarehouseVedioComponent } from './component/addwarehouse-vedio/addwarehouse-vedio.component';
import { WarehousesvedioDetailComponent } from './component/warehousesvedio-detail/warehousesvedio-detail.component';
import { WarehouseVedioComponent } from './component/warehouse-vedio/warehouse-vedio.component';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  declarations: [AddwarehouseVedioComponent,WarehousesvedioDetailComponent,WarehouseVedioComponent],
  imports: [
    CommonModule,
    WarehousevedioRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    InputSwitchModule
  ]
})
export class WarehousevedioModule { }

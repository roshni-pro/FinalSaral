import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EwayBillOrderDetailRoutingModule } from './eway-bill-order-detail-routing.module';
import { EwaybillorderdetailComponent } from './ewaybillorderdetail/ewaybillorderdetail.component';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';

@NgModule({
  declarations: [EwaybillorderdetailComponent],
  imports: [
    CommonModule,
    EwayBillOrderDetailRoutingModule,
    TabViewModule
    ,CardModule
    ,DropdownModule
    ,ShaopkiranaSharedModule
  ]
})
export class EwayBillOrderDetailModule { }

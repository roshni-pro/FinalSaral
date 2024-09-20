import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtgsOrdersApproveRoutingModule } from './rtgs-orders-approve-routing.module';
import { RtgsOrdersApproveComponent } from './component/rtgs-orders-approve/rtgs-orders-approve.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';

@NgModule({
  declarations: [RtgsOrdersApproveComponent],
  imports: [
    CommonModule,
    RtgsOrdersApproveRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    DynamicDialogModule,
    DropdownModule,
    ShaopkiranaSharedModule
  ]
})
export class RtgsOrdersApproveModule { }

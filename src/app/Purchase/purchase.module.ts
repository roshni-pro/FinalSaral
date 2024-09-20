import { BlockUIModule } from 'primeng/blockui';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { ReturnComponent } from './component/return/return.component';
import { ReturnApprovalComponent } from './component/return-approval/return-approval.component';
import { ReturnListComponent } from './component/return-list/return-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';

@NgModule({
  declarations: [ReturnComponent, ReturnApprovalComponent, ReturnListComponent],
  imports: [
    CommonModule,
    NgbModule,
    PurchaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TabViewModule,
    TableModule,
    ShaopkiranaSharedModule,
    BlockUIModule
  ]
})
export class PurchaseModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderReconciliationRoutingModule } from './order-reconciliation-routing.module';
import { OrderTwoOrderOrderReconciliationComponent } from './Component/order-two-order-order-reconciliation/order-two-order-order-reconciliation.component';
import { OrderTwoOrderReconciliationStatementDetailsComponent } from './Component/order-two-order-reconciliation-statement-details/order-two-order-reconciliation-statement-details.component';
import { OrderTwoOrderReconciliationDashboardComponent } from './Component/order-two-order-reconciliation-dashboard/order-two-order-reconciliation-dashboard.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PaginatorModule } from "primeng/paginator";
import { OrderTwoOrderRecocillationMisComponent } from './Component/order-two-order-recocillation-mis/order-two-order-recocillation-mis.component';
@NgModule({
  declarations: [OrderTwoOrderOrderReconciliationComponent, OrderTwoOrderReconciliationStatementDetailsComponent, OrderTwoOrderReconciliationDashboardComponent, OrderTwoOrderRecocillationMisComponent],
  imports: [
    CommonModule,
    OrderReconciliationRoutingModule,
    ShaopkiranaSharedModule,
    ProgressSpinnerModule,
    PaginatorModule
  ]
 
})
export class OrderReconciliationModule { }

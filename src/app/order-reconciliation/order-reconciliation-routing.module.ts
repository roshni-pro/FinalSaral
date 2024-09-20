import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderTwoOrderOrderReconciliationComponent } from './Component/order-two-order-order-reconciliation/order-two-order-order-reconciliation.component';
import { OrderTwoOrderReconciliationStatementDetailsComponent } from './Component/order-two-order-reconciliation-statement-details/order-two-order-reconciliation-statement-details.component';
import { OrderTwoOrderReconciliationDashboardComponent } from './Component/order-two-order-reconciliation-dashboard/order-two-order-reconciliation-dashboard.component';
import { OrderTwoOrderRecocillationMisComponent } from './Component/order-two-order-recocillation-mis/order-two-order-recocillation-mis.component';


const routes: Routes = [
  {
    path:'OrderTwoOrder-Reconciliation',
    component:OrderTwoOrderOrderReconciliationComponent
  },
  {
    path:'OrderTwoOrder-ReconciliationDetails',
    component:OrderTwoOrderReconciliationStatementDetailsComponent
  },
  {
    path:'OrderReconciliation-Dashboard',
    component:OrderTwoOrderReconciliationDashboardComponent
  },
  {
    path:'OrderReconciliation-Mis',
    component:OrderTwoOrderRecocillationMisComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderReconciliationRoutingModule { }

import { OrderAssignmentsComponent } from './Components/order-assignments/order-assignments.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DboyAssignmentSummaryComponent } from './Components/dboy-assignment-summary/dboy-assignment-summary.component';
import { OrderConfigurationComponent } from './Components/orderConfiguration/order-configuration/order-configuration.component';
import { OrderCancelRequestComponent } from './Components/orderCancelRequest/order-cancel-request/order-cancel-request.component';




const routes: Routes = [
  { path: '', component: OrderAssignmentsComponent },
  { path: 'dboyassignmentsummary', component: DboyAssignmentSummaryComponent },
  { path: 'orderconfiguration', component: OrderConfigurationComponent },
  { path: 'orderCancelRequest', component: OrderCancelRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderAssignmentsRoutingModule { }

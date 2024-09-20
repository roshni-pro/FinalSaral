import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { DeliveryBoyComponent } from './components/delivery-boy/delivery-boy.component';
import { AddDeliveryBoyComponent } from './components/add-delivery-boy/add-delivery-boy.component';
import { RedispatchorderapprovalComponent } from './components/redispatchorderapproval/redispatchorderapproval.component';
import { AssignmenttatComponent } from './components/assignmenttat/assignmenttat.component';
import { CreatedeliveryassignmentComponent } from './components/createdeliveryassignment/createdeliveryassignment.component';
import { AssignmentPaymentComponent } from './components/assignment-payment/assignment-payment.component';
import { DeliveryCancellationReportComponent } from './components/delivery-cancellation-report/delivery-cancellation-report.component';
import { AgentcollectionComponent } from './components/agentcollection/agentcollection.component';
import { DboySignedDesignSlipComponent } from './components/dboy-signed-design-slip/dboy-signed-design-slip.component';
import { CustomerWalletComponent } from './components/customer-wallet/customer-wallet.component';
import { DeliveryAssignmentComponent } from './components/delivery-assignment/delivery-assignment.component';
import { AssignmentReportComponent } from './components/assignment-report/assignment-report.component';
import { DeliveryOrderAssignmentChangeComponent } from './components/delivery-order-assignment-change/delivery-order-assignment-change.component';


const routes: Routes = [

  { path: 'vehicles', component: VehiclesComponent },
  { path: 'add', component: AddVehicleComponent },
  { path: 'delivery-boy', component: DeliveryBoyComponent },
  { path: 'delivery-boy/add', component: AddDeliveryBoyComponent },
  { path: 'Redispatchorderapproval', component: RedispatchorderapprovalComponent },
  { path: 'AssignmentTAT', component: AssignmenttatComponent },
  { path: 'Createdeliveryassignment', component: CreatedeliveryassignmentComponent },
  { path: 'assignmentpayment', component: AssignmentPaymentComponent },
  { path: 'deliverycancellationreport', component: DeliveryCancellationReportComponent },
  { path: 'agentcollection', component: AgentcollectionComponent },
  { path: 'dboysigneddesignslip', component: DboySignedDesignSlipComponent },
  { path: 'customerwallet', component: CustomerWalletComponent },
  /*===========Neelam's Work==========*/
  { path: 'delivery-assignment', component: DeliveryAssignmentComponent },
  { path: 'assignment-report', component: AssignmentReportComponent },
  { path: 'DeliveryOrderAssignmentChange/:id', component: DeliveryOrderAssignmentChangeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }

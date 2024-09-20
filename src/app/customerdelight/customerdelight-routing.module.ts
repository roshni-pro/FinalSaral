import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallsSMSMasterComponent } from './calls-smsmaster/calls-smsmaster.component';
import { AddCallsSmsComponent } from './add-calls-sms/add-calls-sms.component';
import {AddressUpdateReqComponent} from './address-update-req/address-update-req.component'
import { CustomerTrackingListComponent } from './customer-tracking-list/customer-tracking-list.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import { OrderConcernComponent } from './order-concern/order-concern.component';
import { CustomertrackingdetailComponent } from './customertrackingdetail/customertrackingdetail.component';
import { OrderConcernMasterComponent } from './order-concern-master/order-concern-master.component';

const routes: Routes = [
  {path: 'customertracking-detail', component: CustomertrackingdetailComponent},
  {path: 'callssmsmaster', component: CallsSMSMasterComponent},
  {path: 'addcallsms', component: AddCallsSmsComponent},
  {path: 'AddreessUpdateRequest', component: AddressUpdateReqComponent},
  {path: 'customerTracking', component: CustomerTrackingListComponent},
  {path: 'customerDetail/:Id', component: CustomerdetailComponent},
  {path: 'order-concern', component: OrderConcernComponent},
  {path: 'orderConcernMaster', component: OrderConcernMasterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerdelightRoutingModule { }

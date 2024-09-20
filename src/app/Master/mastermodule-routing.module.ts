import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutboundDeliveryComponent } from './component/outbound-delivery/outbound-delivery.component';
import { OutboundDeliverylistComponent } from './component/outbound-deliverylist/outbound-deliverylist.component';


const routes: Routes = [
  {path:'OutboundDelivery', component:OutboundDeliveryComponent},
  {path: 'edit-OutboundDelivery/:Id', component: OutboundDeliveryComponent},
  { path:'OutboundDeliveryList', component:OutboundDeliverylistComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastermoduleRoutingModule { }

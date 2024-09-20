import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RtgsOrdersApproveComponent } from './component/rtgs-orders-approve/rtgs-orders-approve.component';


const routes: Routes = [
  {path: 'rtgs-orderList', component: RtgsOrdersApproveComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtgsOrdersApproveRoutingModule { }

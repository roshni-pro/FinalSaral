import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstTimeOrderComponent } from './components/first-time-order/first-time-order.component';
import { InActiveCustOrderComponent } from './components/in-active-cust-order/in-active-cust-order.component';


const routes: Routes = [
  {path:'FirstTimeOrder', component:FirstTimeOrderComponent},
  {path:'InActiveCustOrder', component:InActiveCustOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }

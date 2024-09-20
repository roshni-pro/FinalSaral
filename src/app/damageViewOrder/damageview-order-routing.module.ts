import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DamageviewOrderComponent } from './components/damageview-order/damageview-order.component';



const routes: Routes = [
  {path: 'damageViewOrder', component:DamageviewOrderComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DamageviewOrderRoutingModule { }

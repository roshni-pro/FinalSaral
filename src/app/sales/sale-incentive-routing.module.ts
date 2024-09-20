import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddsaleIncentiveComponent } from './component/addsale-incentive/addsale-incentive.component';
import { SaleIncentiveComponent } from './component/sale-incentive/sale-incentive.component';



const routes: Routes = [
  {path: 'saleIncentive', component: SaleIncentiveComponent},
  {path: 'addsaleIncentive', component: AddsaleIncentiveComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleIncentiveRoutingModule { }

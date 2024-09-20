import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderMasterComponent } from './order-master/order-master.component';
import { MarketingDashboardComponent } from './marketing-dashboard/marketing-dashboard.component';


const routes: Routes = [
  {path: 'orderMasterView',component:OrderMasterComponent},
  {path: 'Marketing-Dashboard',component:MarketingDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderMasterRoutingModule { }



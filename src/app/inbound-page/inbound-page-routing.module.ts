import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboundDashboardPageComponent } from './Component/inbound-dashboard-page/inbound-dashboard-page.component';


const routes: Routes = [
  {
    path:'InboundDashBoard',
    component:InboundDashboardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboundPageRoutingModule { }

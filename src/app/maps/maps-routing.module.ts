import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryBoyReportComponent } from './component/delivery-boy-report/delivery-boy-report.component';
import { HitMapComponent } from './component/hit-map/hit-map.component';
import { SalesPersonReportComponent } from './component/sales-person-report/sales-person-report.component';

const routes: Routes = [
  {path: 'dboy', component: DeliveryBoyReportComponent},
  {path: 'ClusterDashboard', component: HitMapComponent},
  {path: 'salesperson', component: SalesPersonReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule {
  
 }

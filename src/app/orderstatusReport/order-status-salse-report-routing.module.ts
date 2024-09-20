import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderStatusSalseReportComponent } from './components/order-status-salse-report/order-status-salse-report.component';


const routes: Routes = [
  {path : 'order-salse-report' , component:OrderStatusSalseReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderStatusSalseReportRoutingModule { }

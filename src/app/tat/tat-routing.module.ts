import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TatReportDashboardComponent } from './component/tat-report-dashboard/tat-report-dashboard.component';
import { TatReportComponent } from './component/tat-report/tat-report.component';


const routes: Routes = [
  { path: 'tat-report', component: TatReportComponent},
  { path: 'tatReport', component: TatReportDashboardComponent},
  
];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class TatRoutingModule { }

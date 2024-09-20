import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmReportComponent } from './crm-report/crm-report.component';


const routes: Routes = [
  {path: 'cRMReport', component: CrmReportComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmReportRoutingModule { }

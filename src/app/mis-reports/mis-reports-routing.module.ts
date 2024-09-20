import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisrepotabsComponent } from './misrepotabs/misrepotabs.component';
import { AccountMIsReportComponent } from './account-mis-report/account-mis-report.component';

const routes: Routes = [
  {
    path:'ReportTab',
    component:MisrepotabsComponent
  },
  {
    path:'Report',
    component:AccountMIsReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MISReportsRoutingModule { }

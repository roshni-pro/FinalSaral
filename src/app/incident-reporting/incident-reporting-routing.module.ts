import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentReportingComponent } from './components/incident-reporting/incident-reporting.component';
import { IncidentReportListComponent } from './components/incident-report-list/incident-report-list.component';
import { IncidentReportClosedListComponent } from './components/incident-report-closed-list/incident-report-closed-list.component';


const routes: Routes = [
  { path: 'incidentReport', component: IncidentReportingComponent },
  { path: 'incidentReportList', component: IncidentReportListComponent },
  { path: 'incidentReportclosedList', component: IncidentReportClosedListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentReportingRoutingModule { }

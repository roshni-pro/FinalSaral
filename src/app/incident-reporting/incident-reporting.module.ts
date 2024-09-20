import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentReportingRoutingModule } from './incident-reporting-routing.module';
import { IncidentReportingComponent } from './components/incident-reporting/incident-reporting.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { IncidentReportListComponent } from './components/incident-report-list/incident-report-list.component';
import { IncidentReportClosedListComponent } from './components/incident-report-closed-list/incident-report-closed-list.component';


@NgModule({
  declarations: [IncidentReportingComponent, IncidentReportListComponent, IncidentReportClosedListComponent],
  imports: [
    CommonModule,
    IncidentReportingRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class IncidentReportingModule { }

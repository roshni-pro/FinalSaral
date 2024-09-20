import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TatRoutingModule } from './tat-routing.module';
import { TatReportComponent } from './component/tat-report/tat-report.component';
import { TableModule } from 'primeng/table';
import { NgbModule, NgbPaginationNext } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { TatReportDashboardComponent } from './component/tat-report-dashboard/tat-report-dashboard.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [TatReportComponent, TatReportDashboardComponent],

  imports: [
    CommonModule,
    TatRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    // NgbPaginationNext,
    NgxPaginationModule,
    TabViewModule

  ]
})
export class TatModule { }

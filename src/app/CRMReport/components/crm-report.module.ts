import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmReportRoutingModule } from './crm-report-routing.module';
import { CrmReportComponent } from './crm-report/crm-report.component';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [CrmReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    CrmReportRoutingModule,
    BlockUIModule,
    ProgressSpinnerModule,
    TableModule,
    DialogModule,
  ]
})
export class CrmReportModule { }

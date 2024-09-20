import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { BatchmasterRoutingModule } from './batchmaster-routing.module';
import { BatchMasterComponent } from './batch-master/batch-master.component';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import { BatchMasterApproverComponent } from './batch-master-approver/batch-master-approver.component';
import { DropdownModule } from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [BatchMasterComponent, BatchMasterApproverComponent],
  imports: [
    CommonModule,
    BatchmasterRoutingModule,
    CalendarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    TableModule,
    FormsModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    BlockUIModule,
    ProgressSpinnerModule
  ]
})
export class BatchmasterModule { }

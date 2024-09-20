import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerCorrectionRoutingModule } from './ledger-correction-routing.module';
import { CorrectionLedgerEntryComponent } from './Component/correction-ledger-entry/correction-ledger-entry.component';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { SharedModule } from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
@NgModule({
  declarations: [CorrectionLedgerEntryComponent],
  imports: [
    CommonModule,
    LedgerCorrectionRoutingModule,
    CardModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    SharedModule,
    ShaopkiranaSharedModule
    
  ]
})
export class LedgerCorrectionModule { }

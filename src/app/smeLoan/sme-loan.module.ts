import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmeLoanRoutingModule } from './sme-loan-routing.module';
import { LoanAppliedDetailsComponentComponent } from './components/loan-applied-details-component/loan-applied-details-component.component';
import { SharedModule } from 'app/shared/shared.module';
import { BlockUIModule } from 'primeng/blockui';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


@NgModule({
  declarations: [LoanAppliedDetailsComponentComponent],
  imports: [
    CommonModule,
    SmeLoanRoutingModule,
    SharedModule,
    BlockUIModule,
    ShaopkiranaSharedModule
  ]
})
export class SmeLoanModule { }

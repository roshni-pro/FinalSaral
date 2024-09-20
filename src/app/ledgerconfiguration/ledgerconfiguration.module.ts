import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerconfigurationRoutingModule } from './ledgerconfiguration-routing.module';
import { LedgerconfigurationdetailsComponent } from './components/ledgerconfigurationdetails/ledgerconfigurationdetails.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AccountingConfigurationComponent } from './part-components/accounting-configuration/accounting-configuration.component';
import { DeveloperConfigurationComponent } from './part-components/developer-configuration/developer-configuration.component';
import { TesterConfigurationComponent } from './part-components/tester-configuration/tester-configuration.component';
import { LedgerlistComponent } from './part-components/ledgerlist/ledgerlist.component';



@NgModule({
  declarations: [LedgerconfigurationdetailsComponent, AccountingConfigurationComponent, DeveloperConfigurationComponent, TesterConfigurationComponent, LedgerlistComponent],
  imports: [
    CommonModule,
    LedgerconfigurationRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class LedgerconfigurationModule { }

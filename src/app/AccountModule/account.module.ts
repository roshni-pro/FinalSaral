import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import {TableModule} from 'primeng/table';
;
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { AccountclassificationComponent } from './components/AccountClassification/accountclassification/accountclassification.component';
import { AccountclassificationAddComponent } from './components/AccountClassification/accountclassification-add/accountclassification-add.component';

import { LadgerComponent } from './components/ladger/ladger.component';
import { AddLadgerComponent } from './components/add-ladger/add-ladger.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';

import { AccounttypeComponent } from './components/accounttype/accounttype/accounttype.component';
import { AccounttypeAddComponent } from './components/accounttype/accounttype-add/accounttype-add.component';
import { AccountgroupComponent } from './components/accountgroup/accountgroup/accountgroup.component';
import { AccountgroupAddComponent } from './components/accountgroup/accountgroup-add/accountgroup-add.component';
import { VoucherTypeComponent } from './components/voucher-type/voucher-type.component';
import { AddVoucherTypeComponent } from './components/add-voucher-type/add-voucher-type.component';
import { LadgerEntryComponent } from './components/ladger-entry/ladger-entry.component';
import { AddLadgerEntryComponent } from './components/add-ladger-entry/add-ladger-entry.component';
import { LadgerReportComponent } from './components/ladger-report/ladger-report.component';
import { AccountClassificationDetailsComponent } from './components/AccountClassification/account-classification-details/account-classification-details.component';
import { AccountGroupDetailsComponent } from './components/accountgroup/account-group-details/account-group-details.component';
import { AccountTypeDetailsComponent } from './components/accounttype/account-type-details/account-type-details.component';
import { VoucherTypeDetailsComponent } from './components/voucher-type-details/voucher-type-details.component';
import { LadgerDetailsComponent } from './components/ladger-details/ladger-details.component';
import { LadgerEntryDetailsComponent } from './components/ladger-entry-details/ladger-entry-details.component';
import { LadgerTypeComponent } from './components/ladger-type/ladger-type.component';
import { LadgerTypeDetailsComponent } from './components/ladger-type-details/ladger-type-details.component';
import { LadgerTypeAddComponent } from './components/ladger-type-add/ladger-type-add.component';
import { LadgerCorrectionComponent } from './components/ladger-correction/ladger-correction.component';
import { LadgerBankDetailComponent } from './components/ladger-bank-detail/ladger-bank-detail.component';
import { AddLadgerBankDetailComponent } from './components/add-ladger-bank-detail/add-ladger-bank-detail.component';

import { CustomerLedgerConsentComponent } from './components/customer-ledger-consent/customer-ledger-consent.component';
import { CustomerLedgerConsentListComponent } from './components/customer-ledger-consent-list/customer-ledger-consent-list.component';


//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';

@NgModule({

  declarations: [
    AccountclassificationComponent,
    AccountclassificationAddComponent, 
    AccounttypeComponent, 
    AccounttypeAddComponent, 
    AccountgroupComponent, 
    AccountgroupAddComponent,
    LadgerComponent, 
    AddLadgerComponent, 
    VoucherTypeComponent, 
    AddVoucherTypeComponent, 
    LadgerEntryComponent, 
    AddLadgerEntryComponent, 
    LadgerReportComponent, 
    AccountClassificationDetailsComponent, 
    AccountGroupDetailsComponent, 
    AccountTypeDetailsComponent, 
    VoucherTypeDetailsComponent, 
    LadgerDetailsComponent, 
    LadgerEntryDetailsComponent, 
    LadgerTypeComponent, 
    LadgerTypeDetailsComponent, 
    LadgerTypeAddComponent,
    LadgerTypeDetailsComponent, 
    LadgerCorrectionComponent, 
    LadgerBankDetailComponent, 
    AddLadgerBankDetailComponent,  
    CustomerLedgerConsentComponent, CustomerLedgerConsentListComponent
  ],

  imports: [
    CommonModule,
    AccountRoutingModule,
    ShaopkiranaSharedModule
   // DropdownModule

  ]
  

})
export class AccountModule { }

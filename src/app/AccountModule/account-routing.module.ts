import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountclassificationComponent } from './components/AccountClassification/accountclassification/accountclassification.component';
import { AccountclassificationAddComponent } from './components/AccountClassification/accountclassification-add/accountclassification-add.component';
import { AccounttypeComponent } from './components/accounttype/accounttype/accounttype.component';
import { AccounttypeAddComponent } from './components/accounttype/accounttype-add/accounttype-add.component';
import { AccountgroupComponent } from './components/accountgroup/accountgroup/accountgroup.component';
import { AccountgroupAddComponent } from './components/accountgroup/accountgroup-add/accountgroup-add.component';

import { LadgerComponent } from './components/ladger/ladger.component';
import { AddLadgerComponent } from './components/add-ladger/add-ladger.component';
import { VoucherTypeComponent } from './components/voucher-type/voucher-type.component';
import { AddVoucherTypeComponent } from './components/add-voucher-type/add-voucher-type.component';
import { AddLadgerEntryComponent } from './components/add-ladger-entry/add-ladger-entry.component';
import { LadgerEntryComponent } from './components/ladger-entry/ladger-entry.component';
import { LadgerReportComponent } from './components/ladger-report/ladger-report.component';
import { LadgerTypeComponent } from './components/ladger-type/ladger-type.component';
import { LadgerTypeAddComponent } from './components/ladger-type-add/ladger-type-add.component';
import { LadgerCorrectionComponent } from './components/ladger-correction/ladger-correction.component';
import { LadgerBankDetailComponent } from './components/ladger-bank-detail/ladger-bank-detail.component';
import { AddLadgerBankDetailComponent } from './components/add-ladger-bank-detail/add-ladger-bank-detail.component';
import { CustomerLedgerConsentComponent } from './components/customer-ledger-consent/customer-ledger-consent.component';
import { CustomerLedgerConsentListComponent } from './components/customer-ledger-consent-list/customer-ledger-consent-list.component';


const routes: Routes = [
  { path: 'ladgertype', component: LadgerTypeComponent },
  { path: 'ladgertype/add', component: LadgerTypeAddComponent },
  { path: 'accountclassificatiion', component: AccountclassificationComponent },
  { path: 'accountclassificatiion/add', component: AccountclassificationAddComponent },
  { path: 'accounttype', component: AccounttypeComponent },
  { path: 'accounttype/add', component: AccounttypeAddComponent },
  { path: 'accountgroup', component: AccountgroupComponent },
  { path: 'accountgroup/add', component: AccountgroupAddComponent },
  { path: 'ladger', component: LadgerComponent},
  { path: 'addladger', component: AddLadgerComponent},
  { path: 'vouchertype', component: VoucherTypeComponent},
  { path: 'vouchertype/add', component: AddVoucherTypeComponent},
  { path: 'ladgerentry', component: LadgerEntryComponent},
  { path: 'ladgerentry/add', component: AddLadgerEntryComponent},
  { path: 'ladgerreport', component: LadgerReportComponent},
  { path: 'ladgercorrect' , component:LadgerCorrectionComponent},
  { path: 'ladgerbankdetail' , component:LadgerBankDetailComponent},
  { path: 'addladgerbankdetail' , component:AddLadgerBankDetailComponent},
  { path: 'customerledgerconsent' , component:CustomerLedgerConsentComponent},
  { path:'ledgerconsentlist',component:CustomerLedgerConsentListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

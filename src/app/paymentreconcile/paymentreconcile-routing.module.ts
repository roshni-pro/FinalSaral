import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

import { PaymentreconcileComponent } from './Component/paymentreconcile/paymentreconcile.component';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { PaymentDeatilsComponent } from './Component/paymentreconcile/payment-deatils/payment-deatils.component';
import { EpayUploadDetailsComponent } from './Component/paymentreconcile/epay-upload-details/epay-upload-details.component';
import { HDFCUploadDetailsComponent } from './Component/paymentreconcile/hdfcupload-details/hdfcupload-details.component';
import { MPosUploadDetailsComponent } from './Component/paymentreconcile/m-pos-upload-details/m-pos-upload-details.component';
import { HDFCNetBankingDetailsComponent } from './Component/paymentreconcile/hdfcnet-banking-details/hdfcnet-banking-details.component';
import { PaymentmodechangeComponent } from './Component/paymentreconcile/changePaymentMode/paymentmodechange/paymentmodechange.component';
import { RTGSPaymentReconciliationComponent } from './Component/rtgs-payment-reconciliation/rtgs-payment-reconciliation.component';
import { UpiTransactionDetailsComponent } from './Component/upi-transaction-details/upi-transaction-details.component';
import { StoreCreditLimitComponent } from './Component/store-credit-limit/store-credit-limit.component';
import { PayLaterCollectionComponent } from './Component/pay-later-collection/pay-later-collection.component';
import { PaylaterTabComponent } from './Component/paylater-tab/paylater-tab.component';
const routes: Routes = [
  { path: 'paymentreconcile', component: PaymentreconcileComponent },
  { path: 'payment-deatils', component: PaymentDeatilsComponent },
  { path: 'epay-upload-details/:UploadId', component: EpayUploadDetailsComponent },
  { path: 'hdfcupload-details/:UploadId', component: HDFCUploadDetailsComponent },
  { path: 'm-pos-upload-details/:UploadId', component: MPosUploadDetailsComponent },
  { path: 'hdfcnet-banking-details/:UploadId', component: HDFCNetBankingDetailsComponent },
  { path: 'paymentchangemode', component: PaymentmodechangeComponent },
  { path: 'rtgs-payment-reconciliation', component: RTGSPaymentReconciliationComponent },
  {path:'Upi-Transaction-Details',component:UpiTransactionDetailsComponent},
  {path:'storeCreditLimit',component:StoreCreditLimitComponent},
  {path:'pay-later-collection',component:PaylaterTabComponent},
  // {path:'pay-later',component:PaylaterTabComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentreconcileRoutingModule { }



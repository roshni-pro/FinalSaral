import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';

import { CommonModule } from '@angular/common';
import { PaymentreconcileComponent } from './Component/paymentreconcile/paymentreconcile.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentreconcileRoutingModule } from './paymentreconcile-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { PaymentDeatilsComponent } from './Component/paymentreconcile/payment-deatils/payment-deatils.component';
import { EpayUploadDetailsComponent } from './Component/paymentreconcile/epay-upload-details/epay-upload-details.component';
import { HDFCUploadDetailsComponent } from './Component/paymentreconcile/hdfcupload-details/hdfcupload-details.component';
import { MPosUploadDetailsComponent } from './Component/paymentreconcile/m-pos-upload-details/m-pos-upload-details.component';
import { HDFCNetBankingDetailsComponent } from './Component/paymentreconcile/hdfcnet-banking-details/hdfcnet-banking-details.component';
import { PaymentmodechangeComponent } from './Component/paymentreconcile/changePaymentMode/paymentmodechange/paymentmodechange.component';
import { RTGSPaymentReconciliationComponent } from './Component/rtgs-payment-reconciliation/rtgs-payment-reconciliation.component';
import { UpiTransactionDetailsComponent } from './Component/upi-transaction-details/upi-transaction-details.component';
import {InputTextModule} from 'primeng/inputtext';
import { StoreCreditLimitComponent } from './Component/store-credit-limit/store-credit-limit.component';
import { PayLaterCollectionComponent } from './Component/pay-later-collection/pay-later-collection.component';
import { PaylaterTabComponent } from './Component/paylater-tab/paylater-tab.component';
import { MopWiseCollectionComponent } from './Component/mop-wise-collection/mop-wise-collection.component';

imports: [

  NgbModule,

  ShaopkiranaSharedModule,

  // DropdownModule

]

@NgModule({
  declarations: [PaymentreconcileComponent, PaymentDeatilsComponent, EpayUploadDetailsComponent, HDFCUploadDetailsComponent, MPosUploadDetailsComponent, HDFCNetBankingDetailsComponent, PaymentmodechangeComponent, RTGSPaymentReconciliationComponent, UpiTransactionDetailsComponent, StoreCreditLimitComponent, PayLaterCollectionComponent, PaylaterTabComponent, MopWiseCollectionComponent],
  imports: [
    CommonModule,
    PaymentreconcileRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    ToastModule,
    NgbModule,
    ShaopkiranaSharedModule,
    InputTextModule

  ]


})
export class PaymentreconcileModule { }

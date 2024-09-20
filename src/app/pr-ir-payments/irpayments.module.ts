import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRPaymentsRoutingModule } from './irpayments-routing.module';
import { IRComponent } from './Components/ir/ir.component';
import { PrPaymentSummaryComponent } from './Components/ir/pr-payment-summary/pr-payment-summary.component';
import { PRPaymentDetailsComponent } from './Components/ir/prpayment-details/prpayment-details.component';
import { SupplierModule } from 'app/supplier/supplier.module';
import { ClosedPRPaymentsComponent } from './Components/ir/closed-prpayments/closed-prpayments.component';



@NgModule({
  declarations: [
    PRPaymentDetailsComponent, 
    IRComponent, 
    PrPaymentSummaryComponent, 
    ClosedPRPaymentsComponent
  ],
  imports: [
    CommonModule,
    IRPaymentsRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
    TableModule,
    TabViewModule,
    FormsModule,
    ShaopkiranaSharedModule,
    BlockUIModule,
    ProgressSpinnerModule,
    SupplierModule,
    FileUploadModule
  ]
})
export class IRPaymentsModule { }

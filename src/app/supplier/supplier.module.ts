import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './component/supplier/supplier.component';
import { AddSupplierComponent } from './component/addSupplier/addSupplier.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { SupplierFormComponent } from './component/supplierForm/supplierForm.component';
import { SupplierDetailsComponent } from './component/supplier-details/supplier-details.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { PaymentComponent } from './component/payment/payment.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ManualLadgerComponent } from './component/manual-ladger/manual-ladger.component';
import { SuppliercategoryComponent } from './component/suppliercategory/suppliercategory.component';
import { SuppliercategoryDetailsComponent } from './component/suppliercategory-details/suppliercategory-details.component';
import { SuppliercategoryEditComponent } from './component/suppliercategory-edit/suppliercategory-edit.component';
import { SupplieradvncepaymentComponent } from './component/supplieradvncepayment/supplieradvncepayment.component';
import { SupplierpaymentdetailsComponent } from './component/supplierpaymentdetails/supplierpaymentdetails.component';
import { SupplierChatComponent } from './component/supplier-chat/supplier-chat.component';
import { SupplierChatViewPageComponent } from './component/supplier-chat-view-page/supplier-chat-view-page.component';
import { ChatDetailsComponent } from './component/chat-details/chat-details.component';
import { SupplieroutstandingamtComponent } from './component/supplieroutstandingamt/supplieroutstandingamt.component';
import { SupplierpaymentComponent } from './component/supplierpayment/supplierpayment.component';
import { SupplierPaymentListComponent } from './component/supplier-payment-list/supplier-payment-list.component';
import { SupplierlistComponent } from './component/supplierlist/supplierlist.component';
import { IrOutstandingComponent } from './component/ir-outstanding/ir-outstanding.component';
import { PaymentSummaryComponent } from './component/payment-summary/payment-summary.component';
import { IrOutstandingViewComponent } from './component/ir-outstanding-view/ir-outstanding-view.component';
import { ChatPageComponent } from './component/chat-page/chat-page.component';
import { SupplierViewPageComponent } from './component/supplier-view-page/supplier-view-page.component';
import { SupplierOnboardComponent } from './component/supplier-onboard/supplier-onboard.component';
import { GDNDetailsComponent } from './component/GDN/gdndetails/gdndetails.component';
import { GDNListComponent } from './component/GDN/gdnlist/gdnlist.component';
import {
  MatTabsModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import { NewsupplierlistComponent } from './component/newsupplierlist/newsupplierlist.component';
import { EditsupplierpageComponent } from './component/editsupplierpage/editsupplierpage.component';
import { AdddpotComponent } from './component/adddpot/adddpot.component';
import { EditdepotpageComponent } from './component/editdepotpage/editdepotpage.component';
import { ViewdepotpageComponent } from './component/viewdepotpage/viewdepotpage.component';
import { PaymentAcknowlegementComponent } from './component/payment-acknowlegement/payment-acknowlegement.component';
import { SupplierRetailerCrossBuyingComponent } from './component/supplier-retailer-cross-buying/supplier-retailer-cross-buying.component';


//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';

import {ButtonModule} from 'primeng/button';
@NgModule({

  declarations: [SupplierComponent, AddSupplierComponent, SupplierFormComponent,
    SupplierDetailsComponent, SupplierChatComponent, PaymentComponent,
    ManualLadgerComponent, SuppliercategoryComponent,
    SuppliercategoryDetailsComponent, SuppliercategoryEditComponent,
    SupplieradvncepaymentComponent, SupplierpaymentdetailsComponent,
    SupplierChatViewPageComponent, ChatDetailsComponent,
    SupplieroutstandingamtComponent, SupplierpaymentComponent,
    SupplierPaymentListComponent, SupplierlistComponent,
    IrOutstandingComponent, PaymentSummaryComponent,
    IrOutstandingViewComponent, ChatPageComponent, SupplierViewPageComponent,
    SupplierOnboardComponent, NewsupplierlistComponent, EditsupplierpageComponent, AdddpotComponent, GDNListComponent, GDNDetailsComponent, EditdepotpageComponent, ViewdepotpageComponent, PaymentAcknowlegementComponent, SupplierRetailerCrossBuyingComponent],

  imports: [
    NgbModule,

    ShaopkiranaSharedModule,
    SupplierRoutingModule,
    MatTabsModule, MatButtonModule, MatToolbarModule, CalendarModule,InputTextModule,ButtonModule
    // DropdownModule
  ],
  exports: [SupplierComponent, AddSupplierComponent, SupplierFormComponent, SupplierDetailsComponent, SupplierChatComponent, PaymentComponent, ManualLadgerComponent, SuppliercategoryComponent, SuppliercategoryDetailsComponent, SuppliercategoryEditComponent, SupplieradvncepaymentComponent, SupplierpaymentdetailsComponent, SupplierChatViewPageComponent, ChatDetailsComponent, SupplieroutstandingamtComponent, SupplierpaymentComponent, SupplierPaymentListComponent, SupplierlistComponent, IrOutstandingComponent, PaymentSummaryComponent, IrOutstandingViewComponent]



})
export class SupplierModule { }

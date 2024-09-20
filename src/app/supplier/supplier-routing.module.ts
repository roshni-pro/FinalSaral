import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './component/supplier/supplier.component';
import { AddSupplierComponent } from './component/addSupplier/addSupplier.component';
import { SupplierDetailsComponent } from './component/supplier-details/supplier-details.component';
import { SupplierFormComponent } from './component/supplierForm/supplierForm.component';
import { PaymentComponent } from './component/payment/payment.component';
import { ManualLadgerComponent } from './component/manual-ladger/manual-ladger.component';
import { SuppliercategoryComponent } from './component/suppliercategory/suppliercategory.component';
import { SuppliercategoryEditComponent } from './component/suppliercategory-edit/suppliercategory-edit.component';
import { SupplieradvncepaymentComponent } from './component/supplieradvncepayment/supplieradvncepayment.component';
import { SupplierpaymentdetailsComponent } from './component/supplierpaymentdetails/supplierpaymentdetails.component';
import { SupplierChatViewPageComponent } from './component/supplier-chat-view-page/supplier-chat-view-page.component';
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
import { NewsupplierlistComponent } from './component/newsupplierlist/newsupplierlist.component';
import { EditsupplierpageComponent } from './component/editsupplierpage/editsupplierpage.component';
import { AdddpotComponent } from './component/adddpot/adddpot.component';
import { EditdepotpageComponent } from './component/editdepotpage/editdepotpage.component';
import { ViewdepotpageComponent } from './component/viewdepotpage/viewdepotpage.component';
import { Component } from '@fullcalendar/core';
import { PaymentAcknowlegementComponent } from './component/payment-acknowlegement/payment-acknowlegement.component';
import { GDNListComponent } from './component/GDN/gdnlist/gdnlist.component';
import { GDNDetailsComponent } from './component/GDN/gdndetails/gdndetails.component';
import { SupplierRetailerCrossBuyingComponent } from './component/supplier-retailer-cross-buying/supplier-retailer-cross-buying.component';

const routes: Routes = [

  {path: 'supplier', component: SupplierComponent},
  {path: 'supplier/add', component: AddSupplierComponent},
  {path: 'supplier/details', component: SupplierDetailsComponent} ,
  {path: 'supplier/form', component: SupplierFormComponent},
  {path: 'payment', component: PaymentComponent},  
  {path: 'manual-ladger', component: ManualLadgerComponent},  
  {path: 'suppliercategory', component: SuppliercategoryComponent},
  {path: 'suppliercategory-edit', component: SuppliercategoryEditComponent},
  { path: 'ChatPage', component: SupplierChatViewPageComponent },
  {path: 'supplieradvncepayment', component: SupplieradvncepaymentComponent},
  {path: 'supplierpaymentdetails', component: SupplierpaymentdetailsComponent},
  {path: 'supplieroutstandingamount', component: SupplieroutstandingamtComponent},
  {path: 'supplierpayment', component: SupplierpaymentComponent},
  {path: 'supplier-payment-list', component: SupplierPaymentListComponent},
  {path: 'supplierlist/:Id', component: SupplierlistComponent},
  {path: 'ir-outstanding', component: IrOutstandingComponent},
  {path: 'payment-summary', component: PaymentSummaryComponent},
  {path: 'ir-outstanding-view', component: IrOutstandingViewComponent},
  {path: 'ChatPage', component: ChatPageComponent},
  {path: 'SupplierViewPage', component: SupplierViewPageComponent},
  {path:'SupplierOnboard',component:SupplierOnboardComponent },
  {path: 'newsupplierlist', component:NewsupplierlistComponent},
  {path: 'editsupplier', component:EditsupplierpageComponent},
  {path:'adddpot/:supplierid', component:AdddpotComponent},
  {path: 'editdepot', component:EditdepotpageComponent},
  {path: 'viewdepot/:supplierid', component:ViewdepotpageComponent},
  {path: 'payment-acknowlgement', component:PaymentAcknowlegementComponent},
  {path: 'GDNDetail', component:GDNDetailsComponent},
  {path: 'GDNList', component:GDNListComponent},
  {path: 'supplierRetailingCrossBuying', component:SupplierRetailerCrossBuyingComponent}
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }

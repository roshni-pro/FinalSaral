import { PODashboardComponent } from './Components/podashboard/podashboard.component';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { GrIrDifferenceComponent } from './Components/gr-ir-difference/gr-ir-difference.component';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderEditComponent } from './Components/purchase-order-edit/purchase-order-edit.component';
import { PurchaseOrderCloseApprovalComponent } from './Components/purchase-order-close-approval/purchase-order-close-approval.component';
import { PurchaseOrderCloseRequestComponent } from './Components/purchase-order-close-request/purchase-order-close-request.component';
import { PotransfersComponent } from './Components/potransfers/potransfers.component';
import { PotrackerreportsComponent } from './Components/potrackerreports/potrackerreports.component';
import { ViewOpenPoComponent } from './Components/view-open-po/view-open-po.component';
import { POApprovalDetailComponent } from './Components/poapproval-detail/poapproval-detail.component';
import { DetailPoDashboardComponent } from './Components/detail-po-dashboard/detail-po-dashboard.component';
import { IRInvoiceDateRequestComponent } from './Components/ir-invoice-date-request/ir-invoice-date-request.component';
import { DebitNoteRegisterComponent } from './Components/debit-note-register/debit-note-register.component';
import { PoStopConfigurationComponent } from './Components/po-stop-configuration/po-stop-configuration.component';
import { ChangeSeasoanalConfigurationComponent } from './Components/change-seasoanal-configuration/change-seasoanal-configuration.component';
import { GrQualityConfigurationComponent } from './Components/gr-quality-configuration/gr-quality-configuration.component';
// import { PRApprovalConfigurationComponent } from './Components/pr-approval-configuration/pr-approval-configuration.component';
// import { AdvancePurchaseOrderRequestComponent } from './Components/advance-purchase-order-request/advance-purchase-order-request.component';
// import { AddAdvancePoRequestComponent } from './Components/add-advance-po-request/add-advance-po-request.component';
// import { AdvancePurchaseDetailsComponent } from './Components/advance-purchase-details/advance-purchase-details.component';
// import { AdvancePurchaseRequestEditComponent } from './Components/advance-purchase-request-edit/advance-purchase-request-edit.component';

const routes: Routes = [
  { path: '', component: PODashboardComponent },
  { path: 'gr-ir-difference', component: GrIrDifferenceComponent },
  { path: 'editpo', component: PurchaseOrderEditComponent },
  { path: 'pocloserequests', component: PurchaseOrderCloseRequestComponent },
  { path: 'pocloseapproval', component: PurchaseOrderCloseApprovalComponent },
  { path: 'potransfers', component: PotransfersComponent },
  { path: 'Potrackerreports', component: PotrackerreportsComponent },
  {path:'ViewOpenPo',component:ViewOpenPoComponent},
  {path:'POApprovalDetail',component:POApprovalDetailComponent},
  {path:'podetail',component:DetailPoDashboardComponent},
  {path:'IR-InvoiceDateRequests',component:IRInvoiceDateRequestComponent},
  {path:'DebitNoteRegister',component:DebitNoteRegisterComponent},
  {path:'po-stop-configuration',component:PoStopConfigurationComponent},
  {path:'Change-Seasoanal-Configuration',component:ChangeSeasoanalConfigurationComponent},
  // { path: 'advance-purchase-order-request', component: AdvancePurchaseOrderRequestComponent },
  // { path: 'add-advance-PO-request', component: AddAdvancePoRequestComponent},
  // { path: 'advance-purchase-details/:id', component: AdvancePurchaseDetailsComponent},
  // { path: 'advance-purchase-edit/:id', component: AdvancePurchaseRequestEditComponent},
  {path:'GrQualityConfiguration',component:GrQualityConfigurationComponent},
  // {path:'PRapproval-configuration',component:PRApprovalConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }

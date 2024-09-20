import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { TableModule } from 'primeng/table';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { GrIrDifferenceComponent } from './Components/gr-ir-difference/gr-ir-difference.component';
import { PurchaseOrderEditComponent } from './Components/purchase-order-edit/purchase-order-edit.component';
import { PODashboardComponent } from './Components/podashboard/podashboard.component';
import { PurchaseOrderCloseRequestComponent } from './Components/purchase-order-close-request/purchase-order-close-request.component';
import { PurchaseOrderCloseApprovalComponent } from './Components/purchase-order-close-approval/purchase-order-close-approval.component';
import { PotransfersComponent } from './Components/potransfers/potransfers.component';
import { PotrackerreportsComponent } from './Components/potrackerreports/potrackerreports.component';
// import { AdvancePurchaseOrderRequestComponent } from './Components/advance-purchase-order-request/advance-purchase-order-request.component';
// import { AddAdvancePoRequestComponent } from './Components/add-advance-po-request/add-advance-po-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { DetailPoDashboardComponent } from './Components/detail-po-dashboard/detail-po-dashboard.component';
import { POApprovalDetailComponent } from './Components/poapproval-detail/poapproval-detail.component';
import { ViewOpenPoComponent } from './Components/view-open-po/view-open-po.component';
import {InputTextModule} from 'primeng/inputtext';
import { IRInvoiceDateRequestComponent } from './Components/ir-invoice-date-request/ir-invoice-date-request.component';
import { DebitNoteRegisterComponent } from './Components/debit-note-register/debit-note-register.component';
import { PoStopConfigurationComponent } from './Components/po-stop-configuration/po-stop-configuration.component';
import { ChangeSeasoanalConfigurationComponent } from './Components/change-seasoanal-configuration/change-seasoanal-configuration.component';
import { GrQualityConfigurationComponent } from './Components/gr-quality-configuration/gr-quality-configuration.component';
// import { PRApprovalConfigurationComponent } from './Components/pr-approval-configuration/pr-approval-configuration.component';
// import { AdvancePurchaseDetailsComponent } from './Components/advance-purchase-details/advance-purchase-details.component';
// import { AdvancePurchaseRequestEditComponent } from './Components/advance-purchase-request-edit/advance-purchase-request-edit.component';
@NgModule({
  declarations: [GrIrDifferenceComponent, PurchaseOrderEditComponent, PODashboardComponent, PODashboardComponent, PurchaseOrderCloseRequestComponent,
    PurchaseOrderCloseApprovalComponent, PotransfersComponent, PotrackerreportsComponent, ViewOpenPoComponent ,POApprovalDetailComponent, DetailPoDashboardComponent, IRInvoiceDateRequestComponent, DebitNoteRegisterComponent, PoStopConfigurationComponent, ChangeSeasoanalConfigurationComponent, GrQualityConfigurationComponent
    // PRApprovalConfigurationComponent
  ],

  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    TableModule,
    // NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    SkSharedModule,
    ReactiveFormsModule,InputTextModule

  ]


})
export class PurchaseOrderModule { }

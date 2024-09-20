import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerdelightRoutingModule } from './customerdelight-routing.module';
import { CallsSMSMasterComponent } from './calls-smsmaster/calls-smsmaster.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AddCallsSmsComponent } from './add-calls-sms/add-calls-sms.component';
import { AddressUpdateReqComponent } from './address-update-req/address-update-req.component';
import { CustomerTrackingListComponent } from './customer-tracking-list/customer-tracking-list.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import { AgmOverlays } from 'agm-overlays';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NgxPrintModule } from 'ngx-print';
import { InputMaskModule } from 'primeng/inputmask';
import { environment } from 'environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderConcernComponent } from './order-concern/order-concern.component';
import { CustomertrackingdetailComponent } from './customertrackingdetail/customertrackingdetail.component';
import { ShiipingAddressEntryComponent } from './shiiping-address-entry/shiiping-address-entry.component';
import { CustomerDocumentComponent } from './customer-document/customer-document.component';
import { CardModule } from 'primeng/card';
import { CustomerAddressAuditComponent } from './customer-address-audit/customer-address-audit.component';
import { OrderConcernMasterComponent } from './order-concern-master/order-concern-master.component';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  declarations: [CallsSMSMasterComponent, AddCallsSmsComponent, AddressUpdateReqComponent, CustomerTrackingListComponent, CustomerdetailComponent, OrderConcernComponent, CustomertrackingdetailComponent, ShiipingAddressEntryComponent, CustomerDocumentComponent, CustomerAddressAuditComponent, OrderConcernMasterComponent],
  imports: [
    CommonModule,
    CustomerdelightRoutingModule,
    ShaopkiranaSharedModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKeyGoogle, // "AIzaSyCbogFMyrNTlMdtsrYzgffJ3guhCdzRS2Y",
      libraries: ['drawing', 'places']
    }),
    AgmDirectionModule,
    NgxPrintModule,
    InputMaskModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    SharedModule
  ]
})
export class CustomerdelightModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './component/customer/customer.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import {CardModule} from 'primeng/card';

import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CustomerDetailsComponent } from './component/customer-details/customer-details.component';
import { CustomerImagesComponent } from './component/customer-images/customer-images.component';
import { CustomerTrendsComponent } from './component/customer-trends/customer-trends.component';
import { HubTransferComponent } from './component/hub-transfer/hub-transfer.component';
import { CustomerDocumentHistoryComponent } from './component/customer-document-history/customer-document-history.component';
import { EwayBillOrderComponent } from './component/eway-bill-order/eway-bill-order.component';


import { FileUploadModule } from 'primeng/fileupload';
import { CustomerfeedbackComponent } from './component/customerfeedback/customerfeedback.component';
import { CustomerChequelimitComponent } from './component/customerChequelimit/customer-chequelimit/customer-chequelimit.component';
import { DistributorverificationImagesComponent } from './component/distributorverification-images/distributorverification-images.component';
import { GullakComponent } from './component/gullak/gullak.component';
import { GullakDetailComponent } from './component/gullak-detail/gullak-detail.component';
import { GulakdetailspageComponent } from './component/gulakdetailspage/gulakdetailspage.component';
import { GullakPendingDetailComponent } from './component/gullak-pending-detail/gullak-pending-detail.component';
import { GullakPendingComponent } from './component/gullak-pending/gullak-pending.component';
import { CustomerTargetDashboardComponent } from './component/customerTargetDashboard/customer-target-dashboard/customer-target-dashboard.component';
import { CustomerMembershiplistComponent } from './component/customer-membershiplist/customer-membershiplist.component';
import { SalesTargetComponent } from './component/sales-target/sales-target.component';
import { GullakcashbackmasterComponent } from './component/gullakcashbackmaster/gullakcashbackmaster.component';
import { WalletMasterPageComponent } from './component/wallet-master-page/wallet-master-page.component';
import { AddCustomerRefferalConfigComponent } from './component/add-customer-refferal-config/add-customer-refferal-config.component';
import { CustomerReferralComponent } from './component/customer-referral/customer-referral.component';
import { VanTransactionComponent } from './component/van-transaction/van-transaction.component';
import { CustomerAddressRequestComponent } from './component/customer-address-request/customer-address-request.component';
import { CustomerAddressRequestPartialComponent } from './component/customer-address-request-partial/customer-address-request-partial.component';
import { AgmOverlays } from 'agm-overlays';
import { environment } from 'environments/environment';
import { AgmDirectionModule } from 'agm-direction';
import { CustomerCodLimitComponent } from './component/customer-cod-limit/customer-cod-limit.component';
import { UpdateTargetCustomerComponent } from './component/update-target-customer/update-target-customer.component';
import {HttpClientModule} from '@angular/common/http';
import { NewCustomerTargetDashboardComponent } from './component/new-customer-target-dashboard/new-customer-target-dashboard.component';
import { CustomerProfileComponent } from './component/customer-profile/customer-profile.component';
import { CustomerDetailListComponent } from './component/customer-detail-list/customer-detail-list.component';
import { CrmPlatformConfigurationComponent } from './component/crm-platform-configuration/crm-platform-configuration.component';
import { CrmListPageComponent } from './component/crm-list-page/crm-list-page.component';
import { PlatformListPageComponent } from './component/platform-list-page/platform-list-page.component';
import { ConfigurationPageComponent } from './component/configuration-page/configuration-page.component';
//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';
  
@NgModule({
  declarations: [CustomerComponent, CustomerEditComponent,NewCustomerTargetDashboardComponent, CustomerDetailsComponent, CustomerImagesComponent, CustomerTrendsComponent, HubTransferComponent, CustomerDocumentHistoryComponent, EwayBillOrderComponent, CustomerfeedbackComponent, CustomerChequelimitComponent, DistributorverificationImagesComponent, GullakComponent, GullakDetailComponent, GulakdetailspageComponent, GullakPendingDetailComponent, GullakPendingComponent, CustomerTargetDashboardComponent, CustomerMembershiplistComponent, SalesTargetComponent, GullakcashbackmasterComponent, WalletMasterPageComponent, AddCustomerRefferalConfigComponent, CustomerReferralComponent, VanTransactionComponent, CustomerAddressRequestComponent, CustomerAddressRequestPartialComponent, CustomerCodLimitComponent, UpdateTargetCustomerComponent, CustomerProfileComponent, CustomerDetailListComponent, CrmPlatformConfigurationComponent, CrmListPageComponent, PlatformListPageComponent, ConfigurationPageComponent],
  imports: [
    CommonModule,
    NgbModule,
    CustomerRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    AgmCoreModule,
    ChartsModule,
    FileUploadModule,
    AgmOverlays,
    CardModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKeyGoogle, // "AIzaSyCbogFMyrNTlMdtsrYzgffJ3guhCdzRS2Y",
      libraries: ['drawing', 'places']
    }),
    AgmDirectionModule,
    // DropdownModule

  ],
  providers: [MessageService, ConfirmationService]


})
export class CustomerModule { }

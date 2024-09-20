import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './component/customer/customer.component';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { CustomerDetailsComponent } from './component/customer-details/customer-details.component';
import { EwayBillOrderComponent } from './component/eway-bill-order/eway-bill-order.component';
import { CustomerfeedbackComponent } from './component/customerfeedback/customerfeedback.component';
import { CustomerChequelimitComponent } from './component/customerChequelimit/customer-chequelimit/customer-chequelimit.component';
import { GullakComponent } from './component/gullak/gullak.component';
import { GullakDetailComponent } from './component/gullak-detail/gullak-detail.component';
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
import { CustomerCodLimitComponent } from './component/customer-cod-limit/customer-cod-limit.component';
import { UpdateTargetCustomerComponent } from './component/update-target-customer/update-target-customer.component';
import { NewCustomerTargetDashboardComponent } from './component/new-customer-target-dashboard/new-customer-target-dashboard.component';
import { CustomerDetailListComponent } from './component/customer-detail-list/customer-detail-list.component';
import { CustomerProfileComponent } from './component/customer-profile/customer-profile.component';
import { CrmPlatformConfigurationComponent } from './component/crm-platform-configuration/crm-platform-configuration.component';




const routes: Routes = [
  { path: 'newCustomerTargetDashboard', component: NewCustomerTargetDashboardComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer-edit', component: CustomerEditComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: 'ewayBillOrder', component: EwayBillOrderComponent },
  { path: 'customerFeedback', component: CustomerfeedbackComponent },
  { path: 'customerchequelimit', component: CustomerChequelimitComponent },
  { path: 'gullak', component: GullakComponent },
  { path: 'gullak/:Id/:CustomerId', component: GullakDetailComponent },
  { path: 'gullak/:WarehouseId', component: GullakComponent },
  { path: 'gullakpending/:Id/:CustomerId', component: GullakPendingDetailComponent },
  { path: 'gullakpending', component: GullakPendingComponent },
  { path: 'customertargetDashboard', component: CustomerTargetDashboardComponent },
  { path: 'customer-membershiplist', component: CustomerMembershiplistComponent },
  { path: 'Sales-Target', component: SalesTargetComponent },
  { path: 'Gullak-CashBack', component: GullakcashbackmasterComponent },
  { path: 'Wallet-Master', component: WalletMasterPageComponent },
  { path: 'add-customer-refferal-config', component: AddCustomerRefferalConfigComponent },
  { path: 'customer-refferal', component: CustomerReferralComponent },
  { path: 'van-transaction', component: VanTransactionComponent },
  { path: 'customer-address-request', component: CustomerAddressRequestComponent },
  { path: 'custCodLimit', component: CustomerCodLimitComponent },
  { path:'updateTarget', component:UpdateTargetCustomerComponent},
  // {path : 'customerDetail',component : TestComponent},
  {path : 'customerDetail',component : CustomerDetailListComponent},
  {path : 'customerProfile',component : CustomerProfileComponent},
  {path : 'customerProfile/:custId',component : CustomerProfileComponent},
  {path : 'crm-platform-config',component : CrmPlatformConfigurationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

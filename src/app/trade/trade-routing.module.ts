import { BidmanagementreportComponent } from './components/bidmanagementreport/bidmanagementreport.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerTradeListComponent } from './components/customertrade-list/customertrade-list.component';
import { PriceTickerComponent } from './components/price-ticker/price-ticker.component';
import { CurrentBidComponent } from './components/current-bid/current-bid.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CDashboardComponent } from './components/cdashboard/cdashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { ItemDashboardComponent } from './components/item-dashboard/item-dashboard.component';
import { TradeItemComponent } from './components/trade-item/trade-item.component';
import { AddTradeItemComponent } from './components/add-trade-item/add-trade-item.component';
import { OrderComponent } from './components/order/order.component';
import { ApproveCustomerRequestComponent } from './components/approve-customer-request/approve-customer-request.component';
import { CustomerTradeEditComponent } from './components/customertrade-edit/customertrade-edit.component';
import { CustomerMessagesComponent } from './components/customer-messages/customer-messages.component';
import { TradeAppVersionComponent } from './components/trade-app-version/trade-app-version.component';
import { TradeDashboardComponent } from './components/trade-dashboard/trade-dashboard.component';
import { MisTargetComponent } from './components/mis-target/mis-target.component';
import { MisDashboardComponent } from './components/mis-dashboard/mis-dashboard.component';
import { TradeCommissionComponent } from './components/trade-commission/trade-commission.component';
import { TradeCommissionListComponent } from './components/trade-commission-list/trade-commission-list.component';
import { AppStartupPopupsComponent } from './components/app-startup-popups/app-startup-popups.component';
import { CustomerSupportChatComponent } from './components/customer-support-chat/customer-support-chat.component';
import { TradeCityComponent } from './components/trade-city/trade-city.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { CustomerWalletComponent } from './components/customer-wallet/customer-wallet.component';
import { CustomerShoppingCartComponent } from './components/customer-shopping-cart/customer-shopping-cart.component';
import { ShoppingCartDetailsComponent } from './components/shopping-cart-details/shopping-cart-details.component';
import { ConsumerOrderComponent } from './components/consumer-order/consumer-order.component';
import { CustomerNotificationComponent } from './components/customer-notification/customer-notification.component';
import { ZaruriappDashboardComponent } from './components/zaruriapp-dashboard/zaruriapp-dashboard.component';
import { TkSellerwiseDashboardComponent } from './components/tk-sellerwise-dashboard/tk-sellerwise-dashboard.component';
import { BulkNotificationComponent } from './components/bulk-notification/bulk-notification.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { ApproveItemsRequestComponent } from './components/approve-items-request/approve-items-request.component';
import { TkOnskAppdataComponent } from './components/tk-onsk-appdata/tk-onsk-appdata.component';


const routes: Routes = [
  {path:'customer-list', component: CustomerTradeListComponent},
  {path:'price-ticker', component: PriceTickerComponent},
  {path:'current-bid', component: CurrentBidComponent},
  {path:'line-chart', component: LineChartComponent},
  {path:'cdashboard', component: CDashboardComponent},
  {path: 'customer/:customerId/:customername', component: CustomerDashboardComponent},
  {path: 'item/:itemid/:itemname', component: ItemDashboardComponent},
  {path: 'trade-item', component: TradeItemComponent},
  {path: 'add-item', component: AddTradeItemComponent},
  {path: 'order', component: OrderComponent},
  {path: 'approve-customer', component: ApproveCustomerRequestComponent},
  {path:'customer-edit/:customerId', component: CustomerTradeEditComponent},
  {path:'customer-msg-list', component: CustomerMessagesComponent},
  {path: 'trade-app-version' , component:TradeAppVersionComponent},
  {path: 'trade-dashboard' , component:TradeDashboardComponent},
  {path: 'mis-target' , component:MisTargetComponent},
  {path: 'mis-dashboard' , component:MisDashboardComponent},
  {path: 'trade-commission' , component:TradeCommissionComponent},
  {path: 'trade-commission-list' , component:TradeCommissionListComponent},
  {path: 'app-startup-popups' , component:AppStartupPopupsComponent},
  {path: 'trade-chat' , component:CustomerSupportChatComponent},
  {path: 'trade-city' , component:TradeCityComponent},
  {path: 'issue-list' , component:IssueListComponent},
  {path: 'customer-wallet' , component:CustomerWalletComponent},
  {path: 'customer-shopping-cart' , component:CustomerShoppingCartComponent},
  {path:'shopping-cart-details/:customerId', component: ShoppingCartDetailsComponent},
  {path: 'consumer-order' , component:ConsumerOrderComponent},
  {path: 'bid-management-report' , component:BidmanagementreportComponent},
  {path: 'customer-notification' , component:CustomerNotificationComponent},
  {path: 'zaruriapp-dashboard' , component:ZaruriappDashboardComponent},
  {path: 'tk-sellerwise-dashboard' , component:TkSellerwiseDashboardComponent},
  {path: 'bulk-notification' , component:BulkNotificationComponent},
  {path: 'company-details' , component:CompanyDetailsComponent},
  {path: 'approve-items-request' , component:ApproveItemsRequestComponent},
  {path: 'tk-onsk-appdata' , component:TkOnskAppdataComponent},

  { path: 'trade-zone', loadChildren: () => import('./modules/trade-zone/trade-zone.module').then(m => m.TradeZoneModule) },
  { path: 'trade-picker', loadChildren: () => import('./modules/trade-picked/trade-picked.module').then(m => m.TradePickedModule) },




  



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule { }

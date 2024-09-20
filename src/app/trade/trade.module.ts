import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeRoutingModule } from './trade-routing.module';
import { CustomerTradeListComponent } from './components/customertrade-list/customertrade-list.component';
import { CustomerTradeEditComponent } from './components/customertrade-edit/customertrade-edit.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { PriceTickerComponent } from './components/price-ticker/price-ticker.component';
import { CurrentBidComponent } from './components/current-bid/current-bid.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { CDashboardComponent } from './components/cdashboard/cdashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { ItemDashboardComponent } from './components/item-dashboard/item-dashboard.component';
import { TradeItemComponent } from './components/trade-item/trade-item.component';
import { AddTradeItemComponent } from './components/add-trade-item/add-trade-item.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ApproveCustomerRequestComponent } from './components/approve-customer-request/approve-customer-request.component';
import { CustomerMessagesComponent } from './components/customer-messages/customer-messages.component';
import { TradeAppVersionComponent } from './components/trade-app-version/trade-app-version.component';
import { TradeDashboardComponent } from './components/trade-dashboard/trade-dashboard.component';
import { MisTargetComponent } from './components/mis-target/mis-target.component';
import { MisDashboardComponent } from './components/mis-dashboard/mis-dashboard.component';
import { TradeCommissionComponent } from './components/trade-commission/trade-commission.component';
import { TradeCommissionListComponent } from './components/trade-commission-list/trade-commission-list.component';
import { AppStartupPopupsComponent } from './components/app-startup-popups/app-startup-popups.component';
import { CustomerSupportChatComponent } from './components/customer-support-chat/customer-support-chat.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import {TreeModule} from 'primeng/tree';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { CustomerWalletComponent } from './components/customer-wallet/customer-wallet.component';
import { TradeCityComponent } from './components/trade-city/trade-city.component';
import { CustomerShoppingCartComponent } from './components/customer-shopping-cart/customer-shopping-cart.component';
import { ShoppingCartDetailsComponent } from './components/shopping-cart-details/shopping-cart-details.component';
import { ConsumerOrderComponent } from './components/consumer-order/consumer-order.component';
import { ConsumerItemdetailsComponent } from './components/consumer-itemdetails/consumer-itemdetails.component';
import { AgmOverlays } from 'agm-overlays';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ConsumerOrderDirectionComponent } from './components/consumer-order-direction/consumer-order-direction.component';
import { BidmanagementreportComponent } from './components/bidmanagementreport/bidmanagementreport.component';
import { CustomerCouponCodeComponent } from './components/customer-coupon-code/customer-coupon-code.component';
import { CouponCodeUploadComponent } from './components/coupon-code-upload/coupon-code-upload.component';
import { CustomerNotificationComponent } from './components/customer-notification/customer-notification.component';
import { ZaruriappDashboardComponent } from './components/zaruriapp-dashboard/zaruriapp-dashboard.component';
import { TkSellerwiseDashboardComponent } from './components/tk-sellerwise-dashboard/tk-sellerwise-dashboard.component';
import { BulkNotificationComponent } from './components/bulk-notification/bulk-notification.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { ApproveItemsRequestComponent } from './components/approve-items-request/approve-items-request.component';
import { TkOnskAppdataComponent } from './components/tk-onsk-appdata/tk-onsk-appdata.component';
@NgModule({
  declarations: [
    CustomerTradeListComponent,
    CustomerTradeEditComponent,
    PriceTickerComponent,
    CurrentBidComponent,
    LineChartComponent,
    CDashboardComponent,
    CustomerDashboardComponent,
    ItemDashboardComponent,
    TradeItemComponent,
    AddTradeItemComponent,
    OrderComponent,
    OrderDetailsComponent,
    ApproveCustomerRequestComponent,
    CustomerMessagesComponent,
    TradeAppVersionComponent,
    TradeDashboardComponent,
    MisTargetComponent,
    MisDashboardComponent,
    TradeCommissionComponent,
    TradeCommissionListComponent,
    AppStartupPopupsComponent,
    CustomerSupportChatComponent,
     TradeCityComponent,
    IssueListComponent,
    CustomerWalletComponent,
    CustomerShoppingCartComponent,
    ShoppingCartDetailsComponent,
    ConsumerOrderComponent,
    ConsumerItemdetailsComponent,
    ConsumerOrderDirectionComponent,
    BidmanagementreportComponent,
    CustomerCouponCodeComponent,
    CouponCodeUploadComponent,
    CustomerNotificationComponent,
    ZaruriappDashboardComponent,
    TkSellerwiseDashboardComponent,
    BulkNotificationComponent,
    CompanyDetailsComponent,
    ApproveItemsRequestComponent,
    TkOnskAppdataComponent,
  
   
  ],
  imports: [
    CommonModule,
    TradeRoutingModule,
    ShaopkiranaSharedModule,
    SkSharedModule,
    TreeModule,
    OrganizationChartModule,
    AgmOverlays,
    AgmCoreModule,
    AgmDirectionModule
  ],
   
  exports: [CouponCodeUploadComponent]
})
export class TradeModule { }

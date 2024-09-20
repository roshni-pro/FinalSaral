import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesAppBackendPagesRoutingModule } from './sales-app-backend-pages-routing.module';
import { SkuConfigurationComponent } from './Components/sku-configuration/sku-configuration.component';
import { SalesGroupComponent } from './Components/sales-group/sales-group.component';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/primeng';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import {OrderListModule} from 'primeng/orderlist';
import {InputTextModule} from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SalesPersonDashboardComponent } from './Components/sales-person-dashboard/sales-person-dashboard.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {ListboxModule} from 'primeng/listbox';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SharedModule } from 'app/shared/shared.module';
import { AddCustomerComponent } from './Components/add-customer/add-customer.component';
import { CardModule } from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {SplitButtonModule} from 'primeng/splitbutton';
import {CalendarModule} from 'primeng/calendar';
import { TooltipModule } from "primeng/tooltip";
import { TopSKUComponent } from './Components/top-sku/top-sku.component';
import { PromotionsComponent } from './Components/promotions/promotions.component';
import { SalesAppConfigComponent } from './Components/sales-app-config/sales-app-config.component';
import { SalesAppConfigCatalogCreateNewComponent } from './Components/sales-app-config-catalog-create-new/sales-app-config-catalog-create-new.component';
import { SalesAppConfigCatalogComponent } from './Components/sales-app-config-catalog/sales-app-config-catalog.component';
import {TabViewModule} from 'primeng/tabview';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuModule} from 'primeng/menu';
import { ProductCatalogeMainComponent } from './Components/product-cataloge-main/product-cataloge-main.component';
import { ProductCatalogComponent } from './Components/product-catalog/product-catalog.component';
import { AddPromotionComponent } from './Components/add-promotion/add-promotion.component';
import { SalesAppCheckoutComponent } from './Components/sales-app-checkout/sales-app-checkout.component';
import { SalesAppBeatEditComponent } from './Components/sales-app-beat-edit/sales-app-beat-edit.component';
import { BeatDSRComponent } from './Components/beat-dsr/beat-dsr.component';
import { StoreTargetDashboardComponent } from './Components/store-target-dashboard/store-target-dashboard.component';
import { ItemClassificationIncentiveReportComponent } from './Components/item-classification-incentive-report/item-classification-incentive-report.component';
import { SalesExecutiveAttendanceComponent } from './Components/sales-executive-attendance/sales-executive-attendance.component';
import { TreeTableModule } from 'primeng/treetable';
import { AttendanceRulesComponent } from './Components/attendance-rules/attendance-rules.component';
import { AttendanceRulesCreateNewComponent } from './Components/attendance-rules-create-new/attendance-rules-create-new.component';
import { GameBucketRewardComponent } from './Components/game-bucket-reward/game-bucket-reward.component';
import { GameBucketRewardsConditionComponent } from './Components/game-bucket-rewards-condition/game-bucket-rewards-condition.component';
import { SalesPerformanceDashboardComponent } from './Components/sales-performance-dashboard/sales-performance-dashboard.component';
import { GamingRewardDashboardComponent } from './Components/gaming-reward-Dashboard/gaming-reward-Dashboard.component';
import { LevalSpecificConfigComponent } from './Components/leval-specific-config/leval-specific-config.component';
import { AddLevelConfigComponent } from './Components/add-level-config/add-level-config.component';
import { StreakDashboardComponent } from './Components/streak-dashboard/streak-dashboard.component';
import { BeatDsrTabsComponent } from './Components/beat-dsr-tabs/beat-dsr-tabs.component';
import { TelecallerBeatDsrComponent } from './Components/telecaller-beat-dsr/telecaller-beat-dsr.component';
import { DigitalBeatDsrComponent } from './Components/digital-beat-dsr/digital-beat-dsr.component';
import { SalesReturnComponent } from './Components/sales-return/sales-return.component';
import { SalesReturnConfigComponent } from './Components/sales-return-config/sales-return-config.component';
import { WarehouseQuadrantsComponent } from './Components/warehouse-quadrants/warehouse-quadrants.component';
import { ProductPerformanceDashboardComponent } from './Components/product-performance-dashboard/product-performance-dashboard.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ProductPerformanceConfigComponent } from './Components/product-performance-config/product-performance-config.component';
import { ZsmApprovalComponent } from './Components/zsm-approval/zsm-approval.component';
import { CustomerChannelMappingComponent } from './Components/customer-channel-mapping/customer-channel-mapping.component';

  @NgModule({
    
  declarations: [SalesGroupComponent,SkuConfigurationComponent, SalesPersonDashboardComponent,AddCustomerComponent,BeatDSRComponent, TopSKUComponent, PromotionsComponent,SalesAppConfigComponent,KeysPipe
  ,SalesAppConfigCatalogCreateNewComponent,SalesAppConfigCatalogComponent, ProductCatalogeMainComponent, ProductCatalogComponent, AddPromotionComponent, SalesAppCheckoutComponent, SalesAppBeatEditComponent, StoreTargetDashboardComponent
,ItemClassificationIncentiveReportComponent, SalesExecutiveAttendanceComponent, AttendanceRulesComponent, AttendanceRulesCreateNewComponent, GameBucketRewardComponent, GameBucketRewardsConditionComponent, SalesPerformanceDashboardComponent,
GamingRewardDashboardComponent,LevalSpecificConfigComponent, AddLevelConfigComponent, StreakDashboardComponent, BeatDsrTabsComponent, TelecallerBeatDsrComponent, DigitalBeatDsrComponent, SalesReturnComponent, SalesReturnConfigComponent, WarehouseQuadrantsComponent, ProductPerformanceDashboardComponent
,ProductPerformanceConfigComponent,ZsmApprovalComponent, CustomerChannelMappingComponent],
  imports: [
    CommonModule,
    FormsModule,
    SkSharedModule,
    AutoCompleteModule,OrderListModule,
    SalesAppBackendPagesRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    HttpClientModule,
    TabViewModule,
    PanelMenuModule,
    ToastModule,
    MenuModule,
    ConfirmDialogModule,
    SelectButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
    ListboxModule,
    ShaopkiranaSharedModule,
    SharedModule,
    TreeTableModule,
    CardModule,CheckboxModule,SplitButtonModule,CalendarModule,TooltipModule
  ]
})
export class SalesAppBackendPagesModule { }

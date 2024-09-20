import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkuConfigurationComponent } from './Components/sku-configuration/sku-configuration.component';
import { SalesGroupComponent } from './Components/sales-group/sales-group.component';
import { SalesPersonDashboardComponent } from './Components/sales-person-dashboard/sales-person-dashboard.component';
import { AddCustomerComponent } from './Components/add-customer/add-customer.component';
import { SalesAppConfigComponent } from './Components/sales-app-config/sales-app-config.component';
import { SalesAppConfigCatalogCreateNewComponent } from './Components/sales-app-config-catalog-create-new/sales-app-config-catalog-create-new.component';
import { ProductCatalogeMainComponent } from './Components/product-cataloge-main/product-cataloge-main.component';
import { PromotionsComponent } from './Components/promotions/promotions.component';
import { StoreTargetDashboardComponent } from './Components/store-target-dashboard/store-target-dashboard.component';
import { ItemClassificationIncentiveReportComponent } from './Components/item-classification-incentive-report/item-classification-incentive-report.component';
import { BeatDSRComponent } from './Components/beat-dsr/beat-dsr.component';
import { SalesExecutiveAttendanceComponent } from './Components/sales-executive-attendance/sales-executive-attendance.component';
import { AttendanceRulesCreateNewComponent } from './Components/attendance-rules-create-new/attendance-rules-create-new.component';
import { AttendanceRulesComponent } from './Components/attendance-rules/attendance-rules.component';
import { SalesPerformanceDashboardComponent } from './Components/sales-performance-dashboard/sales-performance-dashboard.component';
import { GameBucketRewardComponent } from './Components/game-bucket-reward/game-bucket-reward.component';
import { GameBucketRewardsConditionComponent } from './Components/game-bucket-rewards-condition/game-bucket-rewards-condition.component';
import { GamingRewardDashboardComponent } from './Components/gaming-reward-Dashboard/gaming-reward-Dashboard.component';
import { AddLevelConfigComponent } from './Components/add-level-config/add-level-config.component';
import { LevalSpecificConfigComponent } from './Components/leval-specific-config/leval-specific-config.component';
import { StreakDashboardComponent } from './Components/streak-dashboard/streak-dashboard.component';
import { BeatDsrTabsComponent } from './Components/beat-dsr-tabs/beat-dsr-tabs.component';
import { SalesReturnComponent } from './Components/sales-return/sales-return.component';
import { WarehouseQuadrantsComponent } from './Components/warehouse-quadrants/warehouse-quadrants.component';
import { ProductPerformanceDashboardComponent } from './Components/product-performance-dashboard/product-performance-dashboard.component';
import { ProductPerformanceConfigComponent } from './Components/product-performance-config/product-performance-config.component';
import { ZsmApprovalComponent } from './Components/zsm-approval/zsm-approval.component';
import { CustomerChannelMappingComponent } from './Components/customer-channel-mapping/customer-channel-mapping.component';




const routes: Routes = [
  {path:'CustomerChannelMapping',component:CustomerChannelMappingComponent},
  {path:'SalesExecutiveAttendance',component:SalesExecutiveAttendanceComponent},
  {
    path:'SalesPerformanceDashboard',
    component:SalesPerformanceDashboardComponent
  },
  {
    path:'BeatDSR',
    component:BeatDsrTabsComponent
  },
  {
    path:'productperformance-dashboard',
    component:ProductPerformanceDashboardComponent
  },
  {
  path:'gamingRewardDashboard',
  component:GamingRewardDashboardComponent
  },
  {
  path:'salesGroups',
  component:SalesGroupComponent
},
{
  path:'SkuConfig',
  component:SkuConfigurationComponent
},
{
  path:'salesTargetDashboard',
  component:SalesPersonDashboardComponent
},
{
  path:'salesAddCustomers/:storename/:groupname',
  component:AddCustomerComponent
},
{
  path:'SalesAppConfig',
  component:SalesAppConfigComponent
  
},
// {path:'edit-cfr/:cfrId', component: CfrDetailComponent},
{
  path:'SalesAppConfigCatalogCreateNewComponent',
  component:SalesAppConfigCatalogCreateNewComponent
},
{
  path:'SalesAppConfigCatalogCreateNewComponent/:cityId/:isShow',
  component:SalesAppConfigCatalogCreateNewComponent
},
{
  path:'productCatalogeMainComponent',
  component:ProductCatalogeMainComponent
},{
  path:'StoreTargetDashboardComponent',
  component:StoreTargetDashboardComponent
},
{
  path:'Classification-IncentiveReport',
  component:ItemClassificationIncentiveReportComponent
},
{
  path:'AttendanceRules',
  component:AttendanceRulesComponent
},{
  path:'AttendanceTA/DA_Rules/:storeId/:AttendaceConfigId/:isShow/:Menu',
  component:AttendanceRulesCreateNewComponent
},
{
  path:'GameBucketRewards',
  component:GameBucketRewardComponent
},
{
  path:'GameBucketRewardsConditions',
  component:GameBucketRewardsConditionComponent
},
{
  path:'LevelConfig',
  component:LevalSpecificConfigComponent
},
{
  path:'addLevelConfig',
  component:AddLevelConfigComponent
},
{
  path:'StreakDashboard',
  component:StreakDashboardComponent
},
{
  path:'SalesReturn',
  component:SalesReturnComponent
},
{
  path:'warehouse-quadrants',
  component:WarehouseQuadrantsComponent
},{
  path:'PerformanceConfig',
  component:ProductPerformanceConfigComponent
},{
  path:'ZSMapproval',component:ZsmApprovalComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesAppBackendPagesRoutingModule { }

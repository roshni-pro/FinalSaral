import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandWiseSaleCompaireActualVsForecastComponent } from './component/brand-wise-sale-compaire-actual-vs-forecast/brand-wise-sale-compaire-actual-vs-forecast.component';
import { BuyerForecastUploadComponent } from './component/buyer-forecast-upload/buyer-forecast-upload.component';
import { ItemForecastForPoComponent } from './component/item-forecast-for-po/item-forecast-for-po.component';
import { ItemWiseSaleCompaireActualVsForecastComponent } from './component/item-wise-sale-compaire-actual-vs-forecast/item-wise-sale-compaire-actual-vs-forecast.component';
import { InventoryForcastModule } from './inventory-forcast.module';
import { SalesIntentApprovalComponent } from './component/sales-intent-approval/sales-intent-approval.component';
import { ShowPendingRequestComponent } from './component/show-pending-request/show-pending-request.component';
import { BuyersEditComponent } from './component/buyers-edit/buyers-edit.component';
import { BuyerApprovedItemForcastComponent } from './component/buyer-approved-item-forcast/buyer-approved-item-forcast.component';
import { FutureMultiMrpMappingComponent } from './component/future-multi-mrp-mapping/future-multi-mrp-mapping/future-multi-mrp-mapping.component';
import { ForCastInventoryDaysComponent } from './component/for-cast-inventory-days/for-cast-inventory-days.component';
// import { PoCreateStatusComponent } from './component/po-create-status/po-create-status.component';
import { InventoryRestrictionComponent } from './component/inventory-restriction/inventory-restriction.component';
import { IndentPerformanceDashboardComponent } from './component/indent-performance-dashboard/indent-performance-dashboard.component';
import { AutoPOReportComponent } from './component/auto-poreport/auto-poreport.component';



const routes: Routes = [
  {
    path:'InventoryRestriction',
    component:InventoryRestrictionComponent
  },
  {
    path: 'buyerforecast',
    component: BuyerForecastUploadComponent
  },
  // {
  //   path: 'PoCreateStatus',
  //   component: PoCreateStatusComponent
  // },
  {
    path: 'BrandWiseSaleCompaireAVF',
    component: BrandWiseSaleCompaireActualVsForecastComponent
  },
  {
    path: 'ItemWiseSaleCompaireAVF',
    component: ItemWiseSaleCompaireActualVsForecastComponent
  },
  {
    path: 'ItemForecastForPO',
    component: ItemForecastForPoComponent
  },
  {
    path: 'buyerEdit',
    component: BuyersEditComponent
  },
  
  {
    path:'salesintentapproval',
    component:SalesIntentApprovalComponent
  }
  ,
  {
    path:'showpendingrequest',
    component:ShowPendingRequestComponent
  },
  {
    path:'buyerApprovedItemForcast',
    component:BuyerApprovedItemForcastComponent
  },
   {
    path: 'futuremultimrp',
    component: FutureMultiMrpMappingComponent
  },
  {
    path: 'forCastInventorDays',
    component: ForCastInventoryDaysComponent
  },
  {
    path:'indentPerformanceDashboard',
    component:IndentPerformanceDashboardComponent
  },
  {
    path:'autoPoReport',
    component:AutoPOReportComponent
  }

  // {
  //   path:'salesintentapproval',
  //   component:SalesIntentApprovalComponent
  // }
  // ,
  // {
  //   path:'showpendingrequest',
  //   component:ShowPendingRequestComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryForcastRoutingModule { }

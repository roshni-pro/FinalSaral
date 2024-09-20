import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentStockComponent } from './component/current-stock/current-stock.component';
import { InventoryCycleApprovalComponent } from './component/inventory-cycle-approval/inventory-cycle-approval.component';
import { VirtualStockListComponent } from './component/virtual-stock-list/virtual-stock-list.component';
import { InventoryCycleAssignSupervisiorComponent } from './component/inventory-cycle-assign-supervisior/inventory-cycle-assign-supervisior.component';
import { InventoryCycleComponent } from './component/inventory-cycle/inventory-cycle.component';
import { MovementStockRequestComponent } from './component/movement-stock-request/movement-stock-request.component';
import { HqStockMovementRequestComponent } from './component/hq-stock-movement-request/hq-stock-movement-request.component';
import { NonSellableAndClearanceStocksComponent } from './component/non-sellable-and-clearance-stocks/non-sellable-and-clearance-stocks.component';
import { ClearanceLiveItemListComponent } from './component/clearance-live-item-list/clearance-live-item-list.component';
import { TransferClearanceStockToClearanceLiveItemsComponent } from './component/transfer-clearance-stock-to-clearance-live-items/transfer-clearance-stock-to-clearance-live-items.component';
import { ClearanceNonSellableComponent } from './component/clearance-non-sellable/clearance-non-sellable.component';
import { ClearanceStockMovementOrderComponent } from './component/clearance-stock-movement-order/clearance-stock-movement-order.component';
import { ClearanceNonChangeRequestComponent } from './component/clearance-non-change-request/clearance-non-change-request.component';
import { InventoryCycleApprovalForWHComponent } from './component/inventory-cycle-approval-for-wh/inventory-cycle-approval-for-wh.component';
import { AutoOfferConfigurationComponent } from './component/auto-offer-configuration/auto-offer-configuration.component';
import { ClearanceOrderPickerComponent } from './component/clearance-order-picker/clearance-order-picker.component';
import { PvReconciliationComponent } from './component/pv-reconciliation/pv-reconciliation.component';
import { ClearancePerformanceDashboardComponent } from './component/clearance-performance-dashboard/clearance-performance-dashboard.component';
import { NonRevenueOrdersComponent } from './component/non-revenue-orders/non-revenue-orders.component';
const routes: Routes = [
  { path: 'current-stock', component: CurrentStockComponent },
  { path: 'inventory-cycle-approval', component: InventoryCycleApprovalComponent },
  { path: 'inventory-cycle-approval-wh', component: InventoryCycleApprovalForWHComponent },
  { path: 'virtualStockList', component: VirtualStockListComponent },
  { path: 'inventory-cycle-assign-supervisior', component: InventoryCycleAssignSupervisiorComponent },
  { path: 'inventory-cycle', component: InventoryCycleComponent },
  { path: 'warehouse-stock-movement-request', component: MovementStockRequestComponent },
  { path: 'hq-stock-movement-request', component: HqStockMovementRequestComponent },
  { path: 'non-sellable-clearance-stocks', component: NonSellableAndClearanceStocksComponent },
  { path: 'clearanceLiveItemList', component: ClearanceLiveItemListComponent },
  { path: 'clearanceStock', component: TransferClearanceStockToClearanceLiveItemsComponent },
  { path: 'clearance-non-sellable', component: ClearanceNonSellableComponent },
  {path: 'clearance-stock-movement', component:ClearanceStockMovementOrderComponent},
  {path:'clearance-change-request',component:ClearanceNonChangeRequestComponent},
  {path :'auto-offer',component:AutoOfferConfigurationComponent},
  {path:'clearance-order-picker' ,component :ClearanceOrderPickerComponent},
  {path:'pv-reconciliation' ,component :PvReconciliationComponent},
  {path:'clearance-performance-dashboard' ,component :ClearancePerformanceDashboardComponent},
  {path:'Non-Revenue-Orders',component :NonRevenueOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentStockRoutingModule { }

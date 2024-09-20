import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VirtualStockManagementComponent } from './Components/virtual-stock-management/virtual-stock-management.component';
import { VirtualStockDetailListComponent } from './Components/virtual-stock-detail-list/virtual-stock-detail-list.component';
import { VirtualStockSettlementComponent } from './Components/virtual-stock-settlement/virtual-stock-settlement.component';
import { VirtualStockManagementViewComponent } from './Components/virtual-stock-management-view/virtual-stock-management-view.component';
import { VirtualMultiStockReportListComponent } from './Components/virtual-multi-stock-report-list/virtual-multi-stock-report-list.component';
import { ManageVirtualStockComponent } from './Components/manage-virtual-stock/manage-virtual-stock.component';
import { StockHistoryComponent } from './Components/stock-history/stock-history.component';
import { DynamicStockListComponent } from './Components/dynamic-stock-list/dynamic-stock-list.component';

const routes: Routes = [
  { path: 'manage', component: VirtualStockManagementComponent },
  { path: '', component: ManageVirtualStockComponent },
  { path: 'stock-history', component: StockHistoryComponent },
  { path: 'virtualStockManagement', component: VirtualStockManagementComponent },
  { path: 'virtualStockDetailList', component: VirtualStockDetailListComponent },
  { path: 'stockSettlement', component: VirtualStockSettlementComponent },
  { path: 'virtualStockManagement/:ItemMultiMRPId/:WarehouseId/:ItemName', component: VirtualStockManagementComponent },
  { path: 'virtualStockManagementView', component: VirtualStockManagementViewComponent },
  { path: 'virtualStockList', component: VirtualMultiStockReportListComponent },
  { path: 'DynamicStockList', component: DynamicStockListComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VirtualStockRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CurrentStockRoutingModule } from './current-stock-routing.module';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CurrentStockComponent } from './component/current-stock/current-stock.component';
import { CurrentStockDetailsComponent } from './component/current-stock-details/current-stock-details.component';
import { CurrentStockFormComponent } from './component/current-stock-form/current-stock-form.component';
import { CurrentStockHistoryComponent } from './component/current-stock-history/current-stock-history.component';
import { TransfertofreestockComponent } from './component/transfertofreestock/transfertofreestock.component';
import { InventoryCycleApprovalComponent } from './component/inventory-cycle-approval/inventory-cycle-approval.component';
import { VirtualStockListComponent } from './component/virtual-stock-list/virtual-stock-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { InventoryCycleAssignSupervisiorComponent } from './component/inventory-cycle-assign-supervisior/inventory-cycle-assign-supervisior.component';
import { InventoryCycleComponent } from './component/inventory-cycle/inventory-cycle.component';
import { MovementStockRequestComponent } from './component/movement-stock-request/movement-stock-request.component';
import { HqStockMovementRequestComponent } from './component/hq-stock-movement-request/hq-stock-movement-request.component';
import { NonSellableAndClearanceStocksComponent } from './component/non-sellable-and-clearance-stocks/non-sellable-and-clearance-stocks.component';
import { ClearanceLiveItemListComponent } from './component/clearance-live-item-list/clearance-live-item-list.component';
import { TransferClearanceStockToClearanceLiveItemsComponent } from './component/transfer-clearance-stock-to-clearance-live-items/transfer-clearance-stock-to-clearance-live-items.component';
import { ClearanceNonSellableComponent } from './component/clearance-non-sellable/clearance-non-sellable.component';
import { ClearanceStockMovementOrderComponent } from './component/clearance-stock-movement-order/clearance-stock-movement-order.component';
import { NgxPrintModule } from 'ngx-print';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { ClearanceNonChangeRequestComponent } from './component/clearance-non-change-request/clearance-non-change-request.component';
import { InventoryCycleApprovalForWHComponent } from './component/inventory-cycle-approval-for-wh/inventory-cycle-approval-for-wh.component';
//import { AutoOfferConfigurationComponent } from './component/auto-offer-configuration/auto-offer-configuration.component';
import { ClearanceOrderPickerComponent } from './component/clearance-order-picker/clearance-order-picker.component';
import { AutoOfferConfigurationComponent } from './component/auto-offer-configuration/auto-offer-configuration.component';
import { PvReconciliationComponent } from './component/pv-reconciliation/pv-reconciliation.component';
import { ClearancePerformanceDashboardComponent } from './component/clearance-performance-dashboard/clearance-performance-dashboard.component';
import { NonRevenueOrdersComponent } from './component/non-revenue-orders/non-revenue-orders.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
// import { StockHistoryPartialComponent } from 'app/VirtualStockManagement/Components/stock-history-partial/stock-history-partial.component';
// import { TransfertofreestockComponent } from './component/transfertofreestock/transfertofreestock.component';


//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    // StockHistoryPartialComponent, 
    CurrentStockComponent, CurrentStockDetailsComponent, CurrentStockFormComponent, CurrentStockHistoryComponent, TransfertofreestockComponent, InventoryCycleApprovalComponent, VirtualStockListComponent, ConfirmDialogComponent, InventoryCycleAssignSupervisiorComponent, InventoryCycleComponent, MovementStockRequestComponent, HqStockMovementRequestComponent, NonSellableAndClearanceStocksComponent, ClearanceLiveItemListComponent, TransferClearanceStockToClearanceLiveItemsComponent,AutoOfferConfigurationComponent
  ,ClearanceNonSellableComponent,ClearanceStockMovementOrderComponent, ClearanceNonChangeRequestComponent, InventoryCycleApprovalForWHComponent, ClearanceOrderPickerComponent, PvReconciliationComponent, ClearancePerformanceDashboardComponent, NonRevenueOrdersComponent],
  imports: [
    CommonModule,
    NgbModule,
    CurrentStockRoutingModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    MatDialogModule,
    MatButtonModule,
    ShaopkiranaSharedModule,
    NgxPrintModule,
    MultiSelectModule,
    InputSwitchModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule
    // DropdownModule

  ],
  providers: [MessageService, ConfirmationService],

})
export class CurrentStockModule { }
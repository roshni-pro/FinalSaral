import { AccordionModule } from 'primeng/accordion';
import { HttpClientModule } from '@angular/common/http';
import { VirtualStockService } from './Services/virtual-stock.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualStockManagementComponent } from './Components/virtual-stock-management/virtual-stock-management.component';
import { VirtualStockRoutingModule } from './virtualstock-routing.module';
import { CustomInputModule } from 'app/custom-input/custom-input.module';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { VirtualStockDetailListComponent } from './Components/virtual-stock-detail-list/virtual-stock-detail-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VirtualStockSettlementComponent } from './Components/virtual-stock-settlement/virtual-stock-settlement.component';
import { VirtualStockManagementViewComponent } from './Components/virtual-stock-management-view/virtual-stock-management-view.component';
import { VirtualStockAutoSettleComponent } from './Components/virtual-stock-auto-settle/virtual-stock-auto-settle.component';
import { VirtualMultiStockReportListComponent } from './Components/virtual-multi-stock-report-list/virtual-multi-stock-report-list.component';
import { ManageVirtualStockComponent } from './Components/manage-virtual-stock/manage-virtual-stock.component';
import { StockHistoryPartialComponent } from './Components/stock-history-partial/stock-history-partial.component';
import { StockHistoryComponent } from './Components/stock-history/stock-history.component';
import { DynamicStockListComponent } from './Components/dynamic-stock-list/dynamic-stock-list.component';


@NgModule({
  declarations: [
    VirtualStockManagementComponent,
    VirtualStockDetailListComponent,
    VirtualStockSettlementComponent,
    VirtualStockManagementViewComponent,
    VirtualStockAutoSettleComponent,
    VirtualMultiStockReportListComponent, ManageVirtualStockComponent, StockHistoryPartialComponent, StockHistoryComponent, DynamicStockListComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    NgDragDropModule,
    VirtualStockRoutingModule,
    ProgressSpinnerModule,
    ToastModule,
    AutoCompleteModule,
    BlockUIModule,
    TableModule,
    FormsModule,
    DialogModule,
    HttpClientModule,
    AccordionModule,
    CustomInputModule,
    ShaopkiranaSharedModule,
  ]
})
export class VirtualStockModule { }

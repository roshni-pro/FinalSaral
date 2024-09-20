import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryForcastRoutingModule } from './inventory-forcast-routing.module';
import { BuyerForecastUploadComponent } from './component/buyer-forecast-upload/buyer-forecast-upload.component';
import { ItemWiseSaleCompaireActualVsForecastComponent } from './component/item-wise-sale-compaire-actual-vs-forecast/item-wise-sale-compaire-actual-vs-forecast.component';
import { BrandWiseSaleCompaireActualVsForecastComponent } from './component/brand-wise-sale-compaire-actual-vs-forecast/brand-wise-sale-compaire-actual-vs-forecast.component';
import { SharedModule } from 'app/shared/shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SalesIntentApprovalComponent } from './component/sales-intent-approval/sales-intent-approval.component';
import { ItemForecastForPoComponent } from './component/item-forecast-for-po/item-forecast-for-po.component';
import { DataViewModule } from 'primeng/dataview';
//import { SalesIntentApprovalComponent } from './component/sales-intent-approval/sales-intent-approval.component';
import { FormsModule } from '@angular/forms';
import { ShowPendingRequestComponent } from './component/show-pending-request/show-pending-request.component';import { BuyersEditComponent } from './component/buyers-edit/buyers-edit.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BuyerApprovedItemForcastComponent } from './component/buyer-approved-item-forcast/buyer-approved-item-forcast.component';
import { FutureMultiMrpMappingComponent } from './component/future-multi-mrp-mapping/future-multi-mrp-mapping/future-multi-mrp-mapping.component';
import { ForCastInventoryDaysComponent } from './component/for-cast-inventory-days/for-cast-inventory-days.component';
import { TwoDigitDecimaNumberDirective } from './two-digit-decima-number.directive';
import { PoCreateStatusComponent } from './component/po-create-status/po-create-status.component';
import { InventoryRestrictionComponent } from './component/inventory-restriction/inventory-restriction.component';
import { IndentPerformanceDashboardComponent } from './component/indent-performance-dashboard/indent-performance-dashboard.component';
import { AutoPOReportComponent } from './component/auto-poreport/auto-poreport.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [BuyerForecastUploadComponent,SalesIntentApprovalComponent, 
    ShowPendingRequestComponent, BuyersEditComponent, ItemWiseSaleCompaireActualVsForecastComponent,
     BrandWiseSaleCompaireActualVsForecastComponent, ItemForecastForPoComponent, BuyerApprovedItemForcastComponent, PoCreateStatusComponent,
     FutureMultiMrpMappingComponent, ForCastInventoryDaysComponent,TwoDigitDecimaNumberDirective, InventoryRestrictionComponent, IndentPerformanceDashboardComponent, AutoPOReportComponent],
  
  imports: [
    CommonModule,
    CalendarModule,
    InventoryForcastRoutingModule,
    ShaopkiranaSharedModule,
    DataViewModule,
    SkSharedModule,
    ShaopkiranaSharedModule,
    FormsModule,
    MultiSelectModule,
    TableModule,
    DialogModule,
    BlockUIModule,
    ProgressSpinnerModule,
    

  ]
})
export class InventoryForcastModule { }

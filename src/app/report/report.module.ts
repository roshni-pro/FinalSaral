import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { TurnAroundTimeComponent } from './components/turn-around-time/turn-around-time.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { StockIntransitComponent } from './components/stock-intransit/stock-intransit.component';
import { GSTReportComponent } from './components/gstreport/gstreport.component';

import { B2CSComponent } from './components/b2-cs/b2-cs.component';
import { CreditNoteDetailsComponent } from './components/credit-note-details/credit-note-details.component';
import { ExemptDetailsComponent } from './components/exempt-details/exempt-details.component';
import { HsnSummaryComponent } from './components/hsn-summary/hsn-summary.component';
import { DocumentIssuedComponent } from './components/document-issued/document-issued.component';
import { GstDetailComponent } from './components/gst-detail/gst-detail.component';
import { PocverificationComponent } from './components/pocverification/pocverification.component';
import { KPPDashboardComponent } from './components/kppdashboard/kppdashboard.component';
import { KPPReportComponent } from './components/kppreport/kppreport.component';
import { CADReportComponent } from './components/cadreport/cadreport.component';
import { PocVerifyComponent } from './components/poc-verify/poc-verify.component';
import { SpiandppiComponent } from './components/sPIandPPI/spiandppi/spiandppi.component';
import { WarehouseDashboardComponent } from './components/warehouse-dashboard/warehouse-dashboard.component';
import { DfrComponent } from './components/dfr/dfr.component';
import { CfrComponent } from './components/cfr/cfr.component';
import { ChartModule } from 'primeng/chart';
import { HopDashboardComponent } from './components/hop-dashboard/hop-dashboard.component';
import { HopDahboardSummaryComponent } from './components/hop-dahboard-summary/hop-dahboard-summary.component';
import { SpillOverDashboardComponent } from './components/spill-over-dashboard/spill-over-dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { ChipsModule } from 'primeng/chips';
import { MonthEndDataComponent } from './components/month-end-data/month-end-data.component';
import { MtdSalesReportComponent } from './components/mtd-sales-report/mtd-sales-report.component';
import { DispatchToSpendTrackerComponent } from './components/dispatch-to-spend-tracker/dispatch-to-spend-tracker.component';
import { CmsReportComponent } from './components/cms-report/cms-report.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';

import { InventoryAggingComponent } from './components/inventory-agging/inventory-agging.component';
import { LPReportsComponent } from './components/l-p-reports/l-p-reports.component'
import { HopFieldDashboardComponent } from './components/hop-field-dashboard/hop-field-dashboard.component';
import { BarChartPartialComponent } from './components/bar-chart-partial/bar-chart-partial.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PscostComponent } from './components/pscost/pscost.component';
import { InventoryProvisioningComponent } from './components/inventory-provisioning/inventory-provisioning.component';
import { InventorProvisionGraphComponent } from './components/inventor-provision-graph/inventor-provision-graph.component';
import { KeysPipe } from './pipes/keys.pipe';
import { NewDFRComponent } from './components/new-dfr/new-dfr.component';
//import { MultiSelectModule } from 'primeng/multiselect';
//import {DropdownModule} from 'primeng/dropdown';
// import { FormsModule } from '@angular/forms';
//import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
@NgModule({
  declarations: [TurnAroundTimeComponent, StockIntransitComponent, GSTReportComponent, B2CSComponent, CreditNoteDetailsComponent, ExemptDetailsComponent, HsnSummaryComponent, DocumentIssuedComponent, GstDetailComponent, PocverificationComponent, KPPDashboardComponent, KPPReportComponent, CADReportComponent, PocVerifyComponent, SpiandppiComponent, WarehouseDashboardComponent, DfrComponent, CfrComponent, HopDashboardComponent, HopDahboardSummaryComponent, SpillOverDashboardComponent, MonthEndDataComponent, MtdSalesReportComponent, DispatchToSpendTrackerComponent, CmsReportComponent, InventoryAggingComponent, LPReportsComponent, HopFieldDashboardComponent, BarChartPartialComponent, PscostComponent, InventoryProvisioningComponent, InventorProvisionGraphComponent, KeysPipe, NewDFRComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ShaopkiranaSharedModule,
    ChartModule,
    SharedModule,
    ChipsModule,
    MultiSelectModule,
    DialogModule,
    NgxChartsModule
  ]
})
export class ReportModule { }



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurnAroundTimeComponent } from './components/turn-around-time/turn-around-time.component';
import { StockIntransitComponent } from './components/stock-intransit/stock-intransit.component';
import { GSTReportComponent } from './components/gstreport/gstreport.component';
import { B2CSComponent } from './components/b2-cs/b2-cs.component';
import { ExemptDetailsComponent } from './components/exempt-details/exempt-details.component';
import { CreditNoteDetailsComponent } from './components/credit-note-details/credit-note-details.component';
import { DocumentIssuedComponent } from './components/document-issued/document-issued.component';
import { HsnSummaryComponent } from './components/hsn-summary/hsn-summary.component';
import { PocverificationComponent } from './components/pocverification/pocverification.component';
import { KPPDashboardComponent } from './components/kppdashboard/kppdashboard.component';
import { KPPReportComponent } from './components/kppreport/kppreport.component';
import { CADReportComponent } from './components/cadreport/cadreport.component';
import { PocVerifyComponent } from './components/poc-verify/poc-verify.component';
import { SpiandppiComponent } from './components/sPIandPPI/spiandppi/spiandppi.component';
import { WarehouseDashboardComponent } from './components/warehouse-dashboard/warehouse-dashboard.component';
import { DfrComponent } from './components/dfr/dfr.component';
import { CfrComponent } from './components/cfr/cfr.component';
import { HopDashboardComponent } from './components/hop-dashboard/hop-dashboard.component';
import { HopDahboardSummaryComponent } from './components/hop-dahboard-summary/hop-dahboard-summary.component';
import { SpillOverDashboardComponent } from './components/spill-over-dashboard/spill-over-dashboard.component';
import { MonthEndDataComponent } from './components/month-end-data/month-end-data.component';
import { MtdSalesReportComponent } from './components/mtd-sales-report/mtd-sales-report.component';
import { DispatchToSpendTrackerComponent } from './components/dispatch-to-spend-tracker/dispatch-to-spend-tracker.component';
import { CmsReportComponent } from './components/cms-report/cms-report.component';
import { InventoryAggingComponent } from './components/inventory-agging/inventory-agging.component';
import { LPReportsComponent } from './components/l-p-reports/l-p-reports.component'
import { HopFieldDashboardComponent } from './components/hop-field-dashboard/hop-field-dashboard.component';
import { PscostComponent } from './components/pscost/pscost.component';
import { InventoryProvisioningComponent } from './components/inventory-provisioning/inventory-provisioning.component';
import { InventorProvisionGraphComponent } from './components/inventor-provision-graph/inventor-provision-graph.component';
import { NewDFRComponent } from './components/new-dfr/new-dfr.component';

const routes: Routes = [
  { path: 'tat', component: TurnAroundTimeComponent },
  { path: 'stocktransit', component: StockIntransitComponent },
  { path: 'gstreport', component: GSTReportComponent },
  { path: 'b2-cs', component: B2CSComponent },
  { path: 'exempt-details', component: ExemptDetailsComponent },
  { path: 'credit-note-details', component: CreditNoteDetailsComponent },
  { path: 'document-issued', component: DocumentIssuedComponent },
  { path: 'hsn-summary', component: HsnSummaryComponent },
  { path: 'pocverification', component: PocverificationComponent },
  { path: 'poc-verify', component: PocVerifyComponent },
  { path: 'kpp-dashboard', component: KPPDashboardComponent },
  { path: 'kpp-report', component: KPPReportComponent },
  { path: 'cad-report', component: CADReportComponent },
  { path: 'sPIandPPI', component: SpiandppiComponent },
  { path: 'CancellationDashboard', component: WarehouseDashboardComponent },
  { path: 'DFR-report', component: DfrComponent },
  { path: 'DFR', component: NewDFRComponent },
  { path: 'CFR-report', component: CfrComponent },
  { path: 'hopDashboard', component: HopDashboardComponent },
  { path: 'hopDashSumry', component: HopDahboardSummaryComponent },
  { path: 'spill-over-dashboard', component: SpillOverDashboardComponent },
  { path: 'month-end-data', component: MonthEndDataComponent },
  { path: 'mtd-sales', component: MtdSalesReportComponent },
  { path: 'dispatchToSpendTracker', component: DispatchToSpendTrackerComponent },
  { path: 'Inventory-Agging', component: InventoryAggingComponent },
  { path: 'Inventory-Provisioning', component: InventoryProvisioningComponent },
  { path: 'Inventory-Provisioning-graph', component: InventorProvisionGraphComponent },
  { path: 'cms-report', component: CmsReportComponent },
  { path: 'L&P-report', component: LPReportsComponent },
  { path: 'hop-field-dash', component: HopFieldDashboardComponent },
  { path:'pscostreport',component:PscostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }

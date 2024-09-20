import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFleetMasterComponent } from './components/add-fleet-master/add-fleet-master.component';
import { AddVehicleMasterComponent } from './components/add-vehicle-master/add-vehicle-master.component';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { ClusterWiseOrderListComponent } from './components/cluster-wise-order-list/cluster-wise-order-list.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { DBoyPursuitReportComponent } from './components/dboy-pursuit-report/dboy-pursuit-report.component';
import { FleetMasterListComponent } from './components/fleet-master-list/fleet-master-list.component';
import { FleetUtilizationComponent } from './components/fleet-utilization/fleet-utilization.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OutBoundDashboardComponent } from './components/out-bound-dashboard/out-bound-dashboard.component';
import { PlannerMapComponent } from './components/planner-map/planner-map.component';
import { PlannerMasterComponent } from './components/planner-master/planner-master.component';
import { RedispatchApprovalComponent } from './components/redispatch-approval/redispatch-approval.component';
import { TripReportComponent } from './components/trip-report/trip-report.component';
import { TripSummaryReportComponent } from './components/trip-summary-report/trip-summary-report.component';
import { TripTrackerComponent } from './components/trip-tracker/trip-tracker.component';
import { VehicleCapacityEnhancementComponent } from './components/vehicle-capacity-enhancement/vehicle-capacity-enhancement.component';
import { VehicleConfigurationComponent } from './components/vehicle-configuration/vehicle-configuration.component';
import { VehicleMasterListPageComponent } from './components/vehicle-master-list-page/vehicle-master-list-page.component';
import { VehicledailyreportComponent } from './components/vehicledailyreport/vehicledailyreport.component';
import { VehiclereportComponent } from './components/vehiclereport/vehiclereport.component';
import { LastMileDashboardComponent } from './components/last-mile-dashboard/last-mile-dashboard.component';
// import { VendorPaymentHubleadComponent } from './components/vendor-payment-hublead/vendor-payment-hublead.component';
// import { HubleadComponent } from './hublead/hublead.component';
import { VendorPaymentHubleadComponent } from './components/vendor-payment-hublead/vendor-payment-hublead.component';
import { VendorPaymentAutomationComponent } from './components/vendor-payment-automation/vendor-payment-automation.component';
import { FleetDetailComponent } from './components/fleet-detail/fleet-detail.component';
import { LMDDashboardComponent } from './components/lmddashboard/lmddashboard.component';
import { LmdVendorComponent } from './components/lmd-vendor/lmd-vendor.component';
import { VendorPaymentSummaryComponent } from './components/vendor-payment-summary/vendor-payment-summary.component';
// import { EditVendorPaymentComponent } from './components/edit-vendor-payment/edit-vendor-payment.component';





const routes: Routes = [
  { path: '', component: OutBoundDashboardComponent },
  { path: 'fleet', component: AddFleetMasterComponent },
  { path: 'edit-fleet/:Id', component: AddFleetMasterComponent },
  { path: 'fleet-master-List', component: FleetMasterListComponent },
  { path: 'vehicle', component: AddVehicleMasterComponent },
  { path: 'vehicle-master-List', component: VehicleMasterListPageComponent },
  { path: 'edit-vehicle/:Id', component: AddVehicleMasterComponent },
  { path: 'createTrip', component: CreateTripComponent },
  { path: 'planMaster', component: PlannerMasterComponent },
  { path: 'planMaster/:warehouseId', component: PlannerMasterComponent },
  { path: 'create-trip/:warehouseId/:isCreatingTrip', component: PlannerMasterComponent },
  { path: 'create-trip/:warehouseId/:isCreatingTrip/:clusterId/:tripMasterId', component: PlannerMasterComponent },
  { path: 'plannerMap', component: PlannerMapComponent },
  { path: 'assignment-list', component: AssignmentListComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'trip-tracker/:warehouseId', component: TripTrackerComponent },
  { path: 'vehicle-report', component: VehiclereportComponent },
  { path: 'vehicle-date-report', component: VehicledailyreportComponent },
  { path: 'redispatchApproval', component: RedispatchApprovalComponent },
  { path: 'dboyPursuitReport', component: DBoyPursuitReportComponent },
  { path: 'fleet-utilization-report', component: FleetUtilizationComponent },
  { path: 'trip-summary-report', component: TripSummaryReportComponent },
  { path: 'trip-report', component: TripReportComponent },
  { path: 'vehicle-capacity-enhancement', component: VehicleCapacityEnhancementComponent },
  { path: 'vehicle-configuration', component: VehicleConfigurationComponent },
  { path: 'last-mile-dashboard', component: LastMileDashboardComponent },
  { path: 'vendor-payments', component: VendorPaymentHubleadComponent },
  { path: 'vendor-payment-automation', component: VendorPaymentAutomationComponent },
  { path: 'fleet-detail', component: FleetDetailComponent },
  { path: 'lmd-dashboard', component: LMDDashboardComponent },
  {path : 'lmd-vendor-list',component :LmdVendorComponent},
  {path : 'vendor-payment-summary',component :VendorPaymentSummaryComponent},
  //{path : 'edit-vendor-payment',component : EditVendorPaymentComponent},
  // {path : 'vendor-payments',component : HubleadComponent}






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OperationCapacityRoutingModule { }

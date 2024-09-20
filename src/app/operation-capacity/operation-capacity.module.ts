import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';

import { OperationCapacityRoutingModule } from './operation-capacity-routing.module';
import { OutBoundDashboardComponent } from './components/out-bound-dashboard/out-bound-dashboard.component';
import { AddFleetMasterComponent } from './components/add-fleet-master/add-fleet-master.component';
import { FleetMasterListComponent } from './components/fleet-master-list/fleet-master-list.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AddVehicleMasterComponent } from './components/add-vehicle-master/add-vehicle-master.component';
import { VehicleMasterListPageComponent } from './components/vehicle-master-list-page/vehicle-master-list-page.component';
import { AgmOverlays } from 'agm-overlays';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { environment } from 'environments/environment';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { PlannerMasterComponent } from './components/planner-master/planner-master.component';
import { PlannerMapComponent } from './components/planner-map/planner-map.component';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { NgxPrintModule } from 'ngx-print';
import {InputMaskModule} from 'primeng/inputmask';
import { ClusterWiseOrderListComponent } from './components/cluster-wise-order-list/cluster-wise-order-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailListComponent } from './components/order-detail-list/order-detail-list.component';
import { ClusterMapComponent } from './components/cluster-map/cluster-map.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleExtraloadDetailComponent } from './components/vehicle-extraload-detail/vehicle-extraload-detail.component';
import { TripTrackerComponent } from './components/trip-tracker/trip-tracker.component';
import { VehiclereportComponent } from './components/vehiclereport/vehiclereport.component';
import { VehicledailyreportComponent } from './components/vehicledailyreport/vehicledailyreport.component';
import { CostreportComponent } from './components/costreport/costreport.component';
import { AllInvoicePrintListComponent } from './components/all-invoice-print-list/all-invoice-print-list.component';
import { RedispatchApprovalComponent } from './components/redispatch-approval/redispatch-approval.component';
import { ShowEntireRouteComponent } from './components/show-entire-route/show-entire-route.component';
import { CustomerLocationVerificationComponent } from './components/customer-location-verification/customer-location-verification.component';
import { DBoyPursuitReportComponent } from './components/dboy-pursuit-report/dboy-pursuit-report.component';
import { FleetUtilizationComponent } from './components/fleet-utilization/fleet-utilization.component';
import { TripSummaryReportComponent } from './components/trip-summary-report/trip-summary-report.component';

import { TripSummaryChartComponent } from './components/trip-summary-chart/trip-summary-chart.component';
import {ChartModule} from 'primeng/chart';
import { TripReportComponent } from './components/trip-report/trip-report.component';
import { GenerateTripPopupComponent } from './components/generate-trip-popup/generate-trip-popup.component';
import { VehicleCapacityEnhancementComponent } from './components/vehicle-capacity-enhancement/vehicle-capacity-enhancement.component';
import { VehicleConfigurationComponent } from './components/vehicle-configuration/vehicle-configuration.component';
import { LastMileDashboardComponent } from './components/last-mile-dashboard/last-mile-dashboard.component';
import { VendorPaymentHubleadComponent } from './components/vendor-payment-hublead/vendor-payment-hublead.component';
import { VendorPaymentAutomationComponent } from './components/vendor-payment-automation/vendor-payment-automation.component';
//import { EditVendorPaymentComponent } from './components/edit-vendor-payment/edit-vendor-payment.component';
//import { VendorPaymentRegionalLeadComponent } from './components/vendor-payment-regional-lead/vendor-payment-regional-lead.component';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FleetDetailComponent } from './components/fleet-detail/fleet-detail.component';
import { LMDDashboardComponent } from './components/lmddashboard/lmddashboard.component';
import { LmdVendorComponent } from './components/lmd-vendor/lmd-vendor.component';
import { VendorPaymentSummaryComponent } from './components/vendor-payment-summary/vendor-payment-summary.component';

//import { SharedModule } from 'primeng/primeng';
@NgModule({
  declarations: [OutBoundDashboardComponent,AddFleetMasterComponent, FleetMasterListComponent,
    AddVehicleMasterComponent,VehicleMasterListPageComponent, CreateTripComponent,PlannerMasterComponent, PlannerMapComponent
  ,AssignmentListComponent,ClusterWiseOrderListComponent, OrderListComponent, OrderDetailListComponent, ClusterMapComponent, VehicleDetailComponent, VehicleExtraloadDetailComponent, TripTrackerComponent, VehiclereportComponent, VehicledailyreportComponent, CostreportComponent, AllInvoicePrintListComponent, RedispatchApprovalComponent, ShowEntireRouteComponent, CustomerLocationVerificationComponent, DBoyPursuitReportComponent, FleetUtilizationComponent, TripSummaryReportComponent, TripSummaryChartComponent, TripReportComponent, GenerateTripPopupComponent, VehicleCapacityEnhancementComponent, VehicleConfigurationComponent, LastMileDashboardComponent
  , VendorPaymentHubleadComponent, VendorPaymentAutomationComponent,FleetDetailComponent, LMDDashboardComponent, LmdVendorComponent, VendorPaymentSummaryComponent
  // , EditVendorPaymentComponent, VendorPaymentRegionalLeadComponent,
],
  imports: [
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    MenuModule,
    CommonModule,
    OperationCapacityRoutingModule,
    ShaopkiranaSharedModule,
    //SharedModule,
    AgmOverlays,
    TriStateCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKeyGoogle, // "AIzaSyCbogFMyrNTlMdtsrYzgffJ3guhCdzRS2Y",
      libraries: ['drawing', 'places','geometry']
    }),
    AgmDirectionModule,
    NgxPrintModule,
    InputMaskModule,
    ChartModule  ],
  providers:[
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class OperationCapacityModule { }

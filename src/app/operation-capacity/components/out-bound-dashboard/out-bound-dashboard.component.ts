import { FullscreenControlOptions } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripCurrentStatusHelper } from 'app/operation-capacity/interface/trip-current-status';
import { TripSummary } from 'app/operation-capacity/interface/trip-summary';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
import { PlanMasterService } from 'app/operation-capacity/services/plan-master.service';
import { CityService } from 'app/shared/services/city.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-out-bound-dashboard',
  templateUrl: './out-bound-dashboard.component.html',
  styleUrls: ['./out-bound-dashboard.component.scss']
})
export class OutBoundDashboardComponent implements OnInit {
  blocked: boolean = false;
  cityList: any;
  warehouseList: any;
  data: any;
  orderStatus: any;
  isShowClusterWiseOrder: boolean = false;
  orderNo: number;
  isCreateTrip: boolean = true;
  isOpenMap: boolean = false;
  tripList: any;
  tripInfoData: TripSummary[];
  filterType: number = 0;
  filterList: SelectItem[];
  //map
  lat: number = 22.7196;
  lng: number = 75.8577;
  zoom: number = 13;
  options: FullscreenControlOptions;
  myInnerHeight = 100;
  fullscreenControl: boolean;
  warehouseVehicleDetail: any;
  vehicleLiveDetail: any;
  isRunningUtility: any;
  //#region vehicle detail popup members
  isOpenVehicleDetail: boolean;
  selectedStatus: any;
  vehicleDetailHeaderMessage: string;
  vehicleDetailList: any[];
  selectedVehicleDetail: any;
  //#endregion
  isRedispatchApproved: boolean = false;
  isOpenCustomerLocationVerification: boolean = false;
  isOpenTripType: boolean = false;
  storeType: number = 0;
  constructor(private deliveryDashboardService: DeliveryDashboardService
    , private router: Router
    , private loaderService: LoaderService
    , private planMasterService: PlanMasterService
    , private messageService: MessageService) { this.data = {}; }

  ngOnInit() {
    this.data.CityId = null;
    this.data.warehouseId = null;
    this.data.TripNo = null;
    this.loaderService.loading(true);
    this.filterList = TripCurrentStatusHelper.GetList();
    this.deliveryDashboardService.getCityList().subscribe(result => {
      this.cityList = result;
      this.blocked = false;
      this.loaderService.loading(false);
      if (this.cityList && this.cityList.length == 1) {
        this.data.CityId = this.cityList[0].value;
        this.onChangeCity(this.data.CityId);
      }
    })
  }
  onChangeCity(CityId) {
    this.loaderService.loading(true);
    this.deliveryDashboardService.getWarehoueList(CityId).subscribe(res => {
      this.warehouseList = res;
      this.loaderService.loading(false);

      if (this.warehouseList && this.warehouseList.length == 1) {
        this.data.warehouseId = this.warehouseList[0].value;
        this.onChangeHub(this.data.warehouseId);
      }
    });
  }
  async onChangeHub(warehouseId) {

    let selectedWh = this.warehouseList.filter(x => {
      return x.value == warehouseId;
    });

    if (selectedWh && selectedWh.length > 0) {
      this.storeType = selectedWh[0].AdditionalField;
    }

    console.log('this.storeType: ', this.storeType);


    this.orderStatus = null;
    this.vehicleLiveDetail = null;
    this.data.TripNo = null;
    this.tripInfoData = null;
    this.tripList = null;
    if (warehouseId) {
      this.loaderService.loading(true);
      this.vehicleLiveDetail = await this.deliveryDashboardService.getVehicleLiveDetails(warehouseId).toPromise();
      console.log('this.vehicleLiveDetail:', this.vehicleLiveDetail);
      this.deliveryDashboardService.orderStatusCountList(warehouseId).subscribe(async res => {
        this.orderStatus = res;
        this.isCreateTrip = false;

        this.warehouseVehicleDetail
          = await this.planMasterService.getWarehouseVehicleDetail(warehouseId).toPromise();
        console.log('this.warehouseVehicleDetail:', this.warehouseVehicleDetail);


        this.deliveryDashboardService.getTrips(warehouseId, this.filterType).subscribe(x => {
          this.tripList = x;
          this.loaderService.loading(false);
        });
      });
    }

  }
  onChangeTripNo(TripNo) {
    this.tripInfoData = null;
    if (this.storeType != 1) {
      if (TripNo) {
        this.loaderService.loading(true);
        this.deliveryDashboardService.getTripSummary(TripNo.TripPlannerMasterId).subscribe(x => {
          this.tripInfoData = x;
          console.log('this.tripInfoData: ', this.tripInfoData);
          this.loaderService.loading(false);
        });
      }
    } else {
      this.onChangeStoreTripNo(TripNo);
    }
  }
  onChangeStoreTripNo(TripNo) {
    if (TripNo) {
      this.loaderService.loading(true);
      this.deliveryDashboardService.getZilaTripSummary(TripNo.TripPlannerMasterId).subscribe(x => {
        this.tripInfoData = x;
        console.log('this.tripInfoData: ', this.tripInfoData);
        this.loaderService.loading(false);
      });
    }

  }


  onChangeTripFilter() {
    this.data.TripNo = null;
    this.tripInfoData = null;
    this.loaderService.loading(true);
    this.deliveryDashboardService.getTrips(this.data.warehouseId, this.filterType).subscribe(x => {
      this.tripList = x;
      this.loaderService.loading(false);
    });
  }
  clusterWiseOrderList(orderNo) {
    this.loaderService.loading(true);
    this.orderNo = orderNo;
    this.isShowClusterWiseOrder = true;
    this.loaderService.loading(false);
  }
  onClickcreateTrip() {
    let clusterId = this.data.TripNo.ClusterId;
    let tripMasterId = this.data.TripNo.TripPlannerMasterId;

    this.router.navigateByUrl('layout/operation-capacity/create-trip/' + this.data.warehouseId + '/' + true + '/' + 0 + '/' + tripMasterId);
  }


  onClickcreateNewTrip() {
    this.router.navigateByUrl('layout/operation-capacity/planMaster/' + this.data.warehouseId);
  }
  // onClickMap()
  // {
  //   debugger;
  // }
  getEstimatedTimeLeft(rowData) {
    return Math.trunc(rowData[0].EstimatedTimeLeft / 60);
  }
  getTotalTimeinMin(time) {
    return Math.trunc(time / 60);
  }

  trackTrip() {
    this.router.navigateByUrl('/layout/operation-capacity/trip-tracker/' + this.data.warehouseId);
  }

  openVehicleDetail(status: any, headerMessage: string) {
    this.vehicleDetailHeaderMessage = headerMessage + ' Vehicle Details';
    this.selectedStatus = status;
    this.loaderService.loading(true);
    this.deliveryDashboardService.getVehicleLiveDetailsList(this.data.warehouseId, status.Id).subscribe(x => {
      console.log('vehicleDetail is: ', x);
      this.vehicleDetailList = x;
      if (this.vehicleDetailList && this.vehicleDetailList.length > 0) {
        this.selectedVehicleDetail = this.vehicleDetailList[0];
      }
      this.isOpenVehicleDetail = true;
      this.loaderService.loading(false);
    })
  }
  IsRunningUtility() {
    debugger
    if (this.data.warehouseId) {
      this.loaderService.loading(true);
      this.deliveryDashboardService.IsRunningUtility(this.data.warehouseId).subscribe(x => {
        debugger;
        this.isRunningUtility = x;
        this.isOpenTripType = false;
        if (!this.isRunningUtility) {
          this.messageService.add({ key: 'main', severity: 'info', summary: 'error', detail: 'Alredy Running Utility!!' });
        }
        else {
          this.messageService.add({ key: 'main', severity: 'info', summary: 'success', detail: 'Run successfully!!' });
        }
        this.loaderService.loading(false);
      });
    } else {
      this.messageService.add({ key: 'main', severity: 'info', summary: 'error', detail: 'Please select Warehouse!!' });
    }
  }
  redispatchApproval() {
    this.isRedispatchApproved = true;
    // this.router.navigateByUrl('layout/operation-capacity/redispatchApproval');
  }
  closeRedispatchApproval() {
    this.isRedispatchApproved = false;
    this.ngOnInit();
  }

  openCustomerLocationVerification() {
    this.isOpenCustomerLocationVerification = true;
  }
  closeCustomerLocationVerification() {
    this.isOpenCustomerLocationVerification = false;
  }
  OpenTripType() {
    this.vehicleDetailHeaderMessage = 'Generate Trip';
    this.isOpenTripType = true;
  }
  async ClosePopup() {
    debugger
    await this.onChangeHub(this.data.warehouseId);
    this.isOpenTripType = false;
  }
  isDetailsFalse(event) {
    this.IsRunningUtility();
  }
}

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomTrip } from "app/operation-capacity/interface/custom-trip";
import { GenerateTripParam } from "app/operation-capacity/interface/generate-trip-paramDC";
import { TripInformation } from "app/operation-capacity/interface/trip-information";
import { TripPlannerConfirmedMasterVM } from "app/operation-capacity/interface/trip-planner-confirmed-master-vm";
import { TripPlannerConfirmedOrderVM } from "app/operation-capacity/interface/trip-planner-confirmed-order-vm";
import { TripPlannerOrderPager } from "app/operation-capacity/interface/trip-planner-order-pager";
import { TripTouchPoint } from "app/operation-capacity/interface/trip-touch-point";
import { VehicleDboyDriverDDs } from "app/operation-capacity/interface/vehicle-dboy-driver-dcs";
import { DeliveryDashboardService } from "app/operation-capacity/services/delivery-dashboard.service";
import { PlanMasterService } from "app/operation-capacity/services/plan-master.service";
import { VehicleMasterService } from "app/operation-capacity/services/vehicle-master.service";
import { DBoyTrckerFirestoreService } from "app/shared/services/dboy-trcker-firestore.service";
import { LoaderService } from "app/shared/services/loader.service";
import { environment } from "environments/environment";
import { ConfirmationService, LazyLoadEvent, SelectItem } from "primeng/api";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import * as moment from "moment";
import { log } from "console";
import { getDate } from "date-fns";
import { TransporterFleetTypeVehicleType } from "app/operation-capacity/interface/transporter-fleet-type-vehicle-type";
import { CustomerService } from "app/shared/services/customer.service";

@Component({
  selector: "app-planner-master",
  templateUrl: "./planner-master.component.html",
  styleUrls: ["./planner-master.component.scss"],
})
export class PlannerMasterComponent implements OnInit, OnChanges {
  warehouseList: SelectItem[];
  warehouseId: number = null;
  clusterList: SelectItem[];
  clusterId: number = null;
  tripList: SelectItem[];
  tripMasterId: number = null;

  selectedTrip: TripPlannerConfirmedMasterVM = null;
  agentList: SelectItem[];
  agentMappingList: VehicleDboyDriverDDs;
  dboyList: SelectItem[];
  driverList: SelectItem[];
  VehicleList: SelectItem[];

  isShowOrderDetail: boolean;
  orderList: TripPlannerConfirmedOrderVM[];
  orderPager: TripPlannerOrderPager;
  allOrderList: TripPlannerConfirmedOrderVM[];
  addhocFleetList: TransporterFleetTypeVehicleType[];
  rowCount: number;
  loading: boolean;
  displaySideBar: boolean;
  AvailableVehicleList: any;
  totalRecords: number;
  isShowMap: boolean = false;
  isCreatingTrip: boolean;
  isCalledFreezeTrip: boolean;
  isCalledCreatePicker: boolean = false;
  showViewMap: boolean = false;
  vehicleSummary: any;
  isShowAvailableDetail: boolean = false;
  isExtraLoadDetail: boolean = false;
  vehicleReqNo: number;
  openPopup: boolean;
  lateReportingTimeString: string;
  //#region create new custom trip properties
  isShowCreateCustomTripDialog: boolean;
  customTrip: CustomTrip;
  OrderItemlist: any;
  //#endregion
  AssignmentBarcodeImage: any;
  WarehouseName: any;
  DeliveryIssuanceId: any;
  CreatedDate: any;
  DboyName: any;
  TotalAssignmentAmount: any;
  ItemWiseList: any;
  ReDispatchItemlist: any;
  // ClearanceOrderList: any;
  list: boolean;
  Relist: boolean;
  // IsClearance: any;
  AllOrderList: any;
  warehouse: any;
  orderListTrue: boolean;
  isBlockedOrderList: boolean = false;
  blockedOrderList: any;
  isSaveAsDraft: boolean = true;
  isShowRoute: boolean = false;
  isCheckRouteToShow: boolean = false;
  expectedWaypoints: any[];
  tripInformation: TripInformation;
  showMarker: boolean;
  subscription: Subscription;
  touchPointList: TripTouchPoint[];
  actualWaypoints: any[];
  source: TripTouchPoint;
  currentLocation: any;
  public origin: any;
  actualDestination: any;
  actualOrigin: any;
  myInnerHeight = window.innerHeight - 150;
  zoom: number = 13;
  tripDate: any;
  dateMax = new Date();
  dateMin = new Date();
  tripPlannerConfirmMasterId: number;
  //#region direction options
  icon = "/assets/img/logo/truck/1.png";
  waypointMarker = "/assets/img/logo/marker_pointer.png";

  vehicleNo: any;

  transport: any;
  transportEway: any;
  transportGST: any;
  addhocpayload: any;

  public renderOptions = {
    suppressMarkers: true,
    suppressInfoWindows: false,
  };

  public markerOptions = {
    origin: {
      infoWindow: "Origin.",
      icon: "",
    },
    // waypoints: {
    //   infoWindow: '',
    //   icon: '',
    // },
    destination: {
      infoWindow: "Destination",
      icon: "",
    },
  };
  //#endregion
  fleetListbackup: any[];
  isShowAssignmentDetail: boolean = false;
  orderAssignmentList: any;
  orderAssignmentDetail: any;
  RedispatchedDeliveryIssuanceId: any;
  NewDeliveryIssuanceId: any;
  selectedTripType: any;
  selectedCustomTripType: any;
  isOpen: boolean = false;
  tripType: any;
  generateTripParamDC: GenerateTripParam;
  isRunningUtility: any;
  minDate: Date;
  maxDate: Date;
  FinalizeNewPickerButton: boolean = false;
  AddNewPicker: boolean = false;
  AddNewPickerFinalized = false;
  fleetList: any = [];
  fleetType: any;
  addhocVehicle: boolean;
  addhocVehicleDDList: SelectItem[];
  addhocVehicleID: any;
  regexp: any;
  GSTdisplay: boolean = false;
  showFinalize: boolean = false;
  IsFinalizing: boolean = false;
  storeType: number;
  @ViewChild('tripForm', { static: false }) form: NgForm;

  constructor(
    private router: Router,
    private planMasterService: PlanMasterService,
    private loaderService: LoaderService,
    private activeRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private vehicleMasterService: VehicleMasterService,
    private deliveryDashboardService: DeliveryDashboardService,
    private customerService: CustomerService,
  ) {
    this.tripType = {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    alert(1);
  }

  async ngOnInit() {
    this.dateMax.setDate(this.dateMax.getDate() + 5);

    this.minDate = new Date();
    let invalidDate = new Date();
    invalidDate.setDate(this.minDate.getDate() + 1);
    this.maxDate = invalidDate;
    this.orderListTrue = false;
    let warehouseId = this.activeRoute.snapshot.paramMap.get("warehouseId");
    if (warehouseId) {
      this.warehouseId = Number(warehouseId);
      // this.getClusterList();
      this.getTripList(true);
    }

    let isCreatingTrip =
      this.activeRoute.snapshot.paramMap.get("isCreatingTrip");
    if (isCreatingTrip) {
      this.isCreatingTrip = Boolean(warehouseId);
    }

    let clusterId = this.activeRoute.snapshot.paramMap.get("clusterId");
    if (clusterId) {
      this.clusterId = Number(clusterId);
    }
    let tripMasterId = this.activeRoute.snapshot.paramMap.get("tripMasterId");
    if (tripMasterId) {
      this.tripMasterId = Number(tripMasterId);
    }

    this.warehouseList = await this.planMasterService
      .getWarehouseList()
      .toPromise();
    console.log("this.warehouseList: ", this.warehouseList);

    if (this.clusterId) {
      this.getTripList(false);
    }

    if (this.tripMasterId) {
      this.getTrip();
    }
  }


  generateEwayBYIRN() {
    // if (this.transportGST&&!this.GSTdisplay) {
    //   this.messageService.add({
    //     key: "main",
    //     severity: "info",
    //     summary: "Error",
    //     detail: "E-bay Bill Not Verify",
    //   });
    //   this.loaderService.loading(false);
    //   return false;
    // }else
    {
      this.loaderService.loading(true);
      if (this.selectedTrip.Id != null) {
        const payload = {
          TripPlannerConfirmedMasterid: this.tripPlannerConfirmMasterId,
          TransportGST: this.transportGST,
          TransportName: this.transportEway,
          VehicleId: this.selectedTrip.VehicleId,
          IsReplacementVehicleNo: this.selectedTrip.IsReplacementVehicleNo,
          ReplacementVehicleNo: this.selectedTrip.ReplacementVehicleNo
        }
        this.planMasterService.GenerateEwayBYIRN(payload).subscribe((res: boolean) => {
          console.log(res);
          this.isBlockedOrderList = false;
          if (res) {
            this.messageService.add({
              key: "main",
              severity: "info",
              summary: "Success",
              detail: "E-bay Bill Generated SuccessFully",
            });
            this.loaderService.loading(false);
          }
          else {
            this.messageService.add({
              key: "main",
              severity: "info",
              summary: "Error",
              detail: "E-bay Bill Not Generated",
            });
            this.loaderService.loading(false);
          }
        })
      }
    }

  }
  addNewAdhocVehicle() {
    this.addhocVehicle = true;
    this.transport = null;
    this.vehicleNo = null;
    this.planMasterService
      .getAdhocFleetList(this.warehouseId)
      .subscribe((res: any) => {
        this.addhocFleetList = res;
        console.log("  this.addhocFleetList", this.addhocFleetList);
        this.addhocVehicleDDList = [];
        this.addhocFleetList.forEach((x: any) => {
          console.log(x.TransporterName, x.VehicleType, x.VehicleWeight);

          this.addhocVehicleDDList.push({
            label:
              "TName: " +
              x.TransportName +
              " , " +
              "VName: " +
              x.VehicleType +
              " , " +
              "VCapacity: " +
              x.VehicleWeight +
              "KG",
            value: x,
          });
          console.log("transport", this.transport);
          console.log("addhocVehicleDDList", this.addhocVehicleDDList);
        });
      });
  }
  insertAdhocVehicle() {
    // this.addhocpayload = this.addhocFleetList.find((x: any) => {
    //   this.transport == x.FleetMasterId;
    //   return x;
    // });
    console.log("addhocpayload", this.addhocpayload);

    {
      // Regex to check valid
      // Indian Vehicle Number Plate
      let regex = new RegExp(
        /^[A-Za-z]{2}[ -][0-9]{1,2}(?: [A-Za-z])?(?: [A-Za-z]*)? [0-9]{4}$/
        // /^[A-Za-z]{2,3}(-\d{2}(-[A-Za-z]{1,2})?)?-\d{3,4}$/gm
      );

      // Indian Vehicle Number Plate
      // is empty return false

      if (this.vehicleNo == null || this.transport == null) {
        this.messageService.add({
          key: "main",
          severity: "info",
          summary: "error",
          detail: "Please fill Required Fields ",
        });
        return "false";
      }

      // Return true if the NUMBERPLATE
      // matched the ReGex
      if (regex.test(this.vehicleNo) == true) {
        const payload = {
          FleetType: this.transport.FleetType,
          VehicleType: this.transport.VehicleType,
          FleetDetailId: this.transport.FleetMasterDetailsId,
          VehicleNo: this.vehicleNo,
          VehicleWeight: this.transport.VehicleWeight,
          WarehouseId: this.warehouseId,
          CityId: 1,
        };

        this.planMasterService
          .addNewAdhocVehicle(payload)
          .subscribe((res: any) => {
            console.log(res);
            if (res) {
              this.addhocVehicleID = res;
              this.selectedTrip.VehicleId = this.addhocVehicleID;
              this.messageService.add({
                key: "main",
                severity: "info",
                summary: "Success",
                detail: "Vehicle Saved",
              });
            }
            if (res == 0) {
              alert("Vehicle Number already exist!!!");
            }
            this.addhocVehicle = false;
            this.getAgentMappingList();
          });
      } else {
        this.messageService.add({
          key: "main",
          severity: "info",
          summary: "Success",
          detail: "Enter Vehicle Number in these format (AB 12 CD 3456)",
        });
      }
    }
  }

  IsAddNewPickerAllowed(TripPlannerConfirmMasterId) {
    this.tripPlannerConfirmMasterId = TripPlannerConfirmMasterId;

    this.planMasterService
      .IsAddNewPickerAllowed(TripPlannerConfirmMasterId)
      .subscribe((res: any) => {
        console.log(res);
        this.AddNewPicker = res;
      });

    this.planMasterService
      .IsAddNewPickerFinalized(TripPlannerConfirmMasterId)
      .subscribe((res: any) => {
        console.log("finalized", res);
        this.AddNewPickerFinalized = res;
      });
  }

  IsReplacementVehicleNo: boolean = false;
  IsReplacementVehicleNoValue: boolean = false;
  async getClusterList() {
    this.clusterList = null;
    this.tripList = null;
    this.tripMasterId = null;
    this.selectedTrip = null;

    if (this.warehouseId) {
      this.loaderService.loading(true);
      this.clusterList = await this.planMasterService
        .getClusterList(this.warehouseId)
        .toPromise();
      this.vehicleSummary = await this.planMasterService
        .getWarehouseVehicleDetail(this.warehouseId)
        .toPromise();
      console.log("this.vehicleSummary:", this.vehicleSummary);
      this.loaderService.loading(false);
    }
    console.log("this.clusterList: ", this.clusterList);
  }

  async getTripList(isResetTripMasterId: boolean) {
    // debugger
    this.tripList = null;
    if (isResetTripMasterId) {
      this.tripMasterId = null;
    }
    this.selectedTrip = null;
    debugger
    if (this.warehouseId) {
      this.planMasterService.getStoreType(this.warehouseId).subscribe(x => {
        this.storeType = x;
        console.log('this.storeType is: ', this.storeType);
      })

      this.loaderService.loading(true);
      this.tripList = await this.planMasterService
        .getTripList(this.warehouseId)
        .toPromise();
      this.loaderService.loading(false);
    }

    console.log("this.tripList: ", this.tripList);
  }
  async getTrip() {
    this.lateReportingTimeString = null;
    this.selectedTrip = null;
    this.fleetList = [];

    if (this.tripMasterId) {
      this.loaderService.loading(true);
      this.fleetListbackup = await this.planMasterService
        .getFleetType(
          this.warehouseId ? this.warehouseId : this.selectedTrip.WarehouseId

        )
        .toPromise();
      console.log('this.fleetListbackup: ', this.fleetListbackup);
      this.selectedTrip = await this.planMasterService
        .getTrip(this.tripMasterId)
        .toPromise();
      if (this.selectedTrip != null) {
        this.IsReplacementVehicleNo = this.selectedTrip.IsReplacementVehicleNo == true ? true : false;
        this.IsReplacementVehicleNoValue = this.selectedTrip.ReplacementVehicleNo ? true : false;
        // this.getTripCost();
      }

      this.fleetListbackup.forEach((x: any) => {
        var obj = { label: x, value: x };
        this.fleetList.push(obj);
        console.log("this.fleetList", this.fleetList);
      });


      this.updateLateReportingTimeOnGet();
      if (!this.selectedTrip.Id) {
        let id = await this.planMasterService
          .saveTripPlannerConfirmedMaster(
            this.selectedTrip.TripPlannerMasterId
              ? this.selectedTrip.TripPlannerMasterId
              : this.tripMasterId
          )
          .toPromise();
        if (this.selectedTrip && this.selectedTrip.VehicleId != null) {
          this.getTrip();
        }
        else {
          return false
        }
      }
      if (this.selectedTrip && this.selectedTrip.TripDate != null) {
        this.tripDate = moment(this.selectedTrip.TripDate).format("DD/MM/yyyy");
      }
      console.log("this.selectedTrip:", this.selectedTrip);

      this.getAgentMappingList();
      this.loaderService.loading(false);
      this.IsAddNewPickerAllowed(
        this.selectedTrip ? this.selectedTrip.TripPlannerConfirmMasterId : 0
      );
    }
  }

  async getAgentMappingListUI() {
    this.selectedTrip.DboyId = null;
    this.selectedTrip.VehicleId = null;
    this.selectedTrip.DriverId = null;

    await this.getAgentMappingList();
  }

  async getAgentMappingList() {
    this.agentMappingList = null;
    this.dboyList = null;
    this.driverList = null;
    this.VehicleList = null;
    // this.selectedTrip.ReplacementVehicleNo=null;
    // this.selectedTrip.IsReplacementVehicleNo=false;
    // if (this.selectedTrip.AgentId) {
    this.loaderService.loading(true);

    if (this.selectedTrip) {
      this.agentMappingList = await this.planMasterService
        .getAgentMappingListV2(
          this.selectedTrip.WarehouseId,
          this.selectedTrip.TripPlannerMasterId,
          this.selectedTrip.FleetType

          // this.fleetType?this.fleetType.label:this.fleetType.label
        )
        .toPromise();
      console.log("this.agentMappingList: ", this.agentMappingList);
      this.loaderService.loading(false);
      this.makeDboyList();
      this.makeDriverList();
      this.makeVehicleList();
      // }
      console.log("this.agentMappingList:", this.agentMappingList);
    }
  }

  getHr() {
    return Math.trunc(this.selectedTrip.TotalTimeInMins / 60);
  }

  async onSubmit(tripForm: NgForm) {
    debugger
    // let fleetlabel=this.selectedTrip.FleetType.label;
    //this.selectedTrip.FleetType =fleetlabel;
    if (!this.isCalledFreezeTrip) {
      this.isSaveAsDraft = false;
    }
    setTimeout(async () => {
      if (tripForm.valid) {
        this.isSaveAsDraft = true;
        this.loaderService.loading(true);
        let isSuccess: boolean = true;

        if (
          (!this.isCalledFreezeTrip || !this.selectedTrip.IsPickerRequired) &&
          (!this.selectedTrip.IsPickerGenerated || this.AddNewPicker)
        ) {
          isSuccess = await this.planMasterService
            .updateTrip(this.selectedTrip, this.AddNewPicker)
            .toPromise();
        }
        console.log("updateTrip result: ", isSuccess);
        if (!isSuccess) {
          this.messageService.add({
            key: "main",
            severity: "info",
            summary: "Error",
            detail:
              "Not saved. Trip either freezed or picker generated or no order in trip",
          });
          this.loaderService.loading(false);
          return;
        }
        if (this.isCalledCreatePicker) {
          this.isCalledFreezeTrip = false;
          let dboyName = this.dboyList.filter((x) => {
            return x.value == this.selectedTrip.DboyId;
          })[0].label;
          this.confirmationService.confirm({
            header: "Confirmation",
            message:
              "Do you really want to create picker for Dboy :" +
              " " +
              dboyName +
              "?",
            accept: async () => {
              this.loaderService.loading(true);
              this.planMasterService
                .createPicker(
                  this.selectedTrip.TripPlannerConfirmMasterId,
                  this.selectedTrip.DboyId,
                  this.AddNewPicker
                )
                .subscribe((x) => {
                  console.log("create picker", x);
                  this.loaderService.loading(false);
                  if (x.IsSuceess) {
                    // this.ngOnInit();
                    this.messageService.add({
                      key: "main",
                      severity: "info",
                      summary: "Success",
                      detail: x.SuccessMessage,
                    });
                    this.isCalledCreatePicker = false;
                    setTimeout(() => {
                      this.router.navigateByUrl("/layout/operation-capacity");
                    }, 700);
                  } else {
                    this.messageService.add({
                      key: "main",
                      severity: "info",
                      summary: "error",
                      detail: x.ErrorMessage,
                    });
                  }
                });
            },
            reject: async () => {
              this.isCalledCreatePicker = false;
            },
          });
        } else if (this.isCalledFreezeTrip) {
          console.log("tripDate", this.tripDate);

          this.isCalledCreatePicker = false;
          this.updateLateReportingTimeOnSave();
          let creteTripResult = await this.planMasterService
            .createTrip(
              this.selectedTrip.Id,
              this.selectedTrip.ReportingTime,
              this.selectedTrip.StartKm,
              this.selectedTrip.LateReportingTimeInMins,
              this.selectedTrip.PenaltyCharge,
              this.selectedTrip.DriverId,
              this.selectedTrip.VehicleId,
              this.selectedTrip.AgentId,
              this.selectedTrip.DboyId,
              moment(this.tripDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
              this.selectedTrip.IsReplacementVehicleNo,
              this.selectedTrip.ReplacementVehicleNo,
              this.selectedTrip.VehicleFare
            )
            .toPromise();
          console.log("creteTripResult result: ", creteTripResult);

          if (creteTripResult.Status) {
            this.messageService.add({
              key: "main",
              severity: "info",
              summary: "Success",
              detail: creteTripResult.Message,
            });
            // this.ngOnInit();
            this.loaderService.loading(false);
            this.isCalledFreezeTrip = false;
            setTimeout(() => {
              this.router.navigateByUrl("/layout/operation-capacity");
            }, 700);
          } else {
            this.messageService.add({
              key: "main",
              severity: "info",
              summary: "Error",
              detail: creteTripResult.Message,
            });
            if (
              creteTripResult.blockedOrderList &&
              creteTripResult.blockedOrderList.length > 0
            ) {
              this.isBlockedOrderList = true;
              this.blockedOrderList = creteTripResult.blockedOrderList;
            }
          }
        } else {
          this.messageService.add({
            key: "main",
            severity: "info",
            summary: "Success",
            detail: "All Information updated succssfully!",
          });
          this.ngOnInit();
        }
        this.loaderService.loading(false);
      } else {
        this.isSaveAsDraft = true;
      }
      this.isCalledFreezeTrip = false;
    }, 200);
  }

  async freezeTrip(tripForm) {
    this.transportEway = undefined;
    this.transportGST = undefined;
    this.isCalledFreezeTrip = true;
    // this.tripFormElement.nativeElement.submit();
    tripForm.onSubmit(tripForm);
    this.IsAddNewPickerAllowed(this.tripPlannerConfirmMasterId);
    console.log("freezetrip", this.tripPlannerConfirmMasterId);
  }

  async onCreatePicker(tripForm) {
    this.isCalledCreatePicker = true;
    tripForm.onSubmit(tripForm);
    this.IsAddNewPickerAllowed(this.tripPlannerConfirmMasterId);
    console.log("createtrip", this.tripPlannerConfirmMasterId);
  }

  //#region Order List Popup
  async onUpdate() {
    this.loaderService.loading(true);
    if (!this.selectedTrip.Id) {
    }
    this.orderList = await this.planMasterService
      .getTripPlannerConfirmedOrderList(this.selectedTrip.Id)
      .toPromise();

    console.log(" this.orderList", this.orderList);

    this.initializePager();
    this.isShowOrderDetail = true;
    this.loaderService.loading(false);
  }
  navToOrderMaster(order) {
    window.open(environment.apiURL + "#/" + "orderMaster");
    // this.router.navigateByUrl(environment.apiURL + '#/'+ 'orderMaster');
  }

  ODDetailsListDialog: boolean = false;
  ODDetailsList: any = [];


  OrderIdListDc: any;
  OrderListDetails: any;
  totalAmountOfOrder: number = 0;
  getODDetailsList(OrderId) {
    this.totalAmountOfOrder = 0;
    this.OrderIdListDc = {
      OrderIdList: [],
    };
    if (OrderId == null) {
      this.ODDetailsList = this.orderList.filter((x) => {
        return x.IsActive;
      });

      if (this.ODDetailsList.length > 0) {
        this.ODDetailsList.forEach((element) => {
          this.OrderIdListDc.OrderIdList.push(element.OrderId);
        });
      }
    } else {
      this.OrderIdListDc.OrderIdList.push(OrderId);
    }

    console.log(this.OrderIdListDc);

    this.planMasterService
      .GetODDetailsList(this.OrderIdListDc)
      .subscribe((res: any) => {
        this.ODDetailsListDialog = true;
        this.OrderListDetails = res;
        this.totalAmountOfOrder = 0;
        if (this.OrderListDetails.length > 0) {
          this.OrderListDetails.forEach((element) => {
            this.totalAmountOfOrder =
              element.TotalAmt + this.totalAmountOfOrder;
          });
        }

        console.log("this.OrderListDetails", res);
      });
  }

  checkUncheck(order: TripPlannerConfirmedOrderVM) {
    if (
      (!this.selectedTrip.IsFreezed && !this.selectedTrip.IsPickerGenerated) ||
      this.AddNewPicker
    ) {
      order.IsActive = !order.IsActive;
      let tempOrderList: TripPlannerConfirmedOrderVM[] = this.orderList.filter(
        (x) => {
          return x.OrderId == order.OrderId;
        }
      );
      let tempOrder: TripPlannerConfirmedOrderVM = null;
      if (tempOrderList && tempOrderList.length > 0) {
        tempOrder = tempOrderList[0];
      }

      if (order.IsActive) {
        if (tempOrder) {
          tempOrder.IsActive = true;
          tempOrder.IsNewPickerOrder = this.AddNewPicker;
        } else {
          order.IsNewPickerOrder = this.AddNewPicker;
          this.orderList.push(order);
        }
      } else {
        if (tempOrder.IsNewPickerOrder != this.AddNewPicker) {
          order.IsActive = !order.IsActive;
          this.messageService.add({
            key: "order-dialog",
            severity: "info",
            summary: "Error",
            detail: "Old picker order can't be removed",
          });
          return;
        } else if (tempOrder && !tempOrder.TripPlannerConfirmedOrderId) {
          this.orderList.splice(this.orderList.indexOf(tempOrder), 1);
        } else if (tempOrder && tempOrder.TripPlannerConfirmedOrderId) {
          tempOrder.IsActive = false;
        }
      }
    } else {
      this.messageService.add({
        key: "order-dialog",
        severity: "info",
        summary: "Error",
        detail: "Already Freezed or Picker generated",
      });
    }
  }

  uncheckSelectedOrder(selectedOrder: TripPlannerConfirmedOrderVM) {
    if (
      !this.selectedTrip.IsFreezed &&
      (!this.selectedTrip.IsPickerGenerated || this.AddNewPickerFinalized)
    ) {
      if




        (
        this.selectedTrip.IsPickerGenerated &&
        !selectedOrder.IsNewPickerOrder
      ) {
        this.messageService.add({
          key: "order-dialog",
          severity: "info",
          summary: "Error",
          detail: "Cant remove this order",
        });
        return;
      }
      selectedOrder.IsActive = false;

      let tempOrderList: TripPlannerConfirmedOrderVM[] =
        this.allOrderList.filter((x) => {
          return x.OrderId == selectedOrder.OrderId;
        });
      let tempOrder: TripPlannerConfirmedOrderVM = null;
      if (tempOrderList && tempOrderList.length > 0) {
        tempOrder = tempOrderList[0];
      }

      if (tempOrder && !tempOrder.TripPlannerConfirmedOrderId) {
        this.orderList.splice(this.orderList.indexOf(selectedOrder), 1);
      }

      if (tempOrder) {
        tempOrder.IsActive = false;
      }
    } else {
      this.messageService.add({
        key: "order-dialog",
        severity: "info",
        summary: "Error",
        detail: "Already Freezed",
      });
    }
  }

  updateData: any;
  pendingSkCodes: any[] = [];
  async updateOrder() {
    this.pendingSkCodes = [];
    this.confirmationService.confirm({
      header: "Confirmation",
      message: "Do you really want to update the order into the given trip?",
      accept: async () => {
        this.loaderService.loading(true);
        let result: any = await this.planMasterService
          .updateOrder(this.selectedTrip.Id, this.orderList, this.AddNewPicker)
          .toPromise();
        console.log(result, "updateOrderResult");
        this.updateData = result;
        if (result && result.Status) {
          if (this.updateData.Data.length != 0) {
            var Data = this.updateData.Data;
            Data.forEach((x) => {
              this.pendingSkCodes.push(x);
            });
            var pendingSkCodes = this.pendingSkCodes.join();
            alert(
              "Customer (" +
              pendingSkCodes +
              ") Gst Request in progress. Please Cordinate With Customer Care"
            );
          } else {
            if (result) {
              await this.getTrip();
              this.messageService.add({
                key: "main",
                severity: "success",
                summary: "Saved",
                detail: "Order Updated!",
              });
            } else {
              this.messageService.add({
                key: "main",
                severity: "error",
                summary: "Saved",
                detail: "Atleast one order must be selected!",
              });
            }
          }
        }
        this.isShowOrderDetail = false;

        this.loaderService.loading(false);
      },
    });

    this.IsAddNewPickerAllowed(this.tripPlannerConfirmMasterId);
    // console.log(this.tripPlannerConfirmMasterId);
  }

  async loadOrderLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.orderPager.Skip = event.first;
    this.orderPager.Take = event.rows;
    await this.getAllOrders();
    this.loading = false;
  }

  async getAllOrders() {
    let result = await this.planMasterService
      .getAllOrderList(this.orderPager)
      .toPromise();
    this.rowCount = result.RowCount;
    this.allOrderList = result.OrderList;

    console.log("this.allOrderList: ", this.allOrderList);
    this.allOrderList.forEach((x) => {
      if (this.allOrderList && this.allOrderList.length > 0) {
        let tempOrder = this.orderList.filter((y) => {
          return y.OrderId == x.OrderId;
        });

        if (tempOrder && tempOrder.length > 0) {
          x.IsActive = tempOrder[0].IsActive;
          x.IsActiveOld = tempOrder[0].IsActiveOld;
        }
      } else {
        x.IsActive = false;
        x.IsActiveOld = false;
      }
    });
  }

  initializePager() {
    this.orderPager = {
      WarehouseId: this.selectedTrip.WarehouseId,
      Keyword: "",
      Skip: 0,
      Take: 20,
      TripPlannerConfirmedMasterId: this.selectedTrip.Id,
    };
  }

  filterActiveOrder(orderList: TripPlannerConfirmedOrderVM[]) {
    return this.orderList.filter((x) => {
      return x.IsActive;
    });
  }

  discardOrderChanges() {
    this.confirmationService.confirm({
      header: "ARE YOU SURE?",
      message:
        "If you discard, all the order selected/de-selected will be recycled!!!",
      accept: () => {
        this.isShowOrderDetail = false;
      },
    });
  }

  async resetAllOrder() {
    this.allOrderList = null;
    this.loading = true;
    this.orderPager.Skip = 0;
    this.orderPager.Take = this.orderPager.Take;
    this.orderPager.Keyword = null;
    await this.getAllOrders();
    this.loading = false;
  }

  async searchAllOrder() {
    this.allOrderList = null;
    this.loading = true;
    this.orderPager.Skip = 0;
    this.orderPager.Take = this.orderPager.Take;
    await this.getAllOrders();
    this.loading = false;
  }
  //#endregion

  //#region agent , dboy , driver drop down list
  makeDboyList() {
    this.dboyList = [{ value: null, label: "Select Dboy" }];

    if (
      this.agentMappingList != null &&
      this.agentMappingList.Dboys != null &&
      this.agentMappingList.Dboys.length > 0
    ) {
      this.agentMappingList.Dboys.forEach((x) => {
        this.dboyList.push({ value: x.DboyId, label: x.DboyName });
      });
    }
  }

  makeDriverList() {
    this.driverList = [{ value: null, label: "Select Driver" }];
    if (
      this.agentMappingList != null &&
      this.agentMappingList.Drivers != null &&
      this.agentMappingList.Drivers.length > 0
    ) {
      this.agentMappingList.Drivers.forEach((x) => {
        this.driverList.push({ value: x.DriverId, label: x.DriverName });
      });
    }
  }

  makeVehicleList() {
    this.VehicleList = [];
    this.VehicleList = [{ value: null, label: "Select Vehicle" }];
    //this.agentMappingList.Vehicles = this.agentMappingList.Vehicles.filter(x => x.TripTypeEnum == this.selectedCustomTripType);
    if (
      this.agentMappingList != null &&
      this.agentMappingList.Vehicles != null &&
      this.agentMappingList.Vehicles.length > 0
    ) {
      this.agentMappingList.Vehicles.forEach((x) => {
        // console.log("this.agentMappingList", this.agentMappingList);

        //debugger;
        this.VehicleList.push({ value: x.VehicleId, label: x.VehicleName });
        // console.log("this.VehicleList",this.VehicleList);

      });
    }
  }
  //#endregion

  //#region create new custom trip properties
  async createCustomTrip() {
    // debugger;
    // this.agentList = await this.planMasterService.getAgentList(this.clusterId).toPromise();
    this.tripType = "";
    console.log("this.tripType =", this.tripType);

    console.log("this.agentlist =", this.agentList);
    this.customTrip = {
      AgentId: null,
      // ClusterId: this.clusterId,
      TripNumber: null,
      VehicleMasterId: 0,
      WarehouseId: this.warehouseId,
      CustomerId: 0,
      TripType: null,
      TripDate: null,
    };
    // if(this.customTrip.WarehouseId= null){

    // }
    if (this.customTrip.TripDate != null) {
      await this.getCustomTripAgentList();
    }
    this.CustomerId = null;
    this.selectedTripType = null;
    this.isShowCreateCustomTripDialog = true;
  }

  async saveCustomTrip(customTripFormElement: NgForm) {
    if (customTripFormElement.valid) {
      this.confirmationService.confirm({
        header: "Confirmation",
        message: "Do you really want to add a new custom trip?",
        accept: async () => {
          if (
            ((this.selectedTripType == "SKP Owner" ||
              this.selectedTripType == "KPP") &&
              this.CustomerId > 0 &&
              this.selectedTripType != null) ||
            this.selectedTripType == "City" ||
            this.selectedTripType == "Damage" ||
            this.selectedTripType == "NonSellable"

          ) {
            // TriptypeEnum City = 0,      SKP = 1,      KPP = 2,      Damage_Expiry = 3
            if (this.selectedTripType == "City") {
              this.selectedTripType = 0;
            }
            if (this.selectedTripType == "SKP Owner") {
              this.selectedTripType = 1;
            }
            if (this.selectedTripType == "KPP") {
              this.selectedTripType = 2;
            }
            if (this.selectedTripType == "Damage") {
              this.selectedTripType = 3;
            }
            if (this.selectedTripType == "NonSellable") {
              this.selectedTripType = 4;
            }

            this.customTrip.TripType = this.selectedTripType;
            if (
              this.customTrip.TripType == 0 ||
              this.customTrip.TripType == 3 ||
              this.customTrip.TripType == 4
            ) {
              this.customTrip.CustomerId = 0;
            } else {
              this.customTrip.CustomerId = this.CustomerId;
            }
            this.loaderService.loading(true);
            this.customTrip.TripDate = moment(this.customTrip.TripDate).format(
              "YYYY-MM-DD 00:00:00"
            );
            this.tripMasterId = await this.planMasterService
              .createCustomTripV1(this.customTrip)
              .toPromise();
            console.log("this.customtrip", this.customTrip);

            this.loaderService.loading(true);

            await this.getTripList(false);
            await this.getTrip();
            this.isShowCreateCustomTripDialog = false;
          } else {
            this.isInValid = true;
          }
        },
      });
    }
  }

  async getCustomTripAgentList() {
    this.agentMappingList = null;
    this.dboyList = null;
    this.driverList = null;
    this.VehicleList = null;
    // if (this.customTrip.AgentId) {
    this.loaderService.loading(true);
    this.agentMappingList = await this.planMasterService
      .getAgentMappingList(this.customTrip.WarehouseId)
      .toPromise();
    this.loaderService.loading(false);
    this.makeDboyList();
    this.makeDriverList();
    // this.makeVehicleList();
    // }
    // console.log("this.agentMappingList:", this.agentMappingList);
  }
  //#endregion

  async OnChangeDate() {
    this.VehicleList = [];
    // this.customTrip.TripDate = ;
    this.agentMappingList = await this.planMasterService
      .getVehicleMappingList(
        this.customTrip.WarehouseId,
        moment(this.customTrip.TripDate).format("YYYY-MM-DD")
      )
      .toPromise();
    this.makeVehicleList();
  }

  async OnSelectedChangeDate() {
    this.VehicleList = [];
    this.selectedTrip.FleetType = null;
    this.selectedTrip.VehicleId = null;
    this.selectedTrip.IsReplacementVehicleNo = false;
    this.selectedTrip.ReplacementVehicleNo = null;
    this.selectedTrip.VehicleFare = null;

    this.agentMappingList = await this.planMasterService
      .getVehicleMappingList(
        this.warehouseId,
        moment(this.tripDate).format("YYYY-MM-DD")
      )
      .toPromise();
    this.makeVehicleList();
  }

  async downloadManifest() {
    this.loaderService.loading(true);
    let url = await this.planMasterService
      .generateInvoiceManifest(this.selectedTrip.TripPlannerMasterId)
      .toPromise();
    this.loaderService.loading(false);
    if (url.IsSuceess) {
      if (url) {
        url = environment.apiURL + url.SuccessMessage;
        window.open(url);
      }
    } else {
      this.blockedOrderList = url.ResultList;
      if (this.blockedOrderList.length > 0) {
        this.isBlockedOrderList = true;
      }
    }
    console.log("url", url);
  }
  back() {
    this.router.navigateByUrl("/layout/operation-capacity");
  }

  private updateLateReportingTimeOnSave() {
    if (this.lateReportingTimeString) {
      let timeArray: any[] = this.lateReportingTimeString.split(":");
      let hourToMin = Number(timeArray[0]) * 60;
      let min = Number(timeArray[1]);
      this.selectedTrip.LateReportingTimeInMins = hourToMin + min;
    }
  }

  private updateLateReportingTimeOnGet() {
    if (this.selectedTrip && this.selectedTrip.LateReportingTimeInMins) {
      let hourToMin = Math.trunc(
        this.selectedTrip.LateReportingTimeInMins / 60
      );
      let min = this.selectedTrip.LateReportingTimeInMins % 60;
      this.lateReportingTimeString = hourToMin + ":" + min;
    }
  }


  // by simran (4-7-23)
  IsClearance: boolean = false;
  ClearanceOrderList: any = [];
  printProductList() {
    this.loaderService.loading(true);
    this.vehicleMasterService
      .TripAssignmentProductsList(this.selectedTrip.TripPlannerMasterId)
      .subscribe((x) => {
        this.loaderService.loading(false);
        console.log("TripAssignmentProductsList", x);
        if (x.IsSuccess) {
          if (x) {
            this.OrderItemlist = x;
            this.AssignmentBarcodeImage =
              this.OrderItemlist.AssignmentBarcodeImage;
            this.WarehouseName = this.OrderItemlist.WarehouseName;
            this.DeliveryIssuanceId = this.OrderItemlist.DeliveryIssuanceId;
            this.CreatedDate = this.OrderItemlist.CreatedDate;
            this.DboyName = this.OrderItemlist.DboyName;
            this.TotalAssignmentAmount =
              this.OrderItemlist.TotalAssignmentAmount;
            this.orderAssignmentList = this.OrderItemlist.orderamount;
            this.NewDeliveryIssuanceId =
              this.OrderItemlist.NewDeliveryIssuanceId;
            this.RedispatchedDeliveryIssuanceId =
              this.OrderItemlist.RedispatchedDeliveryIssuanceId;
            this.orderAssignmentDetail = [];
            if (this.OrderItemlist.orderamount.length > 0) {
              this.orderAssignmentDetail.push({
                DeliveryIssuanceId: this.DeliveryIssuanceId,
                DboyName: this.DboyName,
                TotalAssignmentAmount: this.TotalAssignmentAmount,
              });
            }

            //by simran 

            if (this.OrderItemlist.Itemlist.length > 0 || this.OrderItemlist.ReDispatchItemlist.length > 0) {
              this.OrderItemlist.Itemlist.forEach(x => {
                if (x.isClearance == true) {
                  var xboxes = 0;
                  var xpieces = 0;
                  if (x.PurchaseMinOrderQty > 0) {
                    xboxes = x.qty / x.PurchaseMinOrderQty;
                    xpieces = x.qty % x.PurchaseMinOrderQty;
                    // var box = xboxes.toFixed(1);
                    var str = xboxes.toString();
                    var numarray = str.split('.');
                    x.Boxes = numarray[0];
                    x.piece = xpieces;//numarray[1];
                  } else {
                    xboxes = x.PurchaseMinOrderQty;
                    xpieces = x.qty;
                    // var box = xboxes.toFixed(1);
                    var str = xboxes.toString();
                    var numarray = str.split('.');
                    x.Boxes = numarray[0];
                    x.piece = xpieces;//numarray[1];

                  }
                  x.Type = "New";
                  this.ClearanceOrderList.push(x);
                }
              })
              this.OrderItemlist.ReDispatchItemlist.forEach(x => {
                if (x.isClearance == true) {
                  var xboxes = x.qty / x.PurchaseMinOrderQty;
                  var xpieces = x.qty % x.PurchaseMinOrderQty;
                  // var box = xboxes.toFixed(1);
                  var str = xboxes.toString();
                  var numarray = str.split('.');
                  x.Boxes = numarray[0];
                  x.piece = xpieces;//numarray[1];
                  x.Type = "ReDispatch";
                  this.ClearanceOrderList.push(x);
                }
              })
            }

            if (this.ClearanceOrderList.length > 0) {
              this.IsClearance = true;
            }
            else {
              this.IsClearance = false;
            }

            //----end 
            if (this.OrderItemlist.Itemlist.length > 0) {
              this.ItemWiseList = [];
              this.OrderItemlist.Itemlist.forEach(x => {
                if (x.isClearance == false) {
                  this.ItemWiseList.push(x);
                }
              });
              //----end 

              // this.ItemWiseList = this.OrderItemlist.Itemlist;
              this.ItemWiseList.forEach((element) => {
                var xboxes = 0;
                var xpieces = 0;
                if (element.PurchaseMinOrderQty > 0) {
                  xboxes = element.qty / element.PurchaseMinOrderQty;
                  xpieces = element.qty % element.PurchaseMinOrderQty;
                  // var box = xboxes.toFixed(1);
                  var str = xboxes.toString();
                  var numarray = str.split(".");
                  element.Boxes = numarray[0];
                  element.piece = xpieces; //numarray[1];
                } else {
                  xboxes = element.PurchaseMinOrderQty;
                  xpieces = element.qty;
                  // var box = xboxes.toFixed(1);
                  var str = xboxes.toString();
                  var numarray = str.split(".");
                  element.Boxes = numarray[0];
                  element.piece = xpieces; //numarray[1];
                }
              });
              // debugger;
              this.list = true;
            } else {
              this.list = false;
            }
            if (this.OrderItemlist.ReDispatchItemlist.length > 0) {
              // this.ReDispatchItemlist = this.OrderItemlist.ReDispatchItemlist;
              this.ReDispatchItemlist = [];
              this.OrderItemlist.ReDispatchItemlist.forEach(x => {
                if (x.isClearance == false) {
                  this.ReDispatchItemlist.push(x);
                }
              });
              this.ReDispatchItemlist.forEach((element) => {
                var xboxes = element.qty / element.PurchaseMinOrderQty;
                var xpieces = element.qty % element.PurchaseMinOrderQty;
                // var box = xboxes.toFixed(1);
                var str = xboxes.toString();
                var numarray = str.split(".");
                element.Boxes = numarray[0];
                element.piece = xpieces; //numarray[1];
              });
              // debugger;
              this.Relist = true;
            } else {
              this.Relist = false;
            }
            this.openPopup = true;
          } else {
            this.messageService.add({
              key: "main",
              severity: "info",
              summary: "error",
              detail: "No Data Found!!",
            });
            this.loaderService.loading(false);
          }
        } else {
          this.blockedOrderList = x.BlockedOrderList;
          if (this.blockedOrderList.length > 0) {
            this.isBlockedOrderList = true;
          }
        }
      });
  }
  printAllInvoice() {
    this.orderListTrue = false;
    this.loaderService.loading(true);
    this.vehicleMasterService
      .TripGetAssignmentOrder(this.selectedTrip.TripPlannerMasterId)
      .subscribe((x) => {
        this.loaderService.loading(false);
        if (x.IsSuccess) {
          if (x.OrderDispatchedMasters.length > 0) {
            this.orderListTrue = true;
            this.AllOrderList = x.OrderDispatchedMasters;
            console.log("AllOrderList", x);
            this.warehouse = x.warehouse;
          } else {
            this.orderListTrue = false;
            this.loaderService.loading(false);
            this.messageService.add({
              key: "main",
              severity: "info",
              summary: "error",
              detail: "No Data Found!!",
            });
          }
        } else {
          this.blockedOrderList = x.BlockedOrderList;
          if (this.blockedOrderList.length > 0) {
            this.isBlockedOrderList = true;
          }
        }
      });
  }
  getTotalTax(data) {
    var totaltax = 0;
    data.forEach((x) => {
      //totaltax = totaltax + x.AmtWithoutTaxDisc;
      totaltax = totaltax + (x.TaxAmmount + x.CessTaxAmount);
    });
    return totaltax;
  }
  getTotalQty(data) {
    var totalQty = 0;
    data.forEach((x) => {
      totalQty = totalQty + x.Noqty;
    });
    return totalQty;
  }
  getTotalAWOTD(data) {
    var totalAWOTD = 0;
    data.forEach((x) => {
      totalAWOTD = totalAWOTD + x.AmtWithoutTaxDisc;
    });
    return totalAWOTD;
  }
  getTotalIGST(data) {
    var totalIGST = 0;
    data.forEach((x) => {
      totalIGST = totalIGST + x.TaxAmmount + x.CessTaxAmount;
    });
    return totalIGST;
  }
  getTotalSGST(data) {
    var totalSGST = 0;
    data.forEach((x) => {
      totalSGST = totalSGST + x.SGSTTaxAmmount;
    });
    return totalSGST;
  }
  getTotalCGST(data) {
    var totalCGST = 0;
    data.forEach((x) => {
      totalCGST = totalCGST + x.CGSTTaxAmmount;
    });
    return totalCGST;
  }
  getTotalCess(data) {
    var totalCess = 0;
    data.forEach((x) => {
      totalCess = totalCess + x.CessTaxAmount;
    });
    return totalCess;
  }

  getTotalIOverall(data) {
    var TotalIOverall = 0;
    data.forEach((x) => {
      TotalIOverall =
        TotalIOverall +
        x.AmtWithoutTaxDisc +
        x.SGSTTaxAmmount +
        x.CGSTTaxAmmount +
        x.CessTaxAmount;
    });
    return TotalIOverall;
  }
  getTotalAmtIncTaxes(data) {
    var totalAmtIncTaxes = 0;
    data.forEach((x) => {
      totalAmtIncTaxes = totalAmtIncTaxes + x.TotalAmt;
    });
    return totalAmtIncTaxes;
  }
  getTotalTaxableValue(data) {
    var totalTaxableValue = 0;
    data.forEach((x) => {
      totalTaxableValue = totalTaxableValue + x.AmtWithoutTaxDisc;
    });
    return totalTaxableValue;
  }
  closeAllPrintList() {
    this.orderListTrue = false;
  }
  RemoveZeroQtyItemInvoice(prop, val) {
    // debugger;
    return this.itemFunc(null, prop, val);
  }
  itemFunc(item, prop, val) {
    if (item[prop] > val) return true;
  }

  checkRoute() {
    // this.isCheckRouteToShow = true;
    this.expectedWaypoints = [];
    // debugger;
    console.log("this.selectedTripId: ", this.selectedTrip);
    this.deliveryDashboardService
      .getTouchPoints(this.selectedTrip.TripPlannerMasterId)
      .subscribe((x) => {
        this.touchPointList = x.TripTouchPointList;

        console.log("this.touchPointList :", this.touchPointList);
        this.tripInformation = x.tripInformation;

        // if (this.tripInformation.TruckStatusId == 6) {
        //   this.deliveryDashboardService.getLiveTrackerTripHistory(this.selectedTrip.TripPlannerMasterId).subscribe(x => {
        //     console.log('x freezed: ', x);
        //     this.actualWaypoints = [];
        //     this.showMarker = false;
        //     this.createActualWayPoints(x);

        //     console.log('this.actualWaypoints are: ', this.actualWaypoints);
        //   })
        // } else {
        //     this.loaderService.loading(true);
        //     this.deliveryDashboardService.getLiveTrips(this.warehouseId).subscribe(x => {
        //       // this.tripList = x;
        //       this.loaderService.loading(false);
        //       let getSelectedTrip;
        //       x.forEach(element=>{
        //         console.log('ele::',element);
        //         if(element.value.ClusterId == this.selectedTrip.ClusterId && element.value.TripNumber == this.selectedTrip.TripNumber && element.value.TripPlannerMasterId == this.selectedTrip.TripPlannerMasterId){
        //           getSelectedTrip = element.value;
        //         }
        //       });
        //       this.subscription = this.dBoyTrckerFirestoreService.getAllHistory(getSelectedTrip.TripPlannerVehicleId).subscribe(data => {
        //         console.log('x iixxixixi: ', data);
        //         this.actualWaypoints = [];
        //         this.showMarker = false;
        //         this.createActualWayPoints(data);

        //         console.log('this.actualWaypoints: ', this.actualWaypoints);

        //       });
        // });
        // }
        console.log("list is: ", this.tripInformation);
        if (this.touchPointList && this.touchPointList.length > 0) {
          this.source = this.touchPointList.filter((x) => {
            return x.CustomerId == 0;
          })[0];
          this.touchPointList = this.touchPointList.filter((x) => {
            return x.CustomerId != 0;
          });
          this.updateTouchPointColorStatus();
          // this.origin = { lat: Number(this.source.Lat), lng: Number(this.source.Lng) };
          this.origin = {
            lat: Number(this.source.Lat.toFixed(6)),
            lng: Number(this.source.Lng.toFixed(6)),
          };

          console.log("this.origin: ", this.origin);
          this.touchPointList.forEach((wp) => {
            if (wp.Lat != 0 && wp.Lng != 0) {
              let obj = {
                location: {
                  lat: Number(wp.Lat.toFixed(6)),
                  lng: Number(wp.Lng.toFixed(6)),
                },
                realObj: wp,
              };
              this.expectedWaypoints.push(obj);
            }
          });

          console.log("this.expectedWaypoints: ", this.expectedWaypoints);
          // this.showMap = true;
          this.isCheckRouteToShow = true;
        }
      });
  }
  createActualWayPoints(data) {
    this.actualWaypoints = [];
    if (data && data.length > 0) {
      this.currentLocation = JSON.parse(JSON.stringify(data[data.length - 1]));
      setTimeout(() => {
        this.showMarker = true;
      }, 300);
    } else {
      this.currentLocation = null;
    }

    if (data && data.length > 0) {
      this.actualOrigin = JSON.parse(
        JSON.stringify({ lat: data[0].Lat, lng: data[0].Lng })
      );
      this.actualDestination = JSON.parse(
        JSON.stringify({
          lat: data[data.length - 1].Lat,
          lng: data[data.length - 1].Lng,
        })
      );
      let skip = Math.trunc(data.length / 18);
      if (skip > 0) {
        let newData = [];
        let index = 0;
        if (skip == 1) {
          skip = 2;
        }
        while (index < data.length) {
          newData.push(data[index]);
          index = index + skip;
        }

        newData.push(data[data.length - 1]);
        data = newData;
      }
      let waypoints = [];
      data.forEach((element) => {
        waypoints.push({
          location: {
            lat: Number(element.Lat).toFixed(6),
            lng: Number(element.Lng).toFixed(6),
          },
        });
      });

      this.actualWaypoints = waypoints;
      console.log("actualOrigin:", this.actualOrigin);
      console.log("actualDestination:", this.actualDestination);
    }
  }
  updateTouchPointColorStatus() {
    if (this.touchPointList && this.touchPointList.length > 0) {
      this.touchPointList.forEach((x) => {
        if (x.OrderStatus) {
          let arr = x.OrderStatus.split(",");
          if (arr && arr.length == 1) {
            x.OrderStatus = arr[0];
          } else {
            x.OrderStatus = "multi";
          }
        }
      });
    }
  }
  assignmentDetail() {
    this.isShowAssignmentDetail = true;
    // this.vehicleMasterService.getAssingmentamount(44136).subscribe(x=>{
    //   this.assignmentList = x;
    //   debugger;
    // })
  }
  CustomerId: any;
  isInValid: boolean = false;
  tripTypeText: string;
  skcodeList: any;
  OpenTrip(tripType) {
    if (tripType) {
      this.customTrip.TripDate = null;
      this.CustomerId = undefined;
      this.customTrip.VehicleMasterId = 0;
      this.isInValid = false;
      this.tripType;
      this.CustomerId = null;
      this.selectedTripType = tripType;
      if (this.selectedTripType == "City") {
        this.isOpen = false;
        this.getCustomTripAgentList();
        // this.isdetailsclose.emit(this.selectedTripType);
      } else if (this.selectedTripType == "Damage") {
        this.isOpen = false;
        this.tripTypeText = "Damage";
        this.getCustomTripAgentList();
      } else if (this.selectedTripType == "NonSellable") {
        this.isOpen = false;
        this.tripTypeText = "NonSellable";
        this.getCustomTripAgentList();
      }
      else {
        if (this.selectedTripType == "SKP Owner") {
          this.tripTypeText = "SKP Orders";
        } else if (this.selectedTripType == "KPP") {
          this.tripTypeText = "KPP Orders";
        }
        this.isOpen = true;
        this.loaderService.loading(true);
        this.deliveryDashboardService
          .searchSKP_KPP_OwnerList(this.warehouseId, this.selectedTripType)
          .subscribe((x) => {
            this.skcodeList = x;
            this.getCustomTripAgentList();
            this.loaderService.loading(false);
          });
      }
    }
  }
  customer = { NameOnGST: "", BillingCity: "", BillingZipCode: "", BillingState: "", BillingAddress: "" };
  GSTData: any;

  onClickIsRemovefiled() {
    // debugger
    this.selectedTrip.IsReplacementVehicleNo = false;
    this.selectedTrip.ReplacementVehicleNo = null;

    this.agentMappingList.Vehicles.filter((x) => {
      if (x.VehicleId == this.selectedTrip.VehicleId) {
        this.selectedTrip.IsReplacementVehicleNo = x.IsReplacementVehicleNo;
        this.selectedTrip.ReplacementVehicleNo = x.ReplacementVehicleNo;
        return;
      }
    })
    this.IsReplacementVehicleNo = this.selectedTrip.IsReplacementVehicleNo ? true : false;
    this.IsReplacementVehicleNoValue = this.selectedTrip.ReplacementVehicleNo ? true : false;

    this.getTripCost();
  }
  // VarifiedCustomerGSTNO(text) {
  //   debugger;
  //   if (text.length == 15) {
  //     this.loaderService.loading(true);
  //     this.customerService
  //       .CheckVarifiedCustomerGSTNO(text)
  //       .subscribe((result) => {
  //         if (result.Status) {
  //           this.loaderService.loading(false);
  //           this.customer.NameOnGST = result.custverify.Name;
  //           this.transportEway = this.customer.NameOnGST;
  //           this.transportGST = result.custverify.RefNo;
  //           this.GSTdisplay = true;
  //           alert("GST Verified");
  //         } else {
  //           this.loaderService.loading(false);
  //           alert("Invalid  GST/TIN_No/Ref No.");
  //         }
  //       });
  //   } else {
  //     alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE");
  //   }
  // }
  // OpenTrip(tripType){
  //   debugger;
  //   if(tripType=="City"){
  //     this.selectedTripType=tripType;

  //   }else if(tripType=="SKP Owner"){
  //     this.selectedTripType=tripType;
  //   }else if(tripType=="KPP"){
  //     this.selectedTripType=tripType;
  //   }
  //   else if(tripType=="Damage"){
  //     this.selectedTripType=tripType;
  //   }
  // }
  // createTripNew(){
  //   debugger;
  //   if(this.selectedTripType =='SKP Owner' || this.selectedTripType=='KPP' || this.selectedTripType=='Damage'){
  //     this.isOpenTripType = false;
  //     if(this.selectedTripType  == 'SKP Owner'){
  //       this.tripTypeText = 'SKP Orders'
  //     }else if(this.selectedTripType  == 'KPP'){
  //       this.tripTypeText = 'KPP Orders'
  //     }else if(this.selectedTripType  == 'Damage'){
  //       this.tripTypeText = 'Damage/Clearance Orders'
  //     }
  //     this.isOpen = true;
  //   }else if(this.selectedTripType  == 'City'){
  //     this.IsRunningUtility();
  //   }
  // }
  // isInValid : boolean = false;
  // onClickOk(Skcode){
  //   debugger;
  //   if(Skcode && Skcode.length > 0){
  //     this.isOpen = false;
  //     this.deliveryDashboardService.searchSKP_KPP_OwnerList(this.data.warehouseId,this.selectedTripType,Skcode).subscribe(x=>{
  //       debugger;
  //       this.Skcode = null;''
  //     })
  //   }else{
  //     this.isInValid = true;
  //   }

  // }

  //#region 

  //#endregion

  opeFreezingTripPopup(tripForm) {
    this.getTripCost();
    this.IsFinalizing = true;
  }

  getTripCost() {
    if ((!this.selectedTrip.IsFreezed) && this.selectedTrip.VehicleId) {
      this.planMasterService.getFixedCost(this.selectedTrip.VehicleId).subscribe(x => {
        console.log('get cost: ', x);
        this.selectedTrip.VehicleFare = parseFloat(x.toFixed(2));
        // alert('this.selectedTrip.VehicleFare: '+ this.selectedTrip.VehicleFare);
      });
    }
  }

  onSubmitFinalizeForm(tripPopupForm: any) {
    console.log('onSubmitFinalizeForm: ', tripPopupForm);
    if (tripPopupForm.valid) {
      debugger
      this.freezeTrip(this.form);
    } else {
      // alert('form is INNNNvalid');
    }
  }
}

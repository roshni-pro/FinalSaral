import { Component, OnInit } from "@angular/core";
import { PlanMasterService } from "app/operation-capacity/services/plan-master.service";
import { VehicleConfigService } from "app/operation-capacity/services/vehicle-config.service";
import { ExportServiceService } from "app/shared/services/export-service.service";
import { VehicleMasterService } from "app/vehicle-master/services/vehicle-master.service";
import { log } from "console";
import { ConfirmationService, MessageService } from "primeng/api";
VehicleConfigService;
@Component({
  selector: "app-vehicle-configuration",
  templateUrl: "./vehicle-configuration.component.html",
  styleUrls: ["./vehicle-configuration.component.scss"],
})
export class VehicleConfigurationComponent implements OnInit {
  vehicleTyepList: any[];
  warehouseList: any[];
  isLoading: boolean;
  warehouseId: number;
  thresholdLoadInKg: any;
  thresholdOrderCount: any;
  thresholdTouchPoint: any;
  thresholdOrderAmount: any;
  thresholdkgList: any[];
  type: any;
  editDisplay: boolean = true;
  display: boolean;
  editdisplay: boolean;
  rowDataCopy: any;
  thresholdkgLists: any;

  constructor(
    private planMasterService: PlanMasterService,
    private vehicleconfigService: VehicleConfigService,
    private vehicleMasterService: VehicleMasterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getWareHouseList();
    this.getThresholdkgList();
  }

  insertVehicleConfig() {
    if (
      this.type &&
      this.warehouseId &&
      this.thresholdTouchPoint &&
      this.thresholdOrderCount &&
      this.thresholdOrderAmount &&
      this.thresholdLoadInKg != null
    ) {
      const payload = {
        Type: this.type,
        WarehouseId: this.warehouseId,
        ThresholdTouchPoint: this.thresholdTouchPoint,
        ThresholdOrderCount: this.thresholdOrderCount,
        ThresholdOrderAmount: this.thresholdOrderAmount,
        ThresholdLoadInKg: this.thresholdLoadInKg
          ? this.thresholdLoadInKg.Id
          : this.thresholdLoadInKg,
      };

      this.vehicleconfigService
        .insertVechicleAttandance(payload)
        .subscribe((res: any) => {
          console.log(res);
          this.display = false;
          this.getList();
          this.editDisplay = true;
          this.type = "";
          this.thresholdTouchPoint = null;
          this.thresholdOrderCount = null;
          this.thresholdOrderAmount = null;
          this.thresholdLoadInKg = null;
        });
    } else {
      this.type = "";
      this.thresholdTouchPoint = null;
      this.thresholdOrderCount = null;
      this.thresholdOrderAmount = null;
      this.thresholdLoadInKg = null;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Fill All the Field to Proceed ",
      });
    }
  }

  getThresholdkgList() {
    this.vehicleMasterService.GetThresholdkgList().subscribe((res) => {
      this.thresholdkgList = res;
      console.log(res);
    });
  }
  getWareHouseList() {
    this.isLoading = true;
    this.planMasterService.getWarehouseList().subscribe((res) => {
      this.warehouseList = res;
      this.isLoading = false;
      console.log("warehouseList:", this.warehouseList);
    });
  }

  getList() {
    this.vehicleconfigService
      .getVehicleTypeList(this.warehouseId)
      .subscribe((res) => {
        this.vehicleTyepList = res;
        this.isLoading = false;
        console.log("vehicleTyepList:", this.vehicleTyepList);
      });
  }

  editRowData(rowData) {
    this.editdisplay = true;
    this.rowDataCopy = JSON.parse(JSON.stringify(rowData));
    let thresholddata = [];
    thresholddata = this.thresholdkgList.find(
      (x) => x.ThresholdLoadInKg == this.rowDataCopy.ThresholdLoadInKg
    );
    this.thresholdkgLists = thresholddata;
  }

  editvehicleTypeList() {
    if (
      (this.rowDataCopy.Type != null &&
      this.rowDataCopy.ThresholdOrderAmount != null &&
      this.rowDataCopy.ThresholdTouchPoint != null &&
      this.rowDataCopy.ThresholdOrderCount != null &&
      this.rowDataCopy.ThresholdLoadInKg != null)
    ) {
      const payload = {
        Type: this.rowDataCopy.Type,
        Id: this.rowDataCopy.Id,
        ThresholdTouchPoint: this.rowDataCopy.ThresholdTouchPoint,
        ThresholdOrderCount: this.rowDataCopy.ThresholdOrderAmount,
        ThresholdOrderAmount: this.rowDataCopy.ThresholdOrderAmount,
        ThresholdLoadInKg: this.thresholdkgLists
          ? this.thresholdkgLists.Id
          : this.thresholdkgLists,
      };
      this.vehicleconfigService
        .editVechicleTypeList(payload)
        .subscribe((res: any) => {
          console.log(res);
          if (res.Status == false) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: " Not Updated Because VehicleWeight Already Exists!! ",
            });
          } else {
            this.messageService.add({
              severity: "success",
              summary: "Success!",
              detail: " Successfully Updated ",
            });
          }
          this.editdisplay = false;
          this.getList();
        });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error!",
        detail: " Please Select All fields to update ",
      });
      
    }
  }

  confirm(rowData) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.removeData(rowData);
      },
      reject: () => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "You Have Cancelled",
        });
      },
    });
  }
  removeData(rowData) {
    this.isLoading = true;
    this.vehicleconfigService
      .deleteVechicleTypeList(rowData.Id)
      .subscribe((res: any) => {
        console.log(res);

        if (res.Status == false) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Not Deleted because VehicleExist for this Weight!!",

          });
        } else {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Deleted Successfully",
          });
        }

        this.isLoading = false;
        this.getList();
      });
  }
}

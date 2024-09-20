import { Component, OnInit } from "@angular/core";
import { PlanMasterService } from "app/operation-capacity/services/plan-master.service";
import { ExportServiceService } from "app/shared/services/export-service.service";
import { log } from "console";
import { isToday } from "date-fns";
import { environment } from "environments/environment";
import * as moment from "moment";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";

@Component({
  selector: "app-vehicle-capacity-enhancement",
  templateUrl: "./vehicle-capacity-enhancement.component.html",
  styleUrls: ["./vehicle-capacity-enhancement.component.scss"],
})
export class VehicleCapacityEnhancementComponent implements OnInit {
  userid: number = 0;
  warehouseId: any;
  exportWarehouseId: any;
  warehouseList: SelectItem[];
  basicData: any;
  dayList: any;
  orderTouchpoint: any[] = [];
  vechicleList: any[] = [];
  vechicleId: any;
  VehicleIdList: any[] = [];
  WarehouseIdList: any[] = [];
  historyList: any;
  triCheckBox: boolean = true;
  orderTouchpointId: any;
  selectedDay: any = { label: "MTD", Id: 2 };
  vehicleAttendanceList: any = [];
  attendanceListBackup: any = []; // for filtering the data on tricheckbox
  rangeDates: Date[] = [];
  display: boolean = false;
  displayExport: boolean = false;
  triCheckBoxLabel: string = "All";
  updateAttandanceToday: any;
  skip: number;
  Take: number;
  first: number = 0;
  totalcount: number;
  VehicleMasterId: number;
  isLoading: boolean = false;
  calenderDisplay: boolean = false;
  minDateValue: Date;
  maxDateValue: Date;
  payloadList: any[] = [];
  yearRangeForCalender: string;
  statusList: any[] = [];
  selectedStatus: any;
  futureAttandanceList: any[] = [];
  mydate: any[] = [];
  statusResult: any;
  warehouseids: any;
  editList:SelectItem[]=[];
  selectedEditList:any
  month: any;
  year:any;
  // ={Label:"AutoEdit",Id:0};
  constructor(
    private planMasterService: PlanMasterService,
    private exportService: ExportServiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    // =================MTD selection================
    this.rangeDates[0] = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    this.rangeDates[1] = moment().toDate(); //moment().add(1, "days").toDate();

    //===============Attandance calender=================
    this.minDateValue = moment().add(0, "days").toDate();
    this.maxDateValue = moment().add(0, "month").toDate();
    this.month=new Date().getMonth();
    this.year=new Date().getFullYear();
  }

  ngOnInit() {
    this.getWareHouseList();
    this.orderTouchpointList();
    this.setStatusList();
    this.getAttendanceStatus();
    this.getAutoEditList();
    // this.getVehicleMaster();
  

  }

  setStatusList() {
    this.dayList = [
      { label: "Yesterday", Id: 1 },
      { label: "MTD", Id: 2 },
      { label: "Custom", Id: 3 },
    ];
  }

  getAutoEditList() {

    this.editList = [
      { label: "Manual Created", value: false },
      { label: "Auto Created", value: true },
    ];
    

    this.selectedEditList=this.editList[0].value;
    

  }

  getAttendanceStatus() {
    this.statusList = [
      { label: "All", Id: 1 },
      { label: "Present", Id: 2 },
      { label: "Absent", Id: 3 },
    ];
  }

  orderTouchpointList() {
    this.orderTouchpoint = [
      { label: "---Select---", Id: 0 },
      { label: "Order Amount", Id: 1 },
      { label: "Touchpoint", Id: 2 },
      { label: "KM", Id: 3 },
    ];
  }
  getFutureAttandance(vehicleMasterId) {
    this.planMasterService
      .getFutureAttandanceDate(this.warehouseId.value, vehicleMasterId,this.month,this.year)
      .subscribe((res: any) => {
        // console.log(res);
        this.futureAttandanceList = res;
        this.mydate = [];

        res.forEach((x: any) => {
          this.mydate.push(new Date(x.AttendanceDate));
        });
        console.log(this.futureAttandanceList);
        console.log("mydate", this.mydate);
      });
  }
  currentDate : Date;
  onChangeMonth(event)
  {
    this.currentDate=new Date();
    this.month=this.currentDate.getMonth() + 1;
    this.year=this.currentDate.getFullYear();    
    if(event.month){
      this.month= event.month;
      this.year=event.year;
    }
    console.log("mydate", this.mydate);
    this.getFutureAttandance(this.VehicleMasterId);
  }
  updateFutureAttandance() {
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        //Actual logic to perform a confirmation

        var find;
        this.payloadList = [];

        this.mydate.forEach((x: any) => {
          find = null;
          find = this.futureAttandanceList.find(
            (z) =>
              moment(z.AttendanceDate).format("YYYY-MM-DD 00:00:00") ==
              moment(x).format("YYYY-MM-DD 00:00:00")
          );
          if (find == null) {
            const payload = {
              Id: 0,
              WarehouseId: this.warehouseId.value,
              VehicleMasterId: this.VehicleMasterId,
              IsActive: true,
              AttendanceDate: moment(x).format("YYYY-MM-DD 00:00:00"),
            };
            this.payloadList.push(payload);
          }
        });

        this.futureAttandanceList.forEach((z: any) => {
          find = null;
          find = this.mydate.find(
            (x) =>
              moment(z.AttendanceDate).format("YYYY-MM-DD 00:00:00") ==
              moment(x).format("YYYY-MM-DD 00:00:00")
          );
          if (find == null) {
            const payload = {
              Id: z.Id,
              WarehouseId: this.warehouseId.value,
              VehicleMasterId: this.VehicleMasterId,
              IsActive: false,
              AttendanceDate: z.AttendanceDate,
            };
            this.payloadList.push(payload);
          }
        });

        console.log("payloadlist", this.payloadList);

        if (this.payloadList.length > 0) {
          this.planMasterService
            .updateFutureAttandance(this.payloadList)
            .subscribe((res: any) => {
              console.log(res);

              this.calenderDisplay = false;
              this.messageService.add({
                severity: "success",
                summary: "Attendance Date changed!",
                detail: "",
              });
            });
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Please Select Date to apply!",
            detail: "",
          });
        }
      },
      reject: () => {
        this.calenderDisplay = false;

        this.messageService.add({
          severity: "error",
          summary: "Attendance Not Applied!!",
          detail: "",
        });
      },
    });
  }

  cancel() {
    this.calenderDisplay = false;
  }

  updateTodaysAttandance() {
    if (this.vehicleAttendanceList.length > 0) {
      this.isLoading = true;
      this.planMasterService
        .updateTodayAttandance(this.warehouseId.value)
        .subscribe((res) => {
          this.updateAttandanceToday = res;
          this.isLoading = false;
          console.log("updateAttandanceToday:", this.updateAttandanceToday);
          this.getVehicleAttendanceList();
        });
    } else {
      alert("Please search the data to Update Attandance....");
    }
  }

  tricheckboxAttendance() {
    if (this.attendanceListBackup) {
      if (this.selectedStatus.Id == 1) {
        this.vehicleAttendanceList = this.attendanceListBackup;
        this.triCheckBoxLabel = "All";
      } else if (this.selectedStatus.Id == 2) {
        this.vehicleAttendanceList = this.attendanceListBackup.filter(
          (x) => x.TodaySwitch == true
        );
        this.triCheckBoxLabel = "Present";
      } else {
        this.vehicleAttendanceList = this.attendanceListBackup.filter(
          (x) => x.TodaySwitch == false
        );

        this.triCheckBoxLabel = "Absent";
      }
    }
    if (this.orderTouchpointId.Id > 0) {
      this.getVehicleAttendanceList();
    }
  }

  
  getWareHouseList() {
    // this.isLoading = true;
    this.planMasterService.getWarehouseList().subscribe((res) => {
    
      //console.log(res);
      
      var widIds = localStorage.getItem("warehouseids");
      if (widIds != null) {
        this.warehouseids = widIds.split(",").map(Number);
        let selectedWids = [];
       
        this.warehouseids.forEach((element) => {
          // for filtering of respective warehouse for hub
          let existWid = res.find((x) => x.value == element);
          if (existWid != null) {
            selectedWids.push(existWid);
          }
        });
        this.warehouseList = res;
        this.warehouseId=selectedWids[0];
        // this.warehouseList = selectedWids;
      } else {
        this.warehouseList = res;
      }

      // this.warehouseId = this.warehouseList ? this.warehouseList[0].value:null;
      this.isLoading = false;
      console.log("warehouseList:", this.warehouseList);
    });
  }

  getVehicleNumberList() {
    if (this.exportWarehouseId) {
      this.isLoading = true;
      this.planMasterService
        .getVechicleNumberList(this.exportWarehouseId)
        .subscribe((res) => {
          this.vechicleList = res;
          this.isLoading = false;
          console.log("vechicleMasterList:", this.vechicleList);
        });
    }
  }
  WarehouseIds : any[]=[];
  getMultipleVehicleNumberList() {
    if (this.exportWarehouseId) {
      this.isLoading = true;
      if(this.WarehouseIds.length > 0)
      {
        this.WarehouseIdList = [];
        this.WarehouseIds.forEach((obj: any) => {
          this.VehicleIdList.push(obj.value);
        });
      }
      if(this.vechicleId.length > 0)
      {
        this.VehicleIdList = [];
        this.vechicleId.forEach((obj: any) => {
          this.VehicleIdList.push(obj.Id);
        });
      }

      const payload = {
        WarehouseId: this.WarehouseIdList,
        VehicleMasterId: this.VehicleIdList,
        StartDate: moment(this.rangeDates[0]).format("YYYY-MM-DD"),
        EndDate: moment(this.rangeDates[1]).format("YYYY-MM-DD"),
      };

      this.planMasterService
        .getAllVehicleReportOfDate(payload)
        .subscribe((res) => {
          this.vechicleList = res;
          this.isLoading = false;
          console.log("vechicleMasterList:", this.vechicleList);
        });
    }
  }
  onChangeWarehouse(WarehouseIds)
  {
    debugger;
    console.log('WhIds : ' ,WarehouseIds);
    this.isLoading = true;
    if(this.WarehouseIds.length > 0)
    {
      this.WarehouseIdList = [];
      this.WarehouseIds.forEach((obj: any) => {
        this.WarehouseIdList.push(obj.value);
      });
    }
    this.planMasterService
      .getVehicleNumberListByWids(this.WarehouseIdList)
      .subscribe((res) => {
        this.vechicleList = res;
        this.isLoading = false;
        console.log("vechicleMasterList:", this.vechicleList);
      }); 
  }

  onDateChange() {
    var date = new Date();
    if (this.selectedDay.Id == 2) {
      // MTD  Date will be +1
      this.rangeDates[0] = new Date(date.getFullYear(), date.getMonth(), 1);
      this.rangeDates[1] = moment().toDate();
    } else if (this.selectedDay.Id == 3) {
      this.rangeDates[0] = moment().toDate();
      this.rangeDates[1] = moment().toDate();
    } else if (this.selectedDay.Id == 1) {
      this.rangeDates[0] = moment().subtract(1, "days").toDate();
      this.rangeDates[1] = moment().subtract(1, "days").toDate();
    }
    console.log(this.rangeDates);
  }

  checkDateDifference() {
    console.log(this.rangeDates[0]);
    console.log(this.rangeDates[1]);

    let days =
      Math.floor(this.rangeDates[1].getTime() - this.rangeDates[0].getTime()) /
      (1000 * 3600 * 24);
    console.log("days==", days);
    if (days < 92) return true;
    else return false;
  }

  getVehicleAttendanceList() {
    if (
      this.rangeDates == null ||
      this.rangeDates[0] == undefined ||
      this.rangeDates[1] == undefined
    ) {
      alert("Select date range!");
      return false;
    }
    let checkDate = this.checkDateDifference();
    if (checkDate) {
      this.selectedStatus = { label: "All", Id: 1 };

      if (this.warehouseId) {
        const payload = {
          WarehouseId: this.warehouseId.value,
          StartDate: moment(this.rangeDates[0]).format("YYYY-MM-DD"),
          EndDate: moment(this.rangeDates[1]).format("YYYY-MM-DD"),
          IsAutoAdded:this.selectedEditList

        };
        console.log("payload",payload);
        

        this.isLoading = true;
        this.planMasterService
          .getVechicleAttandanceList(payload)
          .subscribe((res: any) => {
            this.vehicleAttendanceList = res.Data;
            this.attendanceListBackup = res.Data;
            console.log(this.vehicleAttendanceList);

            this.isLoading = false;
            if (
              this.vehicleAttendanceList &&
              this.vehicleAttendanceList.length == 0
            ) {
              alert("Data not found!");
            }

            if (this.vehicleAttendanceList) {
              this.vehicleAttendanceList.forEach((x: any) => {
                x.Today > 0 ? (x.TodaySwitch = true) : (x.TodaySwitch = false);

                // if (x.StatusOfUtilization) {
                //   this.statusResult = x.StatusOfUtilization.split("%");

                //   x.orderStatusResult = this.statusResult[1];
                //   x.orderStatusResult = x.orderStatusResult.slice(0, 15);

                //   x.touchpointStatusResult = this.statusResult[2];
                //   x.touchpointStatusResult = x.orderStatusResult.slice(0, 15);

                //   console.log(x.orderStatusResult);
                //   console.log(x.touchpointStatusResult);
                // }
                // x.stringBreak = x.StatusOfUtilization.split("   ");
                //     x.a = x.stringBreak[0];
                //     x.b = x.stringBreak[1];
              });
            }

            if (
              this.orderTouchpointId != null &&
              this.orderTouchpointId.Id == 1
            ) {
              if (this.triCheckBoxLabel == "Present") {
                this.vehicleAttendanceList = this.attendanceListBackup.filter(
                  (x) => x.TodaySwitch == true
                );
              } else if (this.triCheckBoxLabel == "All") {
                this.vehicleAttendanceList = this.attendanceListBackup;
              } else {
                this.vehicleAttendanceList = this.attendanceListBackup.filter(
                  (x) => x.TodaySwitch == false
                );
              }
              this.basicData = {
                labels: this.vehicleAttendanceList.map((x: any) => x.VehicleNo),
                datasets: [
                  {
                    label: "OrderAmount",
                    backgroundColor: "#FFA726",
                    data: this.vehicleAttendanceList.map(
                      (x: any) => x.OrderAmountDelivered
                    ),
                  },
                ],
              };
            } else if (
              this.orderTouchpointId != null &&
              this.orderTouchpointId.Id == 2
            ) {
              if (this.triCheckBoxLabel == "Present") {
                this.vehicleAttendanceList = this.attendanceListBackup.filter(
                  (x) => x.TodaySwitch == true
                );
              } else if (this.triCheckBoxLabel == "All") {
                this.vehicleAttendanceList = this.attendanceListBackup;
              } else {
                this.vehicleAttendanceList = this.attendanceListBackup.filter(
                  (x) => x.TodaySwitch == false
                );
              }
              this.basicData = {
                labels: this.vehicleAttendanceList.map((x: any) => x.VehicleNo),
                datasets: [
                  {
                    label: "TouchPoint",
                    backgroundColor: "#78909C",
                    data: this.vehicleAttendanceList.map(
                      (x: any) => x.TouchPointVisited
                    ),
                  },
                ],
              };
            } else if (
              this.orderTouchpointId != null &&
              this.orderTouchpointId.Id == 3
            ) {
              if (this.triCheckBoxLabel == "Present") {
                this.vehicleAttendanceList = this.attendanceListBackup.filter(
                  (x) => x.TodaySwitch == true
                );
              } else if (this.triCheckBoxLabel == "All") {
                this.vehicleAttendanceList = this.attendanceListBackup;
              } else {
                this.vehicleAttendanceList = this.attendanceListBackup.filter(
                  (x) => x.TodaySwitch == false
                );
              }
              this.basicData = {
                labels: this.vehicleAttendanceList.map((x: any) => x.VehicleNo),
                datasets: [
                  {
                    label: "KM",
                    backgroundColor: "#42A5F5",
                    data: this.vehicleAttendanceList.map(
                      (x: any) => x.UtiKMTillYesterday
                    ),
                  },
                ],
              };
            }
          });
        this.vehicleAttendanceList = this.vehicleAttendanceList.slice();
        this.triCheckBoxLabel = "All";
      } else {
        alert("select warehouse");
      }
    } else
      this.messageService.add({
        severity: "error",
        summary: "Error!",
        detail: " Select Date Range Greater than 90 days not allowed ",
      });
  }

  onLazyLoad(event) {
    console.log(event);
    // this.VehicleMasterId=VehicleMasterId
    if (event != null) {
      var Last = event.first ? event.first + event.rows : 10;
      this.skip = event.first;
      this.Take = event.rows;
      this.history(this.VehicleMasterId);
    } else {
      this.skip = 0;
      this.Take = 10;
      this.history(this.VehicleMasterId);
    }
  }

  history(VehicleMasterId) {
    this.display = true;
    this.historyList = [];
    this.isLoading = true;
    this.planMasterService
      .historyVechicleAttandanceList(VehicleMasterId, this.skip, this.Take)
      .subscribe((res: any) => {
        this.historyList = res.Data.historyAttandanceListDcs;
        console.log(this.historyList);

        this.totalcount = res.Data.TotalCount;
        this.isLoading = false;
      });
  }

  changeActiveStatus(IsToday, obj) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        if (IsToday) {
          //FOR DELETE OF TODAY CLICK
          if (!obj.TodaySwitch) {
            this.isLoading = true;
            this.planMasterService
              .deleteVechicleAttandance(
                obj.Today,
                this.userid,
                obj.VehicleMasterId
              )
              .subscribe((res: any) => {
                this.isLoading = false;
                if (res.Status == false) {
                  this.messageService.add({
                    severity: "error",
                    summary: "Error!",
                    detail: "You cannot delete this Attendance!!!",
                  });
                } else
                  this.messageService.add({
                    severity: "success",
                    summary: "Success!",
                    detail: " Attendance deleted !!!",
                  });
                this.getVehicleAttendanceList();
              });
          } else {
            const payload = {
              WarehouseId: this.warehouseId.value,
              IsTodayAttendance: IsToday,
              VehicleMasterId: obj.VehicleMasterId,
              UserId: this.userid,
            };

            this.isLoading = true;
            this.planMasterService
              .InsertVechicleAttandance(payload)
              .subscribe((result: any) => {
                console.log("res", result);
                this.isLoading = false;
                if (result.Status == true) {
                  // success message
                  this.getVehicleAttendanceList();
                  this.messageService.add({
                    severity: "success",

                    summary: "Success",
                    detail: "Status Updated Successfully!",
                  });
                } else {
                  // fail message
                  this.messageService.add({
                    severity: "Error",
                    summary: "Error",
                    detail: "You cannot Apply this Attandance!!!",
                  });
                  obj.TodaySwitch = false;
                }
              });
          }
        } // FOR ATTENDANCE OF TOMORROW NOW CALENDER IS PLACED INSTEAD
        else {
          this.isLoading = true;
          if (!obj.TomorrowSwitch) {
            this.planMasterService
              .deleteVechicleAttandance(
                obj.Tomorrow,
                this.userid,
                obj.VehicleMasterId
              )
              .subscribe((res: any) => {
                this.getVehicleAttendanceList();
                // this.blocked = false;
                this.isLoading = false;
                console.log("delete", res);
              });
          } else {
            let ischeck;
            if (obj.TomorrowSwitch) {
              ischeck = false;
            } else {
              ischeck = true;
            }
            const payload = {
              WarehouseId: this.warehouseId.value,
              IsTodayAttendance: IsToday,
              VehicleMasterId: obj.VehicleMasterId,
              UserId: this.userid,
            };
            this.isLoading = true;
            this.planMasterService
              .InsertVechicleAttandance(payload)
              .subscribe((result: any) => {
                this.getVehicleAttendanceList();
                // this.blocked = false;
                this.isLoading = false;
                console.log("res", result);

                if (result.Status) {
                  // success message

                  this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Status Updated Successfully!",
                  });
                } else {
                  // fail message
                  this.messageService.add({
                    severity: "error",
                    summary: "Error!",
                    detail: "",
                  });
                }
              });
          }
        }
      },
      reject: () => {
        if (IsToday) {
          if (obj.TodaySwitch) obj.TodaySwitch = false;
          else obj.TodaySwitch = true;
        }
        // else obj.TodaySwitch=true
        else {
          if (obj.TomorrowSwitch) obj.TomorrowSwitch = false;
          else obj.TomorrowSwitch = true;
        }
        this.messageService.add({
          severity: "error",
          summary: "Your Status is Cancelled!",
          detail: "",
        });
      },
    });
  }
  displayVehicleExport : boolean = false;
  exportPopup() {
    if (this.warehouseId != undefined) {
      this.exportWarehouseId = this.warehouseId.value;
      this.getVehicleNumberList();
    } else {
      this.exportWarehouseId = [];
    }
    // OPENING OF EXPORT POPUP
    this.displayExport = true;
  }
  exportVehicle() {
    debugger;
    if (this.warehouseId != undefined || this.WarehouseIds != undefined) {
      this.WarehouseIds = [];
      this.vechicleId = [];
      if(this.warehouseId != undefined)
      {
        this.WarehouseIds.push(this.warehouseId);
      }
      this.onChangeWarehouse(this.WarehouseIds);
    } else {
      this.WarehouseIds = [];
    }
    // OPENING OF EXPORT POPUP
    this.displayVehicleExport = true;
  }

  export() {
 
    if (
      !this.vechicleId ||
      this.vechicleId == undefined ||
      this.vechicleId.length == 0
    ) {
      alert("Select vehicle number!");
      return false;
    } else if (
      this.rangeDates == null ||
      this.rangeDates[0] == undefined ||
      this.rangeDates[1] == undefined
    ) {
      alert("Select date range!");
      return false;
    }

    if (this.exportWarehouseId && this.VehicleIdList && this.rangeDates) {
      this.VehicleIdList = [];
      this.vechicleId.forEach((obj: any) => {
        this.VehicleIdList.push(obj.Id);
      });

      const payload = {
        WarehouseId: this.exportWarehouseId,
        VehicleMasterId: this.VehicleIdList,
        StartDate: moment(this.rangeDates[0]).format("YYYY-MM-DD"),
        EndDate: moment(this.rangeDates[1]).format("YYYY-MM-DD"),
      };
      this.isLoading = true;
      this.planMasterService
        .exportVehicleAttandanceList(payload)
        .subscribe((res: any) => {
          window.open(environment.apiURL + res);
          this.isLoading = false;
        });
    } else {
      alert("Select all field to Export");
      // this.isLoading=false;
    }
  }

  exportTripVechicleList() {
   
    if (
      !this.vechicleId ||
      this.vechicleId == undefined ||
      this.vechicleId.length == 0
    ) {
      alert("Select vehicle number!");
      return false;
    } else if (
      this.rangeDates == null ||
      this.rangeDates[0] == undefined ||
      this.rangeDates[1] == undefined
    ) {
      alert("Select date range!");
      return false;
    }

    if (this.exportWarehouseId && this.VehicleIdList && this.rangeDates) {
      this.VehicleIdList = [];
      this.vechicleId.forEach((obj: any) => {
        this.VehicleIdList.push(obj.Id);
      });

      const payload = {
        WarehouseId: this.exportWarehouseId,
        VehicleMasterId: this.VehicleIdList,
        StartDate: moment(this.rangeDates[0]).format("YYYY-MM-DD"),
        EndDate: moment(this.rangeDates[1]).format("YYYY-MM-DD"),
      };
      this.isLoading = true;
      this.planMasterService
        .exportTripVechicleList(payload)
        .subscribe((res: any) => {
          window.open(environment.apiURL + res);
          this.isLoading = false;
        });
    } else {
      alert("Select all field to Export");
      // this.isLoading=false;
    }
  }

  export1() {
 
    if (
        !this.WarehouseIds ||
        this.WarehouseIds == undefined ||
        this.WarehouseIds.length == 0
    ) {
      alert("Select Warehouse!");
      return false;
    }else if (
        !this.vechicleId ||
        this.vechicleId == undefined ||
        this.vechicleId.length == 0
    ) {
      alert("Select vehicle number!");
      return false;
    } else if (
      this.rangeDates == null ||
      this.rangeDates[0] == undefined ||
      this.rangeDates[1] == undefined
    ) {
      alert("Select date range!");
      return false;
    }

    if (this.WarehouseIds && this.VehicleIdList && this.rangeDates) {

      if(this.WarehouseIds.length > 0)
      {
        this.WarehouseIdList = [];
        this.WarehouseIds.forEach((obj: any) => {
          this.WarehouseIdList.push(obj.value);
        });
      }
      if(this.vechicleId.length > 0)
      {
        this.VehicleIdList = [];
        this.vechicleId.forEach((obj: any) => {
          this.VehicleIdList.push(obj.Id);
        });
      }

      const payload = {
        WarehouseId: this.WarehouseIdList,
        VehicleMasterId: this.VehicleIdList,
        StartDate: moment(this.rangeDates[0]).format("YYYY-MM-DD"),
        EndDate: moment(this.rangeDates[1]).format("YYYY-MM-DD"),
      };

      this.planMasterService
        .getAllVehicleReportOfDate(payload)
        .subscribe((res) => {
          this.exportService.exportAsExcelFile(res, 'GetAllVehicleReportOfDate'); 
          this.isLoading = false;
          console.log("getAllVehicleReportOfDate : ", res);
        });
    } else {
      alert("Select all field to Export");
      // this.isLoading=false;
    }
  }

  reset() {
    this.vehicleAttendanceList = [];
    this.warehouseId = "";
    this.vechicleId = [];
    this.basicData = [];
  }
}

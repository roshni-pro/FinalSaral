import { Component, OnInit } from "@angular/core";
import { ExportServiceService } from "app/shared/services/export-service.service";
import { DeliveryCapacityOptimizationService } from "app/delivery-capacity-opti/Service/delivery-capacity-optimization.service";
import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { PlanMasterService } from "app/operation-capacity/services/plan-master.service";
import { VehicleMasterService } from "app/vehicle-master/services/vehicle-master.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "environments/environment";

@Component({
  selector: "app-delivery-capacity",
  templateUrl: "./delivery-capacity.component.html",
  styleUrls: ["./delivery-capacity.component.scss"],
})
export class DeliveryCapacityComponent implements OnInit {
  skip: any;
  Take: any;
  constructor(
    private deliveryCapacityservice: DeliveryCapacityOptimizationService,
    private exportservice: ExportServiceService,
    public datepipe: DatePipe,
    private planMasterService: PlanMasterService,
    private vehicleMasterService: VehicleMasterService,
    private messageService:MessageService

  ) {
    // this.yearsCalender = [{ year: 2023, code: 2023 }];
  }
  display: boolean = false;
  warehouseList: SelectItem[];
  selectedWareHouse: any;
  WareHName: any;
  ODCount: any[] = [];
  selectDate: any;
  selectedYear: any[] = [];
  blocked: boolean;
  Months: any[] = [];
  yearsCalender: any[] = [];
  firstDay: any;
  lastDay: any;
  StartDate: any;
  EndDate: any;
  firstDateExportMonth: any;
  firstDateExport: any;
  currentMonth: any;
  ExportPreviousMonthData: any;
  yearID: number;
  recentYear: number = new Date().getFullYear();
  extraVehicleCapacityInKg: any;
  extraVehicleCount: any;
  todayDate: any = new Date();
  basicData: any;
  thresholdkgList: any;
  selectedRow: any;
  ngOnInit() {
    this.getMonths();
    this.setyear();
    this.getWareHouseList();
    this.getThresholdkgList();
    this.selectedYear=this.yearsCalender[0];

    this.selectDate=this.Months[new Date().getMonth()];
  }

  onLazyLoad(event) {
    if (event != null) {
      var Last = event.first ? event.first + event.rows : 10;
      this.skip = event.first;
      this.Take = event.rows;
      this.getWarehouseUtilizationList();
    } else {
      this.skip = 0;
      this.Take = 10;
      this.getWarehouseUtilizationList();
    }
  }

  onSelect(selectedRow) {


    // let Date = selectedRow.ETADate.split("T");
    // console.log(Date[0], moment(this.todayDate).format('YYYY-MM-DD'));
    // let ETADate = Date[0].split("-"); // ETADate[0] - year, ETADate[1] - month, ETADate[3] - date
    // let TodaysDate = moment(this.todayDate).format('YYYY-MM-DD').split("-"); // TodaysDate[0] - year, TodaysDate[1] - month, TodaysDate[3] - date 

    // if (parseInt(ETADate[0]) >= parseInt(TodaysDate[0])) {
    //   if (parseInt(ETADate[1]) >= parseInt(TodaysDate[1])) {
    //     if (parseInt(ETADate[2]) > parseInt(TodaysDate[2])) {
    //       this.selectedRow = selectedRow;
    //       this.display = true;
    //     }
    //   }
    // }

    this.selectedRow = selectedRow;
    this.display = true;
  }
  getThresholdkgList() {
    this.vehicleMasterService.GetThresholdkgList().subscribe((res) => {
      this.thresholdkgList = res;
      console.log(res);
    });
  }
  getGraphData() {
    if (this.ODCount.length > 0) {
      this.basicData = {
        labels: this.ODCount.map((x: any) =>
          this.datepipe.transform(x.ETADate, "yyyy-MM-dd")
        ),
        datasets: [
       
          {
            label: "Demand Order Count",
            fill: false,

            borderColor: "#42A5F5",
            data: this.ODCount.map((x: any) => x.DemandOrderCount+x.CumulativePendingCount),
          },
          {
            label: "Planned Threshold Count",
            fill: false,
            borderColor:"#FFA726" ,
            data: this.ODCount.map((x: any) => x.PlannedThresholdOrderCount),
          },
          {
            label: "Executed Order Count",
            fill: false,
            borderColor: "grey",
            data: this.ODCount.map((x: any) => x.ExecutedOrderCount),
          },
          {
            label: "Delivered Order Count",
            fill: false,
            borderColor: "#66BB6A",
            data: this.ODCount.map((x: any) => x.DeliveredOrderCount),
          },
          {
            label: "Demand Excluding Red Orders",
            fill: false,
            borderColor: "#FF6384",
            data: this.ODCount.map((x: any) => ((x.DemandOrderCount+x.CumulativePendingCount) - x.RedOrderCount)),
          },
        ],
      };
    }
  }

  setyear() {
    for (var i = 0; i < 5; i++) {
      var obj = { year: this.recentYear+i, code: this.recentYear+i };
      this.yearsCalender.push(obj);
    }
    console.log(this.yearsCalender);
  }
  getMonths() {
    this.Months = [
      { name: "Jan", code: "01" },
      { name: "Feb", code: "02" },
      { name: "March", code: "03" },
      { name: "April", code: "04" },
      { name: "May", code: "05" },
      { name: "June", code: "06" },
      { name: "July", code: "07" },
      { name: "Aug", code: "08" },
      { name: "Sep", code: "09" },
      { name: "Oct", code: "10" },
      { name: "Nov", code: "11" },
      { name: "Dec", code: "12" },
    ];
  }

  // getWarehouse() {
  //   this.deliveryCapacityservice.GetWareHouse().subscribe((WareRes) => {
  //     this.WareHouseList = WareRes;
  //     console.log(WareRes);

  //   });
  // }
  warehouseids : any;
  getWareHouseList() {
    this.blocked = true;
    this.planMasterService.getWarehouseList().subscribe((res) => {
      //debugger;
      this.warehouseList = res;
      // var widIds = localStorage.getItem('warehouseids');
      //   this.warehouseids = widIds.split(',').map(Number);
      // let selectedWids = [];
      // // debugger;
      // this.warehouseids.forEach(element => {
      //   let existWid = res.find(x=>x.value == element);
      //   if(existWid != null)
      //   {
      //     selectedWids.push(existWid);
      //   }
      // });
      // this.warehouseList = selectedWids;
      this.blocked = false;
      console.log("warehouseList:", this.warehouseList);
    });
  }

  getWarehouseUtilizationList() {
    if (
      this.selectedWareHouse == undefined ||
      this.selectedWareHouse.length == 0
    ) {
      alert("please select warehouse");
    } else if (
      this.selectedYear == undefined ||
      this.selectedYear.length == 0
    ) {
      alert("Select Year");
    } else if (this.selectDate == undefined) {
      alert("Select Month");
    }
    if (this.selectedWareHouse != undefined && this.selectDate != undefined) {
      this.yearID = this.selectedYear["code"];

      // this.year = new Date().getFullYear();
      if (
        this.selectDate != undefined &&
        this.selectedYear != undefined &&
        this.selectedWareHouse != undefined
      ) {
        this.firstDay = new Date(this.yearID, this.selectDate.code - 1);
        this.lastDay = new Date(this.yearID, this.selectDate.code, +1);
        console.log("lastDay", this.lastDay);

        if (this.firstDay == null && this.lastDay == null) {
          alert("Please Select Month");
        }
        this.StartDate = this.datepipe.transform(this.firstDay, "yyyy-MM-dd");
        this.EndDate = this.datepipe.transform(this.lastDay, "yyyy-MM-dd");
        if (this.StartDate != null && this.EndDate != null) {
          const payload = {
            warehouseId: this.selectedWareHouse.value,
            StartDate: this.StartDate,
            EndDate: this.EndDate,
          };
          this.blocked = true;
          this.deliveryCapacityservice

            .GetWarehouseUtilizationList(payload)
            .subscribe((res) => {
              if (res.length == 0) {
                alert("No Data Found");
                this.blocked = false;
                this.ODCount = [];
              } else {
                this.ODCount = res;

                this.ODCount.forEach((element: any) => {
                  let Date = element.ETADate.split("T");
                  // console.log(Date[0], moment(this.todayDate).format('YYYY-MM-DD'));
                  let ETADate = Date[0].split("-"); // ETADate[0] - year, ETADate[1] - month, ETADate[3] - date
                  let TodaysDate = moment(this.todayDate).format('YYYY-MM-DD').split("-"); // TodaysDate[0] - year, TodaysDate[1] - month, TodaysDate[3] - date 

                  if (parseInt(ETADate[0]) >= parseInt(TodaysDate[0])) {
                    if (parseInt(ETADate[1]) >= parseInt(TodaysDate[1])) {
                      if (parseInt(ETADate[2]) > parseInt(TodaysDate[2])) {
                        element.isEditable = true;
                      } else {
                        element.isEditable = false;
                      }
                    } else {
                      element.isEditable = false;
                    }
                  } else {
                    element.isEditable = false;
                  }
                });

                let i=0;
                this.ODCount.forEach((element: any) => {
                  element.status = 'W';
                  element.status = element.PlannedThresholdOrderCount - (element.CumulativePendingCount + element.DemandOrderCount) >= 0 ? 'W' : 'R';
                  if (element.isEditable) {
                    element.PerviusSettledOrderCount = 0;
                    element.ExtraOrdersD1 = 0;
                    element.ExtraOrdersD2 = 0;
                    var extraDemand =  (element.CumulativePendingCount + element.DemandOrderCount) -  element.PlannedThresholdOrderCount ;
                    
                    if (extraDemand > 0) {
                      if (i > 0) {
                        let extraOrdersD1 =  this.ODCount[i - 1].PlannedThresholdOrderCount - (this.ODCount[i - 1].CumulativePendingCount + this.ODCount[i - 1].DemandOrderCount);      
                        element.ExtraOrdersD1 = extraOrdersD1> 0? extraOrdersD1:0;
                        element.ExtraOrdersD1  = element.ExtraOrdersD1 <= element. CumulativePendingETACount?  element.ExtraOrdersD1:element. CumulativePendingETACount;
                      } 
                      if (i > 1) {
                        let extraOrdersD2 =  this.ODCount[i - 2].PlannedThresholdOrderCount - (this.ODCount[i - 2].CumulativePendingCount + this.ODCount[i - 2].DemandOrderCount);      
                        element.ExtraOrdersD2 = extraOrdersD2> 0? extraOrdersD2:0;
                        element.ExtraOrdersD2  = element.ExtraOrdersD2 <= element. CumulativePendingETACount?  element.ExtraOrdersD2:element. CumulativePendingETACount;
                      }
                      if(element.ExtraOrdersD1 + element.ExtraOrdersD2 >= extraDemand){
                        // element.ExtraOrdersD1  = element.ExtraOrdersD1 <= element. CumulativePendingETACount?  element.ExtraOrdersD1:element. CumulativePendingETACount;
                        element.status = "Y";
                      }else{
                        element.status = "R";
                      }
                    }
                  }

                  i++;
                  // if (element.isEditable && i >= 1 &&
                  //   ((this.ODCount[i - 1].PlannedThresholdOrderCount - (this.ODCount[i - 1].CumulativePendingCount + this.ODCount[i - 1].DemandOrderCount)) > 0) &&
                  //   ((this.ODCount[i - 2].PlannedThresholdOrderCount - (this.ODCount[i - 2].CumulativePendingCount + this.ODCount[i - 2].DemandOrderCount)) > 0)) {
                  //   element.status = 'Y'
                  // } else {
                  //   element.status = "R"
                  // }
                });
                this.blocked = false;
                console.log(res);
                this.getGraphData();
              }
            },
            (err) => {
              this.ODCount = [];
              alert("No Data Found")
              this.blocked = false;
            }            );
        }
      }
    }
  }


  extraVehiclePopUp() {
    debugger
    const payload = {
      WarehouseId: this.selectedWareHouse.value,
      ETADate: this.selectedRow.ETADate,
      ExtraVehicleCount: this.extraVehicleCount,
      ExtraVehicleCapacityInKg: this.extraVehicleCapacityInKg.ThresholdLoadInKg,
    };
    this.deliveryCapacityservice
      .extraVehicleRequired(payload)
      .subscribe((res: any) => {
        console.log(res);
        if (res.Status == true)
          // this.toasterService.success("Data Updated Successfully");

          this.messageService.add({
            severity: "success",
            summary: "Success!",
            detail: " Vehicle Updated Successfully  ",


          });
          this.display = false
          this.getWarehouseUtilizationList();
      
      });
    this.extraVehicleCount = '';
    this.extraVehicleCapacityInKg = [];

  }

  exportWarehouseUtilizationList() {
    if (
      this.selectedWareHouse == undefined ||
      this.selectedWareHouse.length == 0
    ) {
      alert("Please Select WareHouse");
    } else if (this.selectedYear == undefined) {
      alert("Select Year");
    } else if (this.selectDate == undefined) {
      alert("Select Month");
    } else if (this.ODCount.length == 0) {
      alert("Please Search Data");
    }
    if (
      this.selectedWareHouse != undefined &&
      this.selectedYear != undefined &&
      this.selectDate != undefined &&
      this.ODCount.length != 0
    ) {
      this.yearID = this.selectedYear["code"];

      {
        if (this.StartDate != null && this.EndDate != null) {
          const payload = {
            warehouseId: this.selectedWareHouse.value,
            StartDate: this.StartDate,
            EndDate: this.EndDate,
            // Year: this.yearID,
          };
          this.blocked = true;
          if (this.firstDateExportMonth == this.currentMonth) {
            this.deliveryCapacityservice

              .ExportWarehouseUtilizationList(payload)
              .subscribe((res) => {
                console.log("xport", res);

                window.open(environment.apiURL + res);
                // var exportData = [];
                // for (var i = 0; i < res.length; i++) {
                //   var json = {
                //     WarehouseName: this.selectedWareHouse.label,
                //     WarehouseId: this.selectedWareHouse.value,
                //     DeliveryDate: res[i].DeliveryDate,
                //     OrderedCount: res[i].OrderedCount,
                //     DeliveredPercentage: res[i].DeliveredPercentage + "%",
                //     CommulativePendingCount: res[i].CumulativePendingCount,
                //     ETADelayDate: moment(res[i].ETADelayDate).format('YYYY-MM-DD'),
                //     ThresholdTouchPoint: res[i].ThresholdTouchPoint,
                //     ThresholdOrderAmount: res[i].ThresholdOrderAmount,
                //     OrderAmountUtilization: res[i].OrderAmountUtilization,

                //     OverallUtilPercentage: res[i].OverallUtilPercentage,

                //     VehicleCountAvailable: res[i].VehicleCountAvailable,

                //     ExtraVehicleCount: res[i].ExtraVehicleCount,
                //   };
                //   exportData.push(json);
                // }
                // this.exportservice.exportAsExcelFile(
                //   exportData,
                //   " Collection Data"
                // );
                this.blocked = false;
              });
          } else {
            this.deliveryCapacityservice

              .exportPreviousMonthData(
                this.selectedWareHouse.WarehouseId,
                this.StartDate,
                this.EndDate
              )
              .subscribe((res) => {
                if (res != null) {
                  this.ExportPreviousMonthData = res;
                  this.exportservice.exportAsExcelFile(
                    this.ExportPreviousMonthData,
                    "Collection Data"
                  );
                }
              });
          }
        }
      }
    }
  }
  cancel() {
    this.display = false;
  }
  clearF() {
    this.selectedWareHouse = [];
    this.selectDate = null;
    this.ODCount = [];
    this.selectedYear = [];
  }
}

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PlanMasterService } from "app/operation-capacity/services/plan-master.service";
import { ItemClassificationIncentiveReportService } from "app/sales-app-backend-pages/Services/item-classification-incentive-report.service";
import { CustomerService } from "app/shared/services/customer.service";
import { ExportServiceService } from "app/shared/services/export-service.service";
import { WarehouseService } from "app/shared/services/warehouse.service";
import * as XLSX from "xlsx";

@Component({
  selector: "app-warehouse-quadrants",
  templateUrl: "./warehouse-quadrants.component.html",
  styleUrls: ["./warehouse-quadrants.component.scss"],
})
export class WarehouseQuadrantsComponent implements OnInit {
  warehouseObj: any;
  warehouseList: any;
  CityList: any;
  selectedCity: any;
  wareList: any;
  files: any;
  exportData:any;
  first: any = 0;
  warehouseId: any;
  // @ViewChild('uploadCustom') fileUpload: any;
  @ViewChild('uploadCustom', { static: true }) myInputVariable: ElementRef;


  constructor(
    private customerService: CustomerService,
    private itemclassificationservice: ItemClassificationIncentiveReportService,
    private exportService: ExportServiceService,
    private planMasterService: PlanMasterService
  ) {}

  ngOnInit() {
    this.getWareHouseList();
  }

  getWareHouseList() {
    // this.blocked = true;
    this.planMasterService.getWarehouseList().subscribe(
      (res) => {
        // debugger;
        if (res.length > 0) {
          // let obj={
          //   label : "All",
          //   value : 0
          // }
          // res.unshift(obj);
          this.warehouseList = res;
        }
        // this.blocked = false;ss
        console.log("warehouseList:", this.warehouseList);
      },
      (error: any) => {
        console.log("", error);
      }
    );
  }

  DownLoadSampleFile() {
    let arr = [];
    arr.push({
      ItemMultiMRPId: null,
      // 'WarehouseId':null,
      ISSensitive: null,
    });
    this.exportService.exportAsExcelFile(arr, "SampleFile Warehousequadrant");
  }


  onUpload(event, localUrl) {
    debugger;
    console.log(event, "event");
    console.log(localUrl, "localUrl");

    this.files = event.files[0];
    console.log(this.files);

    let file = new FormData();
    file.append("file", this.files);
    debugger;
    this.itemclassificationservice
      .UploadItem(this.warehouseId.value, file)
      .subscribe(
        (res: any) => {
          console.log(res, "uploader");
          alert(res);
          // event.files = null
        },

        (err) => {
          // this.visible1 = false;
          alert(err);

          console.log(err);
        }
      );
    event.files[0] = null;
  }
  // uploadFile(file) {

  //   console.log(file.files[0])
  //   this.files=file.files[0]
  //   file.append("file", this.files);
  //   debugger
  //       this.itemclassificationservice.UploadItem(this.warehouseId.value,file)
  //         .subscribe(
  //           (res: any) => {
  //             console.log(res, "uploader");
  //               alert(res);
  //              // event.files = null
  //           },

  //           (err) => {
  //             // this.visible1 = false;
  //             alert(err);

  //             console.log(err);
  //           }
  //         );
  //       event.files[0] = null;
  //   }
  refresh() {
    debugger;
    // this.myInputVariable.clear();
    this.myInputVariable.nativeElement.value = "";

  }

  Export() {

    
    this.itemclassificationservice.ExportExcel(this.warehouseId.value).subscribe(
      (res: any) => {
        this.exportData=res[0]
        console.log(res, "exportdata");
        alert("file downloaded");
        this.exportService.exportAsExcelFile(res, "Warehouse-quadrants");
      })
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CityService } from "app/shared/services/city.service";
import { CustomerService } from "app/shared/services/customer.service";
import { ExportServiceService } from "app/shared/services/export-service.service";
import { VehicleMasterService } from "app/vehicle-master/services/vehicle-master.service";
import { log } from "console";
import { environment } from "environments/environment";
import { data, event } from "jquery";
import * as moment from "moment";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/components/common/messageservice";
import { element } from "protractor";

@Component({
  selector: "app-vehicle-master-list-page",
  templateUrl: "./vehicle-master-list-page.component.html",
  styleUrls: ["./vehicle-master-list-page.component.scss"],
})
export class VehicleMasterListPageComponent implements OnInit {
  vehicleMasterList: any;
  isOpen: boolean = false;
  selectedRowDetails: any;
  selectedRow: any;
  baseURL: any;
  skip: any;
  take: any;
  totalRecords: number;
  searchModel: any;
  blocked: boolean;
  cityList: any;
  masterwarehouseList: any;
  warehouseids: any;
  FromDate: any = null;
  ToDate: any = null;
  search: string = "";
  searchdata: number = 0;
  WarehouseId: number = 0;
  Cityid: number = 0;
  constructor(
    private vehicleMasterService: VehicleMasterService,
    private router: Router,
    private exportService: ExportServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cityService: CityService,
    private customerService: CustomerService
  ) {
    this.baseURL = environment.apiURL;
    this.searchModel = {};
  }

  async ngOnInit() {
    debugger
    if (localStorage.getItem("VMWarehouse") && localStorage.getItem("VMCity")  != null) {
      this.cityList = await this.cityService.getCommonCity().toPromise();

      debugger;

      this.FromDate = localStorage.getItem("VMFromDate")?localStorage.getItem("VMFromDate"):null;
      this.ToDate = localStorage.getItem("VMToDate")?localStorage.getItem("VMToDate"):null;
      this.searchdata = JSON.parse(localStorage.getItem("VMVehicleStatus"));
      this.search = localStorage.getItem("VMVehicleType");
      this.Cityid = JSON.parse(localStorage.getItem("VMCity"));
      this.WarehouseId = JSON.parse(localStorage.getItem("VMWarehouse"));
    
    
      this.masterwarehouseList = await this.customerService
        .getWareHouseByCityNew(this.Cityid)
        .toPromise();

      console.log("masterwarehouseList", this.masterwarehouseList);

      // this.searchModel.Cityid = { value:this.Cityid};
      this.searchModel.Cityid = this.cityList.find(
        (x: any) => x.value == this.Cityid
      );
      this.searchModel.WarehouseId = this.masterwarehouseList.find(
        (x: any) => x.value == this.WarehouseId
      );
      // console.log("this.searchModel.WarehouseId", this.searchModel.WarehouseId);
      this.searchModel.searchall = this.search;

      this.searchModel.statusValue=this.searchdata;
      console.log("this.searchModel.statusValue",this.searchModel.statusValue);

      this.searchModel.FromDate = this.FromDate? new Date(this.FromDate):null;
      this.searchModel.ToDate = this.ToDate? new Date(this.ToDate):null;
      

     localStorage.removeItem("VMFromDate");
       localStorage.removeItem("VMToDate");
     (localStorage.removeItem("VMVehicleStatus"));
     localStorage.removeItem("VMVehicleType");
       (localStorage.removeItem("VMCity"));
     (localStorage.removeItem("VMWarehouse"));
    } 
    else
    this.searchModel.Cityid = null;
    //this.searchModel.WarehouseId = null;
    // this.searchModel.statusValue = 0;
    this.cityService.getCommonCity().subscribe((result) => {
      this.cityList = result;

      console.log("hello", this.cityList);
    });
  }

  async load(event) {
    debugger;
    if (localStorage.getItem("VMWarehouse") && localStorage.getItem("VMCity") != null)
   {
      this.blocked = true;
      var Last = event.first ? event.first + event.rows : 10;
      this.skip = Last / event.rows;
      this.take = event.rows;

      this.vehicleMasterService
        .getData(

          localStorage.getItem("VMFromDate"),
          localStorage.getItem("VMToDate"),
          localStorage.getItem("VMVehicleType"),
          JSON.parse(localStorage.getItem("VMVehicleStatus")),
          JSON.parse(localStorage.getItem("VMWarehouse")),
          JSON.parse(localStorage.getItem("VMCity")),
          this.skip,
          this.take
        )
        .subscribe((x) => {
          this.vehicleMasterList = x.VehicleMasterExportDCList;
          this.totalRecords = x.totalCount;
          this.blocked = false;
        });
      }

       else if (this.WarehouseId > 0) 
         {
        this.blocked = true;
        var Last = event.first ? event.first + event.rows : 10;
        this.skip = Last / event.rows;
        this.take = event.rows;

        this.vehicleMasterService
          .getData(
            this.FromDate,
            this.ToDate,
            this.search,
            this.searchdata,
            this.WarehouseId,
            this.Cityid,
            this.skip,
            this.take
          )
          .subscribe((x) => {
            this.vehicleMasterList = x.VehicleMasterExportDCList;
            console.log("this.vehicleMasterList",this.vehicleMasterList);
            
            this.totalRecords = x.totalCount;
            this.blocked = false;
          });
      }
  }
  getWarehouse(cityid) {
    // debugger;
    this.customerService.getWareHouseByCityNew(cityid).subscribe((x) => {
      this.masterwarehouseList = x;
      // let selectedWids = [];
      // this.warehouseids.forEach(element => {
      //   let existWid = x.find(x=>x.WareHouseId == element);
      //   if(existWid != null)
      //   {
      //     selectedWids.push(existWid);
      //   }
      // });
      // this.masterwarehouseList = selectedWids;
    });
  }
  getRecord() {
    debugger;
  }
  openRowDetails(rowData) {
    if(this.FromDate!=null)
    {
    localStorage.setItem("VMFromDate", this.FromDate);
    }
    if(this.ToDate!=null){
    localStorage.setItem("VMToDate", this.ToDate);
    }
    localStorage.setItem("VMVehicleType", this.search);
    localStorage.setItem("VMVehicleStatus", JSON.stringify(this.searchdata));
    localStorage.setItem("VMCity", JSON.stringify(this.Cityid));
    localStorage.setItem("VMWarehouse", JSON.stringify(this.WarehouseId));

    this.router.navigateByUrl(
      "layout/operation-capacity/edit-vehicle/" + rowData.Id
    );
  }
  addvehicle() {
    this.router.navigateByUrl("layout/operation-capacity/vehicle");
  }

  openDetails(d, e) {
    debugger;
    this.selectedRowDetails = d;
    this.selectedRow = e;
    if (this.selectedRow.path) {
      this.selectedRow.path[1].className =
        "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow, "ggg");
    this.isOpen = true;
    // this.postActivity.Id=d.Id;
  }

  Search(DataSelect) {
    if (DataSelect && DataSelect.WarehouseId.value > 0) {
      this.blocked = true;
      this.FromDate = this.searchModel.FromDate
        ? moment(this.searchModel.FromDate).format("YYYY-MM-DD")
        : null;
      this.ToDate = this.searchModel.ToDate
        ? moment(this.searchModel.ToDate).format("YYYY-MM-DD")
        : null;
      // if (DataSelect.WarehouseId == undefined) {
      //   this.messageService.add({ severity: 'error', summary: 'Please Select Warehoues!!', detail: '' });
      //   this.blocked = false;
      //   return;
      // }
      this.search =
        DataSelect && DataSelect.searchall ? DataSelect.searchall : "";
      this.searchdata = DataSelect.statusValue ? DataSelect.statusValue : 0;
      this.WarehouseId = DataSelect.WarehouseId
        ? DataSelect.WarehouseId.value
        : 0;
      this.Cityid = DataSelect.Cityid ? DataSelect.Cityid.value : 0;
      // var Last=  10;
      this.skip = 1;
      this.take = 10;
      this.totalRecords = null;
      if (
        this.Cityid &&
        (this.WarehouseId == 0 || this.WarehouseId == undefined)
      ) {
        alert("Please select warehouse first");
        this.blocked = false;
      }
      if (
        this.search ||
        (this.Cityid && this.WarehouseId) ||
        (this.Cityid && this.WarehouseId && this.searchdata) ||
        this.searchdata > 0
      ) {
        this.vehicleMasterService
          .getData(
            this.FromDate,
            this.ToDate,
            this.search,
            this.searchdata,
            this.WarehouseId,
            this.Cityid,
            this.skip,
            this.take
          )
          .subscribe((x) => {
            this.vehicleMasterList = x.VehicleMasterExportDCList;
            this.totalRecords = x.totalCount;
            this.blocked = false;
          });
      }
    } else {
      alert("Please Select Warehouse First!");
    }
  }
  export() {
    this.blocked = true;
    if (this.vehicleMasterList == undefined && this.vehicleMasterList == null) {
      this.messageService.add({
        severity: "error",
        summary: "No data found!!",
        detail: "",
      });
      this.blocked = false;
      return;
    }
    this.exportService.exportAsExcelFile(
      this.vehicleMasterList,
      "ExportvehicleMasterList"
    );
    this.blocked = false;
  }
  clear() {
    // this.searchModel={};
    // this.searchModel.Cityid="";
    // this.searchModel.WarehouseId=0;
    // this.searchModel.statusValue=0;
    // this.masterwarehouseList=null
    // this.totalRecords=null;
    // this.vehicleMasterList=null
    // this.refresh();
    window.location.reload();
  }
  refresh() {
    this.vehicleMasterService
      .getData(
        this.FromDate,
        this.ToDate,
        this.search,
        this.searchdata,
        this.WarehouseId,
        this.Cityid,
        this.skip,
        this.take
      )
      .subscribe((x) => {
        this.vehicleMasterList = x.VehicleMasterExportDCList;
        this.totalRecords = x.totalCount;
        this.blocked = false;
      });
  }
  ActiveInactive(d, bool) {
    this.blocked = true;
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        this.vehicleMasterService.postactivety(d.Id, bool).subscribe((res) => {
          console.log(res, "res");
          this.blocked = false;
        });
      },
    });
    this.blocked = false;
  }
  isBlocked(b, bool) {
    debugger;
    this.blocked = true;
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        debugger;
        this.vehicleMasterService.postIsBlocked(b.Id, bool).subscribe((res) => {
          console.log(res, "res");
          this.blocked = false;
        });
      },
    });
    this.blocked = false;
  }
}

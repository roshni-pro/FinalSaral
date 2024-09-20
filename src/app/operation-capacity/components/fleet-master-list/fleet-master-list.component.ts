import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FleetMasterService } from "app/fleet-master/services/fleet-master.service";
import { CityService } from "app/shared/services/city.service";
import { CustomerService } from "app/shared/services/customer.service";
import { ExportServiceService } from "app/shared/services/export-service.service";
import * as moment from "moment";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: "app-fleet-master-list",
  templateUrl: "./fleet-master-list.component.html",
  styleUrls: ["./fleet-master-list.component.scss"],
})
export class FleetMasterListComponent implements OnInit {
  skip: any;
  take: any;
  fleetMasterList: any;
  totalRecords: number;
  searchModel;
  any;
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
    private fleetMasterService: FleetMasterService,
    private router: Router,
    private exportService: ExportServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cityService: CityService,
    private customerService: CustomerService
  ) {
    this.searchModel = {};
  }

  async ngOnInit() {
    debugger
    if (localStorage.getItem("FMCity") != null) {
      this.cityList = await this.cityService.getAllCityNew().toPromise();

      this.Cityid = JSON.parse(localStorage.getItem("FMCity"));
      this.search = localStorage.getItem("FMSearch")?localStorage.getItem("FMSearch"):undefined; 
      this.searchdata = JSON.parse(localStorage.getItem("FMVehicleStatus"));
      this.FromDate = localStorage.getItem("FMFromDate")?localStorage.getItem("FMFromDate"):null;
      this.ToDate = localStorage.getItem("FMToDate")?localStorage.getItem("FMToDate"):null;

     
      this.searchModel.Cityid = this.cityList.find(
        (x: any) => x.value == this.Cityid
      );
      console.log("this.searchModel.Cityid",this.searchModel.Cityid);
      this.searchModel.statusValue=this.searchdata;
      this.searchModel.searchall=this.search;
      this.searchModel.FromDate = this.FromDate? new Date(this.FromDate):null;
      this.searchModel.ToDate = this.ToDate? new Date(this.ToDate):null;


      localStorage.removeItem("FMCity");
      localStorage.removeItem("FMSearch");
      localStorage.removeItem("FMVehicleStatus");
      localStorage.removeItem("FMFromDate");
      localStorage.removeItem("FMToDate");
    }
    // this.searchModel.Cityid=[];
    else 
      this.searchModel.WarehouseId = 0;
    // this.searchModel.statusValue = 0;
    this.cityService.getAllCityNew().subscribe((result) => {
      this.cityList = result;
      // let cityids = [];
      // result.forEach(element => {
      //   cityids.push(element.Cityid)
      // });
      // this.cityService.GetWarehouse(cityids).subscribe(x=>{
      //   var widIds = localStorage.getItem('warehouseids');
      //   this.warehouseids = widIds.split(',').map(Number);
      //   let warehouseList = [];
      //   let filterCityList = [];
      //   x.forEach(el => {
      //     this.warehouseids.forEach(wid => {
      //       if(el.WarehouseId == wid)
      //       {
      //           if(filterCityList.length > 0)
      //           {
      //             var existCity = filterCityList.find(x=>x.Cityid == el.Cityid);
      //             if(existCity == null)
      //             {
      //               filterCityList.push(result.filter(x=>x.Cityid == el.Cityid)[0]);
      //             }
      //           }else{
      //             filterCityList.push(result.filter(x=>x.Cityid == el.Cityid)[0]);
      //           }
      //       }
      //     });
      //   });
      //   this.cityList = filterCityList;
      // })
    });
  }
  async load(event) {
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;
    // this.fleetMasterService.getFleetMasterList(this.skip,this.take).subscribe(x=>
    //   {
    //     this.blocked=false;
    //     this.totalRecords = x.data.totalcount;
    //     this.fleetMasterList = x.data.FleetMasterList;
    //   })
    if (localStorage.getItem("FMCity") != null) {
      debugger
      this.blocked = true;
      await this.fleetMasterService
        .getData(
          localStorage.getItem("FMFromDate"),
          localStorage.getItem("FMToDate"),
          localStorage.getItem("FMSearch")?localStorage.getItem("FMSearch"):undefined,
          JSON.parse(localStorage.getItem("FMVehicleStatus")),
          JSON.parse(localStorage.getItem("FMCity")),
          this.skip,
          this.take
        )
        .subscribe((x) => {
          this.blocked = false;
          this.fleetMasterList = x.FleetMasterDCList;
          this.totalRecords = x.totalcount;
        });
      
    } 
    else if (this.Cityid && this.Cityid > 0) {
      this.blocked = true;
      this.fleetMasterService
        .getData(
          this.FromDate,
          this.ToDate,
          this.search,
          this.searchdata,
          this.Cityid,
          this.skip,
          this.take
        )
        .subscribe((x) => {
          this.blocked = false;
          this.fleetMasterList = x.FleetMasterDCList;
          this.totalRecords = x.totalcount;
        });
    } 
    else {
      // alert('Select City First!'); 
    }
  }
  getWarehouse(cityid) {
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
  openDetails(rowData) {
    if (this.FromDate != null) {
      localStorage.setItem("FMFromDate", this.FromDate);
    }
    if (this.ToDate != null) {
      localStorage.setItem("FMToDate", this.ToDate);
    }
    if(this.search!=null){
    localStorage.setItem("FMSearch", this.search);
    }
    if(this.searchdata!=null){
    localStorage.setItem("FMVehicleStatus", JSON.stringify(this.searchdata));
    }
    if(this.Cityid!=null){
    localStorage.setItem("FMCity", JSON.stringify(this.Cityid));
    }
    // localStorage.setItem("FMWarehouse", JSON.stringify(this.WarehouseId))
    this.router.navigateByUrl(
      "layout/operation-capacity/edit-fleet/" + rowData.Id
    );
  }
  addFleetmaster() {
    this.router.navigateByUrl("layout/operation-capacity/fleet");
  }
  Search(DataSelect) {
    debugger;
    if (DataSelect && (DataSelect.Cityid !=undefined || (localStorage.getItem("FMCity") != null))) {
      this.blocked = true;
      // if(DataSelect.WarehouseId==undefined){
      //   this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse!!', detail: '' });
      //   this.blocked=false;
      // }
      // var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
      // var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
      // var search=DataSelect.searchall;
      // var searchdata=DataSelect.statusValue==undefined?0:DataSelect.statusValue;
      // var Cityid = DataSelect.Cityid == "" ? 0 : DataSelect.Cityid;
      this.FromDate = this.searchModel.FromDate
        ? moment(this.searchModel.FromDate).format("YYYY-MM-DD")
        : null;
      this.ToDate = this.searchModel.ToDate
        ? moment(this.searchModel.ToDate).format("YYYY-MM-DD")
        : null;
      this.search = DataSelect.searchall;
      this.searchdata = DataSelect.statusValue ? DataSelect.statusValue : 0;
      this.WarehouseId = DataSelect.WarehouseId ? DataSelect.WarehouseId : 0;
      this.Cityid = DataSelect.Cityid ? DataSelect.Cityid.value : 0;
      this.fleetMasterService
        .getData(
          this.FromDate,
          this.ToDate,
          this.search,
          this.searchdata,
          this.Cityid,
          this.skip,
          this.take
        )
        .subscribe((x) => {
          this.totalRecords = 0;

          this.fleetMasterList = x.FleetMasterDCList;
          this.totalRecords = x.totalcount;
          this.blocked = false;
        });
    } else {
      alert("Please Select City First!");
    }
  }
  export() {
    this.blocked = true;
    if (this.fleetMasterList == undefined && this.fleetMasterList == null) {
      this.messageService.add({
        severity: "error",
        summary: "No data found!!",
        detail: "",
      });
      this.blocked = false;
      return;
    }
    this.exportService.exportAsExcelFile(
      this.fleetMasterList,
      "ExportFleetMasterList"
    );
    this.blocked = false;
  }
  clear() {
    // this.searchModel={};
    // this.searchModel.Cityid="";
    // this.searchModel.WarehouseId=0;
    // this.searchModel.statusValue=0;
    // this.totalRecords=null;
    // this.refresh();
    window.location.reload();
  }
  refresh() {
    this.blocked = true;
    this.fleetMasterService
      .getData(
        this.FromDate,
        this.ToDate,
        this.search,
        this.searchdata,
        this.Cityid,
        this.skip,
        this.take
      )
      .subscribe((x) => {
        this.blocked = false;
        this.fleetMasterList = x.FleetMasterDCList;
        this.totalRecords = x.totalcount;
      });
  }

  ActiveInactive(d, bool) {
    this.blocked = true;
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        this.fleetMasterService.postactivety(d.Id, bool).subscribe((res) => {
          console.log(res, "res");
          this.blocked = false;
        });
      },
    });
    this.blocked = false;
  }
  isBlocked(e, bool) {
    this.blocked = true;
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        this.fleetMasterService.postIsBlocked(e.Id, bool).subscribe((res) => {
          console.log(res, "res");
          this.blocked = false;
        });
      },
    });
    this.blocked = false;
  }
}

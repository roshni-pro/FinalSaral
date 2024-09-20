import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { BuyerService } from 'app/shared/services/buyer.service';
import { DatePipe } from '@angular/common';
import { log } from 'console';
import { LoaderService } from 'app/shared/services/loader.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { dateToUtcArray } from '@fullcalendar/core/datelib/marker';

@Component({
  selector: 'app-detail-po-dashboard',
  templateUrl: './detail-po-dashboard.component.html',
  styleUrls: ['./detail-po-dashboard.component.scss']
})
export class DetailPoDashboardComponent implements OnInit {

  constructor(private warehouseService: WarehouseService,private datePipe: DatePipe,private exportService: ExportServiceService, private loaderService: LoaderService,
    private buyerservice: BuyerService, private podashboardserviceService: PodashboardserviceService) { }

  blocked: boolean;
  warehouseList: any;
  totalRecords:any;
  dashboarddata:any;
  dashboarddatas:any;
  filterdashboardsearch = {
    WarehouseId: null,
    StartDate: null,
    EndDate: null,
    SupplierId: null,
    BuyerId: 0,
    Poid:0,
    Skip:0,
    Take:10
  };
  sellerlist: any[];
  sellermaster = [];
  buyersList: any[];
  warehouseidslist = [];
  maxDate:Date;
  
  ngOnInit() {
    this.maxDate = new Date()
    this.initialize()
    this.getAllWarehouses();
    this.getAllSuppliers();
    this.getAllBuyers();
  }

  initialize() {
    this.filterdashboardsearch = {
      WarehouseId: null,
      StartDate: null,
      EndDate: null,
      SupplierId: null,
      BuyerId: 0,
      Poid:0,
      Skip:0,
      Take:10
    };
    
    this.getAllWarehouses()
  }
  skip:number=0;
  take:number=0;
  load(event){
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    this.GetPODashboardData()
    
  }

  getAllWarehouses() {
    this.blocked = true;
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.blocked = false;
        this.warehouseList = result;
        
        this.filterdashboardsearch.WarehouseId = result;
        // 
      });
  }

  getAllSuppliers() {

    this.blocked = true;

    // this.supplierservice.GetSupplierData()
    this.podashboardserviceService.getSuppliers()
      .subscribe(result => {
        this.blocked = false
        this.sellerlist = result;
        this.sellermaster = result;
      });
  }

  getAllBuyers() {
    this.blocked = true;

    this.buyerservice.getbuyer()
      .subscribe(result => {

        this.blocked = false
        this.buyersList = result;
      });
  }


  getSeLlerList(event) {
    debugger
    if (event.query.length > 2) {
      this.sellerlist = this.sellermaster.filter(x => x.Name.toString().toLowerCase().includes(event.query.toLowerCase()));
    }
  }

  setSeller(event) {
    this.filterdashboardsearch.SupplierId = event.SupplierId;
  }

  
  
  GetPODashboardData() {
    debugger
    
     console.log(this.filterdashboardsearch.Poid);
    // this.filterdashboardsearch.StartDate = this.filterdashboardsearch.StartDate ? moment(this.filterdashboardsearch.StartDate).format('DD/MM/YYYY') : null
    // this.filterdashboardsearch.EndDate = this.filterdashboardsearch.EndDate ? moment(this.filterdashboardsearch.EndDate).format('DD/MM/YYYY') : null
    
    var tab1 = moment(this.filterdashboardsearch.StartDate).format('DD/MM/YYYY');
    var tab2 = moment(this.filterdashboardsearch.EndDate).format('DD/MM/YYYY');
    if(this.filterdashboardsearch.WarehouseId.length <=0){
      alert("Please Select at least 1 Warehouse");
      return false;
    }
    
    if(this.filterdashboardsearch.StartDate == null || this.filterdashboardsearch.StartDate == undefined){
      alert("Please Select Start Date");
      return false;
    }
    if(this.filterdashboardsearch.EndDate == null || this.filterdashboardsearch.EndDate == undefined){
      alert("Please Select End Date");
      return false;
    }
    let d =0
    //d= Math.floor((Date.parse(this.filterdashboardsearch.EndDate)-Date.parse(this.filterdashboardsearch.StartDate))/(1000*60*60*24))
    d= Math.floor((this.filterdashboardsearch.EndDate-this.filterdashboardsearch.StartDate)/(1000*60*60*24))
    if(d > 30){
      alert("Please Select Within the Range of 30 Days");
      return false;
    }

    this.filterdashboardsearch.Skip=this.skip;
    this.filterdashboardsearch.Take = this.take;
    console.log(this.filterdashboardsearch.WarehouseId)
    console.log(this.warehouseList)
    
    this.warehouseidslist = [];
    
    
    let resetwarehouseids = this.filterdashboardsearch.WarehouseId;
    // let resetsupplierids = this.filterdashboardsearch.SupplierId;
    this.filterdashboardsearch.WarehouseId && this.filterdashboardsearch.WarehouseId.length ?
      this.filterdashboardsearch.WarehouseId.forEach(element => {
        element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
      }) : '';

    let emptyWhList = this.warehouseList;

    !this.filterdashboardsearch.WarehouseId.length ?
      emptyWhList.forEach(element => {
        element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
      }) : '';

    let SupplierId = this.filterdashboardsearch.SupplierId;
    this.filterdashboardsearch.SupplierId = []

    if (SupplierId && SupplierId != null) {
      this.filterdashboardsearch.SupplierId.push(SupplierId.toString());
    }

    if (this.filterdashboardsearch && this.filterdashboardsearch.BuyerId) {
      this.filterdashboardsearch.BuyerId = Number(this.filterdashboardsearch.BuyerId);
    }
    this.filterdashboardsearch.WarehouseId = this.warehouseidslist;
    
    
    
  debugger
  
    console.log(this.filterdashboardsearch.WarehouseId)
    const payload = {
      WarehouseId: this.filterdashboardsearch.WarehouseId ? this.filterdashboardsearch.WarehouseId: 0,
      StartDate: tab1,
      EndDate: tab2,
      SupplierId: this.filterdashboardsearch.SupplierId ? this.filterdashboardsearch.SupplierId : null,
      BuyerId: this.filterdashboardsearch.BuyerId ? this.filterdashboardsearch.BuyerId : 0,
      Poid:this.filterdashboardsearch.Poid?this.filterdashboardsearch.Poid:0,
      Skip:this.skip,
      Take:this.take
    };
debugger;
    this.loaderService.isLoading.next(true);
    this.podashboardserviceService.getDetailDashboardData(payload).subscribe((result:any)=>{
      console.log(result);
      if(result != null && result.TotalRecords >0){
        console.log(result);
        
        this.filterdashboardsearch.WarehouseId = resetwarehouseids;
        this.loaderService.isLoading.next(false);
        this.dashboarddata = result.detailPoDashboards
        this.totalRecords=result.TotalRecords
      }
      else{
        this.filterdashboardsearch.WarehouseId = resetwarehouseids;
        this.loaderService.isLoading.next(false);
        this.dashboarddata = result.detailPoDashboards
        this.totalRecords=result.TotalRecords
        alert("No Data Found");
        return false;
      }
    })
    
  }
  GetExportDashboardData(){
    debugger
    console.log(this.filterdashboardsearch.Poid);
    
    var tabs1 = moment(this.filterdashboardsearch.StartDate).format('DD/MM/YYYY');
    var tabs2 = moment(this.filterdashboardsearch.EndDate).format('DD/MM/YYYY');
    // this.filterdashboardsearch.StartDate = this.filterdashboardsearch.StartDate ? moment(this.filterdashboardsearch.StartDate).format('DD/MM/YYYY') : null
    // this.filterdashboardsearch.EndDate = this.filterdashboardsearch.EndDate ? moment(this.filterdashboardsearch.EndDate).format('DD/MM/YYYY') : null

    if(this.filterdashboardsearch.WarehouseId.length <=0){
      alert("Please Select at least 1 Warehouse");
      return false;
    }
    if(this.filterdashboardsearch.StartDate == null || this.filterdashboardsearch.StartDate == undefined){
      alert("Please Select Start Date");
      return false;
    }
    if(this.filterdashboardsearch.EndDate == null || this.filterdashboardsearch.EndDate == undefined){
      alert("Please Select End Date");
      return false;
    }
    let e =0
    e= Math.floor((Date.parse(this.filterdashboardsearch.EndDate)-Date.parse(this.filterdashboardsearch.StartDate))/(1000*60*60*24))
    if(e > 30){
      alert("Please Select Within the Range of 30 Days");
      return false;
    }
    // if(this.totalRecords<=0 || this.totalRecords == undefined || this.totalRecords == null){
    //   alert("Please Search Data First")
    //   return false;
    // }
    this.filterdashboardsearch.Skip=0;
    this.filterdashboardsearch.Take = 0;
    console.log(this.filterdashboardsearch.WarehouseId)
    console.log(this.warehouseList)
    
    this.warehouseidslist = [];
    
    
    let resetwarehouseids = this.filterdashboardsearch.WarehouseId;
    // let resetsupplierids = this.filterdashboardsearch.SupplierId;
    this.filterdashboardsearch.WarehouseId && this.filterdashboardsearch.WarehouseId.length ?
      this.filterdashboardsearch.WarehouseId.forEach(element => {
        element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
      }) : '';

    let emptyWhList = this.warehouseList;

    !this.filterdashboardsearch.WarehouseId.length ?
      emptyWhList.forEach(element => {
        element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
      }) : '';

    let SupplierId = this.filterdashboardsearch.SupplierId;
    this.filterdashboardsearch.SupplierId = []

    if (SupplierId && SupplierId != null) {
      this.filterdashboardsearch.SupplierId.push(SupplierId.toString());
    }

    if (this.filterdashboardsearch && this.filterdashboardsearch.BuyerId) {
      this.filterdashboardsearch.BuyerId = Number(this.filterdashboardsearch.BuyerId);
    }
    this.filterdashboardsearch.WarehouseId = this.warehouseidslist;
  debugger
    // let d =0
    // d= Math.floor((Date.parse(this.filterdashboardsearch.EndDate)-Date.parse(this.filterdashboardsearch.StartDate))/(1000*60*60*24))
    // if(d > 30){
    //   alert("Please Select Within the Range of 30 Days");
    //   return false;
    // }
    
    // this.filterdashboardsearch.StartDate ? this.filterdashboardsearch.StartDate = this.datePipe.transform(this.filterdashboardsearch.StartDate, "dd/MM/yyyy") : '';
    // this.filterdashboardsearch.EndDate ? this.filterdashboardsearch.EndDate = this.datePipe.transform(this.filterdashboardsearch.EndDate, "dd/MM/yyyy") : '';
    console.log(this.filterdashboardsearch.WarehouseId)
    const payload = {
      WarehouseId: this.filterdashboardsearch.WarehouseId ? this.filterdashboardsearch.WarehouseId: 0,
      StartDate: tabs1,
      EndDate: tabs2,
      SupplierId: this.filterdashboardsearch.SupplierId ? this.filterdashboardsearch.SupplierId : null,
      BuyerId: this.filterdashboardsearch.BuyerId ? this.filterdashboardsearch.BuyerId : 0,
      Poid:this.filterdashboardsearch.Poid?this.filterdashboardsearch.Poid:0,
      Skip:0,
      Take:0
    };
    debugger;
    this.loaderService.isLoading.next(true);
    this.podashboardserviceService.getDetailDashboardData(payload).subscribe((result:any)=>{
      console.log(result);
      if(result != null && result.TotalRecords >0){
        this.filterdashboardsearch.WarehouseId = resetwarehouseids;
        this.loaderService.isLoading.next(false);
        this.dashboarddatas = result.detailPoDashboards
        //this.totalRecords=result.TotalRecords
        this.exportService.exportAsExcelFile(this.dashboarddatas,"DetailedPoDashboard");
      }
      else{
        this.filterdashboardsearch.WarehouseId = resetwarehouseids;
        this.loaderService.isLoading.next(false);
        //this.dashboarddatas = result.detailPoDashboards
        //this.totalRecords=result.TotalRecords
        alert("No Data Found");
        return false;
      }
    })
  }
}

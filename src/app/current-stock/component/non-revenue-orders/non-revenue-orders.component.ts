import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';

@Component({
  selector: 'app-non-revenue-orders',
  templateUrl: './non-revenue-orders.component.html',
  styleUrls: ['./non-revenue-orders.component.scss']
})
export class NonRevenueOrdersComponent implements OnInit {
  warehouseList: any[] = [];
  maxDate = new Date();
  record: boolean = false;
  blocked: boolean = false;
  first: number = 0;
  CustomerType: any;
  SelectedCustomerType: any;
  ReasonDialog: boolean = false;
  OrderStatus: any;
  NonRevnueList: any;
  warehouseID: any;
  rangeDates: any;
  FromDate: any;
  ToDate: any;
  WarId: any;
  keyword: any;
  Status: any;
  custtype: any;
  Statu: any;
  TotalRecords: any;
  SelectedStatus: any;
  reason: any;
  skip:any;
  take:any;
  showExport:boolean=false;
  constructor(private warehouseService: WarehouseService, private InventoryService: InventoryAssignSupervisiorService,
    public datepipe: DatePipe, private exportService: ExportServiceService) { }

  ngOnInit() {
    this.warehouseService.getWarehouseCommon()
      .subscribe(result => {
        this.warehouseList = result;
        console.log("this.warehouseList", this.warehouseList);

      });
    this.CustomerType = [
      { code: "SKP Owner", name: "SKP Owner" },
     // { code: "order canceled", name: "order canceled" },
      { code: "KPP", name: "KPP" },
      { code: "Retailer", name: "Retailer" },
      { code: "Agent", name: "Agent" },
      { code: "RDS", name: "RDS" },
      { code: "Wholesaler", name: "Wholesaler" },
      { code: "Distributor", name: "Distributor" },
      { code: "Direct Open Network", name: "Direct Open Network" },
      { code: "SKP Retailer", name: "SKP Retailer" },
      { code: "Trader", name: "Trader" },
      

    ];

    this.OrderStatus = [
      { code: 'Delivered', name: "Delivered" },
      { code: 'Pending', name: "Pending" },
      { code: 'sattled', name: "sattled" },
      { code: 'order canceled', name: "order canceled" },
    ];
  }
  
  load(event) {
    this.skip=event.first;
    this.take= event.rows;
    this.onSearch(event)


  }
  getDates() {
    this.FromDate = moment(this.rangeDates[0]).format('YYYY-MM-DD');
    this.ToDate = moment(this.rangeDates[1]).format('YYYY-MM-DD');
  }
  ForSearchHit() {
    this.record = true;
    this.first = 0;
    this.TotalRecords = 0;
  }

  onSearch(event) {
    if (this.rangeDates != null || this.rangeDates != undefined) {
      if (this.rangeDates.length > 0) {
        this.getDates()
      }
      if ((this.FromDate && (!this.ToDate || this.ToDate == "Invalid date")) || ((!this.FromDate || this.FromDate == "Invalid date") && this.ToDate)) {
        alert("Select both date! ");
        this.rangeDates = null; this.FromDate = ''; this.ToDate = '';
      }
    }
    debugger
    if ((this.warehouseID == null || this.warehouseID == undefined) && this.record == true) {
      alert("Please Select Warehouse")
    }

    this.WarId = []
    if (this.warehouseID != undefined) {
      this.warehouseID.forEach((element) => {
        this.WarId.push(element.value);
      })
      if (this.SelectedCustomerType != undefined) {
        this.custtype = []
        this.SelectedCustomerType.forEach((element) => {
          this.custtype.push(element.code);
        })
      }
      if (this.SelectedStatus != undefined) {
        this.Statu = []
        this.SelectedStatus.forEach((element) => {
          this.Statu.push(element.code);
        })

      }
      if (this.record == true) {
        this.blocked = true;
        debugger
        const payload = {
          "WarehouseIds": this.WarId,
          "CustomerType": this.custtype == undefined ? [] : this.custtype,
          "Status": this.Statu == undefined ? [] : this.Statu,
          "FromDate": this.FromDate == undefined ? null : this.FromDate,
          "ToDate": this.ToDate == undefined ? null : this.ToDate,
          "keyword": this.keyword != undefined ? this.keyword : null,
          "Skip": this.skip,
          "Take": this.take
        }

        this.InventoryService.getAllNonRevenueSettelmentOrders(payload).subscribe(res => {
          if (res.length>0) {
            this.blocked = false;
            this.NonRevnueList = res;
              this.TotalRecords =this.NonRevnueList[0].TotalRecords
              this.showExport=true;
              console.log(this.NonRevnueList,"NonRevnueList");
          } else {
            alert("No Data Found");
            this.blocked = false;
            this.NonRevnueList = [];
            this.TotalRecords = 0
           

          }

        })
      }
    }
  }

  ExportSearch(event) {
debugger
console.log(this.TotalRecords,"TotalRecords");
this.skip=0
    if (this.rangeDates != null || this.rangeDates != undefined) {
      if (this.rangeDates.length > 0) {
        this.getDates()
      }
      if ((this.FromDate && (!this.ToDate || this.ToDate == "Invalid date")) || ((!this.FromDate || this.FromDate == "Invalid date") && this.ToDate)) {
        alert("Select both date! ");
        this.rangeDates = null; this.FromDate = ''; this.ToDate = '';
      }
    }
    debugger
    if ((this.warehouseID == null || this.warehouseID == undefined) && this.record == true) {
      alert("Please Select Warehouse")
    }

    this.WarId = []
    if (this.warehouseID != undefined) {
      this.warehouseID.forEach((element) => {
        this.WarId.push(element.value);
      })
      if (this.SelectedCustomerType != undefined) {
        this.custtype = []
        this.SelectedCustomerType.forEach((element) => {
          this.custtype.push(element.code);
        })
      }
      if (this.SelectedStatus != undefined) {
        this.Statu = []
        this.SelectedStatus.forEach((element) => {
          this.Statu.push(element.code);
        })

      }
      if (this.record == true) {
        this.blocked = true;
        debugger
       
        const payloadd = {
          "WarehouseIds": this.WarId,
          "CustomerType": this.custtype == undefined ? [] : this.custtype,
          "Status": this.Statu == undefined ? [] : this.Statu,
          "FromDate": this.FromDate == undefined ? null : this.FromDate,
          "ToDate": this.ToDate == undefined ? null : this.ToDate,
          "keyword": this.keyword != undefined ? this.keyword : null,
          "Skip":this.skip,
          "Take": this.TotalRecords //?this.TotalRecords:20
        }
 console.log(payloadd,"payload");
 
        this.InventoryService.getAllNonRevenueSettelmentOrders(payloadd).subscribe(res => {
          debugger
          if (res.length>0) {
            debugger
            this.blocked = false;
            this.NonRevnueList = res;
            console.log(this.NonRevnueList, "NonRevnueList");
            this.exportService.exportAsExcelFile(this.NonRevnueList, 'NonRevnueOrdersDetails');
          } else {
            alert("No Data Found");
            this.blocked = false;
            this.NonRevnueList = [];
          }
        })
      }
      }
    
  }

  ViewReason(item) {
    if (item.Reason) {
      this.reason = item.Reason
      this.ReasonDialog = true;
    } else {
      alert("No Data Found !")
      this.ReasonDialog = false;
    }
  }
}


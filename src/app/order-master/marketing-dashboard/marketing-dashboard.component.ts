import { Component, OnInit } from '@angular/core';
import { DEC } from '@angular/material';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { element } from 'protractor';

@Component({
  selector: 'app-marketing-dashboard',
  templateUrl: './marketing-dashboard.component.html',
  styleUrls: ['./marketing-dashboard.component.scss']
})
export class MarketingDashboardComponent implements OnInit {
  orderType: any[];
  customerType: any[];
  StoreList: any;
  StoreId: any[] = [];
  SelectedStoreId: any[] = [];
  orderid: any;
  customerid: any[] = [];
  Retailersid: any[] = [];
  SelectedCustomer: any[] = []
  MonthYear: any;
  markitingList: any;
  blocked: boolean = false;
  Retailer: any[] = [];
  SelectedRetailer: any
  SelectedRetailerLen:number=0;
  SelectedCustomerLen:number=0;
  RetailerLen:number=0;
  customerTypeLen:number=0;

  constructor(private _service: ItemClassificationIncentiveReportService, private messageService: MessageService, private exportService: ExportServiceService) {

  }
  ngOnInit() {

    this.getStore()
    this.orderType = [
      { lable: 'Booking', value: 'Booking' },
      { lable: 'Dispatch', value: 'Dispatch' },
    ]
    this.customerType = [
      { lable: 'SKP Owner', value: 'SKP Owner' },
      { lable: 'KPP', value: 'KPP' },
      { lable: 'Retailer', value: 'Retailer' },
      { lable: 'Agent', value: 'Agent' },
      { lable: 'RDS', value: 'RDS' },
      { lable: 'Wholesaler', value: 'Wholesaler' },
      { lable: 'Distributor', value: 'Distributor' },
      { lable: 'Super Stockis', value: 'Super Stockis' },
      { lable: 'Direct Open Network', value: 'Direct Open Network' },
      { lable: 'SKP Retailer', value: 'SKP Retailer' },
      { lable: 'Trader', value: 'Trader' },
      { lable: 'undefined', value: 'undefined' },
    ]
    this.Retailer = [
      { lable: 'Platinum', value: 'Platinum' },
      { lable: 'Gold', value: 'Gold' },
      { lable: 'Silver', value: 'Silver' },
      { lable: 'GT', value: 'GT' },
      { lable: 'Potential Platinum', value: 'Potential Platinum' },
      { lable: 'Potential Gold', value: 'Potential Gold' },
      { lable: 'Potential Silver', value: 'Potential Silver' },
      { lable: 'Potential GT', value: 'Potential GT' },
      { lable: 'Digital', value: 'Digital' },
      { lable: 'undefined', value: 'undefined' },
    ]
    this.orderid = this.orderType[0];
    this.SelectedCustomer = this.customerType;
    this.SelectedRetailer = this.Retailer;
    this.RetailerLen=this.Retailer.length
    this.customerTypeLen=this.customerType.length;
  }
  getStore() {
    this.StoreList = []
    this._service.GetStoreList().subscribe(res => {
      this.StoreList = res;
      console.log(this.StoreList, "StoreList");

    })
  }
  Search() {
    if (this.SelectedStoreId == undefined || this.SelectedStoreId.length == 0) { this.showError("Please select a Store"); return false; }
    else if (this.orderid == undefined && this.orderid == null) { this.showError("Please Select a OrderType"); return false; }
    else if (this.SelectedCustomer == undefined || this.SelectedCustomer == null || this.SelectedCustomer.length == 0) { this.showError("Please Select a Retailer Type"); return false; }
    else if (this.SelectedRetailer == undefined || this.SelectedRetailer == null || this.SelectedRetailer.length == 0) { this.showError("Please Select a Retailer Class"); return false; }
    else if (this.MonthYear == undefined && this.MonthYear == null) { this.showError("Please Select Month/Year"); return false; }
    this.StoreId = []
    if (this.SelectedStoreId != undefined) {
      this.SelectedStoreId.forEach((element) => {
        this.StoreId.push(element.Id)
      })
      this.customerid = [];
      if (this.SelectedCustomer != undefined) {
        this.SelectedCustomer.forEach((element) => {
          this.SelectedCustomerLen=this.SelectedCustomer.length
          this.customerid.push(element.value)
        })
      }
      this.Retailersid = [];
      if (this.SelectedRetailer != undefined) {
        this.SelectedRetailerLen=this.SelectedRetailer.length
        this.SelectedRetailer.forEach((element) => {
          this.Retailersid.push(element.value)
        })
      }
    }
    if (this.SelectedStoreId != undefined && this.orderid != undefined && this.MonthYear != undefined && this.SelectedCustomer != undefined && this.SelectedRetailer != undefined) {
      const payload =
      {
        "StoreId": this.StoreId,
        "OrderType": this.orderid.value,
        "RetailerType": (this.SelectedCustomerLen== this.customerTypeLen) ? ['All'] : this.customerid,
        "RetailerClass": (this.SelectedRetailerLen==this.RetailerLen) ? ['All'] : this.Retailersid,
        "date": this.MonthYear ? moment(this.MonthYear).format('YYYY/MM/DD') : "",
        "IsExport": false
      }
      this.blocked = true;
      this._service.GetMarketingCostDashboard(payload).subscribe(res => {
        if (res.Status == true) {
          this.blocked = false;
          this.markitingList = res.Data
        }
        else {
          alert(res.Message);
          this.markitingList = [];
          this.blocked = false;
        }
      })
    }
  }

  ExportSearch() {
    if (this.SelectedStoreId == undefined || this.SelectedStoreId.length == 0) { this.showError("Please select a Store"); return false; }
    else if (this.orderid == undefined && this.orderid == null) { this.showError("Please Select a OrderType"); return false; }
    else if (this.SelectedCustomer == undefined || this.SelectedCustomer == null || this.SelectedCustomer.length == 0) { this.showError("Please Select a Retailer Type"); return false; }
    else if (this.SelectedRetailer == undefined || this.SelectedRetailer == null || this.SelectedRetailer.length == 0) { this.showError("Please Select a Retailer Class"); return false; }
    else if (this.MonthYear == undefined && this.MonthYear == null) { this.showError("Please Select Month/Year"); return false; }
    this.StoreId = []
    if (this.SelectedStoreId != undefined) {
      this.SelectedStoreId.forEach((element) => {
        this.StoreId.push(element.Id)
      })
      this.customerid = [];
      if (this.SelectedCustomer != undefined) {
        this.SelectedCustomerLen=this.SelectedCustomer.length
        this.SelectedCustomer.forEach((element) => {
          this.customerid.push(element.value)
        })
      }
      this.Retailersid = [];
      if (this.SelectedRetailer != undefined) {
        this.SelectedRetailerLen=this.SelectedRetailer.length
        this.SelectedRetailer.forEach((element) => {
          this.Retailersid.push(element.value)
        })
      }

    }
    if (this.SelectedStoreId != undefined && this.orderid != undefined && this.MonthYear != undefined && this.SelectedCustomer != undefined && this.SelectedRetailer != undefined) {
      const payload =
      {
        "StoreId": this.StoreId,
        "OrderType": this.orderid.value,
        "RetailerType": (this.SelectedCustomerLen== this.customerTypeLen) ? ['All'] : this.customerid,
        "RetailerClass": (this.SelectedRetailerLen==this.RetailerLen) ? ['All'] : this.Retailersid,
        "date": this.MonthYear ? moment(this.MonthYear).format('YYYY/MM/DD') : "",
        "IsExport": true
      }
      this.blocked = true;
      this._service.GetMarketingCostDashboard(payload).subscribe(res => {
        if (res.Status == true) {
          this.blocked = false;
          window.open(res.Data);
        }
        else {
          alert(res.Message);
          this.blocked = false;
        }
      })
    }

  }

  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}

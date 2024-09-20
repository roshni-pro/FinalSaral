
import { BuyerService } from 'app/shared/services/buyer.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { CalendarModule } from 'primeng/calendar';
import { isThisISOWeek } from 'date-fns';
@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  Whsearch: any;
  name: any;
  id: any;
  isDetails: any;
  blocked: boolean;
  selectedBuyer: any;
  buyerList: any;
  BuyerIds: any;
  data: any;
  buyerData: any;
  buyerDetails: any;
  BuyerId: any;
  StartDate: any;
  EndDate: any;
  detailsList: any[];
  uri: string;
  Columns: any;

  constructor(private exportService: ExportServiceService, private buyerservice: BuyerService, private router: Router) { }


  ngOnInit() {
    this.data = {};
    this.buyerDetails = {};
    this.detailsList = [];
    this.isDetails = false;
    this.buyerservice.getbuyer().subscribe(result => {
      this.buyerList = result;

    })

  }

  toggle1(SaleAmount) {
    

    this.blocked = true;
    this.closeDetails(false);
    this.buyerDetails = {};
    this.name = "SalesAmount";
    this.id = "SalesAmount";

    this.buyerDetails.BuyerId = SaleAmount.BuyerId;
    console.log("this.BuyerId")
    this.buyerDetails.StartDate = this.data.StartDate;
    this.buyerDetails.EndDate = this.data.EndDate;
    this.buyerDetails.ItemMultiMrpIds = SaleAmount.ItemMultiMrpIds;

     this.buyerDetails.ExportType = "Sales";
  

    this.isDetails = true;
    this.formatBuyerData();
    this.blocked = false;
  }

  toggle2(ClosingStock) {

    this.blocked = true;
    this.closeDetails(false);
    this.buyerDetails = {};
    this.name = "ClosingStock";
    this.id = "ClosingStock";
    this.buyerDetails.BuyerId = ClosingStock.BuyerId;
    this.buyerDetails.StartDate = this.data.StartDate;
    this.buyerDetails.EndDate = this.data.EndDate;
    this.buyerDetails.ItemMultiMrpIds = ClosingStock.ItemMultiMrpIds;
    this.buyerDetails.ExportType = "Closing";
   
    this.isDetails = true;
    this.formatBuyerData();
    this.blocked = false;



  }

  toggle3(GrossMargin) {
    this.blocked = true;
    this.closeDetails(false);
    this.buyerDetails = {};
    this.name = 'GrossMargin';
    this.id = 'GrossMargin';
    this.buyerDetails.BuyerId = GrossMargin.BuyerId;
    this.buyerDetails.StartDate = this.data.StartDate;
    this.buyerDetails.EndDate = this.data.EndDate;
    this.buyerDetails.ItemMultiMrpIds = GrossMargin.ItemMultiMrpIds;
    this.buyerDetails.ExportType = "GrossMargin";
    
    this.isDetails = true;
    this.formatBuyerData();
    this.blocked = false;

  }


  toggle4(InventoryDays) {

    this.blocked = true;
    this.closeDetails(false);
    this.buyerDetails = {};
    this.name = 'InventoryDays'
    this.id = 'InventoryDays';
    this.buyerDetails.BuyerId = InventoryDays.BuyerId;
    this.buyerDetails.StartDate = this.data.StartDate;
    this.buyerDetails.EndDate = this.data.EndDate;
    this.buyerDetails.ItemMultiMrpIds = InventoryDays.ItemMultiMrpIds;
    this.buyerDetails.ExportType = "InventoryDays";
   
    this.isDetails = true;
    this.formatBuyerData();

    this.blocked = false;


  }

  toggle5(ActiveArticles) {
    this.blocked = true;
    this.closeDetails(false);
    this.buyerDetails = {};
    this.name = 'ActiveArticles'
    this.id = 'ActiveArticles';
    this.buyerDetails.BuyerId = ActiveArticles.BuyerId;
    this.buyerDetails.StartDate = this.data.StartDate;
    this.buyerDetails.EndDate = this.data.EndDate;
    this.buyerDetails.ItemMultiMrpIds = ActiveArticles.ItemMultiMrpIds;
   
    this.isDetails = true;
    this.formatBuyerData();
    this.blocked = false;


  }
  onPanelHide() {
    this.BuyerIds = []
    console.log("this.selectedWH");
    console.log(this.selectedBuyer);
    for (var i in this.selectedBuyer) {
      this.BuyerIds.push(this.selectedBuyer[i].PeopleID)
    }
  }
  onSave(data) {
    this.isDetails = false;
    //this.buyerDetails=[];
    var FromDate = this.data.StartDate ? moment(this.data.StartDate).format('YYYY-MM-DD') : null
    var ToDate = this.data.EndDate ? moment(this.data.EndDate).format('YYYY-MM-DD') : null
    console.log(FromDate, 'StartDate');
    console.log(ToDate, 'EndDate');
    this.blocked = true;
    console.log(this.BuyerIds);
    this.data.BuyerIds = this.BuyerIds;
 
    console.log(this.data);
    let dataToPost = JSON.parse(JSON.stringify(this.data));
    dataToPost.StartDate = FromDate;
    dataToPost.EndDate = ToDate;
    this.buyerservice.getbuyerlist(dataToPost).subscribe(result => {
      console.log(result);
      this.buyerData = result;
      this.formatBuyerData();
      this.blocked = false;


    })
  }

  closeDetails(a) {
    this.isDetails = false;
  }
  export() {
    
    this.blocked = true;
    this.buyerservice.getexportURL(this.data).subscribe(result => {
      
      this.blocked = false;
      var filename = 'buyerData' + new Date;
      this.downloadURI(result, filename)
    });
    console.log("result");
  }


  downloadURI(uri, name) {
    
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }


  formatBuyerData() {
    if (this.buyerData && this.buyerData.length > 0) {
      this.buyerData.forEach(element => {

        if (element.InventoryDays && (element.InventoryDays == 'Infinity' || element.InventoryDays == 'NaN')) {
          element.InventoryDays = '-';
        } else {
          element.InventoryDays = (element.InventoryDays && !isNaN(element.InventoryDays)) ? Number(element.InventoryDays).toFixed(2) : element.InventoryDays;
        }
        element.SaleAmount = (element.SaleAmount && !isNaN(element.SaleAmount)) ? Number(element.SaleAmount).toFixed(2) : element.SaleAmount;
        element.GrossMargin = (element.GrossMargin && !isNaN(element.GrossMargin)) ? Number(element.GrossMargin).toFixed(2) : element.GrossMargin;
        element.ClosingStock = (element.ClosingStock && !isNaN(element.ClosingStock)) ? Number(element.ClosingStock).toFixed(2) : element.ClosingStock;

      });
    }
  }



}

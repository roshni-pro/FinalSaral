import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PeopleService } from 'app/shared/services/people.service';
import { MessageService } from 'primeng/api';
import { BuyerService } from 'app/shared/services/buyer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-buyer-details',
  templateUrl: './buyer-details.component.html',
  styleUrls: ['./buyer-details.component.scss']
})
export class BuyerDetailsComponent implements OnInit {
  @Input() name: any;
  @Input() data: any;
  @Input() ExportType: any;
  @Input() Columns: any;
  @Output() isdetailsclose = new EventEmitter<boolean>();
  detailsList: any;
  cols: any;
  peopleList: any[];
  blocked: boolean;
  exportlist: any[];
  buyerDetails: {};
  status: any;
  WarehouseName: any;
  value: any;
  Value: any;
  Data: any;
  StartDate: any;
  constructor(private modalService: NgbModal, private buyerservice: BuyerService, private router: Router, private exportService: ExportServiceService, private messageService: MessageService, private peopleService: PeopleService) { }

  ngOnInit() {

    console.log(" this.name", this.name);
    console.log(" this.data", this.data);
    console.log(" this.ExportType", this.ExportType);
    console.log(this.data);

    this.cols = [


      { field: 'BrandName', header: 'BrandName' },
      { field: 'WarehouseName', header: 'WarehouseName' },
      { field: 'Value', header: 'Value' },

    ];



  }
  ngOnChanges() {
    var FromDate = this.data.StartDate ? moment(this.data.StartDate).format('YYYY-MM-DD') : null
    var ToDate = this.data.EndDate ? moment(this.data.EndDate).format('YYYY-MM-DD') : null
    console.log(FromDate, 'StartDate');
    console.log(ToDate, 'EndDate');
    let dataToPost = JSON.parse(JSON.stringify(this.data));
    dataToPost.StartDate = FromDate;
    dataToPost.EndDate = ToDate;

    if (this.name == "SalesAmount") {
      this.blocked = true;
      this.detailsList = [];
      this.buyerDetails = {};
      console.log("SalesAmount")
      this.buyerservice.getbuyerSalesData(dataToPost).subscribe(result => {
        this.detailsList = result;
        this.formatBuyerData();
        this.blocked = false;

      })
    }
    else if (this.name == "ClosingStock") {
      this.blocked = true;
      console.log("ClosingStock")
      this.detailsList = [];
      this.buyerservice.getbuyerClosingStockData(dataToPost).subscribe(result => {
        this.detailsList = result;
        this.formatBuyerData();
        this.blocked = false;
      })
    }
    else if (this.name == "GrossMargin") {
      this.blocked = true;
      console.log("GrossMargin")
      this.detailsList = [];
      this.buyerservice.getbuyerGrossMarginData(dataToPost).subscribe(result => {
        this.detailsList = result;
        this.formatBuyerData();
        this.blocked = false;
      })
    }
    else if (this.name == "InventoryDays") {
      this.blocked = true;
      console.log("InventoryDays")
      this.detailsList = [];
      this.buyerservice.getbuyerInventoryDaysData(dataToPost).subscribe(result => {
        this.detailsList = result;
        this.formatBuyerData();
        this.blocked = false;
      })
    }


  }

  closeDetails() {
    this.isdetailsclose.emit(false);
  }

  onStatusChange(s) {
    this.blocked = true;
    console.log("toggleData", s);
    var FromDate = this.data.StartDate ? moment(this.data.StartDate).format('YYYY-MM-DD') : null
    var ToDate = this.data.EndDate ? moment(this.data.EndDate).format('YYYY-MM-DD') : null
    console.log(FromDate, 'StartDate');
    console.log(ToDate, 'EndDate');
    let dataToPost = JSON.parse(JSON.stringify(this.data));
    dataToPost.StartDate = FromDate;
    dataToPost.EndDate = ToDate;
    if (s == "brand") {

      if (this.name == "SalesAmount") {
        console.log("dataToPost dataToPost dataToPost ",dataToPost);
        dataToPost.Columns = "brand";
        this.buyerservice.getbuyerSalesData(dataToPost).subscribe(result => {
          this.cols = [

            { field: 'BrandName', header: 'BrandName' },
            { field: 'Value', header: 'Value' },
          ];

          this.detailsList = result;
          this.blocked = false;
        })
      }
      if (this.name == "ClosingStock") {
        dataToPost.Columns="brand";
        this.buyerservice.getbuyerClosingStockData(dataToPost).subscribe(result => {
      
          this.detailsList = result;
          this.cols = [
            { field: 'BrandName', header: 'BrandName' },
            { field: 'Value', header: 'Value' },
          ];
          this.blocked = false;
        })
      }
      if (this.name == "GrossMargin") {
        dataToPost.Columns="brand";
        this.buyerservice.getbuyerGrossMarginData(dataToPost).subscribe(result => {
          this.cols = [
            { field: 'BrandName', header: 'BrandName' },
            { field: 'Value', header: 'Value' },
          ];
          this.detailsList = result;
          this.blocked = false;
        })
      }
      if (this.name == "InventoryDays") {
        dataToPost.Columns="brand";
        this.buyerservice.getbuyerInventoryDaysData(dataToPost).subscribe(result => {
          this.cols = [
            { field: 'BrandName', header: 'BrandName' },
            { field: 'Value', header: 'Value' },
          ];
          this.detailsList = result;
          this.blocked = false;
        })
      }

    }

    if (s == "warehouse") {

      if (this.name == "SalesAmount") {
        dataToPost.Columns="warehouse";
        this.buyerservice.getbuyerSalesData(dataToPost).subscribe(result => {
          this.cols = [

            { field: 'WarehouseName', header: 'WarehouseName' },
            { field: 'Value', header: 'Value' },
          ];

          this.detailsList = result;
          this.blocked = false;
        })
      }
      if (this.name == "ClosingStock") {
        dataToPost.Columns="warehouse";
        this.buyerservice.getbuyerClosingStockData(dataToPost).subscribe(result => {
          this.cols = [

            { field: 'WarehouseName', header: 'WarehouseName' },
            { field: 'Value', header: 'Value' },
          ];

          this.detailsList = result;
          this.blocked = false;
        })
      }
      if (this.name == "GrossMargin") {
        dataToPost.Columns="warehouse";
        this.buyerservice.getbuyerGrossMarginData(dataToPost).subscribe(result => {
          this.cols = [

            { field: 'WarehouseName', header: 'WarehouseName' },
            { field: 'Value', header: 'Value' },
          ];

          this.detailsList = result;
          this.blocked = false;
        })
      }
      if (this.name == "InventoryDays") {
        dataToPost.Columns="warehouse";
        this.buyerservice.getbuyerInventoryDaysData(dataToPost).subscribe(result => {
          this.cols = [

            { field: 'WarehouseName', header: 'WarehouseName' },
            { field: 'Value', header: 'Value' },
          ];

          this.detailsList = result;
          this.blocked = false;
        })
      }

    }
    if (s == "default") {

      if (this.name == "SalesAmount") {
        dataToPost.Columns="default";

        this.buyerservice.getbuyerSalesData(dataToPost).subscribe(result => {
          this.cols = [
            { field: 'BrandName', header: 'BrandName' },
            { field: 'WarehouseName', header: 'WarehouseName' },
            { field: 'Value', header: 'Value' },
          ];
          this.detailsList = result;
          this.blocked = false;
          console.log(this.detailsList, 'detailsList')
        })
      }
      if (this.name == "ClosingStock") {
        dataToPost.Columns="default";
        this.buyerservice.getbuyerClosingStockData(dataToPost).subscribe(result => {
          this.cols = [
            { field: 'BrandName', header: 'BrandName' },
            { field: 'WarehouseName', header: 'WarehouseName' },
            { field: 'Value', header: 'Value' },
          ];
          this.detailsList = result;
          this.blocked = false;
        })
      }
      if (this.name == "GrossMargin") {
        dataToPost.Columns="default";
        this.buyerservice.getbuyerGrossMarginData(dataToPost).subscribe(result => {
          this.cols = [
            { field: 'BrandName', header: 'BrandName' },
            { field: 'WarehouseName', header: 'WarehouseName' },
            { field: 'Value', header: 'Value' },
          ];
          this.detailsList = result;
          this.blocked = false;
        })
      }
      if (this.name == "InventoryDays") {
        dataToPost.Columns="default";
        this.buyerservice.getbuyerInventoryDaysData(dataToPost).subscribe(result => {
          this.cols = [
            { field: 'BrandName', header: 'BrandName' },
            { field: 'WarehouseName', header: 'WarehouseName' },
            { field: 'Value', header: 'Value' },
          ];
          this.detailsList = result;
          this.blocked = false;
        })
      }


    }
  }


  export(data) {
    this.blocked = true;
    this.buyerservice.getbuyerexportData(this.data).subscribe(result => {
      this.blocked = true;
      var exportData = result.map(function (item) {
        let newItem = {
          BrandName: item.BrandName,
          BuyerName: item.BuyerName,
          CategoryName: item.CategoryName,
          ItemName: item.ItemName,
          ItemNumber: item.ItemNumber,
          TaxPercentage: item.TaxPercentage,
          Value: item.Value,
          WarehouseName: item.WarehouseName,
          ItemMultiMrpId: item.ItemMultiMrpId
        }
        return newItem;
      });
      this.exportService.exportAsExcelFile(exportData, data.ExportType);
      console.log("result");
      this.blocked = false;
    })
  }


  formatBuyerData() {
    if (this.detailsList && this.detailsList.length > 0) {

      this.detailsList.forEach(element => {
        if (element.Value && (element.Value == 'Infinity' || element.Value == 'NaN')) {
          element.Value = '-';
        } else {
          element.Value = (element.Value && !isNaN(element.Value)) ? Number(element.Value).toFixed(2) : element.Value;
        }
        element.Value = (element.Value && !isNaN(element.Value)) ? Number(element.Value).toFixed(2) : element.Value = "_";
      });
    }
  }

}



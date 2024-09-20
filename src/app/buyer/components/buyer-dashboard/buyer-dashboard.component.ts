import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { BuyerService } from 'app/shared/services/buyer.service';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit {
  BuyersList: any[];
  cols: any[];
  data: any;
  searchModel: any;
  BuyerListData: any[];
  result: any[];
  selectedRowDetails: any[];
  checked: boolean;
  BuyerId: any;
  selectedBuyer: any;
  StartDate: any;
  EndDate: any;
  blocked: boolean;
  BuyerIds: any;
  buyer: any;
  exportData: any;
  fileUrl: String;
  activeFields: any[] = [
    { field: 'BuyerName', label: 'BuyerName' },
    { field: 'SaleAmount', label: 'SaleAmount' },
    { field: 'ClosingStock', label: 'ClosingStock' },
    { field: 'GrossMargin', label: 'GrossMargin' },
    { field: 'Margin', label: 'Margin ' },
    { field: 'InventoryDays', label: 'InventoryDays' },
    { field: 'ExportData', label: 'ExportData' },

  ];

  constructor(private buyerservice: BuyerService, private modalService: NgbModal, private exportService: ExportServiceService, private messageService: MessageService) { this.searchModel = {}; this.buyer = {}; }

  ngOnInit() {

    this.blocked = false;
    this.buyerservice.GetBuyers().subscribe(result => {
      this.BuyersList = result;
      console.log(this.BuyersList, 'BuyersList');

    })
    this.cols = [
      { field: 'BuyerName', header: 'BuyerName' },
      { field: 'SaleAmount', header: 'SaleAmount' },
      { field: 'ClosingStock', header: 'ClosingStock' },
      { field: 'GrossMargin', header: 'GrossMargin' },
      { field: 'Margin', header: 'Margin' },
      { field: 'InventoryDays', header: 'InventoryDays' },
      { field: 'ExportData', header: 'ExportData' },
    ];


  }

  onSave(searchModel) {
    this.blocked = true;
    var FromDate = this.searchModel.StartDate ? moment(this.searchModel.StartDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.EndDate ? moment(this.searchModel.EndDate).format('YYYY-MM-DD') : null
    console.log(FromDate, 'StartDate');
    console.log(ToDate, 'EndDate');
    this.blocked = true;
    console.log(this.BuyerIds);
    this.searchModel.BuyerIds = this.BuyerIds;
    console.log(this.searchModel);
    let dataToPost = JSON.parse(JSON.stringify(this.searchModel));
    dataToPost.StartDate = FromDate;
    dataToPost.EndDate = ToDate;
    this.buyerservice.getbuyerlist(dataToPost).subscribe(result => {
      console.log(result);
      this.BuyerListData = result;
      this.blocked = false;
    })
  }
  onPanelHide() {
    this.BuyerIds = []
    console.log("this.selectedWH");
    console.log(this.selectedBuyer);
    for (var i in this.selectedBuyer) {
      this.BuyerIds.push(this.selectedBuyer[i].PeopleID)
    }
  }

  //for page level export
  export() {
    var FromDate = this.searchModel.StartDate ? moment(this.searchModel.StartDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.EndDate ? moment(this.searchModel.EndDate).format('YYYY-MM-DD') : null
    console.log(FromDate, 'StartDate');
    console.log(ToDate, 'EndDate');
    this.blocked = true;
    console.log(this.BuyerIds);
    this.searchModel.BuyerIds = this.BuyerIds;
    console.log(this.searchModel);
    let dataToPost = JSON.parse(JSON.stringify(this.searchModel));
    dataToPost.StartDate = FromDate;
    dataToPost.EndDate = ToDate;


    this.buyerservice.GetDashBoardExport(dataToPost).subscribe(result => {
      this.blocked = false;
      
      window.location.href = result;
      
    })
  }

 // for row level export
   exportbuyer(obj) {
    
    this.blocked = true;
    this.searchModel.BuyerId = obj;
    this.buyerservice.GetExportBuyerData(this.searchModel).subscribe(result => {
    this.blocked = false;
    window.location.href = result;
    });
    console.log("file exported");
  }
 
}





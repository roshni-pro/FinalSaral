import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { CustomerFilters } from 'app/shared/interface/trade/customer-filters';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customertrade-list',
  templateUrl: './customertrade-list.component.html',
  styleUrls: ['./customertrade-list.component.scss']
})
export class CustomerTradeListComponent implements OnInit {
  activeFields: any[] = [{ field: 'SkCode', label: 'SkCode' }, { field: 'CustomerName', label: 'CustomerName' }, { field: 'CreatedDate', label: 'Registration Date' }, { field: 'Rating', label: 'Rating' }, { field: 'Action', label: 'Action' }];
  cols: any;

  lstData: any[];
  getAllCustomerExportData: any[]

  istrue: any;
  itemID: any;

  invalidDates: Array<Date>
  tr: { firstDayOfWeek: number; };

  apiURL: string;
  http: any;
  selectedcustomer: any;
  CustomerId: any;
  selectedcustomerDetails: any;
  isDetails: boolean;
  Demanddata: any;
  data: any;
  closeResult: string;
  SkCode: any;
  details: any
  getDismissReason: any;
  customerFilterPage: CustomerFilters;
  pageSize: number;
  cityList: any[];
  totalRecords: number;
  blocked: boolean;
  isUploadedCoupon: boolean;



  constructor(private customerService: TradeCustomerService,
    private modalService: NgbModal,
    private router: Router,
    private exportService: ExportServiceService,
    private ItemServices: TradeitemmasterService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.isUploadedCoupon = false;
    this.pageSize = 15;
    this.customerFilterPage = {
      City: "",
      CreatedDateStart: null,
      CreatedDateEnd: null,
      Skip: 0,
      Take: this.pageSize,
      SearchKeyWords: ""

    }

    this.ItemServices.SelectCity().subscribe(result => {
      this.cityList = result;

      console.log('this.cityListcityList: ', this.cityList);
    });
    this.tr = {
      firstDayOfWeek: 1
    }
    if (this.itemID) {
      this.Demanddata = this.itemID;
    }
    if (this.SkCode) {
      this.data = this.SkCode;
    }
    this.initialize();
  }

  private initialize() {
    this.blocked = true;

    this.customerService.GetCxSearchPage(this.customerFilterPage).subscribe(result => {
      this.blocked = false;
      if (result.total > 0) {
        this.lstData = result.tradeCustomerDc;
        this.totalRecords = result.total; 
      }
     else{
      this.messageService.add({ severity: 'error', summary: 'data not found !!', detail: '' });    
     }

    });
  }

  load(event) {
    this.customerFilterPage.Skip = event.first;
    this.customerFilterPage.Take = event.rows;
    this.initialize();
  }


  onSearch() {
    
    if (this.customerFilterPage.City || this.customerFilterPage.CreatedDateStart && this.customerFilterPage.CreatedDateEnd) {
      this.customerFilterPage.Skip = 0;
      this.customerFilterPage.Take = this.pageSize;
      this.initialize();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'PLease Select City or Dates Properly !!', detail: '' });
    }
  }
  onGlobalSearch() {
    if (this.customerFilterPage.SearchKeyWords && this.customerFilterPage.SearchKeyWords.length > 2) {
      this.customerFilterPage.Skip = 0;
      this.customerFilterPage.Take = this.pageSize;
      this.initialize();
    }
  }

  onReset() {
    this.customerFilterPage.City = '';
    this.customerFilterPage.CreatedDateEnd = null;
    this.customerFilterPage.CreatedDateStart = null;
    this.customerFilterPage.Skip = 0;
    this.customerFilterPage.Take = this.pageSize;
    this.customerFilterPage.Skip = 0;
    this.customerFilterPage.SearchKeyWords = '';
    this.initialize();
  }

  Edit(rowdata) {
    this.istrue = true;
    this.details = rowdata;
    this.router.navigateByUrl("layout/trade/customer-edit/" + this.details.CustomerId);
  }



  Search(data) {
    this.lstData = [];
    this.customerService.SkCode(data).subscribe(result => {
      this.lstData[0] = result;
      console.log("SkCode", result);
    });

  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  CancelV1(e) {
    this.istrue = e;
  }


  exportCustomer() {
    this.blocked = true;


    
    this.customerService.GetAllCustomerExport().subscribe(data => {
      this.getAllCustomerExportData = data;
      this.exportService.exportAsExcelFile(this.getAllCustomerExportData, 'TradeCustomer');
      this.blocked = false;

    });
  }

  uploadCoupon(){
    this.isUploadedCoupon = true;
   
  }

  closeUploadingCouponDialog(){
    this.isUploadedCoupon = false;
  }

}







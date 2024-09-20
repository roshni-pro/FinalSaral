import { Component, OnInit } from '@angular/core';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { TradeCustomerPaginator } from 'app/shared/interface/trade/trade-customer-paginator';
import { CustomerFilters } from 'app/shared/interface/trade/customer-filters';
import { MessageService } from 'primeng/api';
import { customerNotification } from 'app/shared/interface/trade/customerNotification';

@Component({
  selector: 'app-customer-notification',
  templateUrl: './customer-notification.component.html',
  styleUrls: ['./customer-notification.component.scss']
})
export class CustomerNotificationComponent implements OnInit {
  cityList: any;
  isSearch: boolean;
  isTable: boolean;
  totalRecords: number;
  blocked: boolean;
  CustomerList: any[];
  selectedList: any[];
  PageSize: number;
  customerFilterPage: CustomerFilters;
  CustomerNotification:customerNotification;
  cols: any[];
  checked: boolean;
  message: string;
  Id: any;
  data: any;
  userId:any;
 // paginator: TradeCustomerPaginator;


  constructor(private ItemServices: TradeitemmasterService,
    private tradeCustomerService: TradeCustomerService, private messageService: MessageService) { this.data = {}; }

  ngOnInit() {
    this.PageSize = 20;
    this.Id = '';
    this.data.notify_type = "";
    this.data.message = null;
    this.checked=false;
    this.selectedList = [];
    this.userId = localStorage.getItem('userid');
    this.customerFilterPage = {
      City: "",
      CreatedDateStart: null,
      CreatedDateEnd: null,
      Skip: 0,
      Take: this.PageSize,
      SearchKeyWords: ""

    }
    this.CustomerNotification={
      ReceiverId:[],
      notify_type:null,
      IsRead:false,
      message:null,
      Loginuser:0
    }
    this.ItemServices.GetCityV2().subscribe(result => {
      this.cityList = result;
    });

    this.onInitialize();
  }

  onInitialize() {
    this.blocked = true;
    this.tradeCustomerService.GetCxSearchPage(this.customerFilterPage).subscribe(result => {
      this.blocked = false;
      this.CustomerList = result.tradeCustomerDc;
      this.totalRecords = result.total;
    });
    // this.tradeCustomerService.GetCustomerMessageList(cityId).subscribe(result => {
    //   this.blocked = false;
    //   this.CustomerList = result.TradeCustomerViewModelList;
    //   this.totalRecords = result.Count;

    // });
  }

  onSelection() {
    if (this.checked == true) {
      this.checked = false;
    } else {
      this.checked = true;
    }
  }

  removeCustomer(cust) {
    let listItem = this.CustomerList.filter(x => {
      return x.SkCode == cust.SkCode;
    });

    if (listItem && listItem.length > 0) {
      listItem[0].isSelected = 0;
    }
    this.selectedList = this.selectedList.filter(x => {
      return x.SkCode != cust.SkCode;
    });
  }

  load(event) {
    this.customerFilterPage.Skip = event.first;
    this.customerFilterPage.Take = event.rows;
    this.onInitialize();
  }
 

  onSearch() {
    if (this.customerFilterPage.City || (this.customerFilterPage.SearchKeyWords && this.customerFilterPage.SearchKeyWords.length >= 3) ||
      (this.customerFilterPage.CreatedDateStart && this.customerFilterPage.CreatedDateEnd)) {
      this.customerFilterPage.Skip = 0;
      this.customerFilterPage.Take = this.PageSize;
      this.onInitialize();
    }
    // else {
    //   this.messageService.add({ severity: 'error', summary: 'Please Select City !!', detail: '' });
    // }
  }

  onReset() {
    this.ngOnInit();
  }

  sendMessages(data) {
    var Id = [];
    if (!this.selectedList || this.selectedList.length < 1) {
      this.messageService.add({ severity: 'error', summary: 'Select atleast one customer !!', detail: '' });
    } else if (!this.data.message) {
      this.messageService.add({ severity: 'error', summary: 'Please insert message !!', detail: '' });
    } else {
      this.blocked = true;
      for (var i in this.selectedList) {
        let obj = this.selectedList[i].CustomerId;
        Id.push(obj);
      }
    
     this.CustomerNotification={
       ReceiverId:Id,
       notify_type:this.data.notify_type,
       IsRead:false,
       message:this.data.message,
       Loginuser:this.userId
     }
      this.tradeCustomerService.SendCustomerNotificationList(this.CustomerNotification).subscribe(result => {
          this.blocked = false;
          this.messageService.add({ severity: 'success', summary: 'Message sent successfully !', detail: '' });
          this.ngOnInit();
        });
    }
  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if (this.isTable == true) {
        this.isTable = false;
      }
      this.isSearch = true;
    }
  }

}

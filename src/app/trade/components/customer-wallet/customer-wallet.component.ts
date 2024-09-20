import { Component, OnInit } from '@angular/core';
import { customerWalletDc } from 'app/shared/interface/trade/customerWalletDc';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { CustomerFilters } from 'app/shared/interface/trade/customer-filters';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-wallet',
  templateUrl: './customer-wallet.component.html',
  styleUrls: ['./customer-wallet.component.scss']
})
export class CustomerWalletComponent implements OnInit {
  CustomerWalletDc:customerWalletDc;
  customerWallet: any;
  customer: any;
  lstData: any[];
  customerId: number;
  pageSize: number;
  totalRecords: number;
  istrue:boolean;
  details:any;
  blocked: boolean;
  CustomerWalletHistory:any[];
  customerFilterPage: CustomerFilters;
  constructor(private customerService: TradeCustomerService,private customerservice: TradeCustomerService,private messageService: MessageService, private activatedroute: ActivatedRoute) { this.customerWallet = {};}

  ngOnInit() {
    this.pageSize=15;
    this.istrue = false;
    this.customerWallet.Walletpoints=null;
    this.customerWallet.Comments=null;
    this.activatedroute.paramMap.subscribe(params => {
      this.customerId = Number(params.get('customerId'));            
    }); 
    this.customerFilterPage = {
      City: "",
      CreatedDateStart: null,
      CreatedDateEnd: null,
      Skip: 0,
      Take: this.pageSize,
      SearchKeyWords: ""

    }

    this.CustomerWalletDc={
      CustomerId: this.customerId,
      Walletpoints:0,
      Comments:null
    } 
  }

   onSearch(SearchKeyWords) {
    this.blocked = true;
    this.customerService.GetCxSearchPage(this.customerFilterPage).subscribe(result => {
      this.lstData = result.tradeCustomerDc;
      this.totalRecords = result.total;
      this.blocked = false;

    });
  }

  onGlobalSearch() {
    if (this.customerFilterPage.SearchKeyWords && this.customerFilterPage.SearchKeyWords.length > 2) {
      this.customerFilterPage.Skip = 0;
      this.customerFilterPage.Take = this.pageSize;
    //  this.initialize();
    }
  }

  Edit(rowdata) {
    this.istrue = true;
    this.details = rowdata;
    this.showWallet(this.details.CustomerId);
    //this.router.navigateByUrl("layout/trade/customer-edit/" + this.details.CustomerId);
  }

  addAmount(customerWallet)
  {
    
    this.CustomerWalletDc={
      CustomerId: customerWallet.CustomerId,
      Walletpoints:customerWallet.Walletpoints,
      Comments:customerWallet.Comments
    }
    if (this.CustomerWalletDc.Walletpoints == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Please enter wallet Points!!', detail: '' });
      return;
    }
    else if (this.CustomerWalletDc.Comments == undefined || this.CustomerWalletDc.Comments=="") {
      this.messageService.add({ severity: 'error', summary: 'Please enter Valid Reason!!', detail: '' });
      return;
    }
    else
    {
    this.customerservice.addWalletAmount(this.CustomerWalletDc).subscribe(x => {
      if (x) {
        this.messageService.add({ severity: 'success', summary: 'Add Wallet Point Sucessfully!!', detail: '' });
        this.showWallet(this.details.CustomerId);
      }
   
    })
    }
  }

  showWallet(CustomerId)
  {
    this.customerservice.GetWalletDetails(CustomerId).subscribe(result => {
      this.customerWallet = result.customerWalletDc;
      this.CustomerWalletHistory=result.customerWalletHistoryDc;
    })
  }
}

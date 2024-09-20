import { Component, OnInit } from '@angular/core';
import { CustomerFilters } from 'app/shared/interface/trade/customer-filters';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-shopping-cart',
  templateUrl: './customer-shopping-cart.component.html',
  styleUrls: ['./customer-shopping-cart.component.scss']
})
export class CustomerShoppingCartComponent implements OnInit {
  customerFilterPage:CustomerFilters;
  pageSize: number;
  cityList: any[];
  istrue:boolean;
  lstData: any[];
  totalRecords: number;
  details: any;
  blocked: boolean;
  constructor(private ItemService : TradeitemmasterService, private router: Router,
    private customerService: TradeCustomerService,private messageService: MessageService) { }

  ngOnInit() {
    this.pageSize = 15;
    this.customerFilterPage = {
      City: "",
      CreatedDateStart: null,
      CreatedDateEnd: null,
      Skip: 0,
      Take: this.pageSize,
      SearchKeyWords: ""

    }

    this.ItemService.SelectCity().subscribe(result => {
      this.cityList = result;
    });
this.initialize();
  }

  private initialize() {
    this.blocked = true;
    this.customerService.GetCxSearchPage(this.customerFilterPage).subscribe(result => {
      this.blocked = false;
      this.lstData = result.tradeCustomerDc;
      this.totalRecords = result.total;
    });
  }

  OpenCart(rowData)
  {
    this.istrue = true;
    this.details = rowData;
    this.router.navigateByUrl("layout/trade/shopping-cart-details/" + this.details.CustomerId);
  }

  CancelV1(e) {
    this.istrue = e;
  }
  
  load(event) {
    this.customerFilterPage.Skip = event.first;
    this.customerFilterPage.Take = event.rows;
    this.initialize();
  }

  onSearch() {
    if (this.customerFilterPage.City) {
      this.customerFilterPage.Skip = 0;
      this.customerFilterPage.Take = this.pageSize;
      this.initialize();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'PLease Select City !!', detail: '' });
    }
  }
  onGlobalSearch() {
    if (this.customerFilterPage.SearchKeyWords && this.customerFilterPage.SearchKeyWords.length > 2) {
      this.customerFilterPage.Skip = 0;
      this.customerFilterPage.Take = this.pageSize;
      this.initialize();
    }
  }
}

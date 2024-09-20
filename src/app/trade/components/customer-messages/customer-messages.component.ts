import { Component, OnInit } from '@angular/core';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { TradeCustomerPaginator } from 'app/shared/interface/trade/trade-customer-paginator';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';

@Component({
  selector: 'app-customer-messages',
  templateUrl: './customer-messages.component.html',
  styleUrls: ['./customer-messages.component.scss']
})
export class CustomerMessagesComponent implements OnInit {
  paginator: TradeCustomerPaginator;
  rowCount: number;
  list: any[];
  cols: any[];
  totalRecords: number;
  selectedList: any[];
  message: string;
  cityid: any;
  Id: any;
  blocked: boolean;
  cityLists: any;
  checked: boolean = false;
  constructor(private tradeCustomerService: TradeCustomerService, private ItemServices: TradeitemmasterService, ) { }

  ngOnInit() {
    this.rowCount = 20;
    this.paginator = {
      Contains: '',
      Skip: 0,
      Take: this.rowCount
    };
    this.selectedList = [];
    this.blocked = true;
    this.Id = '';
    this.loadData(this.Id);
    this.ItemServices.GetCityV2().subscribe(result => {
      this.cityLists = result;
      console.log('this.cityListcityList: ', this.cityLists);
    });

    this.cols = [
      { field: 'SkCode', header: 'SkCode' },
      { field: 'CustomerName', header: 'CustomerName' },
      { field: 'Mobile', header: 'Mobile' }

    ];


  }


  loadDataLazy(event) {
    this.paginator.Skip = event.first;
    this.loadData(this.Id);

  }

  onSelection() {
    if (this.checked == true) {
      this.checked = false;
    } else {
      this.checked = true;
    }
  }

  onSelectCustomer(customer) {
    if (customer.isSelected) {
      this.selectedList.push(customer);
    } else {
      this.selectedList = this.selectedList.filter(x => {
        return x.SkCode != customer.SkCode;
      });
    }
  }


  removeCustomer(cust) {
    let listItem = this.list.filter(x => {
      return x.SkCode == cust.SkCode;
    });

    if (listItem && listItem.length > 0) {
      listItem[0].isSelected = 0;
    }
    this.selectedList = this.selectedList.filter(x => {
      return x.SkCode != cust.SkCode;
    });
  }


  updateCustomerList() {
    if (this.list && this.list.length > 0 && this.selectedList && this.selectedList.length > 0) {
      this.selectedList.forEach(x => {
        let result = this.list.filter(y => {
          return y.SkCode == x.SkCode;
        });
        if (result && result.length > 0) {
          result[0].isSelected = true;
        }
      })
    }
  }

  onContainChange() {
    this.loadData(this.Id);
  }

  onCustomerlist(Id) {
    this.cityid = Id;
    //this.isList = true; 
    this.blocked = true;
    this.loadData(this.cityid);
  }

  sendMessages() {
    if (!this.selectedList || this.selectedList.length < 1) {
      alert('select atleast one customer');
    } else if (!this.message) {
      alert('inser message');
    } else {

      this.tradeCustomerService.SendCustomerMessageList({ TradeCustomerViewModelList: this.selectedList, Message: this.message })
        .subscribe(result => {
          this.message = '';
          this.selectedList = [];
          this.loadData(this.Id);
          alert('message are sent successfully');
        });
    }

  }

  private loadData(cityId) {
    this.tradeCustomerService.GetCustomerMessageList(cityId).subscribe(data => {
      this.blocked = false;;
      this.totalRecords = data.Count;
      this.list = data.TradeCustomerViewModelList;
      this.updateCustomerList();
    });
  }

}




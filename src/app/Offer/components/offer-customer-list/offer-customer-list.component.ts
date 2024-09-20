import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OfferService } from 'app/offer/Service/offer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-offer-customer-list',
  templateUrl: './offer-customer-list.component.html',
  styleUrls: ['./offer-customer-list.component.scss']
})
export class OfferCustomerListComponent implements OnInit {
  @Input() getRowData: any;
  allCustomers;
  allCustomersEarch;
  @Output() closePopup = new EventEmitter();
  activeStatus;
  row: number = 10;
  searchKeyVal
  constructor(
    public offerservice: OfferService,
    private exportService: ExportServiceService,
  ) { }

  ngOnInit() {
    // this.customerGetAllList();
  }
  exportData() {
    console.log(this.allCustomers);

    this.exportService.exportAsExcelFile(this.allCustomers, 'OfferHistory');
  }

  load() { // get all customer list
    this.offerservice.getAllCustomerListByOrderId(this.getRowData.OfferId).subscribe(res => {
      console.log(res, 'res');
      this.allCustomers = res;
      this.allCustomersEarch = res;
      this.searchData(this.searchKeyVal);
    })
  }

  search() {
    this.load();
    let textValue = this.searchKeyVal;
    this.searchData(textValue);
  }

  clearData() {
    this.load();
    this.searchKeyVal = '';
  }

  searchData(textValue) {
    let filteredList = [];
    filteredList = Object.assign([], this.allCustomers).filter(
      item =>
        item.HubName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.BillDiscountType.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.CustomerName.toString().toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.OfferCode.toString().toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.Skcode.toString().toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.OrderID.toString().indexOf(textValue) > -1
        || item.OrderAmount.toString().indexOf(textValue) > -1
        || item.Amount.toString().indexOf(textValue) > -1
        || item.OrderAmount.toString().indexOf(textValue) > -1
        || item.IsScratchBDCode.toString().toLowerCase().indexOf(textValue.toLowerCase()) > -1
    );
    if (filteredList.length) {
      this.allCustomersEarch = filteredList;
    }
    else {
      if (textValue == '') {
        this.load();
      }
      else {
        this.allCustomers = [];
      }
    }
    let filteredListData = this.allCustomersEarch.filter(wh => this.allCustomers.indexOf(wh) >= 0);
    if (!(filteredListData.length == 0)) {
      filteredListData.splice(10, this.allCustomers.length - 10);
      this.allCustomers = filteredListData;
    }
    else {
      filteredListData = [];
      this.allCustomers = [];
      this.allCustomers.length = 0
    }
  }



}

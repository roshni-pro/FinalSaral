import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { CustomerLedgerConsentPager } from 'app/shared/interface/customer-ledger-consent-pager';
import { CustomerLedgerConsentService } from 'app/shared/services/customer-ledger-consent.service';
import { CustomerLedgerConsentVM } from 'app/shared/interface/customer-ledger-consent-vm';

@Component({
  selector: 'app-customer-ledger-consent',
  templateUrl: './customer-ledger-consent.component.html',
  styleUrls: ['./customer-ledger-consent.component.scss']
})
export class CustomerLedgerConsentComponent implements OnInit {
  @Input() CustomerId: number;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  CustomerLedgerConsentPager: CustomerLedgerConsentPager;
  customerLedgerConsentVM: CustomerLedgerConsentVM;
  searchList: any;
  isInvalid: boolean;
  customerList: any[];
  warehouses: any[];
  selecteditem: any;
  selectedcustomer: any;
  customerlistpage: any;
  PageLists: any[];
  totalcount: any;
  selectcustomertList: any[];
  customerledger: any[] = [];
  Name: any;
  firstLoad: boolean = true;
  yearRangeForCalender:string;
  constructor(private customerledgerconsentService: CustomerLedgerConsentService,
  private messageService: MessageService,
  private router: Router,
  ) {


  }

  ngOnInit() {
    this.yearRangeForCalender = '2016:';
    this.yearRangeForCalender += (new Date()).getFullYear();
    this.searchList = {};
    this.selectcustomertList = [];
    this.isInvalid = false;
    this.customerledgerconsentService.WarehouseGetByID().subscribe(result => {
      this.warehouses = result;
    })
    this.initializePaginator();
  }
  initializePaginator() {
    this.CustomerLedgerConsentPager = {
      SkipCount: 0,
      Take: 10,
      Name: "",
      CustomerId: null,
      WarehouseId: 0

    };
    this.selecteditem = {
      CustomerId: 0,
      Name: null

    }
    this.customerLedgerConsentVM = {
      Id: null,
      Name: null,
      customerledgerconsentdetails: [],
      StartDate:null,
      EndDate:null
    }


  }

  loadLazy(event: LazyLoadEvent) {
    
    setTimeout(() => {
      if (this.CustomerLedgerConsentPager) {
      
        this.CustomerLedgerConsentPager.SkipCount = event.first;
        this.CustomerLedgerConsentPager.Take = event.rows;
        this.searchonLoad();
      }
    }, 100);
  }


  getcustomerList(event, WarehouseId) {
    if (event.query.length > 2) {
      this.customerledgerconsentService.GetBylist(event.query, WarehouseId)
        .subscribe(result => {
         
          this.customerList = result;
          //this.Percentage = 0;
          console.log("  this.customerList", this.customerList)
        });
    }

  }

  onmodelChange(customerLists) {
    var isexist = false;
    if (this.selecteditem != null) {
      this.selecteditem.forEach(element => {
        if (element.CustomerId == customerLists.CustomerId) {
          isexist = true;
        }
      });
    }


  }
  onsearch(WarehouseName) {
    console.log("WarehouseId", WarehouseName)
  }

  search() {
      if (this.selectedcustomer) {
        if (this.selectedcustomer.CustomerId) {
          this.CustomerLedgerConsentPager.CustomerId = this.selectedcustomer.CustomerId;
        }
        else {
          this.CustomerLedgerConsentPager.Name = this.selectedcustomer;
          this.CustomerLedgerConsentPager.CustomerId = 0;
  
        }
      } 
      this.customerledgerconsentService.GetSearch(this.CustomerLedgerConsentPager).subscribe(result => {
        this.customerlistpage = result;
        
        this.totalcount = this.customerlistpage.Count;
        this.PageLists = this.customerlistpage.PageList;
        
      })
    
  }


  searchonLoad() {
    if(this.CustomerLedgerConsentPager.WarehouseId>0){
      if (this.selectedcustomer) {
        if (this.selectedcustomer.CustomerId) {
          this.CustomerLedgerConsentPager.CustomerId = this.selectedcustomer.CustomerId;
        }
      } else {
        this.CustomerLedgerConsentPager.Name = this.selectedcustomer;
        this.CustomerLedgerConsentPager.CustomerId = 0;

      }
      this.customerledgerconsentService.GetSearch(this.CustomerLedgerConsentPager).subscribe(result => {
        this.customerlistpage = result;
        this.totalcount = this.customerlistpage.Count;
        this.PageLists = this.customerlistpage.PageList;
        if (this.selectcustomertList.length > 0) {
          this.checkUncheckedData();
          }
      })
    }
  }


  onClickCustomer(row) {
    
    if (!row.IsChecked) {
      let newRow = this.selectcustomertList.filter(x => { return x.Id == row.Id })[0];
      let index = this.selectcustomertList.indexOf(newRow);
      this.selectcustomertList.splice(index, 1);
    } else {
      this.selectcustomertList.push(row);
    }
  }
  save(data, CustomerForm) {
    if (CustomerForm.form.status == "VALID") {
      for (var i in data) {
        this.customerLedgerConsentVM.customerledgerconsentdetails.push(
          {
            Id: null,
            MasterId: null,
            CustomerId: data[i].CustomerId,
            Consent: ''
          });
        // postData.push({ CustomerId: data[i].CustomerId });

      }

      this.customerledgerconsentService.Save(this.customerLedgerConsentVM).subscribe(result => {
        
        this.messageService.add({ severity: 'success', summary: 'Saved Successfully!', detail: '' });
        alert('Saved Successfully');
        this.customerlistpage = result;
      })
        this.router.navigateByUrl('layout/Account/ledgerconsentlist');
      //this.refreshParent.emit();
      this.Name = ''
      // this.customerlistpage = [];
      this.selectcustomertList = [];
    }
    else {
      this.isInvalid = true;
    }
  }

  cancel() {
    this.PageLists.forEach(custObj => {
      custObj.IsChecked = false;
     
    });
    this.onCancelinitialize();
  }
  onCancelinitialize(){
    this.selectcustomertList=[];
    this.customerLedgerConsentVM = {
      Id: null,
      Name: null,
      customerledgerconsentdetails: [],
      StartDate:null,
      EndDate:null

    }
  }
  checkUncheckedData(){
    this.selectcustomertList.forEach(selectObj => {
        this.PageLists.forEach(custObj => {
          if (selectObj.CustomerId == custObj.CustomerId) {
            custObj.IsChecked = true;
          }
        });
      });
    }


  
}

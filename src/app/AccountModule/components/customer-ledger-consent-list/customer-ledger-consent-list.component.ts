import { Component, OnInit } from '@angular/core';
import { CustomerLedgerConsentService } from 'app/shared/services/customer-ledger-consent.service';
import * as moment from 'moment';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { CustomerLedgerMessagePager } from 'app/shared/interface/customer-ledger-message-pager';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { stringify } from 'querystring';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-customer-ledger-consent-list',
  templateUrl: './customer-ledger-consent-list.component.html',
  styleUrls: ['./customer-ledger-consent-list.component.scss']
})
export class CustomerLedgerConsentListComponent implements OnInit {
  blocked: boolean;
  constructor(private customerledgerconsentService: CustomerLedgerConsentService,
    private messageService: MessageService,
    private router: Router,
    private exportService: ExportServiceService,
  ) { }
  customerLedgerMessagePager: CustomerLedgerMessagePager;
  warehouseList: any[];
  searchModel: any;
  customerconsentList: any[];
  rowSize: any;
  totalRecordCount: any;
  totalRecordCountMsgSend: any;
  customermegsendlist: any[];
  isOpenPopup: any;
  customerpagerSendLis: any;
  exportData:any;
  ngOnInit() {
    this.getWarehouseList();
    this.intializeSearchModel();
    this.searchByFilter();
  }
  getWarehouseList() {
    this.customerledgerconsentService.WarehouseGetByID().subscribe(result => {
      this.warehouseList = result;
    });
  }
  intializeSearchModel() {
    this.rowSize = 10;
    this.searchModel = {
      FromDate: null,
      ToDate: null,
      Skip: 0,
      Take: this.rowSize,
      Name: null,
      IsConsent:false
    }
    this.isOpenPopup = false;
    this.customerLedgerMessagePager = {
      Name: null,
      Id: 0,
      SkipCount: 0,
      Take: this.rowSize

    }
  }
  searchByFilter() {
    
    this.searchModel.Skip = 0;
    this.searchModel.Take = this.rowSize;
  
    this.search(null);
  }

  clear() {
    this.searchModel = {
      FromDate: null,
      ToDate: null,
      Skip: 0,
      Take: this.rowSize,
      Name: null,
    }
    this.search(null);
  }
  search(event) {
    if (event) {
      this.searchModel.Skip = event.first;
      this.searchModel.Take = event.rows;
      this.searchModel.FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('MM/DD/YYYY HH:mm:ss') : null
      this.searchModel.ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('MM/DD/YYYY HH:mm:ss') : null
      this.searchModel.IsConsent=event.IsConsent;
    }
  
    this.customerledgerconsentService.GetCustomerconsentList(this.searchModel).subscribe(result => {
       
       result.PageList.forEach(element => {
        if(element.ConsentStatus==1){
          element.ConsentStatus='pending';
        }else if(element.ConsentStatus==2){
          element.ConsentStatus='approved';
        }else if(element.ConsentStatus==3){
          element.ConsentStatus='reject';
        }else if(element.ConsentStatus==4){
          element.ConsentStatus='auto approve';
        }
      });
      this.customerconsentList = result.PageList;
      this.totalRecordCount = result.Count;
      

    });
  }

  loadLazyMessageSend(event: LazyLoadEvent) {
  
    setTimeout(() => {
      if (this.customerLedgerMessagePager) {
        
        this.customerLedgerMessagePager.SkipCount = event.first;
        this.customerLedgerMessagePager.Take = event.rows;
        this.msgCustomerList(this.customerLedgerMessagePager.Id);
      }
    }, 100);
  }
  msgCustomerList(Id) {
    
    if (Id > 0) {
      this.customerLedgerMessagePager.Id = Id;
    }
    this.isOpenPopup = true;
    this.customerledgerconsentService.GetMsgSendCustomerList(this.customerLedgerMessagePager).subscribe(result => {
      this.customerpagerSendLis = result;
      this.customermegsendlist = this.customerpagerSendLis.PageList;
      this.totalRecordCountMsgSend = this.customerpagerSendLis.Count;
    });

  }
  redirectConsent() {
    this.router.navigateByUrl("layout/Account/customerledgerconsent");

  }

  generateReport() {
    window.open(environment.apiURL + '/Reports/customer_ledger_consent.xlsx');

  }

  onUpload(event, uploadCustom) {
    this.blocked = true;

    try {
      console.log('uploadCustom: ', uploadCustom);
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = event.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        var dataFromExcel = jsonData;
        // const dataString = JSON.stringify(jsonData);
        console.log('dataFromExcel: ', dataFromExcel);
        let skCodeList: any[] = dataFromExcel.Sheet1;
        let newSkCodeList = [];
        if (skCodeList && skCodeList.length > 0) {
          skCodeList.forEach(x => {
            newSkCodeList.push(x.SkCode);
          });

        }
        console.log(newSkCodeList);
        console.log('newSkCodeList: ', newSkCodeList);
        //this.paymentList = dataFromExcel.Sheet1;

        console.log('event is: ', event);

        if (newSkCodeList && newSkCodeList.length > 0) {
          this.customerledgerconsentService.UploadNewCustomerList(newSkCodeList)
            .subscribe(x => {
              console.log('file uploaded successfully');
              uploadCustom.files = null;
              this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully', detail: 'Order submitted' });
              this.intializeSearchModel();
              this.searchByFilter();
              this.blocked = false;
            });
        }
      }

      reader.readAsBinaryString(file);

    }
    catch(exception){
      this.blocked = false;
    }
   
  }

  exportExcel(){
    
  this.customerledgerconsentService.ExportConsent(this.searchModel).subscribe(result => {
    this.exportData = result;
    this.exportData.forEach(element => {
      if(element.ConsentStatus==1){
        element.ConsentStatus='pending';
      }else if(element.ConsentStatus==2){
        element.ConsentStatus='approved';
      }else if(element.ConsentStatus==3){
        element.ConsentStatus='reject';
      }else if(element.ConsentStatus==4){
        element.ConsentStatus='auto approve';
      }
    });
    this.exportService.exportAsExcelFile(this.exportData, 'consent');
    
  })

}

}

import { Component, OnInit } from '@angular/core';
import { LadgerService } from 'app/shared/services/ladger.service';
import { PagerDataV7 } from 'app/shared/interface/pager-data-v7';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem, MenuItem } from 'primeng/api';
import { AccountgroupService } from 'app/shared/services/accountgroup.service';
import * as moment from 'moment';
import { LadgerEntryService } from 'app/shared/services/ladger-entry.service';
import { Ladger } from 'app/shared/interface/ladger';
import { CustomerLedgerService } from 'app/shared/services/customer-ledger.service';
import { environment } from 'environments/environment';
import { LedgerTypeUIService } from 'app/shared/services/ledger-type-ui.service';
import { HttpClient } from '@angular/common/http';
import { AnyARecord } from 'dns';
import { DateFormatorService } from 'app/shared/services/date-formator.service';


@Component({
  selector: 'app-ladger-report',
  templateUrl: './ladger-report.component.html',
  styleUrls: ['./ladger-report.component.scss']
})
export class LadgerReportComponent implements OnInit {
  ladgerList: any[];
  pager: PagerDataV7;
  cols: any[];
  totalRecords: number;
  isLoading: boolean;
  accountList: any[];
  ledgerList: Ladger[];
  selectedLedger: any;
  ledgerEntryGroup: any[];
  inputModel: any = {
    LedgerID: null,
    FromDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1),
    ToDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()),
    IsGenerateExcel: true,
    LedgerTypeID: null
  };
  isInvalid: boolean;
  selectedOrderType: string;
  reportTypeList: SelectItem[];
  customerLedgerData: any;
  ledgerTypeList: any[];
  blocked: boolean;
  ledgerCode: string;
  depoList: any[];
  yearRangeForCalender: string;
  poid: number;
  apiURL: string;
  IsShowId: any;

  constructor(private ladgerEntryService: LadgerEntryService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private customerLedgerService: CustomerLedgerService,
    private ledgerService: LadgerService,
    private ledgerTypeUIService: LedgerTypeUIService,
    private http: HttpClient,
    private dateFormatorService: DateFormatorService
  ) {

    this.isLoading = false;
  }

  ngOnInit() {
    this.yearRangeForCalender = '2016:';
    this.yearRangeForCalender += (new Date()).getFullYear();
    this.blocked = false;
    this.isInvalid = false;
    this.cols = [
      { field: 'Date', header: 'Date', widthClass: 'wdt-id', isWidthClassApplied: true, isSortable: true },
      { field: 'Particulars', header: 'Particulars', widthClass: '', isWidthClassApplied: false, isSortable: true },
      { field: 'Debit', header: 'Debit', widthClass: '', isWidthClassApplied: false, isSortable: true },
      { field: 'Credit', header: 'Credit', widthClass: '', isWidthClassApplied: false, isSortable: false },
    ];

    this.reportTypeList = [
      { label: 'Detailed', value: 'DR' },
      { label: 'Summary', value: 'SR' },
      { label: 'Match', value: 'MT' }
    ]

    this.inputModel = {
      LedgerID: null,
      FromDate: this.dateFormatorService.getTodayDatePlusDaysinDDdMMdYYYYString(-30),
      ToDate: this.dateFormatorService.getTodayDateinDDdMMdYYYYString(),
      IsGenerateExcel: true,
      LedgerTypeID: null,
      ReportCode: this.reportTypeList[0].value,
      DepoId: null
    };

    this.selectedOrderType = this.reportTypeList[1].value;
    this.pager = {
      Contains: '',
      ColumnName: 'ID',
      First: 1,
      Last: 10,
      IsAscending: true
    };

    this.ledgerTypeUIService.getAll()
      .subscribe(result => {
        this.ledgerTypeList = result;
        this.inputModel.LedgerTypeID = this.ledgerTypeList[0].ID;
        this.ledgerCode = this.ledgerTypeList[0].code;
        console.log('result: ', this.ledgerTypeList);
      });
    this.inputModel.AgentReportType = 'TR';

    this.apiURL = environment.apiURL;
  }

  generate(form) {
    console.log('form is: ', form);
    console.log(this.inputModel)
    this.ledgerEntryGroup = null
    if (form.status != "INVALID") {
      let viewModel = JSON.parse(JSON.stringify(this.inputModel));
      viewModel.FromDate =  this.dateFormatorService.getMMdDDdYYYYFromDDdMMdYYYYString(viewModel.FromDate);
      viewModel.ToDate = this.dateFormatorService.getMMdDDdYYYYFromDDdMMdYYYYString(viewModel.ToDate);
      
      this.blocked = true;
      this.ladgerEntryService.getCustomerLedger(viewModel)
        .subscribe(result => {
          this.blocked = false;
          this.customerLedgerData = result;
          this.onReportTypeChange();
          console.log('this.customerLedgerData: ', this.customerLedgerData);
        });
    }
    else {
      this.isInvalid = true;
    }
  }

  onReportTypeChange() {

    if (this.selectedOrderType == 'DR') {
      this.makeGroupByList();
    } else if (this.selectedOrderType == 'SR') {
      this.makeAllOrderList();
    }
    else {
      this.makeAllOrderList();
    }
  }
  getLedgerList(event) {
    if (event.query.length > 2) {
      this.ledgerService.getByName(event.query, this.inputModel.LedgerTypeID)
        .subscribe(result => {
          
          this.ledgerList = result;
          console.log('this.ledgerList :', this.ledgerList);
        });
    }

  }

  onSelectLedger() {
    this.inputModel.LedgerID = this.selectedLedger.ID;
    if (this.inputModel.LedgerTypeID == 12) {
      this.inputModel.DepoId = null;
      this.getdepoList();
    }
  }

  generateReport(isExcelGenerated: boolean, form) {
    if (form.status != "INVALID") {
      let viewModel = JSON.parse(JSON.stringify(this.inputModel));
      viewModel.FromDate =  this.dateFormatorService.getMMdDDdYYYYFromDDdMMdYYYYString(viewModel.FromDate);
      viewModel.ToDate = this.dateFormatorService.getMMdDDdYYYYFromDDdMMdYYYYString(viewModel.ToDate);
      viewModel.IsGenerateExcel = isExcelGenerated;
      this.blocked = true;
      this.customerLedgerService.generateReport(viewModel)
        .subscribe(result => {
          this.blocked = false;
          console.log('result is: ', result);
          if (result) {
            window.open(environment.apiURL + '/' + result);
          }
          else {
            this.messageService.add({ severity: 'fail', summary: 'No data found!', detail: '' });
          }
        });
    }
    else {
      this.isInvalid = true;
    }

  }

  onLedgerTypeChange() {
    this.inputModel.LedgerID = null;
    this.selectedLedger = null;
    let list = this.ledgerTypeList.filter(x => {
      return x.ID == this.inputModel.LedgerTypeID;
    });
    this.ledgerCode = list[0].code;
    console.log('this.ledgerCode: ', this.ledgerCode);
  }

  downloadConsolidatedLadger() {
   
    if (this.inputModel.FromDate && this.inputModel.ToDate) {
      try {
        let fromdate = this.dateFormatorService.getMMdDDdYYYYFromDD_MM_YYYYString(this.inputModel.FromDate);
        let todate = this.dateFormatorService.getMMdDDdYYYYFromDD_MM_YYYYString(this.inputModel.ToDate);
        //let fromdate = moment(this.inputModel.FromDate).format('YYYY-MM-DD');
        //let todate = moment(this.inputModel.ToDate).format('YYYY-MM-DD');
        if (fromdate && todate) {
          if (this.inputModel.LedgerTypeID == 1) {
            // this.ledgerService.customerConsolidatedLedger(fromdate, todate).subscribe(result => {
            //   window.open(environment.apiURL + '/' + result);
            //   this.messageService.add({ severity: 'success', summary: 'Genetaed successfully!', detail: '' });
            // });
            this.confirmationService.confirm({
              message:'This query is suspect of heavy database usage, and not available now. Please contact with shailesh - shailesh.sharma@shopkirana.com , for report',
              header:'Warning/Error',
              accept: ()=>{},
              reject: ()=>{}
            })
          }
          else if (this.inputModel.LedgerTypeID == 12) {
            this.ledgerService.supplierConsolidatedLedger(fromdate, todate).subscribe(result => {
              window.open(environment.apiURL + '/' + result);
              this.messageService.add({ severity: 'success', summary: 'Genetaed successfully!', detail: '' });
            });
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Please select fromdate and todate', detail: '' });
        }
      }
      catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Something wend wrong!', detail: '' });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please select fromdate and todate', detail: '' });
    }


  }

  private makeGroupByList() {
    if (this.customerLedgerData && this.customerLedgerData.LadgerEntryList && this.customerLedgerData.LadgerEntryList.length > 0) {
      // this.customerLedgerData.LadgerEntryList.reduce()
      let group = this.customerLedgerData.LadgerEntryList.reduce((r, a) => {
        // console.log("a", a);
        // console.log('r', r);
        r[a.ObjectID] = [...r[a.ObjectID] || [], a];
        return r;
      }, {});

      let keyList = Object.keys(group);

      this.ledgerEntryGroup = [];
      keyList.forEach(key => {
        let obj = {
          orderList: group[key],
          debitSum: 0,
          creditSum: 0
        };
        let debitSum = 0;
        let creditSum = 0;

        debitSum = group[key].reduce((debitSum, elem) => {
          return debitSum + (elem.Debit ? elem.Debit : 0);
        }, 0);
        creditSum = group[key].reduce((creditSum, elem) => {
          return creditSum + (elem.Credit ? elem.Credit : 0);
        }, 0);

        obj.debitSum = Math.round(debitSum);
        obj.creditSum = Math.round(creditSum);
        this.ledgerEntryGroup.push(obj);
      })

    }
  }

  private makeAllOrderList() {
    if (this.customerLedgerData && this.customerLedgerData.LadgerEntryList && this.customerLedgerData.LadgerEntryList.length > 0) {
      let obj = {
        orderList: this.customerLedgerData.LadgerEntryList,
        debitSum: 0,
        creditSum: 0
      };
      let debitSum = 0;
      let creditSum = 0;
      debitSum = this.customerLedgerData.LadgerEntryList.reduce((debitSum, elem) => {
        return debitSum + (elem.Debit ? elem.Debit : 0);
      }, 0);
      creditSum = this.customerLedgerData.LadgerEntryList.reduce((creditSum, elem) => {
        return creditSum + (elem.Credit ? elem.Credit : 0);
      }, 0);

      obj.debitSum = Math.round(debitSum);
      obj.creditSum = Math.round(creditSum);
      this.ledgerEntryGroup = [obj];
    }
  }


  OpenledgerEntry() {
    this.router.navigateByUrl('layout/Account/ladgerentry/add');
  }

  generateReportExcel(isExcelGenerated: boolean, form) {

    if (form.status != "INVALID") {
      let viewModel = JSON.parse(JSON.stringify(this.inputModel));
      viewModel.FromDate =  this.dateFormatorService.getMMdDDdYYYYFromDDdMMdYYYYString(viewModel.FromDate);
      viewModel.ToDate = this.dateFormatorService.getMMdDDdYYYYFromDDdMMdYYYYString(viewModel.ToDate);
      viewModel.IsGenerateExcel = isExcelGenerated;
      this.blocked = true;
      this.customerLedgerService.generateReportExcel(viewModel)
        .subscribe(result => {
          this.blocked = false;
          console.log('result is: ', result);
          if (result) {
            window.open(environment.apiURL + '/' + result);
          }
          else {
            this.messageService.add({ severity: 'fail', summary: 'No data found!', detail: '' });
          }
        });
    }
    else {
      this.isInvalid = true;
    }

  }

  getdepoList() {
    if (this.inputModel.LedgerID != null) {
      this.ledgerService.GetDepoList(this.inputModel.LedgerID)
        .subscribe(result => {
          this.depoList = result;
          console.log('this.depoList :', this.depoList);
        });

    }

  }

  redirectIr(id) {

    
    if (id > 0) {
      this.ledgerService.GetPOIDId(id)
        .subscribe(result => {
          this.poid = result;
          this.IsShowId = id;

        });

    }
  }
}

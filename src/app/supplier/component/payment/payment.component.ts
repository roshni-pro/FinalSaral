import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { LadgerService } from 'app/shared/services/ladger.service';
import { VoucherTypeService } from 'app/shared/services/voucher-type.service';
import { LadgerEntryService } from 'app/shared/services/ladger-entry.service';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  inputModel: any
  supplierList: any;
  selectedSupplier: any;
  isInvalid: boolean;
  paymentList: any[];
  cols: any;
  bankTypeLedgerList: any[];
  voucherTypeList: any[];
  sucessList: any;
  constructor(private supplierService: SupplierService,
    private messageService: MessageService,
    private ladgerService: LadgerService,
    private voucherTypeService: VoucherTypeService,
    private router : Router,
    private ladgerEntryService: LadgerEntryService) { this.inputModel = {} }

  ngOnInit() {
    this.cols = [
      { field: 'Date', header: 'Date', },
      { field: 'Particulars', header: 'Particulars', },
      { field: 'VchType', header: 'VchType', },
      { field: 'VchNo', header: 'VchNo', },
      { field: 'Debit', header: 'Debit', },
    ]

    this.ladgerService.getBankTypeLedger().subscribe(result => {
      this.bankTypeLedgerList = result;
      console.log('this.bankTypeLedgerList: ', this.bankTypeLedgerList);
    });

    this.voucherTypeService.GetAllVoucherType().subscribe(result => {
      this.voucherTypeList = result;
      console.log('this.voucherTypeList: ', this.voucherTypeList);
    });
  }
  getSupplierList(event) {
    if (event.query.length > 2) {
      this.supplierService.getByName(event.query)
        .subscribe(result => {
          this.supplierList = result;
          console.log('this.supplierList :', this.supplierList);
        });
    }
  }

  onSelectSupplier() {
    this.inputModel.SupplierId = this.selectedSupplier.SupplierId;
  }
  generateReport(isExcelGenerated: boolean, form) {
    this.inputModel.IsGenerateExcel = isExcelGenerated;
    window.open(environment.apiURL + '/Reports/sp_payment.xlsx');

  }

  onUpload(event) {
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
      const dataString = JSON.stringify(jsonData);
      console.log(dataFromExcel)
      console.log(dataString);
      this.paymentList = dataFromExcel.Sheet1;
      this.filterPaymentList();
      this.messageService.add({
        severity: 'info',
        summary: 'File Uploaded',
        detail: ''
      });
    }
    reader.readAsBinaryString(file);
  }

  getjson(dataString) {
    console.log(dataString.Sheet1);
    for (var i in dataString.Sheet1) {
      console.log(dataString.Sheet1[i]);
      console.log(dataString.Sheet1[i].Particulars);
    }
  }

  filterPaymentList() {
    if (this.paymentList && this.paymentList.length > 0) {
      this.paymentList.forEach(element => {
        element.Date = new Date(element.Date);
        element.isEditable = false;
        element.AffectedLadgerID = this.getAffactedLedgerID(element.Particulars);
        element.VouchersTypeID = this.getVoucherTypeList(element.VchType);
        element.Particulars = element.VouchersNo;
        element.LagerID = this.inputModel.SupplierId;
        element.class = '';
      });
    }
  }

  editRow(row) {
    this.paymentList.forEach(element => {
      element.isEditable = false;
    });
    row.isEditable = true;
  }


  discardSupplier() {
    this.inputModel.SupplierId = null;
    this.selectedSupplier = null;
    this.paymentList = null;
  }

  private getAffactedLedgerID(Particulars) {
    if (this.bankTypeLedgerList && this.bankTypeLedgerList.length > 0) {
      var item = this.bankTypeLedgerList.filter(element => {
        return element.Name.toLowerCase() == Particulars.toLowerCase();
      });
      if (item && item.length > 0) {
        return item[0].ID;
      } else {
        return "";
      }
    }
  }

  private getVoucherTypeList(VchType) {
    if (this.voucherTypeList && this.voucherTypeList.length > 0) {
      var item = this.voucherTypeList.filter(element => {
        return element.Name.toLowerCase() == VchType.toLowerCase();
      });

      if (item && item.length > 0) {
        return item[0].ID;
      } else {
        return null;
      }
    }
  }


  save() {

    this.ladgerEntryService.uploadAll(this.paymentList).subscribe(result => {
    
      this.updateDate(result);
      let list = result.filter(element => {
        return element.ID > 0;
      })
      if (!this.sucessList) {
        this.sucessList = list;
      }
      else {
        this.sucessList = this.sucessList.concat(list);
      }



      this.paymentList = result.filter(element => {
        return !element.ID;
      })

      this.updateSucessAndFailList();
      console.log('after success: ', result);
    });
    //console.log(paymentList);
  }

  updateDate(list) {
    if (list && list.length > 0) {
      list.forEach(element => {
        element.Date = new Date(element.Date);
        element.isEditable = false;
      });
    }
  }

  updateSucessAndFailList(){
   
    if(this.paymentList && this.paymentList.length > 0){
      this.paymentList.forEach(element =>{
        element.class = 'fail';
      });  
    }
  }
  manualLager(){
    this.router.navigateByUrl('layout/supplier/manual-ladger');
  }
}
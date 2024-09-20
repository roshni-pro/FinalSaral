import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ExportServiceService } from 'app/shared/services/export-service.service';
@Component({
  selector: 'app-supplierpayment',
  templateUrl: './supplierpayment.component.html',
  styleUrls: ['./supplierpayment.component.scss']
})
export class SupplierpaymentComponent implements OnInit {

  constructor(private supplierService: SupplierService, private messageService: MessageService, private router: Router, private exportserivce: ExportServiceService) { }
  cols: any[];
  supplierdisble: boolean;
  irList: any[];
  supplierList: any[];
  SupplierId: any;
  BankId: any;
  bankList: any[];
  selectedSupplier: any;
  selectIRList: any[];
  totalremainingamount: any;
  datatopost: any;
  hideshow: boolean;
  selectbill: boolean;
  disblebankinfo: boolean;
  isLoading: boolean;
  paymentDate: any;
  isDisableRemark: boolean;
  selectedAdvacePaymentId: any;
  IRTotalAmount: any;
  yearRangeForCalender:string;
  searchModel:any;
  disbleselectbill:boolean;
  disbleselectbilladjust:boolean;
  inputModeladdjustment: any = {
    Id: 0,
    SupplierId: null,
    BankId: 0,
    refno: null,
    amount: 0,
    remark: null,
    Guid: null,
    paymentDate: null
  };
  advancePaymentList: any[];
  paymentList: any;
  inputModel: any = {
    Id: 0,
    SupplierId: null,
    BankId: "",
    refno: null,
    amount: "",
    remark: null,
    Guid: null,
    paymentDate: null,
    depoID: null
  };


  tabs: any[] = [{
    Id: "tab1",
    Code: "SupplierPayment"
  },
  {
    Id: "tab2",
    Code: "Adjustment"
  },
  {
    Id: "tab3",
    Code: "UploadIRPayment"
  }];
  selectedTab: any = this.tabs[0];
  isInvalid: boolean;
  ngOnInit() {
    this.yearRangeForCalender = '2016:';
    this.yearRangeForCalender += (new Date()).getFullYear();
    this.searchModel={};
    this.isDisableRemark = false;
    this.selectedAdvacePaymentId = '';
    this.supplierdisble = false;
    this.disblebankinfo = false;
    this.totalremainingamount = 0;
    this.IRTotalAmount = 0;
    this.selectbill = false;
    this.disbleselectbill=false;
    this.disbleselectbilladjust=false;
    this.cols = [
      { field: 'SupplierName', header: 'SupplierName' },
      { field: 'POID', header: 'PurchaseOrderId' },
      { field: 'TotalAmountRemaining', header: 'TotalAmount' },
      { field: 'IRID', header: 'IRID' },
      { field: 'POId', header: 'POId' },
      { field: 'PaymentStatus', header: 'PaymentStatus' }

    ];


    this.hideshow = true;
  }

  getSuppplierList(event) {
    if (event.query.length > 2) {
      this.supplierService.getByName(event.query)
        .subscribe(result => {
          this.supplierList = result;

        });
    }

  }

  onChangeAdjustment() {
    console.log('payment: ', this.selectedAdvacePaymentId);
    let item = this.advancePaymentList.filter(x => {
      return x.Id == this.selectedAdvacePaymentId;
    });
    if (item && item.length > 0) {
      this.inputModeladdjustment = item[0];
    } else {
      this.resetAdjustmentModel();
    }
    console.log('this.inputModeladdjustment:', this.inputModeladdjustment);
  }

  onSelectSupplier() {
    this.inputModel.SupplierId = this.selectedSupplier.SupplierId;
    if (this.inputModel.SupplierId > 0) {
      this.disblebankinfo = true;
      this.supplierService.serachIRData(this.inputModel.SupplierId).subscribe(result => {
        this.irList = result;

        result.forEach(item => {
          this.IRTotalAmount += item.TotalAmountRemaining;

        })
        this.IRTotalAmount = parseFloat(this.IRTotalAmount).toFixed(2)
        if (this.irList && this.irList.length > 0) {
          this.irList.forEach(x => {
            x.ReamainingAmt = 0;
            x.IsChecked = false;
          });
        }
      });
    } else {

      this.messageService.add({ severity: 'error', summary: 'Please select any supplier!', detail: '' });
      this.disblebankinfo = false;
    }
  }
  onAdjustSelectSupplier() {
    this.inputModel.SupplierId = this.selectedSupplier.SupplierId;
    if (this.inputModel.SupplierId > 0) {
      this.supplierdisble = true;
      this.disblebankinfo = true;
      this.supplierService.GetBank().subscribe(result => {
        
        this.bankList = result;
        this.inputModel.BankId = this.bankList[1].ID;
      });

      this.supplierService.serachIRData(this.inputModel.SupplierId).subscribe(result => {
        this.irList = result;
        result.forEach(item => {
          this.IRTotalAmount += item.TotalAmountRemaining;

        })
        this.IRTotalAmount = parseFloat(this.IRTotalAmount).toFixed(2)
        if (this.irList && this.irList.length > 0) {
          this.irList.forEach(x => {
            x.ReamainingAmt = 0;
            x.IsChecked = false;
          });
        }
        this.disableIRlist(true);
      });
      this.supplierService.paymentIRData(this.inputModel.SupplierId).subscribe(result => {
        if (result != null && result.length > 0) {
          this.advancePaymentList = [];
          this.hideshow = false;
          result.forEach(item => {
            let temp = {
              Id: item.Id,
              SupplierId: item.SupplierId,
              BankId: item.BankId,
              refno: item.RefNo,
              amount: item.TotalReaminingAmount,
              remark: null,
              Guid: item.Guid
            };
            this.advancePaymentList.push(temp);
          })
          this.inputModeladdjustment = "";
          this.selectedAdvacePaymentId = this.inputModeladdjustment.Id;
          this.totalremainingamount = this.advancePaymentList[0].TotalReaminingAmount;
        } else {
          this.hideshow = true;
          this.messageService.add({ severity: 'error', summary: 'No Adjustment found!', detail: '' });
        }
      });
    }
  }

  save() {
    
    if (this.inputModeladdjustment.BankId > 0) {

      this.inputModel = this.inputModeladdjustment;
    }
    this.inputModel.SupplierId = this.selectedSupplier.SupplierId;
    this.inputModel.paymentDate = this.inputModel.paymentDate ? moment(this.inputModel.paymentDate).format('MM/DD/YYYY HH:mm:ss') : null
    this.datatopost = {
      Id: this.inputModel.Id,
      SupplierId: this.selectedSupplier.SupplierId,
      TotalReaminingAmount: this.totalremainingamount,
      TotalAmount: this.inputModel.amount,
      BankId: this.inputModel.BankId,
      RefNo: this.inputModel.refno,
      Remark: this.inputModel.remark,
      IRList: JSON.stringify(this.selectIRList),
      Guid: this.inputModel.Guid,
      PaymentDate: this.inputModel.paymentDate
    }

    this.supplierService.postIrdetails(this.datatopost).subscribe(result => {
      if (result != null) {
        this.messageService.add({ severity: 'success', summary: 'Add Payment Successfully!', detail: '' });
        this.gotoList();
      }

    });
  }

  onClickIR(row) {
    
    if (!row.IsChecked) {
      let newRow = this.selectIRList.filter(x => { return x.Id == row.Id })[0];
      let index = this.selectIRList.indexOf(newRow);
      this.selectIRList.splice(index, 1);
      this.totalremainingamount += newRow.TotalAmountRemaining;
      return;
    }
    if (this.totalremainingamount <= 0 && row.IsChecked) {
      setTimeout(() => {
        row.IsChecked = false;
      }, 50);
      this.messageService.add({ severity: 'error', summary: 'No remaining amount!', detail: '' });
    }
    else {
      if (!this.selectIRList) {
        this.selectIRList = [];
      }

      // if (this.irList && this.irList.length > 0) {
      //   this.selectIRList = this.irList.filter(x => {
      //     return x.IsChecked;
      //   });
      //   this.selectIRList = JSON.parse(JSON.stringify(this.selectIRList));
      // }
      let newRow = JSON.parse(JSON.stringify(row));
      this.selectIRList.push(newRow);
      // if (this.inputModel.amount) {
      //   this.totalremainingamount = this.inputModel.amount;
      // }
      this.statusChange(newRow);
    }

  }

  statusChange(row: any) {
    //this.totalremainingamount = this.inputModeladdjustment.amount;
    // for (var i = 0; i < this.selectIRList.length; i++) {
   
   this.totalremainingamount=this.totalremainingamount.toFixed(2);
    this.totalremainingamount -= row.TotalAmountRemaining.toFixed(2);
    if (this.totalremainingamount >= 0) {
      row.PaymentStatus = "paid";
      row.IRStatus = "Paid";
      row.ReamainingAmt = 0;
    }
    else if (this.totalremainingamount < 0) {
      row.PaymentStatus = "partial paid";
      row.ReamainingAmt = Math.abs(this.totalremainingamount);
      row.TotalAmountRemaining = row.TotalAmountRemaining - row.ReamainingAmt;

    }
    // }
    if (this.totalremainingamount < 0) {
      this.totalremainingamount = 0;
    }
  }
  trash() {
    this.supplierdisble = false;
    this.irList = null;
    this.supplierList = null;
    this.bankList = null;
    this.selectedSupplier = null;
    this.selectIRList = null;
    this.totalremainingamount = 0;
    this.datatopost = null;
    this.hideshow = true;
    this.disblebankinfo = false;
    this.IRTotalAmount = 0;
    this.disbleselectbill=false;
    this.disbleselectbilladjust=false;
    this.inputModeladdjustment = {
      Id: 0,
      SupplierId: null,
      BankId: 0,
      refno: null,
      amount: 0,
      remark: null,
      Guid: null,
      PaymentDate: null
    };
    this.inputModel = {
      Id: 0,
      SupplierId: null,
      BankId: 0,
      refno: null,
      amount: 0,
      remark: null,
      Guid: null,
      PaymentDate: null

    };
    this.paymentList = null;

  }
  enableIRPayments(form) {
    console.log('form:', form);
    if (form.status == "VALID" || form.status == "DISABLED") {
      
      if (this.inputModel.amount > 0) {
        this.inputModel.showPaymentValidation = false;
        this.inputModel.isDisabled = true;
        this.disableIRlist(false);
        this.selectbill = true;
        this.disblebankinfo = false;
        this.disbleselectbill=true;
        this.totalremainingamount = this.inputModel.amount;
      } else {
        this.messageService.add({ severity: 'error', summary: 'please enter amount greater than zero!', detail: '' });
      }

    } else {
      this.inputModel.showPaymentValidation = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }
  resetIRPayments() {
    this.resetSupplierPayment();
    this.disableIRlist(true);
    this.resetIrListSelectedvalues();
    this.selectIRList = null;
    this.totalremainingamount = 0;
    this.disbleselectbill=false;
    // this.selectbill = false;
    // this.disblebankinfo = true;
    // this.selectIRList = null;
    // this.totalremainingamount = 0;
    // this.irList.forEach(x => x.IsChecked = false);
  }

  redirect() {
    this.router.navigateByUrl("layout/supplier/supplier-payment-list");
  }


  //#region upload payments and download samples
  generateReport() {
    window.open(environment.apiURL + '/Reports/sp_payment.xlsx');

  }

  onUpload(event, uploadCustom) {
    console.log('uploadCustom: ', uploadCustom);
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.files[0];
    reader.readAsBinaryString(file);
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
      console.log('dataFromExcel.Sheet1: ', dataFromExcel.Sheet1);
      this.paymentList = dataFromExcel.Sheet1;
      if (this.paymentList.length > 0) {
        this.selectbill = false;
        this.disblebankinfo = false;
        this.inputModel.paymentDate = null;
        this.inputModel.amount = null;


      } else {

        this.messageService.add({ severity: 'error', summary: 'please add any data in your excel sheet!', detail: '' });

      }
      this.filterPaymentList();

      // this.messageService.add({
      //   severity: 'info',
      //   summary: 'File Uploaded',
      //   detail: ''
      // });

      console.log('event is: ', event);
      uploadCustom.files = null;
    }
    
    
  }

  filterPaymentList() {
    if (this.paymentList && this.paymentList.length > 0) {
      this.paymentList.forEach(element => {

        var from = element.Date.split("/")
        var f = new Date(from[2], from[1] - 1, from[0])
        element.Date = f;

        //element.Date = new Date(element.Date);
        element.isEditable = false;
        element.Payment = element.Payment;
        // element.AffectedLadgerID = this.getAffactedLedgerID(element.Particulars);
        // element.VouchersTypeID = this.getVoucherTypeList(element.VchType);
        element.Particulars = element.VouchersNo;
        element.LagerID = this.inputModel.SupplierId;
        element.class = '';
      });

      this.paymentList = this.paymentList.filter(x => { return x.Payment > 0 });
    }
  }

  deletePayment(rowData) {
    this.paymentList = this.paymentList.filter(x => { return !(x.Date == rowData.Date && x.Payment == rowData.Payment) });
  }

  uploadPayment(){
    if (this.paymentList && this.paymentList.length > 0) {
      let dataList = [];
      this.isLoading = true;
      this.paymentList.forEach(item => {
        let datatopost = {
          Id: null,
          SupplierId: this.selectedSupplier.SupplierId,
          TotalReaminingAmount: item.Payment,
          TotalAmount: Number(item.Payment),
          BankId: this.inputModel.BankId,
          RefNo: this.inputModel.refno,
          Remark: this.inputModel.remark,
          IRList: null,
          Guid: null,
          PaymentDate: item.Date

        }
        dataList.push(datatopost);
      });

      this.supplierService.UploadPayemntListOnly(dataList).subscribe(result => {
        if (result != null) {
          this.messageService.add({ severity: 'success', summary: 'Add Payments Successfully!', detail: '' });
          this.trash();
          this.gotoList();
        }
        this.isLoading = false;
      }, error => { this.isLoading = false; });
    }
  }


  savePaymentBulUpload() {
     
    if (this.paymentList && this.paymentList.length > 0) {
      let dataList = [];
      this.isLoading = true;
      this.paymentList.forEach(item => {
        let datatopost = {
          Id: null,
          SupplierId: this.selectedSupplier.SupplierId,
          TotalReaminingAmount: item.Payment,
          TotalAmount: item.Payment,
          BankId: this.inputModel.BankId,
          RefNo: this.inputModel.refno,
          Remark: this.inputModel.remark,
          IRList: null,
          Guid: null,
          PaymentDate: item.Date

        }
        dataList.push(datatopost);
      });

      this.supplierService.uploadPayemntList(dataList).subscribe(result => {
        if (result != null) {
          this.messageService.add({ severity: 'success', summary: 'Add Payments Successfully!', detail: '' });
          this.trash();
          this.gotoList();
        }
        this.isLoading = false;
      }, error => { this.isLoading = false; });
    }
  }
  //#endregion


  selectBillFromAdjustment(form) {
    if (form.status == "VALID" || form.status == "DISABLED") {
      this.inputModeladdjustment.showPaymentValidation = false;
      this.inputModeladdjustment.isDisabled = true;
      this.totalremainingamount = this.inputModeladdjustment.amount;
      this.disableIRlist(false);
      this.disbleselectbilladjust=true;
    } else {
      this.inputModeladdjustment.isDisabled = false;
      this.inputModeladdjustment.showPaymentValidation = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }

  resetBillFromAdjustment() {
    this.resetAdjustmentModel();
    this.disableIRlist(true);
    this.resetIrListSelectedvalues();
    this.selectIRList = null;
    this.totalremainingamount = 0;
    this.disbleselectbilladjust=false;
  }

  onTabChange(event) {
    console.log('event:', event);
    this.selectedTab = this.tabs.filter(x => { return x.Id == event.nextId })[0];
    this.resetTab();
  }

  resetTab() {
    this.resetIrListSelectedvalues();
    this.disableIRlist(true);
    this.selectIRList = [];
    this.totalremainingamount = 0;
    switch (this.selectedTab.Code) {
      case "SupplierPayment":
        this.resetSupplierPayment();
        break;
      case "Adjustment":
        this.resetAdjustmentModel();
        break;
      case "UploadIRPayment":
        this.inputModel = {
          BankId: '',
          refno: '',
          amount: 0,
          paymentDate: null,
          remark: '',
          isDisabled: false,
          isDisabledUpload: false,
          showPaymentValidation: false,
          showUploadValidation: false
        }
        break;

    }
  }

  private disableIRlist(flag: boolean) {
    if (this.irList && this.irList.length > 0) {
      this.irList.forEach(x => x.isDisabled = flag);
    }
  }

  private resetSupplierPayment() {
    this.inputModel = {
      BankId: '',
      refno: '',
      amount: 0,
      paymentDate: null,
      remark: '',
      isDisabled: false,
      isDisabledUpload: false,
      showPaymentValidation: false,
      showUploadValidation: false
    }
  }


  private resetIrListSelectedvalues() {
    if (this.irList && this.irList) {
      this.irList.forEach(x => {
        x.IsChecked = false;
      })
    }
  }

  private resetAdjustmentModel() {
    this.inputModeladdjustment = {
      BankId: '',
      refno: '',
      amount: 0,
      remark: '',
      isDisabled: false
    };
    this.selectedAdvacePaymentId = '';
  }

  private gotoList() {
    this.router.navigateByUrl('layout/supplier/supplier-payment-list');
  }
  exportIr() {
    
    this.exportserivce.exportAsExcelFile(this.irList, "IRList");

  }

}

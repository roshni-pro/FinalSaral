import { Component, OnInit } from '@angular/core';
import { UpiTransactionDetailsServiceService } from '../upi-transaction-details-service.service';
import { event } from 'jquery';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { Console, log } from 'console';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pay-later-collection',
  templateUrl: './pay-later-collection.component.html',
  styleUrls: ['./pay-later-collection.component.scss']
})
export class PayLaterCollectionComponent implements OnInit {
  @ViewChild('fileRef', null) fileUploader: ElementRef;
  keyword: any;
  allStoreList: any[] = [];
  isLoading: boolean = false
  selectedStore: any;
  SelectedStatus: any;
  first: number = 0;
  itemList: any[] = [];
  exportList: any[] = [];
  data: any = []
  mod: any;
  Mode: any;
  HistoryList: any[] = [];
  CollectAmount: any;
  PaymentReferenceNO: any;
  orderid: any;
  ChequeDate: any;
  MPOSReferenceNo: any;
  statusbtn: any
  history: any[];
  bankname: any[];
  BankId: any;
  NotesAmount: any = [];
  CoinsAmount: any = [];
  HistorypopUp: boolean = false;
  PaymentMod: any;
  Returncheque: any;
  PaymentType: any;
  record: boolean = false;
  totalRecords: number = 0;
  Denomination: any[];
  OtherNotesAmount: any;
  OtherCoinsAmount: any;
  Binddata = { ChequeNumber: '', ChequeDate: '', BankId: '' };
  ChequeNumber: any
  dataToPost: any;
  ReturnChargeModePopUp: boolean = false;
  Storeid: any;
  noteQty: any;
  noteSize: any;
  notetotal: any;
  coinstotal: any;
  filenames: any;
  file: File[];
  filepath: File[];
  imageurl: any = '';
  id: any;
  WarehouseIds: any
  roleName: any;
  roleList: any;
  roleListarry: boolean = false;
  addBtnRole: boolean = false;
  WarehouseList:any[] = []
  selectedwarehouse: any;
  warehouseid:any
  StatusList =
    [
      { value: 6, Name: 'All' },
      { value: 0, Name: 'Pending' },
      { value: 1, Name: 'Partial' },
      { value: 2, Name: 'Due' },
      { value: 3, Name: 'OverDue' },
      { value: 4, Name: 'Paid' },
      { value: 5, Name: 'Cancelled' },
      { value: 7, Name: 'Partial Paid' },
      { value: 8, Name: 'Partial(Settled)' },
      { value: 9, Name: 'Return' },
      { value: 10, Name: 'Cancelled' },
    ]
  PaymentPendingList=[
    { value: 0, Name: 'Select All' },
    { value: 1, Name: 'Approval Pending' }
    
  ]  
  PaymentSelectedStatus: any;
  constructor(private UpiTransactionService: UpiTransactionDetailsServiceService,
    private messageService: MessageService, private confirmationService: ConfirmationService, private exportservice: ExportServiceService,
    private peoplePilot: PepolePilotService,) {
  }

  ngOnInit() {
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);
      for (var i in this.roleList) {

        if (this.roleList[i] == 'Paylater Amount Approver') {
          this.roleListarry = true;
        }
        else if (this.roleList[i] == 'WH cash manager' || this.roleList[i] == 'Hub Cashier') {
          this.addBtnRole = true;
        }
      }
      localStorage.removeItem('role');
      console.log("wh role", this.addBtnRole);

    });

    this.SelectedStatus = this.StatusList[0]
    this.PaymentSelectedStatus = this.PaymentPendingList[0]
    this.getStore();
    this.getbankname()
    this.CurrencyDenomination();
    this.getwarehouselist();

  }

  
  getStore() {
    this.isLoading = true;
    this.UpiTransactionService.GetStoreList().subscribe((res) => {
      this.allStoreList = res;
      this.isLoading = false;
    })
  }

  load(event) {
    this.SearchList(event);
  }

  ForSearchHit() {
    this.record = true;
    this.first = 0;
    this.totalRecords = 0;
  }

  ispaymentpending:boolean=false
  SearchList(event) {
    debugger
    if(this.record == true){
      if(this.selectedwarehouse ==undefined || this.selectedwarehouse.length ==0){
        alert('Please Select Warehouse')
        return false
      }
      if (this.PaymentSelectedStatus.value ==0) {
        this.ispaymentpending = false
      }
      else{
        this.ispaymentpending = true
      }
      this.Storeid = []
      if (this.selectedStore != undefined) {
        this.selectedStore.forEach((x: any) => {
          this.Storeid.push(x.StoreId)
        })
      }
      this.warehouseid=[]
      if (this.selectedwarehouse != undefined) {
        this.selectedwarehouse.forEach((x: any) => {
          this.warehouseid.push(x.WarehouseId)
        })
      }
      
      const payload = {
        "StoreId": this.Storeid,
        "WarehouseId":this.warehouseid,
        "SkCode": this.keyword ? this.keyword : null,
        "Status": this.SelectedStatus.value,
        "Skip": event.first ? event.first : 0,
        "Take": event.rows ? event.rows : 10,
        "IsPaymentpending": this.ispaymentpending
      }
      this.isLoading = true
      this.UpiTransactionService.GetpayLaterCollection(payload).subscribe((Result: any) => {
        if (Result.length > 0) {
          this.itemList = Result;
          console.log(this.itemList)
          this.totalRecords = Result[0].TotalCount
          this.isLoading = false
        } else {
          this.messageService.add({ severity: 'error', summary: 'No Data Found!', detail: '' });
          this.itemList = [];
          this.isLoading = false
          this.totalRecords = 0
        }
      })
    }
    
  }

  historyPopUp(historydata) {
    if (historydata.payLaterCollectionHistoryDCs.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'No Data Found!', detail: '' });
      return false;
    } else {
      this.HistoryList = historydata.payLaterCollectionHistoryDCs;
      this.HistorypopUp = true;
    }
  }

  ReturnChargeMode(data) {

    this.orderid = data.OrderId
    this.id = data.Id
    this.WarehouseIds = data.WarehouseId
    this.data.mod = ''
    this.ReturnChargeModePopUp = true
    this.Returncheque = data.RemainingAmount
  }

  selectPaymentMode(data) {
    if (data == '1') {
      this.data.mod = "1";
      this.Denomination.forEach(x => x.CurrencyCount = 0);
      this.bankname.forEach(x => x.Id = 0);
      this.data.BankId = '';
      this.data.ChequeNumber = '';
      this.data.ChequeDate = '';
      this.data.CollectAmount = '';
      let fileInput = document.getElementById('myInput') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      this.data.PaymentType = '';
      this.data.ChequeDate = '';
      this.data.PaymentReferenceNO = '';
      this.data.MPOSReferenceNo = '';
    }
    else if (data == '2') {
      this.data.mod = "2"
      this.Denomination.forEach(x => x.CurrencyCount = 0);
      this.data.PaymentType = '';
      this.data.ChequeDate = '';
      this.data.PaymentReferenceNO = ''
      this.data.MPOSReferenceNo = ''
      this.data.BankId = '';
    }
    else if (data == '3') {
      this.data.mod = "3"
      this.Denomination.forEach(x => x.CurrencyCount = 0);
      this.bankname.forEach(x => x.Id = 0);
      this.data.BankId = '';
      this.data.ChequeNumber = '';
      this.data.ChequeDate = '';
      this.data.CollectAmount = '';
      let fileInput = document.getElementById('myInput') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  cancell(data) {
    this.ReturnChargeModePopUp = false;
    this.Returncheque = undefined;
    this.data.mod = '';
    this.Denomination.forEach(x => x.CurrencyCount = 0)
    this.data.ChequeNumber = '';
    this.data.ChequeDate = '';
    this.data.CollectAmount = '';
    this.bankname.forEach(x => x.Id = 0);
    this.data.BankId = '';
    let fileInput = document.getElementById('myInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    };
    this.data.BankId = '';
    this.data.PaymentType = '';
    this.data.PaymentReferenceNO = ''
    this.data.MPOSReferenceNo = '';
    this.data.UPIReferenceNo = '';
  }

  checkValue(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }

  paymenttypes(data) {
    if (data.PaymentType == 'Mpos') {
      this.data.PaymentType = 'Mpos';
      this.data.PaymentReferenceNO = '';
      this.data.MPOSReferenceNo = '';
      this.data.CollectAmount = '';
      this.data.UPIReferenceNo = '';
    } else if (data.PaymentType == 'RTGS/NFT') {
      this.data.PaymentType = 'RTGS/NFT';
      this.data.PaymentReferenceNO = '';
      this.data.MPOSReferenceNo = '';
      this.data.CollectAmount = '';
      this.data.UPIReferenceNo = '';
    } else if (data.PaymentType == 'UPI') {
      this.data.PaymentType = 'UPI';
      this.data.PaymentReferenceNO = '';
      this.data.MPOSReferenceNo = '';
      this.data.CollectAmount = '';
    }
  }

  onKeyDown(event: any) {

    if (event.key === '-' || event.key === '-') {
      event.preventDefault();
    }
  }

  CurrencyDenomination() {
    this.isLoading = true;
    this.UpiTransactionService.CurrencyDenomination().subscribe((results: any) => {
      this.isLoading = false;
      console.log(results);
      this.Denomination = results.CurrencyDenomination;
      this.Denomination.sort(function (a, b) {
        if (a.currencyType < b.currencyType) { return 1; }
        if (a.currencyType > b.currencyType) { return -1; }
        return 0;
      })
      console.log(this.Denomination.findIndex((x) => x.currencyType === 'Coins'))
      this.Denomination.forEach((el, index) => {
        el.filter = false
        el.CurrencyCount = 0;
      })
      this.Denomination.forEach((el, index) => {
        if (this.Denomination.findIndex((x) => x.currencyType === 'Coins') == index) {
          el.filter = true;
        }
      })
    });
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.Denomination) {
      total += item.CurrencyCount * item.Title;
    }
    this.notetotal = total
    return total;
  }

  calculateTotall(): number {
    let total = 0;
    for (const item of this.Denomination) {
      total += item.CurrencyCount;
    }
    return total;
  }

  getbankname() {
    this.isLoading = true
    this.UpiTransactionService.GetBankName().subscribe((results) => {
      this.bankname = results.BankNameDc;
      this.isLoading = false;
      console.log(this.bankname);
    })
  }

  Addpayment(data, payment) {
    debugger
    console.log( this.bankname);
    if (data.mod == "1") {
      if (this.Returncheque < this.notetotal) {
        this.messageService.add({ severity: 'error', summary: "Cash Amount greater than Total Amount ", detail: '' });
        return false;
      }
      if (this.notetotal == 0) {
        this.messageService.add({ severity: 'error', summary: "Please Enter Cash Amount", detail: '' });
        return false;
      }
      this.dataToPost = {
        WarehouseId: this.WarehouseIds,
        Id: this.id,
        cashList: payment,
        OrderId: this.orderid,
        Amount: this.notetotal
      }
      console.log(this.dataToPost, "Cash");
      this.isLoading = true;
      this.UpiTransactionService.CashPayment(this.dataToPost).subscribe((x: any) => {
        if (x.Status == true) {
          console.log(x, "cashPayment");
          this.messageService.add({ severity: 'success', summary: 'Cash Added successfully!', detail: '' });
          this.SearchList(event);
          this.ReturnChargeModePopUp = false
          this.isLoading = false;
        } else {
          this.messageService.add({ severity: 'error', summary: x.Message, detail: '' });
          this.isLoading = false;
          this.ReturnChargeModePopUp = false
        }
      })
    }
    else if (data.mod == "2") {
      data.ChequeAmt = this.Returncheque;
      if (this.data.ChequeNumber == undefined || this.data.ChequeNumber == null || this.data.ChequeNumber == "") {
        this.messageService.add({ severity: 'error', summary: "Please Enter Cheque Number", detail: '' });
        return false;
      }
      else if (this.data.ChequeDate == undefined || this.data.ChequeDate == null || this.data.ChequeDate == "") {
        this.messageService.add({ severity: 'error', summary: "Please Enter Cheque Date", detail: '' });
        return false;
      }
      else if (this.data.BankId == undefined || this.data.BankId == null || this.data.BankId.length == 0) {
        this.messageService.add({ severity: 'error', summary: "Please Select Bank Name", detail: '' });
        return false;
      }
      else if (this.data.CollectAmount == undefined || this.data.CollectAmount == null || this.data.CollectAmount == "" || this.data.CollectAmount == 0) {
        this.messageService.add({ severity: 'error', summary: "Please Enter Cheque Amount", detail: '' });
        return false;
      }
      else if (this.imageurl == "" || this.imageurl == undefined) {
        this.messageService.add({ severity: 'error', summary: "Please upload File", detail: '' });

        return false;
      }
      else if (this.Returncheque < data.CollectAmount) {
        this.messageService.add({ severity: 'error', summary: "Cheque Amount greater than Total Amount", detail: '' });
        return false
      }
      
      debugger
      this.dataToPost = {
        Id: this.id,
        Warehouseid: this.WarehouseIds,
        ChequeNumber: data.ChequeNumber,
        ChequeDate: data.ChequeDate,
        BankId: parseInt(data.BankId),
        ChequeAmt: data.CollectAmount,
        OrderId: this.orderid,
        ChequeimagePath: this.imageurl
      }
      console.log(this.dataToPost, "ChequePayment");
      debugger
      // alert("BankId"+parseInt(data.BankId))
      // alert("thisBankId"+parseInt(this.data.BankId))
      this.isLoading = true;
      this.UpiTransactionService.ChequePaymentAdd(this.dataToPost).subscribe((x: any) => {
        if (x.Status == true) {
          this.data.BankId = '';
          this.data=[];
          //data.BankId = 0;
          this.messageService.add({ severity: 'success', summary: 'Chque Added successfully!', detail: '' });
          this.SearchList(event);
          this.getbankname();
          this.isLoading = false;
          this.ReturnChargeModePopUp = false
          this.Denomination.forEach(x => x.CurrencyCount = 0);
          this.data.PaymentType = '';
          this.data.ChequeDate = '';
          this.data.PaymentReferenceNO = ''
          this.data.MPOSReferenceNo = ''
        } else {
          this.messageService.add({ severity: 'error', summary: x.Message, detail: '' });
          this.isLoading = false;
          this.ReturnChargeModePopUp = false
        }
      })
    }
    else if (data.mod == "3") {
      if (this.data.PaymentType == undefined || this.data.PaymentType == null || this.data.PaymentType == "") {
        this.messageService.add({ severity: 'error', summary: "Please Select Payment Mode", detail: '' });
        return false;
      }
      if (data.PaymentType == 'Mpos') {
        if (this.data.MPOSReferenceNo == undefined || this.data.MPOSReferenceNo == null || this.data.MPOSReferenceNo == "") {
          this.messageService.add({ severity: 'error', summary: "Please Enter MPOS ReferenceNo", detail: '' });
          return false;
        }
        else if (this.data.CollectAmount == undefined || this.data.CollectAmount == null || this.data.CollectAmount == "" || this.data.CollectAmount == 0) {
          this.messageService.add({ severity: 'error', summary: "Please Enter  MPOS Amount", detail: '' });
          return false;
        }
        else if (this.Returncheque < data.CollectAmount) {
          this.messageService.add({ severity: 'error', summary: "MPOS Amount greater than Total Amount", detail: '' });
          return false
        }
        data.MPOSAmt = this.Returncheque;
        this.dataToPost = {
          Id: this.id,
          WarehouseId: this.WarehouseIds,
          MPOSAmt: data.CollectAmount,
          MPOSReferenceNo: data.MPOSReferenceNo,
          Orderid: this.orderid
        }
        console.log(this.dataToPost, "mpospayload");

      }
      else if (data.PaymentType == 'RTGS/NFT') {
        if (this.data.PaymentReferenceNO == undefined || this.data.PaymentReferenceNO == null || this.data.PaymentReferenceNO == "") {
          this.messageService.add({ severity: 'error', summary: "Please Enter Payment ReferenceNo", detail: '' });
          return false;
        }
        else if (this.data.CollectAmount == undefined || this.data.CollectAmount == null || this.data.CollectAmount == "" || this.data.CollectAmount == 0) {
          this.messageService.add({ severity: 'error', summary: "Please Enter RTGS/NEFT Amount", detail: '' });
          return false;
        }
        else if (this.Returncheque < data.CollectAmount) {
          this.messageService.add({ severity: 'error', summary: "Payment Amount greater than Total Amount", detail: '' });
          return false
        }

        data.PaymentGetwayAmt = this.Returncheque;
        this.dataToPost = {
          Id: this.id,
          WarehouseId: this.WarehouseIds,
          PaymentGetwayAmt: data.CollectAmount,
          PaymentReferenceNO: data.PaymentReferenceNO,
          Orderid: this.orderid
        }
      }
      else if (data.PaymentType == 'UPI') {
        if (this.data.UPIReferenceNo == undefined || this.data.UPIReferenceNo == null || this.data.UPIReferenceNo == "") {
          this.messageService.add({ severity: 'error', summary: "Please Enter UPI ReferenceNo", detail: '' });
          return false;
        }
        else if (this.data.CollectAmount == undefined || this.data.CollectAmount == null || this.data.CollectAmount == "" || this.data.collection == 0) {
          this.messageService.add({ severity: 'error', summary: "Please Enter UPI Amount", detail: '' });

          return false;
        }
        else if (this.Returncheque < data.CollectAmount) {
          this.messageService.add({ severity: 'error', summary: "UPI Amount greater than Total Amount", detail: '' });
          return false
        }
        data.PaymentGetwayAmt = this.Returncheque;
        this.dataToPost = {
          Id: this.id,
          WarehouseId: this.WarehouseIds,
          Orderid: this.orderid,
          UPIAmt: data.CollectAmount,
          PaymentReferenceNO: data.UPIReferenceNo,
        }
      }
      this.isLoading = true;
      this.UpiTransactionService.OnlinePayment(this.dataToPost).subscribe((x: any) => {
        if (x.Status == true) {
          this.messageService.add({ severity: 'success', summary: 'Added successfully!', detail: '' });
          this.ReturnChargeModePopUp = false
          this.isLoading = false
          this.SearchList(event);
        } else {
          // alert(x.Message)
          this.messageService.add({ severity: 'error', summary: x.Message, detail: '' });
          this.isLoading = false
          this.ReturnChargeModePopUp = false
        }
      })
    }
  }

  cancel() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {

        window.location.reload();
      },
      reject: () => {
        this.ReturnChargeModePopUp = false;
        this.Denomination.forEach(x => x.CurrencyCount = 0);
        this.data.PaymentType = '';
        this.data.ChequeDate = '';
        this.data.MPOSReferenceNo = ''
        this.bankname.forEach(x => x.Id = 0);
        this.data.BankId = '';
        this.data.PaymentReferenceNO = '';
        this.data.CollectAmount = '';
        this.data.CollectAmount = '';
        this.data.UPIReferenceNo = '';
      }
    });
  }

  onUpload(file: File[]) {
    debugger
    this.file = file;
    if (file && file[0].type != "image/jpeg") {
      alert("Only image/jpg,jpeg,png type is allowed");
      let fileInput = document.getElementById('myInput') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      };
      return;
    }

    var reader = new FileReader();
    this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
    }
  }

  uploader() {
    if (this.file == undefined || this.file.length == 0) {
      alert("Please upload File");
      return false;
    }
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.filenames = this.file[0].name.split('.')
    this.isLoading = true;
    this.UpiTransactionService.CurrencyUploadChequeImage(formData).subscribe(result => {
      console.log(result, "image");
      alert("Uploaded Successfully");
      this.file = [];
      this.imageurl = result
      this.file = [];
      this.isLoading = false;
    })
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Z0-9]+$/; // Allow alphabetic characters and numbers
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumeric characters
    }
  }

  ExportList(event) {
    if(this.selectedwarehouse ==undefined || this.selectedwarehouse.length ==0){
      alert('Please Select Warehouse')
      return false
    }
    if (this.PaymentSelectedStatus.value ==0) {
      this.ispaymentpending = false
    }
    else{
      this.ispaymentpending = true
    }
    this.Storeid = []
    if (this.selectedStore != undefined) {
      this.selectedStore.forEach((x: any) => {
        this.Storeid.push(x.StoreId)
      })
    }
    this.warehouseid=[]
    if (this.selectedwarehouse != undefined) {
      this.selectedwarehouse.forEach((x: any) => {
        this.warehouseid.push(x.WarehouseId)
      })
    }
    const payload = {
      "StoreId": this.Storeid,
      "WarehouseId":this.warehouseid,
      "SkCode": this.keyword ? this.keyword : null,
      "Status": this.SelectedStatus.value,
      "Skip": event.first ? event.first : 0,
      "Take": event.rows ? event.rows : 10,
      "IsPaymentpending": this.ispaymentpending
    }
    this.isLoading = true
    this.UpiTransactionService.ExportpayLaterCollection(payload).subscribe((Result: any) => {
      if (Result.length > 0) {
        this.exportList = Result;
        console.log(this.exportList,"itemList")
        var ExportData = this.exportList.map(function (elem) {
          return {
            'SalesPerson': elem.OrderTakenSalesPerson,
            'OrderId': elem.OrderId,
            'InvoiceNo':elem.InvoiceNo,
            'Skcode': elem.Skcode,
            'CustomerName':elem.CustomerName,
            'ShopName':elem.ShopName,
            'WarehouseName':elem.WarehouseName,
            'StoreName': elem.StoreName,
            'Order Amount': elem.Amount,
            'PaymentStatus': elem.PaymentStatus,
            'PaidAmount': elem.PaidAmount,
            'ReturnAmount': elem.ReturnAmount,
            'RemainingAmount': elem.RemainingAmount,
            'OrderDate': elem.OrderDate,
            'DeliveredDate': elem.DeliveredDate,
            'DueDate': elem.DueDate,
            'Mobile': elem.Mobile,
            'Order Status': elem.Status,
            'ReceiverName':elem.ReceiverName,
            'ReceivedDate':elem.ReceivedDate,
            'InvoiceNumber':elem.InvoiceNo,
            'RefundAmount':elem.RefundAmount,
          }
        });
        this.exportservice.exportAsExcelFile(ExportData, "PayLaterExportData")
        this.exportList=[];
        this.isLoading = false
      } else {
        this.messageService.add({ severity: 'error', summary: 'No Data Found!', detail: '' });
        this.exportList = [];
        this.isLoading = false
        this.totalRecords = 0
      }
    })
  }

  onApprove(Id) {
    this.isLoading = true
    this.UpiTransactionService.PaymentApprove(Id).subscribe((res: any) => {
      if (res.Status == true) {
        this.messageService.add({ severity: 'success', summary: res.Message, detail: '' });
        this.isLoading = false;
        this.HistorypopUp = false;
        this.SearchList(event);
      } else {
        this.messageService.add({ severity: 'error', summary: res.Message, detail: '' });
        this.isLoading = false;
        this.HistorypopUp = false;
        this.SearchList(event);
      }
    })
  }

  onReject(Id) {
    this.isLoading = true;
    this.UpiTransactionService.PaymentReject(Id).subscribe((res: any) => {
      if (res.Status == true) {
        this.messageService.add({ severity: 'success', summary: res.Message, detail: '' });
        this.isLoading = false;
        this.HistorypopUp = false;
        this.SearchList(event);
      } else {
        this.messageService.add({ severity: 'error', summary: res.Message, detail: '' });
        this.isLoading = false;
        this.HistorypopUp = false;
        this.SearchList(event);
      }
    })


  }

  getwarehouselist(){
    this.isLoading = true;
    this.UpiTransactionService.getwarehouselist().subscribe(res=>{
      this.isLoading = false;
      this.WarehouseList = res;
    })
  }
}

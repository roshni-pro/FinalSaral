import { Component, OnInit, Input } from '@angular/core';
import { GullakService } from 'app/shared/services/gullak/gullak.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { GetGullakTransaction, AddGullakPayment, GullakPendingDc } from 'app/shared/interface/gullak/gullak';
import { image } from 'html2canvas/dist/types/css/types/image';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gullak-detail',
  templateUrl: './gullak-detail.component.html',
  styleUrls: ['./gullak-detail.component.scss']
})
export class GullakDetailComponent implements OnInit {
  @Input() Id: any;
  CustomerId: any;
  WarehouseId: any;
  GetGullakTransaction: GetGullakTransaction;
  GullakId: any;
  gullaktransaction: any;
  isOpenPopupPayments: boolean;
  AddGullakPayment: AddGullakPayment;
  BankName: any;
  cash: any;
  cheque: any;
  online: any;
  isInvalid: boolean;
  onlinearr: any[];
  casharr: any[];
  chequearr: any[];
  TransactionId: any;
  ChequeId: any;
  Comment: any;
  Amount: any;
  pageSize: number;
  totalRecords: number;
  blocked: boolean;
  file: any;
  image: any;
  exportgullak: any[];
  status: any;
  pendingresult: any;
  GullakPendingDc: GullakPendingDc;
  imagepath: string;
  WrongValue : boolean = false;
  imgData ; boolean = false;

  constructor(private warehouseService: WarehouseService, private gullakService: GullakService, private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService, private route: ActivatedRoute, private exportService: ExportServiceService, ) {
  }
  ngOnInit() {
    
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.CustomerId = Number(this.route.snapshot.paramMap.get("CustomerId"));
    this.WarehouseId = Number(this.route.snapshot.paramMap.get("WarehouseId"));
    this.status = "";
    this.GetGullakTransaction = {
      Skip: null,
      Take: null,
      GullakId: null,
      CustomerId: null,
    }

    this.AddGullakPayment = {
      id: null,
      CustomerId: null,
      Amount: null,
      GatewayRequest: '',// bank name // online payment Details 
      GatewayTransId: null, // cheque number // online trX Number 
      PaymentFrom: '',// online // cash //cheque
      comment: '',  // comment 
      GullakImage: '',
    }
    this.pageSize = 10;

    this.GetGullakTransaction = {
      Skip: 0,
      Take: this.pageSize,
      GullakId: this.Id,
      CustomerId: this.CustomerId,
    }

    this.GullakPendingDc = {
      id: null,
      CustomerId: null,
      GullakId: null,
      GatewayTransId: null, // cheque number // online trX Number 
      status: '',
      Amount: null,
      GatewayRequest: '',// bank name // online payment Details      
      PaymentFrom: '',// online // cash //cheque
      comment: '',  // comment 
      GullakImage: '',
    }

  }
  OnClick() {
    this.blocked = true;
    this.gullakService.GetGullakTransaction(this.GetGullakTransaction).subscribe(result => {
      this.gullaktransaction = result.GullakTransactionDc;
      //this.exportgullak = this.gullaktransaction;
      this.totalRecords = result.total_count;
      console.log('GetGullakTransaction:', result.GullakTransactionDc);
      console.log('GetGullakTransaction.count:', result.total_count);
      this.blocked = false;
    })
  }

  load(event) {
    
    this.GetGullakTransaction.Skip = event.first;
    this.GetGullakTransaction.Take = event.rows;
    this.OnClick();
  }

  upload(file: File[]) {
    
    this.file = file;
    var reader = new FileReader();
    this.image = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      // this.imgURL = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")

    };


  }

  Cancel() {
    this.router.navigateByUrl('layout/customer/gullak/' + this.WarehouseId);
  }

  add() {
    this.isOpenPopupPayments = true;
    this.Amount = null;
    this.Comment = '';
    this.BankName = '';
    this.ChequeId = null;
    this.TransactionId = null;
    this.casharr = [];
    this.onlinearr = [];
    this.cheque = [];
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  public inputValidator(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
    }
  }


  Cashsave(cashForm, Amount, Comment, tabname) {
    
    if (tabname == 'tab1') {
      tabname = 'cash';
    }
    this.casharr = [];
    console.log('cashForm:', cashForm);
    if(Amount) //Amount > 0
    {  
      this.WrongValue = false;
    this.AddGullakPayment = {
      id: this.Id,
      CustomerId: this.CustomerId,
      Amount: Amount,
      GatewayRequest: '',// bank name // online payment Details 
      GatewayTransId: null, // cheque number // online trX Number 
      PaymentFrom: tabname,// online // cash //cheque
      comment: Comment,  // comment 
      GullakImage: '',
    }
    this.casharr.push(this.AddGullakPayment);
    if (cashForm.form.status == 'VALID') {
      this.blocked = true;
      this.gullakService.PaymentResponse(this.AddGullakPayment).subscribe(result => {
        console.log('cashForm:', result);
        if (result == true) {
          this.isOpenPopupPayments = false;
          this.messageService.add({ severity: 'success', summary: "Added Successfully", detail: '' });
          this.OnClick();
        }
        this.blocked = false;
      })
    }
    else {
      this.isInvalid = true;
    }
  }
  // else
  // {
  //   this.WrongValue = true;
  //   // this.isInvalid = true;
  //   return;
  // }
  }
  Chequesave(chequeForm, Amount, Comment, BankName, ChequeNumber, tabname, img) {
    
    if (tabname == 'tab2') {
      tabname = 'cheque';
    }
    this.chequearr = [];
    console.log('chequeForm', chequeForm);
    if(Amount)//Amount > 0
    {
      this.WrongValue = false;    
    this.AddGullakPayment = {
      id: this.Id,
      CustomerId: this.CustomerId,
      Amount: Amount,
      GatewayRequest: BankName,// bank name // online payment Details 
      GatewayTransId: ChequeNumber, // cheque number // online trX Number 
      PaymentFrom: tabname,// online // cash //cheque
      comment: Comment,
      GullakImage: this.imagepath,  // comment 
    }
    this.chequearr.push(this.AddGullakPayment);
    if (chequeForm.form.status == 'VALID') {
      this.blocked = true;
      this.gullakService.PaymentResponse(this.AddGullakPayment).subscribe(result => {
        this.imagepath = null;
        console.log('chequeForm', result);
        if (result == true) {
          this.isOpenPopupPayments = false;
          this.messageService.add({ severity: 'success', summary: "Added Successfully", detail: '' });
          this.OnClick();
        }
        this.blocked = false;
      })
    }
    else {
      this.isInvalid = true;
    }
  }
  // else
  // {
  //   this.WrongValue = true;
  // }
  }
  Onlinesave(onlineForm, Amount, Comment, BankName, TransactionId, tabname) {

    if (tabname == 'tab3') {
      tabname = 'online';
    }
    this.onlinearr = [];
    console.log('onlineForm:', onlineForm);
    if(Amount) //Amount > 0
    {
      this.WrongValue = false;   
    this.AddGullakPayment = {
      id: this.Id,
      CustomerId: this.CustomerId,
      Amount: Amount,
      GatewayRequest: BankName,// bank name // online payment Details 
      GatewayTransId: TransactionId, // cheque number // online trX Number 
      PaymentFrom: tabname,// online // cash //cheque
      comment: Comment,  // comment 
      GullakImage: '',
    }
    this.onlinearr.push(this.AddGullakPayment);
    if (onlineForm.form.status == 'VALID') {
      this.blocked = true;
      this.gullakService.PaymentResponse(this.AddGullakPayment).subscribe(result => {
        console.log('onlineForm:', result);
        if (result == true) {
          this.isOpenPopupPayments = false;
          this.messageService.add({ severity: 'success', summary: "Added Successfully", detail: '' });
          this.OnClick();
        }
        this.blocked = false;
      })
    }
    else {
      this.isInvalid = true;
    }
  }
  // else
  // {
  //   this.WrongValue = true;
  // }
  }


  uploadgullak() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      

      this.gullakService.uploadgullak(formData).subscribe(result => {
        
        if (result != null) {

          console.log('result', result);
          this.imagepath = result;
          this.imgData = true;
          this.messageService.add({ severity: 'success', summary: "Upload Successfull", detail: '' });
        }
        else {
          this.imgData = false;
          // this.messageService.add({ severity: 'success', summary: "Upload Successfull", detail: '' });

        }
      });
    }
  }


  ExportGullak() {
    this.blocked = true;
    let exportdata=[];
    this.gullakService.GetExportGullakTransaction(this.GetGullakTransaction).subscribe(result => {
      this.exportgullak = result.GullakTransactionDc;
      if( this.exportgullak !=null){  
          this.exportgullak.forEach(element => {
            exportdata.push({
              Id:element.Id,
              CreatedDate:element.CreatedDate,
              ModifiedDate:element.ModifiedDate,
              IsActive:element.IsActive,
              IsDeleted:element.IsDeleted,
              GullakCreatedBy:element.GullakCreatedBy,
              ModifiedBy:element.ModifiedBy,
              GullakId:element.GullakId,
              Amount:element.Amount,
              ObjectType:element.ObjectType,
              ObjectId:element.ObjectId,
              Comment:element.Comment,
              SKcode:element.SKcode,
              ShopName:element.ShopName,
              City:element.City
            })
          });
          this.blocked = false;
        this.exportService.exportAsExcelFile(exportdata, 'exportgullak');
      }else{
        this.blocked = false;
      }
    })
  }
  //   Status(){
  // 
  // // window.open('/#/'+this.router.url);
  // this.router.navigateByUrl('layout/customer/gullakpending/' + this.Id + '/' + this.CustomerId);

  //   }


}

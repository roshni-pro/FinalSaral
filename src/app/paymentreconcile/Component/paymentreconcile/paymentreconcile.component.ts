import { Component, OnInit } from '@angular/core';
import { values } from 'd3';
import { PaymentreconcileService } from 'app/shared/services/paymentreconcile.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import * as XLSX from 'xlsx';
import { environment } from 'environments/environment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DialogModule } from 'primeng/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-paymentreconcile',
  templateUrl: './paymentreconcile.component.html',
  styleUrls: ['./paymentreconcile.component.scss']
})
export class PaymentreconcileComponent implements OnInit {
  searchModel: any;
  preport: any;
  cols: any;
  exportData: any;
  paymentList: any[];
  file: File[];
  IsExtension: boolean;
  blocked: boolean;
  apptype: any;
  OBVersion: string | Blob;
  FilePath: any;
  uploadedFiles: any[] = [];
  trash: any[];
  imagePath: File[];
  OrangeBook: any;
  OBVersionNew: string | Blob;
  isUploadedxl: any;
  pay: any;
  //selectedStory: MurliStory;
  isOpenPopup: boolean;
  customer: any;
  colsv1: any[];
  popupdata: any;
  itemdatass: any[];
  searchKey:any;



  constructor(private PaymentreconcileService: PaymentreconcileService,
    private exportService: ExportServiceService,
    private messageService: MessageService, private modalService: NgbModal, private router: Router) 
    { this.searchModel = {};this.popupdata = {}; }



  // load(event) 
  // { 

  // }

  ngOnInit() {
    this.cols = [
      { field: 'OrderId', header: 'OrderId' },
      { field: 'Date', header: 'Date' },
      { field: 'TxnAomunt', header: 'TxnAomunt' },
      { field: 'TxnStatus', header: 'TxnStatus' },
      { field: 'TxnID', header: 'TxnID' },
      { field: 'SettleDate', header: 'SettleDate' },
      { field: 'IsSettled', header: 'IsSettled' },
      { field: 'MOP', header: 'MOP' },
      { field: 'OrderAmount', header: 'OrderAmount' },
      { field: 'Skcode', header: 'Skcode' },
      { field: 'Warehouse', header: 'Warehouse' },
    ];

  }


  upload(file: File[]) {
    
    this.file = file;
    var fileExtension = file[0].name.split('.').pop();
    if (fileExtension == "xlsx") {
      this.IsExtension = true;
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        this.OrangeBook = reader.result;
      }
      (success) => {
        alert("image uploaded successfully")
        this.messageService.add({ severity: 'success', summary: 'File uploaded successfully! Please Save', detail: '' });
      };
    }
    else {

      alert("File Formate Not Accepted");
      this.IsExtension = false;
    }

  }


  uploader() {
    
    let formData = new FormData();
     formData.append('file', this.file[0])
     formData.append('value', this.OBVersionNew)
    this.PaymentreconcileService.UploadFilesHDFC(formData, this.searchModel.value).subscribe(result => {
      
      console.log(result)
      this.isUploadedxl = result;

      this.router.navigateByUrl("layout/paymentreconcile/hdfcupload-details/"  + this.isUploadedxl);

      //window.location.reload();


    });
    

  }
  value(formData: FormData, value: any) {
    throw new Error("Method not implemented.");
  }

  // goToHDFCDetails(id) {
  //   this.router.navigate(['/layout/paymentreconcile/hdfcupload-details', id]);
  // }


  uploader1() {
    
    let formData = new FormData();
    formData.append('file', this.file[0])
    formData.append('value', this.OBVersionNew)
    this.PaymentreconcileService.UploadFilesePay(formData, this.searchModel.value).subscribe(result => {
      
      console.log(result)
      this.isUploadedxl = result;

      this.router.navigateByUrl("layout/paymentreconcile/epay-upload-details/"  + this.isUploadedxl);
    })
  }
  value1(formData: FormData, value: any) {
    throw new Error("Method not implemented.");
  }


  uploader2() {
    
    let formData = new FormData();
    formData.append('file', this.file[0])
    formData.append('value', this.OBVersionNew)
    this.PaymentreconcileService.UploadFilemPos(formData, this.searchModel.value).subscribe(result => {
      
      console.log(result)
      this.isUploadedxl = result;

      this.router.navigateByUrl("layout/paymentreconcile/m-pos-upload-details/"  + this.isUploadedxl);
    })
  }
  value2(formData: FormData, value: any) {
    throw new Error("Method not implemented.");
  }

  uploader3() {
    
    let formData = new FormData();
    formData.append('file', this.file[0])
    formData.append('value', this.OBVersionNew)
    this.PaymentreconcileService.UploadFileHDFCNet(formData, this.searchModel.value).subscribe(result => {
      
      console.log(result)
      this.isUploadedxl = result;

      this.router.navigateByUrl("layout/paymentreconcile/hdfcnet-banking-details/"  + this.isUploadedxl);

    })
  }
  value3(formData: FormData, value: any) {
    throw new Error("Method not implemented.");
  }


  onValueChange(value) {
    this.blocked = true;
    
    this.PaymentreconcileService.GetValuebased(value).subscribe(res => {
      console.log(value);
      console.log(res)
      
      this.preport = res;
      console.log(this.preport)
      this.blocked = false;
    });
  }


  search(searchModel) {
    
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    var OrderId = this.searchModel.OrderId ? this.searchModel.OrderId : 0
    var SKCode = this.searchModel.SKCode ? this.searchModel.SKCode : null
    if(SKCode != null && FromDate == null){
      alert("Select Date Range");
    return;

    }

    this.PaymentreconcileService.SearchValue(OrderId, SKCode, FromDate, ToDate).subscribe(res => {
      console.log(this.searchModel.FromDate);
      console.log(res)
      this.preport = res;
      console.log(this.preport)
      if (this.preport == 'undefined' || this.preport == "") {
        alert("No data Found")
        return;
      }

    });
  
  
  }

  searchNew(searchModel) {
    
    var value = this.searchModel.value ? this.searchModel.value : 0
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    var OrderId = this.searchModel.OrderId ? this.searchModel.OrderId : 0
    var SKCode = this.searchModel.SKCode ? this.searchModel.SKCode : null
    this.PaymentreconcileService.SearchAllValue(value,OrderId, SKCode, FromDate, ToDate).subscribe(res => {
      console.log(this.searchModel.FromDate);
      console.log(res)
      this.preport = res;
      console.log(this.preport)
      if (this.preport == 'undefined' || this.preport == "") {
        alert("No data Found")
        return;
      }

    });
  }

  Refresh(){
    window.location.reload();
  }

  searchData(searchKey){
    
    this.blocked = true;
var searchKey = searchKey;
    this.PaymentreconcileService.SearchAssignmentID(searchKey).subscribe(res => {
      this.preport = res;
      this.blocked = false;
    
    })
    
  }

  Show(image){
    
    console.log("image",image);
    this.popupdata = image;
    this.isOpenPopup = true;
  }
  exportDateBased() {
    this.exportData = {};
    if (this.searchModel.value) {
      if (this.searchModel.FromDate && this.searchModel.ToDate) {
        var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
        var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
        this.PaymentreconcileService.exportDateBased(this.searchModel.value, ToDate, FromDate).subscribe(result => {
          this.exportData = result;
          this.exportService.exportAsExcelFile(this.exportData, 'DateWiseTransaction');
        })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Please Enter Date Range!', detail: '' });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Select Mode of Payment!', detail: '' });
    }
  }


  export() {
    this.exportService.exportAsExcelFile(this.preport, 'preport');
  }


}

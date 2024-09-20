import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { bulkNotification } from 'app/shared/interface/trade/bulkNotification';

@Component({
  selector: 'app-bulk-notification',
  templateUrl: './bulk-notification.component.html',
  styleUrls: ['./bulk-notification.component.scss']
})
export class BulkNotificationComponent implements OnInit {
  isUploadedCoupon: boolean;
  showDialog: boolean;
  isErrorOccured: boolean;
  isNotUploading: boolean;
  erroredCouponList: any[];
  data: any;
  mobileNoList: any[];
  BulkNotification: bulkNotification;
  TotalRecords: number;
  customerNotificationlist: any;
  blocked: boolean;
  mobileNos: any[];
  order: boolean;
  isOpenPopup: boolean;

  constructor(public bulkNotificationService: TradeCustomerService,
    private messageService: MessageService) { this.data = {}; }

  ngOnInit() {
    this.data.message = null;
    this.data.title = null;
    this.data.notify_type = null;
    this.data.take = 15;
    this.data.skip = 0;
    this.order = false;
    this.isOpenPopup = false;

    this.BulkNotification = {
      uploadMobileNo: [],
      message: null,
      title: null,
      notify_type: null
    }
    this.GetNotificationDetails(this.data);
  }

  load(event) {

    this.data.skip = event.first;
    this.data.take = event.rows;
    this.GetNotificationDetails(this.data);
  }
  uploaddata() {
    this.isUploadedCoupon = true;
    this.showDialog = true;
    this.isErrorOccured = false;
    this.isNotUploading = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.isUploadedCoupon = false;
    this.order = false;
    this.isOpenPopup = false;
    this.mobileNos=[];
    //  this.close.emit(null);
  }

  onUpload(event, uploadCustom) {
    //this.isNotUploading = false;
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
     // console.log('dataFromExcel.Sheet1: ', dataFromExcel.Sheet1);
      let MobileNoList = dataFromExcel.Sheet1;
      this.mobileNoList=MobileNoList;
      
      if (MobileNoList && MobileNoList.length > 0) {
        this.messageService.add({ severity: 'success', summary: 'Plz enter message and title & click send button.', detail: '' });
        this.closeDialog();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'please Enter Mobile numbers in Excel Sheet!!', detail: '' });
        this.closeDialog();
      }

      //console.log('event is: ', event);
    }
    this.closeDialog();
     uploadCustom.files = null;
     reader.readAsBinaryString(file);
  }

  sendNotification(data) {
    if (this.mobileNoList && this.mobileNoList.length > 0) {
      if (this.data.message != null || this.data.title != null || this.data.notify_type != null) {
        this.BulkNotification = {
          uploadMobileNo: this.mobileNoList,
          message: data.message,
          title: data.title,
          notify_type: data.notify_type,
        }
        this.bulkNotificationService.sendBulkNotification(this.BulkNotification).subscribe(x => {
           this.blocked = false;
           this.isNotUploading = true;         
            this.isErrorOccured = true;
            this.showDialog = false;
            this.erroredCouponList = x;
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Job Created sending Notification,Plz Wait!', detail: '' });
              // this.ngOnInit();
             }, 100);
            // this.messageService.add({ severity: 'success', summary: 'Send Notification successfully!', detail: '' });
            this.ngOnInit();
         },
        error => {
          this.blocked=false;
          this.messageService.add({ severity: 'success', summary: 'Send Notification successfully!!', detail: '' });
          this.ngOnInit();
        });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Please enter all details!', detail: '' });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Upload Excel file first!!', detail: '' });
    }

  }

  openTemplate() {
    window.open(environment.tradeapiURL + '/Reports/Buil_Notification_upload_template.xlsx');
  }

  GetNotificationDetails(data) {
    this.blocked = true;
    this.bulkNotificationService.GetNotificationDetails(data.skip, data.take).subscribe(result => {
      this.blocked = false;
      this.customerNotificationlist = result.CustomerNotificationlist;
      this.TotalRecords = result.TotalRecords;
    }, error => {
      this.blocked = false;
      // this.messageService.add({ severity: 'error', summary: 'No records Found !!', detail: '' });
    });

  }

  openPopup(rowData) {
    this.order = true;
    this.isOpenPopup = true;
    this.mobileNos=rowData; 
  }

}

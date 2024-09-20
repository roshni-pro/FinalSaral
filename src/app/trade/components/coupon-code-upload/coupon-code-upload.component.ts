import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { CouponCodeService } from 'app/trade/services/coupon-code.service';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-coupon-code-upload',
  templateUrl: './coupon-code-upload.component.html',
  styleUrls: ['./coupon-code-upload.component.scss']
})
export class CouponCodeUploadComponent implements OnInit {
  showDialog:boolean;
  isNotUploading: boolean;
  isErrorOccured: boolean;
  erroredCouponList: any[];
  @Output() close: EventEmitter<any> = new EventEmitter();
  
  constructor(public couponCodeService: CouponCodeService, private messageService: MessageService) { }

  ngOnInit() {
    this.isErrorOccured = false;
    this.isNotUploading = true;
    this.showDialog = true;
  }

  closeDialog(){
    this.showDialog = false;
    this.close.emit(null);
  }


  onUpload(event, uploadCustom) {
    this.isNotUploading =false;
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
      console.log('dataFromExcel.Sheet1: ', dataFromExcel.Sheet1);
      let couponList = dataFromExcel.Sheet1;
      if (couponList && couponList.length > 0) {
        this.couponCodeService.addCouponList(couponList).subscribe(x => {
          this.isNotUploading =true;
          if(x && x.length > 0){
            this.isErrorOccured = true;
            this.showDialog = false;
            this.erroredCouponList = x;
            setTimeout(() => {
              this.showDialog = true;
            }, 100);
            
          }else{
            this.messageService.add({ severity: 'success', summary: 'Uploaded successfully!', detail: '' });
            this.closeDialog();
          }
        }, error =>{
          this.messageService.add({ severity: 'error', summary: 'Somthing went wrong!', detail: '' });
        });

      } else {
        this.messageService.add({ severity: 'error', summary: 'Somthing went wrong!', detail: '' });
      }

      console.log('event is: ', event);
    }
    uploadCustom.files = null;
    reader.readAsBinaryString(file);
  }

  openTemplate(){
    window.open(environment.tradeapiURL + '/Reports/Coupon_Code_upload_template.xlsx');
  }

}

import { Component, OnInit } from '@angular/core';
import { EtaUpdateOrderService } from 'app/order/services/eta-update-order.service';
import { RedeemMasterService } from 'app/order/services/redeem-master.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { MessageService, SelectItem } from 'primeng/api';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-expected-rtd-date',
  templateUrl: './expected-rtd-date.component.html',
  styleUrls: ['./expected-rtd-date.component.scss']
})
export class ExpectedRtdDateComponent implements OnInit {

  @ViewChild('fileRef',null) fileUploader: ElementRef;
  uploadedFiles: any[] = [];
  date1:string
  file: any;
  allWarehouses:any[]=[]
  selectedWarehouse:any;
  calendarConfig:any={
    "minDate":'',
    "maxDate":''
  }
  rtdDate:any;
  disabledDates: SelectItem[];

  constructor(
    private messageService: MessageService,
    private _service:EtaUpdateOrderService,
    private apiService: RedeemMasterService,
    private exportservice: ExportServiceService,

  ) { 

  }
  ngOnInit() {
    debugger;
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1); // Get the date for the next day
    this.calendarConfig.minDate = currentDate;
    this.calendarConfig.maxDate = nextDay;
    // this.calendarConfig.maxDate = moment(new Date(y, m,date.getDate() + 1)).format(('MMMM Do YYYY, h:mm:ss a'));
    console.log( this.calendarConfig," this.calendarConfig.maxDate")
    this.getWarehouseList();    
  }
  
  isDisabled(date: Date): boolean {
    const todayDate = new Date();
    return date.getDate() !== todayDate.getDate() 
  }

  getWarehouseList() {
    this.apiService.getWarehouses().subscribe(
      (res) => {
        this.allWarehouses = res;
      },
      (err) => {
        console.log(err);
        this.allWarehouses = [];
        alert("error - cannot find warehouse list")
      }
    );
  }

  onUploadClick() {
    debugger;
    // if(this.EtaDate ==''){
    //   this.messageService.add({severity:'error', summary: 'Error', detail: 'select date first!'});
    // }
    // else{
       
    if(this.selectedWarehouse==null || this.selectedWarehouse==undefined)
      {
        this.messageService.add({severity:'error', summary: 'error', detail:'Select Warehouse First'});
        return false;
      }
     if(this.rtdDate==null || this.rtdDate==undefined)
      {
        this.messageService.add({severity:'error', summary: 'error', detail:'Select Date'});
        return false;
      }
      if(this.file!=null)
        {
          let formData = new FormData();
          formData.append('file', this.file[0]);
          console.log(formData);
          this.rtdDate=moment(this.rtdDate).format('YYYY-MM-DD')
          this._service.UploadRtdDoc(this.rtdDate,this.selectedWarehouse.WarehouseId,formData).subscribe((res:any) => {
            debugger;
            if (res) {
              this.messageService.add({severity:'success', summary: 'Success', detail:res});
              this.Clear();
            }
          },
            Error => {
              alert(" File Not Uploaded");
              return false;
            }
          )
        }
        else
        {
          this.messageService.add({severity:'error', summary: 'error', detail:'Upload File First'});
          return false;
        }
    }

    Array:any[]=[]
    DownLoadSample() {
      this.Array = [
        {
          'OrderId': null,
        }
      ]
      this.exportservice.exportAsExcelFile(this.Array, "SampleFile")
    }

  UploadFlashDoc(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
    }
    (success) => {
      alert("Excel uploaded successfully")
    };
  }
  Clear(){
    this.rtdDate=null;
    this.selectedWarehouse=null;
    this.fileUploader.nativeElement.value = null;
  }
}

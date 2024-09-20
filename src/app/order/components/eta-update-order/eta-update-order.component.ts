import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EtaUpdateOrderService } from 'app/order/services/eta-update-order.service';
import * as moment from 'moment';
@Component({
  selector: 'app-eta-update-order',
  templateUrl: './eta-update-order.component.html',
  styleUrls: ['./eta-update-order.component.scss']
})
export class EtaUpdateOrderComponent implements OnInit {
  uploadedFiles: any[] = [];
  date1:string
  file: any;
  calendarConfig:any={
    "minDate":''
  }
  EtaDate:any
  constructor(
    private messageService: MessageService,
    private _service:EtaUpdateOrderService
  ) { 

  }

  ngOnInit() {
    this.calendarConfig.minDate = new Date()

  }

  onUploadClick() {
    debugger;
    if(this.EtaDate ==''){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'select date first!'});
    }
    else{
      let formData = new FormData();
      formData.append('file', this.file[0]);
      console.log(formData);
      this.EtaDate=moment(this.EtaDate).format('YYYY-MM-DD')
      this._service.UploadFlashDoc(this.EtaDate,formData).subscribe((res:any) => {
        if (res) {
          this.messageService.add({severity:'success', summary: 'Success', detail:res});
          window.location.reload();
        }
      },
        Error => {
          alert("Error!! please try again later  ");
        }
      )
    }
  }

  UploadFlashDoc(file: File[]) {
    debugger
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
    this.EtaDate='';
  }
}

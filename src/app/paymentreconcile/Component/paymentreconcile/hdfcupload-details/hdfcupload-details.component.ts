import { Component, OnInit,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PaymentreconcileService } from 'app/shared/services/paymentreconcile.service';
import { Identifiers } from '@angular/compiler';
import {ColorPickerModule} from 'primeng/colorpicker';



@Component({
  selector: 'app-hdfcupload-details',
  templateUrl: './hdfcupload-details.component.html',
  styleUrls: ['./hdfcupload-details.component.scss']
})
export class HDFCUploadDetailsComponent implements OnInit {
  gethdfc:any;
  @Input() UploadId: number; 
  cols:any[];
  resData : any;
  color2: any = {
    r: 100, g: 130, b: 150
};
isOpenPopup: boolean;
popupdata: any;
searchModel: any;
datatopost: any;
IsSettled:any;
Comment:any;
paymentxnId:any;

document : any;
  documentList : any;
  isInvalid: boolean;

  constructor(private PaymentreconcileService :PaymentreconcileService,
    private messageService: MessageService,private router: Router,private route: ActivatedRoute) {this.searchModel = {} }

  ngOnInit() {

 this.UploadId = Number(this.route.snapshot.paramMap.get("UploadId"));

this.PaymentreconcileService.GetHDFCdata(this.UploadId).subscribe(result=>{
  
console.log("resData",result);
console.log("UploadId",this.UploadId);
this.resData=result;



});
  }


  Refresh(){
    window.location.reload();
  }


  Show(image){
    
    console.log("image",image);
    this.popupdata = image;
    this.isOpenPopup = true;
  }

  Save(popupdata) {
    

    this.datatopost = {
      
      OrderId: popupdata.OrderId,
      GatewayTransId: popupdata.TXNID,
      IsSettled: popupdata.Status,
      SettleComments: popupdata.Comment
    }

    this.PaymentreconcileService.UpdateStatus(this.datatopost).subscribe(result => {

      console.log(result);
      },
    (err)=>{
      this.messageService.add({severity:'error', summary: 'Error!', detail:''});
    });
    this.isOpenPopup=false;

  }

  onValueChange(value) {
    
    this.PaymentreconcileService.GetStatusHDFC(this.UploadId,value).subscribe(res => {
      console.log(value);
      console.log(res)
      
      this.resData = res;
      console.log(this.resData)
    });
  }

}







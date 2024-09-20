import { Component, OnInit,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PaymentreconcileService } from 'app/shared/services/paymentreconcile.service';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-epay-upload-details',
  templateUrl: './epay-upload-details.component.html',
  styleUrls: ['./epay-upload-details.component.scss']
})
export class EpayUploadDetailsComponent implements OnInit {
  gethdfc:any;
  @Input() UploadId: number; 
  cols:any[];
  resData : any;
  isOpenPopup: boolean;
  popupdata: any;
  searchModel: any;
  datatopost: any;


  constructor(private PaymentreconcileService :PaymentreconcileService,
    private messageService: MessageService,private router: Router,private route: ActivatedRoute) { this.searchModel = {}}

  ngOnInit() {
    
 this.UploadId = Number(this.route.snapshot.paramMap.get("UploadId"));

  this.cols = [
    // { header: 'Edit' },
    { field: 'TXNID', header: 'Id' },
    { field: 'TXNDate', header: 'Warehouse Name' },
    { field: 'TxnAomunt', header: 'Text' },
    { field:'OrderId', header: 'From Date' },
    { field:'OrderAmount', header: 'To Date' },
    { field:'Status', header: 'Audio' },

   ];

this.PaymentreconcileService.GetEpaydata(this.UploadId).subscribe(result=>{
console.log("resData",result);
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
    
    this.PaymentreconcileService.GetStatusePay(this.UploadId,value).subscribe(res => {
      console.log(value);
      console.log(res)
      
      this.resData = res;
      console.log(this.resData)
    });
  }


}

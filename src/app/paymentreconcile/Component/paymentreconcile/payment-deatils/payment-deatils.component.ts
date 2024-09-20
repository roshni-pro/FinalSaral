import { Component, OnInit } from '@angular/core';
import { PaymentreconcileService } from 'app/shared/services/paymentreconcile.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';


@Component({
  selector: 'app-payment-deatils',
  templateUrl: './payment-deatils.component.html',
  styleUrls: ['./payment-deatils.component.scss']
})
export class PaymentDeatilsComponent implements OnInit {
  searchModel: any;
  preport: any;
  cols:any;
  UploadId:any;

  constructor(private PaymentreconcileService : PaymentreconcileService,private exportService : ExportServiceService,
    private messageService: MessageService,private router: Router) { this.searchModel= {}}

  ngOnInit() {
    // this.cols = [
    //   { field: 'UploadId', header: 'TXNID'  },         
    //   { field: 'FileType', header: 'Date' },
    //   { field: 'UplaodBy', header: 'TxnAomunt'  },
    //   { field: 'IsReconcile', header: 'TxnStatus' },
    //   { field: 'UploadDate', header: 'TxnID' },

    // ];
  }

  onValueChange(value) {
    
    this.PaymentreconcileService.GetValuebasedFile(value).subscribe(res =>{
      console.log(value);
      console.log(res)
      
      this.preport = res;  
      console.log(this.preport)
    });
  }

  search(searchModel) {
    
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    var value = this.searchModel.value ? this.searchModel.value : 0
    this.PaymentreconcileService.SearchStatusValue(value,FromDate,ToDate).subscribe(res => {
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


  NewPagehdfc(image)
  { 
    
    this.UploadId=image.UploadId;
      this.router.navigateByUrl("layout/paymentreconcile/hdfcupload-details/"  + this.UploadId);
  }

  NewPageEpay(image)
  { 
    
    this.UploadId=image.UploadId;
      this.router.navigateByUrl("layout/paymentreconcile/epay-upload-details/"  + this.UploadId);
  }
  NewPagemPos(image)
  { 
    
    this.UploadId=image.UploadId;
      this.router.navigateByUrl("layout/paymentreconcile/m-pos-upload-details/"  + this.UploadId);
  }
  NewPageNetHdfc(image)
  { 
    
    this.UploadId=image.UploadId;
      this.router.navigateByUrl("layout/paymentreconcile/hdfcnet-banking-details/"  + this.UploadId);
  }

}

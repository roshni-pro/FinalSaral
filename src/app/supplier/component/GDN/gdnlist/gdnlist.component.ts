import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';

@Component({
  selector: 'app-gdnlist',
  templateUrl: './gdnlist.component.html',
  styleUrls: ['./gdnlist.component.scss']
})
export class GDNListComponent implements OnInit {

  constructor(private _service: SupplierService) { }
  IsGDNListShow: boolean;
  ItemList:any[];
  PurchaseOrderId:number
  ngOnInit() {
    this.IsGDNListShow = false;
  }
  OtpSubmit(OTP) {
    this._service.GetOtp(OTP.value).subscribe(result=>{
      if (result == true) {
        this.IsGDNListShow = true;
        this.GetGDNList();
      }
    })
   
  }
  GetGDNList(){
    
    this.PurchaseOrderId=47438;
    this._service.GetGoodDescripancyNote(this.PurchaseOrderId).subscribe(result => {
      this.ItemList = result;      
    })
  }
}

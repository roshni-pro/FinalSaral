import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VoucherTypeService } from 'app/shared/services/voucher-type.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-voucher-type',
  templateUrl: './add-voucher-type.component.html',
  styleUrls: ['./add-voucher-type.component.scss']
})
export class AddVoucherTypeComponent implements OnInit {
  @Input() ID: number;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  accountClassificationList: any;
  voucherType:any;
  isInvalid: boolean;
  constructor(private vouchertypeservice : VoucherTypeService,private router : Router) { this.voucherType = {}}

  ngOnInit() {
    if(this.ID){
    this.vouchertypeservice.GetByID(this.ID).subscribe(result => {
      this.voucherType = result;
     
      console.log('GetByID: ', this.voucherType);
    })
    }

  }
  onclick(testForm:any){
    console.log('testForm: ', testForm);
    if (testForm.form.status == "VALID") {
    if(this.ID == null){
      this.vouchertypeservice.addVoucherType(this.voucherType).subscribe(result => {
        this.router.navigateByUrl('layout/Account/vouchertype')
       // this.expanded = false;
      },
      (err)=>{
        alert("error")
     
      });
    }else{
      this.vouchertypeservice.UpdateVoucherType(this.voucherType).subscribe(result => {
        console.log(this.ID);
        this.router.navigateByUrl('layout/Account/vouchertype');//pz
        this.refreshParent.emit(false);
        // this.router.navigateByUrl('layout/Account/vouchertype')
       // this.expanded = false;
      },
      (err)=>{
        alert("error")
     
      });
    }
  }else{
    this.isInvalid = true;
  }
 

}


  onCancel(){
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/Account/vouchertype')
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-supplieradvncepayment',
  templateUrl: './supplieradvncepayment.component.html',
  styleUrls: ['./supplieradvncepayment.component.scss']
})
export class SupplieradvncepaymentComponent implements OnInit {

  constructor( private supplierService: SupplierService,private messageService:MessageService ) {}
  advancepayment:any;
  poidlist:[];
  @Input() id: any;
  ngOnInit() {
    this.advancepayment={
      Amount:0,
      POId:0,
      SupplierId:this.id
      };
     
    this.supplierService.GetPOIDforSuppllierId(this.id).subscribe(result =>{
      this.poidlist = result;
    });
 }
 addpayment(advancepayment){
  
  if(advancepayment.Amount!=0){
     
  this.supplierService.Addpaymentdata(this.advancepayment).subscribe(result =>{
    
  if(result!=null){
    this.messageService.add({ severity: 'success', summary: 'Add Payment Successfully!', detail: '' });
  }
  });
   }else{
     
    this.messageService.add({ severity: 'error', summary: 'Please enter the amount!', detail: '' });
  }
 }

}

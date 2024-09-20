import { Component, OnInit } from '@angular/core';
import { RTGSOrderDetailsDC } from 'app/rtgs-orders-approve/interface/rtgs-order-details-dc';
import { RtgsOrdersService } from 'app/rtgs-orders-approve/service/rtgs-orders.service';
import {  ConfirmationService, MessageService } from 'primeng/api';
import { CustDC } from 'app/rtgs-orders-approve/interface/rtgs-order-details-dc';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-rtgs-orders-approve',
  templateUrl: './rtgs-orders-approve.component.html',
  styleUrls: ['./rtgs-orders-approve.component.scss']
})
export class RtgsOrdersApproveComponent implements OnInit {
  items :any;
  RefNo  : any;
  OrderId : any;
  Payment :any;
  type : number;
  blocked : boolean;
  rtgsOrderDetailsDC : RTGSOrderDetailsDC;
  rtgsOrderList : any;
  UserId : any;
  isInvalid : boolean = false;
  isInvalidPay : boolean = false;
  CustList: CustDC[];
  selectedCust:any;   
  inputModel: any = {
    CustomerId: null     
  };

  constructor( private confirmationService: ConfirmationService,private messageService: MessageService,
    private rtgsOrdersService : RtgsOrdersService,private exportServiceService:ExportServiceService) {}

  ngOnInit() {
  }

  getLedgerList(event) {
    
    if (event.query.length > 2) {
      this.rtgsOrdersService.getByName(event.query)
        .subscribe(result => {
          
          this.CustList = result;
          console.log('this.ledgerList :', this.CustList);
        });
    }

  }
   
  onSearch(RefNo,OrderId,Payment)
  {   
       
    // this.CustomerId = this.selectedCust.CustomerId
    if(this.selectedCust== undefined && RefNo==undefined && OrderId == undefined && Payment==undefined)
    {
      this.isInvalid = true;
      this.isInvalidPay=true;
    }

    else{
      // if(this.selectedCust.CustomerId== undefined && (RefNo==undefined || RefNo==" ") && (OrderId==undefined || OrderId==" ")){
      //   this.isInvalid = true;  
      //   return false;       
      // }
      if(this.selectedCust== undefined){
        this.inputModel.CustomerId ="";        
      }
      else {
      this.inputModel.CustomerId = this.selectedCust.CustomerId;
    }
    if(RefNo==undefined){
      this.RefNo=" ";
    }
    else {
      this.RefNo=RefNo
    }
    if(OrderId==undefined){
      this.OrderId=" ";
    }
    else {
      this.OrderId=OrderId
    }
    
    if(Payment==undefined){
      this.isInvalidPay=true;
      return false;
    }
    else{
      this.Payment = Payment;
    }

      this.isInvalid = false;
      this.isInvalidPay = false;
    this.rtgsOrderDetailsDC = {
      RefNo : this.RefNo,
      type : this.type ? this.type : 0,
      OrderId : this.OrderId,
      ApproveBy : 0,
      CustomerId: this.inputModel.CustomerId ,
      PaymentFrom : this.Payment
    }
    this.blocked = true;
    this.rtgsOrdersService.getRTGSOrderList(this.rtgsOrderDetailsDC).subscribe(x=>
      {
        this.rtgsOrderList = x;
        this.blocked = false;
      })
    }
  }
  onTabChange(event) {
    if (event.index == 0) {
      this.type = 0;
      if(this.RefNo == undefined)
      {
        this.isInvalid = true;
      }
      this.onSearch(this.RefNo,this.OrderId,this.Payment  );
    } else if (event.index == 1) {
      this.type = 1;
      if(this.RefNo == undefined)
      {
        this.isInvalid = true;
      }
      this.onSearch(this.RefNo,this.OrderId,this.Payment);
      }  
    }
    ActiveInactive(rowdata) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
         this.UserId = localStorage.getItem('userid');
          this.rtgsOrderDetailsDC = {
            RefNo : rowdata.RefNo,
            type :  rowdata.type,
            OrderId : rowdata.OrderId,
            ApproveBy : this.UserId,
            CustomerId:0,
            PaymentFrom:this.Payment
          }
          this.blocked = true;
          this.rtgsOrdersService.updateRTGSOrder(this.rtgsOrderDetailsDC).subscribe(x=>
            {
              this.blocked = false;
              if (x == true) {       
                this.type = rowdata.type;
                this.onSearch(rowdata.RefNo,rowdata.OrderId,this.Payment);                           
               this.messageService.add({ severity: 'success', summary: 'Your Request is Activated Successfully!', detail: '' });
              } else {
              this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
              }
            })       
        },
        reject: () => {
          rowdata.IsActive = !rowdata.IsActive;
          this.messageService.add({ severity: 'error', summary: 'Your Request for IsActive Process is Canceled!', detail: '' });
        }
      });
    }

    ExportReport()
    {
      //
      if(this.rtgsOrderList != null){      
      //  this.items =   this.rtgsOrderList.forEach( item => delete item.Take   );        
        this.items = this.rtgsOrderList.map(o =>{
        delete o.Take;
        return o;
      }) 
        this.items = this.items.map(o => {
        delete o.Skip;
        return o;
      }) 
        this.items = this.items.map(o => {
        delete o.CustomerId;
        return o;
      }) 
        this.items = this.items.map(o =>{
          delete o.type;
          return o;
      }) 
        this.items = this.items.map(o => {
        delete o.ApproveBy;
         return o;
      }) 
      this.exportServiceService.exportAsExcelFile(this.items,"RTGSOrderList");}
      else{
        alert("No data found for export");
      }
    }
}

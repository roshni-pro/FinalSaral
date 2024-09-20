import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-paymentmodechange',
  templateUrl: './paymentmodechange.component.html',
  styleUrls: ['./paymentmodechange.component.scss']
})
export class PaymentmodechangeComponent implements OnInit {
  orderdata:any[];
  OrderId:any;
  openPopup:boolean;
  data:any;
  OrderIds:any;
  oid:any;
  popupOpen:boolean;
  entityName:any;
  historydata:any;
  entity:any;
  rowDataV1 : any;
  blocked:boolean;
  constructor(private customerService: CustomerService,private messageService: MessageService) {this.orderdata=[],this.data={},this.entity="PaymentResponseRetailerApp"}

  ngOnInit() {
    this.openPopup=false;
    this.popupOpen=false;
  }

  OnClick(orderId) {
    this.customerService.Searchdata(orderId).subscribe(result => {
      this.orderdata=[];
      this.orderdata=result;
      console.log('orderdata',this.orderdata);
    })
  }
  open(rowdata) {

    this.orderdata = rowdata;
    this.data = [];
    if(rowdata.Status=='Delivered')
    {
      alert("Order Delivered,the L&P person can confirm with warehouse team");
      return false;
    }
    if(rowdata.AssignmentStatus=='Freezed')
    {
      alert("this order assigment is Freezed payment Mode is not changed");
      return false;
    }
    
    this.openPopup = true;
  }
  update(data1) {
    this.blocked=true;
    this.oid = this.orderdata;
    if (data1.value != 'Failed') {
       if (data1.ToDate == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Please enter DateTime!', detail: '' });
        return;
      } 
      else if (data1.value == 'ePaylater') {
        if (data1.GatewayTransId == undefined || data1.GatewayTransId == 0) {
          this.messageService.add({ severity: 'error', summary: 'Please enter Transaction Id!', detail: '' });
          return;
        } else if (data1.GatewayOrderId == undefined || data1.GatewayOrderId == 0) {
          this.messageService.add({ severity: 'error', summary: 'Please enter Transaction Order ID!', detail: '' });
          return;
        }
      } else if (data1.value == 'hdfc' || data1.value == 'mPos' ||data1.value == 'credit hdfc' ||data1.value == 'Razorpay QR' || data1.value == 'chqbook' || data1.value == 'UPI') {
        if (data1.GatewayTransId == undefined || data1.GatewayTransId == 0) {
          this.messageService.add({ severity: 'error', summary: 'Please enter Transaction Id!', detail: '' });
          return;
        }
        else if(data1.value=='Gullak')
        if (data1.GatewayTransId == undefined || data1.GatewayTransId == 0) {
          this.messageService.add({ severity: 'error', summary: 'Please enter Transaction Id!', detail: '' });
          return;
      }
    }
    }
    var dataToPost = {
      id:this.oid.id,
      Orderid: this.oid.OrderId,
      amount: this.oid.amount,
      GatewayTransId: data1.GatewayTransId ? data1.GatewayTransId : null,
      PaymentFrom: this.oid.PaymentFrom,
      GatewayOrderId: data1.GatewayOrderId ? data1.GatewayOrderId : null,
      CreatedDate: data1.ToDate,
      Type:data1.value
    }
    this.customerService.updatepayment(dataToPost).subscribe(result => {
      this.blocked=false;
      this.orderdata = result;
      this.openPopup = false;
      this.messageService.add({ severity: 'success', summary: 'Payment Mode Changed Successfully!', detail: '' });
      this.OnClick(this.oid.OrderId); 
    
    })
  }
  openDetails(rowDataV1){
    this.rowDataV1 = rowDataV1;
    this.popupOpen=true;
    // this.entityName='PaymentResponseRetailerApp';
    // this.customerService.History(this.entityName, this.rowDataV1.id).subscribe(result=>{
    //   
    //    this.historydata=result.AuditHistory;
    //    console.log('datadata',this.historydata);
    // })
  }
}

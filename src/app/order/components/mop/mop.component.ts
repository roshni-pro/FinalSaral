import { Component, OnInit } from '@angular/core';
import { MopService } from 'app/order/services/mop.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mop',
  templateUrl: './mop.component.html',
  styleUrls: ['./mop.component.scss']
})
export class MopComponent implements OnInit {

  constructor(private Serv: MopService, private messageService: MessageService) { }
  orderid: number
  getMOPdata: any[]
  showprocessTO: boolean = true
  showprocessfrom: boolean = true
  transactionId: any = null
  customerCode: any
  SelectedFromMop: any
  SelectedToMop: any
  getOrderMop: any

  FromMOP: any[] =
    [
      { id: "ePaylater", label: "ePaylater" },
      { id: "mPos", label: "mPos" },
      { id: "truepay", label: "truepay" },
      { id: "Cash", label: "Cash" },
      { id: "hdfc", label: "hdfc" },
      { id: "Cheque", label: "Cheque" },
      { id: "Gullak", label: "Gullak" },
      { id: "credit hdfc", label: "credit hdfc" },
      { id: "chqbook", label: "chqbook" },
      { id: "Razorpay QR", label: "Razorpay QR" },
      { id: "DirectUdhar", label: "DirectUdhar" },
      { id: "RTGS/NEFT", label: "RTGS/NEFT" }

    ]
  ToMOP: any[] =
    [
      { id: "ePaylater", label: "ePaylater" },
      { id: "mPos", label: "mPos" },
      { id: "truepay", label: "truepay" },
      { id: "Cash", label: "Cash" },
      { id: "hdfc", label: "hdfc" },
      { id: "Cheque", label: "Cheque" },
      { id: "Gullak", label: "Gullak" },
      { id: "credit hdfc", label: "credit hdfc" },
      { id: "chqbook", label: "chqbook" },
      { id: "Razorpay QR", label: "Razorpay QR" },
      { id: "DirectUdhar", label: "DirectUdhar" },
      { id: "RTGS/NEFT", label: "RTGS/NEFT" }

    ]

  ngOnInit() {
    //this.getMOP()
  }
  // selectedOrderId:any
  getMOP() {
    debugger;
    if (this.orderid == undefined) {
      alert("Please Enter Order Id")
      return false
    }
    console.log();
    this.Serv.getOrderMOP(this.orderid).subscribe(res => {
      this.getMOPdata = res
    })
    console.log("this.getMOPdata", this.getMOPdata);
  }
  clear() {
    this.orderid = null
    this.getMOPdata = null
  }
  msg: any
  fromMopSelection:any;
  frommopselection(e) {
    console.log(e)
    this.fromMopSelection = e.value.id;
    if (this.fromMopSelection == this.toMopSelection) {
      alert("Please Select Diffrent MOP")
      this.SelectedToMop = []
      this.showprocessfrom=false
    }else{
      this.showprocessfrom=true
    }
  }
  toMopSelection:any;
  Tomopselection(e) { 
    this.toMopSelection = e.value.id;
    if (this.fromMopSelection == this.toMopSelection) {
      alert("Please Select Diffrent MOP")
      this.SelectedFromMop = []
      this.showprocessTO=false
    }else{
      this.showprocessTO=true
    }
  }

  Process() {

    console.log(this.orderid, "OrderId");
    console.log(this.customerCode, "customerCode");
    console.log(this.SelectedFromMop.id, "this.FromMOP");
    console.log(this.SelectedToMop.id, "OrderId");
    console.log(this.transactionId, "transactionId");


    this.Serv.GetChangeOnlieOrderMop(this.orderid, this.customerCode, this.SelectedFromMop.id, this.SelectedToMop.id, this.transactionId).subscribe(res => {
      this.getOrderMop = res
      console.log("this.getOrderMopres", res);
      console.log("this.getOrderMop", this.getOrderMop);
      if (this.getOrderMop == 1) {
        this.msg = "Successfull"
        this.messageService.add({ severity: 'success', summary: this.msg });
      }
      else {
        this.msg = "failed"
        this.messageService.add({ severity: 'error', summary: this.msg, detail: 'False' });
      }

    })

    this.orderid = null
    this.customerCode = null
    this.SelectedFromMop = null
    this.SelectedToMop = null
    this.transactionId = null

  }
}

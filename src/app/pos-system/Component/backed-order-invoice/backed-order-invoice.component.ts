import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PosSystemService } from 'app/pos-system/Service/pos-system.service';
import { log } from 'console';
import { Logger } from 'html2canvas/dist/types/core/logger';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-backed-order-invoice',
  templateUrl: './backed-order-invoice.component.html',
  styleUrls: ['./backed-order-invoice.component.scss']
})
export class BackedOrderInvoiceComponent implements OnInit {
  itemList: any;
  OrderData: any = []
  PaymentStatusCash:any;
  HideCessColumn:boolean=false;
  orderid: any
  orderdetails: any;
  tottalll: any
  OrderId: any
  isqrenabled: boolean = false
  constructor(
    private service: PosSystemService, private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activateRoute.paramMap.subscribe(params => {

      this.OrderId = Number(params.get('orderid'));
      this.service.GetBackendInvoiceData(this.OrderId).subscribe(data => {

        this.OrderData = data;
        console.log(this.OrderData,"OrderData");
        
        this.tottalll = data.GrossAmount
        this.totalAmountOfLists = data.GrossAmount;
        this.orderdetails = data.orderDetails
        this.OrderData1 = data;
        if (this.OrderData.IsInvoiceSent == true) {
          debugger
          this.mobilenumber = this.OrderData.Customerphonenum;
          // console.log(result);
          // this.OrderData = result;
          // this.OrderData1 = result;
          // this.tottalll = this.OrderData.GrossAmount
          // this.totalAmountOfLists = this.OrderData.GrossAmount
          // this.orderdetails = result.orderDetails
        }
        this.getTotalTax();
        this.getTotalIGST();
        this.getTotalCGST();
        this.getTotalSGST();
        this.getTotalIOverall();
        this.Qrenabledata();
        this.Getpaymentstatus();
        this.SumDataHSNDetails()
        this.getTotalTaxableValue();
        this.getTotalAWOTD();
        this.getTotalQty();
        this.gettotalAmount();
      })

    });


    this.dataItems.push({
      UPI: false,
      modepaymentUpi: false,
      isupiamountbtn: false,
      amount: { upi: 0 },
      Barcodeimg: false,
      ref: { Upi: '' },
      isqrgenerated: true,
      isrefgenerated: true,
      ischeckstatus: true,
      checkboxUPI: true
    });
    this.Data.push({
      'AmountUPI': 0,
      'AmountPOS': 0,
      'AmountRtgs': 0,
      'Cash': 0
    })

  }
  OrderData1: any = []

  Getpaymentstatus() {
    this.service.Getpaymentstatus(this.OrderId).subscribe((data) => {

      this.paymentdetail = data;
      console.log(this.paymentdetail, "paymentdetail");

    })
  }
  Qrenabledata() {
    this.service.GetQrEnabledData(this.OrderData.WarehouseId).subscribe((datas) => {
      this.isqrenabled = datas;
    })
  }
  
  InvoiceAmountInWord: any
  amount: any
  InvoiceOrderOffer:any
  Amount:any
  SumDataHSNDetails() {
    this.amount = this.OrderData1.GrossAmount - (this.OrderData1.DiscountAmount ? this.OrderData1.DiscountAmount : 0);
    this.service.GetInvoiceAmountToWord(this.amount).subscribe(results => {

      this.InvoiceAmountInWord = results;
      console.log(this.InvoiceAmountInWord, "InvoiceAmountInWord");

    });


  };
  totalTaxableValue: any
  getTotalTaxableValue() {
    if (this.OrderData1.orderDetails.length > 0) {
      this.totalTaxableValue = 0;
      this.OrderData1.orderDetails.forEach(x => {
        this.totalTaxableValue = this.totalTaxableValue + x.AmtWithoutTaxDisc;

      });
    }
  }
  paymentdetail: any = []
  totaltax: any
  getTotalTax() {
    this.totaltax = 0;
    if (this.OrderData1 && this.OrderData1.orderDetails && this.OrderData1.orderDetails.length > 0) {
      this.OrderData1.orderDetails.forEach(x => {
        this.totaltax = this.totaltax + (x.TaxAmmount + x.CessTaxAmount);
      });
    }
  }
  totalIGST: any
  getTotalIGST() {
debugger
    this.totalIGST = 0;
    if (this.OrderData1.orderDetails.length > 0) {
      this.OrderData1.orderDetails.forEach(x => {

        this.totalIGST = this.totalIGST + x.TaxAmmount + x.CessTaxAmount;
      });
    }
  }
  totalCGST: any
  getTotalCGST() {

    this.totalCGST = 0;
    if (this.OrderData1.orderDetails.length > 0) {
      this.OrderData1.orderDetails.forEach(x => {
        this.totalCGST = this.totalCGST + x.CGSTTaxAmmount;
      });
    }
  }
  totalSGST: any
  getTotalSGST() {

    this.totalSGST = 0;
    if (this.OrderData1.orderDetails.length > 0) {
      this.OrderData1.orderDetails.forEach(x => {
        this.totalSGST = this.totalSGST + x.SGSTTaxAmmount;
      });
    }
  }
  TotalIOverall: any
  getTotalIOverall() {

    this.TotalIOverall = 0;
    if (this.OrderData1.orderDetails.length > 0) {
      {
        this.OrderData1.orderDetails.forEach(x => {

          this.TotalIOverall = this.TotalIOverall + x.AmtWithoutTaxDisc + x.SGSTTaxAmmount + x.CGSTTaxAmmount + x.CessTaxAmount;
        });
      }
    }
  }
  totalAWOTD: any
  getTotalAWOTD() {
    this.totalAWOTD = 0;
    if (this.OrderData1.orderDetails.length > 0)
      this.OrderData1.orderDetails.forEach(x => {

        this.totalAWOTD = this.totalAWOTD + x.AmtWithoutTaxDisc;
      });
  }
  totalQty: number=0
  getTotalQty() {
    debugger
    this.totalQty=0
    if (this.OrderData1.orderDetails.length > 0) {
      this.OrderData1.orderDetails.forEach(x => {

        this.totalQty = this.totalQty + x.Noqty;
      });
    }

  }
  totalAmount: number=0
  gettotalAmount() {
    debugger
    this.totalAmount=0
    if (this.OrderData1.orderDetails.length > 0) {
      this.OrderData1.orderDetails.forEach(x => {

        this.totalAmount = this.totalAmount + x.TotalAmt;
      });
    }

  }

  bill: any
  AssOrder: any
  showPrintContent: boolean = false;

  togglePrintContent(OrderData) {

    this.showPrintContent = true;
    // this.service.GetOfferItem(OrderData.OrderId).subscribe((res) => {
    //   console.log(res, "GetOfferItem");
    //   this.AssOrder = res
    //   this.showPrintContent = true;
    // })

  }

  amountdecimal(event) {
    //
    var charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 46) {
      event.preventDefault();
    }
    if (charCode === 46 && event.target.value.indexOf('.') !== -1) {
      event.preventDefault();
    }
    var dotIndex = event.target.value.indexOf('.');
    if (dotIndex !== -1 && event.target.value.length - dotIndex > 2) {
      event.preventDefault();
    }
  }
  mobilenumber: any;
  onmobilenumberchange(a) {
    debugger
    this.mobilenumber = a;
    console.log(this.mobilenumber);
    
  }
  SendInvoice(Order) {
debugger
    if (this.OrderData.IsInvoiceSent == true) {
      if (this.mobilenumber.length == 10) {

      }
      else {
        alert("Please Enter 10 Digit Mobile Number")
        return false;
      }
    }
    else {
      this.mobilenumber = "";
    }
    this.service.GetBackendOrderInvoiceHtml(Order.OrderId, this.mobilenumber).subscribe((Res) => {
      alert(Res);
      window.location.reload();

    })

  }
  paymentpopup: boolean = false
  open(data) {

    this.paymentpopup = true
  }
  CancelOrder(order) {
debugger
    this.dataToPost = {
      BOPayments: [],
      OrderId: this.OrderData.OrderId,
      Status: 'Order Cancel'
    };

    this.service.UpdatePaymentStatus(this.dataToPost).subscribe(data => {
      console.log(data)
      if (data.Status == true) {
        alert(data.Message)
        window.location.reload();
      } else {
        alert(data.Message)
        window.location.reload();
      }

    })
  }

  paymentModeList: any[]

  Referen: any
  hidde: boolean = false;
  paymentmode(mode) {
    ;
    var modepayment = mode
    if (modepayment == "Cash") {
      this.hidde = true;
    } else {
      this.hidde = false;
    }
  }
  tamount: number = 0;
  ttamount: number = 0;
  upiamounts: number = 0;
  upiamount: number = 0;
  originalCashAmount: any
  Data: any = []
  dataItems: any = []
  totalAmountOfLists: any = 0;
  keypress(amount, OrderData, ab) {
    ;
    console.log("ab", ab);
    //  alert(this.tottalll)
    //  alert(this.Data.AmountRtgs)
    //  alert(this.Data.AmountPOS)
    this.tamount = 0;
    this.ttamount = 0;
    this.upiamounts = 0;
    this.upiamount = 0;

    if (ab && ab.UPI == 'UPI') {
      this.Data.Cash = amount
    }
    // if (this.Data.RTGS == 'RTGS') {
    //   this.Data.AmountRtgs = amount
    // }
    // if (this.Data.POS == 'POS') {
    //   this.Data.AmountPOS = amount
    // }

    if (this.Data.AmountPOS > 0) {

    }
    else {
      this.Data.AmountPOS = 0;
    }
    if (this.Data.AmountRtgs > 0) { }
    else {
      this.Data.AmountRtgs = 0;
    }
    if (this.originalCashAmount == undefined && (this.tottalll || this.Data.AmountRtgs || this.Data.AmountPOS)) {
      this.originalCashAmount = this.tottalll;
    }
    this.ttamount = this.Data.AmountRtgs + this.Data.AmountPOS;
    if (this.dataItems.length > 0) {
      this.dataItems.forEach(ele => {
        if (ele.UPI) {
          this.upiamount = ele.amount.upi + this.upiamount;
        }
      });
      if (this.upiamount > 0) {
        this.ttamount += this.upiamount;
      }
    }

    if (this.ttamount > this.totalAmountOfLists) {
      if (this.Data.AmountRtgs == amount) {
        this.Data.AmountRtgs = 0;

        this.tamount = this.originalCashAmount - this.Data.AmountRtgs - this.Data.AmountPOS - this.Data[0].AmountUPI;
        if (this.dataItems.length > 0) {
          this.dataItems.forEach(item => {
            if (item.UPI) { this.upiamounts += item.amount.upi; }
          });
          if (this.upiamount > 0) {
            this.tamount -= this.upiamounts;
          }
        }
        this.tottalll = this.tamount;
        alert("please Enter Correct Amount")
        return false;
      }
      if (this.Data.AmountPOS == amount) {
        this.Data.AmountPOS = 0;

        this.tamount = this.originalCashAmount - this.Data.AmountRtgs - this.Data.AmountPOS - this.Data[0].AmountUPI;
        if (this.dataItems.length > 0) {
          this.dataItems.forEach(item => {
            if (item.UPI) { this.upiamounts += item.amount.upi; }

          });
          if (this.upiamount > 0) {
            this.tamount -= this.upiamounts;
          }
        }
        this.tottalll = this.tamount;
        alert("please Enter Correct Amount")
        return false;
      }
      else {
        this.dataItems.forEach(item => {
          if (item.UPI) {
            if (item.amount.upi == amount) {
              item.amount.upi = 0;
              this.tamount = this.originalCashAmount - this.Data.AmountRtgs - this.Data.AmountPOS - this.Data[0].AmountUPI;
              if (this.dataItems.length > 0) {
                this.dataItems.forEach(element => {
                  if (item.UPI) { this.upiamounts += item.amount.upi; }
                })
                if (this.upiamount > 0) {
                  this.tamount -= this.upiamounts;
                }
              }
            }
          }
        });
        this.tottalll = this.tamount;
        alert("please Enter Correct Amount")
        return false;
      }
    }
    this.tottalll = this.originalCashAmount - this.Data.AmountRtgs - this.Data.AmountPOS - this.Data[0].AmountUPI;
    if (this.Data.Cash && amount === "") {
      this.tottalll = this.originalCashAmount;
    } else if (this.Data.RTGS && amount === "") {
      this.tottalll = this.originalCashAmount - this.Data.AmountRtgs;
    } else if (this.Data.POS && amount === "") {
      this.tottalll = this.originalCashAmount - this.Data.AmountPOS;
    } else if (this.Data.UPI && amount === "") {
      this.tottalll = this.originalCashAmount - this.Data[0].AmountUPI;
    }

    this.dataItems.forEach(item => {

      if (item.UPI) {

        this.tottalll -= item.amount.upi;
      }
      if (item.RTGS) {


        this.tottalll -= item.amount.rtgs;
      }
      if (item.POS) {

        this.tottalll -= item.amount.pos;
      }
    });

    var totalUpiAmount = 0;
    var totalRtgsAmount = this.Data.AmountRtgs || 0;
    var totalPosAmount = this.Data.AmountPOS || 0;

    this.dataItems.forEach(item => {
      totalUpiAmount += item.amount.upi || 0;
      totalRtgsAmount += item.amount.rtgs || 0;
      totalPosAmount += item.amount.pos || 0;

    });


    this.totalAmountOfLists = this.tottalll + totalUpiAmount + totalRtgsAmount + totalPosAmount;
    if (this.tottalll > 0) {
      this.Data.Cash = true;
    }
    else {
      this.Data.Cash = false;
    }
    console.log(this.dataItems)
  }

  UPIRef(data) {
    ;
    console.log(data)
    console.log(this.dataItems)
    if (this.dataItems.length > 0) {
      this.dataItems.forEach(item => {
        if (item.amount["upi"] > 0) {
          if (data.ref["Upi"] == undefined || data.ref["Upi"] == null || data.ref["Upi"] == "" || data.ref["Upi"] == "undefined") {
            item.isupiamountbtn = false
          }
          else {
            item.isupiamountbtn = true
          }
        }
      });
    }
  }
  differenceamt: number = 0
  isaddbtnenabled: boolean = false;
  RefanceNumberStatus: boolean = false;
  Barcodeimg: boolean = false;
  allfalsebtn: boolean = false;
  StatusMsg(item) {
    this.service.CheckUPIResponse(this.OrderData.OrderId, item.amount.upi).subscribe(data => {
      console.log(data);
      if (data.IsSuccess == true) {
        this.differenceamt = 0;
        this.isaddbtnenabled = true;
        console.log(this.dataItems);
        if (this.dataItems.length > 0) {

          if (this.dataItems.length > 0) {
            this.dataItems.forEach(abc => {
              abc.isqrgenerated = false;
            });

          }
          this.dataItems.forEach(abc => {
            abc.isrefgenerated = false;
            abc.ischeckstatus = true;
            abc.ref["Upi"] = data.UPITxnID
          });

        }
        item.isupiamountbtn = true;
        this.RefanceNumberStatus = true;
        this.Barcodeimg = false;

        this.allfalsebtn = true;
        alert(data.amount + " Rs. Received Successfully");
        if (item.amount.upi == data.amount) { }
        else {
          if (item.amount.upi > data.amount) {
            this.differenceamt = item.amount.upi - data.amount;
            this.tottalll += this.differenceamt;
            this.dataItems.forEach(abc => {
              if (abc.$$hashKey == item.$$hashKey) {
                abc.amount["upi"] = data.amount;
              }
            });

          }
        }
      } else {
        this.isaddbtnenabled = false;
        alert("payment is awaited Failed.");
        this.RefanceNumberStatus = false;
        item.isupiamountbtn = false;
        this.Barcodeimg = true;
        this.allfalsebtn = false;
      }
    })
  };

  QRCodeGen(item) {

    console.log(this.dataItems)
    console.log(item)
    if (item.amount.upi == undefined || item.amount.upi == "" || item.amount.upi == null) {
      alert("Please Enter Amount");
      return false;
    }
    var PostData = {
      OrderId: this.OrderData.OrderId,
      amount: item.amount.upi
    };

    console.log(PostData);
    this.service.GenerateBackEndAmtQRCode(PostData).subscribe(data => {
      console.log(data);
      if (data.Status == true) {
        item.qrCode = data.QRCodeurl;
        alert(data.msg);

        if (data.msg == "Qr Code Generated Successfully!!") {
          if (this.dataItems.length > 0) {
            this.dataItems.forEach(abc => {
              abc.isqrgenerated = true;
            });
          }
          this.Barcodeimg = true;
          item.qrrefance = true;
        } else {
          item.qrrefance = false;
        }
      } else {
        alert(data.msg);
        this.Barcodeimg = false;
        this.qrrefance = false;
      }

    })
  };

  qrrefance: boolean = false

  preventSpaceAndMinus(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (!((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
      event.preventDefault();
    }
  };

  checkboxUPI: boolean = true


  paymentmodeUpi(item, index) {
debugger
    item.modepaymentUpi = item.UPI;
    if (item.UPI == 'UPI') {
      if (this.isaddbtnenabled == false) {
        this.isaddbtnenabled = true
      }
      if (this.dataItems[index].amount.upi > 0) {
        this.tottalll += this.dataItems[index].amount.upi

      }

    }
    else {

      if (this.dataItems[index].amount.upi > 0) {
        this.tottalll += this.dataItems[index].amount.upi
        this.dataItems.splice(index, 1)
      }
      else {
        this.dataItems.splice(index, 1)
      }
    }

  };

  addSomething() {
    this.isaddbtnenabled = false;
    this.dataItems.push({
      UPI: false,
      modepaymentUpi: false,
      isupiamountbtn: false,
      amount: { upi: 0 },
      Barcodeimg: false,
      ref: { Upi: '' },
      isqrgenerated: true,
      isrefgenerated: true,
      ischeckstatus: true
    });
  };


  modepaymentRTGS: any;
  isrtgsamountbtn: boolean = false
  paymentmodeRTGS(mode) {

    this.modepaymentRTGS = mode;
    if (mode.RTGS[0] == 'RTGS') {

      this.modepaymentRTGS = true;
    }
    else {

      this.tottalll = this.Data.AmountRtgs + this.tottalll;
      this.Data.AmountRtgs = null;
      this.Data.RefanceRTGS = undefined;
      this.modepaymentRTGS = false
      this.isrtgsamountbtn = false
      this.Data.AmountRtgs = null
    }

  }

  RTGSRef(data) {
    if (data.AmountRtgs > 0) {
      console.log(data)
      if (data.RefanceRTGS == undefined || data.RefanceRTGS == null || data.RefanceRTGS == "" || data.RefanceRTGS == "undefined") {
        this.isrtgsamountbtn = true;
      }
      else {
        this.isrtgsamountbtn = false;
      }
    }

  }
  modepaymentPOS: any
  isposamountbtn: boolean = false
  paymentmodePOS(mode) {

    this.modepaymentPOS = mode

    if (mode.POS[0] == 'POS') {

      this.modepaymentPOS = true;
    } else {
      this.modepaymentPOS = false;
      this.tottalll = this.Data.AmountPOS + this.tottalll;
      this.Data.AmountPOS = null;

      this.Data.RefancePOS = undefined;
      this.isposamountbtn = false
    }

  }

  POSRef(data) {
    if (data.AmountPOS > 0) {
      console.log(data)
      if (data.RefancePOS == undefined || data.RefancePOS == null || data.RefancePOS == "" || data.RefancePOS == "undefined") {
        this.isposamountbtn = false;
      }
      else {
        this.isposamountbtn = true;
      }
    }
  }
  updatepaymenttotalamount: number = 0
  isupdatepaymentbtn: boolean = false
  dataToPost: any
  updatepayment(data) {

    this.paymentModeList = [];
    this.updatepaymenttotalamount = 0;
    this.isupdatepaymentbtn = true;
    if (this.tottalll > 0) {
      this.dataToPost = {
        'PaymentMode': "Cash",
        'PaymentRefNo': "",
        'Amount': this.tottalll
      };
      this.paymentModeList.push(this.dataToPost);
    }
    if (this.Data.AmountPOS > 0) {
      if (this.Data.RefancePOS == undefined || this.Data.RefancePOS == "" || this.Data.RefancePOS == null || this.Data.RefancePOS == "undefined") {
        alert("Please Enter POS Reference Number")
        this.isupdatepaymentbtn = false;
        return false;
      }
      else {
        this.dataToPost = {
          'PaymentMode': "POS",
          'PaymentRefNo': this.Data.RefancePOS,
          'Amount': this.Data.AmountPOS
        };
        this.paymentModeList.push(this.dataToPost);
      }
    }
    if (this.Data.AmountRtgs > 0) {
      if (this.Data.RefanceRTGS == undefined || this.Data.RefanceRTGS == "" || this.Data.RefanceRTGS == null || this.Data.RefanceRTGS == "undefined") {
        alert("Please Enter RTGS Reference Number")
        this.isupdatepaymentbtn = false;
        return false;
      }
      else {
        this.dataToPost = {
          'PaymentMode': "RTGS",
          'PaymentRefNo': this.Data.RefanceRTGS,
          'Amount': this.Data.AmountRtgs
        };
        this.paymentModeList.push(this.dataToPost);
      }
    }
    this.dataItems.forEach(item => {
debugger
if(item.UPI=='UPI' && item.amount.upi ==0)
{
  alert("Please Enter UPI Amount");
  return false;
}
      if (item.amount.upi> 0) {
       
        if (item.ref.Upi == undefined || item.ref.Upi == "" || item.ref.Upi == null || item.ref.Upi == "undefined") {
          alert("Please Enter UPI Refernce Number");
          this.isupdatepaymentbtn = false;
          return false;
        }
        else {
          var dataToPost = {
            'PaymentMode': "UPI",
            'PaymentRefNo': item.ref.Upi,
            'Amount': item.amount.upi
          };
          this.paymentModeList.push(dataToPost);
        }
      }

    });

    if (this.isupdatepaymentbtn == true) {
      this.paymentModeList.forEach(item => {
        this.updatepaymenttotalamount += item.Amount
      });

      if (this.updatepaymenttotalamount == this.totalAmountOfLists) {
        this.dataToPost = {
          BOPayments: this.paymentModeList,
          OrderId: this.OrderData.OrderId,
          Status: 'PaymentSuccess'
        };
        
        if (confirm("Are you sure want to Update the Payment")) {

          this.service.UpdatePaymentStatus(this.dataToPost).subscribe(data => {
            console.log(data)
            if (data.Status == true) {
                alert(data.Message)
                window.location.reload();
            } else {
                alert(data.Message)
                window.location.reload();
            }
          });
        }

      }
      else {
        alert("Amount Mismatched")
        return false;
      }
    }
  }


  isEnlarged: boolean = false;

  toggleImageSize(event: any) {
    this.isEnlarged = !this.isEnlarged;

    const img = event.target as HTMLImageElement;
    if (this.isEnlarged) {
      img.style.width = '300px';
      img.style.height = '300px';
    } else {
      img.style.width = '150px';
      img.style.height = '150px';
    }
  }

}

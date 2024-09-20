import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
@Input() AllOrderList : any;
@Input() allData : any;
@Input() dispatchMaster :any;
warehouse:any;
// OrderData1:{
//  'amount': '',
// };
offerbill:any;
amount:any;
offeritem:any;
suminvoice:any;
tcspercent:any;
warehouseid:any;
payment:any;
CustomerCriticalInfo:any;
orderCount:any;
skFree:any;
HideCessColumn:boolean= false;
// orderListTrue:boolean;
// @Input() warehouse : any;
@Output() close: EventEmitter<void> = new EventEmitter<void>();
  constructor( private cityService: CityService) { }

  ngOnInit() {
    this.AllOrderList;
    console.log(' this.AllOrderList', this.AllOrderList)
    debugger;
    
    this.cityService.GetInvoiceAmount(this.AllOrderList.GrossAmount).subscribe(x=>{
      this.amount = x;
      console.log('this.amount', this.amount);
    })
    this.cityService.GetTCSPercent(this.AllOrderList.CustomerId).subscribe(x=>{
      this.tcspercent = x;
      console.log('this.tcspercent',this.tcspercent);
    })
    // this.cityService.GetWarehouseDetail().subscribe(x=>{
    //   this.warehouse = x;
    //   console.log('warehouse',this.warehouse);
    // })
    this.cityService.GetWarehouseid(this.AllOrderList.WarehouseId).subscribe(x=>{
      this.warehouseid = x;
      console.log('wwwww',this.warehouseid);
    })
    this.cityService.GetOfferBill(this.AllOrderList.OrderId).subscribe(x=>{
        this.offerbill = x;
        console.log('offerbill',this.offerbill);
      })
    this.cityService.GetOfferItem(this.AllOrderList.OrderId).subscribe(x=>{
      this.offeritem = x;
      console.log('offeritem',this.offeritem);
    })
    
    this.cityService.GetSuminvoice(this.AllOrderList.OrderId).subscribe(x=>{
      this.suminvoice = x;
      console.log('suminvoice',this.suminvoice)
    })
    this.cityService.Getpaymentstatus(this.AllOrderList.OrderId).subscribe(x=>{
      this.payment = x;
      console.log('payment',this.payment);
    })
    this.cityService.CheckCustomerCritical(this.AllOrderList.CustomerId).subscribe(x=>{
      this.CustomerCriticalInfo = x;
      console.log('custiomerCritical',this.CustomerCriticalInfo)
    })
    this.cityService.GetOrderCount(this.AllOrderList.OrderId).subscribe(x=>{
      this.orderCount = x;
      console.log('orderCount',this.orderCount);
    })
    this.cityService.GetSkFree(this.AllOrderList.OrderId).subscribe(x=>{
      this.skFree = x;
      console.log('skFree',this.skFree);
    })
  //   this.cityService.getSumInvoice(this.search.OrderId).subscribe(x => {
  //     console.log('x',x);
  //     //this.loaderService.loading(false);
  //     if (x.length > 0) {
  //       // this.orderListTrue=true;
  //       this.search = x.ordermaster;
  //       console.log('search',this.search);
  //       this.warehouse=x.warehouse;
  //     } else {
  //       // this.orderListTrue=false;
  //      // this.loaderService.loading(false);
  //      // this.messageService.add({ key: 'main', severity: 'info', summary: 'error', detail: 'No Data Found!!' });
  //     }
  //   });
  this.HideCessColumn = false;
  //function to remove zero cess  item column from invoice print
  this.AllOrderList.orderDetails.forEach(element=>{
      if (element.CessTaxAmount > 0) {
          this.HideCessColumn = true;
      }
  });
  }
  
  onClickBack(){
    this.close.emit();
  }
  getTotalTax(data) {
    var totaltax = 0;
    data.forEach(x => {

        //totaltax = totaltax + x.AmtWithoutTaxDisc;
        totaltax = totaltax + (x.TaxAmmount + x.CessTaxAmount);
    });
    return totaltax;
}
  getTotalQty(data) {
    var totalQty = 0;
    data.forEach(x => {

      totalQty = totalQty + x.Noqty;
    });
    return totalQty;
  }
  getTotalAWOTD(data) {
    var totalAWOTD = 0;
    data.forEach(x => {

      totalAWOTD = totalAWOTD + x.AmtWithoutTaxDisc;
    });
    return totalAWOTD;
  }
  getTotalCess(data) {
    var totalCess = 0;
    data.forEach(x => {

      totalCess = totalCess + x.CessTaxAmount;
    });
    return totalCess;
  }

  getTotalIOverall(data) {

    var TotalIOverall = 0;
    data.forEach(x => {

      TotalIOverall = TotalIOverall + x.AmtWithoutTaxDisc + x.SGSTTaxAmmount + x.CGSTTaxAmmount + x.CessTaxAmount;
    });
    return TotalIOverall;
  }
  getTotalAmtIncTaxes(data) {
    var totalAmtIncTaxes = 0;
    data.forEach(x => {

        totalAmtIncTaxes = totalAmtIncTaxes + x.TotalAmt;
    });
    return totalAmtIncTaxes;
}
getTotalTaxableValue(data) {
    var totalTaxableValue = 0;
    data.forEach(x => {
        totalTaxableValue = totalTaxableValue + x.AmtWithoutTaxDisc;

    });
    return totalTaxableValue;
}
  getTotalIGST(data) {
    var totalIGST = 0;
    data.forEach(x => {

      totalIGST = totalIGST + x.TaxAmmount + x.CessTaxAmount;
    });
    return totalIGST;
  }
  getTotalSGST(data) {
    var totalSGST = 0;
    data.forEach(x => {

      totalSGST = totalSGST + x.SGSTTaxAmmount;
    });
    return totalSGST;
  }
  getTotalCGST(data) {
    var totalCGST = 0;
    data.forEach(x => {

      totalCGST = totalCGST + x.CGSTTaxAmmount;
    });
    return totalCGST;
  }
 
}


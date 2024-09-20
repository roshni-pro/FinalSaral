import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-all-invoice-print-list',
  templateUrl: './all-invoice-print-list.component.html',
  styleUrls: ['./all-invoice-print-list.component.scss']
})
export class AllInvoicePrintListComponent implements OnInit {
@Input() AllOrderList : any;
@Input() warehouse : any;
private apiURL: string;
@Output() close: EventEmitter<void> = new EventEmitter<void>();
  constructor() {this.apiURL = environment.apiURL  }

  ngOnInit() {
    this.AllOrderList;
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

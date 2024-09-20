import { Component, OnInit } from '@angular/core';
import { LadgerService } from 'app/shared/services/ladger.service';

@Component({
  selector: 'app-ladger-correction',
  templateUrl: './ladger-correction.component.html',
  styleUrls: ['./ladger-correction.component.scss']
})
export class LadgerCorrectionComponent implements OnInit {
  obj: any;
  objCopy: any;
  blocked: boolean;
  orderID: number;
  PaymentResponseRetailerAppList: any;
  constructor(private ladgerService: LadgerService) { }

  ngOnInit() {
    this.blocked = false;
  }

  search() {

    if (this.orderID) {
      this.blocked = true;
      this.ladgerService.getLadgerToCorrect(this.orderID).subscribe(result => {
        console.log(result);
        this.obj = result;
        this.objCopy = JSON.parse(JSON.stringify(this.obj));
        this.PaymentResponseRetailerAppList = this.obj.PaymentResponseRetailerAppList;
        this.blocked = false;
      });
    }
  }

  save() {
    this.ladgerService.updateLedger(this.obj).subscribe(result => {
      console.log('result is: ', result);
    });
  }

  onCashAmountChange(event) {
    if (this.obj.OrderDispatchedMasterInfo) {
      this.obj.OrderDispatchedMasterInfo.CashAmount = event;
    }
    if (this.obj.OrderDeliveryMasterInfo) {
      this.obj.OrderDeliveryMasterInfo.CashAmount = event;
    }
    if (this.obj.FinalOrderDispatchedMasterInfo) {
      this.obj.FinalOrderDispatchedMasterInfo.CashAmount = event;
    }

    this.obj.LedgerUpdatedFields.Cash = true;

  }

  onChequeAmountChange(event) {
    if (this.obj.OrderDispatchedMasterInfo) {
      this.obj.OrderDispatchedMasterInfo.CheckAmount = event;
    }
    if (this.obj.OrderDeliveryMasterInfo) {
      this.obj.OrderDeliveryMasterInfo.CheckAmount = event;
    }
    if (this.obj.FinalOrderDispatchedMasterInfo) {
      this.obj.FinalOrderDispatchedMasterInfo.CheckAmount = event;
    }

    this.obj.LedgerUpdatedFields.Cheque = true;
  }

  onElectronicAmountChange(event) {
    if (this.obj.OrderDispatchedMasterInfo) {
      this.obj.OrderDispatchedMasterInfo.ElectronicAmount = event;
    }
    if (this.obj.OrderDeliveryMasterInfo) {
      this.obj.OrderDeliveryMasterInfo.ElectronicAmount = event;
    }
    if (this.obj.FinalOrderDispatchedMasterInfo) {
      this.obj.FinalOrderDispatchedMasterInfo.ElectronicAmount = event;
    }
    this.obj.LedgerUpdatedFields.Electronic = true;

  }

}

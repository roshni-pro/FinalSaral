import { Component, OnInit } from '@angular/core';
import { PurchaseRequestSettlementService } from 'app/pr-ir-payments/Services/purchase-request-settlement.service';
import { PurchaseRequestSettlementFilter, PurchaseRequestSettlementContainer, PurchaseRequestSettlementPage, PurchaseRequestPaymentSettlementDc } from 'app/pr-ir-payments/Interfaces/purchase-request-settlement-filter';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-closed-prpayments',
  templateUrl: './closed-prpayments.component.html',
  styleUrls: ['./closed-prpayments.component.scss']
})
export class ClosedPRPaymentsComponent implements OnInit {
  isLoading: boolean;
  filter: PurchaseRequestSettlementFilter;
  data: PurchaseRequestSettlementContainer;
  pageList: PurchaseRequestSettlementPage[];
  selectedPayment: PurchaseRequestSettlementPage;
  totalRecords: number;
  showTable: boolean;
  isOpenPaymentDialog: boolean;
  irList: any[];
  selectedIRList: any[];
  irPopupColumnList: any[];
  constructor(
      private purchaseRequestSettlementService: PurchaseRequestSettlementService
    , private messageService: MessageService) { }

  ngOnInit() {
    this.isLoading = false;
    this.selectedIRList = [];
    this.irPopupColumnList = [
      { field: 'PurchaseOrderId', header: 'POId' },
      { field: 'InvoiceNumber', header: 'InvoiceNumber' },
      { field: 'TotalAmountRemaining', header: 'Remaining Amount' },
      { field: 'SettleAmount', header: 'Settle Amount' },
      { field: 'InvoiceDate', header: 'Invoice Date', isDate: true }
    ];
    this.showTable = false;
    this.resetFilter();
  }

  onLoadPage(event) {
    console.log('event: ', event);
    if (event) {
      this.filter.Skip = event.first;
      this.filter.Take = event.rows;
    }else{
      //this.filter.Skip = 0;
      //do nothing 
    }
    this.pageList = null; 
    this.isLoading = true;
    this.totalRecords = 0;
    this.purchaseRequestSettlementService.getPageList(this.filter).subscribe(x => {
      this.isLoading = false;
      this.data = x;
      this.pageList = this.data.PageList;
      this.totalRecords = this.data.TotalRecords;
      console.log('this.data: ', this.data);
    });
  }

  resetFilter() {
    this.filter = {
      Skip: 0,
      Take: 10,
      SupplierId: 0,
      WarehouseId: 0
    }
    this.showTable = true;
    this.selectedIRList = [];
  }

  settlePayment(payment: PurchaseRequestSettlementPage) {
    this.isLoading = true;
    this.selectedPayment = payment;
    this.selectedPayment.AfterSettleRemainingAmount = this.selectedPayment.RemainingAmount;
    this.irList = null;
    this.selectedIRList = [];
    this.purchaseRequestSettlementService.getIRList(payment.SupplierId).subscribe(x => {
      this.irList = x;
      this.isLoading = false;
      console.log('ir list is:', x);
      this.isOpenPaymentDialog = true;
    });
  }

  onCheckUnCheckIR(ir) {
    if (!ir.IsSelected && this.canSelect(ir)) {
      ir.IsSelected = true;
      const amountToSettle = this.selectedPayment.AfterSettleRemainingAmount > ir.SettleAmount ? ir.SettleAmount : this.selectedPayment.AfterSettleRemainingAmount;
      this.selectedPayment.AfterSettleRemainingAmount -= amountToSettle;
      this.selectedIRList.push({
        IRMasterId: ir.IRMasterId,
        SettleAmount: ir.SettleAmount,
        PayingAmount: amountToSettle,
        InvoiceNumber: ir.InvoiceNumber,
        PurchaseOrderId: ir.PurchaseOrderId
      });
    } else if (ir.IsSelected) {
      ir.IsSelected = false;
      const selectedIr = this.selectedIRList.filter(x => { return x.IRMasterId == ir.IRMasterId })[0];
      this.selectedPayment.AfterSettleRemainingAmount += selectedIr.PayingAmount;
      this.selectedIRList = this.selectedIRList.filter(x => { return x.IRMasterId != ir.IRMasterId });
    } else if (!ir.IsSelected) {
      alert('cant select , limit exceed');
    }


  }

  private canSelect(ir): boolean {
    if (this.selectedPayment.AfterSettleRemainingAmount > 0) {
      return true;
    } else {
      return false;
    }
  }

  savePayment() {
    this.isOpenPaymentDialog = false;
    const payment: PurchaseRequestPaymentSettlementDc = {
      PaymentList: this.selectedIRList,
      PurchaseOrderId: this.selectedPayment.PurchaseOrderId,
      PurchaseRequestPaymentId: this.selectedPayment.PurchaseRequestPaymentId,
      AfterSettleRemainingAmount: this.selectedPayment.AfterSettleRemainingAmount,
      SupplierId: this.selectedPayment.SupplierId
    }
    
    this.isLoading = true;
    this.purchaseRequestSettlementService.settlePayment(payment).subscribe(x => {
      this.messageService.add({ severity: 'success', summary: 'Settled Successfully', detail: '' });
      console.log('settlePayment: ', x);
      this.isLoading = false;
      this.onLoadPage(null);
    },err =>{
      this.messageService.add({ severity: 'error', summary: 'Something went wrong, try later.....', detail: '' });
    });
  }

  cancelPayment() {
    this.selectedIRList = [];
    this.isOpenPaymentDialog = false;
  }

}

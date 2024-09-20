import { LoaderService } from '../../../../shared/services/loader.service';
import { AgentCommissionPaymentService } from 'app/agent-commission-payment/services/agent-commission-payment.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { IrOutstandingListDC } from 'app/shared/interface/supplier/ir-outstanding-list-dc';
import { Router, ActivatedRoute } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { IrpaymentsService } from '../../../Services/irpayments.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { IrOutstandingPaginator } from 'app/shared/interface/supplier/ir-outstanding-paginator';
import { IrOutstandingDC } from 'app/shared/interface/supplier/ir-outstanding-dc';
import { IrOutstandingPayment } from 'app/shared/interface/supplier/ir-outstanding-payment';
import { PrPayments } from 'app/pr-ir-payments/Interfaces/PrPayments';
import { PurchaseRequestSettlementService } from 'app/pr-ir-payments/Services/purchase-request-settlement.service';
import { from } from 'rxjs';
import * as _ from 'lodash';
import { ExportServiceService } from 'app/shared/services/export-service.service';


@Component({
  selector: 'app-prpayment-details',
  templateUrl: './prpayment-details.component.html',
  styleUrls: ['./prpayment-details.component.scss']
})
export class PRPaymentDetailsComponent implements OnInit {

  PrPaymentsList = []
  paginator: IrOutstandingPaginator;
  irOutstandingList: any;
  totalCount: number;
  warehouseList: any[];
  isLoading: boolean;
  selectedList = [];
  isOpenPopup: boolean;
  PrPayment: PrPayments;
  irSummaryObject: any;
  bankList: any[];
  isValidated: boolean;
  invalidPaidAmt: boolean;
  isBankInfoCorrect: boolean;
  popupdata: any;
  isOpenPopupnew: boolean;
  currentPoForReject = null;
  datatopost: any;
  checkvalue: any;
  searchModel: any;
  comment: any;
  supplierOutstandingList: any[];
  stepNumber: number;
  paymentsGroupBySupplier: PaymentGroup[];
  isBankPaymentRequired: boolean;
  constructor(private exportService:ExportServiceService, private warehouseService: WarehouseService, private irDetailsService: IrpaymentsService, private messageService: MessageService,
    private router: Router, private supplierService: SupplierService, private confirmationService1: ConfirmationService,
    private loaderService: LoaderService,
    private agentCommissionPaymentService: AgentCommissionPaymentService, private r: ActivatedRoute,
    private purchaseRequestSettlementService: PurchaseRequestSettlementService,
    private ref: ChangeDetectorRef) { this.searchModel = {}; }

  ngOnInit() {
    this.irSummaryObject = null;
    this.selectedList = [];
    this.stepNumber = 1;
    this.isOpenPopup = false;
    this.initializePaginator();
    this.getPrPayments();
    this.getAllWarehouses();
    this.isBankInfoCorrect = false;
    this.stepNumber = 1;
  }

  getAllWarehouses() {

    this.warehouseService.GetAllWarehouse().subscribe(whouses => {
      this.warehouseList = whouses;
    });
  }

  getPrPayments() {
    this.irDetailsService.getPrListByFilter(this.paginator).subscribe(PrPaymentsList => {
      this.PrPaymentsList = PrPaymentsList.PrList;
      this.totalCount = PrPaymentsList.Count;
    });
  }

  initializePaginator() {
    this.paginator = {
      WarehouseId: null,
      Search: null,
      EndDate: null,
      StartDate: null,
      SkipCount: 0,
      Take: 20
    };
  }

  loadLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.SkipCount = event.first;
        this.paginator.Take = event.rows;
        this.getData();
      }
    }, 100);
  }

  filter() {
    this.paginator.SkipCount = 0;
    this.paginator.Take = 20;
    this.getData();
  }

  onRowClick(ir) {
    debugger
    if (ir.IsPaymentDone) {
      this.messageService.add({ severity: 'error', summary: 'Payment already done for this PR!', detail: '' });
    }
    else {
      ir.IsSelected = !ir.IsSelected;
      let index = this.selectedList.indexOf(ir);
      if (index != -1) {
        this.selectedList.splice(index, 1);
      }
      else {
        ir.PaidAmount = Math.trunc(ir.Advance_Amt);
        this.selectedList.push(ir);
      }
    }
    this.calcculateIrSummary();
  }
  
  openPopup() {
    this.stepNumber = 1;
    this.isValidated = false;
    this.invalidPaidAmt = false;
    this.supplierService.GetBank().subscribe(result => {
      this.bankList = result;
    });

    //#region roundOff advance Payment
    this.roundPayment();
    //#endregion
    debugger
    //#region group by supplier id and assign to paymentsGroupBySupplier 
    let tempGroup = _.groupBy(this.selectedList, 'SupplierId');
    this.paymentsGroupBySupplier = [];
    Object.keys(tempGroup).forEach(supplierId => {
      this.paymentsGroupBySupplier.push({
        SupplierId: Number(supplierId),
        SupplierName: tempGroup[supplierId][0].SupplierName,
        ListOfPayments: tempGroup[supplierId],
        AdvanceOutstanding: 0,
        TotalAdvancePayment: 0,
        RemainingAdvanceOutstanding: 0,
        BankAmount: 0,
        TDSPercentage:tempGroup[supplierId][0].TDSPercentage,
        PaymentAmount : tempGroup[supplierId][0].PaymentTillDate
      });
      console.log("data",this.paymentsGroupBySupplier);
    });
    //#endregion

    //#region sort payment in each group by Advance amount in descending
    this.paymentsGroupBySupplier.forEach(x => {
      x.ListOfPayments.sort(function (a, b) { return b.Advance_Amt - a.Advance_Amt });
    })
    //#endregion
    //#region sort group by supplier name in ascending order
    function compare(a, b) {
      if (a.SupplierName.toLowerCase() < b.SupplierName.toLowerCase()) {
        return -1;
      }
      if (a.SupplierName.toLowerCase() > b.SupplierName.toLowerCase()) {
        return 1;
      }
      return 0;
    }
    this.paymentsGroupBySupplier.sort(compare);
    //#endregion

    //#region initialize advance payment
    let reducerFunc = (total, itm) => total + itm.Advance_Amt;

    this.paymentsGroupBySupplier.forEach(item => {
      item.TotalAdvancePayment = item.ListOfPayments.reduce(reducerFunc, 0);
    });
    //#endregion

    //#region get supplier advance outstanding from backend and set to paymentsGroupBySupplier 
    let arr = this.paymentsGroupBySupplier.map(x => x.SupplierId);
    this.purchaseRequestSettlementService.getAdvanceOutstanding(arr).subscribe(result => {
      console.log('result is: ', result);
      this.supplierOutstandingList = result;
      this.initializeSupplierOutstandingList();

      console.log('this.paymentsGroupBySupplier: ', this.paymentsGroupBySupplier);
      this.autoSettleAmount();
    });
    //#endregion
debugger
    //#region update bank amount for each group
    this.updateAllBankAmount();
    //#endregion


    this.PrPayment = {
      BankId: null,
      BankName: '',
      PrList: this.selectedList,
      PaymentDate: new Date(),
      RefNo: '',
      Remark: '',
      TotalAmount: this.irSummaryObject.totalAmount,
      TotalReaminingAmount: this.irSummaryObject.TotalAmount
    };
    this.isOpenPopup = true;
  }

  onDeselectIR(ir) {
    this.confirmationService1.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.onRowClick(ir);
      }
    });
  }

  makePayment(form: any) {
    this.isValidated = true;
    if (form.valid) {
      if (!this.isBankPaymentRequired || (this.PrPayment.BankId != null && this.PrPayment.BankId > 0)) {

        this.loaderService.isLoading.next(true);
        this.PrPayment.PrList.forEach(pr => {
          pr.Advance_Amt = Math.trunc(pr.Advance_Amt);
        })
        this.irDetailsService.makePRPayment(this.PrPayment).subscribe(x => {
          this.loaderService.isLoading.next(false);
          if (this.isBankPaymentRequired) {
            this.router.navigate(["PrPaymentSummary"], { relativeTo: this.r.parent });
          } else {
            this.messageService.add({ severity: 'Success', summary: 'Payment Settled Successfully!!!', detail: '' });
            this.ngOnInit();
          }

        });
      } else {
        this.isBankInfoCorrect = true;
        this.isValidated = false;
      }
    }
    //this.supplierService.
    console.log('form is: ', form);

  }

  private getData() {
    this.isLoading = true;
    this.loaderService.isLoading.next(true);
    this.irDetailsService.getPrListByFilter(this.paginator).subscribe(x => {
      this.loaderService.isLoading.next(false);
      this.isLoading = false;
      this.PrPaymentsList = x.PrList;
      this.totalCount = x.Count;
      this.selectAllIrOnPageChange();
    }, error => {
      this.isLoading = false;
    });
  }

  private calcculateIrSummary() {
    this.irSummaryObject = null;
    if (this.selectedList && this.selectedList.length > 0) {
      let totalAmount = 0;
      let totalDistinctSuppliers = 0;
      let totalIr = 0;

      this.selectedList.forEach(x => {

        totalAmount += Math.trunc(x.Advance_Amt);
      });

      let set = new Set<string>([]);
      this.selectedList.forEach(x => {
        set.add(x.SupplierId);
      });

      totalIr = this.selectedList.length;
      console.log('supplier set is: ' + set.size, set);

      this.irSummaryObject = {
        totalAmount: totalAmount,
        totalDistinctSuppliers: set.size,
        totalIr: totalIr
      };

    }
  }

  private selectAllIrOnPageChange() {
    if (this.selectedList && this.selectedList.length > 0) {
      this.PrPaymentsList.forEach(x => {
        let item = this.selectedList.filter(selecteditem => {
          return x.PurchaseOrderId == selecteditem.PurchaseOrderId;
        });
        if (item && item.length > 0) {
          let index = this.selectedList.indexOf(item[0]);
          this.selectedList.splice(index, 1, x);
          x.IsSelected = true;
        }
      });
    }
    this.PrPaymentsList.forEach(item => {
      let prPayment = this.selectedList.filter(irItem => {return irItem.PurchaseOrderId == item.PurchaseOrderId});
      if (prPayment && prPayment.length > 0) {
        
        item.IsSelected = true;
      }
      else {
        item.IsSelected = false;
      }
    });
  }

  redirectpaymentsummary() {
    this.router.navigate(["PrPaymentSummary"], { relativeTo: this.r.parent });
  }

  getLedgerList(event, ledgerTypeId) {
    if (event.query.length > 2) {
      this.agentCommissionPaymentService.getByName(event.query, ledgerTypeId)
        .subscribe(result => {

          this.bankList = result;
        });
    }
  }

  clearData() {
  }


  onSelectAgent(obj) {
    this.PrPayment.BankId = obj.ID;
    this.PrPayment.BankName = obj.Name;
  }

  resetfilter() {
    this.initializePaginator();
    this.getData();
  }

  setPaidAmount(paymentGroup:PaymentGroup, ir, isBankAMount: boolean) {
    if(isBankAMount && ir.PaidAmount<0){
      ir.PaidAmount = 0;
    }

    if ((ir.PaidAmount + ir.SettledAmountNew) > ir.Advance_Amt || !(ir.PaidAmount + ir.SettledAmountNew)) {
      ir.invalidPaidAmt = true;
    } else {
      ir.invalidPaidAmt = false;
    }
    let locakInvalidPaidAmt = false;
    this.paymentsGroupBySupplier.forEach(grp => {
      let invalidList = grp.ListOfPayments.filter(x => { return x.invalidPaidAmt == true });
      if (invalidList && invalidList.length > 0) {
        this.invalidPaidAmt = true;
        locakInvalidPaidAmt = true;
        return;
      }
    });
    this.invalidPaidAmt = locakInvalidPaidAmt;
  
    if (paymentGroup.RemainingAdvanceOutstanding < 0) {
      this.invalidPaidAmt = true;
    }

  }

  setSettledAmountOnChange(ir, paymentGroup: PaymentGroup) {
    if(ir.SettledAmountNew <0){
      ir.SettledAmountNew =0;
    }
    
    paymentGroup.RemainingAdvanceOutstanding += ir.SettledAmount;
    paymentGroup.RemainingAdvanceOutstanding -= ir.SettledAmountNew;
    ir.SettledAmount = ir.SettledAmountNew;

    if (paymentGroup.RemainingAdvanceOutstanding < 0) {
      this.invalidPaidAmt = true;
    }

  }


  onChangeAmount(ir, paymentGroup: PaymentGroup) {
    this.updateBankAmount(paymentGroup);
    // if (ir.PaidAmount != null) {
    //   ir.PaidAmount = Math.floor(ir.PaidAmount);
    // }
    // paymentGroup.RemainingAdvanceOutstanding += ir.SettledAmount;
    // ir.SettledAmount = (ir.Advance_Amt - ir.PaidAmount > paymentGroup.RemainingAdvanceOutstanding)
    //   ? paymentGroup.RemainingAdvanceOutstanding
    //   : ((ir.Advance_Amt - ir.PaidAmount > 0) ? (ir.Advance_Amt - ir.PaidAmount) : 0);
    // paymentGroup.RemainingAdvanceOutstanding -= ir.SettledAmount;
  }

  Show(ir) {
    
    this.onRowClick(ir);
    console.log("ir", ir);
    this.popupdata = ir;
    //nt POId = this.i
    this.getGRData(ir);
    this.isOpenPopupnew = true;
  }

  private getGRData(ir) {
    
    //  this.isLoading = true;
    var PurchaseOrderId = ir.PurchaseOrderId
    this.irDetailsService.getGRDataFilter(PurchaseOrderId).subscribe(result => {
      this.checkvalue = result;
    });
  }
  Save(searchModel, comment) {
    
    // this.confirmationService1.confirm({
    this.datatopost = {
      PurchaseOrderId: searchModel.PurchaseOrderId,
      check: this.checkvalue,
      Comment: comment
    }

    this.irDetailsService.UpdateStatus(this.datatopost).subscribe(result => {
      console.log(result);
    },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
      });
    setTimeout(() => {
      this.messageService.add({ severity: 'success', summary: 'request successfully' });
      this.isOpenPopupnew = false;
      alert("PR Rejected");
      this.getPrPayments();
      location.reload();

    }, 1500);
    // this.isOpenPopupnew=false;   
  }


  getSupplierAdvanceOutstanding() {
    console.log('this.selectedList', this.selectedList);

    this.selectedList.sort(function (a, b) { return a.Advance_Amt - b.Advance_Amt });
    this.selectedList.sort(function (a, b) { return a.SupplierId - b.SupplierId });
    let supplierIdSet = new Set();
    this.selectedList.forEach(x => {
      supplierIdSet.add(x.SupplierId);
    });
    let arr = Array.from(supplierIdSet);
    console.log('this.arr', arr);

    this.purchaseRequestSettlementService.getAdvanceOutstanding(arr).subscribe(result => {
      console.log('result is: ', result);
      this.supplierOutstandingList = result;
      this.initializeSupplierOutstandingList();
      this.autoSettleAmount();
    });
  }


  initializeSupplierOutstandingList() {
    if (!this.supplierOutstandingList || this.supplierOutstandingList.length < 1) {
      this.supplierOutstandingList = [];
    }

    this.paymentsGroupBySupplier.forEach(paymentGroup => {
      let filterList = this.supplierOutstandingList.filter(x => { return x.SupplierId == paymentGroup.SupplierId });
      if (filterList && filterList.length > 0) {
        paymentGroup.AdvanceOutstanding = filterList[0].AdvanceOutstanding;
        paymentGroup.RemainingAdvanceOutstanding = filterList[0].AdvanceOutstanding;

      } else {
        paymentGroup.AdvanceOutstanding = 0;
        paymentGroup.RemainingAdvanceOutstanding = 0;
      }
    });

  }

  roundPayment() {
    if (this.selectedList && this.selectedList.length > 0) {
      this.selectedList.forEach(item => {
        item.Advance_Amt = Math.round(item.Advance_Amt);
        item.PaidAmount = item.Advance_Amt;
      });
    }
  }

  autoSettleAmount() {
    this.paymentsGroupBySupplier.forEach(grp => {
      
      this.settleGroup(grp);
    });
  }

  private settleGroup(group: PaymentGroup) {
    let currentIndex = 0;
    group.BankAmount=0;
    while (currentIndex < group.ListOfPayments.length) {
      group.ListOfPayments[currentIndex].SettledAmount
        = (group.ListOfPayments[currentIndex].Advance_Amt > group.RemainingAdvanceOutstanding)
          ? group.RemainingAdvanceOutstanding : group.ListOfPayments[currentIndex].Advance_Amt;
      group.ListOfPayments[currentIndex].SettledAmountNew = group.ListOfPayments[currentIndex].SettledAmount;
      group.ListOfPayments[currentIndex].PaidAmount
        = group.ListOfPayments[currentIndex].Advance_Amt
        - group.ListOfPayments[currentIndex].SettledAmount;

      group.RemainingAdvanceOutstanding -= group.ListOfPayments[currentIndex].SettledAmount;
     // add set bank amount for showing correct paid amount by shailesh
      group.BankAmount += group.ListOfPayments[currentIndex].PaidAmount;
      currentIndex++;
    }

  }

  export()
   {
   this.PrPaymentsList.forEach(x=>
    {
      if(x.TDSPercentage==5)
      {
        x.TDSAmount=x.Advance_Amt * x.TDSPercentage/100
       x.NetPayableAmount = x.Advance_Amt - (x.Advance_Amt * x.TDSPercentage/100)
      }
      else if(x.TDSPercentage == 0.1)
      {
        x.TDSAmount=((x.PaymentTillDate)>5000000 ? x.Advance_Amt * x.TDSPercentage/100 : (x.Advance_Amt+x.PaymentTillDate)<=5000000 ? 0:((x.Advance_Amt+x.PaymentTillDate)-5000000) * x.TDSPercentage/100)
        x.NetPayableAmount = ((x.PaymentTillDate)>5000000 ? (x.Advance_Amt- (x.Advance_Amt * x.TDSPercentage/100)) : (x.Advance_Amt+x.PaymentTillDate) <=5000000 ? x.Advance_Amt-0:x.Advance_Amt-((( x.Advance_Amt + x.PaymentTillDate)-5000000) * x.TDSPercentage/100))
      }
      else 
      {
        x.NetPayableAmount=null
        x.TDSAmount=null
      }    
      if(x.IsPaymentDone == false)
      {
        x.PRStatus='Payment Pending'
      } 
      else if(x.IsPaymentDone == true)
      {
        x.PRStatus='Payment Already Done'
      } 
      else
      {
        x.PRStatus=''
      }
    })
    const exportArry: any[] = this.PrPaymentsList.map((x: any) => ({
      SupplierName:x.SupplierName,
      PurchaseOrderId:x.PurchaseOrderId,
      PoInvoiceNo:x.PoInvoiceNo,
      Advance_Amt:x.Advance_Amt,
      TotalAmount:x.TotalAmount,
      WarehouseName:x.WarehouseName,
      CreationDate:x.CreationDate,
      TDSAmount:x.TDSAmount,
      NetPayableAmt:x.NetPayableAmount,
      PRStatus:x.PRStatus
     
    }));
    this.exportService.exportAsExcelFile(exportArry,"ExportFile")
   }
  next() {
    console.log(this.paymentsGroupBySupplier)
    this.isOpenPopup = false;
    //#region check if any payment done through bank or not
    this.isBankPaymentRequired = false;
    this.paymentsGroupBySupplier.forEach(grp => {
      if (grp.TotalAdvancePayment > (grp.AdvanceOutstanding - grp.RemainingAdvanceOutstanding)) {
        this.isBankPaymentRequired = true;
      }
    });
    //#endregion
    this.stepNumber = 2;

    setTimeout(() => {
      this.isOpenPopup = true;
    }, 100);
  }

  prev() {
    this.isOpenPopup = false;
    this.stepNumber = 1;
    setTimeout(() => {
      this.isOpenPopup = true;
    }, 100);
  }

  updateAllBankAmount(){
    if(this.paymentsGroupBySupplier && this.paymentsGroupBySupplier.length > 0){
      this.paymentsGroupBySupplier.forEach(paymentGroup => {
        this.updateBankAmount(paymentGroup);
      });
    } 
  }

  updateBankAmount(paymentGroup: PaymentGroup){
    if(paymentGroup){
      paymentGroup.BankAmount = 0;
      if(paymentGroup.ListOfPayments && paymentGroup.ListOfPayments.length > 0){
        paymentGroup.ListOfPayments.forEach(item => {
          paymentGroup.BankAmount += item.PaidAmount?item.PaidAmount: 0; 
        });  
      }
    }
  }
}


interface PaymentGroup {
  SupplierId: number,
  SupplierName: string,
  ListOfPayments: any[],
  AdvanceOutstanding: number,
  RemainingAdvanceOutstanding: number,
  TotalAdvancePayment: number,
  BankAmount: number,
  TDSPercentage: number,
  PaymentAmount:any
}
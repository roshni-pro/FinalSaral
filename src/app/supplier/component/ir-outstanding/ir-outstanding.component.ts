import { Component, OnInit } from '@angular/core';
import { IrService } from 'app/shared/services/supplier/ir.service';
import { IrOutstandingPaginator } from 'app/shared/interface/supplier/ir-outstanding-paginator';
import { IrOutstandingListDC } from 'app/shared/interface/supplier/ir-outstanding-list-dc';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { IrOutstandingDC } from 'app/shared/interface/supplier/ir-outstanding-dc';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { IrOutstandingPayment } from 'app/shared/interface/supplier/ir-outstanding-payment';
import { LoaderService } from 'app/shared/services/loader.service';
import { PrPayments } from 'app/pr-ir-payments/Interfaces/PrPayments';
import { IrpaymentsService } from 'app/pr-ir-payments/Services/irpayments.service';

import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PurchaseRequestSettlementService } from 'app/pr-ir-payments/Services/purchase-request-settlement.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-ir-outstanding',
  templateUrl: './ir-outstanding.component.html',
  styleUrls: ['./ir-outstanding.component.scss']
})
export class IrOutstandingComponent implements OnInit {
  PrPaymentsList = [];
  paginator: IrOutstandingPaginator;
  irOutstandingList: IrOutstandingListDC;
  list: IrOutstandingDC[];
  totalCount: number;
  warehouseList: any[];
  Exportdata:any;
  isLoading: boolean;
  selectedList: IrOutstandingDC[];
  isOpenPopup: boolean;
  irOutstandingPayment: IrOutstandingPayment;
  irSummaryObject: any;
  bankList: any[];
  isValidated: boolean;
  yearRangeForCalender: string;
  stepNumber: number;
  paymentsGroupBySupplier: PaymentGroup[];
  supplierOutstandingList: any[];
  isBankPaymentRequired: boolean;
  invalidPaidAmt: boolean;
  irStatusList: string[];
  PrPayment: PrPayments;
  tdsAmount: number = 0;
  constructor(private irService: IrService
    , private warehouseService: WarehouseService
    , private confirmationService: ConfirmationService
    , private supplierService: SupplierService
    , private loaderService: LoaderService
    , private router: Router
    , private messageService: MessageService
    , private purchaseRequestSettlementService: PurchaseRequestSettlementService
    , private irDetailsService: IrpaymentsService,
    private exportservice:ExportServiceService
  ) { }

  ngOnInit() {
    this.invalidPaidAmt = false;
    this.yearRangeForCalender = '2016:';
    this.yearRangeForCalender += (new Date()).getFullYear();
    this.isOpenPopup = false;
    this.selectedList = [];
    this.isLoading = false;
    this.isValidated = false;
    this.selectedList = [];
    this.irSummaryObject = null;
    this.irOutstandingPayment = null;
    this.warehouseService.GetWarehouses().subscribe(x => {
      this.warehouseList = x;
    });
    // this.getPrPayments();
    this.irService.getIRStaus().subscribe(x => {

      this.irStatusList = x;
      console.log('this.irStatusList: ', this.irStatusList);
    });
    this.initializePaginator();

  }

  initializePaginator() {
    this.paginator = {
      WarehouseId: null,
      Search: null,
      EndDate: null,
      StartDate: null,
      SkipCount: 0,
      Take: this.Count==0 ? 20 :this.Count ,
      IRStatus: 'Approved from Buyer side',
      IsGetFutureOutstandingAlso: false
    };
  }

  loadLazy(event: LazyLoadEvent) {
    debugger;
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
    
    ir.IsSelected = !ir.IsSelected;
    console.log('ir is: ', ir);
 
    if (0 > ir.DifInHoursForApproval) {
      this.messageService.add({ severity: 'error', summary: 'Future due date!', detail: '' });
      ir.IsSelected = false;
      return;
    }
    if (ir.IRStatus == "Approved from Buyer side") {
      if (ir.IsSelected) {
        this.selectedList.push(ir);
      } else {
        let index = this.selectedList.indexOf(ir);
        this.selectedList.splice(index, 1);
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'This IR Not approved first approved after that you select this IR!', detail: '' });
      ir.IsSelected = false;

    }

    this.calcculateIrSummary();
  }

  openPopup() {
    this.stepNumber = 1;
    this.isValidated = false;
    this.invalidPaidAmt = false;
   
    console.log('this.selectedList: ', this.selectedList);
 

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
        TDSPercentage: tempGroup[supplierId][0].TDSPercentage,
        TdsAmount: 0,
        PaymentTillDate:tempGroup[supplierId][0].PaymentTillDate
      });
    });
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
    let reducerFunc = (total, itm) => total + itm.TotalAmount;



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


    this.supplierService.GetBank().subscribe(result => {

      this.bankList = result;
    });
    debugger
    //#region update bank amount for each group
    this.updateAllBankAmount();
    //#endregion

    this.irOutstandingPayment = {
      BankId: null,
      BankName: '',
      IrOutstandingList: this.selectedList,
      PaymentDate: new Date(),
      RefNo: '',
      Remark: '',
      TotalAmount: this.irSummaryObject.TotalAmount,
      TotalReaminingAmount: this.irSummaryObject.TotalAmount
    };

    this.isOpenPopup = true;

  }
  getPrPayments() {
    this.irDetailsService.getPrListByFilter(this.paginator).subscribe(PrPaymentsList => {
      this.PrPaymentsList = PrPaymentsList.PrList;
      this.totalCount = PrPaymentsList.Count;
    });
  }
  tdsam:number =0;
  //netbankpay:number=0;
  next() {
    //#region check if any payment done through bank or not
    

    
    this.isBankPaymentRequired = false;
    this.paymentsGroupBySupplier.forEach(grp => {
      this.tdsam=0;
      //this.netbankpay=0;
      console.log(grp.SupplierId)
      console.log( this.irOutstandingPayment.IrOutstandingList.filter((x:any)=>x.SupplierId===grp.SupplierId));
      this.irOutstandingPayment.IrOutstandingList.filter((x:any)=>x.SupplierId===grp.SupplierId).forEach(x=>{
        this.tdsam = this.tdsam+ x.TDSAmount;
        // if(x.TDSAmount > x.PaidAmount){
        //   this.netbankpay = this.netbankpay;
        // }
        // else if (x.PaidAmount>0 && (x.PaidAmount>x.TDSAmount)){
        //   this.netbankpay = this.netbankpay+(x.PaidAmount-x.TDSAmount)
        // }
        // else{
        //   this.netbankpay= this.netbankpay;
        // }
      })
      grp.TdsAmount=this.tdsam
      

      if (grp.TotalAdvancePayment > (grp.AdvanceOutstanding - grp.RemainingAdvanceOutstanding)) {
        this.isBankPaymentRequired = true;
      }
    });
    
    //#endregion
    this.stepNumber = 2;
  }

  prev() {
    this.stepNumber = 1;
  }

  onDeselectIR(ir) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.onRowClick(ir);
      }
    });
  }

  makePayment(form: any) {

    this.isValidated = true;
    if (form.valid) {
      this.loaderService.isLoading.next(true);
      this.supplierService.makeIRPaymentRequest(this.irOutstandingPayment).subscribe(x => {
        this.loaderService.isLoading.next(false);

        let isMoveToSummary = false;

        this.paymentsGroupBySupplier.forEach(x => {
          if ((x.TotalAdvancePayment - (x.AdvanceOutstanding - x.RemainingAdvanceOutstanding)) > 0) {
            isMoveToSummary = true;
          }
        })
        if (isMoveToSummary) {
          this.router.navigateByUrl('layout/supplier/payment-summary');
        } else {
          this.messageService.add({ severity: 'Success', summary: 'Payment Settled Successfully!!!', detail: '' });
          this.ngOnInit();
          this.filter();
        }
      });
    }
  }

  Count:number=0
  private getData() {
    
    this.isLoading = true;
    this.loaderService.isLoading.next(true);
    this.irService.getIrOutstandingList(this.paginator).subscribe(x => {


      this.Count=x.Count      
      this.loaderService.isLoading.next(false);
      this.irOutstandingList = x;
      this.isLoading = false;
      this.list = this.irOutstandingList.IrOutstandingList;
      console.log(this.list);
      this.delyadCount();
      this.totalCount = this.irOutstandingList.Count;
        
      this.selectAllIrOnPageChange();
    }, error => {
      this.isLoading = false;
    });
    // this.irDetailsService.getPrListByFilter(this.paginator).subscribe(x => {

    //   this.isLoading = false;
    //   this.PrPaymentsList = x.PrList;
    //   this.totalCount = x.Count;
    //   this.selectAllIrOnPageChange();
    // }, error => {
    //   this.isLoading = false;
    // });
  }

  Export()
  {
    const payload ={
        WarehouseId: this.paginator.WarehouseId,
        Search: this.paginator.Search,
        EndDate: this.paginator.EndDate,
        StartDate: this.paginator.StartDate,
        SkipCount: 0,
        Take: this.Count==0 ? 20 :this.Count ,
        IRStatus: this.paginator.IRStatus,
        IsGetFutureOutstandingAlso: this.paginator.IsGetFutureOutstandingAlso
      }
      this.isLoading = true;
      this.loaderService.isLoading.next(true);
      this.irService.getIrOutstandingList(payload).subscribe(exp => {
      console.log("x",exp);
      this.Exportdata = exp.IrOutstandingList
      //this.isLoading = false;
      //this.loaderService.isLoading.next(false);
      var exportData=[];
      for (var i in this.Exportdata) {
        let dateArray = this.Exportdata[i].InvoiceDate.split('-');
        let invoiceduedate = new Date(Number(dateArray[2]), (Number(dateArray[1]) - 1), Number(dateArray[0]));
        invoiceduedate.setDate(invoiceduedate.getDate() + this.Exportdata[i].DueDays);
        this.Exportdata[i].InvoiceDateToShow = invoiceduedate;
        let y =this.Exportdata[i].InvoiceDateToShow
        let t = this.Exportdata[i].TotalAmount;
        let tds = this.Exportdata[i].TDSAmount;
        var selectedFields = {          
          SupplierName: this.Exportdata[i].SupplierName,
          SupplierCode: this.Exportdata[i].SupplierCode,
          PurchaseOrderId:this.Exportdata[i].PurchaseOrderId,
          InvoiceNumber: this.Exportdata[i].InvoiceNumber,
          InvoiceDate:this.Exportdata[i].InvoiceDate,
          TotalAmount:this.Exportdata[i].TotalAmount,
          TDSAmount : this.Exportdata[i].TDSAmount,
           NetPayableAmount : t-tds,//this.Exportdata[i].TotalAmount - this.Exportdata.TDSAmount[i] ,
          IRStatus : this.Exportdata[i].IRStatus,
          Days : this.Exportdata[i].DueDays,
          GRNDueDate: this.Exportdata[i].GRNDate ,
          InvoiceDueDate :y,
          DueDate : this.Exportdata[i].IRApprovedDate,
          IrCreationDate:this.Exportdata[i].IrCreationDate,
          IRApprovedDate:this.Exportdata[i].IRApprovedDate,
          WarehouseName:this.Exportdata[i].WarehouseName,
          BuyerName:this.Exportdata[i].BuyerName         

      }
      exportData.push(selectedFields);
      }
      if(this.Exportdata && this.Exportdata.length > 0)
      {
        this.exportservice.exportAsExcelFile(exportData,"Export Data")
        this.isLoading = false;
        this.loaderService.isLoading.next(false);
      }
      else
      {
        alert('No Data Found!');
        this.isLoading = false;
        this.loaderService.isLoading.next(false);
      }   
    })
  }

  private calcculateIrSummary() {
    this.irSummaryObject = null;
    if (this.selectedList && this.selectedList.length > 0) {
      let totalAmount = 0;
      let totalDistinctSuppliers = 0;
      let totalIr = 0;
      this.selectedList.forEach(x => {
        totalAmount += x.TotalAmount;
        // totalAmount += x.TotalAmount;
      });
      let set = new Set<string>([]);
      this.selectedList.forEach(x => {
        set.add(x.SupplierCode);
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
      this.list.forEach(x => {
        let item = this.selectedList.filter(selecteditem => {
          return x.Id == selecteditem.Id;
        });
        if (item && item.length > 0) {
          let index = this.selectedList.indexOf(item[0]);
          this.selectedList.splice(index, 1, x);
          x.IsSelected = true;
        }

      });
    }
  }

  redirectpaymentsummary() {
    this.router.navigateByUrl('layout/supplier/payment-summary');

  }

  private delyadCount() {

    console.log('list: ', this.list);
    this.list.forEach(element => {
      //for grn
      if (element.GRNDate != null) {
        if ((element.DifInHoursForGRN / 24) >= 1) {
          element.DifInHoursForGRN = (element.DifInHoursForGRN / 24) - (element.DueDays);
        } else {

          element.DifInHoursForGRN = 0 - (element.DueDays);
        }
        let grndate = new Date(element.GRNDate);
        grndate.setDate(grndate.getDate() + element.DueDays);
        element.GRNDate = grndate;
      } else {
        element.DifInHoursForGRN = null;

      }
      //end GRN
      // Start Approved IR
      if (element.IRStatus == 'Approved from Buyer side') {
        if (element.IRApprovedDate != null) {
          let duedate = new Date(element.IRApprovedDate);
          duedate.setDate(duedate.getDate() + element.DueDays);
          element.IRApprovedDate = duedate;
          if ((element.DifInHoursForApproval / 24) >= 1) {
            element.DifInHoursForApproval = (element.DifInHoursForApproval / 24) - (element.DueDays);
          } else {
            element.DifInHoursForApproval = 0 - (element.DueDays);
          }
        }
      }
      //end Approved IR

      //Start Invoice IR
      let dateArray = element.InvoiceDate.split('-');
      let invoiceduedate = new Date(Number(dateArray[2]), (Number(dateArray[1]) - 1), Number(dateArray[0]));
      invoiceduedate.setDate(invoiceduedate.getDate() + element.DueDays);

      element.InvoiceDateToShow = invoiceduedate;
      if ((element.DifInHours / 24) >= 1) {
        element.DifInHours = (element.DifInHours / 24) - (element.DueDays);
      } else {
        element.DifInHours = 0 - (element.DueDays);
      }

      //end Invoide IR

    });
    console.log('this.list',this.list);
  }

  initializeSupplierOutstandingList() {
    if (!this.supplierOutstandingList || this.supplierOutstandingList.length < 1) {
      this.supplierOutstandingList = [];
    }
    debugger
    this.paymentsGroupBySupplier.forEach(paymentGroup => {
      let filterList = this.supplierOutstandingList.filter(x => { return x.SupplierId == paymentGroup.SupplierId });
      if (filterList && filterList.length > 0) {
        debugger
        paymentGroup.AdvanceOutstanding = filterList[0].AdvanceOutstanding;
        paymentGroup.RemainingAdvanceOutstanding = filterList[0].AdvanceOutstanding;
        // paymentGroup.BankAmount = paymentGroup.AdvanceOutstanding - paymentGroup.RemainingAdvanceOutstanding;

      } else {
        paymentGroup.AdvanceOutstanding = 0;
        paymentGroup.RemainingAdvanceOutstanding = 0;
      }
    });

  }

  autoSettleAmount() {
    this.paymentsGroupBySupplier.forEach(grp => {

      this.settleGroup(grp);
    });
  }

  private settleGroup(group: PaymentGroup) {
    let currentIndex = 0;
    group.BankAmount = 0;
    this.tdsAmount = 0;
    group.TdsAmount = 0;
    while (currentIndex < group.ListOfPayments.length) {
      group.ListOfPayments[currentIndex].SettledAmount
        = (group.ListOfPayments[currentIndex].TotalAmount > group.RemainingAdvanceOutstanding)
          ? group.RemainingAdvanceOutstanding : group.ListOfPayments[currentIndex].TotalAmount;
      group.ListOfPayments[currentIndex].SettledAmountNew = group.ListOfPayments[currentIndex].SettledAmount;
      group.ListOfPayments[currentIndex].PaidAmount
        = group.ListOfPayments[currentIndex].TotalAmount
        - group.ListOfPayments[currentIndex].SettledAmount;

      group.RemainingAdvanceOutstanding -= group.ListOfPayments[currentIndex].SettledAmount;
      // add this bankamt by shailesh for calculate tds
      group.BankAmount += group.ListOfPayments[currentIndex].PaidAmount;
      let item = group.ListOfPayments[currentIndex];
      let bankamount = item.PaidAmount ? item.PaidAmount : 0;
      let tdsamount = bankamount * item.TDSPercentage / 100;
      if (tdsamount > 0) {
        group.TdsAmount += tdsamount;
      }

      currentIndex++;
    }
    //group.BankAmount = group.BankAmount - this.tdsAmount;

  }
  updateAllBankAmount() {
    debugger
    if (this.paymentsGroupBySupplier && this.paymentsGroupBySupplier.length > 0) {
      this.paymentsGroupBySupplier.forEach(paymentGroup => {
        this.updateBankAmount(paymentGroup);
      });
    }
  }
  updateBankAmount(paymentGroup: PaymentGroup) {
    if (paymentGroup) {
      paymentGroup.BankAmount = 0;
      paymentGroup.TdsAmount = 0;
      this.tdsAmount = 0;
      if (paymentGroup.ListOfPayments && paymentGroup.ListOfPayments.length > 0) {
        paymentGroup.ListOfPayments.forEach(item => {

          paymentGroup.BankAmount += item.PaidAmount ? item.PaidAmount : 0;
          let bankamount = item.PaidAmount ? item.PaidAmount : 0;
          let tdsamount = bankamount * item.TDSPercentage / 100;
          if (tdsamount> 0) {
            paymentGroup.TdsAmount += tdsamount;
          }
          //paymentGroup.TDSPercentage = item.TDSPercentage
        });
      }
    }
    if (paymentGroup.RemainingAdvanceOutstanding < 0) {
      this.invalidPaidAmt = true;
    }
  }
  onChangeAmount(ir, paymentGroup: PaymentGroup) {
    //debugger
    this.updateBankAmount(paymentGroup);
    //   if (ir.PaidAmount != null) {
    //     ir.PaidAmount = Math.floor(ir.PaidAmount);
    //   }
    //   paymentGroup.RemainingAdvanceOutstanding += ir.SettledAmount;
    //   ir.SettledAmount = (ir.TotalAmount - ir.PaidAmount > paymentGroup.RemainingAdvanceOutstanding)
    //     ? paymentGroup.RemainingAdvanceOutstanding
    //     : ((ir.TotalAmount - ir.PaidAmount > 0) ? (ir.TotalAmount - ir.PaidAmount) : 0);
    //   paymentGroup.RemainingAdvanceOutstanding -= ir.SettledAmount;
  }


  setSettledAmountOnChange(ir, paymentGroup: PaymentGroup) {

    if (ir.SettledAmountNew < 0) {
      ir.SettledAmountNew = 0;
    }

    paymentGroup.RemainingAdvanceOutstanding += ir.SettledAmount;
    paymentGroup.RemainingAdvanceOutstanding -= ir.SettledAmountNew;
    ir.SettledAmount = ir.SettledAmountNew;

    if (paymentGroup.RemainingAdvanceOutstanding < 0) {
      this.invalidPaidAmt = true;
    }

  }


  // setPaidAmount(val, ir) {
  //   if ((ir.PaidAmount + ir.SettledAmount) != ir.TotalAmount) {
  //     ir.invalidPaidAmt = true;
  //   } else {
  //     ir.invalidPaidAmt = false;
  //   }
  //   let locakInvalidPaidAmt = false;
  //   this.paymentsGroupBySupplier.forEach(grp => {
  //     let invalidList = grp.ListOfPayments.filter(x => { return x.invalidPaidAmt == true });
  //     if (invalidList && invalidList.length > 0) {
  //       this.invalidPaidAmt = true;
  //       locakInvalidPaidAmt = true;
  //       return;
  //     }
  //   })
  //   this.invalidPaidAmt = locakInvalidPaidAmt;
  // }
  setPaidAmount1(paymentGroup: PaymentGroup, ir, isBankAMount: boolean) {
    debugger
    if (isBankAMount && ir.PaidAmount < 0) {
      ir.PaidAmount = 0;
    }

    else if (paymentGroup.RemainingAdvanceOutstanding < 0) {
      this.invalidPaidAmt = true;
      return;
    }

    else if ((ir.PaidAmount + ir.SettledAmountNew) > ir.TotalAmount || !(ir.PaidAmount + ir.SettledAmountNew)) {
      ir.invalidPaidAmt = true;
    }
    
    else if((ir.PaidAmount>0 && ir.PaidAmount < ir.TDSAmount) ){
      ir.invalidPaidAmt = true;
    }
    else {
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
  TdsAmount: number,
  PaymentTillDate:number
}

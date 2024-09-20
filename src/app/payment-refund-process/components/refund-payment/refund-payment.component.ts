import { Component, OnInit, Input } from '@angular/core';
import { RefundPaymentService } from 'app/payment-refund-process/services/refund-payment.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-refund-payment',
  templateUrl: './refund-payment.component.html',
  styleUrls: ['./refund-payment.component.scss']
})
export class RefundPaymentComponent implements OnInit {

  totalRecords: any;
  //auto
  refundOption: any;
  mopOption: any;
  warehouseList: any;
  keyword: any;

  id: string = 'auto';
  historyData: any;

  viewHistory: boolean = false;
  entity: string = 'PaymentRefundHistory';
  paymentList: any[] = [];
  processDialog: boolean = false;

  selectedWarehouse: any;

  startDate: Date;
  endDate: Date;

  selectedMOPOption: any;
  selectedRefundOption: any;

  exportPayload: object;
  processID: number;
  ItemPerPage: any;
  PageNo: any;
  //manual

  manutalrefundOption: any[] = [];
  selectedManualrefundOption: any;
  selectedManualTab: string = ''
  checkedRTGS: any;
  selectedList = [];
  irSummaryObject: any;

  loading: boolean = false;
  blocked : boolean = false;
  isManualOpen : boolean = false;
  Comment : any;
  manualEditId : number;
  returnTypeOption : any;
  selectedReturnType: any;
  constructor(private paymentService: RefundPaymentService, private exportService: ExportServiceService,private confirmationService: ConfirmationService) {
    this.refundOption = [
      { refundName: 'Initiated', refundValue: 0 },
      { refundName: 'Success', refundValue: 1 },
      { refundName: 'Failed', refundValue: 2 },
    ]

    this.manutalrefundOption = [
      { refundName: 'Failed', refundValue: 'Failed' },
      { refundName: 'NEFT/RTGS', refundValue: 'NEFT/RTGS' },
      { refundName: 'Manual Refund Sucess', refundValue: 'manualRefundSucess' },
    ]

    this.selectedManualrefundOption = this.manutalrefundOption[0];
    this.selectedManualTab = this.manutalrefundOption[0].refundValue;

    this.mopOption = [
      { mopName: 'HDFC', mopValue: 'hdfc' },
      { mopName: 'Epaylater', mopValue: 'Epaylater' },
      { mopName: 'Chqbook', mopValue: 'Chqbook' },
      { mopName: 'DirectUdhaar', mopValue: 'DirectUdhar' },
      { mopName: 'Gullak', mopValue: 'Gullak' },
      { mopName: 'UPI', mopValue: 'UPI' },
      { mopName: 'ScaleUp', mopValue: 'ScaleUp' },
    ]

    this.returnTypeOption = [
      { label: 'Auto Refund', value: 0 },
      { label: 'Manual', value: 1 },
    ]
  }

  ngOnInit() {
    this.getWareHouses();
    this.searchResult(1);
    this.selectedList = [];
    this.irSummaryObject = null;
  }

  getWareHouses() {
    this.paymentService.getWarehouse().subscribe(res => {
      console.log(res);
      this.warehouseList = res;
    })
  }

  changeTab(tab) {
    //debugger;
    this.id = tab.index == 0 ? "auto" : "manual"
    this.resetFilter();
  }

  wareIds: any[];
  mopIds: any[];
  getStatus: any;

  searchResult(check) {
    this.blocked = true;
    this.loading = true;

    let startDate = this.startDate ? moment(this.startDate).format('YYYY/MM/DD') : null;
    let endDate = this.endDate ? moment(this.endDate).format('YYYY/MM/DD') : null;
    let payload = {};
    let warehouseID = null;
    let MOP = '';
    // let refID: number = this.id == 'auto' ? 0 : 1;


    if (this.selectedWarehouse && this.selectedWarehouse.length > 0) {
      this.wareIds = this.selectedWarehouse.map(function (a) {
        return a.WarehouseId ? a.WarehouseId : a
      });
    }

    if (this.selectedMOPOption && this.selectedMOPOption.length > 0) {
      this.mopIds = this.selectedMOPOption.map(function (a) {
        return a.mopValue ? a.mopValue : a
      });
    }

    this.getStatus = this.selectedRefundOption;
    if (this.getStatus != undefined) {
      this.getStatus = this.getStatus.refundValue;
    }



    payload = {
      Keyward: this.keyword,
      WarehouseIds: this.wareIds,
      RTGS: "",
      MOPs: this.mopIds,
      FromDate: startDate,
      ToDate: endDate,
      skip: 1,
      take: 10,
      RefundType: this.selectedReturnType != undefined ? this.selectedReturnType.value : -1,
      PaymentRefundRequestId: 0,
      status: this.getStatus >= 0 ? this.getStatus : -1

    }

    this.paymentService.searchList(payload).subscribe(
      (res) => {
        //debugger;
        console.log(res);
        this.paymentList = res.PaymentRefundListDcs;
        debugger;
        this.totalRecords = res.TotalCount
        console.log(this.paymentList);
        if (this.paymentList && this.paymentList.length > 0) {
          this.loading = false;
          this.blocked = false;
        }
        this.loading = false;
        this.blocked = false;
      },
      (err) => {
        console.log(err);
      },
    )

  }


  load(event) {
    this.blocked = true;
    this.loading = true;

    var Last = event.first ? event.first + event.rows : 10
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows

    let startDate = this.startDate ? moment(this.startDate).format('YYYY/MM/DD') : null;
    let endDate = this.endDate ? moment(this.endDate).format('YYYY/MM/DD') : null;
    let payload = {};
    let warehouseID = null;
    let MOP = '';
    let refID: number = this.id == 'auto' ? 0 : 1;


    if (this.selectedWarehouse && this.selectedWarehouse.length > 0) {
      this.wareIds = this.selectedWarehouse.map(function (a) {
        return a.WarehouseId ? a.WarehouseId : a
      });
    }

    if (this.selectedMOPOption && this.selectedMOPOption.length > 0) {
      this.mopIds = this.selectedMOPOption.map(function (a) {
        return a.mopValue ? a.mopValue : a
      });
    }

    this.getStatus = this.selectedRefundOption;
    if (this.getStatus != undefined) {
      this.getStatus = this.getStatus.refundValue;
    }


    payload = {
      Keyward: this.keyword,
      WarehouseIds: this.wareIds,
      RTGS: "",
      MOP: this.mopIds,
      FromDate: startDate,
      ToDate: endDate,
      skip: this.PageNo,
      take: this.ItemPerPage,
      RefundType: this.selectedReturnType != undefined ? this.selectedReturnType.value : -1,
      PaymentRefundRequestId: 0,
      status:this.getStatus >= 0 ? this.getStatus : -1

    }

    this.paymentService.searchList(payload).subscribe(
      (res) => {
        console.log(res);
        this.paymentList = res.PaymentRefundListDcs;
        debugger;
        this.totalRecords = res.TotalCount
        console.log(this.paymentList);
        if (this.paymentList.length > 0) {
          this.loading = false;
          this.blocked = false;
        }
      },
      (err) => {
        console.log(err);
      },
    )

  }

  showHistory(id) {
    this.viewHistory = true;

    // let payload = {
    //   PaymentRefundRequestId: id,
    //   skip: 1,
    //   take: 10
    // }
    // console.log("history payload", payload);
    this.paymentService.GetPaymentRefundHistory(id).subscribe(
      (res) => {
        this.historyData =  res;
        // this.historyData.forEach(object => {
        //   object.RequestMsg = JSON.parse(object.RequestMsg);
        // });
        console.log(this.historyData);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  onClickManual(id){
    this.manualEditId = id;
    this.isManualOpen = true;
  }
  showProcessDialog(data) {
    this.processID = data;
    this.processDialog = true;
  }

  closeProcessDialog() {
    this.processDialog = false;
  }

  resetFilter() {
    this.keyword = '';
    this.selectedWarehouse = undefined;
    this.selectedMOPOption = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.selectedRefundOption = undefined;
    this.selectedManualrefundOption = undefined;
    this.selectedReturnType = undefined;

    let refID: number = this.id == 'auto' ? 0 : 1;

    const payload = {
      Keyward: this.keyword,
      RTGS: "",
      MOP: "",
      FromDate: null,
      ToDate: null,
      skip: 1,
      take: 10,
      RefundType: -1,
      PaymentRefundRequestId: 0,
      status: this.getStatus >= 0 ? this.getStatus : -1
    }

    this.paymentService.searchList(payload).subscribe(
      (res) => {
        this.paymentList = res.PaymentRefundListDcs;
        debugger;
        console.log(this.paymentList);
      },
      (err) => {
        console.log(err);
      },
    )
  }

  exportReturnType: Number;
  export(type) {
    if (type == 'AutoRefund') {
      this.exportReturnType = 0;
    } else {
      this.exportReturnType = 1;
    }

    // const payload = {
    //   Keyward: this.keyword,
    //   RTGS: "",
    //   MOP: "",
    //   FromDate: null,
    //   ToDate: null,
    //   skip: 1,
    //   take: 10,
    //   RefundType: this.exportReturnType,
    //   PaymentRefundRequestId: 0
    // }
    let refID: number = 0
    let startDate = this.startDate ? moment(this.startDate).format('YYYY/MM/DD') : null;
    let endDate = this.endDate ? moment(this.endDate).format('YYYY/MM/DD') : null;

    this.getStatus = this.selectedRefundOption;
    if (this.getStatus != undefined) {
      this.getStatus = this.getStatus.refundValue;
    }

    const payload = {
      Keyward: this.keyword,
      WarehouseIds: this.wareIds,
      MOPs: this.mopIds,
      FromDate: startDate,
      ToDate: endDate,
      RefundType: refID,
      status: this.getStatus >= 0 ? this.getStatus : -1
    }
    //debugger
    if (startDate != null && endDate != null) {
      this.paymentService.PaymentRefundExport(payload).subscribe(
        (res) => {
          //debugger;
          console.log(res);
          if (res.PaymentRefundListExportDcs.length > 0) {
            this.exportService.exportAsExcelFile(res.PaymentRefundListExportDcs, 'PaymentRefund');
          } else {
            alert('No Record Found!')
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Select Start Date and End Date')
    }


  }

  confirmProcess() {
    this.paymentService.Process(this.processID).subscribe(
      (res) => {
        console.log(res);
        if (res.ResponseMsg == "Payment Refund Process failed") {
          alert("Payment Refund Process Failed");
          this.closeProcessDialog();
        } else {
          alert("Payment Refund Process Successful");
          this.closeProcessDialog();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  test() {
    console.log(this.selectedManualrefundOption);
    this.selectedManualTab = this.selectedManualrefundOption.refundValue;
  }

  onRowClick(ir) {
    //debugger
    ir.IsSelected = !ir.IsSelected;
    let index = this.selectedList.indexOf(ir);
    if (index != -1) {
      this.selectedList.splice(index, 1);
    }
    else {
      ir.PaidAmount = Math.trunc(ir.OrderAmount);
      this.selectedList.push(ir);
    }
    this.calcculateIrSummary();
  }

  private calcculateIrSummary() {
    this.irSummaryObject = null;
    if (this.selectedList && this.selectedList.length > 0) {
      let totalAmount = 0;
      let totalDistinctSuppliers = 0;
      let totalIr = 0;

      this.selectedList.forEach(x => {

        totalAmount += Math.trunc(x.OrderAmount);
      });

      let set = new Set<string>([]);
      this.selectedList.forEach(x => {
        set.add(x.Id);
      });

      totalIr = this.selectedList.length;

      this.irSummaryObject = {
        totalAmount: totalAmount,
        totalDistinctSuppliers: set.size,
        totalIr: totalIr
      };

    }
  }

  openPopup() {
    alert('check')
  }

  saveComment(Comment){
    debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Approve this Request?',
      accept: () => {
        this.paymentService.addPaymentRefundManualComment(this.manualEditId,Comment).subscribe(x=>{
          debugger;
          if(x==true){
            this.manualEditId = null;
            this.Comment = null;
            this.isManualOpen = false;
            this.ngOnInit();
          }
        });
      }
    })
  }


}



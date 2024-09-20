import { Component, OnInit, Input } from '@angular/core';
import { AssignmentpaymentService } from '../../../../app/shared/services/assignmentpayment.service';
import { resolveAny } from 'dns';
import { WarehouseService } from '../../../../app/shared/services/warehouse.service';
import { CountryService } from '../../../../app/shared/services/country.service';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-assignment-payment',
  templateUrl: './assignment-payment.component.html',
  styleUrls: ['./assignment-payment.component.scss'],
  providers: [DialogService]
})
export class AssignmentPaymentComponent implements OnInit {
  date: Date;
  date13: Date;
  cols: any;
  cols1: any;
  Pay: boolean;
  @Input() DisplayName: any;
  @Input() WarehouseId: any;
  @Input() DeliveryIssuanceId: any;
  assignmentList: any;
  hubList: any;
  agentList: any;
  GetOrderList: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  isOpenPopup: boolean;
  isOpenPopupPayment: boolean;
  SaveAssignmentList: any[];
  detail: any;
  PaymentDate: any;
  PaymentDateMulti: any;
  RefNo: any;
  Remark: any;
  RefNoMulti: any;
  RemarkMulti: any;
  paymentorderList: any[];
  GetList: any;
  Delivered: any;
  Credit: any;
  Debit: any;
  totalDeliverdAmount: any;
  totalAmount: any;
  totalCreditAmount: any;
  warehouseId: any;
  searchdata: any;
  verifyDisable: boolean;
  selectAssignmentList: any[];
  multipleassignmentpayment: any;
  multipleassignmenttotaldata: any;
  mutlipleassignmentpayemntlist: any[];
  mutlipleassignmentpayemntlisttemp: any[];
  verifyDisablemulti: boolean;
  multiplepay: boolean;



  constructor(private warehouseService: WarehouseService, private assignmentpaymentService: AssignmentpaymentService, public dialogService: DialogService
    , private countryService: CountryService, public messageService: MessageService
  ) { }

  ngOnInit() {
    this.SaveAssignmentList = [];
    this.selectAssignmentList = [];
    this.mutlipleassignmentpayemntlist = [];
    this.multipleassignmentpayment = {};
    this.mutlipleassignmentpayemntlisttemp = [];
    this.multipleassignmenttotaldata = {
      onlineAmount: 0,
      chequeAmount: 0,
      cashAmount: 0,
      totalDeliverdAmount: 0,
      TotalAssignmentAmount: 0
    };


    this.searchdata = {
      AgentId: 0,
      StartDate: null,
      EndDate: null,
      DeliveryIssuanceId: 0,
      paymentstatus: 'UnPaid'

    }
    this.isOpenPopupPayment = false;
    this.verifyDisable = false;
    this.multiplepay = true;
    this.totalAmount = {
      onlineAmount: 0,
      cashAmount: 0,
      chequeAmount: 0
    }
    this.paymentorderList = [];
    this.cols = [
      { field: 'DeliveryIssuanceId', header: 'AssignmentId' },
      { field: 'DisplayName', header: 'DBoy Name' },
      { field: 'Status', header: 'Status' },
      { field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'TotalAssignmentAmount', header: 'TotalAssignmentAmount' },
      { field: 'ChequeAmount', header: 'ChequeAmount' },
      { field: 'CashAmount', header: 'CashAmount' },
      { field: 'OnlineAmount', header: 'OnlineAmount' },
    ];
    this.Pay = true;
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.hubList = result;
      this.warehouseId = this.hubList[0].WarehouseId;
      this.onsearch(this.warehouseId);
    })

  }

  search() {
    let data = this.convertSearchData();
    this.assignmentpaymentService.GetAssignment(data).subscribe(result => {
      this.assignmentList = result;
      for (var i in this.assignmentList) {
        this.assignmentList[i].CreatedDate = this.assignmentList[i].CreatedDate ? moment(this.assignmentList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log('assignmentList : ', result);
      console.log('DeliveryIssuanceId : ', this.DeliveryIssuanceId);

    })
  }

  onsearch(WarehouseId) {
    if (WarehouseId > 0) {
      this.WarehouseId = WarehouseId
    }
    this.assignmentpaymentService.GetAssignmentAgent(this.WarehouseId).subscribe(result => {
      this.agentList = result;
    })
  }
  onsearchAgent() {
    let data = this.convertSearchData();
    this.assignmentpaymentService.GetAssignment(data).subscribe(result => {
      this.assignmentList = result;
      for (var i in this.assignmentList) {
        this.assignmentList[i].CreatedDate = this.assignmentList[i].CreatedDate ? moment(this.assignmentList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
    });
  }

  openDetails(d, e) {
    this.intialvalue();
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      //this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
    this.selectedRow = e;
    //this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    console.log(this.selectedRow);
    this.isDetails = true;
    this.assignmentpaymentService.GetOrderList(d.DeliveryIssuanceId).subscribe(result => {
      
      this.GetOrderList = result;
      for (var i in this.GetOrderList) {
        this.multipleassignmentpayment = {};
        this.GetOrderList[i].OrderedDate = this.GetOrderList[i].OrderedDate ? moment(this.GetOrderList[i].OrderedDate).format('DD/MM/YYYY') : null
        if (this.GetOrderList[i].Status == 'Delivered' || this.GetOrderList[i].Status == 'sattled') {
          if (this.GetOrderList[i].OnlineAmount != null) {
            this.totalAmount.onlineAmount = this.totalAmount.onlineAmount + this.GetOrderList[i].OnlineAmount;
          }
          if (this.GetOrderList[i].ChequeAmount != null) {
            this.totalAmount.chequeAmount = this.totalAmount.chequeAmount + this.GetOrderList[i].ChequeAmount;
          }
          if (this.GetOrderList[i].CashAmount != null) {
            this.totalAmount.cashAmount = this.totalAmount.cashAmount + this.GetOrderList[i].CashAmount;
          }
        }
        this.totalDeliverdAmount = this.totalAmount.onlineAmount + this.totalAmount.cashAmount + this.totalAmount.chequeAmount;
      }
      console.log('GetOrderList : ', result);
    })
    this.isOpenPopup = true;
  }

  save() {
    this.verifyDisable = true;
    if (this.GetOrderList && this.GetOrderList.length > 0) {
      for (var i in this.GetOrderList) {
        if (this.GetOrderList[i].Status == 'Delivered' || this.GetOrderList[i].Status == 'Deliverd' || this.GetOrderList[i].Status == 'sattled')
          this.paymentorderList.push(this.GetOrderList[i]);
      }
      if (this.RefNo == null) {
        this.messageService.add({ severity: 'error', summary: 'Please enter the Refence No!' });
      }
      else if (this.totalDeliverdAmount <= 0 || this.totalDeliverdAmount == null || this.totalDeliverdAmount == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Total amount value is zero!', detail: '' });
      }
      else if (this.PaymentDate == null) {
        this.messageService.add({ severity: 'error', summary: 'Please select payment Date!', detail: '' });
      } else {
        let datatopost = {
          DeliveryIssuanceId: this.selectedRowDetails.DeliveryIssuanceId,
          TotalAssignmentAmount: this.selectedRowDetails.TotalAssignmentAmount,
          RefNo: this.RefNo,
          PaymentDate: this.PaymentDate ? moment(this.PaymentDate).format('MM/DD/YYYY HH:mm:ss') : null,
          Remark: this.Remark,
          AgentId: this.searchdata.AgentId,
          AssignmentorderDetails: this.paymentorderList,
          Status: 'Paid',
          ChequeAmount: this.totalAmount.chequeAmount,
          CashAmount: this.totalAmount.cashAmount,
          OnlineAmount: this.totalAmount.onlineAmount,
          TotalAssignmentDeliverdAmount: this.totalDeliverdAmount
        }

        this.assignmentpaymentService.assignmentpayment(datatopost).subscribe(result => {
          this.SaveAssignmentList = result;
          if (this.SaveAssignmentList != null) {
            this.isOpenPopup = false;
            this.onsearchAgent();
          }
          this.messageService.add({ severity: 'success', summary: 'Assignment Payment Order Details Added Successfully!', detail: '' });
          console.log('GetOrderList1 : ', result);
        })
      }
    }
  }


  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  onTotalAmount(totalAmount) {
    if (totalAmount.onlineAmount != null && totalAmount.cashAmount != null && totalAmount.chequeAmount != null) {
      this.totalDeliverdAmount = parseInt(this.totalAmount.onlineAmount) + parseInt(this.totalAmount.cashAmount) + parseInt(this.totalAmount.chequeAmount);
    }
  }

  convertSearchData() {
    let data = {
      AgentId: this.searchdata.AgentId,
      StartDate: this.searchdata.StartDate ? new Date(this.searchdata.StartDate) : null,
      EndDate: this.searchdata.EndDate ? new Date(this.searchdata.EndDate) : null,
      DeliveryIssuanceId: this.searchdata.DeliveryIssuanceId,
      paymentstatus: this.searchdata.paymentstatus
    };
    return data;
  }


  intialvalue() {
    this.totalAmount = {
      onlineAmount: 0,
      cashAmount: 0,
      chequeAmount: 0
    }
    this.verifyDisable = false;
    this.verifyDisablemulti = false;
    this.totalDeliverdAmount = 0;
    this.Remark = null;
    this.RefNo = null;
    this.PaymentDate = null;
    this.PaymentDateMulti = null;
    this.RemarkMulti = null;
    this.RefNoMulti = null;
    if (this.selectAssignmentList.length > 0) {
      this.multiplepay = false;
    } else {
      this.multiplepay = true;
    }

    this.mutlipleassignmentpayemntlist = [];

    this.multipleassignmenttotaldata = {
      onlineAmount: 0,
      chequeAmount: 0,
      cashAmount: 0,
      totalDeliverdAmount: 0,
      TotalAssignmentAmount: 0
    }

  }


  //multiple select assignment  
  onClickAssignment(row) {
    
    if (!row.IsChecked) {
      let newRow = this.selectAssignmentList.filter(x => { return x.DeliveryIssuanceId == row.DeliveryIssuanceId })[0];
      let index = this.selectAssignmentList.indexOf(newRow);
      this.selectAssignmentList.splice(index, 1);
      if (this.selectAssignmentList.length <= 0) {
        this.multiplepay = true;
      }
      return;
    }
    this.selectAssignmentList.push(row);
    if (this.selectAssignmentList.length > 0) {
      this.multiplepay = false;
    } else {
      this.multiplepay = true;
    }
  }

  //after Select Multiple assigment show the popup withb calsulate amount  
  multipleassignmentpay() {
    this.intialvalue();
    this.isDetails = true;
    let observableList: Observable<any[]>[] = [];
    this.selectAssignmentList.forEach(assignmentdetails => {
      observableList.push(this.assignmentpaymentService.GetOrderList(assignmentdetails.DeliveryIssuanceId));
    });
    forkJoin(observableList).subscribe(results => {
      let assignmentdetaiilsdata = results;
      let orderinfo: any[] = [];
      let count = 0;

      assignmentdetaiilsdata.forEach(orderdetailsdata => {
        console.log('GetOrderList1 : ', orderdetailsdata);
        this.intializetotalamt();
        orderdetailsdata.forEach(GetOrderList => {
          GetOrderList.OrderedDate = GetOrderList.OrderedDate ? moment(GetOrderList.OrderedDate).format('DD/MM/YYYY') : null
          if (GetOrderList.Status == 'Delivered' || GetOrderList.Status == 'sattled') {
            if (GetOrderList.OnlineAmount != null) {
              this.totalAmount.onlineAmount = this.totalAmount.onlineAmount + GetOrderList.OnlineAmount;
            }
            if (GetOrderList.ChequeAmount != null) {
              this.totalAmount.chequeAmount = this.totalAmount.chequeAmount + GetOrderList.ChequeAmount;
            }
            if (GetOrderList.CashAmount != null) {
              
              this.totalAmount.cashAmount = this.totalAmount.cashAmount + GetOrderList.CashAmount;
            }
          }
          this.totalDeliverdAmount = this.totalAmount.onlineAmount + this.totalAmount.cashAmount + this.totalAmount.chequeAmount;
        });

        this.multipleassignmentpayment = {
          onlineAmount: 0,
          chequeAmount: 0,
          cashAmount: 0,
          totalDeliverdAmount: 0,
          DeliveryIssuanceId: 0,
          TotalAssignmentAmount: 0
        };
        this.multipleassignmentpayment.onlineAmount = this.totalAmount.onlineAmount;
        this.multipleassignmentpayment.chequeAmount = this.totalAmount.chequeAmount;
        this.multipleassignmentpayment.cashAmount = this.totalAmount.cashAmount;
        this.multipleassignmentpayment.totalDeliverdAmount = this.totalDeliverdAmount;
        this.multipleassignmentpayment.DeliveryIssuanceId = this.selectAssignmentList[count].DeliveryIssuanceId;
        this.multipleassignmentpayment.TotalAssignmentAmount = this.selectAssignmentList[count].TotalAssignmentAmount;
        this.multipleassignmenttotaldata.onlineAmount = this.multipleassignmenttotaldata.onlineAmount + this.multipleassignmentpayment.onlineAmount;
        this.multipleassignmenttotaldata.chequeAmount = this.multipleassignmenttotaldata.chequeAmount + this.multipleassignmentpayment.chequeAmount;
        this.multipleassignmenttotaldata.cashAmount = this.multipleassignmenttotaldata.cashAmount + this.multipleassignmentpayment.cashAmount;
        this.multipleassignmenttotaldata.totalDeliverdAmount = this.multipleassignmenttotaldata.totalDeliverdAmount + this.multipleassignmentpayment.totalDeliverdAmount;
        this.multipleassignmenttotaldata.TotalAssignmentAmount = this.multipleassignmenttotaldata.TotalAssignmentAmount + this.multipleassignmentpayment.TotalAssignmentAmount;
        this.mutlipleassignmentpayemntlist.push(this.multipleassignmentpayment);

        count++;

      });
    });
    this.isOpenPopupPayment = true;
  }


  //on amount change calculate the all amount
  onAmountchange(row) {
    this.mutlipleassignmentpayemntlist.forEach(Assignmentdetailsdata => {
      if (Assignmentdetailsdata.DeliveryIssuanceId == row) {
        if (Assignmentdetailsdata.onlineAmount == null) {
          Assignmentdetailsdata.totalDeliverdAmount = 0 + Assignmentdetailsdata.chequeAmount + Assignmentdetailsdata.cashAmount;

        } else if (Assignmentdetailsdata.cashAmount == null) {
          Assignmentdetailsdata.totalDeliverdAmount = Assignmentdetailsdata.onlineAmount + Assignmentdetailsdata.chequeAmount + 0;


        } else if (Assignmentdetailsdata.chequeAmount == null) {
          Assignmentdetailsdata.totalDeliverdAmount = Assignmentdetailsdata.onlineAmount + 0 + Assignmentdetailsdata.cashAmount;
        }
        if ((Assignmentdetailsdata.onlineAmount != null && Assignmentdetailsdata.onlineAmount > 0) || (Assignmentdetailsdata.cashAmount != null && Assignmentdetailsdata.cashAmount > 0) || (Assignmentdetailsdata.chequeAmount != null && Assignmentdetailsdata.chequeAmount > 0)) {
          Assignmentdetailsdata.totalDeliverdAmount = Assignmentdetailsdata.onlineAmount + Assignmentdetailsdata.chequeAmount + Assignmentdetailsdata.cashAmount;
        }
      }
    });

    this.multipleassignmenttotaldata = {
      onlineAmount: 0,
      chequeAmount: 0,
      cashAmount: 0,
      totalDeliverdAmount: 0,
      TotalAssignmentAmount: 0
    }


    this.mutlipleassignmentpayemntlist.forEach(Assignmentdetailsdata => {
      this.multipleassignmenttotaldata.onlineAmount = this.multipleassignmenttotaldata.onlineAmount + Assignmentdetailsdata.onlineAmount;
      this.multipleassignmenttotaldata.chequeAmount = this.multipleassignmenttotaldata.chequeAmount + Assignmentdetailsdata.chequeAmount;
      this.multipleassignmenttotaldata.cashAmount = this.multipleassignmenttotaldata.cashAmount + Assignmentdetailsdata.cashAmount;
      this.multipleassignmenttotaldata.totalDeliverdAmount = this.multipleassignmenttotaldata.totalDeliverdAmount + Assignmentdetailsdata.totalDeliverdAmount;
      this.multipleassignmenttotaldata.TotalAssignmentAmount = this.multipleassignmenttotaldata.TotalAssignmentAmount + Assignmentdetailsdata.TotalAssignmentAmount;

    });

  }

  //for multiple assignment payment  
  saveMutliple() {
    
    if (this.RefNoMulti == null) {
      this.messageService.add({ severity: 'error', summary: 'Please enter the Refence No!' });
    }
    else if (this.PaymentDateMulti == null) {
      this.messageService.add({ severity: 'error', summary: 'Please select payment Date!', detail: '' });
    } else {
      this.verifyDisablemulti = true;
      let count = 0;
      this.mutlipleassignmentpayemntlist.forEach(Assignmentdatalist => {
        if (Assignmentdatalist.totalDeliverdAmount > 0) {
          count++;
          this.assignmentpaymentService.GetOrderList(Assignmentdatalist.DeliveryIssuanceId).subscribe(result => {
            
            this.paymentorderList = [];
            this.GetOrderList = result;
            if (this.GetOrderList && this.GetOrderList.length > 0) {
              this.GetOrderList.forEach(getOrderList => {
                if (getOrderList.Status == 'Delivered' || getOrderList.Status == 'Deliverd' || getOrderList.Status == 'sattled')
                  this.paymentorderList.push(getOrderList);
              });

              let datatopost = {
                DeliveryIssuanceId: Assignmentdatalist.DeliveryIssuanceId,
                TotalAssignmentAmount: Assignmentdatalist.TotalAssignmentAmount,
                RefNo: this.RefNoMulti,
                PaymentDate: this.PaymentDateMulti ? moment(this.PaymentDateMulti).format('MM/DD/YYYY HH:mm:ss') : null,
                Remark: this.RemarkMulti,
                AgentId: this.searchdata.AgentId,
                AssignmentorderDetails: this.paymentorderList,
                Status: 'Paid',
                ChequeAmount: Assignmentdatalist.chequeAmount,
                CashAmount: Assignmentdatalist.cashAmount,
                OnlineAmount: Assignmentdatalist.onlineAmount,
                TotalAssignmentDeliverdAmount: Assignmentdatalist.totalDeliverdAmount
              }
              this.assignmentpaymentService.assignmentpayment(datatopost).subscribe(result => {
                let resultsdata = result;
                this.SaveAssignmentList.push(resultsdata);
                console.log('GetOrderList1 : ', result);
                if (this.SaveAssignmentList != null && this.SaveAssignmentList.length > 0 && this.SaveAssignmentList.length == count) {
                  
                  this.isOpenPopupPayment = false;
                  this.onsearchAgent();
                  this.selectAssignmentList=[];
                  this.messageService.add({ severity: 'success', summary: 'Assignment Payment Order Details Added Successfully!', detail: '' });
                }

              })
            }
          });
        }
      });
    }


  }
  //intialize total amount 
  intializetotalamt() {
    
    this.totalAmount = {
      onlineAmount: 0,
      cashAmount: 0,
      chequeAmount: 0,

    }
    this.totalDeliverdAmount = 0;
  }

}

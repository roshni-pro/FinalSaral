import { Component, OnInit } from '@angular/core';
import { PlanMasterService } from "app/operation-capacity/services/plan-master.service";
import { VendorPaymentService } from "app/operation-capacity/services/vendor-payment.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import * as moment from "moment";
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from "@angular/router";
// import { MessageService } from "primeng/api";
import { Location } from "@angular/common";
import { environment } from "environments/environment";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-vendor-payment-summary',
  templateUrl: './vendor-payment-summary.component.html',
  styleUrls: ['./vendor-payment-summary.component.scss'],
  animations: [
    trigger("rowExpansionTrigger", [
      state(
        "void",
        style({
          transform: "translateX(-10%)",
          opacity: 0,
        })
      ),
      state(
        "active",
        style({
          transform: "translateX(0)",
          opacity: 1,
        })
      ),
      transition("* <=> *", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
    ]),
  ],
})
export class VendorPaymentSummaryComponent implements OnInit {

    //search section variables
    warehouseList: any[] = [];
    warehouseids: any[];
    selectedWarehouse: any;
    date: Date;
    selectedRole: any;
    filterOptions: any[] = [
      { label: 'All', value: 'All' },
      { label: 'My Pending', value: 'MyPending' }
    ];
    selectedfilter: any;
    pureTransporterList: any[] = [];
    totalPayableAmount:number;
  
  
    // data sharing
    fleetDetailList: any[] = [];
    docList: any[] = [];
  
    //table section variables
    selectedTransporterRow: any = {
      showAction: false
    };
    vendorTableData: any[] = [];
    payload: payload = {
      WarehouseId: 0,
      StartDate: "",
      EndDate: "",
      FleetId: 0,
    };
    baseURL: any;
  
  
    //role related variables
    UserRole: any[] = [];
    userRoleDropdownList: any[] = [];
    showUserRoleDropdown: boolean = false;
  
  
    // constant enums
    TransporterPaymentApprovalStatusEnum: any[] = [
      { key: 0, value: "Pending" },
      { key: 1, value: "Finalized" },
      { key: 2, value: "Rejected By Regional" },
      { key: 3, value: "Approved By Regional" },
      { key: 4, value: "Apporved By Account" },
      { key: 5, value: "Rejected By Account" },
      { key: 6, value: "Approved By HQ OpsLead" },
      { key: 7, value: "Rejected By HQ OpsLead" },
      { key: 8, value: "Approved By Account Lead" },
      { key: 9, value: "Rejected By Account Lead" },
    ];
  
    TransporterPaymentPaymentStatusEnum: any[] = [
      { key: 0, value: "Pending" },
      { key: 1, value: "PaymentPending" },
      { key: 2, value: "PaymentDone" },
    ];
  
    RoleEnums: any[] = [
      // role priority - higher is prior
      { localRoleID: 0, rolePriority: 100, role: "Regional Outbound Lead" },
      { localRoleID: 1, rolePriority: 200, role: "HQ Ops Lead" },
      { localRoleID: 2, rolePriority: 300, role: "Accounts executive" },
      { localRoleID: 3, rolePriority: 300, role: "Accounts associates" },
      { localRoleID: 4, rolePriority: 400, role: "HQ Accounts Lead" },
      // { localRoleID: 5, rolePriority: 500, role: "HQ Master login" }
    ];
  
    //misc
    isLoading: boolean = false;
  
  
    constructor(
      private planMasterService: PlanMasterService,
      private vendorPaymentService: VendorPaymentService,
      private confirmationService: ConfirmationService,
      private router: Router,
      public location: Location,
      private messageService: MessageService
    ) {
      this.baseURL = environment.apiURL;
  
    }
  
  
  
    //----------------------------------angular core methods-------------------------------
  
    ngOnInit() {
      this.selectedfilter = this.filterOptions[0];
      this.findUserRole();
      this.getWareHouseList();
      //  JSON.parse(localStorage.getItem("doclist"));
      //   JSON.parse(localStorage.getItem("transpoterDetailList"));
    }
  
    //------------------------------------- business logics/functions --------------------------------
    getWareHouseList() {
      this.planMasterService.getWarehouseList().subscribe(
        (res) => {
          this.warehouseList = res;
          // console.log("warehouseList:", this.warehouseList);
        },
        (err: any) => {
          alert("something went wrong, please try again");
        });
    }
  
    search() {
      console.log(this.payload, this.warehouseids, this.date);
      if (!this.selectedRole) {
        alert("page permission required");
        return;
      }
      if (!this.warehouseids || this.warehouseids.length <1  || !this.date) {
        alert("Please fill filters");
      } else {
        this.payload.StartDate = moment(this.date).format("YYYY-MM-DD");
        // this.payload.WarehouseId = this.selectedWarehouse.value;
        let warehouses =this.warehouseids.map(x => x.value);
        console.log('warehouses: ', warehouses);
        this.isLoading = true;
        let input = {
          WarehouseId: warehouses,
          ForMonth: this.payload.StartDate ,
          Keyword: ''
        };
        // debugger
        this.vendorPaymentService.GetRegionalSummaryList(input).subscribe(
          // this.vendorPaymentService.GetRegionalList('213', "2023-08-01").subscribe(
          (res: any) => {
            console.log("vendorTableData", res);
            this.isLoading = false;
            this.vendorTableData = res;
  
            for (let element of this.vendorTableData) {
              this.checkApprovalOrRejectStatus(element);
            }
            // this.invoicePayload.PaidAmount=this.totalPayableAmount;
  
            this.pureTransporterList = this.vendorTableData;
            this.filter();
          },
          (err: any) => {
            this.vendorTableData = [];
            this.isLoading = false;
            alert("something went wrong, please try again");
          }
        );
      }
    }
  
    RegionalTranspoterPaymentDetailList(rowdata: any) {
      this.payload.FleetId = rowdata.FleetId;
      let lastDay = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.daysInMonth(this.date.getMonth() + 1, this.date.getFullYear())
      );
      this.payload.EndDate = moment(lastDay).format("YYYY-MM-DD");
      this.vendorPaymentService
        .RegionalTranspoterPaymentDetailList(this.payload)
        .subscribe(
          (res: any) => {
            console.log("subdata", res);
            rowdata.subdata = res;
          },
          (err: any) => {
            alert("something went wrong, please try again");
          }
        );
    }
  
    approveRejectComment: string = "";
    approveReject(isApproved: any) {
      let methodCall: any;
      let currentRole = this.selectedRole.role;
  
      if (this.approveRejectComment == '' && !isApproved) {
        alert("Please put comment while rejecting a payment");
        return;
      }
  
      let LocalPayload = {
        Comment: this.approveRejectComment,
        TransporterPaymentId: this.selectedTransporterRow.PaymentId,
        IsApprove: isApproved,
      };
  
      switch (this.selectedRole.role) {
        case "Regional Outbound Lead":
          methodCall =
            this.vendorPaymentService.ApproveRejectByRegional(LocalPayload);
          break;
        case "HQ Ops Lead":
          methodCall =
            this.vendorPaymentService.ApproveRejectByOpsLead(LocalPayload);
  
          break;
        case "Accounts executive":
          methodCall =
            this.vendorPaymentService.ApproveRejectByAccounts(LocalPayload);
  
          break;
        case "Accounts associates":
          methodCall =
            this.vendorPaymentService.ApproveRejectByAccounts(LocalPayload);
  
          break;
        case "HQ Accounts Lead":
          methodCall =
            this.vendorPaymentService.ApproveRejectByAccountLead(LocalPayload);
          break;
        default:
          break;
      }
      this.isLoading = true;
      methodCall.subscribe((res: any) => {
        console.log("approve/reject data", res);
        this.isLoading = false;
        this.actionPopupOpen = false;
        this.search();
        if (res) {
          alert(res.Message);
        }
      },
        (err: any) => {
          alert("Something went wrong, Please try again");
          this.isLoading = false;
          this.actionPopupOpen = false;
          this.search();
        }
      );
    }
  
    invoicePayload = {
      TransactionId: '',
      PaymentDate: '',
      PaidAmount: 0,
     };
  
    UpdateInvoice() {
  
      if(this.invoicePayload.PaidAmount==0 ||this.invoicePayload.PaidAmount==null )
      {
        alert('Amount Cannot be 0');
        return
      }
  
      if(this.invoicePayload.PaidAmount> this.totalPayableAmount)
      {
        alert('Amount Cannot be greater than Total payable amount');
        return
      }
      let dt = moment(this.invoicePayload.PaymentDate).format("YYYY-MM-DD");
      let invoicePayload = {
        PaymentId: this.selectedTransporterRow.PaymentId,
        TransactionId: this.invoicePayload.TransactionId.trim(),
        PaymentDate: dt,
        PaidAmount:this.invoicePayload.PaidAmount,
      };
      console.log(invoicePayload);
  
      if (invoicePayload.PaymentDate == "Invalid date" || this.invoicePayload.TransactionId == '') {
        alert("please enter the filters");
      } else {
        this.isLoading = true;
        this.vendorPaymentService.UpdateInvoice(invoicePayload).subscribe(
          (x: any) => {
            console.log("UpdateInvoice", x);
            this.isLoading = false;
            if (x) {
              alert(x.Message);
              this.search();
              this.actionPopupOpen = false;
            } else {
              // this.actionPopupOpen = false;
              alert("something went wrong, please try again");
            }
          },
          (err: any) => {
            alert("something went wrong, please try again");
          }
        );
      }
    }
  
    ExportTallyFile() {
      let firstDay = moment(new Date(this.date.getFullYear(), this.date.getMonth(), 1)).format("YYYY-MM-DD");
      this.vendorPaymentService.ExportTallyFile(this.selectedWarehouse.value, firstDay).subscribe((x: any) => {
        console.log("ExportTallyFile", x);
        if (x) {
          let string = this.baseURL + x;
          window.open(string);
        } else {
          alert("something went wrong please try again");
        }
      });
    }
    
    // TallyFilegenerated() {
  
    //   if(this.tellyIdsColltn.length>0){
    //     let paytload={
    //       paymentId : this.tellyIdsColltn
    //     }
    //     this.vendorPaymentService.TallyFilegenerated(paytload).subscribe((x: any) => {
    //       console.log("TallyFilegenerated", x);
    //       if (x) {
    //         let string = this.baseURL + x;
    //         window.open(string);
    //       } else {
    //         alert("something went wrong please try again");
    //       }
    //     });
    //   }else{
    //     alert("Please select vendors before generating the report for telly")
    //   }
    // }
  
    // ExportPaymentFile() {
    //   let firstDay = moment(new Date(this.date.getFullYear(), this.date.getMonth(), 1)).format("YYYY-MM-DD");
    //   this.vendorPaymentService.ExportPaymentFile(this.selectedWarehouse.value, firstDay).subscribe((x: any) => {
    //     console.log("ExportPaymentFile", x);
    //     if (x) {
    //       let string = this.baseURL + x;
    //       window.open(string);
    //     } else {
    //       alert("something went wrong please try again");
    //     }
    //   });
    // }
  
    ExportRegiobalFile() {
      let firstDay = moment(new Date(this.date.getFullYear(), this.date.getMonth(), 1)).format("YYYY-MM-DD");
      this.vendorPaymentService.RegionalExport(this.selectedWarehouse.value, firstDay).subscribe((x: any) => {
        console.log("ExportPaymentFile", x);
        if (x) {
          let string = this.baseURL + x;
          window.open(string);
        } else {
          alert("something went wrong please try again");
        }
      });
    }
  
    //----------------------------helping methods-------------------------------------------
    daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
  
    findUserRole() {
      // debugger
      let userRole: any = localStorage.getItem("role");
      this.UserRole = userRole.split(",");
      // console.log("userRole", this.UserRole);
      // if (this.UserRole.length > 1) {
      //   this.showUserRoleDropdown = true;
      // }
      // debugger
      this.RoleEnums.forEach((x: any) => {
        this.userRoleDropdownList.push(x);
      });
      this.selectedRole = this.userRoleDropdownList[0];
    }
  
    setUserRole() {
      // this.selectedfilter = this.filterOptions[0];
      if (this.pureTransporterList.length > 0) {
        for (let element of this.pureTransporterList) {
          this.checkApprovalOrRejectStatus(element)
        }
      }
      this.filter();
    }
  
    filter() {
      // debugger
      if (this.selectedRole.role == "Accounts executive" || this.selectedRole.role == "Accounts associates") {
  
      }
  
      if (this.selectedfilter.value == 'All') {
        this.vendorTableData = JSON.parse(JSON.stringify(this.pureTransporterList));
      } else {
        this.vendorTableData = JSON.parse(JSON.stringify(this.pureTransporterList)).filter(x => {
          return x.showAction == true || (
            (this.selectedRole.role == "Accounts executive" || this.selectedRole.role == "Accounts associates") && x.isMarkedAsPaid == true);
        });
      }
  
  
    }
  
    checkApprovalOrRejectStatus(rowdata: any) {
      let currentRole = this.selectedRole.role;
      let totalamt: number = 0;
  
      rowdata.subdata = [];
      rowdata.isChecked = false;
      let paymentMsgObj = this.TransporterPaymentPaymentStatusEnum.filter(x => x.key == rowdata.PaymentStatus)[0];
      let approvalMsgObj = this.TransporterPaymentApprovalStatusEnum.filter(x => x.key == rowdata.ApprovalStatus)[0];
      rowdata.paymentMsg = paymentMsgObj.value;
      rowdata.approvalMsg = approvalMsgObj.value;
      rowdata.showAction = false;
      rowdata.isMarkedAsPaid = false;
      totalamt = rowdata.UtilizedAmount + rowdata.ExtraKmAmount + rowdata.OtherCharges;
  
      // debugger;
  
      switch (this.selectedRole.role) {
        case "Regional Outbound Lead":
          if (rowdata.ApprovalStatus == approvalStatus.Finalized) {
            rowdata.showAction = true;
            //return rowdata.showAction
          }
          break;
        case "HQ Ops Lead":
          if (
            rowdata.ApprovalStatus == approvalStatus.ApprovedByRegional &&
            totalamt > 200000
          ) {
            rowdata.showAction = true;
            //return rowdata.showAction
          }
          break;
        case "Accounts executive":
          if (
            (rowdata.ApprovalStatus == approvalStatus.ApprovedByRegional &&
              totalamt <= 200000) ||
            (rowdata.ApprovalStatus == approvalStatus.ApprovedByHQOpsLead &&
              totalamt > 200000) ||
            rowdata.ApprovalStatus == approvalStatus.RejectedByAccountLead
          ) {
            rowdata.showAction = true;
            //return rowdata.showAction
          }
          if (rowdata.ApprovalStatus == approvalStatus.ApprovedByAccountLead && rowdata.PaymentStatus != paymentStatus.PaymentDone) {
            rowdata.isMarkedAsPaid = true;
          }
          break;
        case "Accounts associates":
          if (
            (rowdata.ApprovalStatus == approvalStatus.ApprovedByRegional &&
              totalamt <= 200000) ||
            (rowdata.ApprovalStatus == approvalStatus.ApprovedByHQOpsLead &&
              totalamt > 200000) ||
            rowdata.ApprovalStatus == approvalStatus.RejectedByAccountLead
          ) {
            rowdata.showAction = true;
            //return rowdata.showAction
          }
          if (rowdata.ApprovalStatus == approvalStatus.ApprovedByAccountLead && rowdata.PaymentStatus != paymentStatus.PaymentDone) {
            rowdata.isMarkedAsPaid = true;
          }
          break;
        case "HQ Accounts Lead":
          if (rowdata.ApprovalStatus == approvalStatus.ApporvedByAccount) {
            rowdata.showAction = true;
            //return rowdata.showAction
          }
          if (rowdata.ApprovalStatus == approvalStatus.ApprovedByAccountLead && rowdata.PaymentStatus != paymentStatus.PaymentDone) {
            rowdata.isMarkedAsPaid = true;
          }
          break;
        default:
          rowdata.showAction = false;
          break;
      }
    }
  
    detailsPopupOpen: boolean = false;
  
  
  
    fleetDetails(order) {
  
      let firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
      let lastDay = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.daysInMonth(this.date.getMonth() + 1, this.date.getFullYear())
      );
  
      let details = {
        StartDate: moment(firstDay).format("YYYY-MM-DD"),
        EndDate: moment(lastDay).format("YYYY-MM-DD"),
        VehicleMasterId: order.VehicleMasterId,
      };
  
      this.vendorPaymentService.getDocList(order.TransporterPaymentDetailId).subscribe((x: any) => {
        if (x) {
          this.docList = x;
          console.log(this.docList);
          
          this.docList.forEach((x:any)=>{
            if (x.DocType == 1) {
              return x.DocTypeName = "LogBook Image"
            }
            else if (x.DocType == 2) {
              return x.DocTypeName = "Toll Reciept"
            }
            else {
              return x.DocTypeName = "Other Charges Reciept"
            }
  
          })
        } else {
          this.docList = [];
        }
      });
      this.vendorPaymentService.getTransporterPaymentVehicleAttadanceList(details).subscribe((y) => {
        if (y) {
          this.fleetDetailList = y;
        } else {
          this.fleetDetailList = [];
        }
      });
  
      this.detailsPopupOpen = true;
    }
  
  
  
    actionPopupOpen: boolean = false;
    actionPopup(rowdata: any) {
      this.invoicePayload = {
        TransactionId: '',
        PaymentDate: '',
        PaidAmount:rowdata.TotalPayable 
      };
      this.totalPayableAmount = rowdata.TotalPayable;
      
      this.approveRejectComment = '';
      this.actionTabs = '';
      this.actionPopupOpen = true;
      this.selectedTransporterRow = rowdata;
      console.log(this.selectedTransporterRow);
  
    }
  
    actionTabs: string = '';
    switchActionTabs(switchString: string) {
      this.actionTabs = switchString;
      switch (switchString) {
        case "Approve/Reject":
          break;  
        case "View Doc":
          // this.getDocList();
          break;
        case "Mark as Paid":
          break;
        case "Comments":
  
          break;
        case "History":
  
          break;
        default:
          break;
      }
    }
  
    confirm1() {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Accept?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.approveReject(true);
        },
        reject: () => {
        }
      })
    };
  
    confirm2() {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Reject?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.approveReject(false);
        },
        reject: () => {
        }
      })
    };
  
    openInvoice(doc) {
      window.open(this.baseURL+doc)
    }
  
  
    paymentHistoryList: any[] = [];
    getpaymenthistoryList(rowdata) {
      // debugger;
      this.vendorPaymentService.getPaymentHistoryList(rowdata.PaymentId).subscribe((x: any) => {
        console.log("paymentHistoryList", x);
        if (x) {
          this.paymentHistoryList = x;
        } else {
          this.paymentHistoryList = [];
        }
      },
        (err: any) => {
          alert("something went wrong, please try again");
        });
    }
  
  
  
    exportToExcel() {
      if (this.vendorTableData && this.vendorTableData.length > 0) {
        let expList = []
        // this.vendorTableData.forEach((element: any) => {
        //   if (true) {
        //     expList.push({
        //       OrderId: appItem.OrderId,
        //       ItemName: appItem['ItemName'],
        //       TotalAmount: appItem.TotalAmount,
        //       CommissionAmount: appItem.CommissionAmount,
        //       CommissionPercentage: appItem.CommissionPercentage
        //     }
        //     );
        //   }
        // });
  
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.vendorTableData);
        console.log('exp - worksheet', worksheet);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'List');
      } else {
        alert("No Data to Export");
      }
    }
  
    
    saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: "xlsx"
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
    }
  
    tellyIdsColltn: any[] = [];
    selectRowsForTell(e: any) {
      this.tellyIdsColltn = this.vendorTableData.filter(x => x.isChecked == true).map(x => {
        return x.PaymentId;
      });
      console.log("row", this.tellyIdsColltn);
  
    }
   
    omit_special_char(event) {
  
      var k;
      k = event.charCode; //         k = event.keyCode;  (Both can be used)
      return (
        (k > 64 && k < 91) ||
        (k > 96 && k < 123) ||
        k == 8 ||
        k == 32 ||
        k == 46 ||
        (k >= 48 && k <= 57)
      );
    }
    openImage(doc){
      window.open(this.baseURL+ doc)
     }
  

}


interface payload {
  WarehouseId: number;
  StartDate: string;
  EndDate: string;
  FleetId: number;
}


enum approvalStatus {
  Pending = 0,
  Finalized = 1,
  RejectedByRegional = 2,
  ApprovedByRegional = 3,
  ApporvedByAccount = 4,
  RejectedByAccount = 5,
  ApprovedByHQOpsLead = 6,
  RejectedByHQOpsLead = 7,
  ApprovedByAccountLead = 8,
  RejectedByAccountLead = 9,
}

enum paymentStatus {
  Pending = 0,
  PaymentPending = 1,
  PaymentDone = 2,
}





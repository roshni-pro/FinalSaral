import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { DeliveryDashboardService } from "app/operation-capacity/services/delivery-dashboard.service";
import { PlanMasterService } from "app/operation-capacity/services/plan-master.service";
import { VendorPaymentService } from "app/operation-capacity/services/vendor-payment.service";
import { LoaderService } from "app/shared/services/loader.service";
import { PepolePilotService } from "app/shared/services/pepole-pilot.service";
import { WarehouseService } from "app/shared/services/warehouse.service";
import { environment } from "environments/environment";
import * as moment from "moment";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-vendor-payment-hublead",
  templateUrl: "./vendor-payment-hublead.component.html",
  styleUrls: ["./vendor-payment-hublead.component.scss"],
})
export class VendorPaymentHubleadComponent implements OnInit {
  selectedWarehouse: any;
  warehouseList: any;
  blocked: boolean;
  transporterList: any;
  warehouseId: number;
  date: any;
  TranspoterPaymentDetailList: any;
  documentType: any;
  selectedTransporter: any;
  taxType: any;
  fleettype: any;
  totalUtilizedAmount: number = 0;
  totalExtraKmAmt: number = 0;
  totalTollAmount: number = 0;
  totalPayableAmount: number = 0;
  totalMonthlyContractKm: number = 0;
  invoicePath: any;
  logBookPath: any;
  file: File[];
  selectedDoc: any;
  uploadLogbook: boolean = false;
  uploadTollReciept: boolean = false;
  uploadOtherChargeReciept: boolean = false;
  selectedTax: any;
  docurl: any;
  docIds: any;
  baseURL: any;
  roleName: any;
  roleList: any;
  roleListarry: boolean = true;
  isEditable: boolean;
  transporterPaymentId: any;
  PaymentStatus: any;
  PaymentStatusString: string;
  ApprovalStatus: any;
  ApprovalStatusString: string;
  transporterInvoicePath: any;
  payload: any = [];
  transporterPaymentDetailId: number;
  displaypopup: boolean;
  transpoterDetailList: any;
  displayTax: boolean = false;
  invoiceDate: any;
  invoiceNumber: any;
  generatedInvoicePath: any;
  yearRangeForCalender: string;

  isOpenAddVehicle: boolean;

  addedVehicle: AddedPaymentVehicle = null;
  selectedVehicle: any;
  vehicleList: any[];
  transporterPaymentResponse: any;

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

  constructor(
    private planMasterService: PlanMasterService,
    private vendorPaymentService: VendorPaymentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private peoplePilot: PepolePilotService,
    private loaderService: LoaderService
  ) {
    this.baseURL = environment.apiURL;
  }

  ngOnInit() {
    this.yearRangeForCalender = "2016:";
    this.yearRangeForCalender += new Date().getFullYear();
    this.peoplePilot.GetUserRole().subscribe((result) => {
      localStorage.setItem("role", result);
      this.roleName = localStorage.getItem("role");
      this.roleList = this.roleName.split(",");
      console.log("this.roleList", this.roleList);

      for (var i in this.roleList) {
        if (
          this.roleList[i] == "Hub service lead" ||
          this.roleList[i] == "HQ Master login"
        ) {
          this.roleListarry = false;
        }
      }
    });
    this.getWareHouseList();
    this.taxTypeList();
    this.documentTypeList();
  }

  taxTypeList() {
    this.taxType = [
      { label: "FCM", code: "FCM" },
      { label: "RCM", code: "RCM" },
    ];
  }

  documentTypeList() {
    this.documentType = [
      { label: "LogBook Image", Id: 1 },
      { label: "Toll Reciept", Id: 2 },
      { label: "Other Charges Reciept", Id: 3 },
    ];
  }

  onUpload(file: File[]) {

    this.file = file;
    var reader = new FileReader();
    // this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => { };
    this.uploadHDFC();
  }

  uploadHDFC() {
    if (this.file == undefined) {
      alert("Please upload File");
    }

    let formData = new FormData();

    if (this.file && this.file.length > 0)
      formData.append("file", this.file[0]);

    this.blocked = true;
    this.vendorPaymentService.uploader(formData).subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.docurl = result;

        alert(result);
        this.blocked = false;
        this.file = [];
      } else {
        this.blocked = false;
        this.file = [];
        alert(result);
      }
    });
  }
  saveTransportDoc() {


    if (this.selectedDoc.label == undefined) {
      return alert("please select document");
    }
    if (this.docurl == undefined) {
      return alert("Please upload File");
    } else {
      this.payload = [];

      // this.docurl.forEach((x: any, index) => {
      const obj = {
        TransporterPaymentDetailId: this.transporterPaymentDetailId,
        DocType: this.selectedDoc.Id,
        DocPath: this.docurl,
      };
      this.payload.push(obj);
      // });
      this.vendorPaymentService
        .insertTransporterPaymentDetailDoc(this.payload)
        .subscribe((result: any) => {
          if (result) {
            alert("file Saved");
            this.file.length = 0;
            this.blocked = false;

            this.getDocList();
            this.selectedDoc = [];
            this.docurl = null;
            $("#myInput").val("");
            // this.transporterPaymentDetailId = null
          } else {
            this.blocked = false;

            alert("error");
          }
        });
    }
  }

  selectedUpload(selectedDoc) {

    console.log(selectedDoc);
    this.docIds = selectedDoc;
    this.uploadLogbook = selectedDoc.find((x) => {
      if (x.label == "LogBook Image") return true;
      else return false;
    });
    this.uploadTollReciept = selectedDoc.find((x) => {
      if (x.label == "Toll Reciept") return true;
      else return false;
    });
    this.uploadOtherChargeReciept = selectedDoc.find((x) => {
      if (x.label == "Other Charges Reciept") return true;
      else return false;
    });
  }
  getWareHouseList() {
    this.blocked = true;
    this.planMasterService.getWarehouseList().subscribe((res) => {
      this.warehouseList = res;
      console.log(res);

      this.blocked = false;
      console.log("warehouseList:", this.warehouseList);
    });
  }
  onChangeWarehouse() {

    this.selectedTransporter = [];
    this.blocked = true;
    this.vendorPaymentService
      .getFleetList(this.selectedWarehouse.value)
      .subscribe((x) => {
        this.blocked = false;
        this.transporterList = x;
        console.log(x);

        this.fleettype = null;
      });
  }
  onChangefleettype() {
    this.transporterList.map((x: any) => {

      if (x.fleetId == this.selectedTransporter.fleetId) {
        this.fleettype = x.FleetType;
      }
    });
  }
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getTransporterPaymentDetailList() {
    this.totalExtraKmAmt = 0;
    this.totalTollAmount = 0;
    this.totalUtilizedAmount = 0;
    this.totalPayableAmount = 0;
    this.totalMonthlyContractKm = 0;
    this.fleettype = this.selectedTransporter.FleetType;
    let firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    let lastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.daysInMonth(this.date.getMonth() + 1, this.date.getFullYear())
    );

    console.log(firstDay);
    console.log(lastDay);

    const payload = {
      WarehouseId: this.selectedWarehouse.value,
      StartDate: moment(firstDay).format("YYYY-MM-DD"),
      EndDate: moment(lastDay).format("YYYY-MM-DD"),
      FleetId: this.selectedTransporter.fleetId,
    };
    this.blocked = true;
    this.vendorPaymentService
      .getTranspoterPaymentDetailList(payload)
      .subscribe((res: any) => {
        console.log(res);
        this.blocked = false;

        this.TranspoterPaymentDetailList = res.getTranspoterPaymentDetailList;
        this.transporterPaymentId = res.TransporterPaymentId;
        this.transporterPaymentResponse = res;
        console.log(
          "this.TranspoterPaymentDetailList",
          this.TranspoterPaymentDetailList
        );
        console.log(
          "res",
          res
        );
        this.ApprovalStatus = res.ApprovalStatus;
        this.PaymentStatus = res.PaymentStatus;
        this.invoicePath = res.TransporterInvoicePath;
        this.generatedInvoicePath = res.GeneratedInvoicePath;
        this.logBookPath = res.LogBookPath;
        this.setPaymentAndApprovalStatusString();

        this.TranspoterPaymentDetailList.forEach((x: any) => {
          x["isEditable"] = false;
          this.totalPayableAmount += (x.PayableAmount);
          this.totalExtraKmAmt += x.ExtraKmAmt;
          this.totalTollAmount += x.TollAmount;
          this.totalUtilizedAmount += x.UtilizedAmount;
          this.totalMonthlyContractKm += x.MonthlyContractAmount;
        });

        this.checkApprovalOrRejectStatus();
      });
  }

  getPaymentVehicleAttadanceList(rowData) {
    // 
    this.displaypopup = true;
    this.transporterPaymentDetailId = rowData.TransporterPaymentDetailId;

    let firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    let lastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.daysInMonth(this.date.getMonth() + 1, this.date.getFullYear())
    );
    const payload = {
      StartDate: moment(firstDay).format("YYYY-MM-DD"),
      EndDate: moment(lastDay).format("YYYY-MM-DD"),
      VehicleMasterId: rowData.VehicleMasterId,
    };
    this.vendorPaymentService
      .getTransporterPaymentVehicleAttadanceList(payload)
      .subscribe((x: any) => {
        this.transpoterDetailList = x;
        console.log(x);
      });
    this.getDocList();
  }


  onChangeDailyContractAmount(rowData) {
    rowData.UtilizedAmount = rowData.Attendance * rowData.DaywiseContractAmount;

  }

  updateTransporterPayment(rowData) {
    // 
    debugger
    if (rowData.TollAmount < 0) {
      rowData.TollAmount = -(rowData.TollAmount);
      return rowData.TollAmount;
    }
    this.TranspoterPaymentDetailList.forEach((x: any) => {
      if (x.TransporterPaymentDetailId == rowData.TransporterPaymentDetailId) {
        if (x.isEditable) x.isEditable = false;
        else x.isEditable = true;
      }
    });

    debugger;
    rowData.UtilizedAmount = rowData.Attendance * rowData.DaywiseContractAmount;
    rowData.MonthlyContractAmount = 26 * rowData.DaywiseContractAmount;
    const payload = {
      TransporterPaymentDetailId: rowData.TransporterPaymentDetailId,
      TollAmount: rowData.TollAmount,
      OtherExpense: rowData.OtherExpense,
      Remark: rowData.Remark,
      UtilizedAmount: rowData.UtilizedAmount,
      MonthlyContractAmount: rowData.MonthlyContractAmount

    };
    this.vendorPaymentService
      .updateTransporterPaymentDetail(payload)
      .subscribe((data: any) => {
        if (data.Status && !rowData.isEditable) {
          alert(data.Message);
          this.getTransporterPaymentDetailList();
        }
        console.log(data);
      });
  }

  editUpdateTransporterPayment(rowData) {
    rowData.isEditable = true;
    rowData.DaywiseContractAmount = rowData.MonthlyContractAmount / 26;

  }

  doclist: any;
  getDocList() {
    this.vendorPaymentService
      .getDocList(this.transporterPaymentDetailId)
      .subscribe((x: any) => {
        this.doclist = x;
        this.doclist.forEach((x: any) => {
          if (x.DocType == 1) {
            return (x.DocTypeName = "LogBook Image");
          } else if (x.DocType == 2) {
            return (x.DocTypeName = "Toll Reciept");
          } else {
            return (x.DocTypeName = "Other Charges Reciept");
          }
        });
        console.log(x);
      });
  }
  deleteDoc(rowData) {
    // 

    if (confirm("Do you want to delete this record ?")) {
      const obj = {};

      this.vendorPaymentService
        .deleteDocById(rowData.TransporterPaymentDetailDocId, obj)
        .subscribe((res: any) => {
          //console.log(res);
          if (res == true) {
            alert("Deleted Successfully!");
          } else {
            alert("Record Not Deleted!");
            this.messageService.add({
              severity: "error",
              summary: "Record Not Deleted!",
              detail: "",
            });
          }
          this.getDocList();
        });
    } else {
      return false;
    }
  }
  onuploadInvoice(file: File[]) {
    // 

    if (confirm("Do you want to upload this file ?")) {
      this.file = file;
      var reader = new FileReader();

      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => { };
      this.uploadInvoice();
    } else {
      $("#myInput1").val("");

      return false;
    }

  }

  uploadInvoice() {
    // 
    if (!this.file) {
      alert("Please upload File");
      return;

    }


    // 
    let formData = new FormData();

    if (this.file && this.file.length > 0)
      formData.append("file", this.file[0]);

    this.blocked = true;
    this.vendorPaymentService
      .invoiceUploader(formData)
      .subscribe((result: any) => {
        if (result) {
          console.log(result);

          alert(result);
          this.invoicePath = result;
          this.blocked = false;
          this.file = [];
        } else {
          this.blocked = false;
          this.file = [];
          alert(result);
        }
      });
  }

  final() {
    this.displayTax = true;
    this.invoiceNumber = null;
    this.invoiceDate = null;
    this.selectedTax = null;
    this.transporterInvoicePath = [];
  }
  finalized() {
    // 

    if (this.selectedTax == undefined || this.selectedTax == null) {
      alert("Please Select TaxType");
      return false;
    }
    if (this.invoiceNumber == undefined || this.invoiceNumber == null) {
      alert("Please enter Invoice Number");
      return false;
    }
    if (this.invoiceDate == undefined || this.invoiceDate == null) {
      alert("Please Select Invoice Date");
      return false;
    }
    // if (this.invoiceDate == undefined || this.invoiceDate == null) {
    //   alert("Please Select Invoice Date");
    //   return false;
    // }
    if (this.invoicePath.length == 0 || this.invoicePath == null) {
      alert("Please Upload Invoice ");
      return false;
    }
    this.blocked = true;

    const payload = {
      TaxType: this.selectedTax.code,
      TransporterPaymentId: this.transporterPaymentId,
      TransporterInvoicePath: this.invoicePath,
      InvoiceNumber: this.invoiceNumber,
      InvoiceDate: moment(this.invoiceDate).format("YYYY-MM-DD"),
    };
    this.vendorPaymentService.Fianlized(payload).subscribe((x: any) => {
      // console.log(x);
      alert(x.Message);
      this.blocked = false;
      this.displayTax = false;
      this.transporterInvoicePath = [];
      this.getTransporterPaymentDetailList();
    });
  }

  openImage(docImage) {
    // 
    window.open(this.baseURL + docImage);
  }
  openGeneratedInvoiceImage() {
    // 
    window.open(this.baseURL + this.generatedInvoicePath);
  }
  cancel(rowData) {
    rowData.isEditable = false;
    this.getTransporterPaymentDetailList();
  }
  role: any;
  checkfinalized: boolean = false;
  checkApprovalOrRejectStatus() {
    // 
    let currRole: any = this.roleList.filter(
      (x: any) => x == "Hub service lead" || x == "HQ Master login"
    )[0];
    this.role = currRole;
    if (
      currRole &&
      (this.ApprovalStatus == 0 ||
        this.ApprovalStatus == 2 ||
        this.ApprovalStatus == 7 ||
        this.ApprovalStatus == 5) &&
      this.PaymentStatus == 0
    ) {
      this.checkfinalized = true;
    } else {
      this.checkfinalized = false;
    }
  }
  paymentHistoryList: any;
  displayhistory: boolean = false;

  getpaymenthistoryList(rowdata) {
    // 
    this.vendorPaymentService
      .getPaymentHistoryList(rowdata.TransporterPaymentDetailId)
      .subscribe((x: any) => {
        this.paymentHistoryList = x;

        console.log(x);
        if (this.paymentHistoryList.length > 0) {
          this.displayhistory = true;
        } else {
          alert("No Data Found");
        }
      });
  }

  crossonInvoiceImage() {
    this.invoicePath = [];
  }
  openuploadedInvoice() {
    if (this.invoicePath) {
      window.open(this.baseURL + this.invoicePath);
    } else {
      alert("Invoice Not Exist");
    }
  }
  onChangeTollAmount(rowData) {
    if (rowData.TollAmount < 0) {
      rowData.TollAmount = -(rowData.TollAmount);
      return rowData.TollAmount;
    }
  }

  addVehicle(vehicle: any) {
    this.selectedVehicle = null;
    this.isOpenAddVehicle = true;
    this.vehicleList = null;
    // this.transporterPaymentId = null;
    this.addedVehicle = null;
    if (vehicle == null) {
      this.selectedVehicleToEdit = undefined;
      this.vendorPaymentService.getTranspoterPaymentVehicleList(this.transporterPaymentId).subscribe(x => {
        this.vehicleList = x;
        console.log(' this.vehicleList: ', this.vehicleList);
      })
      this.addedVehicle = {
        Id: 0,
        ExtraKm: 0,
        ExtraKmAmt: 0,
        OtherExpense: 0,
        TollAmount: 0,
        TransporterPaymentId: this.transporterPaymentId,
        UtilizedAmount: null,
        UtilizedKm: null,
        VehicleMasterId: null,
        ExtraKmCharge: 0,
        MonthlyContactAmt: null,
        MonthlyContactKm: null,
        PayableAmount: 0
      };
    } else {
      this.addedVehicle = vehicle;
    }
  }

  onChangeVehicle() {
    this.addedVehicle.VehicleMasterId = this.selectedVehicle.VehicleMasterId;
    console.log('this.selectedVehile: ', this.selectedVehicle);
    this.vendorPaymentService.getTransporterPayVehicleInfo(this.addedVehicle.VehicleMasterId).subscribe(x => {
      this.addedVehicle.ExtraKmCharge = x.ExtraKmCharge;
      this.addedVehicle.MonthlyContactAmt = x.MonthlyContactAmt;
      this.addedVehicle.MonthlyContactKm = x.MonthlyContactKm;

      console.log('infor: ', x);
    });
  }

  onChangeExtraKM() {
    this.addedVehicle.ExtraKmAmt = this.addedVehicle.ExtraKmCharge * this.addedVehicle.ExtraKm;
    this.reCalculatePayableAmount();
  }

  reCalculatePayableAmount() {
    this.addedVehicle.PayableAmount = this.addedVehicle.UtilizedAmount + this.addedVehicle.OtherExpense + this.addedVehicle.TollAmount + this.addedVehicle.ExtraKmAmt;
  }

  addUpdateVechile(vehicleForm: any) {
    if (vehicleForm.valid) {
      this.loaderService.loading(true);
      this.vendorPaymentService.paymentDetailVehicleInsert(this.addedVehicle).subscribe(x => {

        this.loaderService.loading(false);
        if (x.IsSuceess) {
          this.isOpenAddVehicle = false;
          alert(x.SuccessMessage);
          this.getTransporterPaymentDetailList();
        } else {
          alert(x.ErrorMessage);
        }
      });
    } else {
      // alert("Invalid")
    }

  }


  selectedVehicleToEdit: any;
  updateTransporterPaymentDetail(detail: any) {
    console.log('updateTransporterPaymentDetail: ', detail);
    this.selectedVehicleToEdit = detail;
    this.vendorPaymentService
      .transporterPayDetailList(detail.TransporterPaymentDetailId)
      .subscribe(x => {
        console.log('transporterPayDetailList: ', x);

        this.addVehicle(x);
      })
  }


  setPaymentAndApprovalStatusString() {
    let approval = this.TransporterPaymentApprovalStatusEnum.filter(x => {
      return x.key == this.ApprovalStatus;
    });

    if (approval && approval.length > 0) {
      this.ApprovalStatusString = approval[0].value;
    }

    let payment = this.TransporterPaymentPaymentStatusEnum.filter(x => {
      return x.key == this.PaymentStatus;
    });

    if (payment && payment.length > 0) {
      this.PaymentStatusString = payment[0].value;
    }
    console.log('this.ApprovalStatusString : ', this.ApprovalStatusString);
    console.log('this.PaymentStatusString : ', this.PaymentStatusString);
  }

  // openUploadedInvoiceImage(){

  // }
}


export interface AddedPaymentVehicle {
  Id: number;
  TransporterPaymentId: number;
  VehicleMasterId: number;
  UtilizedKm: number;
  UtilizedAmount: number;
  TollAmount: number;
  OtherExpense: number;
  ExtraKm: number;
  ExtraKmAmt: number;


  //client side properties
  MonthlyContactKm: number;
  MonthlyContactAmt: number;
  ExtraKmCharge: number;
  PayableAmount: number;
}


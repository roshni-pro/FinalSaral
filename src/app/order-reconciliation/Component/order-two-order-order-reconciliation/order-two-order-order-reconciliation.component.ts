import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderReconciliationServiceService } from 'app/order-reconciliation/Service/order-reconciliation-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-two-order-order-reconciliation',
  templateUrl: './order-two-order-order-reconciliation.component.html',
  styleUrls: ['./order-two-order-order-reconciliation.component.scss']
})
export class OrderTwoOrderOrderReconciliationComponent implements OnInit {
  cityList: any;
  SelectedWarehouse: any[] = [];
  WarId: any;
  record: boolean = false;
  statusupdate: any;
  dropdownopen: boolean = false
  historyList: any;
  SelectedRecon: any;
  keyword: any
  comments: any
  first: number = 0;
  maxDate = new Date();
  TotalRecords: any;
  WareHouseList: any[] = [];
  SelectedCity: any[] = [];
  CtyIdd: any[] = [];
  id: any;
  AmountReceived: any;
  InvoiceAmount: any;
  OrderId: any
  datadialog: any;
  ReasonStatus: any[];
  // files: any;
  TableData: any;
  UpdateStatus: boolean = false;
  HistoryStatus: boolean = false;
  MOP: any[];
  // file: File[];
  // filepath: File[];
  UpdatesonStatus: any;
  mop: any;
  paymentmode: any
  blocked: boolean = false;
  rangeDates: any;
  startDate: any
  endtDate: any
  selectedComments: any;
  selectedStatus: any;
  Skcode: any
  ReconciliationList: any;
  VerifiedStatus: any;
  isexport: boolean = false;
  constructor(private ReconciliationServiec: OrderReconciliationServiceService, public datepipe: DatePipe, private messageService: MessageService,private expoerService:ExportServiceService) { }


  ngOnInit() {
    this.ReasonStatus = [
      { code: "", name: "All" },
      { code: "Not Verified", name: "Not Verified" },
      { code: "Partially Verified", name: "Partially Verified" },
      { code: "Verified", name: "Verified" },
    ];
    this.VerifiedStatus = [
      { code: "Verified", name: "Verified" },
    ];
    this.UpdatesonStatus = [
      { code: "Partially Verified", name: "Partially Verified" },
      { code: "Verified", name: "Verified" },
    ];
    this.MOP = [
      { name: "All", code: "" },
      { name: "HDFC(CC,DC,UPI,NetBanking)", code: "hdfc" },
      { name: "UPI", code: "UPI" },
      { name: "Direct Udhaar", code: "DirectUdhar" },
      { name: "RTGS/NEFT", code: "RTGS/NEFT" },
      { name: "Cheque", code: "Cheque" },
      { name: "Gullak", code: "Gullak" },
      { name: "Cash", code: "Cash" },
    ];
    this.GetCity()
  }


  GetCity() {
    this.blocked = true;
    this.ReconciliationServiec.getAllCityNew().subscribe((result) => {
      this.blocked = false;
      this.cityList = result;
      this.GetWarehouse()
    });
  }

  GetWarehouse() {
    this.CtyIdd = [];
    if (this.SelectedCity.length > 0 || this.SelectedCity != undefined) {
      this.SelectedCity.forEach((element) => {
        this.CtyIdd.push(element.value);
      });
      this.blocked = true;
      this.ReconciliationServiec.GetWarehouseListForTargetV2(this.CtyIdd)
        .subscribe((WareRes) => {
          this.blocked = false;
          console.log(WareRes, "WareRes");
          this.WareHouseList = WareRes;
        });
    }
  }

  // uploadFile(file) {
  //   this.files = file.files[0]
  // }


  HistoryPopUp(data) {

    this.HistoryStatus = true;
    this.UpdateStatus = false;
    this.blocked = true;
    this.ReconciliationServiec.getOrderToOrderReconcilationHistories(data.OrderId, data.ModeofPayment).subscribe(res => {
      this.blocked = false;
      this.historyList = res;
      console.log(res, "Historylist");
    })
  }

  mopStatus(paymentmode) {
    this.mop = paymentmode.code;
  }

  load(event) {
    this.onSearch(event)
  }

  ForSearchHit() {
    this.record = true;
    this.first = 0;
    this.TotalRecords = 0;
  }
  IsOrderIdCheck:boolean=false
  onSearch(event) {
debugger

    if(this.keyword != undefined && this.keyword != "" && this.keyword != 'undefined'){
      this.IsOrderIdCheck = true
    }
    if ((this.SelectedCity == undefined || this.SelectedCity.length == 0) && this.record == true) {
      alert("Please Select City");
      return false;
    }
    else if ((this.SelectedWarehouse == null || this.SelectedWarehouse == undefined || this.SelectedWarehouse.length == 0) && this.record == true) {
      alert("Please Select Warehouse")
    } else if ((this.rangeDates == undefined) && this.record == true && this.IsOrderIdCheck == false) {
      alert("Select RangeDate")
      return
    }
    else {
      if ((this.rangeDates != undefined) && this.record == true) {
        this.startDate = this.datepipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
        this.endtDate = this.datepipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
        if (this.rangeDates[1] == undefined && this.IsOrderIdCheck == false) {
          alert("select date range first")
          return
        }
      }
    }
    this.WarId = [];
    if ((this.SelectedWarehouse.length > 0 || this.SelectedWarehouse != undefined) ) {
      this.SelectedWarehouse.forEach((element) => {
        this.WarId.push(element.value);
      })
      if (this.record == true) {
        const payload = {
          "WarehouseIds": this.WarId,
          "FromDate": this.startDate,
          "ToDate": this.endtDate,
          "ReconStatus": this.SelectedRecon != undefined ? this.SelectedRecon.code : this.SelectedRecon,
          "MOP": this.mop != undefined ? this.mop : undefined,
          "keyword": this.keyword != undefined ? this.keyword : undefined,
          "skip": event.first ? event.first : 0,
          "take": event.rows ? event.rows : 10
        }
        this.blocked = true;
        this.ReconciliationServiec.getOrderToOrderReconcillationList(payload).subscribe(res => {
          if (res.length > 0) {
            this.ReconciliationList = res;
            this.blocked = false;
            this.TotalRecords = res[0].TotalCount
          }
          else {
            this.blocked = false;
            alert("No data found")
            this.ReconciliationList=[];
            this.TotalRecords=0;

       
          }
        })
      }
    }
  }


  // onUploadCheque(file: File[]) {
  //   this.file = file;
  //   var reader = new FileReader();
  //   this.filepath = file;
  //   reader.readAsDataURL(file[0]);
  //   reader.onload = (_event) => {
  //   }
  // }

  // UploadRTGSNEFTChequeCash() {

  //   if (this.file == undefined) {
  //     alert("Please upload File");
  //   }
  //   let formData = new FormData();
  //   formData.append('file', this.file[0])
  //   this.blocked = true;
  //   this.ReconciliationServiec.Uploader(formData).subscribe((result: any) => {

  //     this.file = [];
  //     if (result == 'File Uploaded Successfully') {
  //       alert(result);
  //       this.blocked = false;
  //       window.location.reload();
  //     } else {
  //       alert(result);
  //       this.blocked = false;
  //       window.location.reload();
  //     }

  //   })
  // }

  // UploadHDFC() {
  //   if (this.file == undefined) {
  //     alert("Please upload File");
  //   }
  //   let formData = new FormData();
  //   formData.append('file', this.file[0])
  //   this.blocked = true;
  //   this.ReconciliationServiec.uploadHDFCFile(formData).subscribe((result: any) => {
      
  //     if (result=="File Saved Sucessfully") {
  //       alert(result)
  //       this.blocked = false;
  //       this.file = [];
  //       window.location.reload();

  //     } else {
  //       this.blocked = false;
  //       this.file = [];
  //       alert(result)
  //       window.location.reload();

  //     }

  //   })
  // }


  // uploadUpiFile() {
  //   if (this.file == undefined) {
  //     alert("Please upload File");
  //   }
  //   let formData = new FormData();
  //   formData.append('file', this.file[0])
  //   this.blocked = true;
  //   this.ReconciliationServiec.UploaderUpi(formData).subscribe((result: any) => {
      
  //     if (result=="File Saved Sucessfully") {
        
  //       alert(result)
  //       this.blocked = false;
  //       this.file = [];
  //      window.location.reload();

  //     } else {
  //       alert(result)
  //       this.blocked = false;
  //       this.file = [];
  //       window.location.reload();
  //     }
  //   })
  // }

  Update(data) {
    this.statusupdate = data.Reconstatus
    if (this.statusupdate == 'Partially Verified') {
      this.dropdownopen = true;
    } else {
      this.dropdownopen = false
    }
    this.id = data.Id
    this.Skcode = data.Skcode;
    this.OrderId = data.OrderId
    this.InvoiceAmount = data.InvoiceAmount;
    this.AmountReceived = data.AmountReceived;
    this.UpdateStatus = true;
    this.HistoryStatus = false;
    this.datadialog = data;
  }

  onSubmit(selectedStatus, selectedComments) {
    this.comments = selectedComments != undefined ? selectedComments : undefined;
    if (selectedStatus == null && selectedStatus == undefined) {
      alert("Please Select Status")
      return false;
    }
    this.blocked = true;
    this.ReconciliationServiec.UpdateOrderReconcilationIdWise(this.id, this.comments, selectedStatus.code).subscribe(res => {
      if (res.Status == true) {
        this.blocked = false;
        alert(res.Message);
        this.onSearch(event)
        this.UpdateStatus = false;
      }
      else {
        alert(res.Message);
        this.blocked = false;
        this.UpdateStatus = false;
      }
    })
  }
  Cancel() {
    this.selectedComments = null;
    this.selectedStatus = null
    this.UpdateStatus = false
  }
  // UploadGullak() {

  // }

  // UploadHDFCDirect() {

  // }

  exportdata(){
 
    if ((this.SelectedCity == undefined || this.SelectedCity.length == 0) ) {
      alert("Please Select City");
      return false;
    }
    else if ((this.SelectedWarehouse == null || this.SelectedWarehouse == undefined || this.SelectedWarehouse.length == 0) ) {
      alert("Please Select Warehouse")
      return false;
    }
    this.WarId = [];
    if ((this.SelectedWarehouse.length > 0 || this.SelectedWarehouse != undefined) ) {
      this.isexport=true;
      this.SelectedWarehouse.forEach((element) => {
        this.WarId.push(element.value);
      })
      if (this.isexport == true) {
        const payload = {
          "WarehouseIds": this.WarId,
          "FromDate": this.startDate?this.startDate:null,
          "ToDate": this.endtDate?this.endtDate:null,
          "ReconStatus": this.SelectedRecon != undefined ? this.SelectedRecon.code : this.SelectedRecon,
          "MOP": this.mop != undefined ? this.mop : undefined,
          "keyword": this.keyword != undefined ? this.keyword : undefined
        }
        this.blocked = true;
        this.ReconciliationServiec.ExportOrderToOrderReconcillationList(payload).subscribe(res => {
          if (res.length > 0) {
            this.blocked = false;
          this.expoerService.exportAsExcelFile(res, 'ExportReconcillationOrderFile');
          }
          else {
            this.blocked = false;
            alert("No data found")
          }
        })
      }
    }

  }

}

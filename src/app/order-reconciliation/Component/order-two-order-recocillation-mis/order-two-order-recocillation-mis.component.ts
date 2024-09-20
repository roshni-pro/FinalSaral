import { Component, OnInit } from '@angular/core';
import { OrderReconciliationServiceService } from 'app/order-reconciliation/Service/order-reconciliation-service.service';
import { PaymentmodechangeComponent } from 'app/paymentreconcile/Component/paymentreconcile/changePaymentMode/paymentmodechange/paymentmodechange.component';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order-two-order-recocillation-mis',
  templateUrl: './order-two-order-recocillation-mis.component.html',
  styleUrls: ['./order-two-order-recocillation-mis.component.scss']
})
export class OrderTwoOrderRecocillationMisComponent implements OnInit {
  blocked: boolean = false
  mop: any;
  MOP: any;
  Reason: any;
  rangeDates: any;
  FromDate: any;
  ToDate: any;
  keyword: any;
  SelectedReason: any;
  skip: number;
  take: number;
  MisList: any;
  totalcount: any;
  file: File[];
  filepath: File[];
  files: any;
  first: number = 0;
  paymentmode: any;
  record: boolean = false;
  constructor(private OrderReconciliationService: OrderReconciliationServiceService,
    private exportService: ExportServiceService, private ReconciliationServiec: OrderReconciliationServiceService,) { }

  ngOnInit() {
    this.MOP = [
      { name: "All", code: "All" },
      { name: "HDFC(CC,DC,UPI,NetBanking)", code: "hdfc" },
      { name: "UPI", code: "UPI" },
    ];
    this.Reason = [
      { name: "All", code: "All" },
      { name: "Verified", code: "Verified" },
      { name: "Not Verified", code: "Not Verified" },
    ];
  }
  mopStatus(paymentmode) {
    this.mop = paymentmode.code;
  }
  getDates() {
    this.FromDate = moment(this.rangeDates[0]).format('YYYY-MM-DD');
    this.ToDate = moment(this.rangeDates[1]).format('YYYY-MM-DD');
  }
  ForSearchHit() {
    this.record = true;
    this.first = 0;
    this.totalcount = 0;
  }
  loadData(event) {
    this.onSave(event)
  }

  onSave(event) {
    if ((this.paymentmode == undefined || this.paymentmode.length == 0)&& this.record == true) {
      alert("Please Select ModeOfPayment");
      return false;
    }
    else if ((this.SelectedReason == undefined || this.SelectedReason.length == 0)&& this.record == true) {
      alert("Please Select Recon Status");
      return false;
    }
    if (this.rangeDates != null || this.rangeDates != undefined) {
      if (this.rangeDates.length > 0) {
        this.getDates()
      }
      if ((this.FromDate && (!this.ToDate || this.ToDate == "Invalid date")) || ((!this.FromDate || this.FromDate == "Invalid date") && this.ToDate)) {
        alert("Select both date! ");
        return false
      }
    }

    if (event) {
      this.skip = event.first ? event.first : 0;
      this.take = event.rows ? event.rows : 10;
    }
    if (this.SelectedReason != undefined &&this.paymentmode != undefined  && this.SelectedReason != undefined ) {
      if(this.record==true)
      {

        const payload = {
          "mop": this.paymentmode.code,
          "Status": this.SelectedReason.code,
          "Keyword": this.keyword,
          "IsExport": false,
          "Skip": this.skip,
          "Take": this.take,
          "Fromdate": this.FromDate,
          "Todate": this.ToDate
        }
        this.blocked = true;
        this.keyword = this.keyword != undefined ? this.keyword : null
        this.OrderReconciliationService.GetMisDetail(payload).subscribe(x => {
          if (x.Status == true) {
            this.MisList = x.Data;
            this.blocked = false;
            console.log(this.MisList, "ReasonList");
            this.totalcount = x.Data[0].TotalCount;
          }
          else {
            alert("No data found")
            this.MisList = [];
            this.blocked = false;
          }
        });
      }
    }
  }
  onexport() {
    if (this.paymentmode == undefined || this.paymentmode.length == 0) {
      alert("Please Select ModeOfPayment");
      return false;
    }
    else if (this.SelectedReason == undefined || this.SelectedReason.length == 0) {
      alert("Please Select Recon Status");
      return false;
    }
    if (this.rangeDates != null || this.rangeDates != undefined) {
      if (this.rangeDates.length > 0) {
        this.getDates()
      }
      if ((this.FromDate && (!this.ToDate || this.ToDate == "Invalid date")) || ((!this.FromDate || this.FromDate == "Invalid date") && this.ToDate)) {
        alert("Select both date! ");
        return false
      }
    }
    if (this.SelectedReason != undefined &&this.paymentmode != undefined  && this.SelectedReason != undefined ) {
      if(this.record==true)
      {
      const payload = {
        "mop": this.paymentmode.code,
        "Status": this.SelectedReason.code,
        "Keyword": null,
        "IsExport": true,
        "Skip": 0,
        "Take": 0,
        "Fromdate": this.FromDate,
        "Todate": this.ToDate
      }
      this.blocked = true;
      this.OrderReconciliationService.GetMisDetail(payload).subscribe(x => {
        if (x.Status == true) {
          this.blocked = false;
          this.exportService.exportAsExcelFile(x.Data, 'OrderReconcillationBankData');
        }
        else {

          alert("No data found")
          this.blocked = false;
        }
      });
    }
    }
  }
  UploadHDFC() {
    if (this.file == undefined) {
      alert("Please upload File");
    }
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.blocked = true;
    this.ReconciliationServiec.uploadHDFCFile(formData).subscribe((result: any) => {
      if (result == "File Saved Sucessfully") {
        alert(result)
        this.blocked = false;
        this.file = [];
        window.location.reload();

      } else {
        this.blocked = false;
        this.file = [];
        alert(result)
        window.location.reload();

      }

    })
  }
  uploadUpiFile() {
    if (this.file == undefined) {
      alert("Please upload File");
    }
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.blocked = true;
    this.ReconciliationServiec.UploaderUpi(formData).subscribe((result: any) => {
      if (result == "File Saved Sucessfully") {

        alert(result)
        this.blocked = false;
        this.file = [];
        window.location.reload();

      } else {
        alert(result)
        this.blocked = false;
        this.file = [];
        window.location.reload();
      }
    })
  }
  onUploadCheque(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
    }
  }
  uploadFile(file) {
    this.files = file.files[0]
  }
}

import { Component, OnInit } from '@angular/core';
import { OrderReconciliationServiceService } from 'app/order-reconciliation/Service/order-reconciliation-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order-two-order-reconciliation-statement-details',
  templateUrl: './order-two-order-reconciliation-statement-details.component.html',
  styleUrls: ['./order-two-order-reconciliation-statement-details.component.scss']
})
export class OrderTwoOrderReconciliationStatementDetailsComponent implements OnInit {
  ReasonList: any[];
  UpdateStatuss: any;
  Reason: any[];
  BankType: any[];
  UpdateStatus: boolean = false;
  skip: number
  take: number
  SelectedReason: any;
  totalcount: any;
  first: number = 0;
  id: any
  SelectedReson: any;
  SelectedBankType: any;
  SelectedComment: any;
  comment: any;
  blocked: boolean = false;
  // TransactionDate:any;
  keyword:any
  rangeDates: any
  FromDate: string = null
  ToDate: string = null
  constructor(private OrderReconciliationService: OrderReconciliationServiceService
    ,private ReconciliationServiec: OrderReconciliationServiceService,private exportService:ExportServiceService) { }

  ngOnInit() {
    this.Reason = [
      { name: "All", code: "All" },
      { name: "Verified", code: "Verified" },
      { name: "Not Verified", code: "Not Verified" },

    ];
    this.BankType=[
      {name:"All",code:"All"},
      {name:"C",code:"C"},
      {name:"D",code:"D"}
    ]
    this.UpdateStatuss = [
      { name: "Payment From Supplier", code: "Payment From Supplier" },
      { name: "Payment From Vender", code: "Payment From Vender" },
      { name: "Payment From Direct Udhar", code: "Payment From Direct Udhar" },
      { name: "Payment From Gullak", code: "Payment From Gullak" },
      { name: "Direct Udhaar", code: "DirectUdhaar" },
      { name: "TOT Amount", code: "TOT Amount" },
      { name: "Internal", code: "Internal" },
      { name: "Security Deposit", code: "Security Deposit" },
      { name: "Other (With Comment)", code: "Other" },
    ];
    this.SelectedReason = this.Reason[0];
    this.SelectedBankType = this.BankType[0];
  }


  UpdateDialog(rowData) {
    this.id = rowData.Id
    this.UpdateStatus = true;
  }
  changestatus: boolean = false


  onSubmit(SelectedComment, SelectedReson) {
    console.log(this.SelectedComment)
    this.comment = SelectedComment != undefined ? SelectedComment : undefined
    if (SelectedReson == null || SelectedReson == undefined) {
      alert("Please Select Reason")
      return false;
    }
    if (this.SelectedReson.code == "Other") {
      if (this.SelectedComment == undefined || this.SelectedComment == "") {
        alert("Please Enter Comment");
        return false
      }

    }
    this.blocked = true;
    this.OrderReconciliationService.updateBankResonId(this.id, SelectedReson.code, this.comment).subscribe((res: any) => {
      if (res.Status == true) {
        alert(res.Message)
        this.onSave(event, this.SelectedReason)
        this.blocked = false;
        this.UpdateStatus = false;
      }
      else {
        alert(res.Message)
        this.blocked = false;
        this.UpdateStatus = false;
      }
    })
  }

  loadData(event) {
    this.onSave(event, this.SelectedReason)
  }

  onSave(event, SelectedReason) {
    debugger
    console.log(this.SelectedBankType)
    if (this.rangeDates != null || this.rangeDates != undefined) {
      if (this.rangeDates.length > 0) {
        this.getDates()
      }
      if((this.FromDate && (!this.ToDate || this.ToDate=="Invalid date")) || ((!this.FromDate || this.FromDate =="Invalid date") && this.ToDate) ){
        alert("Select both date! ");
        return false
      }
    }
    if (SelectedReason.code == "Not Verified" || SelectedReason.code == "All") {
      this.changestatus = true;
    } else {
      this.changestatus = false;
    }
    if (event) {
      this.skip = event.first ? event.first : 0;
      this.take = event.rows ? event.rows : 10;
    }
    if (this.SelectedReason != undefined) {
      debugger
      const payload={
        "Status":this.SelectedReason.code,
        "Keyword":this.keyword,
        "isExport":false,
        "Skip":this.skip,
        "Take":this.take,
        "Fromdate":this.FromDate,
        "Todate":this.ToDate,
        "Type":this.SelectedBankType.code
      }
      this.blocked = true;
      // this.TransactionDate= this.TransactionDate ? moment(this.TransactionDate).format("YYYY-MM-DD "): null,
      this.keyword =  this.keyword != undefined ? this.keyword : null
      this.OrderReconciliationService.getBankStatementFileDetails(payload).subscribe(x => {
        if (x.Status == true) {
          this.blocked = false;
          this.ReasonList = x.Data;
          this.totalcount = x.Data[0].TotalCount;
          console.log(this.ReasonList, "ReasonList");
          // this.TransactionDate=null;
        }
        else {
          this.ReasonList=[];
          this.totalcount=0;
          this.first=0;
          alert("No data found")
          this.blocked = false;
          // this.TransactionDate=null;
        }
      });
    }
  }

  CancelUpdate() {
    this.UpdateStatus = false;
    this.SelectedReson = [];
    this.SelectedComment = [];
  }

  onexport(SelectedReason){
    if (this.rangeDates != null || this.rangeDates != undefined) {
      if (this.rangeDates.length > 0) {
        this.getDates()
      }
      if((this.FromDate && (!this.ToDate || this.ToDate=="Invalid date")) || ((!this.FromDate || this.FromDate =="Invalid date") && this.ToDate) ){
        alert("Select both date! ");
        return false
      }
    }
    if (SelectedReason.code == "Not Verified" || SelectedReason.code == "All") {
      this.changestatus = true;
    } else {
      this.changestatus = false;
    }
    if (this.SelectedReason != undefined) {
      const payload={
        "Status":this.SelectedReason.code,
        "Keyword":null,
        "isExport":true,
        "Skip":0,
        "Take":0,
        "Fromdate":this.FromDate,
        "Todate":this.ToDate,
        "Type":this.SelectedBankType.code
      }
      this.blocked = true;
      // this.TransactionDate= this.TransactionDate ? moment(this.TransactionDate).format("YYYY-MM-DD "): null,
      this.OrderReconciliationService.getBankStatementFileDetails(payload).subscribe(x => {
        if (x.Status == true) {
          this.blocked = false;
          // this.TransactionDate=null;
          this.exportService.exportAsExcelFile(x.Data, 'OrderReconcillationBankData');
        }
        else {
          
          alert("No data found")
          // this.TransactionDate=null;
          this.blocked = false;
        }
      });
    }
  }
  file: File[];
  filepath: File[];
  onUploadCheque(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
    }
  }
  
  UploadRTGSNEFTChequeCash() {

    if (this.file == undefined) {
      alert("Please upload File");
    }
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.blocked = true;
    this.ReconciliationServiec.Uploader(formData).subscribe((result: any) => {

      this.file = [];
      if (result == 'File Uploaded Successfully') {
        alert(result);
        this.uploadPopUp=false;
        this.blocked = false;
        window.location.reload();
      } else {
        alert(result);
        this.uploadPopUp=false;
        this.blocked = false;
         window.location.reload();
      }

    })
  }
  uploadPopUp:boolean=false
uploaddata()
{
  this.uploadPopUp=true
}
  getDates() {
    this.FromDate = moment(this.rangeDates[0]).format('YYYY-MM-DD');
    this.ToDate = moment(this.rangeDates[1]).format('YYYY-MM-DD');
  }
  data =[]
  ExportData=[]
  showorderid:boolean = false
  getorderid(id){
    debugger
    this.blocked = true;
    this.ReconciliationServiec.Getorderidforverifiedbank(id).subscribe((result:any)=>{
      if(result.length >0 ){
        debugger
        if(result.length==1 && result==0){
          this.blocked=false;
          alert("No data found")
        }
        else{
          this.showorderid = true
          console.log(result)
          this.blocked=false;
          this.ExportData = result.map(function (elem) {
            return {
              'Orderid':elem
            }
          });
          //alert("Export Successfully")
          //this.exportService.exportAsExcelFile(ExportData,'Orderids');
          
        }
        
      }
      else{
        this.blocked=false;
        alert("No data found")
      }
    })
  }
  CancelOrderId(){
    this.showorderid = false
  }
}

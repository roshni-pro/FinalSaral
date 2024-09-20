import { SupplierService } from 'app/shared/services/supplier.service';
import { IrService } from 'app/shared/services/supplier/ir.service';
import { Component, OnInit } from '@angular/core';
import { IrPaymentSummaryPaginator } from 'app/shared/interface/supplier/ir-payment-summary-paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { IrpaymentsService } from 'app/pr-ir-payments/Services/irpayments.service';
import { IrOutstandingPaginator } from 'app/shared/interface/supplier/ir-outstanding-paginator';
import * as FileSaver from 'file-saver';
import { DateFormatorService } from 'app/shared/services/date-formator.service';
import { AgentCommissionPaymentService } from 'app/agent-commission-payment/services/agent-commission-payment.service';
import { count, log } from 'console';


@Component({
  selector: 'app-pr-payment-summary',
  templateUrl: './pr-payment-summary.component.html',
  styleUrls: ['./pr-payment-summary.component.scss']
})
export class PrPaymentSummaryComponent implements OnInit {

  paginator: IrPaymentSummaryPaginator;
  summary: any;
  list: any;
  totalCount: number;
  paymentDetailList = [];
  showDialog = false;
  detailStatusList = [];
  isWaiting = false;
  showDetails: boolean;
  invalidRefNo = false;
  showExportCriterion: false;
  StartDate: Date;
  EndDate: Date;
  noDates = false;
  exportShow = false;
  exportpaginator: IrOutstandingPaginator;
  exportList = [];
  refValidate: boolean = false;

  constructor(private irpaymentsService: IrpaymentsService, private router: Router, private r: ActivatedRoute,
    private irService: IrService, private supplierService: SupplierService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private dateFormatorService: DateFormatorService,private agentCommissionPaymentService: AgentCommissionPaymentService) { }

  ngOnInit() {
    this.initializePaginator();
    this.initializeDetailStatusList();
    this.initializeExportCriterion();

    
    


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

  getReport(summary) {

    this.irpaymentsService.supplierPaymentReport(summary.Id).subscribe(x => {

      if (x == null) {
        this.messageService.add({ severity: 'error', summary: 'No Record Found', detail: 'No Payment Record Found OR Payment is Rejected' });
      }
      else {
        window.open(environment.apiURL + x);
      }
    });
  }

  private getData() {
    this.irpaymentsService.prPaymentSummariesGet(this.paginator).subscribe(x => {

      this.summary = x;
      this.list = x.summaryList;
      this.totalCount = x.Count;
    });
  }

  private initializePaginator() {
    this.paginator = {
      EndDate: null,
      SkipCount: 0,
      StartDate: null,
      Take: 10
    };
  }

  private initializeExportCriterion() {
    this.exportpaginator = {
      WarehouseId: null,
      Search: null,
      EndDate: null,
      StartDate: null,
      SkipCount: null,
      Take: null,
    };
  }



  redirectiroutstanding() {
    this.router.navigate(["PR"], { relativeTo: this.r.parent });
  }

  onUpload(event, uploadCustom, summaryId) {
    console.log('summaryId is: ', summaryId);
    this.irpaymentsService.getBySummaryId(summaryId).subscribe(x => {

      this.paymentDetailList = x;
      console.log(this.paymentDetailList);
      if (this.paymentDetailList && this.paymentDetailList.length) {
        this.paymentDetailList.forEach(element => {
          element.PRList = JSON.parse(element.PRList);
        });

        console.log('uploadCustom: ', uploadCustom);
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        const file = event.files[0];
        try {
          console.log('event is: ', event);
          // uploadCustom.files = null;
          reader.readAsBinaryString(file);
        } catch (er) {

        }
        reader.onload = (event) => {
          const data = reader.result;
          workBook = XLSX.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          var dataFromExcel = jsonData;
          const dataString = JSON.stringify(jsonData);
          console.log(dataFromExcel)
          console.log(dataString);
          console.log('dataFromExcel.Sheet1: ', dataFromExcel.Sheet1);
          let excelData = dataFromExcel.Sheet1;

          if (excelData && excelData.length) {
            // this.selectbill = false;
            // this.disblebankinfo = false;
            // this.inputModel.paymentDate = null;
            // this.inputModel.amount = null;
            this.updatePaymentDetailList(excelData);

          } else {
            //this.messageService.add({ severity: 'error', summary: 'please add any data in your excel sheet!', detail: '' });
          }

        }


      }
      else {
        this.messageService.add({ severity: 'error', summary: 'No Record Found', detail: 'No Payment Record Found OR Payment is Rejected' });
      }
      console.log('list is: ', x);
      console.log('event is: ', event);
      uploadCustom.files = null;
      // reader.readAsBinaryString(file);
    });
    //this.filterPaymentList();

    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'File Uploaded',
    //   detail: ''
    // });
  }
  
  private updatePaymentDetailList(excelData) {
    debugger
    
    console.log(' this.paymentDetailList: ', this.paymentDetailList);
    // console.log(excelData[0].BankName)
    // let name = excelData[0].BankName;
    
    // console.log(name);
    // let count;
    if(excelData[0].BankName == undefined){
      alert("Bank in uploaded file is different from bank selected. Please select the correct bank to upload file ");
      return false;
    }
    if(this.paymentDetailList[0].BankName != excelData[0].BankName+" - "+excelData[0].BankName){
      alert("Bank in uploaded file is different from bank selected. Please select the correct bank to upload file ");
      return false;
    }
    // else{
    //    this.paymentDetailList.forEach(x=>{
    //     if(x.BankName == name+" - "+name){

    //     }
    //     else{
    //       count =1;
    //     }
    //    })
    // }
    // if(count==1){
    //   alert("Bank in uploaded file is different from bank selected. Please select the correct bank to upload file");
    //   return false;
    // }
    else{

    
    if (excelData && excelData.length && this.paymentDetailList && this.paymentDetailList.length) {
      

      this.paymentDetailList.forEach(x => {
        console.log("x",x);
        x.PaymentStatus = 'Rejected';
      });

      excelData.forEach(excelItem => {
        // console.log(excelItem.BankName+" - "+excelItem.BankName)
        let comparisionString = '';
        
        let tempDetail = this.paymentDetailList.filter(detailItem => {
          debugger
          if(excelItem.Particulars.trim().startsWith('FT')){
            if(detailItem.SupplierName=="ITC LIMITED" || detailItem.SupplierName=="DABUR INDIA LTD" ){
              
              comparisionString ="FT" ;//+ "- " + detailItem.Bank_Ifsc;
              // comparisionString += ("-  " +detailItem.SupplierCodes);
              // comparisionString += (" " + detailItem.WarehouseName);
              comparisionString +=("-" + detailItem.Bank_AC_No);
              comparisionString +=("-" + detailItem.SupplierName);
            }
            else{
              comparisionString ="FT " ;//+ "- " + detailItem.Bank_Ifsc;
              comparisionString += ("-  " +detailItem.SupplierCodes);
              comparisionString += (" " + detailItem.WarehouseName);
              comparisionString +=(" -  " + detailItem.Bank_AC_No);
              comparisionString +=(" - " + detailItem.SupplierName);
            }

            // comparisionString ="FT  " + "- " + detailItem.Bank_Ifsc;
            // comparisionString += (" - " +detailItem.SupplierCodes);
            // comparisionString += (" " + detailItem.WarehouseName);
            // comparisionString +=(" - " + detailItem.Bank_AC_No);
            // comparisionString +=(" - " + detailItem.SupplierName);

          } else if(excelItem.Particulars.trim().startsWith('NEFT')) {
            comparisionString ="NEFT  " + "- " + detailItem.Bank_Ifsc;
            comparisionString += (" - " +detailItem.SupplierCodes);
            comparisionString += (" " + detailItem.WarehouseName);
            comparisionString +=(" - " + detailItem.Bank_AC_No);
            comparisionString +=(" - " + detailItem.SupplierName);
  
          }                  
          return excelItem.Particulars == comparisionString//detailItem.SupplierCodes + " " + detailItem.WarehouseName
            && excelItem.Amount == Math.trunc(detailItem.PRList.PaidAmount)
            && detailItem.PaymentStatus != 'Approved' 
        });
        if (tempDetail && tempDetail.length) {

          tempDetail[0].PaymentDate
            = new Date(this.dateFormatorService.getMMdDDdYYYYFromDD_MM_YYYYString(excelItem['Date']));
          tempDetail[0].RefNo = excelItem['UTR Number'];
          tempDetail[0].PaymentStatus = 'Approved';
        } else {
          //tempDetail[0].PaymentStatus = 'Rejected';
        }
      });
      this.showDialog = true;
      console.log('this.paymentDetailList: ', this.paymentDetailList);
    }

  }
  }

  update() {
    debugger
    this.isWaiting = true;
    let invalidRefs = [];
    if (this.paymentDetailList && this.paymentDetailList.length) {
      this.paymentDetailList.forEach(item => {
        item.PrPaymentStatus = item.PaymentStatus;
        item.PRList = JSON.stringify(item.PRList);
        if (item.RefNo == '') {
          invalidRefs.push(1);
        }
        if (item.PaymentStatus == "Approved" && (item.RefNo == undefined || item.RefNo == '')) {
          this.refValidate = true;
          alert('Ref No is empty. please enter Ref No');
        }
      });

      if (this.refValidate) {
        return false;
      }
      if (invalidRefs && invalidRefs.length) {
        this.invalidRefNo = true
        this.isWaiting = false;
      }
      else {
        this.invalidRefNo = false;
      }

      if (true) {
        this.irpaymentsService.updateIRPayment(this.paymentDetailList).subscribe(x => {

          this.isWaiting = false;
          if (x) {
            this.showDialog = false;
            if (confirm("Payment Updated!")) {
              setTimeout(() => {
                this.showDialog = false;
                window.location.reload();
                this.router.navigate(["PrPaymentSummaryReload"], { relativeTo: this.r.parent });
              }, 1500);
            }
          } else {
            this.showDialog = false;
            this.isWaiting = false;
            if (confirm("issue in saving payment!")) {
              setTimeout(() => {
                this.showDialog = false;
                window.location.reload();
                this.router.navigate(["PrPaymentSummaryReload"], { relativeTo: this.r.parent });
              }, 1500);
            }
          }
        });
      }
    }
  }

  private initializeDetailStatusList() {
    this.detailStatusList = [
      // { label: 'Pending', val: 'Pending' },
      { label: 'Approved', val: 'Approved' },
      { label: 'Rejected', val: 'Rejected' }
    ]
  }
  summaryid:any;
  getBySummaryId(summaryId) {
    debugger
    this.summaryid=summaryId
    this.irpaymentsService.getAllBySummaryId(summaryId).subscribe(x => {
      this.paymentDetailList = x;
      this.paymentDetailList.forEach((x:any)=>{
        x.BankName=x.BankName.split(' - ')[0];
      });
      console.log(this.paymentDetailList);
      this.showDetails = true;
    });
  }

  getPurchaseRequestPaymentDetails() {

    if (!this.exportpaginator.StartDate || !this.exportpaginator.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'please select from and to date!', detail: '' });
    }
    else {
      if (this.exportpaginator.StartDate > this.exportpaginator.EndDate) {
        this.messageService.add({ severity: 'error', summary: 'Start Date should be less than end date!', detail: '' });
      }
      else {
        this.irpaymentsService.getPrPaymentsByDate(this.exportpaginator).subscribe(x => {

          this.exportList = x.PrList;
          if (x.PrList && x.PrList.length) {
            this.ExportToExcel();
          }
          else {
            this.exportShow = false;
            this.messageService.add({ severity: 'error', summary: 'No Details found for respective dates!', detail: '' });
          }
        });
      }
    }

  }

  ExportToExcel() {
    let exportList = [];
    this.exportList.forEach((appItem, index) => {
      if (true) {
        exportList.push({
          SupplierName: appItem.SupplierName,
          PurchaseOrderId: appItem.PurchaseOrderId,
          TotalAmount: appItem.TotalAmount,
          PaidAmount: appItem.PaidAmount,
          PaymentDate: appItem.PaymentDate,
          PrPaymentStatus: appItem.PrPaymentStatus,
          RefNo: appItem.RefNo
        }
        );
      }
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportList);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'Purchase Request Payment Details');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }

  rejectPayment(paymentDetail: any) {
    //this.paymentDetailList 
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.irpaymentsService.rejectPRPayment(paymentDetail.Id).subscribe(result => {
          if (result && result.IsSuccess) {
            this.messageService.add({ severity: 'success', summary: '', detail: 'Payment Rejected!!' });
            this.showDetails = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Not rejcected', detail: 'Payment not rejected!!' });
          }
        });

      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'You have cancelled the action!' });
      }
    });
    console.log('paymentDetail: ', paymentDetail);

  }

  getExcel(ir: any) {
    this.irpaymentsService.getSupplierPRPaymentExport(ir.Id).subscribe(x => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(x);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      this.saveAsExcelFile(excelBuffer, 'ExportDate');
    });

  }

  BankData:any={ID:0};
  BankDataBackup:any;
  bankList:any=[];

  
  

  onEditBank(d){
    // console.log(this.bankList)
    // console.log(this.BankDataBackup)
    debugger
    
    d.check=true;
    this.agentCommissionPaymentService.getByName("hdfc",7).subscribe((result:any)=>{
      // console.log(result)
      this.bankList = result;
      this.BankDataBackup = result;

      this.bankList.forEach((x:any)=>{
        x.Name = x.Name.split(' - ')[0];
      })
      console.log(this.bankList);
      this.BankData = this.BankDataBackup.filter(x=>x.ID == d.BankId)[0]
      this.BankDataBackup = this.bankList;
    });
    //this.bankList=this.BankDataBackup
  }
  onRowEditSave(d){
    debugger
    this.BankDataBackup=this.bankList
    console.log(this.bankList)
    console.log(this.BankDataBackup)
    // this.bankList=this.BankDataBackup
    console.log(d.Id);
    console.log("BankData.ID=",this.BankData.ID);
    
    //var name = this.BankDataBackup.filter(x=>x.ID == this.BankData.ID)[0].Name;
    //this.bankList=this.BankDataBackup
    this.BankDataBackup=this.bankList
  //  console.log(name)
  //  alert("Id="+d.Id+"BankId="+"this.BankData.ID ="+this.BankData.ID+"name="+name)
  // this.irService.updatebankname(d.Id,this.BankData.ID).subscribe(res=>{
  //   if(res=='Updated') this.getSummaryDetail(this.Sid)
  //   else alert(res);
  //   d.check = false;
  //  })
  // this.bankList = this.BankDataBackup
  this.irpaymentsService.updatebankname(d.Id,this.BankData.ID).subscribe(res=>{
    if(res=='Updated') this.getBySummaryId(this.summaryid)
    else alert(res)
    d.check=false
  })
  // alert("Id="+d.Id+"bankid="+this.BankData.ID+"name="+name)
  // d.check = false;
  }
  
  onRowClose(d){
    d.check=false;
  }
  

}

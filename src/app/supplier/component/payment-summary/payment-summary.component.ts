import { Component, OnInit } from '@angular/core';
import { IrPaymentSummaryPaginator } from 'app/shared/interface/supplier/ir-payment-summary-paginator';
import { IRPaymentSummariesDC } from 'app/shared/interface/supplier/irpayment-summaries-dc';
import { IrPaymentSummaryListDC } from 'app/shared/interface/supplier/ir-payment-summary-list-dc';
import { IrService } from 'app/shared/services/supplier/ir.service';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { SupplierService } from 'app/shared/services/supplier.service';
import { IrpaymentsService } from 'app/pr-ir-payments/Services/irpayments.service';
import * as FileSaver from 'file-saver';
import { DateFormatorService } from 'app/shared/services/date-formator.service';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {
  paginator: IrPaymentSummaryPaginator;
  summary: IrPaymentSummaryListDC;
  list: IRPaymentSummariesDC[];
  totalCount: number;
  paymentDetailList: any[];
  shownDetailList: any[];
  showDialog: boolean;
  detailStatusList: any[];
  isWaiting: boolean;
  summaryId: number;
  showDetailDialog: boolean;
  refvalidate: boolean = false;
  constructor(private irService: IrService, private dateFormatorService: DateFormatorService,
    private router: Router, private supplierService: SupplierService,
    private irpaymentsService: IrpaymentsService) { }

  ngOnInit() {
    this.summaryId = 0;
    this.showDetailDialog = false;
    this.isWaiting = false;
   
    this.initializeDetailStatusList();
    this.initializePaginator();
    this.showDialog = false;
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

  getReport(summary: IRPaymentSummariesDC) {
    this.irService.supplierPaymentReport(summary.Id).subscribe(x => {
      // console.log(x);
      // var content = 'file content for example';
      // var blob = new Blob([x], { type: 'text/plain' });
      // let url = (window.URL || window.webkitURL).createObjectURL(blob);

      // window.open(url);
      window.open(environment.apiURL + x);
    })
  }

  private getData() {
    this.irService.irPaymentSummariesGet(this.paginator).subscribe(x => {
      this.summary = x;
      this.list = x.IRPaymentSummaryList;
      this.totalCount = x.Count;
      console.log('this.list is: ', this.list);
    });
  }

  private initializePaginator() {
    this.paginator = {
      EndDate: null,
      SkipCount: 0,
      StartDate: null,
      Take: 5
    };
  }
  redirectiroutstanding() {
    this.router.navigateByUrl('layout/PR-IR-Payments/IR');

  }


  onUpload(event, uploadCustom, summaryId) {

    this.summaryId = summaryId;
    this.irService.getBySummaryId(summaryId).subscribe(x => {
      this.paymentDetailList = x;
      console.log(this.paymentDetailList);
      if (this.paymentDetailList && this.paymentDetailList.length > 0) {
        this.paymentDetailList.forEach(element => {
          element.IRList = JSON.parse(element.IRList);
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
        }
        catch{

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

          if (excelData.length > 0) {
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
      uploadCustom.files = null;
      console.log('list is: ', x);
    });


    //this.filterPaymentList();

    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'File Uploaded',
    //   detail: ''
    // });
  }

  update() {

    this.isWaiting = true;
    if (this.paymentDetailList && this.paymentDetailList.length > 0) {
      this.paymentDetailList.forEach(item => {
        item.IRList = JSON.stringify(item.IRList);
        if (item.PaymentStatus == "Approved" && (item.RefNo == undefined || item.RefNo == '')) {
          alert('Ref No is empty. please enter Ref No');
          this.refvalidate = true;
        }
      });

      if (this.refvalidate) {
        
        return false;
      }
      this.supplierService.updateIRPayment(this.paymentDetailList).subscribe(x => {

        this.isWaiting = false;
        if (x) {
          //this.list = null;

          this.list.filter(x => { return x.Id == this.summaryId })[0].IsIROutstandingPending = false;
          this.showDialog = false;
          alert('payment updated successfully');
        } else {
          alert('issue to update payment');
        }
      });
      
    }
  }
  bankList: any[];
  Sid:any;
  getSummaryDetail(summaryId) {
    this.Sid=summaryId
    this.showDetailDialog = false;
    this.irService.getBySummaryId(summaryId).subscribe(x => {
      console.log('list is ', x);
      this.shownDetailList = x;
      this.supplierService.GetBank().subscribe((result:any) => {
        this.bankList = result;
      });
      console.log("banklist",this.bankList)
      console.log(this.shownDetailList)
      this.showDetailDialog = true;
      if (this.shownDetailList && this.shownDetailList.length > 0) {
        this.shownDetailList.forEach(x => {
          x.IRList = JSON.stringify(x.IRList);
        });
      }
    })
  }


  //--
  BankData:any;
  BankDataBackup:any;
  onEditBank(d)
  {
    d.check=true;
    console.log(d);

    this.supplierService.GetBank().subscribe((result:any) => {
      this.bankList = result;
      this.BankDataBackup = result;
      console.log("banklist",this.bankList)
    });
    // debugger
    // const array=this.bankList.filter(x=>x.ID == d.BankId)
    // this.BankData.add(array);
    //  console.log("banklist",this.BankData)
    this.BankData = this.bankList.filter(x=>x.ID == d.BankId)[0]
    // console.log(this.BankData)
    
    

  }
  onRowEditSave(d){
    debugger
    this.bankList=this.BankDataBackup
    console.log(d.Id);
    console.log("BankData.ID=",this.BankData.ID);
    
  //  var name = this.bankList.filter(x=>x.ID == this.BankData.ID)[0].Name;
  //  console.log(name)
  //  alert("Id="+d.Id+"BankId="+"this.BankData.ID ="+this.BankData.ID+"name="+name)
  this.irService.updatebankname(d.Id,this.BankData.ID).subscribe(res=>{
    if(res=='Updated') this.getSummaryDetail(this.Sid)
    
    else alert(res);
    d.check = false;
   })

  }
  
  onRowClose(d){
    d.check=false;
  }
  //--

  
  private  updatePaymentDetailList(excelData) {
    console.log(excelData)
    debugger
    // let name = excelData[0].BankName;
    // console.log(name);
    // console.log(this.paymentDetailList[0].BankName)
    // let count;
    if(excelData[0].BankName == undefined){
      alert("Bank in uploaded file is different from bank selected. Please select the correct bank to upload file ");
      return false;
    }
    // else{
    //    this.paymentDetailList.forEach(x=>{
    //     if(x.BankName == name){

    //     }
    //     else{
    //       count =1;   
    //     }
    //    })
    // }
    // if(count==1){
    //   alert("Bank in uploaded file is different from bank selected. Please select the correct bank to upload file ");
    //   return false;
    // }
    if(excelData[0].BankName != this.paymentDetailList[0].BankName){
      alert("Bank in uploaded file is different from bank selected. Please select the correct bank to upload file ");
      return false;
    }
    else{
      
      
    
    if (excelData && excelData.length > 0 && this.paymentDetailList && this.paymentDetailList.length > 0) {
      this.paymentDetailList.forEach(x => {
        x.PaymentStatus = 'Rejected';
      });
      excelData.forEach(excelItem=>{
        console.log(excelItem)
      })
      excelData.forEach(excelItem => {
        debugger
        console.log(excelItem);
        let tempDetail = this.paymentDetailList.filter( detailItem => {
          let comparisionString = '';
          if (detailItem) {
            // debugger;
            if(excelItem.Particulars.trim().startsWith('FT')){
              debugger
              //|| detailItem.SupplierName=='DABUR INDIA LTD' remove by jairaj sir on 6/6
              if(detailItem.SupplierName=='ITC LIMITED' ){
               
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
          }
          if (comparisionString.length > 20) {
            debugger
            comparisionString = comparisionString.substring(0, 100);
          }
          if (excelItem && excelItem.Particulars) {
            return excelItem.Particulars.trim() == comparisionString
              && excelItem.Amount ==  Math.trunc(detailItem.IRList.PaidAmount); //TotalAmount;
          }
          else {
            return null;
          }
        });
        if (tempDetail && tempDetail.length > 0) {

          tempDetail[0].PaymentDate
            = new Date(this.dateFormatorService.getMMdDDdYYYYFromDD_MM_YYYYString(excelItem['Date']));
          tempDetail[0].RefNo = excelItem['UTR Number'];
          tempDetail[0].PaymentStatus = 'Approved';
        } else {
          //tempDetail[0].PaymentStatus = 'Rejected';
        }
        this.showDialog = true;
      });
      console.log('this.paymentDetailList: ', this.paymentDetailList);
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

  getExcel(ir: any) {
    this.irpaymentsService.getSupplierIRPaymentExport(ir.Id).subscribe(x => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(x);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      this.saveAsExcelFile(excelBuffer, 'ExportDate');
    });

  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstReportService } from 'app/shared/services/gst-report.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-credit-note-details',
  templateUrl: './credit-note-details.component.html',
  styleUrls: ['./credit-note-details.component.scss']
})
export class CreditNoteDetailsComponent {
//   cols: any;
//   TotalTaxAmount=0;
//   Exit : boolean;
//     Exits  : boolean;
//     searchModel: any;
//     preport: any[];
//     isDetails: boolean;
  
//     loading: boolean;
//     totalRecords: number;
//    // pager: PagerDataV7;
//     pageSize: number;
//     selectedRow : any;
   
//     selectedRowDetails: any;
//     inputModel : any
//     searchKey:string;
//     isSearch :any;
//     isMissingDetails : any;
//     exportData:any
//     isResultFalse:boolean;
    
//     blocked: boolean;
//     constructor(private gstReportService : GstReportService, private exportService : ExportServiceService  , private router : Router, private modalService: NgbModal, private messageService: MessageService,
//       ) {this.inputModel = {}; this.searchModel = {};}
     

//   ngOnInit() {
    
//     this.Exit = true;
//     this.Exits = false;


//   }


//   load(event) {
//     
//     // this.loading = true;
//     var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
//     var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    
//     }
    
//     searchCredit(searchModel) {
//     
//     var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
//     var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    
//     this.gstReportService.GetCreditDetails(FromDate, ToDate).subscribe(res =>{
//       
//     console.log(this.searchModel.FromDate);
//     console.log(res)
//     this.preport = res;
//     console.log("this.preport",this.preport);
//     for(var i=0; i < this.preport.length; i++)
//     { 
//       this.TotalTaxAmount=this.TotalTaxAmount+this.preport[i].TaxAmount;
//     }
//     })
//     }
    
//     export() {
//       this.exportService.exportAsExcelFile(this.preport, 'preport');
//     }
//   goToAddItem(){
//     this.router.navigateByUrl("/layout/report/gstreport");
   
//  }
//  B2csReport(){
//   this.router.navigateByUrl("/layout/report/b2-cs");
  
// }
 
// CreditReport(){
// this.router.navigateByUrl("/layout/report/credit-note-details");

// }
// ExemptReport(){
// this.router.navigateByUrl("/layout/report/exempt-details");

// }
// HsnReport(){
// this.router.navigateByUrl("/layout/report/hsn-summary");

// }
// DocumentReport(){
// this.router.navigateByUrl("/layout/report/document-issued");

// }

}

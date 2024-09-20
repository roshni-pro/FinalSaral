import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstReportService } from 'app/shared/services/gst-report.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-hsn-summary',
  templateUrl: './hsn-summary.component.html',
  styleUrls: ['./hsn-summary.component.scss']
})
export class HsnSummaryComponent {



//   searchModel: any;
//   preport: any[];
//   isDetails: boolean;
//   cols: any;
//   Exit:boolean;
//   Exits:boolean;
//   show:boolean;
 
//   customerList:any[];
//   closeResult: string;
//   isopen : boolean
 
 
//   loading: boolean;
//   totalRecords: number;
//  // pager: PagerDataV7;
//   pageSize: number;
//   selectedRow : any;
 
//   selectedRowDetails: any;
//   inputModel : any
//   searchKey:string;
 
 
//   isSearch :any;
//   isMissingDetails : any;
//   exportData:any
//   isResultFalse:boolean;
//   gstnorecorddata:any[];
//   blocked: boolean;
 

//   constructor(private gstReportService : GstReportService, private exportService : ExportServiceService  , private router : Router, private modalService: NgbModal, private messageService: MessageService,
//     ) {this.inputModel = {}; this.searchModel = {};}
   

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
    
//     search(searchModel) {
//     
//     var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
//     var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    
//     this.gstReportService.GetHSNSUmmary(FromDate, ToDate).subscribe(res =>{
//       
//     console.log(this.searchModel.FromDate);
//     console.log(res)
//     this.preport = res;
//     console.log("this.preport",this.preport);
   
    
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { GstReportService } from 'app/shared/services/gst-report.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-document-issued',
  templateUrl: './document-issued.component.html',
  styleUrls: ['./document-issued.component.scss']
})
export class DocumentIssuedComponent {
//   cols: any;
//   Exit : boolean;
//     Exits  : boolean;
//     searchModel: any;
//     Document: any[];
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
    
//     searchB2B(searchModel) {
//     
//     var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
//     var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    
//     this.gstReportService.GetDocument(FromDate, ToDate).subscribe(res =>{
//       
//     console.log(this.searchModel.FromDate);
//     console.log(res)
//     this.Document = res;
//     console.log("this.Document",this.Document);
    
    
//     })
//     } 

//     export() {
//       this.exportService.exportAsExcelFile(this.Document, 'Document');
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

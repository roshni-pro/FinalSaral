import { Component, OnInit } from '@angular/core';
import { IncidentreportingService } from 'app/incident-reporting/services/incidentreporting.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-incident-report-list',
  templateUrl: './incident-report-list.component.html',
  styleUrls: ['./incident-report-list.component.scss']
})
export class IncidentReportListComponent implements OnInit {
IncidentReportList : any;
blocked : boolean = false;
term : any;
Id: any;  
selectedRowDetails : any;
selectedRow : any;
isDetails : boolean = false;
IncidentReportmasterList : any;
exportData : any[];
commentPopup : boolean = false;
CommentDetail : any;
Comment : any;

  constructor(private incidentreportingService : IncidentreportingService,  private router : Router,
    private messageService : MessageService,private confirmationService: ConfirmationService,
    private exportService : ExportServiceService) { }

  ngOnInit() {
    this.blocked = true;
    this.incidentreportingService.getIncidentReportOpenList().subscribe(x=>
      {
        
        this.blocked = false;
        this.IncidentReportList = x;
        this.exportData = x;
        this.IncidentReportmasterList = x;
      });
  }
  OrderIdfilter(term)
  {
    
    this.blocked = true;
    if (term.length) {
    this.IncidentReportList = this.IncidentReportList.filter(x => x.ReportedByName.toString().toLowerCase().includes(term.toLowerCase()) || 
    x.PersonName.toString().toLowerCase().includes(term.toLowerCase()) ||  x.Status.toString().toLowerCase().includes(term.toLowerCase()) ||
    x.TypeOfLoss.toString().toLowerCase().includes(term.toLowerCase()) ||  x.CaseNo == term);
    this.exportData = this.IncidentReportList;
      // this.IncidentReportList = this.IncidentReportList.filter(x => x.CaseNo == term);
      this.blocked= false;
      if (this.IncidentReportList.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'No Record Found!', detail: '' });
      }
    }
    if(term.length == 0)
    {
      this.incidentreportingService.getIncidentReportOpenList().subscribe(x=>
        {
          
          this.exportData = x;
          this.blocked = false;
          this.IncidentReportList = x;
        }); 
    }

  }
  ActiveInactive(rowdata) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.CommentDetail = rowdata;
        this.commentPopup = true;
        
      },
      reject: () => {
        rowdata.IsActive = !rowdata.IsActive;
        this.messageService.add({ severity: 'error', summary: 'Your Request for Closing the Case is Canceled!', detail: '' });
      }
    });
  }
  closedList()
  {
    this.router.navigateByUrl("layout/incidentreporting/incidentReportclosedList");
  }
  openDescription(d,e)
  {
    this.selectedRowDetails  = d;
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }
  refresh()
  {
    window.location.reload();
  }
  exportreport()
  {
    this.exportService.exportAsExcelFile(this.exportData, 'exportIncidentReportOpenList');
  }
  save(CommentDetail,Comment)
  {
    
   if(Comment == "" || Comment == undefined)
   {
    alert('Please Fill the text in Comment Box');
   }
   else
   {
    this.blocked = true;
    this.Id = CommentDetail.CaseNo;
    this.incidentreportingService.closingstatus(CommentDetail.CaseNo, CommentDetail.IsActive, Comment).subscribe(result => {
      this.blocked = false;
      if (result) {                            
        this.messageService.add({ severity: 'success', summary: 'Your Request for Closing Case is done Successfully!', detail: '' });         
        this.commentPopup = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
        this.commentPopup = false;
      }
    });
   }
  }
  closedCommentPopup(CommentDetail)
  {
    CommentDetail.IsActive = !CommentDetail.IsActive;
    this.commentPopup = false;
    this.messageService.add({ severity: 'error', summary: 'Your Request for Closing the Case is Canceled!', detail: '' });
  }
}

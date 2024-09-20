import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadPageData } from 'app/sk-buisness-lead/interface/lead-page-data';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import * as moment from "moment";
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-sk-buisness-lead',
  templateUrl: './sk-buisness-lead.component.html',
  styleUrls: ['./sk-buisness-lead.component.scss']
})
export class SkBuisnessLeadComponent implements OnInit {

  // rangeDates: Date[];
  // Start : Date;
  // End : Date;
  // Keyword : any;
  skip : number=0;
  Take : number=10;
  first: number = 0;
  isInvalid : boolean = false;
  buisnessData : any;
  leadPageData : LeadPageData;
  totalcount : number = 0; 
  blocked : boolean = false; 
  start : any;
  end : any;
  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,
    private router: Router,private messageService: MessageService,
    private exportService: ExportServiceService
  ) { this.buisnessData = {};}

  ngOnInit() {
    debugger;
    // this.buisnessData.rangeDates = [];
    let todayDate = moment(new Date()).format("DD/MM/YY");
    // this.buisnessData.rangeDates[0]=todayDate;
    // this.buisnessData.rangeDates[1]=todayDate;
    this.buisnessData.Keyword = '';
  }
  onClickDate()
  {
    this.buisnessData.rangeDates
    debugger;
  }
  onChangeKeyword()
  {

  }
  onSearch(buisnessForm)
  {
    debugger;
    if (buisnessForm.form.status == "VALID" && this.buisnessData.rangeDates != undefined &&  this.buisnessData.rangeDates[0] != null && this.buisnessData.rangeDates[1] != null) {
      debugger;
      this.skip = 0;
      this.Take = 10;
      this.blocked = true;
      this.start =  moment(this.buisnessData.rangeDates[0]).format("yyyy-MM-DD");
      this.end =  moment(this.buisnessData.rangeDates[1]).format("yyyy-MM-DD");
      this._skBuisnessLoanService.leadPageData(this.buisnessData.Keyword,this.start,this.end,this.skip,this.Take).subscribe(x=>
        {
          this.blocked = false;
          this.leadPageData = x;
          this.totalcount = x[0].TotalCount;
          console.log('pageData',this.leadPageData);
          debugger;
        })
    }else {
      if((this.buisnessData.rangeDates == undefined) || (this.buisnessData.rangeDates[0] == null && this.buisnessData.rangeDates[1] == null))
      {
        // alert('Please Select Start And End Date');
        this.messageService.add({ severity: 'error', summary: 'Please Select Start And End Date', detail: '' });
      }
      else if(this.buisnessData.rangeDates[0] == null)
      {
        // alert('Please Select Start Date');
        this.messageService.add({ severity: 'error', summary: 'Please Select Start Date', detail: '' });
      }
      else if(this.buisnessData.rangeDates[1] == null)
      {
        // alert('Please Select End Date');
        this.messageService.add({ severity: 'error', summary: 'Please Select End Date', detail: '' });
      }
      this.isInvalid = true;
    }
  }
  load(event){
    debugger;
    // var Last=  event.first ? event.first + event.rows : 20;
    this.skip=event.first ? event.first : 0;
    this.Take= event.rows ? event.rows : 10;
    debugger;
    this.blocked = true;
    var start =  moment(this.buisnessData.rangeDates[0]).format("yyyy-MM-DD");
    var end =  moment(this.buisnessData.rangeDates[1]).format("yyyy-MM-DD");
    this._skBuisnessLoanService.leadPageData(this.buisnessData.Keyword,start,end,this.skip,this.Take).subscribe(x=>
      {
        this.blocked = false;
        this.leadPageData = x;
        this.totalcount = x[0].TotalCount;
        console.log('pageData',this.leadPageData);
      })
  }
  isOpenSequence : boolean = false;
  rowData : any;
  onClickRowData(ir)
  {
    window.open('/#/'+this.router.url +'/sequence/' + ir.Id);
    // debugger;
    // this.rowData = ir;
    // this.isOpenSequence = true;
  }
  onCloseSequence()
  {
    this.isOpenSequence = false;
  }
  onExport(buisnessForm)
  {
    debugger;
    if (buisnessForm.form.status == "VALID" && this.buisnessData.rangeDates != undefined &&  this.buisnessData.rangeDates[0] != null && this.buisnessData.rangeDates[1] != null) {
    var start =  moment(this.buisnessData.rangeDates[0]).format("yyyy-MM-DD");
    var end =  moment(this.buisnessData.rangeDates[1]).format("yyyy-MM-DD");
      this.blocked=false;
     this._skBuisnessLoanService.ExportSkBuissness(this.buisnessData.Keyword,start,end).subscribe((res:any)=>
    {
      console.log(res,"res")
      this.blocked=false;
      if(res.length>0)
        {
          this.exportService.exportAsExcelFile(res,"BuisnessLeadExport")
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'No Data Found', detail: '' });
          return false;
        }
      
    })
  }
else
{
  if((this.buisnessData.rangeDates == undefined) || (this.buisnessData.rangeDates[0] == null && this.buisnessData.rangeDates[1] == null))
    {
      // alert('Please Select Start And End Date');
      this.messageService.add({ severity: 'error', summary: 'Please Select Start And End Date', detail: '' });
    }
    else if(this.buisnessData.rangeDates[0] == null)
    {
      // alert('Please Select Start Date');
      this.messageService.add({ severity: 'error', summary: 'Please Select Start Date', detail: '' });
    }
    else if(this.buisnessData.rangeDates[1] == null)
    {
      // alert('Please Select End Date');
      this.messageService.add({ severity: 'error', summary: 'Please Select End Date', detail: '' });
    }
    this.isInvalid = true;
  }
}
}

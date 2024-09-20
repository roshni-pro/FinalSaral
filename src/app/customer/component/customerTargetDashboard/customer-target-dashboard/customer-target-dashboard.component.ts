import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-customer-target-dashboard',
  templateUrl: './customer-target-dashboard.component.html',
  styleUrls: ['./customer-target-dashboard.component.scss']
})
export class CustomerTargetDashboardComponent implements OnInit {
FinalData:any;
defaultMonth: number;
defaultYear: number;
blocked:boolean;
data1:any;
Final:any;
CurrentVolume:any;
Target:any;
item:any;
defaultMonth1:number;
TargetBandsData:any;
years: any[];
defaultYear1:number;
yearss:any[];
TargetCustomerData:any;
  constructor( private customer: CustomerService, private exportService: ExportServiceService,private messageService: MessageService) {this.FinalData={};this.Final={};this.data1={};}

  ngOnInit() {
    this.CurrentVolume=0;
    this.Target=0;
    this.item=[];
    this.blocked = false;
    var date = new Date().getDate();
    var Month = (new Date().getMonth()) + 1;
    this.defaultMonth = Month;
    this.FinalData.Month = this.defaultMonth;
    /////////////////////////////////////////
    var Month1 = (new Date().getMonth()) + 1;
    this.defaultMonth1 = Month1;
    this.Final.Month1 = this.defaultMonth1;
    ////////////////////////////////////////////
    var year = (new Date().getFullYear());
    this.defaultYear = year;
    this.FinalData.Year = this.defaultYear;
    var range = [];
    for (var i = -1; i < 3; i++) {
      range.push(year + i);
    }
    this.years = range;
    ////////////////////////////////
    var year1 = (new Date().getFullYear());
    this.defaultYear1 = year1;
    this.Final.Year1 = this.defaultYear1;
    var ranges = [];
    for (var i = -1; i < 3; i++) {
      ranges.push(year + i);
    }
    this.yearss = ranges;
  }

reset(item){
  this.data1=[];
  this.item=[];
  this.CurrentVolume=[];
  this.Target=[];

}
Search(Data) {
  this.blocked = true;
  this.customer.customertargetdetails(Data.Month1, Data.Year1).subscribe(result => {
    this.blocked = false;
    if(result.Status ==true){
      this.TargetCustomerData = result.GetCustomerTarget;
    this.exportService.exportAsExcelFile(this.TargetCustomerData, 'TargetCustomerData');
    this.messageService.add({ severity: 'success', summary: 'Customer Target Data List', detail: '' });
  }else if(result.Status ==false){
    this.messageService.add({ severity: 'error', summary: 'Customer Target Not Found', detail: '' });

  }
    
  })
}
searchbrand(datas){
this.blocked = true;
  this.customer.banddetails(datas.Month, datas.Year).subscribe(result => {
    this.blocked = false;
    if(result.Status ==true){
      this.TargetBandsData = result.GetLevelBands;
    this.exportService.exportAsExcelFile(this.TargetBandsData, 'TargetBandsData');
    this.messageService.add({ severity: 'success', summary: 'Bands Data List', detail: '' });
    }else if(result =="no record found"){
      this.messageService.add({ severity: 'error', summary: 'No Record Found', detail: '' });

    }
    
  })
}
datasearch(Search){
  this.blocked = true;
this.customer.Searchtarge(Search.SkCode).subscribe(result=>{
  this.blocked = false;
  if(result){
  this.CurrentVolume=result[0].CurrentVolume;
  this.Target=result[0].Target;
  this.messageService.add({ severity: 'success', summary: 'Search Successfull', detail: '' });
  }else{
    this.messageService.add({ severity: 'error', summary: 'No Record Found', detail: '' });
  }
})
}

}

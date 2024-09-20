import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TownhallService } from 'app/shared/services/townhall.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-crm-report',
  templateUrl: './crm-report.component.html',
  styleUrls: ['./crm-report.component.scss']
})
export class CrmReportComponent implements OnInit {
  FinalData: any;
  defaultMonth: number;
  defaultYear: number;
  year: number;
  years: any[];
  month: number;
  CRMlevelDataList: any[];
  CRMlevelChartData: any[] = [];
  CRMlevel: Array<any> = [];
  AllCustomer: any;
  allcutomerdata: any;
  ActiveCustomer: any;
  CRMCustomerData: any;
  todayOrderCount: any;
  blocked: boolean;
  exportdata:any;
  showpopup: boolean;
  getdatamonth:any;
  exportadta:any;
  constructor(private townhallservice: TownhallService,
     private customer: CustomerService,
      private exportService: ExportServiceService) { this.FinalData = {}; this.years = []; }

  ngOnInit() {
    this.getdatamonth=[];
    this.showpopup=false;
    this.CRMCustomerData=[];
    this.blocked = true;
    var date = new Date().getDate();
    var Month = (new Date().getMonth()) + 1;
    this.defaultMonth = Month;
    this.FinalData.Month = this.defaultMonth;
    var year = (new Date().getFullYear());
    this.defaultYear = year;
    this.FinalData.Year = this.defaultYear;
    var range = [];
    for (var i = -1; i < 3; i++) {
      range.push(year + i);
    }
    this.years = range;
    
    this.customer.allCustomer().subscribe(result => {
      this.allcutomerdata = result.TotalCustomer;
      this.ActiveCustomer = result.TotalActiveCustomer;
      this.todayOrderCount = result.TotalActiveCustomerByOrder;
    })
    this.blocked = true;
    this.townhallservice.GetTownHalldataYear(this.defaultYear).subscribe(result => {
      this.blocked = true;
      this.townhallservice.SetMonthName(result);
      this.CRMlevelDataList = result;
      console.log('CRMlevelDataList is :', this.CRMlevelDataList);
      this.CRMlevelChartData = [
        { data: [], label: 'CRMlevel 0' },
        { data: [], label: 'CRMlevel 1' },
        { data: [], label: 'CRMlevel 2' },
        { data: [], label: 'CRMlevel 3' },
        { data: [], label: 'CRMlevel 4' },
        { data: [], label: 'CRMlevel 5' },
      ];
      this.CRMlevel = [];

      // this.CRMlevelChartOptions = this.townHallHelperService.getDefaultChartOptions('CRM level Plots', 'Count', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
      for (var i in this.CRMlevelDataList) {
        this.CRMlevelChartData[0].data.push(this.CRMlevelDataList[i].L0Count);
        this.CRMlevelChartData[1].data.push(this.CRMlevelDataList[i].L1Count);
        this.CRMlevelChartData[2].data.push(this.CRMlevelDataList[i].L2Count);
        this.CRMlevelChartData[3].data.push(this.CRMlevelDataList[i].L3Count);
        this.CRMlevelChartData[4].data.push(this.CRMlevelDataList[i].L4Count);
        this.CRMlevelChartData[5].data.push(this.CRMlevelDataList[i].L5Count);
        this.CRMlevel.push(this.CRMlevelDataList[i].MonthName);
      }
      this.blocked = false;
    });
  }
  Search(FinalData) {
    this.blocked = true;
    this.customer.cRMReportData(FinalData.Year).subscribe(result => {
      this.blocked = false;
      if(result.length==0){
        this.CRMlevelDataList=[];
      }else{
        this.CRMlevelDataList = result;
      }
   //   this.exportService.exportAsExcelFile(this.CRMCustomerData, 'CRMCustomerData');
    })
  }
  export(CRMlevelDataList){
    this.blocked = true;
    this.customer.exportDate(CRMlevelDataList.Month,CRMlevelDataList.Year).subscribe(result=>{
      this.blocked = false;
      this.exportdata=result;
      this.exportService.exportAsExcelFile(this.exportdata, 'CRMCustomerData'+CRMlevelDataList.Month+CRMlevelDataList.Year);
    })
  }
  dataget(){
    this.showpopup=true;
    this.blocked = true;
    this.customer.getdatamonths(this.FinalData.Month,this.FinalData.Year).subscribe(x=>{
      
      this.getdatamonth=x;
      // this.exportadta=x.CRMCustomerLevelDc;
       this.blocked = false;
    })
 }
 exports(exportadta){
   
   this.blocked = true;
   this.customer.exportDate(exportadta.Month,exportadta.Year).subscribe(result=>{
     let exportdata=result;
    this.exportService.exportAsExcelFile(exportdata, 'CRMCustomerData'+exportadta.Month+exportadta.Year);
    this.blocked = false;
   });

 }
}

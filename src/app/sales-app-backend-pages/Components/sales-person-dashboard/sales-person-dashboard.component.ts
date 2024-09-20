import { Component, OnInit } from '@angular/core';
import {SalesAppServiceService} from '../../Services/sales-app-service.service'
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common'
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-sales-person-dashboard',
  templateUrl: './sales-person-dashboard.component.html',
  styleUrls: ['./sales-person-dashboard.component.scss']
})
export class SalesPersonDashboardComponent implements OnInit {
  CityList:any
  CityObj:any
  WarehouseList:any
  WareHouse:any
  StoreList:any
  Store:any
  month:any
  blocked=false;
  months:any=[{month:'January', code:1},
  {month:'February', code:2},
  {month:'March', code:3},
  {month:'April', code:4},
  {month:'May', code:5},
  {month:'June', code:6},
  {month:'July', code:7},
  {month:'August', code:8},
  {month:'September', code:9},
  {month:'October', code:10},
  {month:'November', code:11},
  {month:'December', code:12}]
  // frozenCols: any[];
  scrollableCols: any[]=[];

  constructor(private salesServices:SalesAppServiceService,private msg:MessageService,public datepipe: DatePipe,
    private exportService:ExportServiceService) { }

  ngOnInit() {
    this.getWarehouseCity();
    this.getStoreList();
  
  }

  getWarehouseCity() { this.salesServices.GetWarehouseCity().subscribe(result => this.CityList = result); }

  getStoreList() { this.salesServices.GetStoreList().subscribe(result=>this.StoreList=result) }
  
  onsearch(cityid){
    this.salesServices.GetCity(cityid).subscribe(result => this.WarehouseList=result);
    this.WareHouse='';
    this.Store='';
    this.month='';
  }

  onsearchWareHouseId(WareHouseId){
    console.log(WareHouseId);
    this.Store='';
    this.month='';
  }
 
  onStoreSearch(StoreId){
    console.log(StoreId);
    this.month='';
  }

  onMonthSearch(month){
    console.log(month);
  }

  MetricList:any[];
  onSearchButton(){
    if(!this.CityObj){  this.showError("Choose City Name First")}
    else if(!this.WareHouse||!this.Store) this.showError("Select warehouse and store first")
    else if(!this.month) this.showError("Select Month first")
    else{
      var date = new Date(); 
      var newDate = new Date(date.setMonth(this.month.code-1));
      let latest_date =this.datepipe.transform(newDate, 'yyyy-MM-dd');
      this.MatricsData(this.WareHouse.WareHouseId,this.Store.Id,latest_date);
    }
  }

  show:boolean=false;
  clusterName:any[]=[]
  salespersonName:any[]=[]
  cols: any[];
  MatricsData(WareHouseId,StoreId,CurrentMontDate){
    debugger
    this.blocked = true;

    this.cols = [
      { field: 'WarehouseName', header: 'WarehouseName' },
      { field: 'Store', header: 'Store' },
      // { field: 'Year', header: 'Year' },
      { field: 'date', header: 'Date' },
      { field: 'SalesKpi', header: 'SalesKpi' },
      { field: 'Cluster', header: 'Cluster' },
      { field: 'Channel', header: 'Channel' },
      { field: 'Salesperson', header: 'Salesperson' },
      { field: 'IncentiveAmount', header: 'IncentiveAmount' },
      { field: 'Target', header: 'Target' }
      
  ];
    this.salesServices.GetTargetData(WareHouseId,StoreId,CurrentMontDate,this.Skip,this.Take).subscribe(res=>{
      this.MetricList=[];
      this.scrollableCols=[];
      res.forEach(e=>{
        e.date=e.Month+'/'+e.Year
      })
      console.log(res);
      this.MetricList = res;
      console.log(this.MetricList);
      
      // var IsDataEmpty = 0;
      // res.forEach(element => { 
      //   if(element.length==0) IsDataEmpty=IsDataEmpty+1; 
      //   // element.forEach(el => {           
      //     let obj={
      //       ClusterName : element.Cluster,
      //       ExecutiveName : element.Salesperson
      //     }   

      //     if(!this.scrollableCols.find(c => c.ClusterName == element.Cluster) || !this.scrollableCols.find(c => c.ExecutiveName == element.Salesperson)) 
      //     {
      //       this.scrollableCols.push(obj);
      //     }
          this.show=true;
          this.blocked = false;
      //   // });
      // });
      // if(IsDataEmpty==res.length){
      //   this.showError("Data Not Found"); 
      //   this.blocked=false;
      // }


    },(err: any) => {
      this.showError(err); 
      this.blocked = false;
    })
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary:'Error', detail:msg1});
  }

  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary:'Success', detail:msg1});
  }

  date2:any
  display1:boolean;
  MonthlyTargetBtn(){
    this.display1=true;
    this.date2='';
    this.showUpload=false;
  }

  downloadMonthFile(){
    if(!this.date2) this.showError("Select Month to Download ")
    else{
      var date3 = new Date();
      date3.setMonth(this.date2.getMonth())
      var payload ={
        warehouseid:0,
        storeid: 0,
        StartDate: this.datepipe.transform(this.date2, 'yyyy-MM-dd'),
        EndDate: this.datepipe.transform(date3.setDate(30), 'yyyy-MM-dd'),
        IsMonth: true
      }
      console.log(payload);
      this.DownloadeMonthTargetFile(payload);
    }
  }
  DownloadSample(){ 
    this.salesServices.DownloadSamplefile().subscribe(res=>{
      this.exportService.exportAsExcelFile(res.Data,"sample KPI File");
    })
  }
  DownloadeMonthTargetFile(payload){
    this.blocked = true;
    this.salesServices.DownloadeMonthTargetFile(payload).subscribe(res=>{    
      console.log("RESULT",res);
      // (res.length==0) ? this.showError("Data not found") : this.exportService.exportAsExcelFile(res,(payload.IsMonth==true)?"Monthly-Target-Report":"Daily-Target-Report");
      if(res.length==0){ 
        this.showError("Data not found")
        this.blocked = false; }
      else{ 
        this.exportService.exportAsExcelFile(res,(payload.IsMonth==true)?"Monthly-Target-Report":"Daily-Target-Report");
        this.blocked = false;}
    },(err: any) => {this.blocked = false; this.showError(err.message); 
    })
  }

  showUpload:boolean=false;
  onmonthChange(selectedMonth){
    // console.log(selectedMonth.getMonth()+1);
    console.log(new Date().getMonth()+1)   
    if(selectedMonth.getMonth()+1<new Date().getMonth()+1) this.showUpload=false;
    else this.showUpload=true;
  }

  onUploadMonthTarget(event) {
    if(!this.date2){ this.showError("Select Month first");}
    else{
      const files = event.files[0];
      let file = new FormData();
      file.append("file", files)
      let fromDate =this.datepipe.transform(this.date2, 'yyyy-MM-dd');
      var date3 = new Date();
      date3.setMonth(this.date2.getMonth())
      let todate =this.datepipe.transform(date3.setDate(30), 'yyyy-MM-dd');
      var IsMonth =true;
      this.UploadMonthTarget(fromDate,IsMonth,todate,file);
      this.display1= false;
    }
  }

  UploadMonthTarget(fromDate,IsMonth,todate,file){
    debugger
    this.blocked = true;
    this.salesServices.UploadMonthTarget(fromDate,IsMonth,todate,file).subscribe(res => { 
      console.log("RESULT",res); 
      this.blocked = false;
      var r=res.Message;
      // (IsMonth==true)? this.showSuccess("Uploaded monthlyTarget data Successfully") : this.showSuccess("Uploaded dailyTarget data Successfully")
      alert(res);
    },(err: any) => {
      this.blocked = false;
      console.log(err); this.showError(err.error.Message)})
  }

  display:boolean;
  date1:any
  DailyTargetBtn(){
    this.display=true;
    this.date1=''
    this.showDailyUpload=false;
  }

  showDailyUpload:boolean=false;
  ondailyDateChange(selectedDate){ 
    if(selectedDate.getDate()<new Date().getDate()) this.showDailyUpload=false;
    else this.showDailyUpload=true;
  }

  downloadDailyTargetFile(){
    if(!this.date1) this.showError("Select Date to Download File");
    else{
      var payload ={
        warehouseid:this.WareHouse.WareHouseId,
        storeid:this.Store.Id,
        StartDate:this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
        EndDate:this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
        IsMonth:false
      }
      console.log(payload);
      this.DownloadeMonthTargetFile(payload);
    }
  }
  

  onUploadDailyTargets(event){
    if(!this.date1) this.showError("Select Date first");
    else{
      const files = event.files[0];
      let file = new FormData();
      file.append("file", files)
      let fromDate =this.datepipe.transform(this.date1, 'yyyy-MM-dd');
      var IsMonth =false;
      this.UploadMonthTarget(fromDate,IsMonth,fromDate,file);
      this.display=false;
    }
  }



  Skip:any=0;
  Take:any=100;
  TotalRecord:any=0;
  load(event) {
    
    debugger
    console.log("--------------------------------------")
    console.log(event,"Event");
    // this.OnSearchInternalTransfer=true
    this.Skip = event?event.first:0;
    this.Take = event?event.rows:100;
   
    this.onSearchButton();
}

}

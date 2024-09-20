import { Component, OnInit } from '@angular/core';
import { CustomerClusterHolidaysService } from 'app/delivery-capacity-opti/Service/customer-cluster-holidays.service';
import { DeliveryCapacityOptimizationService } from 'app/delivery-capacity-opti/Service/delivery-capacity-optimization.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-holidays',
  templateUrl: './customer-holidays.component.html',
  styleUrls: ['./customer-holidays.component.scss']
})
export class CustomerHolidaysComponent implements OnInit {

  constructor(private service: DeliveryCapacityOptimizationService,private customerservice: CustomerService,
    private Holidayserv:CustomerClusterHolidaysService,private msg:MessageService) { }
  WareHouseList=[]
  clusterList=[]
  selectedCluster:any
  selectedWareHouse:any
  CustomerList=[]
  Weekends:any[]
  showHistoryData:boolean=false
  customerHistroyData:any[]=[]
  blocked:boolean=false
  Showupload:boolean=false
  first:number=0
  ngOnInit() {
    this.GetWarehouse();
    this.GetWeekend();
  }
  GetWeekend() {
    this.Weekends = [
      { name: 'Sunday', code: 'Sunday' }
      , { name: 'Monday', code: 'Monday' }
      , { name: 'Tuesday', code: 'Tuesday' }
      , { name: 'Wednesday', code: 'Wednesday' }
      , { name: 'Thursday', code: 'Thursday' }
      , { name: 'Friday', code: 'Friday' }
      , { name: 'Saturday', code: 'Saturday' }
    ];
    
  }

  holidayChangeEffect(ev,week){
    debugger; 
    week.forEach(element => { 
      this.SelectedWeekend=[];
      this.SelectedWeekend.push(element)
    });
  }

  GetWarehouse(){
    this.service.GetWareHouseNew().subscribe(WareRes => { 
      console.log(WareRes);
      this.WareHouseList = WareRes
    })
  }

  getCluster(WareIDD) {
    debugger;
    this.clusterList=[]
    this.customerservice.getClusterByCity(WareIDD.value).subscribe(result => {
      this.clusterList = result;
    })
  }

  skip:number;
  take:number
  totalRecords:number
  load(event) {
    this.take = event.rows;
    this.skip = event.first;  
    this.SearchClusmorHolidayData(false);
  }

  getHolidayCustomerList(cluster){
    debugger;
    this.skcodeObj=[]
    this.SkCodeList=[]
    this.CustomerList=[]
    const payload={
      "warehouseid":this.selectedWareHouse.value,
      "clusterid":cluster.ClusterId,
      "SkcodeList":[],
      "skip":0,
      "take":10
    }
    this.first=0;
    this.blocked=true
    this.Holidayserv.ClusterCustomersList(payload).subscribe(result => {
      if(result.CustomerHolidayList.length==0) { this.blocked=false; this.showError("Data Not Found"); }
      else{
        this.CustomerList = result.CustomerHolidayList;
        this.totalRecords=result.TotalRecords;
        this.Holidayserv.getCustomersList(this.selectedWareHouse.value,cluster.ClusterId,[]).subscribe((result1:any) => {
          result1.forEach(cl => {
            this.SkCodeList.push({'sk':cl.skCode})
          })
        })
        this.blocked=false
      }
    })
  }

  skcodeObj:any
  filteredSkCodes: any[];
  SkCodeList:any[]=[]
  skcodes:any[]=[];
  filterSkcode(event) {
    debugger;
    this.filteredSkCodes = [];
    let filtered: any[] = [];   
    let query = event.query.toUpperCase();
    filtered = this.SkCodeList.filter(skcodeObj=>skcodeObj.sk.toUpperCase().includes(query) 
    && this.skcodes.indexOf(skcodeObj.sk.toUpperCase()) < 0)
    this.filteredSkCodes = filtered;
  }

  checkSkCode(skcode){
    debugger;
    this.skcodes=[]
    skcode.forEach(el=>{-
      this.skcodes.push(el.sk)
    })
  }

  SearchClusmorHolidayData(value:any){
    debugger;
    if(value){ 
      if(this.selectedWareHouse==undefined){
        this.showError("select warehouse first");
        return;
      }
      else if(this.selectedCluster==undefined){
        this.showError("select cluster first");
        return;
      }
      else{this.skip=0; this.take=10; this.first=0; this.totalRecords=0}
    }
    const payload={
      "warehouseid":this.selectedWareHouse.value,
      "clusterid":this.selectedCluster.ClusterId,
      "SkcodeList":this.SkCodeList.length>0?this.skcodes:[],
      "skip":this.skip,
      "take":this.take
    }
    this.blocked=true
    this.Holidayserv.ClusterCustomersList(payload).subscribe(result =>{
      this.blocked=false
      if(result.CustomerHolidayList.length==0) this.showError("Data Not Found")
      else{
        this.CustomerList =  result.CustomerHolidayList;
        this.totalRecords=result.TotalRecords;
      }
    })
  }

  Clear(){
  this.SkCodeList=[]
  this.selectedCluster={}
  this.selectedWareHouse={}
  this.skcodeObj=undefined
  this.clusterList=[]
  this.filteredSkCodes=[]
  this.SkCodeList=[]
  this.skcodes=[];
  this.CustomerList=[];
  this.skip=0;
  this.take=10; this.first=0
  this.totalRecords=0;
  }

  skcode:any
  rowDataaa:any
  clustName:any
  EditCustomer(rowData)
  {
    debugger
    this.Showupload=true
    this.rowDataaa=rowData
    this.skcode=this.rowDataaa.skCode
    this.clustName=this.rowDataaa.clusterName
    this.SelectedWeekend= []; 
    var str_array = this.rowDataaa.holiday.split(',')
    str_array.forEach(element => {
      this.SelectedWeekend.push({ name: element, code: element })
    }) 
  }

  cancel() {
    this.SelectedWeekend= [];
  }
  SelectedWeekend:any[] = [];
  SWeek:any
  Update()
  {
    debugger;
    if(this.SelectedWeekend.length==0)
    {
      this.showError("Please select Holiday");
    }
    else{
    this.SWeek=[]
    this.SelectedWeekend.forEach(x=>
      {
        this.SWeek.push(x.code)
      })
    const payload=
    {
     //"Id":this.rowDataaa.id,
     "warehouseid":this.rowDataaa.warehouseid,
     "clusterId":this.rowDataaa.clusterId,
     "skCode":this.rowDataaa.skCode,
      "holiday":this.SelectedWeekend ? this.SWeek : 0
     //"year":(new Date()).getFullYear()
  }
  this.blocked=true
    this.Holidayserv.UpdateCustomerHoliday(payload).subscribe(x=>{
      console.log("qqqqqqqqqqqqqq",x)
      if(x.Status==true){
        this.showSuccess(x.Message)
        this.blocked=false
        this.SearchClusmorHolidayData(true);
      }
      else{
        this.showError(x.Message)
        this.blocked=false
      }
    })
    this.Showupload=false;
  }
  }
  UploadCustomer(){
    if(this.selectedWareHouse==undefined){
      this.showError("select warehouse first");
      return;
    }
    else if(this.selectedCluster==undefined){
      this.showError("select cluster first");
      return;
    }
    else {
      this.blocked=true
      this.Holidayserv.UploadCustomers(this.selectedWareHouse.value,this.selectedCluster.ClusterId).subscribe(x=>{
        if(x=="Record Uploaded Successfully!!"){
          this.showSuccess(x)
          this.blocked=false
        }
        else{
          this.showError(x.Message)
          this.blocked=false
        }
      })
    }
  }
  Close(){
    this.Showupload=false;
    this.SelectedWeekend=undefined
  }

  GetHistroyData()
  {
    if(this.selectedWareHouse==null || this.selectedWareHouse==undefined)
    {
      this.showError("Please Select Warehouse")
     return false
    }
    if(this.selectedCluster==null || this.selectedCluster==undefined)
    {
      this.showError("Please Select Cluster")
     return false
    }
    this.showHistoryData=true
    this.blocked=true;
    this.Holidayserv.CustomerHolidayHistroy(this.selectedCluster.ClusterId).subscribe((res:any)=>
      {
       console.log(res);
       this.first=0
       this.blocked=false
       this.customerHistroyData=res

      })
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

}

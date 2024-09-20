
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { CustomerClusterHolidaysService } from 'app/delivery-capacity-opti/Service/customer-cluster-holidays.service';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { InventoryapprovalService } from 'app/shared/services/inventoryapproval.service';
import { StoreService } from 'app/store/services/store.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales-performance-dashboard',
  templateUrl: './sales-performance-dashboard.component.html',
  styleUrls: ['./sales-performance-dashboard.component.scss']
})
export class SalesPerformanceDashboardComponent implements OnInit {

  constructor(
    private serv : ItemClassificationIncentiveReportService,
    private msg: MessageService,
    private SalesAppService: SalesAppServiceService,
    private StoreServicee: StoreService
    ) { }

  ThisMonth: any = ([] = []);
  warehouseList:any[]
  cityList:any[]=[]
  storeList:any[]=[]
  blocked:boolean=false;

  selectedCity:any[]=[]
  CityIDD:any[]=[]
  SelectedWarehouse:any[]=[]
  selectedStore:any[]=[]
  selectedMonth:any
  SeeCalen:boolean=false
  SelectedDate:any
  CID:any
  WID:any
  key :any
  SID:any
  LastDate:any
  FirstDate:any
  salesPerformanceDashbordListDCs:any
  SearchListView = [];
  TotalRecords:number=0
  first:number=0

  ngOnInit() {
    this.ThisMonth = [
      { name: "This Month", code: "ThisMonth" },
      { name: "Last Month", code: "LastMonth" },
      { name: "Today", code: "Today" },
      { name: "Yesterday", code: "Yesterday" },
      { name: "Custom", code: "Custom" }
    ];
    this.getCity();
    this.GetAllstore();
  }
  
  getCity(){
    this.serv.GetAllCityNew().subscribe(result => {
      this.cityList = result;
      this.selectedCity = this.cityList
      console.log("city",this.cityList);  
      this.selectedMonth = this.ThisMonth[0];
      this.getWarehouse(this.selectedCity);    
    })    
  }
 
  getWarehouse(Cityidlist){
    this.SelectedWarehouse=undefined
    this.warehouseList=[]
    this.CityIDD=[];
    Cityidlist.forEach(x=>{
      this.CityIDD.push(x.value)
    })
    this.serv.getWareHouseByCityV2(this.CityIDD).subscribe(x=>{ 
      console.log(x)
      this.warehouseList=x
      this.SelectedWarehouse=this.warehouseList
      this.searchHit(event);
    })
  }

  getWarehouseList(Cityidlist)
  {
    this.SelectedWarehouse=undefined
    this.warehouseList=[]
    this.CityIDD=[];
    Cityidlist.forEach(x=>{
      this.CityIDD.push(x.value)
    })
    this.serv.getWareHouseByCityV2(this.CityIDD).subscribe(x=>{ 
      console.log(x)
      this.warehouseList=x
      this.SelectedWarehouse=this.warehouseList
    })
  }

  GetAllstore() {
    this.StoreServicee.GetStoreList().subscribe((res) => {
      console.log(this.storeList)
      this.storeList = res;
      this.selectedStore= this.storeList
      
    })
  }

  ChangeMonth(e)
  {
    if(this.selectedMonth.code=="Custom")
    {
      this.SeeCalen=true
    }
    else{
      this.SeeCalen=false
      this.SelectedDate=undefined
    }
  }

  Difference_In_Days:any
  Month()
  {  
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    if(this.selectedMonth.code=='ThisMonth')
    {
      this.FirstDate = moment(new Date(y, m, 1)).format('L')
      this.LastDate = moment(new Date(y, m + 1, 0)).format('L')
      return false;
    }
    else if(this.selectedMonth.code=='LastMonth')
    {
      this.FirstDate = moment(new Date(y, m-1, 1)).format('L')
      this.LastDate = moment(new Date(y, m, 0)).format('L')
      return false;
    }
    else if(this.selectedMonth.code=='Today')
    {
      this.FirstDate = moment(date).format('L')
      this.LastDate = moment(date).format('L')
      return false;
    }
    else if(this.selectedMonth.code=='Yesterday')
    {
      this.FirstDate=  moment(new Date(y, m,date.getDate() - 1)).format('L')
      this.LastDate =  moment(new Date(y, m,date.getDate() - 1)).format('L')
      return false;
    }
    else if(this.selectedMonth.code=='Custom')
    {
      this.FirstDate = this.SelectedDate[0];
      this.LastDate=this.SelectedDate[1];
      
      if(this.LastDate==undefined) alert("Please Select Two Date");
      var Difference_In_Time=this.LastDate.getTime()-this.FirstDate.getTime()
      this.Difference_In_Days = Difference_In_Time / (1000 * 3600*24);
      
      this.FirstDate = moment(this.SelectedDate[0]).format('L');
      this.LastDate = moment(this.SelectedDate[1]).format('L');     
    }   
  }
 
  keysearch(event){
    // debugger;
    if(event.length>=2){
      //this.key=event
    const payloadd=
    {
      "CityIds":this.CID,
      "WarehouseIds":this.WID ? this.WID : [],
      "StoreIds":this.SID ? this.SID : [],
      "FirstDate": this.FirstDate ? this.FirstDate : null,
      "LastDate": this.LastDate ? this.LastDate : null,
      "Skip":  event && event.first ? event.first : 0,
      "Take":  event && event.rows ? event.rows : 10,
      // "IsExecutiveData":true,
      "KeyWord": this.key ? this.key : "",
      "WarehouseData":false
    }
    // debugger
    this.blocked=true;
    // this.SalesAppService.GetSalesPerformanceDashbord(payloadd).subscribe((res:any)=>
    this.SalesAppService.GetSalesPerformanceDashbord(payloadd).subscribe((res:any)=>
    {
      //if(res.Status==true){
      this.TotalRecords=0
      this.first=0
      console.log("res",res);
      this.salesPerformanceDashbordListDCs=res.Data.salesPerformanceDashbordListDCs
      this.TotalRecords=res.Data.TotalRecords
      this.blocked=false;
    })
    }
    else{
      const payloadd=
      {
        "CityIds":this.CID,
        "WarehouseIds":this.WID ? this.WID : [],
        "StoreIds":this.SID ? this.SID : [],
        "FirstDate": this.FirstDate ? this.FirstDate : null,
        "LastDate": this.LastDate ? this.LastDate : null,
        "Skip":  event && event.first ? event.first : 0,
        "Take":  event && event.rows ? event.rows : 10,
        // "IsExecutiveData":true,
        "KeyWord": this.key ? this.key : "",
        "WarehouseData":false
      }
      // debugger
      // this.blocked=true;
      this.SalesAppService.GetSalesPerformanceDashbord(payloadd).subscribe((res:any)=>
      {
        //if(res.Status==true){
        this.TotalRecords=0
        this.first=0
        console.log("res",res);
        this.salesPerformanceDashbordListDCs=res.Data.salesPerformanceDashbordListDCs
        this.TotalRecords=res.Data.TotalRecords
        // this.blocked=false;
      })
    }
  }

  searchHit(event)
  {
    // debugger;
    if (this.selectedCity == undefined || this.selectedCity.length==0) {
      this.showError("select City")
     }
    else if (this.SelectedWarehouse == undefined || this.SelectedWarehouse.length==0) {
     this.showError("select warehouse")
    }
    else if (this.selectedStore == undefined || this.selectedStore.length==0)
    {
      this.showError("select Store")
    }
    else if (this.selectedMonth == undefined || this.selectedMonth.length==0)
    {
      this.showError("select Month")
    }
    else if(this.selectedMonth!=undefined && this.selectedMonth.code=='Custom' && this.SelectedDate==undefined)
    {
      this.showError("Select Date Range")
    }
    this.Month();
    if(this.Difference_In_Days>31)
    {
      this.showError("Please Select Date Range Between One month ")
      return false;
    }

    if(this.selectedCity!=undefined && this.SelectedWarehouse != undefined && this.selectedStore!=undefined && this.selectedMonth!=undefined)
    {
      this.key=null
      this.CID=[]
      console.log(this.selectedCity,this.SelectedWarehouse,this.selectedStore)
      this.selectedCity.forEach(element => {
        this.CID.push(element.value)
      });
      this.WID=[]
      this.SelectedWarehouse.forEach(element => {
        this.WID.push(element.value)
      });
      this.SID=[]
      this.selectedStore.forEach(element => {
        this.SID.push(element.Id)
      });
      // debugger;
      const payload=
      {
        "CityIds":this.CID,
        "WarehouseIds":this.WID ? this.WID : [],
        "StoreIds":this.SID ? this.SID : [],
        "FirstDate": this.FirstDate ? this.FirstDate : null,
        "LastDate": this.LastDate ? this.LastDate : null,
        "Skip":  event && event.first ? event.first : 0,
        "Take":  event && event.rows ? event.rows : 10,
        // "IsExecutiveData":true,
        "KeyWord": "" ,
        "WarehouseData":true
      }
      this.blocked=true;
      this.SalesAppService.GetSalesPerformanceDashbord(payload).subscribe((res:any)=>
      {
        console.log("res",res);
        this.SearchListView=res.Data.WarehouseDataList
        this.salesPerformanceDashbordListDCs=res.Data.salesPerformanceDashbordListDCs
        this.TotalRecords=res.Data.TotalRecords
        this.blocked=false;
      })
      // ------------------------------------------------
      // const payloadd=
      // {
      //   "CityIds":this.CID,
      //   "WarehouseIds":this.WID ? this.WID : [],
      //   "StoreIds":this.SID ? this.SID : [],
      //   "FirstDate": this.FirstDate ? this.FirstDate : null,
      //   "LastDate": this.LastDate ? this.LastDate : null,
      //   "Skip":  event && event.first ? event.first : 0,
      //   "Take":  event && event.rows ? event.rows : 10,
      //   "IsExecutiveData":true,
      //   "KeyWord": "" ,
      //   // "WarehouseData":true
      // }
      // this.blocked=true;
      // // this.SalesAppService.GetSalesPerformanceDashbord(payloadd).subscribe((res:any)=>
      // this.SalesAppService.GetSalesPerformanceDashbord(payloadd).subscribe((res:any)=>
      // {
      //   if(res.Status==true){
      //   this.TotalRecords=0
      //   this.first=0
      //   console.log("res",res);
      //   this.salesPerformanceDashbordListDCs=res.Data.salesPerformanceDashbordListDCs
      //   this.TotalRecords=res.Data.TotalRecords
      //   this.blocked=false;
      //   }
      //   else{
      //     // alert("Please try again")
      //     this.showError(res.Message)
      //     this.blocked=false;
      //   }
      // })
    }
  }

 
  load(event)
  {
    debugger;
    console.log("event.globalFilter",event.globalFilter)
    if((this.salesPerformanceDashbordListDCs!=undefined || this.salesPerformanceDashbordListDCs.length!=0) && this.TotalRecords > 0){
    //  this.searchHit(event);
      const payloadd=
      {
        "CityIds":this.CID,
        "WarehouseIds":this.WID ? this.WID : [],
        "StoreIds":this.SID ? this.SID : [],
        "FirstDate": this.FirstDate ? this.FirstDate : null,
        "LastDate": this.LastDate ? this.LastDate : null,
        "Skip":  event && event.first ? event.first : 0,
        "Take":  event && event.rows ? event.rows : 10,
        // "IsExecutiveData":true,
        "KeyWord": this.key ? this.key : "",
        "WarehouseData":false
      }
      this.blocked=true;
      this.SalesAppService.GetSalesPerformanceDashbord(payloadd).subscribe((res:any)=>
      {
        if(res.Status==true){
        console.log("salesPerformanceDashbordListDCs",res);
        this.salesPerformanceDashbordListDCs=res.Data.salesPerformanceDashbordListDCs
        this.TotalRecords=res.Data.TotalRecords
        this.blocked=false;
        }
        else{
          this.blocked=false;
        }
      })
    }
  }
  emp()
  {
    this.salesPerformanceDashbordListDCs=undefined;
    this.TotalRecords=0;
    this.first=0;
  }

  showError(msg1: string) {
    this.msg.add({ severity: "error", summary: "Error", detail: msg1 });
  }
  showSuccess(msg1: string) {
    this.msg.add({ severity: "success", summary: "Success", detail: msg1 });
  }

}


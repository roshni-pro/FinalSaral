import { Component, OnInit } from '@angular/core';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { StoreService } from 'app/store/services/store.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-beat-dsr',
  templateUrl: './beat-dsr.component.html',
  styleUrls: ['./beat-dsr.component.scss']
})
export class BeatDSRComponent implements OnInit {

  Allwarehouse:any
  SelectedWarehouse:any
  selectedStore:any
  allStoreList:any
  SelectedFromDate:any
  SelectedToDate:any
  WareIDD:any[]
  StoreIdd:any[]=[];
  ChannelID:any[]=[]
  beatDSRData:any[]=[]
  scrhhit:boolean=false
  loadtoast:boolean=false
  date2:any
  date1:any
  Difference_In_Days:any
  FromDate:any
  ToDate:any
  skip:any
  take:any
  first: number = 0;
  totalcount:any
  beatDSRDataExport:any[]
  blocked:boolean=false
  ChannelMasterId:any
  constructor( private warehouseService: WarehouseService,public StoreService: StoreService,public SalesAppService:SalesAppServiceService,
    private msg:MessageService, private exportservice:ExportServiceService ,private customerservice:CustomerService) {   }

  ngOnInit() 
  {
    this.GetWarehouse(); 
    this.GetAllstore();
    this.CustomerChannelTypeList();
  }
  expostWHlist:any
  GetWarehouse()
  {
    this.warehouseService.GetWarehouseNew().subscribe(x=>
    {
     // debugger;
      this.Allwarehouse=x
      this.SelectedWarehouse=this.Allwarehouse
      console.log(this.Allwarehouse,"u");
      if(this.expostWHlist==undefined){
      this.expostWHlist=this.Allwarehouse}
    //  debugger
      //this.GetAllstore();
      this.CustomerChannelTypeList();
    })
  }
  GetAllstore()
  {
    this.StoreService.GetStoreList().subscribe((res) => {
      this.allStoreList = res;
      this.selectedStore=this.allStoreList
      this.loadSearch(null);
    })
  }
  loadSearch(event:any)
  {
   //  debugger;
    // if(this.beatDSRData==undefined)
    // {
    //   this.showError("Please search the data first");
    //   return false;
    // }
     if(this.SelectedWarehouse!=undefined && this.ChannelMasterId!=undefined && this.FromDate==undefined && this.ToDate==undefined)
    {
      //debugger;
      this.SelectedWarehouse=this.Allwarehouse
      this.selectedStore=this.allStoreList
      this.WareIDD=[]
      this.StoreIdd=[]   
      let ChannelID=[];
      this.SelectedWarehouse.forEach(element => {
        this.WareIDD.push(element.value)
        })
      // this.selectedStore.forEach(element => {
      //   this.StoreIdd.push(element.Id)
      //   })
      this.ChannelMasterId.forEach(ele => {
        ChannelID.push(ele.ChannelMasterId)
      });
      const payload=
      {
        "WarehouseId":this.WareIDD,
        "StoreId":[],
        "ChannelMasterId":ChannelID,
        "StartDate":this.FromDate? null : null,
        "EndDate":this.ToDate ? null : null,
        "skip":event && event.first ? event.first : 0,
        "take":event && event.rows ? event.rows : 20
      }
      this.blocked= true;
      console.log(payload);      
      debugger
      this.SalesAppService.beatDSR(payload).subscribe(x=>
      {
        console.log(x);
        // this.first1=0;
        this.beatDSRData=x.salesTodayDC
        this.totalcount=x.Totalcount
        this.blocked=false;
      })
    }
  }


  Search(event)
  {  
    this.scrhhit=true;
    // this.load/.(event);
   // debugger
    // if(this.beatDSRData==undefined)
    // {
    //   this.showError("Please search the data first");
    //   return false;
    // }
     if(this.SelectedWarehouse==undefined || this.SelectedWarehouse.length==0 )
    {
      this.showError("Please Select WareHouse");
      return false;
    }
    // else if(this.selectedStore==undefined || this.selectedStore.length==0)
    // {
    //   this.showError("Please Select Cluster");
    //   return false;
    // }
    else if(this.ChannelMasterId==undefined || this.ChannelMasterId.length==0)
    {
      this.showError("Please Select Channel");
      return false;
    }
    else if(this.SelectedFromDate==undefined || this.SelectedToDate==undefined)
    {
      this.showError("please select date range");
      return false;
    } 
    if(this.SelectedFromDate && this.SelectedToDate)
    {
      this.date1=this.SelectedFromDate;
      this.date2=this.SelectedToDate;
      // var Difference_In_Time = date2.getTime() - date1.getTime();
      if(this.date2==undefined) this.showError("Please Select Two Date")
      var Difference_In_Time=this.date2.getTime()-this.date1.getTime()
      this.Difference_In_Days = Difference_In_Time / (1000 * 3600*24);
    }
    if(this.Difference_In_Days>31)
    {
      this.showError("please select two dates between 31 days");
      return false;
    }
    if(this.Difference_In_Days<31)
    {
      if( this.SelectedFromDate != null && this.SelectedToDate!=null)
      {
        this.FromDate=moment(this.SelectedFromDate).format('MM/DD/YYYY');
        this.ToDate=moment(this.SelectedToDate).format('MM/DD/YYYY');
      }

      if (this.FromDate!=null && this.ToDate!=null && this.SelectedWarehouse!=undefined && this.FromDate!=undefined && this.FromDate!=undefined
      // && this.selectedStore!= null && this.selectedStore!= undefined
          && this.ChannelMasterId!=null && this.ChannelMasterId!=undefined )
      {
      //  debugger
        this.WareIDD=[]
        this.StoreIdd=[]  
        let ChannelID  =[];
        this.SelectedWarehouse.forEach(element => {
          this.WareIDD.push(element.value)
          })
        // this.selectedStore.forEach(element => {
        //   this.StoreIdd.push(element.Id)
        //   })
        this.ChannelMasterId.forEach(ele => {
          ChannelID.push(ele.ChannelMasterId)
        });
        const payload=
        {
          "WarehouseId":this.WareIDD,
          "StoreId":[],
          "ChannelMasterId":ChannelID,
          "StartDate":this.FromDate,
          "EndDate":this.ToDate,
          "skip":event && event.first ? event.first : 0,
          "take":event && event.rows ? event.rows : 20,
        }
        this.blocked=true;
        this.SalesAppService.beatDSR(payload).subscribe(x=>
        {
          console.log(x);
          this.blocked=false;
          // this.first1=0;
          if(x!=null){
            if(x.SalesDashboardTodayMTDData==null){
              if(x.salesTodayDC.length>0) {
                this.beatDSRData=x.salesTodayDC;
                 this.totalcount=x.Totalcount
                }
              else {this.showError("Data Not Found");  this.beatDSRData=undefined;}
            }
            else{
              if(x.SalesDashboardTodayMTDData.length>0) {
                this.beatDSRData=x.SalesDashboardTodayMTDData; 
                this.totalcount=x.Totalcount
              }
              else { this.showError("Data Not Found");  this.beatDSRData=undefined;}
            }
  
           // this.beatDSRData=x.SalesDashboardTodayMTDData==null?x.salesTodayDC:x.SalesDashboardTodayMTDData
 
          }

        })
      } 
    }
  }

  EDateClear()
  {
    this.SelectedToDate=undefined
  }
  Clear()
  {
    this.SelectedWarehouse=undefined
    this.selectedStore=undefined
    this.SelectedFromDate=undefined
    this.beatDSRData=undefined
    this.SelectedToDate=undefined
    this.beatDSRData=[]
    this.skip=0
    this.take=20
    this.totalcount=0
  }
  // first1:number
  TCExportt:number=0
  Export()
  {
   // debugger;
    var TodayDate = new Date()
    if(this.beatDSRData==undefined)
    {
      this.showError("Please search the data first")
      return false;
    }
    this.FromDate=moment(this.SelectedFromDate).format('MM/DD/YYYY');
    this.ToDate=moment(this.SelectedToDate).format('MM/DD/YYYY');
    let ChannelID=[];
    this.ChannelMasterId.forEach(ele => {
      ChannelID.push(ele.ChannelMasterId)
    });
    const payload=
    {
      "WarehouseId":this.WareIDD,
      "StoreId":[],
      "ChannelMasterId":ChannelID,
      "StartDate":this.FromDate ? this.FromDate : null,
      "EndDate":this.ToDate ? this.ToDate :null,
      "take":this.totalcount ? this.totalcount :20,
      "skip":this.skip?this.skip:0
    }
    this.blocked=true;
    this.SalesAppService.beatDSR(payload).subscribe(x=>
    {
      var SalesDashboardTodayMTDData
      SalesDashboardTodayMTDData=x.SalesDashboardTodayMTDData
      var exportData=[];
      if(SalesDashboardTodayMTDData!=null)
      {
        this.beatDSRDataExport=x.SalesDashboardTodayMTDData
        var index=1
        for (var i in this.beatDSRDataExport) {
          var selectedFields = {
            "Sr No":index,
            "StartDate" :  this.beatDSRDataExport[i].StartDate==undefined ? TodayDate : this.beatDSRDataExport[i].StartDate,
            "EndDate" :  this.beatDSRDataExport[i].EndDate ==undefined ? TodayDate : this.beatDSRDataExport[i].EndDate,
            "SalesPersonId": this.beatDSRDataExport[i].SalesPersonId,
            "SalesPerson": this.beatDSRDataExport[i].SalesPerson,
            "Store": this.beatDSRDataExport[i].StoreName,
            "Cluster": this.beatDSRDataExport[i].ClusterName,
            "Channel": this.beatDSRDataExport[i].ChannelName,
            "Warehouse": this.beatDSRDataExport[i].WarehouseName,
            "VisitPlaned": this.beatDSRDataExport[i].VisitPlanned,
            "TotalCall": this.beatDSRDataExport[i].TotalCall,
            "PC": this.beatDSRDataExport[i].ProductiveCall,
            "BeatOrder": this.beatDSRDataExport[i].BeatOrder,
            "BeatSales": this.beatDSRDataExport[i].BeatSales,
            "ExtraVisit": this.beatDSRDataExport[i].ExtraVisit,
            "ExtraCall": this.beatDSRDataExport[i].ExtraCall,
            "ExtraOrder": this.beatDSRDataExport[i].ExtraOrder,
            "ExtraSales": this.beatDSRDataExport[i].ExtraSales,
            "TotalSales": this.beatDSRDataExport[i].TotalSales,
            
            "TodayTarget": this.beatDSRDataExport[i].TodayTarget?this.beatDSRDataExport[i].TodayTarget:0,
            "OutletCoverage": this.beatDSRDataExport[i].OutletCoverage?this.beatDSRDataExport[i].OutletCoverage:0,
            "StrikeRate": this.beatDSRDataExport[i].StrikeRate?this.beatDSRDataExport[i].StrikeRate:0,
            "TodayPerfactOrder": this.beatDSRDataExport[i].TodayPerfactOrder,
            "TodaySupperOrder": this.beatDSRDataExport[i].TodaySupperOrder,
            "PhoneOrder": this.beatDSRDataExport[i].PhoneOrder?this.beatDSRDataExport[i].PhoneOrder:0,
            "ECO": this.beatDSRDataExport[i].ECO?this.beatDSRDataExport[i].ECO:0,
            "AvgOrderValue": this.beatDSRDataExport[i].AvgOrderValue?this.beatDSRDataExport[i].AvgOrderValue:0,
            "AvgLineItem": this.beatDSRDataExport[i].AvgLineItem?this.beatDSRDataExport[i].AvgLineItem:0,
            "MtdMonthlyTarget": this.beatDSRDataExport[i].MtdMonthlyTarget?this.beatDSRDataExport[i].MtdMonthlyTarget:0,
            "CheckIn": this.beatDSRDataExport[i].CheckIn?this.beatDSRDataExport[i].CheckIn:null,
            "CheckOut": this.beatDSRDataExport[i].CheckOut?this.beatDSRDataExport[i].CheckOut:null,
        }          
        exportData.push(selectedFields);
        index=index+1;
        }
      }
      else 
      {
        this.beatDSRDataExport=x.salesTodayDC
        var index=1
        for (var i in this.beatDSRDataExport) {
            var selectedFields = {
              "Sr No":index,
              "StartDate" :  this.beatDSRDataExport[i].StartDate==undefined ? TodayDate : this.beatDSRDataExport[i].StartDate,
              "EndDate" :  this.beatDSRDataExport[i].EndDate ==undefined ? TodayDate : this.beatDSRDataExport[i].EndDate,
              "SalesPersonId": this.beatDSRDataExport[i].SalesPersonId,
              "SalesPerson": this.beatDSRDataExport[i].SalesPerson,
              "Store": this.beatDSRDataExport[i].StoreName,
              "Cluster": this.beatDSRDataExport[i].ClusterName,
              "Channel": this.beatDSRDataExport[i].ChannelName,
              "Warehouse": this.beatDSRDataExport[i].WarehouseName,
              "VisitPlaned": this.beatDSRDataExport[i].VisitPlanned,
              "TotalCall": this.beatDSRDataExport[i].TotalCall,
              "PC": this.beatDSRDataExport[i].ProductiveCall,
              "BeatOrder": this.beatDSRDataExport[i].BeatOrder,
              "BeatSales": this.beatDSRDataExport[i].BeatSales,
              "ExtraVisit": this.beatDSRDataExport[i].ExtraVisit,
              "ExtraCall": this.beatDSRDataExport[i].ExtraCall,
              "ExtraOrder": this.beatDSRDataExport[i].ExtraOrder,
              "ExtraSales": this.beatDSRDataExport[i].ExtraSales,
              "TotalSales": this.beatDSRDataExport[i].TotalSales,

              "TodayTarget": this.beatDSRDataExport[i].TodayTarget?this.beatDSRDataExport[i].TodayTarget:0,
              "OutletCoverage": this.beatDSRDataExport[i].OutletCoverage?this.beatDSRDataExport[i].OutletCoverage:0,
              "StrikeRate": this.beatDSRDataExport[i].StrikeRate?this.beatDSRDataExport[i].StrikeRate:0,
              "TodayPerfactOrder": this.beatDSRDataExport[i].TodayPerfactOrder,
              "TodaySupperOrder": this.beatDSRDataExport[i].TodaySupperOrder,
              "PhoneOrder": this.beatDSRDataExport[i].PhoneOrder?this.beatDSRDataExport[i].PhoneOrder:0,
              "ECO": this.beatDSRDataExport[i].ECO?this.beatDSRDataExport[i].ECO:0,
              "AvgOrderValue": this.beatDSRDataExport[i].AvgOrderValue?this.beatDSRDataExport[i].AvgOrderValue:0,
              "AvgLineItem": this.beatDSRDataExport[i].AvgLineItem?this.beatDSRDataExport[i].AvgLineItem:0,
              "MtdMonthlyTarget": this.beatDSRDataExport[i].MtdMonthlyTarget?this.beatDSRDataExport[i].MtdMonthlyTarget:0,
              "CheckIn": this.beatDSRDataExport[i].CheckIn?this.beatDSRDataExport[i].CheckIn:'NULL',
              "CheckOut": this.beatDSRDataExport[i].CheckOut?this.beatDSRDataExport[i].CheckOut:'NULL',
          }          
          exportData.push(selectedFields);
          index=index+1;
        }
      }
      if(this.beatDSRDataExport && this.beatDSRDataExport.length > 0)
      {
        this.exportservice.exportAsExcelFile(exportData,"Export DSR Beat Data")
        this.blocked=false;
      }
      else
      {
        this.showError('No Data Found!');
        this.blocked=false;
        return false;
        
      }  
    })         
  }
  WID:any
  beatDSRDataExportAll:any[]
  ExportAll()
  {
    //debugger;
    var TodayDate = new Date()
    this.FromDate=moment(this.SelectedFromDate).format('MM/DD/YYYY');
    this.ToDate=moment(this.SelectedToDate).format('MM/DD/YYYY');
    
    this.WID=[]    
    this.expostWHlist.forEach(element => {
      this.WID.push(element.value)
      })
      let ChannelID=[]
      this.ChannelMasterId.forEach(ele => {
        ChannelID.push(ele.ChannelMasterId)
      });
    const payload=
    {
      "WarehouseId":this.WID,
      "StoreId":[],
      "ChannelMasterId":ChannelID,
      "StartDate":this.FromDate ? this.FromDate : null,
      "EndDate":this.ToDate ? this.ToDate :null,
      "take": 10000000,//this.TCExportt? this.TCExportt:20,
      "skip":this.skip?this.skip:0
    }
    this.blocked=true;
    this.blocked=true;
    this.SalesAppService.beatDSR(payload).subscribe(x=>
    {
      var SalesDashboardTodayMTDData
      SalesDashboardTodayMTDData=x.SalesDashboardTodayMTDData
      var exportData=[];
      if(SalesDashboardTodayMTDData!=null)
      {
        this.beatDSRDataExport=x.SalesDashboardTodayMTDData
        var index=1
        for (var i in this.beatDSRDataExport) {
          var selectedFields = {
            "Sr No":index,      
            "StartDate" :  this.beatDSRDataExport[i].StartDate==undefined ? TodayDate : this.beatDSRDataExport[i].StartDate,
            "EndDate" :  this.beatDSRDataExport[i].EndDate ==undefined ? TodayDate : this.beatDSRDataExport[i].EndDate,      
            "SalesPersonId": this.beatDSRDataExport[i].SalesPersonId,
            "SalesPerson": this.beatDSRDataExport[i].SalesPerson,
            "Store": this.beatDSRDataExport[i].StoreName,
            "Cluster": this.beatDSRDataExport[i].ClusterName,
            "Channel": this.beatDSRDataExport[i].ChannelName,
            "Warehouse": this.beatDSRDataExport[i].WarehouseName,
            "VisitPlaned": this.beatDSRDataExport[i].VisitPlanned,
            "TotalCall": this.beatDSRDataExport[i].TotalCall,
            "PC": this.beatDSRDataExport[i].ProductiveCall,
            "BeatOrder": this.beatDSRDataExport[i].BeatOrder,
            "BeatSales": this.beatDSRDataExport[i].BeatSales,
            "ExtraVisit": this.beatDSRDataExport[i].ExtraVisit,
            "ExtraCall": this.beatDSRDataExport[i].ExtraCall,
            "ExtraOrder": this.beatDSRDataExport[i].ExtraOrder,
            "ExtraSales": this.beatDSRDataExport[i].ExtraSales,
            "TotalSales": this.beatDSRDataExport[i].TotalSales,
            
            "TodayTarget": this.beatDSRDataExport[i].TodayTarget?this.beatDSRDataExport[i].TodayTarget:0,
            "OutletCoverage": this.beatDSRDataExport[i].OutletCoverage?this.beatDSRDataExport[i].OutletCoverage:0,
            "StrikeRate": this.beatDSRDataExport[i].StrikeRate?this.beatDSRDataExport[i].StrikeRate:0,
            "TodayPerfactOrder": this.beatDSRDataExport[i].TodayPerfactOrder,
            "TodaySupperOrder": this.beatDSRDataExport[i].TodaySupperOrder,
            "PhoneOrder": this.beatDSRDataExport[i].PhoneOrder?this.beatDSRDataExport[i].PhoneOrder:0,
            "ECO": this.beatDSRDataExport[i].ECO?this.beatDSRDataExport[i].ECO:0,
            "AvgOrderValue": this.beatDSRDataExport[i].AvgOrderValue?this.beatDSRDataExport[i].AvgOrderValue:0,
            "AvgLineItem": this.beatDSRDataExport[i].AvgLineItem?this.beatDSRDataExport[i].AvgLineItem:0,
            "MtdMonthlyTarget": this.beatDSRDataExport[i].MtdMonthlyTarget?this.beatDSRDataExport[i].MtdMonthlyTarget:0,
            "CheckIn": this.beatDSRDataExport[i].CheckIn?this.beatDSRDataExport[i].CheckIn:null,
            "CheckOut": this.beatDSRDataExport[i].CheckOut?this.beatDSRDataExport[i].CheckOut:null
        }          
        exportData.push(selectedFields);
        index=index+1;
        }
      }
      else 
      {
        this.beatDSRDataExport=x.salesTodayDC
        var index=1
        for (var i in this.beatDSRDataExport) {
            var selectedFields = {
              "Sr No":index,
              "StartDate" :  this.beatDSRDataExport[i].StartDate==undefined ? TodayDate : this.beatDSRDataExport[i].StartDate,
              "EndDate" :  this.beatDSRDataExport[i].EndDate ==undefined ? TodayDate : this.beatDSRDataExport[i].EndDate,
              "SalesPersonId": this.beatDSRDataExport[i].SalesPersonId,
              "SalesPerson": this.beatDSRDataExport[i].SalesPerson,
              "Store": this.beatDSRDataExport[i].StoreName,
              "Cluster": this.beatDSRDataExport[i].ClusterName,
              "Channel": this.beatDSRDataExport[i].ChannelName,
              "Warehouse": this.beatDSRDataExport[i].WarehouseName,
              "VisitPlaned": this.beatDSRDataExport[i].VisitPlanned,
              "TotalCall": this.beatDSRDataExport[i].TotalCall,
              "PC": this.beatDSRDataExport[i].ProductiveCall,
              "BeatOrder": this.beatDSRDataExport[i].BeatOrder,
              "BeatSales": this.beatDSRDataExport[i].BeatSales,
              "ExtraVisit": this.beatDSRDataExport[i].ExtraVisit,
              "ExtraCall": this.beatDSRDataExport[i].ExtraCall,
              "ExtraOrder": this.beatDSRDataExport[i].ExtraOrder,
              "ExtraSales": this.beatDSRDataExport[i].ExtraSales,
              "TotalSales": this.beatDSRDataExport[i].TotalSales,

              "TodayTarget": this.beatDSRDataExport[i].TodayTarget?this.beatDSRDataExport[i].TodayTarget:0,
              "OutletCoverage": this.beatDSRDataExport[i].OutletCoverage?this.beatDSRDataExport[i].OutletCoverage:0,
              "StrikeRate": this.beatDSRDataExport[i].StrikeRate?this.beatDSRDataExport[i].StrikeRate:0,
              "TodayPerfactOrder": this.beatDSRDataExport[i].TodayPerfactOrder,
              "TodaySupperOrder": this.beatDSRDataExport[i].TodaySupperOrder,
              "PhoneOrder": this.beatDSRDataExport[i].PhoneOrder?this.beatDSRDataExport[i].PhoneOrder:0,
              "ECO": this.beatDSRDataExport[i].ECO?this.beatDSRDataExport[i].ECO:0,
              "AvgOrderValue": this.beatDSRDataExport[i].AvgOrderValue?this.beatDSRDataExport[i].AvgOrderValue:0,
              "AvgLineItem": this.beatDSRDataExport[i].AvgLineItem?this.beatDSRDataExport[i].AvgLineItem:0,
              "MtdMonthlyTarget": this.beatDSRDataExport[i].MtdMonthlyTarget?this.beatDSRDataExport[i].MtdMonthlyTarget:0,
              "CheckIn": this.beatDSRDataExport[i].CheckIn?this.beatDSRDataExport[i].CheckIn:'NULL',
              "CheckOut": this.beatDSRDataExport[i].CheckOut?this.beatDSRDataExport[i].CheckOut:'NULL',
          }          
          exportData.push(selectedFields);
          index=index+1;
        }
      }
      if(this.beatDSRDataExport && this.beatDSRDataExport.length > 0)
      {
        this.exportservice.exportAsExcelFile(exportData,"Export ALL Beat DSR Data")
        this.blocked=false;
      }
      else
      {
        this.showError('No Data Found!');
        this.blocked=false;
        return false;
        
      }  
    })   
    // this.SalesAppService.beatDSR(payload).subscribe(x=>
    // {
    //   var SalesDashboardTodayMTDData
    //   SalesDashboardTodayMTDData=x.SalesDashboardTodayMTDData
    //   if(SalesDashboardTodayMTDData!=null)
    //   {
    //     this.beatDSRDataExportAll=SalesDashboardTodayMTDData
    //   }
    //   else 
    //   {        
    //     this.beatDSRDataExportAll=x.salesTodayDC
    //   }
    //   if(this.beatDSRDataExportAll && this.beatDSRDataExportAll.length > 0)
    //   {
    //     this.exportservice.exportAsExcelFile(this.beatDSRDataExportAll,"Export All DSR Beat Data")
    //     this.blocked=false;
    //   }
    //   else
    //   {
    //     this.showError('No Data Found!');
    //     this.blocked=false;
    //     return false;
        
    //   }  
    // })         
  }

  ForSearchHit()
  {
    this.totalcount=0
    this.first=0
  }
  load(event)
  {
    //debugger;
    // this.skip= event && event.first ? event.first : 0,
    // this.take= event && event.rows ? event.rows : 10,

    // this.skip= event.first;
    // this.take= event.rows;
    this.loadSearch(event);  
    if(this.scrhhit==true)
    {
      this.Search(event);
    }  
    
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }
  refresh(event)
  {
    let ChannelID=[];
    this.ChannelMasterId.forEach(ele => {
      ChannelID.push(ele.ChannelMasterId)
    });
    const payload=
    {
      "WarehouseId":this.WareIDD,
      "StoreId":[],
      "ChannelMasterId":ChannelID,
      "StartDate":this.FromDate,
      "EndDate":this.ToDate,
      "skip":event && event.first ? event.first : 0,
      "take":event && event.rows ? event.rows : 20,
    }
    this.blocked=true;
    this.SalesAppService.beatDSR(payload).subscribe(x=>
    {
      console.log(x);
      this.blocked=false;
      // this.first1=0;
      if(x!=null){
        if(x.SalesDashboardTodayMTDData==null){
          if(x.salesTodayDC.length>0) {
            this.beatDSRData=x.salesTodayDC;
             this.totalcount=x.Totalcount
            }
          else { this.showError("Data Not Found") ;this.beatDSRData=undefined;}
        }
        else{
          if(x.SalesDashboardTodayMTDData.length>0) {
            this.beatDSRData=x.SalesDashboardTodayMTDData; 
            this.totalcount=x.Totalcount
          }
          else  { this.showError("Data Not Found");this.beatDSRData=undefined; }
        }

       // this.beatDSRData=x.SalesDashboardTodayMTDData==null?x.salesTodayDC:x.SalesDashboardTodayMTDData

      }

    })
  }

  
  ChannelTypeList:any
  CustomerChannelTypeList(){
    debugger;
    this.customerservice.CustomerChannelTypeList().subscribe(res=>{
      console.log(res);      
      this.ChannelTypeList=res;
      this.ChannelTypeList=this.ChannelTypeList.filter(x=>x.ChannelType != 'Digital');
      this.ChannelMasterId=this.ChannelTypeList;
      this.loadSearch(null);
    })
  }
}

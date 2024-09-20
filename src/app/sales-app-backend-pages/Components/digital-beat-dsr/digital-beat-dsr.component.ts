import { Component, Input, OnInit } from '@angular/core';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { StoreService } from 'app/store/services/store.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-digital-beat-dsr',
  templateUrl: './digital-beat-dsr.component.html',
  styleUrls: ['./digital-beat-dsr.component.scss']
})
export class DigitalBeatDsrComponent implements OnInit {

  AllCity:any
  SelectedCity:any
  SelectedFromDate:any
  SelectedToDate:any
  CityId:any[]
  Telecaller:any
  StoreIdd:any[]=[]
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

  @Input() Type : any;

  constructor( private warehouseService: WarehouseService,public StoreService: StoreService,public SalesAppService:SalesAppServiceService,
    private msg:MessageService, private exportservice:ExportServiceService,private serv : ItemClassificationIncentiveReportService) {   }
 
  ngOnInit() 
  {
    
     this.GetCity(); 
     console.log(this.Type);
    
  }
  // ngOnChanges(){
  //   console.log(this.Type);
  // }
  expostWHlist:any
  GetCity()
  {
    
    this.serv.GetAllCityNew().subscribe(x=>
    {
      this.AllCity=x
      this.SelectedCity=this.AllCity
      console.log(this.AllCity,"u");
      if(this.expostWHlist==undefined){
      this.expostWHlist=this.AllCity}
      if(this.AllCity !=null)
      {
        this.loadSearch(null);
      }
     
    })
  }
  // GetAllstore()
  // {
  //   this.StoreService.GetStoreList().subscribe((res) => {
  //     this.allStoreList = res;
  //     this.selectedStore=this.allStoreList
  //     this.loadSearch(null);
  //   })
  // }
  loadSearch(event:any)
  {
    if(this.beatDSRData==undefined)
    {
      this.showError("Please search the data first");
      return false;
    }
    else if(this.SelectedCity!=undefined && this.FromDate==undefined && this.ToDate==undefined)
    {
      this.SelectedCity=this.AllCity
      this.CityId=[]
      this.StoreIdd=[]        
      this.SelectedCity.forEach(element => {
        this.CityId.push(element.value)
        })
      const payload=
      {
        "CityIds":this.CityId,
        "Type":this.Type == 2 ? "Digital" : "Telecaller",
        "StartDate":this.FromDate? null : null,
        "EndDate":this.ToDate ? null : null,
        "skip":event && event.first ? event.first : 0,
        "take":event && event.rows ? event.rows : 20
      }
      this.blocked= true;
      this.SalesAppService.GetTelecallerBeatDSR(payload).subscribe(x=>
      {
        console.log(x);
        // this.first1=0;
        this.beatDSRData=x.DigitalSalesBeatDSRMTDData
        this.totalcount=x.Totalcount
        this.blocked=false;
      })
    }
  }


  Search(event)
  { 
    this.scrhhit=true;
    // this.load/.(event);
    if(this.beatDSRData==undefined)
    {
      this.showError("Please search the data first");
      return false;
    }
    else if(this.SelectedCity==undefined || this.SelectedCity.length==0 )
    {
      this.showError("Please Select WareHouse");
      return false;
    }
    // else if(this.selectedStore==undefined || this.selectedStore.length==0)
    // {
    //   this.showError("Please Select Cluster");
    //   return false;
    // }
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

      if (this.FromDate!=null && this.ToDate!=null && this.SelectedCity!=undefined && this.FromDate!=undefined && this.FromDate!=undefined )
      {
        this.CityId=[]
        this.StoreIdd=[]        
        this.SelectedCity.forEach(element => {
          this.CityId.push(element.value)
          })
    
        const payload=
        {
          "CityIds":this.CityId,
          "StartDate":this.FromDate,
          "Type":this.Type == 2 ? "Digital" : "Telecaller",
          "EndDate":this.ToDate,
          "skip":event && event.first ? event.first : 0,
          "take":event && event.rows ? event.rows : 20,
        }
        this.blocked=true;
        this.SalesAppService.GetTelecallerBeatDSR(payload).subscribe(x=>
        {
         
          console.log(x);
          this.blocked=false;
          // this.first1=0;
          if(x!=null){
            if(x.DigitalSalesBeatDSRMTDData!=null){
            
                this.beatDSRData=x.DigitalSalesBeatDSRMTDData;
                 this.totalcount=x.Totalcount
            }
              else  this.showError("Data Not Found");
            }
  
           // this.beatDSRData=x.DigitalSalesBeatDSRMTDData==null?x.salesTodayDC:x.DigitalSalesBeatDSRMTDData
 
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
    this.SelectedCity=undefined
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
    var TodayDate = new Date()
    if(this.beatDSRData==undefined)
    {
      this.showError("Please search the data first")
      return false;
    }
    this.FromDate=moment(this.SelectedFromDate).format('MM/DD/YYYY');
    this.ToDate=moment(this.SelectedToDate).format('MM/DD/YYYY');
    const payload=
    {
      "CityIds":this.CityId,
      "Type":this.Type == 2 ? "Digital" : "Telecaller",
      "StartDate":this.FromDate ? this.FromDate : null,
      "EndDate":this.ToDate ? this.ToDate :null,
      "take":this.totalcount ? this.totalcount :20,
      "skip":this.skip?this.skip:0
    }
    this.blocked=true;
    this.SalesAppService.GetTelecallerBeatDSR(payload).subscribe(x=>
    {
      var DigitalSalesBeatDSRMTDData
      DigitalSalesBeatDSRMTDData=x.DigitalSalesBeatDSRMTDData
      var exportData=[];
      if(DigitalSalesBeatDSRMTDData!=null)
      {
        this.beatDSRDataExport=x.DigitalSalesBeatDSRMTDData
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
        this.beatDSRDataExport=x.DigitalSalesBeatDSRMTDData
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
 
  beatDSRDataExportAll:any[]
  ExportAll()
  {
    var TodayDate = new Date()
    this.FromDate=moment(this.SelectedFromDate).format('MM/DD/YYYY');
    this.ToDate=moment(this.SelectedToDate).format('MM/DD/YYYY');
    
    this.CityId=[]    
    this.expostWHlist.forEach(element => {
      this.CityId.push(element.value)
      })
     
    const payload=
    {
      "CityIds":this.CityId,
      "Type":this.Type == 2 ? "Digital" : "Telecaller",
      "StartDate":this.FromDate ? this.FromDate : null,
      "EndDate":this.ToDate ? this.ToDate :null,
      "take": 10000000,//this.TCExportt? this.TCExportt:20,
      "skip":this.skip?this.skip:0
    }
    this.blocked=true;
    this.blocked=true;
    this.SalesAppService.GetTelecallerBeatDSR(payload).subscribe(x=>
    {
      var DigitalSalesBeatDSRMTDData
      DigitalSalesBeatDSRMTDData=x.DigitalSalesBeatDSRMTDData
      var exportData=[];
      if(DigitalSalesBeatDSRMTDData!=null)
      {
        this.beatDSRDataExport=x.DigitalSalesBeatDSRMTDData
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
        this.beatDSRDataExport=x.DigitalSalesBeatDSRMTDData
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
    //   var DigitalSalesBeatDSRMTDData
    //   DigitalSalesBeatDSRMTDData=x.DigitalSalesBeatDSRMTDData
    //   if(DigitalSalesBeatDSRMTDData!=null)
    //   {
    //     this.beatDSRDataExportAll=DigitalSalesBeatDSRMTDData
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
  
    const payload=
    {
      "CityIds":this.CityId,
      "StartDate":this.FromDate,
      "Type":this.Type == 2 ? "Digital" : "Telecaller",
      "EndDate":this.ToDate,
      "skip":event && event.first ? event.first : 0,
      "take":event && event.rows ? event.rows : 20,
    }
    this.blocked=true;
    this.SalesAppService.GetTelecallerBeatDSR(payload).subscribe(x=>
    {
     
      console.log(x);
      this.blocked=false;
      // this.first1=0;
      if(x!=null){
        if(x.DigitalSalesBeatDSRMTDData!=null){
        
            this.beatDSRData=x.DigitalSalesBeatDSRMTDData;
             this.totalcount=x.Totalcount
        }
          else  this.showError("Data Not Found");
        }

       // this.beatDSRData=x.DigitalSalesBeatDSRMTDData==null?x.salesTodayDC:x.DigitalSalesBeatDSRMTDData

      })
  }
}
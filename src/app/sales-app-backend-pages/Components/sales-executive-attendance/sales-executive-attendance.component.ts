
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-sales-executive-attendance',
  templateUrl: './sales-executive-attendance.component.html',
  styleUrls: ['./sales-executive-attendance.component.scss']
})
export class SalesExecutiveAttendanceComponent implements OnInit {

  constructor(private _service :ItemClassificationIncentiveReportService,public datepipe: DatePipe,
    private msg:MessageService,private exportserv:ExportServiceService,private customerService:CustomerService) { }
  
    CityList:any;
    selectedCity:any;
    warehouseList:any;
    StoreList:any;
    StoreId:any;
    dateValue:any
    warehouseObj:any
    blocked=false
    salesExecutiveReport:any
    ngOnInit() { 
      this.getCities(); 
      //this.getStore();
      this.CustomerChannelTypeList();
    }
  
    getCities(){
      this.CityList=[]
      this._service.GetAllCityNew().subscribe(res=>{
        this.CityList=res;
        let WH =this.CityList
        this.selectedCity=this.CityList
        console.log(this.CityList);
        this.getWarehouse(WH)
      })
    }
wareList:any[]
    getWarehouse(WH){
      debugger;
      let CID=[];
      WH.forEach(x=>{
          CID.push(x.value)
      })
      console.log(CID,"fsdf");
      this.customerService.GetWarehouseListForTargetV2(CID).subscribe(x=>{ 
        if(this.wareList==undefined)
        {
          this.wareList=[]
          this.wareList=x
          this.warehouseList=x
          this.warehouseObj=this.warehouseList
        }
        this.dateValue = new Date()
        this.Search(true);
      })
      this.skip=0
    }


    CityIDD:any
    getWarehouseByCityId(Cityidlist){
        debugger
        this.warehouseObj=[] 
        this.warehouseList=[]
        this.CityIDD=[];
        Cityidlist.forEach(x=>{
            this.CityIDD.push(x.value)
        })
        console.log(this.CityIDD,"fsdf");        
        this.customerService.GetWarehouseListForTargetV2(this.CityIDD).subscribe(x=>{ 
          this.warehouseList=x
        })
        this.skip=0
      }
    
    chageWarehouse(wH){
      //this.StoreId=undefined
    }
  
    chageStore(){
      //this.dateValue=undefined
    }
  
    getStore(){
      this.StoreList=[]
      this._service.GetStoreList().subscribe(res=>{
        this.StoreList=res;
        this.StoreId=this.StoreList
      })
    }

    skip:number;
    take:number
    TotalRecords:number
    load(event) {
      debugger
      this.take = event.rows;
      this.skip = event.first;
      if(event.globalFilter){
        this.salesExecutiveReport.map(function(val, index){
          if(val.EmpCode==null) val.EmpCode='';
        })
        this.salesExecutiveReport= this.salesExecutiveReport.
        filter(x=>(x.EmpCode.includes(event.globalFilter) || x.ExecutiveName.includes(event.globalFilter) || x.Mobile.includes(event.globalFilter)))
        if(this.salesExecutiveReport.length==0) this.showError("Data Not Found!")
        else this.TotalRecords=this.salesExecutiveReport.length;
      }else{
      this.Search(false);}
    }
    first:any=0
    ChannelMasterId:any;
    Search(val){
      debugger;
      // this.salesExecutiveReport=[];
      // this.TotalRecords=0;
      if(this.ChannelMasterId==undefined && val==true) this.showError("select Channel!")
      else if(this.selectedCity==undefined && val==true) this.showError("select city first!")
      else if(this.warehouseObj==undefined && val==true) this.showError("select warehouse first!")
      else if(this.dateValue==undefined && val==true) this.showError("select Month Year first!")
      else{
        if(val==true)this.skip=0; this.first=0; 
        this.salesExecutiveReport=[]
        const cityIds:any=[],storeIds:any=[],warehouseIds:any=[],ChannelId:any=[];
        this.warehouseObj.forEach((e:any)=>{
            warehouseIds.push(e.value);
        })
        // this.StoreId.forEach((e:any)=>{
        //     storeIds.push(e.Id);
        // })
        this.ChannelMasterId.forEach(ele=>{
          ChannelId.push(ele.ChannelMasterId);
        })
        this.selectedCity.forEach((e:any)=>{
            cityIds.push(e.value);
        })
        var ReportFilterDc={     
            "StoreIds":[],
            "ChannelMasterId":ChannelId,
            "CityIds":cityIds,
            "WarehouseIds":warehouseIds,
            "Month": moment(this.dateValue).format("MM"), //parseInt(this.datepipe.transform(this.dateValue,'MM')),
            "Year": moment(this.dateValue).format("YYYY"), //parseInt(this.datepipe.transform(this.dateValue,'yyyy')),
            "Skip":this.skip,
            "Take":this.take
        }
        console.log(ReportFilterDc);
        this.blocked=true;
        this._service.GetAllExecutiveAttendenceForReport(ReportFilterDc).subscribe(res=>{
          this.blocked=false;         
          if(res.Data.executiveAttendanceLogDCs.length==0) this.showError("Data Not Found!")
          else{
          this.salesExecutiveReport=res.Data.executiveAttendanceLogDCs;
          this.TotalRecords=res.Data.TotalRecords;
          console.log(this.salesExecutiveReport);
        }
        })
      }
    }
    DetailExport(addendanceData){
      debugger
      if(this.dateValue==undefined) this.showError("select Month Year first!")
      else{
        this.blocked=true;
        this._service.detailExport(addendanceData.ExecutiveId,addendanceData.CreatedDate.split("T",1)[0]).subscribe(result => {
          this.blocked=false
          if(result.Status==false || result.Data.length==0) this.showError("Data Not Found!")
          else{
              var ex = result.Data.map(function(rowData){
              return {
                'Employee Code':rowData.EmployeeCode==null?'--':rowData.EmployeeCode,
                'Executive Name':rowData.ExecuitveName,
                'Store':rowData.Store,
                'Channel': rowData.Channel,
                'Warehouse':rowData.Warehouse,
                'Cluster':rowData.Cluster,
                'Date':moment(rowData.Date).format('DD/MM/YYYY'),
                'Day':rowData.Day,
                'SkCode':rowData.SkCode,
                'check-in':rowData.CheckIn==null?'--':rowData.CheckIn,
                'check-out':rowData.CheckOut==null?'--':rowData.CheckOut, //moment(rowData.CheckOut).format('h:mm:ss'),
                'BeatCustomer': rowData.BeatCustomer==null?0:rowData.BeatCustomer,
                'OrderPlaced/OrderCount': rowData.OrderCount,
                };
            })
            this.exportserv.exportAsExcelFile(ex,"AttendanceDetailExcelFile")
          } 
        });
      }
    }
    showError(msg1:string){
      this.msg.add({severity:'error', summary: 'Error', detail:msg1});
    }
  
    showSuccess(msg1:string){
      this.msg.add({severity:'success', summary: 'Success', detail:msg1});
    }
  
    Clear(){
      debugger
      location.reload();
        this.dateValue=undefined; this.StoreId=undefined; this.warehouseObj=undefined; this.selectedCity=undefined;this.ChannelMasterId=undefined;
      this.warehouseList=[];
    }
    
    Export(){
      debugger
      if(this.salesExecutiveReport==undefined || this.salesExecutiveReport.length==0 ) this.showError("please search the data first!")
      else if(this.salesExecutiveReport!=null && this.salesExecutiveReport!=undefined && this.salesExecutiveReport.length>0){
        //this.salesExecutiveReport=[]
        const cityIds:any=[],storeIds:any=[],warehouseIds:any=[],ChannelId:any=[];
        this.warehouseObj.forEach((e:any)=>{
            warehouseIds.push(e.value);
        })
        // this.StoreId.forEach((e:any)=>{
        //     storeIds.push(e.Id);
        // })
        this.selectedCity.forEach((e:any)=>{
            cityIds.push(e.value);
        })
        this.ChannelMasterId.forEach(ele=>{
          ChannelId.push(ele.ChannelMasterId);
        })
        var month=parseInt(this.datepipe.transform(this.dateValue,'MM'));
        var yr =parseInt(this.datepipe.transform(this.dateValue,'yyyy'))
        const date = new Date();
        date.setMonth(month - 1);
        var monthName= date.toLocaleString('en-US', {
          month: 'short',
        });
        var ReportFilterDc={     
            "StoreIds":[],
            "ChannelMasterId":ChannelId,
            "CityIds":cityIds,
            "WarehouseIds":warehouseIds,
            "Month":month,
            "Year":yr,
            "Skip":0,
            "Take":this.TotalRecords
        }
        console.log(ReportFilterDc);
        this.blocked=true;
        this._service.GetAllExecutiveAttendenceForReport(ReportFilterDc).subscribe(res=>{
          this.blocked=false;         
          if(res.Data.executiveAttendanceLogDCs.length==0) this.showError("Data Not Found!")
          else{
            var response = res.Data.executiveAttendanceLogDCs.map(function(rowData) {
              return {
                'Executive EmpCode':rowData.EmpCode==null?0:rowData.EmpCode,
                'Executive Name':rowData.ExecutiveName==null?'--':rowData.ExecutiveName,
                'Month':monthName,
                'Year':yr,
                'Store':rowData.Store,
                'Channel':rowData.ChannelName,
                'warehouse Name': rowData.Warehouse==null?'--':rowData.Warehouse,
                'Cluster Name':( rowData.Cluster==null||rowData.Cluster=='') ?'--':rowData.Cluster,
                'Total working days': rowData.TotalWorkingDays,
                'Present days': rowData.PresentDays,
                'Absent days': rowData.AbsentDays, 
                'TADA':rowData.TADA,
               };
             });
            this.exportserv.exportAsExcelFile(response,"SalesAttendenceTADAReport")
          }
        })
      }
    }

    subExcelDownload(rowData){
      console.log('subdata',rowData);
      var subdata=rowData
      var Month=parseInt(this.datepipe.transform(this.dateValue,'MM'));
      var Year=parseInt(this.datepipe.transform(this.dateValue,'yyyy'));
      this.blocked=true;
      this._service.GetExecutiveAttendenceMonthViewForReport(rowData.ExecutiveId,Month,Year).subscribe(res=>{
        this.blocked=false; 
        if(res.Data.length==0) this.showError("Data Not Found!")
        else{
              var resFEx = res.Data.map(function(rowData) {
              return {
                'Employee Code':subdata.EmpCode,
                'Executive Name':subdata.ExecutiveName,
                'Store':subdata.Store,
                'Channel':subdata.ChannelName,
                'Warehouse':subdata.Warehouse,
                'Cluster':subdata.Cluster,
                'Date':rowData.CreatedDate==null?0:rowData.CreatedDate.split("T",1)[0],
                'Day':rowData.Day==null?'--':rowData.Day,
                'Check-In':rowData.FirstCheckIn==null?'--':moment(rowData.FirstCheckIn).format('HH:mm:ss'),
                'Check-Out':rowData.LastCheckOut==null?'--':moment(rowData.LastCheckOut).format('HH:mm:ss'),
                'TC': rowData.TC==null?'--':rowData.TC,
                'Attendance Status': rowData.Status,
                'PC': rowData.PC,
                'TADA': rowData.TADA,
                };
              });
            this.exportserv.exportAsExcelFile(resFEx,"SalesSubAttendenceTADAReport")
        }
      })
    }
    Test:boolean  =false
    Indexs:number
    subExceldata:any
  
   
    onNodeChange(rowData,rowNode){
      debugger;  
      if(rowNode==undefined || rowNode==false){
        var Month=parseInt(this.datepipe.transform(this.dateValue,'MM'));
        var Year=parseInt(this.datepipe.transform(this.dateValue,'yyyy'));
        this.blocked=true;
        this._service.GetExecutiveAttendenceMonthViewForReport(rowData.ExecutiveId,Month,Year).subscribe(res=>{
          this.blocked=false;         
          if(res.Data.length==0) this.showError("Data Not Found")
          else{
            this.salesExecutiveReport.forEach(rowEl=>{
              if(rowEl.ExecutiveId==rowData.ExecutiveId){
                rowEl.children=res.Data;
                rowEl.expanded = true;
              }
              else{ rowEl.expanded = false}         
            })
            console.log(this.salesExecutiveReport); 
          }
        })
      }
      else{
        this.salesExecutiveReport.forEach(rowEl=>{
            rowEl.expanded = false; 
        })
      }
    }
    cancel(){
      this.display=false;
      this.DateValue=undefined
    }
    DateValue:any
    display:boolean=false
    ExportDateWiseDisplay(){
      this.display=true   
    }
    ExportDateWise(){
      debugger
      if(this.DateValue==undefined) this.showError("select date first");
      else{
        let WarehousIds =[]
        this.wareList.forEach((e:any)=>{
          WarehousIds.push(e.value);
      })
        this._service.DateWiseExport(moment(this.DateValue).format('YYYY-MM-DD'),WarehousIds).subscribe(res=>{
          if(res.Status==true){window.open(res.Data); this.display=false }
          else{console.log(res);this.showError("Data Not Found"); }
        })
      }
    }
    
    ExportAll(){
      debugger;
      if(this.dateValue==undefined) this.showError("select Month Year first!")
      else{
        var month=parseInt(this.datepipe.transform(this.dateValue,'MM'))
        var year =parseInt(this.datepipe.transform(this.dateValue,'yyyy'))
        const date = new Date();
        date.setMonth(month - 1);
        var monthName= date.toLocaleString('en-US', {
          month: 'short',
        });
        let WarehousIds =[]
        let StoreIDs =[]
        let ChannelId:any=[]
        this.blocked=true;
        this.wareList.forEach((e:any)=>{
            WarehousIds.push(e.value);
        })
        // this.StoreId.forEach((e:any)=>{
        //   StoreIDs.push(e.Id);
        // });
        this.ChannelMasterId.forEach(ele=>{
          ChannelId.push(ele.ChannelMasterId);
        })

        const payload =
        {
          "WarehousIds":WarehousIds,
          "StoreIDs": [],
          "ChannelMasterId":ChannelId,
          "month":month,
          "year":year

        }
        this._service.ExportAllReport(payload).subscribe(result => {
          this.blocked=false
          if(result.Data.length==0) this.showError("Data Not Found!")
          else{
            var ex = result.Data.map(function(rowData){
              return {
                'Employee Code':rowData.EmpCode==null?'--':rowData.EmpCode,
                'Executive Name':rowData.ExecutiveName,
                'Month':monthName,
                'Year':year,
                'Store':rowData.Store,
                'Channel':rowData.ChannelName,
                'Warehouse':rowData.Warehouse,
                'Cluster':rowData.Cluster,
                'Total working days':rowData.TotalWorkingDays==null?0:rowData.TotalWorkingDays,
                'Present days':rowData.PresentDays==null?0:rowData.PresentDays,
                'Absent days': rowData.AbsentDays==null?0:rowData.AbsentDays,
                'TA/DA Days': rowData.TADA,
                };
            })
            this.exportserv.exportAsExcelFile(ex,"AllReportExcelFile")
          } 
        });
      }
    }

    ChannelTypeList:any
    CustomerChannelTypeList(){
      debugger;
      this.customerService.CustomerChannelTypeList().subscribe(res=>{
        console.log(res);      
        this.ChannelTypeList=res;
        this.ChannelMasterId=this.ChannelTypeList;
        //this.loadSearch(null);
      })
    }
}

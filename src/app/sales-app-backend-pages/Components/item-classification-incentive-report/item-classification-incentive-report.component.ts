import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-item-classification-incentive-report',
  templateUrl: './item-classification-incentive-report.component.html',
  styleUrls: ['./item-classification-incentive-report.component.scss']
})
export class ItemClassificationIncentiveReportComponent implements OnInit {

  constructor(private _service :ItemClassificationIncentiveReportService,public datepipe: DatePipe,
  private msg:MessageService,private exportserv:ExportServiceService) { }

  CityList:any;
  selectedCity:any;
  warehouseList:any;
  warehouseID:any;
  StoreList:any;
  StoreId:any;
  dateValue:any
  incentiveClaftionReport:any
  blocked=false
  ngOnInit() { this.getCities(); }

  getCities(){
    this._service.GetAllCityNew().subscribe(res=>{
      this.CityList=res;
    })
  }

  // getWarehouseByCityId(Cityidlist){
  //   this.warehouseID=undefined
  //   this.StoreId=undefined
  //   this.warehouseList=[]
  //   this._service.getWareHouseByCity(this.selectedCity.Cityid).subscribe(res=>{
  //     this.warehouseList=res;
  //   })
  // }
  CityIDD:any
  getWarehouseByCityId(){
      debugger
   
      this.warehouseList=[]
      this.CityIDD=[];
      this.selectedCity.forEach(x=>{
          this.CityIDD.push(x.value)
      })
      console.log(this.CityIDD,"fsdf");
      
      this._service.getWareHouseByCityV2(this.CityIDD).subscribe(x=>{ 
        this.warehouseList=x
        console.log(this.warehouseList,"data");
        
      })
    
    }
  

  chageWarehouse(){
    this.StoreId=undefined
  }

  chageStore(){
    //this.dateValue=undefined
  }

  getStore(){
    this.StoreList=[]
    this._service.GetStoreList().subscribe(res=>{
      this.StoreList=res;
    })
  }

  first:any=0
  Search(){
    if(this.selectedCity==undefined) this.showError("select city first!")
    else if(this.warehouseID==undefined) this.showError("select warehouse first!")
    else if(this.StoreId==undefined) this.showError("select store first!")
    else if(this.dateValue==undefined) this.showError("select date first!")
    else{
      this.incentiveClaftionReport=[]
      const Ids:any=[],storeId:any=[];
      this.warehouseID.forEach((e:any)=>{
        Ids.push(e.value);
      })
      this.StoreId.forEach((e:any)=>{
        storeId.push(e.Id);
      })
      var ReportFilterDc={
      "cityid":this.selectedCity.value,
      "warehouseids":Ids,
      "storeids":storeId,
      "Month":parseInt(this.datepipe.transform(this.dateValue,'MM')),
      "Year":parseInt(this.datepipe.transform(this.dateValue,'yyyy'))}
      this.blocked=true;
      this._service.getSearchData(ReportFilterDc).subscribe(res=>{
        this.blocked=false;
        if(res.length==0) this.showError("Data Not Found!")
        else{
          this.first=0
        this.incentiveClaftionReport=res;
        console.log(this.incentiveClaftionReport);}
      })
    }
  }
  
  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }

  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

  Clear(){
    this.dateValue=undefined; this.StoreId=undefined; this.warehouseID=undefined; this.selectedCity=undefined
    this.StoreList=[];
    this.warehouseList=[];
  }
  
  Export(){
    if(this.incentiveClaftionReport==undefined) this.showError("please search the data first!")
    else if(this.incentiveClaftionReport!=null && this.incentiveClaftionReport!=undefined && this.incentiveClaftionReport.length>0){

      var res = this.incentiveClaftionReport.map(function(rowData) {
        return {
          'Executive Id':rowData.ExecutiveId==null?0:rowData.ExecutiveId,
          'Executive Name':rowData.ExecutiveName==null?'--':rowData.ExecutiveName,
          'Store Id':rowData.storeid==null?0:rowData.storeid,
          'Store Name':rowData.StoreName==null?'--':rowData.StoreName,
          'warehouse Name': rowData.WarehouseName==null?'--':rowData.WarehouseName,
          'Item Incentive Classification Id': rowData.ItemIncentiveClassificationId,
          'Item Classification Name': rowData.ItemClassification,
          'Sale Value': rowData.SaleValue,
          'Classification Wise Incentive':rowData.CommissionPercentage,
          'Total Incentive':rowData.Earning
         };
       });
      this.blocked=true
      this.exportserv.exportAsExcelFile(res,"IncentiveReport")
      this.blocked=false;
    }else if(this.incentiveClaftionReport.length==0) this.showError("Data Not Found!")
    else this.showError("Something Went Wrong")
  }

  ExportAll(){
    if(this.dateValue==undefined) this.showError("select Month Year  first!")
    else{
      var ReportFilterDc={
        "cityid":null,
        "warehouseids":null,
        "storeids":null,
        "Month":parseInt(this.datepipe.transform(this.dateValue,'MM')),
        "Year":parseInt(this.datepipe.transform(this.dateValue,'yyyy'))
      }
      this.blocked=true;
      this._service.ExportAllincentiveData(ReportFilterDc).subscribe(result => {
        this.blocked=false
        if(result.length==0) this.showError("Data Not Found!")
        else this.exportserv.exportAsExcelFile(result,"AllIncentiveReportExcelFile")
      });
    }
  }

}

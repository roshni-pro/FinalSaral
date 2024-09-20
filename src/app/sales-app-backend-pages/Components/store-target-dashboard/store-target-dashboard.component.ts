import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { log } from 'console';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-store-target-dashboard',
  templateUrl: './store-target-dashboard.component.html',
  styleUrls: ['./store-target-dashboard.component.scss']
})
export class StoreTargetDashboardComponent implements OnInit {
  dateValue:Date;
  blocked:boolean=false
  constructor(private messageService: MessageService,public datepipe: DatePipe,
    private cityService: CityService,private exportserv:ExportServiceService,private customerService:CustomerService,
    private pickerservice : PickerService,private _service :ItemClassificationIncentiveReportService) { }

  ngOnInit() { this.GetCity(); this.getStore();}

  CityObj:any
  cityList:any[];
  CityIDD:any[];
  warehouseObj:any
  WareHouseList:any[]
  Store:any
  WareId:any[]
  clusterList:any[]
  SelectedCluster:any
  StoreList:any
  clusterIds:any[];
  storeId:any
  ReportFilterData:any
  searchTrue:boolean=false
  first:any=0
  
  GetCity(){
    this.cityService.getAllCityNew().subscribe(result => {
      this.cityList = result;
      console.log("city",this.cityList);
      
    })    
  }

  GetWarehouse(Cityidlist){
    this.warehouseObj=undefined
    this.SelectedCluster=undefined
    this.Store=undefined
    this.WareHouseList=[]
    this.clusterList=[]
    this.StoreList=[]
    this.CityIDD=[];
    Cityidlist.forEach(x=>{
      this.CityIDD.push(x.value)
  })
  console.log(this.CityIDD,"fsdf");
    // this.CityIDD.push(Cityidlist.Cityid)
    this.customerService.GetWarehouseListForTargetV2(this.CityIDD).subscribe(x=>{ 
      this.WareHouseList=x
    })
  }


  GetClusterList(selectedWareHouseList) {
    this.SelectedCluster=undefined
    this.Store=undefined
    this.clusterList=[];
    this.WareId = [];
    selectedWareHouseList.forEach(element => {
      this.WareId.push(element.value);
    });
    this.pickerservice.GetAllClusterViaMultipleWareID(this.WareId).subscribe(ClusterRes => {
      this.clusterList = ClusterRes;  
      console.log(this.clusterList,"hh");
      
    });
  }
  
  getStore(){
    this.StoreList=[];
    this._service.GetStoreList().subscribe(res=>{
      this.StoreList=res;
    })
  }
  
  ChangeCluster(clusterSelected){
    this.clusterIds=[]
    clusterSelected.forEach((x:any)=>{
      this.clusterIds.push(x.ClusterId)
    })
  }
  
  ChangeStore(storedata){
    this.storeId={}
    this.storeId=storedata.Id
  }

  
  Search(){
    debugger;
    if(this.CityObj==undefined) this.showError("select city first!")
    else if(this.warehouseObj==undefined) this.showError("select warehouse first!")
    else if(this.Store==undefined) this.showError("select store first!")
    else if(this.SelectedCluster==undefined) this.showError("select cluster first!")
    else if(this.dateValue==undefined) this.showError("select month year first!")
    else{
      this.ReportFilterData=[]
      var Param= {
        "Month":parseInt(this.datepipe.transform(this.dateValue,'MM')),
        "Year":parseInt(this.datepipe.transform(this.dateValue,'yyyy')),
        "WarehouseIds":this.WareId,
        "ClusterId":this.clusterIds,
        "StoreId":this.storeId      
      }
      this.blocked=true;
      this._service.GetSuccessStoreTarget(Param).subscribe(res=>{ 
        this.blocked=false;
        if(res.length==0) this.showError("Data Not Found!")
        else {this.first=0 ;this.ReportFilterData=res;   } 
      })
    }
  }

  Clear(){
    this.dateValue=undefined
    this.WareHouseList=[]
    this.clusterList=[]
    this.StoreList=[]
    this.SelectedCluster=undefined
    this.warehouseObj=undefined
    this.CityObj=undefined
  }

  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail:msg});
  }

  Export(){
    if(this.ReportFilterData==undefined) this.showError("please search the data first!")
    else if(this.ReportFilterData!=null && this.ReportFilterData!=undefined && this.ReportFilterData.length>0){
      this.blocked=true
      this.exportserv.exportAsExcelFile(this.ReportFilterData,"StoreTargetDashboardReport")
      this.blocked=false;
    }else if(this.ReportFilterData.length==0) this.showError("Data Not Found!")
    else this.showError("Something Went Wrong")
  }

  // ExportAll(){
  //   if(this.dateValue==undefined) this.showError("select Month Year  first!")
  //   else{
  //     var ReportFilterDc={
  //       "cityid":null,
  //       "warehouseids":null,
  //       "storeids":null,
  //       "Month":parseInt(this.datepipe.transform(this.dateValue,'MM')),
  //       "Year":parseInt(this.datepipe.transform(this.dateValue,'yyyy'))}
  //       this.blocked=true;
  //       this._service.ExportAllincentiveData(ReportFilterDc).subscribe(result => {
  //         this.blocked=false
  //         if(result.length==0) this.showError("Data Not Found!")
  //         else
  //          this.exportserv.exportAsExcelFile(result,"AllExcelFile")
  //       });
  //     this.blocked=false
  //   }
  // }
}

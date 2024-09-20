import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-customer-target-dashboard',
  templateUrl: './new-customer-target-dashboard.component.html',
  styleUrls: ['./new-customer-target-dashboard.component.scss']
})
export class NewCustomerTargetDashboardComponent implements OnInit {

  constructor(private messageService: MessageService, private customerService:CustomerService,public datepipe: DatePipe,
  private cityService: CityService,private exportserv:ExportServiceService) { }

  dateValue:Date;
  month:any;
  year:any;
  blocked:boolean=false
  CityObj:any
  cityList:any[];
  CityIDD:any
  warehouseObj:any
  WareHouseList:any[]=[]
  SkCodeList:any[]=[]
  skcodeObj:any
  WareHouseIdsList:any[]=[]
  filteredSkCodes: any[];
  skcodes:any[]=[];
  GetTargetData:any
  first:any=0
  WHList:any
  ngOnInit() { this.GetCity(); }

  GetCity(){
    this.cityService.getAllCityNew().subscribe(result => {
      this.cityList = result;
      this.CityObj = this.cityList
      // debugger;
      this.GetWarehousea( this.CityObj);
    })   
  }
  GetWarehousea(CityObj){
    debugger
    let CID= []
    CityObj.forEach(x=>{
      CID.push(x.value)
    })
    this.customerService.GetWarehouseListForTargetV2(CID).subscribe(x=>{ 
      if(this.WHList==undefined)
      {
        this.WHList=[]
        this.warehouseObj=[]
        this.WHList=x  
        this.warehouseObj =x 
        this.WareHouseList=x
      }
      
      this.WHList.forEach(element => {
      this.WareHouseIdsList.push(element.value)
      })
      var Payload={ 
        "CityId":CID,
        "WarehouseId":this.WareHouseIdsList }
        debugger;
      this.customerService.GetSkCodeListForTarget(Payload).subscribe(x=>{
        this.SkCodeList=x
      })
      this.warehouseObj = this.WHList
      this.dateValue = new Date()
      this.Search()
    })
    this.skip=0
  }


  GetWarehouse(Cityidlist){
    debugger
    this.WareHouseList=[]
    this.warehouseObj=undefined
    this.skcodeObj = undefined
    this.CityIDD=[];
    Cityidlist.forEach(x=>{
              this.CityIDD.push(x.value)
          })
          console.log(this.CityIDD,"fsdf");
  
    this.customerService.GetWarehouseListForTargetV2(this.CityIDD).subscribe(x=>{ 
      this.WareHouseList=x
    })
    this.skip=0
  }

  GetSkCode(warehouseidlist){
    debugger
    this.WareHouseIdsList=[];
    this.skcodeObj = []
    warehouseidlist.forEach(element => {
    this.WareHouseIdsList.push(element.value)
    })
    var Payload={ 
      "CityId":this.CityIDD,
      "WarehouseId":this.WareHouseIdsList }
     // debugger;
    this.customerService.GetSkCodeListForTarget(Payload).subscribe(x=>{
      console.log("REsponse  ",x);
      this.SkCodeList=x
      console.log("afterREsponse  ",this.SkCodeList);
    })
  }

  filterSkcode(event) {
  //  debugger;
    this.filteredSkCodes = [];
    let filtered: any[] = [];
    let query = event.query.toUpperCase();
    filtered = this.SkCodeList.filter(skcodeObj=>skcodeObj.skcode.toUpperCase().includes(query) 
    && this.skcodes.indexOf(skcodeObj.skcode.toUpperCase()) < 0)
    this.filteredSkCodes = filtered;
  }

  checkSkCode(skcode){
    this.skcodes=[]
    skcode.forEach(el=>{-
      this.skcodes.push(el.skcode)
    })
  }

  skip:number;
  take:number
  TotalRecords:number
  load(event) {
    debugger
    this.take = event.rows;
    this.skip = event.first;
    this.Search();
  }

  Search(){
    debugger
    if(this.CityObj==undefined) this.showError("please select city first")
    else if(this.warehouseObj==undefined ||this.warehouseObj.length==0) this.showError("please select warehouse first")
    //else if(this.skcodeObj==undefined ||this.skcodeObj.length==0) this.showError("please skcode first")
    else if(this.dateValue==undefined) this.showError("please select date first")
    else{
      this.first=0;
      this.GetTargetData=[];
      this.CityIDD=[];
      this.WareHouseIdsList=[];
      this.CityObj.forEach(element => {
        this.CityIDD.push(element.value)
      });
      this.warehouseObj.forEach(element => {
        this.WareHouseIdsList.push(element.value)
        })
      var Payload={
        "Month":this.datepipe.transform(this.dateValue,'MM'),
        "Year":this.datepipe.transform(this.dateValue,'yyyy'),
        "CityId":this.CityIDD,
        "WarehouseId":this.WareHouseIdsList,
        "SkCode":this.skcodes,
        "Take":this.take,
        "Skip":this.skip
      }  
      this.blocked=true;
      this.customerService.GetCustomerDashboardData(Payload).subscribe((x:any)=>{
        console.log(x);
        if(x!=null){
          if(x.Status==false) { this.blocked=false; this.showError("Target Data Not Found");}
          else  { this.blocked=false;           
          this.GetTargetData=x.GetTargetData.CustomerTargetDashboard;
          this.TotalRecords=x.GetTargetData.TotalCount
        }
          console.log(this.GetTargetData);  
        }     
      },(err: any) => {
        this.blocked = false;
        console.log(err); this.showError(err.error.Message)})
    }
  }
  

  space(event) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault();
    }
  }

  Clear(){
    this.SkCodeList=[]
    this.WareHouseList=[]
    this.warehouseObj=undefined;
    this.CityObj=undefined;
    this.skcodeObj=undefined;
    this.dateValue=undefined;
  }

  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail:msg});
  }

  ExportAll(){
  //  debugger;
    let Wid=[]
    if(this.dateValue==undefined) this.showError("please select date first")
    else{
      this.blocked=true
      this.WHList.forEach(element => {
        Wid.push(element.value)
        })
      this.customerService.ExportAllDashboardData(this.datepipe.transform(this.dateValue,'MM'),this.datepipe.transform(this.dateValue,'yyyy'),Wid).subscribe(res=>{
      console.log(res);
      this.blocked=false
      if(res.Status==false) this.showError("No Data Found")
      else this.exportserv.exportAsExcelFile(res.GetTargetData,"AllCustomerTargetDashboardExcelFile")
    })}
  }

  Export(){
    if(this.GetTargetData==undefined) this.showError("please search the data first!")
    else if(this.GetTargetData!=null && this.GetTargetData!=undefined && this.GetTargetData.length>0){
      this.blocked=true
      this.exportserv.exportAsExcelFile(this.GetTargetData,"CustomerTargetDashboardReport")
      this.blocked=false;
    }else if(this.GetTargetData.length==0) this.showError("Data Not Found!")
    else this.showError("Something Went Wrong")
  }

}





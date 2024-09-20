import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { MisreportService } from '../Service/misreport.service';
import { json } from 'd3';
import { getJSON } from 'jquery';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';

@Component({
  selector: 'app-account-mis-report',
  templateUrl: './account-mis-report.component.html',
  styleUrls: ['./account-mis-report.component.scss']
})
export class AccountMIsReportComponent implements OnInit {

  constructor(private _service :ItemClassificationIncentiveReportService,private MIsService :MisreportService,public datepipe: DatePipe,
    private msg:MessageService,private exportserv:ExportServiceService,private customerService:CustomerService,private pepolePilotService:PepolePilotService) { }

    insertDate:any
    CityList:any;
    selectedCity:any;
    stateList:any;
    warehouseList:any;
    StoreList:any;
    StoreId:any;
    dateValue:any
    warehouseObj:any
    blocked=false
    MISReport:any
    StateIDD:any;
    selectedState:any;
    CityIDD:any;
    getRoleData:any;
    Role:boolean=true;
    peoplerole: any;
    ngOnInit() { 
      debugger;
    //   this.getRoleData = (JSON.parse(localStorage.getItem('tokenData')).rolenames).split(',');
    //  var rRole = 'MIS Lead' || 'HQ Master login';
    //  var getHrRoleName = this.getRoleData.find(x => x == rRole);
    //  if(getHrRoleName == undefined){
    //   this.Role = false;
    //  }else{
    //   this.Role = true;
    //  }
    this.peoplerole = localStorage.getItem('role');
    console.log('peoplerole',this.peoplerole);
    let roleList = this.peoplerole.split(',');
    
    for (var i in roleList) {
      if (roleList[i] == 'MIS Lead'||roleList[i] == 'HQ Master login') {
        this.Role = true;
        this.GetState(); 
        return;
      } else {
        this.Role = false;
        this.GetState(); 
      }
    }
    }

    GetState()
    {
      this.pepolePilotService.States().subscribe(result => {
        this.stateList = result;
        console.log('this.stateList :', result);
      });
      this.CityList=[];
      this.selectedCity=undefined;
      this.warehouseList=[];
      this.warehouseObj=undefined;

    }  
    
    getCities(selectedState){
      debugger;
      this.warehouseList=[];
      this.warehouseObj=undefined;
      this.selectedCity=undefined;
	  this.StateIDD=[];
      this.selectedState.forEach(x=>{
            this.StateIDD.push(x.Stateid)
        }) 
        this.blocked=true;
        this.MIsService.GetMultipleCities(this.StateIDD).subscribe(res=>{  
          this.CityList=res;
          this.blocked=false;
          console.log(this.CityList);
      })
    }

    // getCities(){
    //   this.CityList=[]
    //   this._service.GetAllCityNew().subscribe(res=>{
    //     this.CityList=res;
    //     console.log(this.CityList);
    //   })
    // }


    getWarehouseByCityId(selectedCity){
        debugger
        this.warehouseObj=[] 
        this.warehouseList=[]
        this.CityIDD=[];
        this.selectedCity.forEach(x=>{
            this.CityIDD.push(x.value)
        })       
        this.blocked=true;
        this.customerService.GetWarehouseListForTargetV2(this.CityIDD).subscribe(x=>{ 
          this.warehouseList=x
          this.blocked=false;;
        })
        //this.skip=0
    }
    
    Search(){
      debugger;
      if(this.selectedState==undefined || this.selectedState.length==0) this.showError("select State first!")
      else if(this.selectedCity==undefined || this.selectedCity.length==0) this.showError("select City first!")
      else if(this.warehouseObj.length==0 ||this.warehouseObj ==undefined) this.showError("select Warehouse first!")
      else if(this.dateValue==undefined ) this.showError("select Month first!")
      else if(this.dateValue[0]!=undefined &&  this.dateValue[1]==undefined ) this.showError("select Month Range first!")
      else{
        this.MISReport=[]
        const warehouseIds:any=[];
        this.warehouseObj.forEach((e:any)=>{
            warehouseIds.push(e.value);
        })
        var ReportFilterDc={    
            "WarehouseIds":warehouseIds,
            "startDate": moment(this.dateValue[0]).format("L"), 
            "endDate": moment(this.dateValue[1]).format("L"), 
        }
        console.log(ReportFilterDc);
        this.blocked=true;
        this.MIsService.GetAccountMISData(ReportFilterDc).subscribe((res:any)=>{
          this.blocked=false;    
          debugger;     
          if(res==null || res=="[]" ) this.showError("Data Not Found!")
          else{
          this.MISReport=JSON.parse(res);
          console.log("this.MISReport",this.MISReport);
          if(this.MISReport.length>0){
            this.frozenCols = [
              { field: 'CityName', header: 'CityName' },
              { field: 'WarehouseName', header: 'WarehouseName' },
              { field: 'Particulars', header: 'Particulars' }
              ];
              const filteredKeys = Object.keys(this.MISReport[0]).filter(key => key !== "CityName" && key !== "WarehouseName" && key !== "Particulars");
              this.scrollableCols=[];
              for(var i=0; i<filteredKeys.length;i++){
                var obj ={ field: filteredKeys[i], header:filteredKeys[i] }
              this.scrollableCols.push(obj);
              }
              console.log(this.scrollableCols,this.frozenCols,filteredKeys);
          }
          }
        })
      }
    }
    frozenCols:any
    scrollableCols:any[]
    
    showError(msg1:string){
      this.msg.add({severity:'error', summary: 'Error', detail:msg1});
    }
  
    showSuccess(msg1:string){
      this.msg.add({severity:'success', summary: 'Success', detail:msg1});
    }
  
    Clear(){
      debugger
      this.dateValue=undefined;this.warehouseObj=undefined; this.selectedCity=undefined;this.selectedState=undefined
      this.warehouseList=[];
    }
    
    Export(){
      debugger
      if(this.MISReport==undefined || this.MISReport.length==0 ) this.showError("please search the data first!")
      else if(this.MISReport!=null && this.MISReport!=undefined && this.MISReport.length>0){
        console.log((this.MISReport));

        this.blocked=true;
          this.exportserv.exportAsExcelFile(this.MISReport,"AccountMISReport")
          this.blocked=false;
      }
    }

    ExportAll(){
      if(this.dateValue==undefined) this.showError("select Month first!")
      else if(this.dateValue[0]!=undefined &&  this.dateValue[1]==undefined ) this.showError("select Month Range first!")
      else{
        const payload =
        {
          "WarehouseIds":[],
          "startDate": moment(this.dateValue[0]).format("L"), 
          "endDate": moment(this.dateValue[1]).format("L"), 
        }
        this.blocked=true;
        this.MIsService.ExportAllAccountMISData(payload).subscribe(result => {
          debugger;
          this.blocked=false        
          if(result.Status==false) this.showError(result.Message)
          else{
            this.blocked=false;
            window.open(result.Message);
          }
            console.log(result);
        });
      }
    }

    SelectInsertDate()
    {
      this.ShowInsertCalen=true;
    }
    ShowInsertCalen:boolean=false;
    Insert()
    {
      debugger;
      if(this.insertDate!=undefined)
      {
        var date = this.insertDate;
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let D = moment(firstDay).format("L");
        this.blocked=true;
        this.MIsService.InsertAccountMISData(D).subscribe(res=>{
          console.log(res);
          this.ShowInsertCalen=false;
          if(res.Status==true)
          {
            this.showSuccess(res.Message);
            this.blocked=false;
            this.insertDate=undefined;
          }
          else{
            this.showError(res.Message);
            this.blocked=false;
            this.insertDate=undefined;
          }          
        })
      }
      else{
        this.blocked=false;
        this.showError("Please Select MOnth");
      }
    }

    Close()
    {
      this.ShowInsertCalen=false;
      this.insertDate=undefined;
    }
  }

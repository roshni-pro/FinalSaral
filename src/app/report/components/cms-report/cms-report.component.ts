import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { CmsServiceService } from 'app/report/services/cms-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { debug } from 'console';

@Component({
  selector: 'app-cms-report',
  templateUrl: './cms-report.component.html',
  styleUrls: ['./cms-report.component.scss']
})
export class CmsReportComponent implements OnInit {
  
  //warehouselist 
  warehouseList: any[];

  // cmskeyname:any[]=[];

  //selectedwarehouse=warehouseid
  warehouseId: any
  selectedwarehouse:any;

  //selected warehouse list
  selectedwarehouselist:any;

  //for 2 month validation 
  startDate:Date=null;
  endDate:Date=null;
   Difference_In_Days:any=''

  //loader
  blocked=false;

  flag=false;

  //error toast msgs
  msg:string=""

  //search result
  cmsdata:any[]=[];
  display:boolean=false

  data:any=[]
  first : number=0;

  constructor(private warehouseService: WarehouseService,private cmsrepo:CmsServiceService ,private exportService:ExportServiceService,
    private messageService: MessageService) 
  {
  this.warehouseId=0
 
  }

  ngOnInit()
   { 
    this.getSpecificWarehouses();
    }

  showError(msg:string)
   {
    this.messageService.add({severity:'error', summary: 'Error', detail: msg});
   }

  private async getSpecificWarehouses() {
    //  this.warehouseService.getSpecificWarehouses().subscribe(result =>{
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result
      this.warehouseId = result[0].WarehouseId;
      //this.GetWarehouseWiseManualEdit();
      //this.dataTableComponent.reset();
    });
 }


dateverify:boolean=false
 dateDiff()
 {
  var date1 = new Date(this.startDate);
  var date2 = new Date(this.endDate);
  var Difference_In_Time = date2.getTime() - date1.getTime();
  this. Difference_In_Days = Difference_In_Time / (1000*3600*24);
  if(this.Difference_In_Days>60){   
    this.msg="please select max 2month data"
     this.showError(this.msg);
     return this.chck=false
  }
  else{}
  if(this.Difference_In_Days<0)
  {
    this.msg="please select valid date"
    this.showError(this.msg);
    return this.chck=false
    
  }
  else{return this.chck=true}
   
}

chck:any=false

Searchbtn()
{
  if(!this.chck){ 
  this.warehouseverify();
  if(this.chck){this.startdateverify();}
  if(this.chck=='end'){this.enddateverify();}
  if(this.chck=='date'){this.dateDiff();}
  }
  if(this.selectedwarehouselist && this.startDate && this.endDate &&this.Difference_In_Days<=60)
    {
      this.blocked = true;
      this.selectedwarehouse=this.selectedwarehouselist.map(function(el){
      return el.WarehouseId
      });
      const payload={
      'Warehouseids':this.selectedwarehouse, 
      'fromdate' :this.startDate,
      'todate':this.endDate
                    }
                    this.first = 0;
    this.cmsrepo.SearchCmsReport(payload).subscribe(res=>{
    console.log("cms data",res);
    this.cmsdata=res 
    this.flag=true;
    this.blocked = false;
    });
  }
}

warehouseverify(){ 
  if(this.selectedwarehouselist == 0 || this.selectedwarehouselist == undefined){
    this.msg="please select Warehouse"
    this.showError(this.msg);
    return this.chck=false
  }    
  else
  {
    return this.chck=true
  } 
}

startdateverify()
{
  if(this.startDate==null || !this.startDate)
  {
    this.msg="please select start date"
    this.showError(this.msg);
    return this.chck=false
  }
  else
  {
    return this.chck='end'
  } 
}

enddateverify()
{
  if(this.endDate==null || !this.endDate)
  {
    this.msg="please select end date"
    this.showError(this.msg);
    return this.chck=false
  }  
  else
  {
    return this.chck='date'
  }  
}


Refresh()
{

  window.location.reload();
}
 getStart(id) {
    this.startDate = id;

  }

  getEnd(id) {
    this.endDate = id;
 }

  
 loadfuntion() {
    this.display = true;
    this.cmsdata = null;
   this.Searchbtn();
 }

 //export service call
 exportdata:any
  Export(){

    this.exportdata=this.cmsdata.map(function(el){
      
      return{'Warehouseid':el.Warehouseid,
      'WarehouseName':el.WarehouseName,
      'BOD':el.BOD,
      'opening':el.opening,
      'CashCollection':el.CashCollection,
      'Bank':el.Bank,
      'ExchangeIn':el.ExchangeIn,
      'ExchangeOut':el.ExchangeOut,
      'Closing':el.Closing,
      'onlineCollectionAmount':el.onlineCollectionAmount,
      'CashExchangeComments':el.CashExchangeComments
    } 
     })
     this.exportService.exportAsExcelFile(this.exportdata,"CMS-REPORT-DATA");
 }

}

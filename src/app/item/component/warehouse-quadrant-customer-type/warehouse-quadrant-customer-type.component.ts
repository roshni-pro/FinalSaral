import { Component, OnInit } from '@angular/core';
import { WarehouseQuadrantCustomerTypeServiceService } from 'app/item/services/warehouse-quadrant-customer-type-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-warehouse-quadrant-customer-type',
  templateUrl: './warehouse-quadrant-customer-type.component.html',
  styleUrls: ['./warehouse-quadrant-customer-type.component.scss']
})
export class WarehouseQuadrantCustomerTypeComponent implements OnInit {

  constructor(private loaderService: LoaderService,private _service:WarehouseQuadrantCustomerTypeServiceService
    , private exportService: ExportServiceService,) 
  { }

  ngOnInit() {
    this.getWarehouse();
  }
 Visible:Boolean=false;
 SelectedId:any;
 Warehouselist:any;
SearchList:any;
SelectedQuadrant:any;
CustomerType:any;
MarginValue:any;
UpdateResult:any=false;
StoreUpdateResult:any=false;
IsExport:Boolean=false;
storelist:any;
SelectedStore:any;
skip:number=0;
take:number=10
totalRecords:number=0
load(event) {
  this.take = event.rows;
  this.skip = event.first; 
  if(this.SelectedId !=null)
  {
    this.Search();
  } 
  
}
 

 getWarehouse() 
 {
  this.loaderService.loading(true);
  this._service.getWarehouseCommon().subscribe(res => {
    this.Warehouselist = res;
   this.loaderService.loading(false);
  })
}

getStorebyQuadrant(){
  this._service.getStoreQuadrantWise(this.SelectedQuadrant).subscribe(res=>{
    this.storelist=res;
  })
}
Search()
{
  if(this.SelectedId == undefined || this.SelectedId == null)
  {
    alert("Please select Warehouse");
  }
  else if(this.SelectedStore==undefined || this.SelectedStore==null){
    alert("Please select stores!");
    console.log(this.SelectedStore)
  }
  else
  {
    let WarehouseId =[]
    if(this.SelectedId!=undefined){
    this.SelectedId.forEach(element => {
      WarehouseId.push(element.value)
    });}

    let StoreId=[]
    if( this.SelectedStore && this.SelectedStore.length>0){
      this.SelectedStore.forEach(element => {
        StoreId.push(element.Id)
      });
    }
    const payload =
    {
     
      "WarehouseIDs":WarehouseId,
      "StoreIDs":StoreId,
      "Quadrant":this.SelectedQuadrant,
      "CustomerType":this.CustomerType,
      "Margin":0,
      "skip":this.skip,
      "take":this.take
    }
    this.loaderService.loading(true);
  this._service.GetWarehouseQuadrant(payload).subscribe(res=>{
    this.SearchList=res;
    this.loaderService.loading(false);
    if(this.SearchList != null && this.SearchList != undefined && this.SearchList.length > 0)
    {
      this.totalRecords=this.SearchList[0].TotalRecords;
    }
    else 
    {
      alert("Data not found");
      this.totalRecords=0;
    }
    this.loaderService.loading(false);
  })
}
}


Update()
{
  debugger
  console.log(this.SelectedStore)  
  if(this.SelectedId == undefined || this.SelectedId == null)
  {
    alert("Please select Warehouse");
  }
  else if(this.SelectedStore==undefined || this.SelectedStore==null){
    alert("Please select stores!");
    console.log(this.SelectedStore)
  }
  else if(this.SelectedQuadrant == undefined || this.SelectedQuadrant == null)
  {
    alert("Please select Quadrant");
  }
  else if(this.CustomerType == undefined || this.CustomerType == null)
  {
    alert("Please select CustomerType");
  }
  else if(this.MarginValue == undefined || this.MarginValue == null || this.MarginValue == 0)
  {
    alert("Please Fill Margin Value");
  }
  else if(this.SelectedStore==undefined || this.SelectedStore==null){
    alert("Please select stores!");
    console.log(this.SelectedStore)
  }
  else
  {
    alert("Are You Sure You want to Update Quadrant Margin ?")
    let WarehouseId =[]
    if(this.SelectedId!=undefined){
    this.SelectedId.forEach(element => {
      WarehouseId.push(element.value)
    });}
    let StoreId=[]
    if( this.SelectedStore && this.SelectedStore.length>0){
      this.SelectedStore.forEach(element => {
        StoreId.push(element.Id)
      });
    }

    const payload =
    {
     
      "WarehouseIDs":WarehouseId,
      "StoreIDs":StoreId,
      "Quadrant":this.SelectedQuadrant,
      "CustomerType":this.CustomerType,
      "Margin":this.MarginValue
    }
  this._service.UpdateWarehouseQuadrant(payload).subscribe(res=>{
   this.UpdateResult=res;
   if(this.UpdateResult.value==false || this.UpdateResult == undefined)
   {
      alert("Not Updated")
   }
   else{
    alert("Updated Sucessfully")
    this.MarginValue="";
    this.SelectedQuadrant="";
    this.CustomerType="";
    this.Search();
   }
  })
}
}

StoreQuadrantUpdate(id:any,margin:any)
{
  
  if(id > 0 && margin >0)
  {
    this.loaderService.loading(true);
     this._service.UpdateWarehouseStoreQuadrant(id,margin).subscribe(res=>{
      this.StoreUpdateResult=res;
      
      this.loaderService.loading(false);
      alert(this.StoreUpdateResult);
     })
  }
  else
  {
      alert("Please Fill Margin");
  }
}

Export()
{
  
  if(this.SelectedId == undefined || this.SelectedId == null)
  {
    alert("Please select Warehouse");
  }
  
  else
  {
    let WarehouseId =[]
    if(this.SelectedId!=undefined){
    this.SelectedId.forEach(element => {
      WarehouseId.push(element.value)
    });
  }
  let StoreId=[]
  if( this.SelectedStore && this.SelectedStore.length>0){
    this.SelectedStore.forEach(element => {
      StoreId.push(element.Id)
    });
  }

    const payload =
    {
     
      "WarehouseIDs":WarehouseId,
      "Quadrant":this.SelectedQuadrant,
      "StoreIDs":StoreId,
      "CustomerType":this.CustomerType,
      "Margin":0,
     
    }
    this.loaderService.loading(true);
    this._service.WarehouseQuadrantMarginExport(payload).subscribe(res=>{
    this.SearchList=res;
    this.exportService.exportAsExcelFile(this.SearchList, "WarehouseQuadrantMarginDetails");
    this.loaderService.loading(false);
  })
}
}

clear(){
  this.storelist=[];
  this.SearchList=[];
  this.SelectedQuadrant="";
  this.SelectedStore=[];
  
}


}

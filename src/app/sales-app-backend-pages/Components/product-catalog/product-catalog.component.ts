import { Component, OnInit } from '@angular/core';
import { id } from '@swimlane/ngx-charts/release/utils';
import { ProductCatalogService } from 'app/sales-app-backend-pages/Services/product-catalog.service';

import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { ConfigService } from 'app/shared/services/config.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  showCustomList:boolean=false;
  showCustomURL:boolean=false;
  showListItem:boolean=false;
  selectedItemNumberList:any[]=[];
  first: number = 0;
  SectionName:any;
  SectionHindiName:any;
  WarehouseList:any=[];
  tempData:any
  Warehouse:any;
  CategoryList:any=[];
  URL:any=undefined;
  Id:any;
  MainId:any
  ItemNumber:any;
  flag:boolean=false;
  ItemName:any;
  SellingPrice:any;
  WarehouseId:any;
  StoreId:any;
  IsPromotional:any;
  SectionId:any;
  type:any;
  showDialogpop:boolean=false;
  obj:any;
  ItemList:any[];
  itemListShow:any[]=[]
  getSelectedItem:any;
  CustomList :any=null
  Searchby:any
  SaveChangesButton:boolean=true
  block: boolean = false
  Sequence:any

  CustomListData=[
    
    {value:1,label:'Top SKU'},
    {value:2,label:'Promotional'},

 ]
  itemListData:any=[   
    {value:'CustomList',label:'Custom List'},
    {value:'CustomURL',label:'Custom URL'},
    {value:'CustomItem',label:'Custom Item'},
 ]
  
  
  constructor(
    private _Service: SalesAppServiceService,
    private messageService: MessageService,
    private productCatalogService:ProductCatalogService,
    private confirmationService: ConfirmationService)
    { 

     }

     ngOnInit() {
       this.getAllWarehouseList()

      }

  confirm1(rowData) {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.Remove(rowData);
      this.showSuccess(" Deleted Successfully");
    },
    reject: () => {
      this.showError('You have cancelled')
    }
  });
}
Remove(rowData) {
  if(rowData.Id==null)
  {
     this.itemListShow=this.itemListShow.filter(x=>x.ItemNumber!= rowData.ItemNumber)
  }
  else
  {
  this._Service.RemoveNew(rowData.Id).subscribe(res => {
    this.showSuccess("Items Deleted Successfully");
    this.itemListShow=this.itemListShow.filter(x=>x.Id!= rowData.Id)
  }) 

}
}

confirm(rowData) {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.Removee(rowData);
      this.showSuccess(" Deleted Successfully");


    },
    reject: () => {
      this.showError('You have cancelled')
    }
  });
}
Removee(rowData) {
  this.block=true
  this._Service.deleteProductCatalogById(rowData.Id).subscribe(res => {
    this.showSuccess("Items Deleted Successfully");
    this.onWarehouseChange();
    this.block=false
 
  }) 

}

showDialogPop()
{
  if(this.Warehouse==null|| this.Warehouse==undefined  )
  {
    
    this.showError("Please enter Warehouse!")
    return
  }
  if(this.SectionName==null || this.SectionName==undefined || this.SectionName=='')
  {
    this.showError("Please enter Section Name!")
    return;
  }  

  this.showDialogpop=true
  this.itemListShow=[]
  this.ItemList=[]
  this.Searchby=""
  if(this.MainId)
  this.getProdCatItemById()
}

ClearFields()
{
  this.SectionName="";
  this.SectionHindiName = "";
  this.CustomList=[];
  this.type=[];
  this.MainId=null
  this.showCustomList=false
  this.showCustomURL=false
  this.showListItem=false
  this.URL=""
}

getAllWarehouseList() {
  this.block=true
  this.productCatalogService.GetAllWarehouse().subscribe(result => {
    this.WarehouseList = result;
    this.block=false
  })
}
getProdCatItemById() {

  this.productCatalogService.getProdCatItemById(this.Warehouse.WarehouseId,this.MainId).subscribe((result:any) => {
    
    this.itemListShow = result.Data;
    console.log("itemListShow",this.itemListShow);
    
  })
}

onchangecustomlist(obj){
if(obj.value=='CustomList')
{
this.showCustomList=true
this.showCustomURL=false
this.showListItem=false
}
else if(obj.value=='CustomURL')
{
  this.showCustomURL=true
  this.showCustomList=false
  this.showListItem=false
}
else if(obj.value=='CustomItem')
{
  this.showListItem=true
  this.showCustomURL=false
  this.showCustomList=false
}
}

onWarehouseChange()
{
  this.SaveChangesButton=false
  this.productCatalogService.getProductCatalogByWId(this.Warehouse.WarehouseId).subscribe((res:any)=>
    {
      this.CategoryList=res.Data;
      this.ClearFields();
      console.log( "CategoryList",this.CategoryList);
   
      
    })
  
}

Edit(data){
  this.tempData=data
  this.MainId=data.Id;
  this.SectionName = data.SectionName;
  this.SectionHindiName = data.SectionHindiName;
  this.CustomList=data.CustomList;
  this.URL=data.URL
  this.CustomListData.forEach(x=>
    {
      if(x.label==data.CustomList)
      {
        this.CustomList=x;
        
      }
    })
  this.itemListData.forEach(x=>{
    if(x.value== data.Type){
      this.type=x;
      if(x.value=='CustomList')
      {
       this.showCustomList=true;
       this.showCustomURL=false;
       this.showListItem=false;
      }
      else if(x.value=='CustomURL')
      {
        this.showCustomList=false;
        this.showCustomURL=true;
        this.showListItem=false;
      }
      else{
        this.showCustomList=false;
        this.showCustomURL=false;
        this.showListItem=true;
      }
    }

  })
}

getItemList()
  {
     this._Service.GetItemNamePromotions(this.Warehouse.WarehouseId,this.Searchby)
       .subscribe(result => {
         this.ItemList = result;
         console.log("ItemList",this.ItemList);
         
         
         if (this.ItemList == null || this.ItemList == undefined || this.ItemList.length == 0) {
         
         }
       });
   }
   itemcheck:boolean =false
   onchangeItemList(Obj:any)
   {
     Obj.forEach((x:any)=>{
      this.itemcheck=false
      this.itemListShow.forEach((data:any)=>{
        if(data.ItemNumber==x.ItemNumber)
        {
          this.itemcheck=true;
        }
      })
      if(!this.itemcheck)
      {

      const payload = 
      {
        "Id": this.Id  ? this.Id  : null ,
        "ItemNumber":x.ItemNumber,
        "ItemName":x.ItemName ,
        "SellingPrice":x.SellingPrice ,
        "WarehouseId":x.WarehouseId ,
        "StoreId": x.StoreId ? x.StoreId : null ,
        "StoreName": x.StoreName ? x.StoreName : null ,
        "IsPromotional": this.IsPromotional ? this.IsPromotional : null ,
        "SectionId" : x.SectionId ? x.SectionId : null,
        "Type": this.type.value,
        "URL":this.URL,
        "ActiveStatus":x.ActiveStatus
      } 
      this.itemListShow.push(payload)
    }
      
     })
    this.Searchby="";
    this.getSelectedItem=[]

   }
   editableShow:boolean=false
   onSave(){
   console.log(this.tempData,"tempData")
    this.flag=false
    this.Sequence=this.CategoryList?this.CategoryList.length+1:1
    this.showDialogpop=false
    if(this.Warehouse==null )
    {
      this.showError("Please enter Warehouse!")
      return;
    }
    if(this.SectionName==null || this.SectionName==undefined || this.SectionName=='')
    {
      this.showError("Please enter Section Name!")
      return;
    }  
    if(this.type.value=='CustomList' && (this.CustomList.length==0 ||this.CustomList==undefined ||this.CustomList==null)){
      this.showError("Please enter Section CustomList!")
      return;
    }
    if(this.type.value=='CustomURL' && (this.URL=='' ||this.URL==null ||this.URL==undefined)){
      this.showError("Please enter Section URL!")
      return;
    }
 if(this.MainId>0)
 {
    if(this.tempData.SectionName!=this.SectionName)
    {
      this.CategoryList.forEach(x=>
        {
          if(x.SectionName.toUpperCase() == this.SectionName.toUpperCase() || x.SectionName.trim() == this.SectionName.trim() || x.SectionName.toUpperCase().trim() == this.SectionName.toUpperCase().trim())
          {
            this.showError("Section Already Exists")
            this.flag=true;
            return false;
          }
        })
    }
  }
 else
 {
  if(this.CategoryList){
    this.CategoryList.forEach(x=>
      {
        if(x.SectionName.toUpperCase() == this.SectionName.toUpperCase() || x.SectionName.trim() == this.SectionName.trim() || x.SectionName.toUpperCase().trim() == this.SectionName.toUpperCase().trim())
        {
          this.showError("Section Already Exists")
          this.flag=true;
          return false;
        }
      }
      )
    }
 } 
if(!this.flag)
{
    this.selectedItemNumberList=[]
    this.itemListShow.forEach((x,index)=>
      {
        
    let data={
                   'ItemNumber':x.ItemNumber,
                   'Sequence':index+1, 
                   'StoreId':x.StoreId
      }
        this.selectedItemNumberList.push(data)
      })  

    const payload = [
    {
      "Id": this.MainId  ? this.MainId  : null ,
      "ItemName": this.ItemName ? this.ItemName : null ,
      "SectionName": this.SectionName ? this.SectionName : null ,
      "SellingPrice": this.SellingPrice ? this.SellingPrice : null ,
      "WarehouseId":this.Warehouse?this.Warehouse.WarehouseId: null,
      "StoreId": this.StoreId ? this.StoreId : null ,
      "IsPromotional": this.IsPromotional ? this.IsPromotional : null ,
      "SectionId" : this.SectionId ? this.SectionId : null,
      "ItemNumber":this.selectedItemNumberList?this.selectedItemNumberList:null,
      "URL":this.URL&&this.type.value=='CustomURL'?this.URL:null,
      "CustomList": this.type.value=='CustomURL' ?'URL': (this.type.value=='CustomItem' ? 'CustomItem' : this.CustomList.label),
      "Type":this.type?this.type.value:null,
      "Sequence":this.Sequence?this.Sequence:0
    } ]

    this.productCatalogService.insertProductCatalog(payload).subscribe((res)=>
    { 
      console.log("Insert=====",res);
      this.showSuccess("Data Saved");
      this.onWarehouseChange();
      
    }
    ) 
    this.ClearFields();   
  }
}

SaveChanges(){
  this.CategoryList.forEach((element, index) => {
    element.Sequence = index + 1;
  });
  this.productCatalogService.insertProductCatalog(this.CategoryList).subscribe((res)=>
  { 
    console.log("UpdateSequence=====",res);
  }
  )
}
showError(msg1:string){
  this.messageService.add({severity:'error', summary: 'Error', detail:msg1});
}
showSuccess(msg1:string){
  this.messageService.add({severity:'success', summary: 'Success', detail:msg1});
}

}



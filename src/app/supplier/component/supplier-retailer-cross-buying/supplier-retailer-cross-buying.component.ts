import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { SupplierService } from 'app/shared/services/supplier.service';
import { ConfirmationService } from 'primeng/api'
import { Console, log } from 'console';
import { Key } from 'protractor';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-supplier-retailer-cross-buying',
  templateUrl: './supplier-retailer-cross-buying.component.html',
  styleUrls: ['./supplier-retailer-cross-buying.component.scss']
})
export class SupplierRetailerCrossBuyingComponent implements OnInit {
  addSelectedType: any;
  constructor(private Supplierservice:SupplierService,private messageService: MessageService, private confirmationService: ConfirmationService,private loaderService: LoaderService) { }

  ngOnInit() {
    //this.entity = "SupplierRetailerMapping";
  }
 
  typeList:any[]=[
    {
      'Name':"Supplier",
      "Id":1
    },
    {
      'Name':"Retailer/Customer",
      "Id":2
    }
  ]
  totalRecords:number=0;
  skip:number=0;
  take:number=10;
  addSuplierData:any[]=[]
  addRetailerData:any[]=[]
  selectedType:any
  showAdd:boolean=false
  supplierCustomerData:any[]=[]
  SupplierCode:any
  load(event){
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    this.OnSearch();
  }

  
  //entity:any
  OnSearch()
  {
   
    debugger
    
    
    if(this.SupplierCode==undefined){
      if(this.selectedType==undefined){
       this.selectedType={
        "Id": 1,
        "Name":"Supplier"
       }
      }
      this.loaderService.loading(true);
      this.Supplierservice.SupplierRetailerGet(this.selectedType.Id,this.skip,this.take).subscribe(res=>
        {
          this.loaderService.loading(false);
          console.log(res,"res");
          if(res.TotalCount>0){
            debugger
            this.totalRecords = res.TotalCount
            this.supplierCustomerData=res.supplierRetailerGetDCs
          }
          else{
            this.totalRecords = res.TotalCount;
            this.supplierCustomerData=[];
            alert("No data found");
          }
        })
    }
    else{
      // if(this.selectedType==undefined){
      //   alert("Please Select Filter First");
      //   return false;
      // }
      this.loaderService.loading(true);
      this.Supplierservice.SupplierRetailerSpecificSearch(this.selectedType.Id,this.SupplierCode,this.skip,this.take).subscribe(res=>{
        if(res.TotalCount>0){
          this.loaderService.loading(false);
          this.totalRecords = res.TotalCount
          this.supplierCustomerData = res.supplierRetailerGetDCs;
          this.SupplierCode=null;
          //alert("Data Found");
        }
        else{
          this.totalRecords = res.TotalCount
          this.loaderService.loading(false);
          this.supplierCustomerData=[]
          this.SupplierCode=null;
          alert("No Data Found");
        }
      })
    }
    
  }
  confirm1(Id)
  {  
     this.confirmationService.confirm({
       message: 'Are you sure that you want to delete?',
       header: 'Confirmation',
       icon: 'pi pi-exclamation-triangle',
       accept: () => {
        this.OnMasterDelete(Id)
       },
       reject: () => {
       }
   });
  }
  deletetype:any;
  OnMasterDelete(Id)
  {
    this.loaderService.loading(true);
    this.deletetype= this.supplierCustomerData[0].Type=="Supplier"?1:2;
  this.Supplierservice.SupplierRetailerDeleteAllByMasterId(Id,this.deletetype).subscribe(res=>
  {
    this.loaderService.loading(false);
    console.log(res); 
    this.showSuccess(res)
    this.OnSearch()
  })
  }
  showWarn(msg) {
    this.messageService.add({severity:'error', summary:msg });
  }
  showSuccess(msg)
  {
  this.messageService.add({severity:'success', summary: msg})
  }
  AddNewSupplier()
  {
    debugger;
    this.supplierPrimaryKey= null;
    this.supplierMappedKey = null;
    this.customerPrimaryKey=null;
    this.customerMappedKey = null;
    this.issupplierdisable=false;
    this.iscustomerdisable=false;
    this.supplierPrimaryKeyArr=null;
    this.supplierMappedKeyArr=null;
    this.customerPrimaryKeyArr=null;
    this.customerMappedKeyArr=null;
    this.showAdd=true
  }
  supplierMappedKey:any
  supplierPrimaryKey:any
  supplierPrimaryKeyArr:any[]=[]
  supplierMappedKeyArr:any[]=[]
  GetPrimarySupplierListByKey()
  {
    this.loaderService.loading(true);
    this.Supplierservice.SupplierRetailerSupplierSearch(this.supplierPrimaryKey).subscribe(res=>
      {
        console.log(res);
        this.supplierPrimaryKeyArr=res;
        this.loaderService.loading(false);
      })
  }
  GetMappedSupplierListByKey()
  {
    this.loaderService.loading(true);
    this.Supplierservice.SupplierRetailerSupplierSearch(this.supplierMappedKey).subscribe(res=>
      {
        console.log(res);
        this.supplierMappedKeyArr=res;
        this.loaderService.loading(false);
      })
  }
  selectedMapped:any
  selectedPrimary:any
  showSupplierData:any[]=[]
  issupplierdisable:boolean=false;
  AddSupplier()
  {
    debugger
   
    if(this.selectedPrimary.SupplierId==this.selectedMapped.SupplierId){
      alert("Mapped Supplier not be Primary Supplier");
      return false;
    }
    var data = this.showSupplierData.filter(x=>x.MappedId == this.selectedMapped.SupplierId);
    if(data.length >0){
      alert("Already Exists");
      return false;
    }
    else{
      var obj=
      {
        'MasterId':this.selectedPrimary.SupplierId,
        'MappedId':this.selectedMapped.SupplierId,
        'Type':this.selectedType,
        'PrimaryName':this.selectedPrimary.SupplierName,
        'MappedName':this.selectedMapped.SupplierName
      }
      this.showSupplierData.push(obj)
      this.issupplierdisable=true;
    }
    console.log(this.showCustomerData);

  }
  OnSubmit(addSelectedType)
  {
    debugger
    if(addSelectedType==1){
      if(this.showSupplierData.length ==0){
        alert("Please Select At Least One Primary and Mapped Supplier");
      }
      else{
        debugger
        console.log(this.showSupplierData);
        this.showSupplierData.forEach(x=>{
          x.Type=addSelectedType;
        })
        console.log(this.showSupplierData);
        this.loaderService.loading(true);
        this.Supplierservice.SupplierRetailerAdd(this.showSupplierData).subscribe(res=>{
          if(res == "Add Successfully"){
            debugger
            this.showSuccess(res);
            this.showAdd=false;
            this.showSupplierData=[];
            this.supplierPrimaryKey=null;
            this.supplierMappedKey=null;
            this.loaderService.loading(false);
            this.OnSearch();
          }
          else{
            alert(res);
            this.loaderService.loading(false);
          }
        })
      }
    }
    if(addSelectedType==2){
      if(this.showCustomerData.length ==0){
        alert("Please Select At Least One Primary and Mapped Supplier");
      }
      else{
        debugger
        console.log(this.showCustomerData);
        this.showCustomerData.forEach(x=>{
          x.Type=addSelectedType;
        })
        console.log(this.showCustomerData);
        this.loaderService.loading(true);
        this.Supplierservice.SupplierRetailerAdd(this.showCustomerData).subscribe(res=>{
          if(res == "Add Successfully"){
            this.showSuccess(res);
            this.showAdd=false;
            this.showCustomerData=[];
            this.customerPrimaryKey=null;
            this.customerMappedKey=null;
            this.loaderService.loading(false);
            this.OnSearch();
          }
          else{
            alert(res);
            this.loaderService.loading(false);
          }
        })
      }
    }
    
  }

  EditAdd:boolean=false
  EditsupplierCustomerData:any[]=[]
  addnewmappingdata:any;
  dataselecttype:any
  edit(Id){
    debugger
    console.log(this.supplierCustomerData);
    this.addnewmappingdata = this.supplierCustomerData.filter(x=>x.MasterId==Id);
    console.log(this.addnewmappingdata)
    this.dataselecttype= this.supplierCustomerData[0].Type=="Supplier"?1:2;
    //alert(this.dataselecttype);
    this.loaderService.loading(true);
    this.Supplierservice.SupplierRetailerDataByMasterId(Id,this.dataselecttype).subscribe(res=>{
      debugger
      if(res.length >0){
        this.EditAdd=true;
        this.EditsupplierCustomerData=res;
        console.log("data",this.EditsupplierCustomerData);
        
        this.loaderService.loading(false);
      }
      
      
    })
  }
  confirm2(Id,MasterId)
  {  
     this.confirmationService.confirm({
       message: 'Are you sure that you want to delete?',
       header: 'Confirmation',
       icon: 'pi pi-exclamation-triangle',
       accept: () => {
        this.OnMappedDelete(Id,MasterId)
       },
       reject: () => {
       }
   });
  }
  OnMappedDelete(Id,MasterId)
  {
    this.loaderService.loading(true);
  this.Supplierservice.SupplierRetailerDeleteById(Id).subscribe(res=>
  {
    console.log(res); 
    if(res =="Delete Successfully"){
      this.loaderService.loading(false);
      this.showSuccess(res)
      this.edit(MasterId)
    }
    else{
      this.showWarn(res)
      this.loaderService.loading(false);
    }
    
    
  })
  }
  addnewmappingsupplier:boolean=false;
  addnewmappingcustomer:boolean=false;
  suppliercustomertype:any;
  suppliercustomername:any;
  Add(){
  //console.log(item);
   this.EditAdd=false; 
   this.customerMappedKey=null;
   this.supplierMappedKey=null;
   this.supplierMappedKeyArr=null;
   this.supplierPrimaryKeyArr=null;
   this.customerMappedKeyArr=null;
   this.customerPrimaryKeyArr=null;
   console.log(this.addnewmappingdata);
   
    this.suppliercustomertype= this.addnewmappingdata[0].Type;
    this.suppliercustomername=this.addnewmappingdata[0].Name;
     if(this.suppliercustomertype=="Supplier"){
      this.addnewmappingsupplier=true;
     }
     if(this.suppliercustomertype=="Customer"){
      this.addnewmappingcustomer=true
     }
  }

  customerMappedKey:any
  customerPrimaryKey:any
  customerPrimaryKeyArr:any[]=[]
  customerMappedKeyArr:any[]=[]
  CustomerMapped:any
  CustomerPrimary:any
  GetMappedCustomerListByKey()
  {
    this.loaderService.loading(true);
    this.Supplierservice.CustomerRetailerSupplierSearch(this.customerMappedKey).subscribe(res=>
      {
        console.log(res);
        this.customerMappedKeyArr=res
        this.loaderService.loading(false);
      })
  }
  GetPrimaryCustomerListByKey()
  {
    this.loaderService.loading(true);
    this.Supplierservice.CustomerRetailerSupplierSearch(this.customerPrimaryKey).subscribe(res=>
      {
        console.log(res);
        this.customerPrimaryKeyArr=res
        this.loaderService.loading(false);
      })
  }
  showCustomerData:any[]=[]
  iscustomerdisable:boolean=false;
  AddCustomer()
  {
    debugger
    if(this.CustomerPrimary.CustomerId==this.CustomerMapped.CustomerId){
      alert("Mapped Customer not be Primary Customer");
      return false;
    }
    var data = this.showCustomerData.filter(x=>x.MappedId == this.CustomerMapped.CustomerId);
    if(data.length >0){
      alert("Already Exists");
      return false;
    }
    else{
      var obj=
      {
        'MasterId':this.CustomerPrimary.CustomerId,
        'MappedId':this.CustomerMapped.CustomerId,
        'Type':this.selectedType,
        'PrimaryName':this.CustomerPrimary.ShopName,
        'MappedName':this.CustomerMapped.ShopName
      }
      this.iscustomerdisable=true;
      this.showCustomerData.push(obj)
    }
    

  }
 
  DeleteMappedSupplier(name){
debugger
   
     this.showSupplierData = this.showSupplierData.filter(obj =>  obj.MappedName !== name);
     this.showSuccess("Data Deleted");
     if(this.showSupplierData.length==0){
      this.issupplierdisable=false;
     }
    //   this.mappeddata = this.showSupplierData.filter(x=>x.MappedName == name).indexOf(Key,0);
    //  this.showSupplierData.splice(this.mappeddata);
     //console.log(this.showSupplierData);
     
     

  }
  DeleteMappedCustomer(name){
    debugger
       
         this.showCustomerData = this.showCustomerData.filter(obj =>  obj.MappedName !== name);
         this.showSuccess("Data Deleted");
         if(this.showCustomerData.length==0){
          this.iscustomerdisable=false;
         }
        //   this.mappeddata = this.showSupplierData.filter(x=>x.MappedName == name).indexOf(Key,0);
        //  this.showSupplierData.splice(this.mappeddata);
         //console.log(this.showSupplierData);
         
         
    
      }
Type:any
onSaveSupplier(){
  debugger
  console.log(this.addnewmappingdata);
  
  // this.suppliercustomertype= this.addnewmappingdata[0].Type;
  // this.suppliercustomername=this.addnewmappingdata[0].Name;
  
  // console.log(this.suppliercustomertype);
  // console.log(this.suppliercustomername);
  // console.log(this.selectedMapped.SupplierId);

  if(this.addnewmappingdata[0].Type == "Supplier"){
    this.Type=1
  }
  if(this.selectedMapped == null || this.selectedMapped == undefined){
    alert("Please Select At least One Mapped Supplier");
    return false;
  }
  if(this.selectedMapped.SupplierId >0){
this.loaderService.loading(true);
var obj=
{
  'MasterId':this.addnewmappingdata[0].MasterId,
  'MappedId':this.selectedMapped.SupplierId,
  'Type':this.Type
}
this.Supplierservice.SupplierRetailerAddNew(obj).subscribe(res=>{
  if(res == "Add Successfully"){
    debugger

    this.showSuccess(res);
    this.OnSearch();
    this.loaderService.loading(false);
    
    this.showSupplierData=[];
            this.supplierPrimaryKey=null;
            this.supplierMappedKey=null;
            this.addnewmappingsupplier=false;
  }
  else{
alert(res);
this.loaderService.loading(false);
  }
})

  }

  
  
}
    
onSaveCustomer(){
  debugger
  console.log(this.addnewmappingdata);
  
  // this.suppliercustomertype= this.addnewmappingdata[0].Type;
  // this.suppliercustomername=this.addnewmappingdata[0].Name;
  
  // console.log(this.suppliercustomertype);
  // console.log(this.suppliercustomername);
  // console.log(this.selectedMapped.SupplierId);

  if(this.addnewmappingdata[0].Type == "Customer"){
    this.Type=2
  }
  if(this.CustomerMapped == null || this.CustomerMapped == undefined){
    alert("Please Select At least One Mapped Supplier");
    return false;
  }
  if(this.CustomerMapped.CustomerId >0){
this.loaderService.loading(true);
var obj=
{
  'MasterId':this.addnewmappingdata[0].MasterId,
  'MappedId':this.CustomerMapped.CustomerId,
  'Type':this.Type
}
this.Supplierservice.SupplierRetailerAddNew(obj).subscribe(res=>{
  if(res == "Add Successfully"){
    debugger
    this.showSuccess(res);
    this.loaderService.loading(false);
    this.OnSearch();
    this.addnewmappingcustomer=false;
    this.showCustomerData=[];
            this.customerPrimaryKey=null;
            this.customerMappedKey=null;
  }
  else{
this.showWarn(res);
this.loaderService.loading(false);
  }
})

  }

  
  
}
// history(id){
//   alert(id);
  
// }
// historyDetail: any;
// HistoryView: boolean = false;
// isDetails: boolean;
// openHistory(d, e) {
//   // 
//   this.historyDetail = d;
//   this.HistoryView = true;
//   this.isDetails = true;
// }
OnSpecificSearch(){
  debugger
  console.log(this.SupplierCode);
  
  if(this.selectedType==undefined){
    alert("Please Select Filter First");
    
  }
  else{
   
    if(this.SupplierCode == undefined){
      alert("Please Write Keyword");
    }
    else{
      this.Supplierservice.SupplierRetailerSpecificSearch(this.selectedType.Id,this.SupplierCode,this.skip,this.take).subscribe(res=>{
        if(res.TotalCount>0){
          this.totalRecords = res.TotalCount
          this.supplierCustomerData = res.supplierRetailerGetDCs;
          this.SupplierCode=null;
          //alert("Data Found");
        }
        else{
          this.supplierCustomerData=[]
          this.SupplierCode=null;
          this.totalRecords = res.TotalCount
          alert("No Data Found");
        }
      })
    }
    
  }
  
}
}

import { Component, OnInit } from '@angular/core';
import { GitConfigurationService } from 'app/item/services/git-configuration.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';
import{Message }from 'primeng/api';
import { exportdata } from 'app/Digital-Sales/digital.module';
import { environment } from "environments/environment";
@Component({
  selector: 'app-git-configuration-for-lead',
  templateUrl: './git-configuration-for-lead.component.html',
  styleUrls: ['./git-configuration-for-lead.component.scss']
})
export class GitConfigurationForLeadComponent implements OnInit {
  Groups:any;
  Brands:any;
  subSubCategoryList:any;
  file:File;
  myfiles:any=[];
  selectedStore:any;
  selectedBrand:any;
  Keyword:string='';
  itemName:string='';
  isEdit:boolean=false;
  isHistory:boolean=false;
  isAdd:boolean=false;
  isDelete:boolean=false;

  searchData:any;
  Brand:any;
  ShowTypes:any="";

  entity: any;
  Id:number;
  skip:number=0;
  take:number=10;
  totalRecords:number=0;

  msg:Message[];
  messages: Message[];
  AddData:InsertJITConfigDc;
  Editdata:EditJITConfigDc;
 
  constructor(private GitConfig:GitConfigurationService,
    private ExpConfig:ExportServiceService,
    private MsgConfig:MessageService,
    private LoaderConfig:LoaderService
    ) { }

  ngOnInit() {
    this.entity = 'JITConfiguration';
    this.getGroups();
    this.AddData={
      "BrandId":0,
      "ShowType":'',
      "Percentage":0
    }
    this.Editdata={
      "Id":0,
      "ShowType":'',
      "BrandId":0,
      "BrandName":'',
      "Percentage":0,
      "Active":false
    }
  }

  getGroups(){
    this.LoaderConfig.loading(true);
    this.GitConfig.getStoreList().subscribe(res=>{
      this.Groups=res;
      this.LoaderConfig.loading(false);
      console.log(res);
      
    })
  }

  getBrandbyGroupId(){
    this.LoaderConfig.loading(true);
    this.GitConfig.GetSubSubCategory(this.selectedStore.Id).subscribe(res=>{
      this.Brands=res;
      this.subSubCategoryList=res;
      console.log(this.Brands);
    this.LoaderConfig.loading(false);

    })
  }

  //download file button
  DownloadFile(){
    if((this.selectedStore && this.selectedStore.Id) || (this.selectedBrand && this.selectedBrand.BrandId)){
      
      let payload:BrandListVm={
        "StoreId":this.selectedStore.Id,
        "BrandId":[]
      }
      this.selectedBrand.forEach(element => {
        payload.BrandId.push(element.BrandId);
      });
      this.LoaderConfig.loading(true);
      this.GitConfig.getDataforGroup(payload).subscribe(res=>{
        console.log("ExportData",res);
        this.ExpConfig.exportAsExcelFile(res,"BrandList");
        this.LoaderConfig.loading(false);
      })
    }
    else{
      this.MsgConfig.add({ severity: 'warn', summary: 'Warning', detail: 'Select Group / Brand !' });
    }    
  }

  //upload donwloaded file
  Upload(files: any){
    this.file = files.files;
    console.log('file',this.file);
    var reader = new FileReader();
    reader.readAsDataURL(files.files[0]); 
    reader.onload = (_event) => { 
  }
  let formData = new FormData();
  formData.append('file',this.file[0]) 
  
  this.LoaderConfig.loading(true);
  this.GitConfig.uploadExcel(formData).subscribe((res:any)=>{
    console.log(res);
    this.LoaderConfig.loading(false);
    if(res !='File extnsion required .xlsx' && res != 'Showtype cannot be null!')
    {
      this.MsgConfig.add({ severity: 'success', summary: 'Success', detail: res });
    }else{
      this.MsgConfig.add({ severity: 'error', summary: res, detail: '' });
    }
    
    this.getExcelList();
    this.myfiles=[];
   })
  }


  //add new row button
  addNewRow(){
    if(this.Brand && this.AddData.ShowType && this.AddData.Percentage && this.AddData.Percentage<=100 && this.AddData.Percentage>0 ){
      this.AddData.BrandId=this.Brand?this.Brand.BrandId:0;
      this.LoaderConfig.loading(true);
      this.GitConfig.insertBrandConfig(this.AddData).subscribe((res:any)=>{
        console.log(res);
        if(res.Status==true){
          this.LoaderConfig.loading(false);
          // alert(res.Message);
          this.MsgConfig.add({ severity: 'success', summary: 'Success', detail: res.Message });
          this.getExcelList();
        }
        else{
          this.LoaderConfig.loading(false);
          this.MsgConfig.add({ severity: 'error', summary: 'error', detail: res.Message });
        }
      })
      this.isAdd=false;
    }
    else{
      if(!this.Brand){
        this.messages = [{ severity: 'warn', summary: 'select brand', detail: '' }];
      }
      else if(!this.AddData.ShowType)
      {
        this.messages = [{ severity: 'warn', summary: 'select showtype', detail: '' }];
      }
      else if(this.AddData.Percentage>100 || this.AddData.Percentage<0){
        this.messages = [{ severity: 'warn', summary: 'Enter percentage less than 100/greater than 0', detail: '' }];
      }
      else{
        this.messages = [{ severity: 'warn', summary: 'Enter configuration', detail: '' }];
      }
    
    }
   
  }

  isEditDialog(data){
    this.Editdata.Id=data.Id; this.Editdata.Percentage=data.Percentage; this.Editdata.BrandName=data.BrandName; this.Editdata.ShowType=data.ShowType; this.Editdata.BrandId=data.BrandId;
  }

  //edit row configuration 
  editConfig(){
    //debugger
    if(this.Editdata.Percentage && this.Editdata.ShowType && this.Editdata.Percentage<=100 && this.Editdata.Percentage>0 ){
      this.LoaderConfig.loading(true);
      this.GitConfig.updateBrandConfig(this.Editdata.Id,this.Editdata.Percentage,this.Editdata.ShowType,this.Editdata.BrandId).subscribe((res:any)=>{
        console.log(res);
        if(res.Status==true){
          this.LoaderConfig.loading(false);
          this.MsgConfig.add({ severity: 'success', summary: 'Success', detail: 'succesfully changed!' });
          this.isEdit=false;
          this.getExcelList();
        }
        else{
          this.LoaderConfig.loading(false);
          this.msg = [{ severity: 'error', detail: res.Message }];
        }
      })
    }
    else{
      if(!this.Editdata.Percentage ){
        this.msg = [{ severity: 'warn', summary: 'Enter configuration!', detail: '' }];
      }
      else if(this.Editdata.Percentage>100 || this.Editdata.Percentage<0){
        this.msg = [{ severity: 'warn', summary: 'Enter percentage less than 100/greater than 0!', detail: '' }];
      }
      else{
        this.msg = [{ severity: 'warn', summary: 'select showtype', detail: '' }];
      }
    }
   
  }

  deleteConfig(cmd){
    if(cmd=='Yes'){
      this.LoaderConfig.loading(true);
      this.GitConfig.deleteBrandConfig(this.Editdata.Id).subscribe((res:any)=>{
        if(res.Status==true){
          this.LoaderConfig.loading(false);
          this.MsgConfig.add({ severity: 'success', summary: 'Success', detail: res.Message });
          this.isDelete=false;
          this.getExcelList();
        }
        else{
          this.LoaderConfig.loading(false);
          this.MsgConfig.add({ severity: 'error', summary: 'Success', detail: res.Message });
          this.isDelete=false;
        }
        console.log(res);
      })
    }
    else{
      this.isDelete=false;
    }
  }
  
 

load(event?){
  // debugger
  this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
      this.getExcelList();
}

//for get table data
getExcelList(){
  // this.load(); 
  if(this.selectedBrand && this.selectedBrand.length>0){
    this.LoaderConfig.loading(true);
    let payload:GetJITConfigListDc={
         "BrandId":[],
         "Keyword":this.Keyword,
         "skip":this.skip,
         "take":this.take
    }
    this.selectedBrand.forEach(element => {
      payload.BrandId.push(element.BrandId); 
    });
    
    this.GitConfig.getListconfig(payload).subscribe((res:any)=>{
      this.searchData=res.Data.jITConfigGetLists;
      this.searchData.forEach(e=>{
        e.Status=e.IsActive
      })
      this.totalRecords=res.Data.TotalCount
      if(this.searchData.length==0){
        this.MsgConfig.add({ severity: 'error', summary: 'Warning', detail: 'Data not found!' });
      }
      this.LoaderConfig.loading(false);
      console.log(res);
    })
  }
  else{
    this.MsgConfig.add({ severity: 'error', summary: 'Select Brand', detail:'' });
  }
 
}

//active inactive items
ActiveInactive(Id,IsActive,status){
  IsActive=!status;
  this.LoaderConfig.loading(true);
  this.GitConfig.ActiveInactiveId(Id,IsActive).subscribe((res:any)=>{
  if(res.Status==true){
    this.MsgConfig.add({ severity: 'success', summary: 'Success', detail: res.Message });
    this.LoaderConfig.loading(false);
    this.getExcelList();
  }
  else{
    this.LoaderConfig.loading(false);
    this.MsgConfig.add({ severity: 'error', summary: 'Warning', detail: res.Message });
  }
  
})
}

// for export button
exportdata(){
  if(this.selectedBrand && this.selectedBrand.length>0 && this.selectedStore){
    let payload:BrandListVm={
      "BrandId":[],
      "StoreId":this.selectedStore.Id
  }
  this.selectedBrand.forEach(element => {
   payload.BrandId.push(element.BrandId); 
  });
    this.GitConfig.exportData(payload).subscribe(res=>{
      console.log(res);
      window.open(environment.apiURL + res);
    })
  }
  else{
    this.MsgConfig.add({ severity: 'error', summary: 'Select Store/Brand', detail: '' });
  }
  
  // this.ExpConfig.exportAsExcelFile(this.searchData,"JIT_Configuration");
}

Clear(){
  this.Brand=undefined;
  this.AddData.BrandId=undefined;
  this.AddData.Percentage=null;
  this.AddData.ShowType="";
}

decimalFilter(event: any) {
  const reg = /^-?\d*(\.\d{0,2})?$/;
  let input = event.target.value + String.fromCharCode(event.charCode);

  if (!reg.test(input)) {
      event.preventDefault();
  }
}

}


interface InsertJITConfigDc {
  BrandId: number ;
  ShowType : string;
  Percentage :number;
  // BrandName :string;
}

interface EditJITConfigDc{
  Id:number;
  BrandName:string;
  BrandId:number;
  ShowType : string;
  Percentage :number;
  Active:boolean;
}

interface BrandListVm{
  
  StoreId :number;
  BrandId :any;
}

interface GetJITConfigListDc{
  BrandId:any;
  Keyword:string;
  skip:number;
  take:number;
}
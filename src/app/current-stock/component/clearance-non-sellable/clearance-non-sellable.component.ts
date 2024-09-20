import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';
import { ClearanceNonSellableService } from 'app/current-stock/services/clearance-non-sellable.service';
@Component({
  selector: 'app-clearance-non-sellable',
  templateUrl: './clearance-non-sellable.component.html',
  styleUrls: ['./clearance-non-sellable.component.scss']
})
export class ClearanceNonSellableComponent implements OnInit {
  entity:any;
  Id:number;
  selectedItem:any[]
  ListId:any=[];
  UpdateList:any[]=[]
  searchedData:any
  ClearanceShelfLifeFrom:string
  ClearanceShelfLifeTo:string
  NonSellShelfLifeFrom :string
  NonSellShelfLifeTo:string
  selectedCat:any;
  selectedSubCat:any
  selectedBrand:any
  List:any=[];
  CategoryList:any[]=[]
  SubCategoryList:any[]=[]
  BrandList:any[]=[]
  ItemList:any[]=[]
  Data:any;
  check:boolean
  isBulk:boolean=false;
  IsEdit:boolean=false;
  IsHistory:boolean=false;
  editdata:any=[]
  isLoading:boolean=false;
  isCorrect:boolean=false;
  flag:boolean=false;
  brandname:any;
  constructor(
    private _service:ClearanceNonSellableService,
    private _msg:MessageService,
    private loaderService:LoaderService
    )
     {
      this.getCategoryList();
      this.editdata={
        name: null, code: null
      }
      this.entity='ClearanceNonSaleableShelfConfiguration';
     }
 
  ngOnInit() {
   
  }

  get(){
    if((this.selectedCat==undefined || this.selectedCat.length==0 &&  this.selectedSubCat ==undefined || this.selectedSubCat.length==0&& this.selectedBrand==undefined || this.selectedBrand.length==0 ) || (this.selectedItem==undefined && this.selectedItem.length==0)){
      this.showError("Select dropdowns first !")
      this.check=false;
    }
    else{
      this.List=[];
      if(this.selectedItem.length==this.ItemList.length){
        this.List=['All Items selected'];
      }
      else{
        let copy="";
        if(this.selectedItem && this.selectedItem.length>0)
        {
          this.selectedItem.forEach(e=>{
            this.List.push(e.itemBaseName);
          })
          this.brandname=''
          if(this.List.length>3){
            this.List=['Multiple items selected!']
          }
        }
        else{
          this.brandname=this.selectedBrand.SubsubcategoryName;
        }
       
       
      }
      this.NonSellShelfLifeFrom='';this.NonSellShelfLifeTo='';this.ClearanceShelfLifeTo='';this.ClearanceShelfLifeFrom=''
      if(this.check==true){this.isBulk=true;} else{ this.isBulk=false;}
    }
  }

  OpenDialog(data){
   // console.log("data",data);
      this.IsEdit=true;
      this.editdata=data;
      this.ClearanceShelfLifeFrom=data.ClearanceShelfLifeFrom
      this.ClearanceShelfLifeTo=data.ClearanceShelfLifeTo
      this.NonSellShelfLifeFrom=data.NonSellShelfLifeFrom
      this.NonSellShelfLifeTo=data.NonSellShelfLifeTo
  }

  getHistory(list){
    this.Id=list.Id;
    this.IsHistory=true
  }

  getCategoryList(){
    this.isLoading=true;
    this._service.GetCategoryList().subscribe(res=>{
      this.CategoryList=res;
      //console.log("this.CategoryList",this.CategoryList);
      this.isLoading=false;
    })
  }

  getSubcategory(){
    this.selectedSubCat =[] 
    this.selectedBrand=[]
    if(this.selectedCat==undefined || this.selectedCat.CategoryID ==null){
      this.showError("select category!");
    }
    else{
      this.isLoading=true;
      this._service.getSubCategoryList(this.selectedCat.CategoryID).subscribe(res=>{
        this.SubCategoryList=res;
      //  console.log("this.SubCategoryList",this.SubCategoryList);
        this.isLoading=false;
      })
    }
  }
  getBrand(){
    this.selectedBrand=[]
    this.selectedItem=[]
    if(!this.selectedCat.CategoryID || !this.selectedSubCat.SubCategoryId){
      this.showError("Missing category or subcategory !")
    }
    else{
      this.isLoading=true;
      this._service.getBrand(this.selectedCat.CategoryID,this.selectedSubCat.SubCategoryId).subscribe(res=>{
      this.BrandList=res;
      //console.log("this.BrandList",this.BrandList);
      this.isLoading=false;
      })
    }
  }
  getItems(){
    this.selectedItem=[]
    if(!this.selectedCat.CategoryID|| !this.selectedSubCat.SubCategoryId || !this.selectedBrand.SubsubCategoryid)
    {
      this.showError("Missing category/subcategory/brand!")
    }
    else{
      this.selectedItem=[];
      this.List=[]
      this.isLoading=true;
      this._service.getItems(this.selectedCat.CategoryID,this.selectedSubCat.SubCategoryId,this.selectedBrand.SubsubCategoryid).subscribe(res=>{
        this.ItemList=res;
        this.ItemList.forEach(el=>{
          el.name=el.itemBaseName+'-'+el.Number;
        })
        this.isLoading=false;
        console.log(this.ItemList);
      })
    }
    
  }

  showError(msg) {
    this._msg.add({severity:'error', summary: 'Error', detail: msg});
}
  showSuccess(msg) {
    this._msg.add({severity:'success', summary: 'Success', detail: msg});
  
  }

  checkLife(){
    if(parseInt(this.ClearanceShelfLifeFrom) >= parseInt(this.ClearanceShelfLifeTo) ){
      this.showError("ShelfLifeFrom cant be greater than ShelfLifeTo"); 
      this.isCorrect=false;
    }
    else if( parseInt(this.NonSellShelfLifeFrom)>=parseInt(this.NonSellShelfLifeTo)){
      this.showError("NonShelfLifeFrom cant be greater than NonShelfLifeTo");
      this.isCorrect=false;
      }
    else if(parseInt(this.ClearanceShelfLifeFrom) >= 100 || parseInt(this.NonSellShelfLifeFrom)>=100 || parseInt(this.ClearanceShelfLifeTo)>100 || parseInt(this.NonSellShelfLifeTo)>=100){
      this.isCorrect=false;
      this.showError("Can't be greater than 100.Check again!")
    }
    else if(parseInt(this.ClearanceShelfLifeFrom)<= parseInt(this.NonSellShelfLifeFrom)){
      this.isCorrect=false;
      this.showError(" Non shelf life cant be greater than Clearance shelf life")
    }
    else if(parseInt(this.ClearanceShelfLifeFrom) <= parseInt(this.NonSellShelfLifeFrom) || parseInt(this.ClearanceShelfLifeTo) <= parseInt(this.NonSellShelfLifeFrom)){
      this.isCorrect=false;
      this.showError("Non shelf life cant be greater..Check again!")
    }
    else if(parseInt(this.ClearanceShelfLifeFrom) <= parseInt(this.NonSellShelfLifeFrom) || parseInt(this.ClearanceShelfLifeFrom) <= parseInt(this.NonSellShelfLifeTo)){
      this.isCorrect=false;
      this.showError("Can't be greater or equal to clearance shelf life")
    }

    else if(parseInt(this.ClearanceShelfLifeFrom)- parseInt(this.NonSellShelfLifeTo)!=1){
      this.isCorrect=false;
      this.showError("Inappropriate difference!")
    }
    else if(this.NonSellShelfLifeTo=='' || this.ClearanceShelfLifeFrom=='' || (this.NonSellShelfLifeFrom=='' && parseInt(this.NonSellShelfLifeFrom)!=0 ) || this.ClearanceShelfLifeTo==''){
      this.isCorrect=false;
      this.showError("First fill data! ");
    }
    else{
      this.isCorrect=true;
    }
  }

  onEdit(){
    this.checkLife();
    debugger
    let pay={
      "CategoryId":this.selectedCat.CategoryID,
      "SubCategoryId":this.selectedSubCat.SubCategoryId,
      "BrandId" :this.selectedBrand.SubsubCategoryid,
      "ItemNumber" :this.editdata && this.editdata.ItemNumber?this.editdata.ItemNumber:null,
      // "ItemId":this.editdata.ItemId,
      "ClearanceShelfLifeFrom":parseInt(this.ClearanceShelfLifeFrom) ,
      "ClearanceShelfLifeTo": parseInt(this.ClearanceShelfLifeTo),
      "NonSellShelfLifeFrom": parseInt(this.NonSellShelfLifeFrom),
      "NonSellShelfLifeTo":parseInt(this.NonSellShelfLifeTo)
    }
    
    if(this.isCorrect==true){
      this.UpdateList=[];
      this.UpdateList.push(pay)
      this.isLoading=true;
      this._service.UpdateBulkData(this.UpdateList).subscribe((res:any)=>{
        //console.log("UpdateBulkData",res);
        if(res.Status==true){
          this._msg.add({severity:'success', summary: 'Success', detail: "successfully requested",life:30000});
          this.Search();
          this.isLoading=false;
          this.ClearanceShelfLifeFrom='';this.ClearanceShelfLifeTo='';this.NonSellShelfLifeFrom='';this.NonSellShelfLifeTo=';'
        }
        
        else{
          this.showError(res.Message);
          this.isLoading=false;
        }
      })
    }

  }

  Submit(){
    this.checkLife();
    if(this.isCorrect==true){
    this.UpdateList=[];
      let pay={};
      if(this.selectedItem && this.selectedItem.length>0){
        this.selectedItem.forEach(e=>{
          pay={
            "CategoryId":this.selectedCat.CategoryID,
            "SubCategoryId":this.selectedSubCat.SubCategoryId,
            "BrandId" :this.selectedBrand.SubsubCategoryid,
            "ItemNumber" :e.Number?e.Number:null,
            // "ItemId":e.ItemId,
            "ClearanceShelfLifeFrom":parseInt(this.ClearanceShelfLifeFrom) ,
            "ClearanceShelfLifeTo": parseInt(this.ClearanceShelfLifeTo),
            "NonSellShelfLifeFrom": parseInt(this.NonSellShelfLifeFrom),
            "NonSellShelfLifeTo":parseInt(this.NonSellShelfLifeTo)
          }
          this.UpdateList.push(pay)
      }) 
      }
      else{
        let pay={};
            pay={
              "CategoryId":this.selectedCat.CategoryID,
              "SubCategoryId":this.selectedSubCat.SubCategoryId,
              "BrandId" :this.selectedBrand.SubsubCategoryid,
              "ItemNumber" :null,
              // "ItemId":e.ItemId,
              "ClearanceShelfLifeFrom":parseInt(this.ClearanceShelfLifeFrom) ,
              "ClearanceShelfLifeTo": parseInt(this.ClearanceShelfLifeTo),
              "NonSellShelfLifeFrom": parseInt(this.NonSellShelfLifeFrom), 
              "NonSellShelfLifeTo":parseInt(this.NonSellShelfLifeTo)
            }
            this.UpdateList.push(pay)
      
      }
    this.isLoading=true;
      this._service.UpdateBulkData(this.UpdateList).subscribe((res:any)=>{
       // console.log("this.UpdateList",this.UpdateList);
        if(res.Status==true){
          this._msg.add({severity:'success', summary: 'Success', detail: "successfully requested"});
          this.Search();
          this.ClearanceShelfLifeFrom=''
          this.ClearanceShelfLifeTo=''
          this.NonSellShelfLifeFrom=''
          this.NonSellShelfLifeTo=''
          this.isLoading=false;
        }
        else{
          this.showError(res.Message);
          this.isLoading=false;
        }
      })
    }
   
  }

 
  Search(){
    if((this.selectedCat==undefined || this.selectedCat.length==0 &&  this.selectedSubCat ==undefined || this.selectedSubCat.length==0&& this.selectedBrand==undefined || this.selectedBrand.length==0 ) || (this.selectedItem==undefined && this.selectedItem.length==0)){
      this.showError("Select dropdowns first !")
    }
    else{
      this.ListId=[]
      this.searchedData=[];
      this.selectedItem.forEach(e=>{
        this.ListId.push(e.Number);
      })
      this.isLoading=true;

      let payload={
        "CategoryId":this.ListId && this.ListId.length>0 ?0:this.selectedCat.CategoryID,
        "SubCategoryId":this.ListId && this.ListId.length>0?0:this.selectedSubCat.SubCategoryId,
        "BrandId":this.ListId  && this.ListId.length>0 ?0:this.selectedBrand.SubsubCategoryid,
        "ItemNumbers":this.ListId
      }
      this._service.SearchDataList(payload).subscribe((res:any)=>{
       // console.log("SearchDataList",res);
        if(res.length==0){
          this.isLoading=false;
          this.showError("Data not found!")
        } 
        else{
          this.isLoading=false;
          this.searchedData=res;
          console.log("this.searchedData",this.searchedData);
          
        } 
          this.isBulk=false;
          this.check=false;
          this.IsEdit=false;
      })
    }
  }

  refresh(){
    this.selectedCat=[]
    this.selectedSubCat=[]
    this.selectedBrand=[]
    this.selectedItem=[]
    this.searchedData=[]
    this.SubCategoryList=[]
    this.BrandList=[] 
    this.ItemList=[]
  }
}

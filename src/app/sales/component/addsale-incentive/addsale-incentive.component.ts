import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandbuyerService } from 'app/shared/services/brandbuyer.service';
import { SaleIncentiveService } from 'app/shared/services/sale-incentive.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { StoreService } from 'app/store/services/store.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-addsale-incentive',
  templateUrl: './addsale-incentive.component.html',
  styleUrls: ['./addsale-incentive.component.scss']
})
export class AddsaleIncentiveComponent implements OnInit {
  searchModel:any;
  blocked:boolean;
  allcity:any;
  warehouselist:any;
  excutiveList:any;
  companyList:any;
  CategoryList:any[];
  subCatList=[];
  brandList=[];
  selectedSubsubCatregory=[];
  selectedCatregory=[];
  selectedSubCat=[];
  itemList=[];
  selectedItem=[];
  selectedExecutiveName=[];
  percentageValidation:boolean;
  salesCommissionCatMasterList:any;
  SalesCommissionEventMasterList:any;
  isInvalid : boolean = false;
  minDate: Date;
  maxDate: Date;
  salesData : any[]=[];
  hide:boolean=false;
  store:any;
  disable:boolean;
  nameCheck:boolean;
  busnicess:any;
  constructor(private router:Router,
    private messageService: MessageService
    ,private warehouseService:WarehouseService,
    private saleIncentiveService :SaleIncentiveService,
    private Brandbuyer: BrandbuyerService,
    private storeService: StoreService ) {this.searchModel={};}

  ngOnInit() {
    this.blocked = true;
    this.searchModel.cityId='';
    this.searchModel.WarehouseId='';
    this.searchModel.value='';
    this.searchModel.IncentiveType='';
    this.searchModel.ExecutiveId='';
    this.searchModel.BookedValue='';
    this.searchModel.CommissionCatMasterId='';
    this.searchModel.EventMasterId='';
    this.searchModel.StoreId='';
    var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  this.getCitys(); 
  let today = new Date();
  let lastDate = new Date();
  lastDate.setDate(today.getDate()+31);
//  this.rangeDates = [ lastDate, today];
  this.minDate = today;
  this.maxDate = lastDate;
  this.searchModel.StartDate=today;
  this.searchModel.EndDate=lastDay;
  }
  back(){
    this.router.navigateByUrl("layout/sale/saleIncentive")
  }
  async getCitys(){
    this.allcity= await this.warehouseService.GetActiveWarehousescitys().toPromise();
    this.blocked = false;
  }
  async onChange(cityid){
    this.warehouselist= await this.warehouseService.GetWarehouseByCity(cityid).toPromise();
  }
  async onChangeWareouse(WarehouseId){
    this.excutiveList=[];
    this.store=[];
    this.store=await this.storeService.getStoreList().toPromise();
  }
  async onChangestore(StoreId){
    this.excutiveList= await this.saleIncentiveService.GetExecutiveListV1(this.searchModel.WarehouseId,StoreId).toPromise();
    this.selectedExecutiveName= this.excutiveList;
    this.salesCommissionCatMasterList= await this.saleIncentiveService.GetsalesCommissionCatMaster().toPromise();
    this.getSubCatList(StoreId);
  }
  async getEventList(CommissionCatMasterId){
    debugger;
    this.hide=true;
    this.disable=false;
    this.SalesCommissionEventMasterList=await this.saleIncentiveService.GetSalesCommissionEventMasterList(CommissionCatMasterId).toPromise();
    console.log('svdgfgjhfwkfw',this.SalesCommissionEventMasterList);
    debugger; 
    this.disable=false;
    this.SalesCommissionEventMasterList.forEach(element => {
    if(element.EventName=="Business Commission"){
       this.searchModel.EventMasterId=element.Id
       this.nameCheck=true;
       this.disable=true;
    }    
    this.salesCommissionCatMasterList.forEach(e => {
      if(element.CommissionCatMasterId==e.Id){
        if(e.CategoryName=="Business Commission"){
          this.busnicess="Business Commission";
         }
      }
      if(element.CommissionCatMasterId==e.Id){
      if(e.CategoryName=="ShopKirana Premier League"){
        this.busnicess="ShopKirana Premier League";
        this.nameCheck=false;
       }
    }
    if(element.CommissionCatMasterId==e.Id){
     if(e.CategoryName=="Monthly Activities Incentive"){
      this.busnicess="Monthly Activities Incentive";
      this.nameCheck=false;
   }
  }
    });
  });
  }

  getSubCatList(StoreId){
    this.subCatList=[];
    this.itemList=[];
      this.saleIncentiveService.getStoreSubCat(StoreId).subscribe(result => {
        console.log('subCatList', result);
        this.subCatList = result;
        this.selectedSubCat=result;
      });
    }
    onChangesubCategory(categories){
      this.CategoryList=[];
      this.selectedCatregory=[];
      this.brandList=[];
      this.itemList=[];
      if (categories && categories.length) {
        let cat = [];
        cat = categories.map(function (elem) {
          return elem.SubCategoryId ? elem.SubCategoryId : elem
        });
      this.saleIncentiveService.getCategory(cat).subscribe(result => {
        console.log('categories', result);
        this.CategoryList = result;
        this.selectedCatregory= this.CategoryList;
        this.getBrandsnew(this.selectedCatregory);
      });
    }
    }
  
  getBrandsnew(subcategories) {
    this.brandList=[];
    this.selectedSubsubCatregory=[];
    if (subcategories && subcategories.length) {
      let subcatMappingId = [];
      subcatMappingId = subcategories.map(function (elem) {
        return elem.SubCategoryMappingId ? elem.SubCategoryMappingId : elem
      });
      this.saleIncentiveService.subcategoryIdBrandList(subcatMappingId).subscribe(result => {
        console.log('test', result);
        this.brandList = result;
        this.selectedSubsubCatregory=this.brandList;
        this.saleTransDetailIDS();
     this.getitemlist(this.selectedSubsubCatregory,this.searchModel.WarehouseId);
      });
    }
  }
getitemlist(brandIds,warehouseId){
  this.itemList=[];
  this.selectedItem=[];
  if (brandIds && brandIds.length) {
    let brandId = [];
    brandId = brandIds.map(function (elem) {
      return elem.SubsubCategoryid ? elem.SubsubCategoryid : elem
    });
    this.saleIncentiveService.GetBrandsWiseItemList(warehouseId,brandId).subscribe(result => {
      this.itemList = result;
      console.log('itemList',this.itemList);
    });
  }
}

  clear(){
    this.searchModel.cityId='';
    this.searchModel.WarehouseId='';
    this.searchModel.value='';
    this.searchModel.IncentiveType='';
    this.searchModel.ExecutiveId='';
    this.searchModel.BookedValue='';
    this.searchModel.CommissionCatMasterId='';
    this.searchModel.EventMasterId='';
    this.searchModel.StoreId='';
    this.searchModel.CrossCustomer='';
    this.searchModel.Customers='';
    this.searchModel.StoreId='';
    this.searchModel.EventMasterId='';
    this.subCatList=[];
    this.itemList=[];
    this.brandList=[];
    this.CategoryList=[];
    this.excutiveList=[];
    this.selectedSubCat=[];
    this.selectedExecutiveName=[];
  }
//   onKeypressEvent(event: any){
//     debugger;
//     var x = parseFloat(event.target.value); 
//   if (isNaN(x) || x < 0 || x > 100) 
//   { 
//     this.percentageValidation=true;
//     this.searchModel.IncentiveValue=0;
//     return false;
//   }
//   else
//   {
//       this.percentageValidation=false;     
//   } 
//     // this.percentageValidation=false;
//     // if(event.target.value >100){
//     //   this.percentageValidation=true;
//     //   this.searchModel.IncentiveAmount=100;
//     //   return false;
//     // }
//     // console.log(event.target.value);
 
//  }
//  addvalidateNegative(targetValue, searchModel) {
//   if (targetValue >= 0) {
//     searchModel.IncentiveValue = ( searchModel.BookedValue *10 /100);
//   }
//   else {
//     //searchModel.IncentiveValue = searchModel.IncentiveValue;
//     this.messageService.add({ severity: 'error', summary: 'Please enter value greater than or equal to zero', detail: '' });
//   }
// }
clearValue(searchModel){
  if(searchModel.IncentiveType == "Amount"){
    searchModel.IncentiveValue='';
  }else{
    searchModel.IncentiveValue='';
  }
}

saleTransDetailIDS(){
  this.salesData=[];
  this.selectedCatregory.forEach(x=>{
    this.selectedSubsubCatregory.forEach(brand=>{
      if(brand.SubCategoryMappingId == x.SubCategoryMappingId){
    let salesData={
      SubCategoryMappingId : x.SubCategoryMappingId,
      BrandMappingId : brand.BrandCategoryMappingId
    }
    this.salesData.push(salesData);
  }
  })
  })
}

submit(searchModel,modalForm){
  this.blocked=true;
  debugger;
  if (modalForm.form.status == "VALID") {
    if (this.selectedExecutiveName != undefined &&  this.selectedSubCat !=undefined){

      let SubCategoryIds =this.selectedSubCat.map(function (elem) {
        return elem.SubCategoryId ? elem.SubCategoryId : null;
      });      
      let ExecutiveIdsList =this.selectedExecutiveName.map(function (elem) {
        return elem.ExecutiveId ? elem.ExecutiveId : null;
      });

var dataTopost={
  Id:0,
  WarehouseId:searchModel.WarehouseId,
  EventMasterId:searchModel.EventMasterId,
  BookedValue:searchModel.BookedValue,
  IncentiveType:searchModel.IncentiveType,
  IncentiveValue:searchModel.IncentiveValue,
  StartDate:searchModel.StartDate,
  EndDate:searchModel.EndDate,
  ExecutiveIds:ExecutiveIdsList,
  SubCategoryId:SubCategoryIds,
  //salesComTransDetailDC:this.salesData,
  CommissionCatMasterId:searchModel.CommissionCatMasterId,
  EventName:searchModel.CrossCustomer,
  Customers:searchModel.Customers,
  StoreId:searchModel.StoreId
 }
 debugger;
 this.saleIncentiveService.AddSaleIncentive(dataTopost).subscribe(result => {
  if(result.Status){
    this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });    
    this.blocked = false;
    this.router.navigateByUrl("layout/sale/saleIncentive")
  }else{
    this.messageService.add({ severity: 'error', summary: result.Message, detail: '' });    
    this.blocked = false;
  }
  this.blocked = false;
});
}
  }else {
    this.isInvalid = true;
    this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    this.blocked=false;
  }
}
}

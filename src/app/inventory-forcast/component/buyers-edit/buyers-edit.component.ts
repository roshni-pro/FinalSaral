import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { WindowScrollController } from '@fullcalendar/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ConfirmationService } from 'primeng/api';
import * as moment from 'moment';
import { log } from 'console';
@Component({
  selector: 'app-buyers-edit',
  templateUrl: './buyers-edit.component.html',
  styleUrls: ['./buyers-edit.component.scss']
})
export class BuyersEditComponent implements OnInit{
  categoryListData: any;
  cityListData: any;
  selectedCity: any;
  selectedHub: any;
  subCatList = [];
  selectedItemApp:any
  selectedItemSysQty:any
  selectedItemInvDays:any
  brandList: any[];
  subcat: any[];
  subSubcat: any[];
  selectedBrandId: any[];
  cityHub: any[];
  selectedWarehouseId: any[];
  hubList = [];
  selectedCatregory: any;
  selectedSubsubCatregory: any
  selectedSubCat: any
  ItemPerPage: any;
  PageNo: any;
  itemForcastDetails: any;
  itemForcastHistory: any;
  enableExportBtn: boolean = false;
  ItemMultiMrpId: any;
  WarehouseId: any;
  itemPeopleId: any;
  itemId: any;
  itemPercentValue: any = 0;
  itemBuyerEditForecast: any;
  item: any;
  AvgInventoryDays: any;
  BrandTotalPercent: any;
  BrandTotalValue: any;
  TotalRecord: any;
  itemInvetoryDay: number;
  blocked: boolean;
  curMonFind: any;
  getMonthStartDate: any;
  letsClear: any[];
  TodayDayVal: any;
  getRoleData: any;
  display: boolean = false;
  sourceExecutiveRole: any;
  regionSourcingRole: any;
  hqMasterRole: any;
  inventoryForecastingExecutive : any;
  inventoryForecastingSeniorExecutive : any;
  salespercent: number = 0
  sumBrandTotalPercentage: number = 0;
  ItemOldData = [];
  displaystore = [];
  backupData = [];
  localStorageData: any;
  brandTotalPercentNew: number
  displayTotalBrandPercent: any
  displayTotalBrandPercentstore: any
  check_Hundred: boolean = false
  catId: any
  catIdArr: any[] = []
  oldEditableQTY : number;
  product:any[]=[]
  selectedItemNumber:any
  itemList:any[]=[];
  searchItem:string;
  buyerEditHub:any;
  buyerEditBrand:any;
  constructor(private _service: InventoryforcastserService, 
              private exportService: ExportServiceService, 
              private router: Router,
              private confirmationService: ConfirmationService) {}
  

  ngOnInit() {
    //  console.log(this.itemBuyerEditForecast,"BuyerForcastValue");
    // this.getRoleData = (JSON.parse(localStorage.getItem('tokenData')).rolenames).split(',');
    this.getRoleData = (localStorage.getItem('role')).split(',');
    var sourceExecutive = 'Buyer';
    var regionSourcing = 'Region Sourcing lead';
    var HQMaster = 'HQ Master login';    
    var InventoryForecastingExecutive = 'Inventory Forecasting Executive';
    var InventoryForecastingSeniorExecutive = 'Inventory Forecasting Senior Executive';
    this.sourceExecutiveRole = this.getRoleData.find(x => x == sourceExecutive)
    this.regionSourcingRole = this.getRoleData.find(x => x == regionSourcing)
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster)
    this.inventoryForecastingExecutive = this.getRoleData.find(x => x == InventoryForecastingExecutive);
    this.inventoryForecastingSeniorExecutive = this.getRoleData.find(x => x == InventoryForecastingSeniorExecutive);
    this.PageNo = 1;
    this.ItemPerPage = 50;
    this.selectedHub = localStorage.getItem('buyerEditHub') == '' ? '' : JSON.parse(localStorage.getItem('buyerEditHub'));
    this.cityList()
    this.categoryList();
    this.curMonFind = new Date()
    this.getMonthStartDate = this.curMonFind ? moment(this.curMonFind).format('D') : '';
    //when user move to future mrp page to buyer edit page, then localStorage work --started//
    this.selectedSubsubCatregory = localStorage.getItem('buyerEditBrand') == '' ? '' : JSON.parse(localStorage.getItem('buyerEditBrand'));
    this.searchItem = localStorage.getItem('buyerEditItem') == (null || "null" || "undefined") ? '' : localStorage.getItem('buyerEditItem');
    // console.log((this.selectedHub))
    // console.log((this.selectedSubsubCatregory))
    if((this.selectedHub == "" && this.selectedSubsubCatregory == "") || (this.selectedHub == null && this.selectedSubsubCatregory == null)){
      this.addBtnEnable = false;
      this.enableExportBtn = false;
    }
    if(((this.selectedHub) !=null && (this.selectedSubsubCatregory) != null)){
      setTimeout(() => {
        this.load(event);
      }, 1000);
      this.addBtnEnable = true;
      this.enableExportBtn = true;
    }
    //when user move to future mrp page to buyer edit page, then localStorage work --started//
  }
  cityList() {
    this._service.getCityList().subscribe(res => {
      this.cityListData = res;
      this.getAllHUbList();
    })
  }

  getAllHUbList(){
       this.cityHub = this.cityListData.map(function (elem) {
        return elem.Cityid ? elem.Cityid : elem
      });

      this.blocked = true;
      this._service.getMultiHubList(this.cityHub).subscribe(res => {
        this.hubList = res.filter(x => x.IsKPP === false);
        console.log(this.selectedHub)
        if(this.selectedHub != null){
          this.selectedHub = this.hubList.filter(x=> x.WarehouseId === this.selectedHub.WarehouseId)[0];
        }
        this.blocked = false;
      });
  }
  
  cityId: any
  getHubList(cities) {
    this.hubList = [];
    this.cityHub = [];
    //this.selectedHub=[]
    // if (cities && cities.length > 0) {
    //   this.cityHub = cities.map(function (elem) {
    //     return elem.Cityid ? elem.Cityid : elem
    //   });
    // } 
    this.blocked = true;
    this.cityId = cities.Cityid
    this.cityHub.push(this.cityId);
    this._service.getMultiHubList(this.cityHub).subscribe(res => {
      this.hubList = res.filter(x => x.IsKPP === false)
      this.blocked = false;
    });
  }

  // categoryList() {
  //   this.subCatList = [];
  //   // this.brandList=[];
  //   this.selectedSubCat = [];
  //   this.selectedSubsubCatregory = [];
  //   this._service.getAllCategories().subscribe(res => {
  //     console.log(res);
  //     this.categoryListData = res;
  //     console.log("category", this.categoryListData);
  //   })
  // }
  //label
  // categoryList() {
  //   this.label = ''
  //   this.subCatList = [];
  //   this.brandList = [];
  //   this.selectedSubCat = [];
  //   this.selectedSubsubCatregory = [];
  //   this._service.getCategoryList().subscribe(res => {
  //     this.categoryListData = res;
  //     console.log(this.categoryListData,"All Category");
  //   })
  // }
  categoryList() {
    this.subCatList = [];
    this.selectedSubCat = [];
    this.selectedSubsubCatregory = [];
    this._service.getAllCategories().subscribe(res => {
      this.categoryListData = res;
      this.getAllSubCatList();
    })
  }


  getSubCatList() {
    this.subCatList = [];
    this.catIdArr = [];
    this.subCatList = [];
    this.selectedSubCat = [];
    this.brandList = [];
    if (this.selectedCatregory == undefined) {
      return false;
    } else {
      this.catIdArr.push(this.selectedCatregory.CategoryId)
    }
    this.blocked = true;
    this._service.getSubCategories(this.catIdArr).subscribe(result => {
      this.subCatList = result;
      this.blocked = false;
    });
  }

  subCatBrand = []
  subsubCatArr: any = []
  subcatId: number
  subcatArr: any[] = []
  getAllSubCatList(){
    var catIds = this.categoryListData.map(function (elem) {
      return elem.CategoryId ? elem.CategoryId : elem
    });
    this.blocked = true;
    this._service.getSubCategories(catIds).subscribe(result => {
      this.subCatList = result;
      this.blocked = false;
      this.getAllBrandCatList();
    });
  }
  getAllBrandCatList(){
    var catIds = this.categoryListData.map(function (elem) {
      return elem.CategoryId ? elem.CategoryId : elem
    });
    var SubCatIds = this.subCatList.map(function (elem) {
      return elem.SubCategoryId ? elem.SubCategoryId : elem
    });
    const payload = {
          categoryId: catIds,
          subcategoryId: SubCatIds
        }
    this.blocked = true;
    this._service.getSubSubCatList(payload).subscribe(result => {
      this.brandList = result;
      this.blocked = false;
    });
}

  getBrandsnew() {
    this.catIdArr = []
    this.subcatArr = []
    this.brandList = [];
    this.selectedSubsubCatregory = [];
    if (this.selectedCatregory == undefined && this.selectedSubCat == undefined) {
      return false;
    }
    else {
      this.catIdArr.push(this.selectedCatregory.CategoryId)
      this.subcatArr.push(this.selectedSubCat.SubCategoryId)
    }

    const payload = {
      categoryId: this.catIdArr,
      subcategoryId: this.subcatArr
    }
    this.blocked = true;
    this._service.getSubSubCatList(payload).subscribe(result => {
      this.brandList = result;
      this.blocked = false;
    });
  }

  addBtnEnable:boolean=false;
  getSearchResult() {
    // if (this.selectedCity == undefined) {
    //   alert('Please Select City')
    // } else {
    //   if (this.selectedHub == undefined) {
    //     alert('Please Select Hub')
    //   } else {
    //     if (this.selectedCatregory.length == 0) {
    //       alert('Please Select Category')
    //     } else {
    //       if (this.selectedSubCat.length == 0) {
    //         alert('Please Select Sub Category')
    //       } else {
    //         if (this.selectedSubsubCatregory.length == 0) {
    //           alert('Please Select Sub Sub Category')
    //         } else {
    //           this.load(null);
    //           this.enableExportBtn = true;
    //         }
    //       }
    //     }
    //   }
    // }
    if (this.selectedHub == undefined) {
      alert('Please Select Hub')
    } else {
      if (this.selectedSubsubCatregory.length == 0) {
        alert('Please Select Sub Sub Category')
      } else {
        this.load(null);
        this.enableExportBtn = true;
        this.addBtnEnable = true;
      }
    }
  }
  hubArr = [];
  catArr = [];
  SubcatArr = []
  SubSubcatArr = []
  catid: any
  subcatid: any
  subsubcatid: any
  SumBrandSalesValue: number = 0
  ASPSum: number = 0
  ASPCount: number = 0
  avgASp: number = 0
  BrandSalesValue: any = 0
  TotalPercentValue: number = 0
  ItemPercent: any = 0
  SumItemPercent: number = 0
  predictedvalue: any
  Qty: number = 0
  Days: number = 0
  sumBuyerEditForcast: number = 0
  SalesPercentValue: number = 0
  BuyerEditForcastOld: number = 0
  tempItemForcastDetails: any[] = [];
  BuyerEditforcostzero: number;
  BrandPredictivePercent: any
  tempItemForcastDetailItem : any;
  SumCalculatedAverageIn:number=0
  ASP:number=0
  Individualsalespercent:any;
  TotalLiveInventory:number;
  load(event) {
    if (event) {
      var Last = event.first ? event.first + event.rows : 50
      console.log("Last", Last);
      this.ItemPerPage = event.rows
      this.PageNo = Last / event.rows
    }
    // if (this.selectedCatregory == undefined) {
    //   return false
    // }
    // else {
      this.catArr = [];
      this.subsubCatArr = [];
      this.subcatArr = [];
      this.selectedCatregory == undefined ? [] : this.catArr.push(this.selectedCatregory.CategoryId)
      this.selectedSubCat.length == 0 ? [] :  this.subcatArr.push(this.selectedSubCat.SubCategoryId)
      if(this.selectedSubsubCatregory != null){
        this.subsubCatArr.push(this.selectedSubsubCatregory.BrandId)
      }
    //}
    
    if (this.selectedHub != undefined) {
      this.selectedWarehouseId = this.selectedHub.WarehouseId
    }
    this.hubArr = [];
    this.hubArr.push(this.selectedWarehouseId)
    if(this.selectedSubsubCatregory != null){
      if (this.selectedSubsubCatregory.length > 0) {
        this.selectedBrandId = this.selectedSubsubCatregory.map(function (e) {
          return e.BrandId ? e.BrandId : e
        })
      }
    }
    
    
    let cityHub = [];
    if(this.cityHub != undefined){
      cityHub.push(this.cityHub[0]);
    }
    let hubArr = [];
    hubArr.push(this.hubArr[0]);
    let catArr = [];
    catArr.push(this.catArr[0]);
    let subcatArr = [];
    subcatArr.push(this.subcatArr[0]);
    let subsubCatArr = [];
    subsubCatArr.push(this.subsubCatArr[0]);

    this.buyerEditHub = this.selectedHub;
    this.buyerEditBrand = this.selectedSubsubCatregory;
   
    var getCityId=[];
    this.selectedCity == undefined ? undefined : getCityId.push(this.selectedCity.Cityid); 
    const payload = {
      'cityIds': this.selectedCity != undefined ? getCityId : [],
      'warehouseIds': this.hubArr ? hubArr : null,
      'categoriesIds': this.catArr.length != 0 ? catArr : [],
      'subCategoriesIds': this.subcatArr.length != 0 ? subcatArr : [],
      'subSubCategoriesIds': this.subsubCatArr ? subsubCatArr : null,
      'skip': this.PageNo || 1,
      'take': this.ItemPerPage || 50,
      'itemname' : this.searchItem == (undefined || "undefined") ? '' : this.searchItem
    }
    console.log(payload);
    //if (this.cityHub && this.hubArr && this.selectedCatregory && this.selectedSubCat && this.selectedSubsubCatregory) {
      if (this.hubArr && this.selectedSubsubCatregory) {
      this.blocked = true;
      this.ItemOldData = [];
      this.displaystore = [];
      this._service.getItemForcastDetails(payload).subscribe(
        res => {
          console.log(res,"res");
          this.tempItemForcastDetails = [];
          this.BrandTotalPercent = 0;
          this.AvgInventoryDays=0;
          // this.AvgInventoryDays = res.AvgInventoryDays;
          this.BrandTotalPercent = res.BrandTotalPercent;
          this.BrandTotalValue = res.BrandTotalValue;
          console.log(this.BrandTotalValue,"this.BrandTotalValue");
          this.BrandSalesValue = res.BrandSalesValue;
         // this.GrowthInAmount=res.GrowthInAmount; //changes 02 nov
          
          this.TotalRecord = res.TotalRecord;
          this.TotalLiveInventory = res.TotalLiveInventory
          this.TodayDayVal = res.TodayDay;
          this.itemForcastDetails = res.ItemForeCastResponses;
          this.tempItemForcastDetails = res.ItemForeCastResponses;
          // res.Individualsalespercent= res.GrowthInAmount/this.BrandTotalValue //changes 2 nov
          
          this.BrandPredictivePercent = (this.BrandSalesValue / this.BrandTotalValue) * 100;
          this.BrandPredictivePercent = isNaN(this.BrandPredictivePercent) == true ? '0' : this.BrandPredictivePercent;
          console.log('this.tempItemForcastDetails', this.tempItemForcastDetails);
          this.ItemOldData = JSON.parse(JSON.stringify(res.ItemForeCastResponses));
        
          
          // if(this.BrandPredictivePercent > 100)
          // {
          //   alert("Brand PredictivePercent  is Above 100 %")
           
          // }
          this.TotalPercentValue = 0
          this.displayTotalBrandPercent = 0;
          this.SumCalculatedAverageIn=0
          this.itemForcastDetails.forEach(x => {
            this.ASPSum = this.ASPSum + x.ASP
            this.ASPCount += 1;
            this.SumCalculatedAverageIn=(this.SumCalculatedAverageIn+x.CalculatedInventoryDays)
           
          })
         
          //this.AvgInventoryDays=this.SumCalculatedAverageIn/this.TotalRecord                            
          this.AvgInventoryDays=this.SumCalculatedAverageIn/this.TotalLiveInventory 
          this.itemForcastDetails.forEach(res => {
            this.Qty = res.GrowthForecastQty
            this.Days = res.BuyerPDForecast
            this.predictedvalue = this.Qty / this.Days
            res.Individualsalespercent=(res.GrowthInAmount/this.BrandTotalValue)*100
            this.TotalPercentValue = 0
            this.SumItemPercent = 0
            if (res.BuyerEditForecast == 0) {
                this.BuyerEditforcostzero = 0   
            }
            else {
              this.itemBuyerEditForecast = res.BuyerEditForcast
             
            }
            let predictedDays = ((res.InventoryDays * res.BuyerPDForecast) - (res.CurrentInventory - (res.SalesIntent + res.TillYesterdayDemand)) / res.BuyerPDForecast);
            if (res.BuyerPDForecast < 1) {
              res.predictedDays = "0"
            } else if ((res.InventoryDays * res.BuyerPDForecast) - (res.CurrentInventory - (res.SalesIntent + res.TillYesterdayDemand)) === 0) {
              res.predictedDays = "Not Countable Zero"
            } else {
              res.predictedDays = predictedDays.toFixed(0); 
            }
          });
          console.log(this.itemForcastDetails,"itemForcastDetails");
          
          this.avgASp = this.ASPSum / this.ASPCount
          this.sumBuyerEditForcast = 0
          let copy: number = 0;

          if (this.itemPercentValue != undefined && this.SumItemPercent != 0) {
            this.brandTotalPercentNew = (this.itemPercentValue + this.SumItemPercent).toFixed(2);
          }
          for (var i in this.itemForcastDetails) {
            this.itemForcastDetails[i].PercentValue = this.itemForcastDetails[i].PercentValue.toFixed(2)
            this.itemForcastDetails[i].GrowthInAmount = this.itemForcastDetails[i].GrowthInAmount.toFixed(2)
          }
          this.itemForcastDetails.forEach(item => {
            item.planInvAndBpdStatusVal = ((item.CurrentInventory + item.OPQty + item.FulFillQty) - item.TillYesterdayDemand - item.SalesIntent) - (item.InventoryDays * item.BuyerPDForecast);
          });


          this.blocked = false;
        },
        err => {
          alert(err.error.ErrorMessage)
          this.blocked = false;
        }
      )
    }
  }
  buyerEditdisplayOpen: boolean = false;
  showDetails(item) {
    this.ItemMultiMrpId = item.ItemMultiMrpId;
    this.WarehouseId = item.WarehouseId;
    this._service.getItemForcastHistroy(this.ItemMultiMrpId, this.WarehouseId).subscribe(res => {
      this.itemForcastHistory = res;
    })
    this.buyerEditdisplayOpen = true;
  }
  itemCalInventoryDays: any
  prePage: any;
  tempBuyerEditForecast: any;
  tempPercentValue: any;
  tempDisplayTotalBrandPercentstore: any;
  GrowthInAmount:number
  updateDetails(item:any) { 
    if(item.Id == 0){
      alert('Please add this item firstly');
      return false;
    }else{
      if (this.BrandTotalPercent < 0) {
        return true;
      }
      else {    
        this.itemPercentValue = 0;
        console.log(this.backupData);
        this.itemId = item != null ? item.Id : null;
        this.itemPeopleId = item.CreatedBy;
        this.itemPercentValue = item.PercentValue;
        this.itemBuyerEditForecast = item.BuyerEditForecast;//1
        // this.tempBuyerEditForecast = item.BuyerEditForecast;;//1
        this.tempPercentValue = item.PercentValue;
        this.tempDisplayTotalBrandPercentstore = this.displayTotalBrandPercentstore;
        var tem = this.tempItemForcastDetails.find(x => x.Id == item.Id);
        this.tempItemForcastDetailItem = tem;
        this.tempBuyerEditForecast = tem.BuyerEditForecast;
        var oldEditQty = 0
        this.ItemOldData.forEach(item1 => {
          if (this.itemId == item1.Id) {
            oldEditQty = item1.BuyerEditForecast;
            this.oldEditableQTY = oldEditQty;
            this.ASP=item1.ASP;
            this.GrowthInAmount=item1.GrowthInAmount
          }
        });
        //  if(item.Category === ( 'A' || 'A1' || 'A2' || 'A3' || 'A4' || 'A5')){
        //   if (item.InventoryDays >= '1' && item.InventoryDays <= '30') {
        //     this.itemInvetoryDay = Number(item.InventoryDays);
        //   }else{
        //     alert('Limit Inventory not exceed more than 30 days');
        //     this.load(event);
        //     return false;
        //   }
        // }
        // else if(item.Category === 'C' || item.Category === 'D'){
        //   if (item.InventoryDays >= '1' && item.InventoryDays <= '30') {
        //     this.itemInvetoryDay = Number(item.InventoryDays);
        //   }else{
        //     alert('Limit Inventory not exceed more than 30 days');
        //     this.load(event);
        //     return false;
        //   }
        // }
        // if{
          // if (item.InventoryDays >= '1' && item.InventoryDays <= '60') {
            this.itemInvetoryDay = Number(item.InventoryDays);
          // }else{
          //   alert('Limit Inventory not exceed more than 60 days');
          //   this.load(event);
          //   return false;
          // }
        //  }
        
        this.itemCalInventoryDays = item.CalculatedInventoryDays
        this.SalesPercentValue = item.salespercent
        let copy: number = 0;
        copy = this.displayTotalBrandPercentstore
        this.displayTotalBrandPercent = 0;
      
        this.ItemOldData = JSON.parse(JSON.stringify(this.itemForcastDetails));
        this.itemPercentValue = item.PercentValue
        
        this._service.updateItemForcast(this.itemId, this.itemPeopleId, this.itemPercentValue,this.itemInvetoryDay,this.itemCalInventoryDays,this.ASP,this.BrandTotalValue,this.BrandSalesValue,this.itemBuyerEditForecast,this.GrowthInAmount).subscribe(res => {
          
          if (res.Status == true) {
            alert(res.msg)
            if (res.msg == "Item forecast data updated successfully.") {
            
              this.load(event);
            }
          }
          else {
            alert(res.msg);
            this.load(event);
            if (res.msg == 'Total brand item percent value greater than brand percent value.') {
              // var tem =  this.tempItemForcastDetails.find(x => x.Id == item.Id);
              item.BuyerEditForecast = this.tempBuyerEditForecast;
              this.displayTotalBrandPercentstore = this.tempDisplayTotalBrandPercentstore;
            }
          }
        })
      }
    }  
  }
buyersHistoryDisplayOpen: boolean = false;
getHistory() {
  this.buyersHistoryDisplayOpen = true;
}
exportDownload() {
  var exportItemForecastData;
  console.log(this.TotalRecord, "Total Records");
  const payload = {
    'cityIds': [],
    'warehouseIds': this.hubArr,
    'categoriesIds': this.catArr,
    'subCategoriesIds': this.subcatArr,
    'subSubCategoriesIds': this.subsubCatArr,
    'skip': 1,
    'take': this.TotalRecord,
    'itemname' : this.searchItem == undefined ? '' : this.searchItem

  }
  // console.log(payload);
  console.log(this.selectedCatregory, this.selectedSubCat, this.selectedSubsubCatregory);
  this.blocked = true;
  this._service.getItemForcastDetails(payload).subscribe(
    res => {
      exportItemForecastData = res.ItemForeCastResponses;
      console.log(exportItemForecastData);
     
      var result = exportItemForecastData.map(function (a) {
        return {
          'WareHouseName': a.WarehouseName,
          'WareHouseId': a.WarehouseId,
          'TillYesterdayDemand': a.TillYesterdayDemand,
          'SubsubcategoryName': a.SubsubcategoryName,
          'SystemSuggestedQty': a.SystemSuggestedQty,
          'SalesIntent': a.SalesIntent,
          'PercentValue': a.PercentValue,
          'OPQty': a.OPQty,
          'Mnth': a.Mnth,
          'ItemName': a.ItemName,
          'ItemMultiMrpId': a.ItemMultiMrpId,
          'InventoryDays': a.InventoryDays,
          'Id': a.Id,
          'GrowthInAmount': a.GrowthInAmount,
          'GrowthForecastQty': a.GrowthForecastQty,
          'FulFillQty': a.FulFillQty,
          'CurrentInventory': a.CurrentInventory,
          'CalculatedInventoryDays': a.CalculatedInventoryDays,
          'BuyerPDForecast': a.BuyerPDForecast,
          'BuyerEditForecast': a.BuyerEditForecast
        };
      });
      this.exportService.exportAsExcelFile(result, 'buyerForcast');
      this.blocked = false;
    },
    err => {
      alert("Record not found")
      this.blocked = false;
    }
  )
}
msg: any
onUpload(event) {
  const files = event.files[0];
  console.log(files);
  let file = new FormData();
  file.append("file", files)
  this._service.uploadExcelFile(file).subscribe(
    res => {
      console.log(res)
      if (res.Status == false) {
        alert(res.msg);
        this.letsClear = [];
      } else {
        alert(res)
        this.letsClear = []
      }
    },
    err => {
      alert(err.error.ErrorMessage)
    }
  )
}
clearRecord() {
  this.selectedCity = null
  this.selectedHub = null
  this.selectedCatregory = null
  this.selectedSubCat = []
  this.selectedSubsubCatregory = []
  //this.hubList = [];
  this.subCatList = [];
  //this.brandList = [];
  this.TotalRecord = 0;
  this.searchItem = undefined;
  this.itemForcastDetails = [];
  this.addBtnEnable = false;
  this.enableExportBtn = false;
  localStorage.removeItem('buyerEditHub');
  localStorage.removeItem('buyerEditBrand');
  localStorage.removeItem('buyerEditItem');
}
keyPressNumbers(event:any) {
  // var inputBox = document.getElementById("inputBox");
  // var invalidChars = [
  //   "-",
  //   "+",
  //   "e",
  // ];
  // inputBox.addEventListener("keydown", function (e) {
  //   if (invalidChars.includes(e.key)) {
  //     e.preventDefault();
  //   }
  // });
  const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
        event.preventDefault();
    }
}
isSearch: boolean;
toggleSearch() {
  if (this.isSearch == true) {
    this.isSearch = false;
  } else {

    this.isSearch = true;

  }
}

  addForecastItem(itemDetails:any){
    this.confirmationService.confirm({
      message: 'Are you sure, you want to add this item ?',
      accept: () => {
          this.blocked = true;
          this._service.addItemForecast(itemDetails.ItemMultiMrpId, itemDetails.WarehouseId).subscribe(
            (res)=>{
              console.log(res);
              alert(res);
              this.load(event);
              this.blocked = false;
            },
            (err)=>{
              alert(err.error.ErrorMessage);
              this.blocked = false;
            }
          )
      }
    });
  }

  showDialog() {
      this.display = true;
      this.selectedItemNumber = undefined;
      this.itemList = [];
      this.itemList.forEach(x=>
        {
          x.APPvalue=undefined,
          x.SysQty=undefined,
          x.InvDays=undefined
        })
      // this.product =[{
      //   'ItemNumber':1,
      //   'ItemName':'Lux 5rs',
      //   'MRP':5
      // }]
  }
  
  SearchAddNewItem()
  {
    if(this.selectedItemNumber == undefined || this.selectedItemNumber == ''){
      alert('Please enter item number');
      this.itemList = [];
      return false;
    }
      console.log(this.selectedItemNumber)
      this.blocked = true;
      this._service.searchNewItemNumber(this.selectedItemNumber).subscribe(res=>
        {
          console.log(res,"res")
          this.itemList=res
          this.itemList.forEach(x=>
            {
              x.APPvalue=undefined,
              x.SysQty=undefined,
              x.InvDays=undefined
            })
            this.blocked = false;
        }
      )
  }

  removeDecimalVal(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
        event.preventDefault();
    }
    var k;  
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  
  allowDecimalVal(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
        event.preventDefault();
    }

    if ( event.which == 45 || event.which == 189 ) {
      event.preventDefault();
   }
 }

  onSubmitAddItem(row)
  {
    console.log(row);
    if(this.selectedHub == null)
    {
      alert("Please Select Warehouse")
      return false;
    }
    if(row.APPvalue == null)
    {
      alert("Enter System Qty")
      return false;
    }
    if(row.SysQty == null)
    {
      alert("Enter System Qty")
      return false;
    }
    if(row.InvDays == null)
    {
      alert("Enter Inventory Days")
      return false;
    }
    this._service.AddNewArtical(row.ItemMultiMRPId,this.selectedHub.WarehouseId,row.APPvalue,row.SysQty,row.InvDays).subscribe(
      (res)=>{
        alert(res)
      },
      (err)=>{
        alert(err)
      }
  )
  this.itemList.forEach(x=>
    {
      x.APPvalue=undefined,
      x.SysQty=undefined,
      x.InvDays=undefined
    })
    this.display=false
  }
  addNewItemKeyUp(event,row,type)
  {
    //console.log(event.target.value,"event.target.value")
    if(type=='APP')  
    {
      if(event.target.value ==0 && event.target.value !='' )
      {
          alert(" APP value should be greater than 0")
        row.APPvalue=undefined
      }
      else
        row.APPvalue=event.target.value
      
     
    }
    else if (type == 'Sys')
    {
      if(event.target.value ==0 && event.target.value !='')
      {
        alert(" System Qty value should be greater than 0")
        row.SysQty=undefined
      }
      else
       row.SysQty=event.target.value 
    }
    else 
    {
      if (event.target.value == 0 && event.target.value !='' )
      {
        alert("Inv Days value should be greater than 0")
        row.InvDays=undefined
      }
      else
      row.InvDays=event.target.value    
  }
}
  onCancelAddItem()
  {
    this.selectedItemNumber = undefined;
    this.itemList = [];
    this.itemList.forEach(x=>
      {
        x.APPvalue=undefined,
        x.SysQty=undefined,
        x.InvDays=undefined
      })
      this.display=false
  }

  moveFutureMultiMrpPage(){
    localStorage.setItem('buyerEditHub',JSON.stringify(this.buyerEditHub));
    localStorage.setItem('buyerEditBrand', JSON.stringify(this.buyerEditBrand));
    localStorage.setItem('buyerEditItem',this.searchItem == '' ? '' : this.searchItem);
    this.router.navigate(['/layout/inventoryforcast/futuremultimrp']);
  }
  DownLoadSampleFile() {
    let arr = [];
    arr.push({
      'ItemMultiMRPId':null, 
      'WarehouseName'	:null,
      'MaxSellingPrice':null,
      'BuyerEdit'	:null,
      'InventoryDays'	:null,
    })
  this.exportService.exportAsExcelFile(arr,"SampleFile")
  }
  onbulkUpload(event) {
    const files = event.files[0];
    console.log(files);
    let file = new FormData();
    file.append("file", files)
    this._service.uploadbulkExcelFile(file).subscribe(
      res => {
        console.log(res)
        if (res.Status == false) {
          alert(res.msg);
          this.letsClear = [];
        } else {
          alert(res)
          this.letsClear = []
        }
      },
      err => {
        alert(err.error.ErrorMessage)
      }
    )
  }
}


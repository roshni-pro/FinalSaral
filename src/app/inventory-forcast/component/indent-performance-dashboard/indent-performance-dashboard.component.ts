import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { event } from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-indent-performance-dashboard',
  templateUrl: './indent-performance-dashboard.component.html',
  styleUrls: ['./indent-performance-dashboard.component.scss']
})
export class IndentPerformanceDashboardComponent implements OnInit {
  selectDate: Date;
  isShow:boolean=false
  first :number=0
  brandList: any[];
  catIdArr: any[];
  subcatArr: any[];
  blocked: boolean;
  subCatBrand = []
  subsubCatArr: any = []
  subcatId: number
  subCatList: any[];
  selectedSubCat: any[];
  selectedSubsubCatregory: any[];
  categoryListData: any[];
  hubList: any[];
  exportIndentData: any;
  BrandData: any;
  //selectedWarehouse: any[]
  selectedBrandname: any[]=[]
  skip: number = 0;
  take: number = 10;
  data: any[];
  cityId: any;
  datayr: any[];
  totalRecords: number;
  buyerRoleNameRegional:any;
  isLoading: boolean = false;
  getRoleData: any;
  hqMasterRole: any;
  buyerRoleNameSourcing:any;
  cityListData: any[];
  cityHub: any[];
  selectedHub: any;
  salesRoleNameRegion:any;
  salesRoleNameCountry:any;
  inventoryForecastingSalesSeniorExecutive: any;
  inventoryForecastingExecutive: any
  constructor(private _service: InventoryforcastserService, private exportService: ExportServiceService) { }

  ngOnInit() {
    this.getRoleData = (localStorage.getItem('role')).split(',');
    //console.log("getRole",this.getRoleData);  Inventory Forecasting Sales Senior Executive
    var salesRoleRegion = 'Region sales lead';
    var salesRoleCountry = 'Country service lead';
    var buyerRoleSourcing = 'Buyer';
     var buyerRoleRegional = 'Region Sourcing lead';
    var HQMaster = 'HQ Master login';
    var InventoryForecastingExecutive = 'Inventory Forecasting Executive';
    this.inventoryForecastingExecutive = this.getRoleData.find(x => x == InventoryForecastingExecutive);
    var InventoryForecastingSalesSeniorExecutive = 'Inventory Forecasting Sales Senior Executive';
    this.inventoryForecastingSalesSeniorExecutive = this.getRoleData.find(x => x == InventoryForecastingSalesSeniorExecutive);

    this.salesRoleNameRegion = this.getRoleData.find(x => x == salesRoleRegion)
     this.salesRoleNameCountry = this.getRoleData.find(x => x == salesRoleCountry)
     this.buyerRoleNameSourcing = this.getRoleData.find(x => x == buyerRoleSourcing)
     this.buyerRoleNameRegional = this.getRoleData.find(x => x == buyerRoleRegional)
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster)
    this.categoryList();
    this.cityList();
   
  }
  load(event)
  {
    debugger
 
    console.log(event);
    if (event) {
      var Last = event.first ? event.first + event.rows : 10
      console.log("Last", Last);
      this.take = event.rows
      this.skip = Last / event.rows
      this.blocked = true;
       const payload =
    {
      'subSubCategoriesIds': this.selectedBrandname,
      'WarehouseId': this.selectedHub.WarehouseId,
      'month': this.selectDate ? moment(this.selectDate).format('yyyy-MM-01') : null,
      'skip': this.skip,
      'take': this.take
    }
     if(this.selectedBrandname.length==0)
    {
      alert("Please Select Brand")
      return false;
    }
    console.log(payload, "rrrr");
   this.blocked=true
      this._service.SalesIndentDashBoard(payload).subscribe(res => {
        debugger
        this.data = res.SalesIntentApprovalOldDCs
        console.log("Data====",this.data);
       this.totalRecords=res.SalesIntentApprovalOldDCs[0].TotalRecord
this.blocked=false;
       console.log(this.totalRecords);
        
    })
  }}
  categoryList() {
    this.subCatList = [];
    this.selectedSubCat = [];
    this.selectedSubsubCatregory = [];
    this._service.getAllCategories().subscribe(res => {
      this.categoryListData = res;
      this.getAllSubCatList();
    })
  }

  getAllSubCatList() {
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
  getAllBrandCatList() {
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
      console.log(this.brandList, "brandList");
      this.blocked = false;
    });
  }

  cityList() {
    this._service.getCityList().subscribe(res => {
      this.cityListData = res;
      this.getAllHUbList();
    })
  }

  getAllHUbList() {
    this.cityHub = this.cityListData.map(function (elem) {
      return elem.Cityid ? elem.Cityid : elem
    });

    this.blocked = true;
    this._service.getMultiHubList(this.cityHub).subscribe(res => {
      this.hubList = res.filter(x => x.IsKPP === false);
      console.log(this.selectedHub)
      this.blocked = false;
    });
  }


  getHubList(cities) {
    this.hubList = [];
    this.cityHub = [];
    this.blocked = true;
    this.cityId = cities.Cityid
    this.cityHub.push(this.cityId);
    this._service.getMultiHubList(this.cityHub).subscribe(res => {
      this.hubList = res.filter(x => x.IsKPP === false)
      this.blocked = false;
    });
  }

  searchData() {
    debugger
     this.first=0
     this.skip=1
    this.selectedBrandname=[]
    if (this.selectedHub == undefined) {
      alert("Please Select Hub")
      return false;
    }
 
    else if (this.BrandData ==undefined)  {
      alert("Please Select Brand")
      return false;
    }
   
    else if (this.selectDate == null) {
      alert("Please Select Month")
      return false;
    }
     if (this.BrandData != undefined) {
      this.BrandData.forEach((x: any) => {
        this.selectedBrandname.push(x.BrandId)
      })
    }
    const payload =
    {
      'subSubCategoriesIds': this.selectedBrandname,
      'WarehouseId': this.selectedHub.WarehouseId,
      'month': this.selectDate ? moment(this.selectDate).format('yyyy-MM-01') : null,
      'skip': this.skip,
      'take': this.take
    }
     if(this.selectedBrandname.length==0)
    {
      alert("Please Select Brand")
      return false;
    }
    console.log(payload, "rrrr");
   
    this.blocked = true;
    this.isShow=true
    this._service.SalesIndentDashBoard(payload).subscribe(res => {
      debugger
      console.log("res===",res);
      
      this.data = res.SalesIntentApprovalOldDCs
       this.totalRecords=res.SalesIntentApprovalOldDCs[0].TotalRecord

      console.log(this.totalRecords);
      this.blocked = false;
    })
  
  
  }

  removeData() {
    this.first=0
    this.selectedHub = null;
    this.BrandData = null;
    this.selectDate = null;
    this.data = []
    this.datayr = []
    this.totalRecords=null

  }

  ExportData() {
    debugger

    this.selectedBrandname=[]
    if (this.selectedHub == undefined) {
      alert("Please Select Hub")
      return false;
    }
    else if (this.BrandData == undefined) {
      alert("Please Select Brand")
      return false;
    }
    else if (this.selectDate == null) {
      alert("Please Select Month")
      return false;
    }
    if (this.BrandData != undefined) {
      this.BrandData.forEach((x: any) => {
        this.selectedBrandname.push(x.BrandId)
      })
    }
    const payload =
    {
      'subSubCategoriesIds': this.selectedBrandname,
      'WarehouseId': this.selectedHub.WarehouseId,
      'month': this.selectDate ? moment(this.selectDate).format('yyyy-MM-01') : null,
      'skip': 1,
      'take': this.totalRecords
    }
    if(this.selectedBrandname.length==0)
    {
      alert("Please Select Brand")
      return false;
    }
    console.log(payload);
    this.blocked = true;
    this._service.exportIndent(payload).subscribe(res => {
      this.exportIndentData = res;
      console.log(this.exportIndentData);
      if (this.exportIndentData.length != 0) {
        this.exportService.exportAsExcelFile(res, 'exportIndentData');
        this.blocked = false;
        this.isShow=false
      }
      else
        alert("Data not found")
      this.blocked = false;
      this.isShow=false
    },
      err => {
        alert("Record not found")
        this.blocked = false;
      }
    )
  }
  exportYtdData()
  {
    this.selectedBrandname=[]
    if (this.selectedHub == undefined) {
      alert("Please Select Hub")
      return false;
    }
    else if (this.BrandData == undefined) {
      alert("Please Select Brand")
      return false;
    }
    else if (this.selectDate == null) {
      alert("Please Select Month")
      return false;
    }
    if (this.BrandData != undefined) {
      this.BrandData.forEach((x: any) => {
        this.selectedBrandname.push(x.BrandId)
      })
    }
    const payload =
    {
      'subSubCategoriesIds': this.selectedBrandname,
      'WarehouseId': this.selectedHub.WarehouseId,
      'month': this.selectDate ? moment(this.selectDate).format('yyyy-MM-01') : null,
      'skip': 1,
      'take': this.totalRecords
    }
    if(this.selectedBrandname.length==0)
    {
      alert("Please Select Brand")
      return false;
    }
    console.log(payload);
    this.blocked = true;
    this._service.exportIndentForYtd(payload).subscribe(res => {
      this.exportIndentData = res;
      console.log(this.exportIndentData);
      if (this.exportIndentData.length != 0) {
        this.exportService.exportAsExcelFile(res, 'exportIndentForYtd');
        this.blocked = false;
        this.isShow=false
      }
      else
        alert("Data not found")
      this.blocked = false;
      this.isShow=false
    },
      err => {
        alert("Record not found")
        this.blocked = false;
      }
    )
  }

///////////////////////////
}





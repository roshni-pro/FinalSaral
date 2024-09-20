import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SalesAppServiceService } from '../../Services/sales-app-service.service'
import { MessageService } from 'primeng/api';
import { itemlist_class } from 'app/Digital-Sales/digital.module';
import { ActivatedRoute } from '@angular/router';
import { start } from 'repl';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  //#region  code that support page
  startDates: Date
  endDates: Date
  List: any[] = []
  store: any[] = []
  groupList: any[];
  selectType: any[] = []
  selectedType: any
  selectCondition: any
  categoryData: any[] = []
  subCategoryData: any[] = []
  subSubCategoryData: any[] = []
  showCat: boolean = false
  showSubCat: boolean = false
  showBrand: boolean = false
  showOrderAmt: boolean = false
  showOrderCount: boolean = false
  showOrderValue: boolean = false
  selectedCondition: any
  selectedStoreId: any
  response: any[] = []
  storeId: number
  custIds: any[] = [];
  selectedList: any[];
  minDate: Date;
  maxDate: Date;
  getStoreId: any;
  storeObject: any;
  groupDataObject: any;
  StoreId: number;
  showTbl: boolean = false;
  showCriteria: boolean;
  listData: any[] = []
  selectWarehouse: any
  selectedCategory: any;
  selectedBrand: any;
  selectedSubCategory: any;
  selectedCategoryId: number
  orderAmount: number
  Count: number
  orderValue: number
  Order1: number
  Order2: number
  Order3: number
  type: any
  typeValue: any
  warehouseVal: any
  dateList: any
  whereclause: any = "";
  havingclause: any = "";
  whereclausestmt: any = "";
  havingclausestmt: any = "";
  clause: string = null;
  groupData: any;
  newArray: any[] = []
  newArrayList: any[] = [];
  showItem: boolean = false;
  clauseDisplay: string = null;
  whereclauseDisplay: any = "";
  havingclauseDisplay: any = "";
  newArrayDisplay: any[] = []
  newArrayListDisplay: any[] = [];
  rawData: RawData;
  rawDataList: RawData[];
  blocked:boolean=false;
  constructor(private salesApp: SalesAppServiceService, private ActiveRoute: ActivatedRoute, private router: Router, private messageService: MessageService){
    this.selectType = [
      { "Type": "Order Amount", "code": 0 },
      { "Type": "Order Count", "code": 1 },
      { "Type": "Category", "code": 2 },
      { "Type": "Sub Category", "code": 3 },
      { "Type": "Brand", "code": 4 }
    ]

    this.selectCondition = [
      { "Type": "Greater than", "value": ">" },
      { "Type": "Less than", "value": "<" },
      { "Type": "Equal to", "value": "=" },
      { "Type": "Not Equal to", "value": "!=" },
    ]

   
  }
  ngOnInit() {
    this.initializeRawData();
    this.selectedStoreId = this.ActiveRoute.snapshot.paramMap.get('storename');
    this.groupData = this.ActiveRoute.snapshot.paramMap.get('groupname');
    this.getStore();
    var date = new Date();
    this.minDate = new Date(date.setMonth(date.getMonth() - 6));
    this.maxDate = new Date();
    this.getListOfWarehouse();
    this.getAllCategory();
    this.getSubCategory();
    this.getSubSubCategory();
    this.showCat = false
    this.showSubCat = false
    this.showBrand = false
    this.showOrderValue = false;
  }


  getListOfWarehouse() {
    this.salesApp.getWarehouses().subscribe(data => {
      this.List = data;
    })
  }

  enable:boolean=false;
  getStore() {
    this.salesApp.GetStoreList().subscribe(data => {
      this.store = data;
      var object =
      {
        BrandList: null,
        Id: 0,
        ImagePath: "",
        IsActive: true,
        IsDeleted: false,
        Name: "All Stores",
        OwnerId: 0
      }
      this.store.push(object);
      // console.log(this.store);
     
      if(this.selectedStoreId=="All Stores"){
        this.enable=false;
      }
      else{
        this.enable=true;
      }
      this.getStoreId = this.store.filter(x => x.Name == this.selectedStoreId)[0].Id;
      this.storeObject = this.store.filter(x => x.Name == this.selectedStoreId)[0];
      this.getGroupList(this.getStoreId);
      //console.log(this.getStoreId);

    })
  }
  getGroupByStore(storeObj) {

    this.salesApp.GetGroups(storeObj.Id).subscribe(data => {
      this.groupList = data
      //console.log(this.groupList,"ll");

    })
  }
  getGroupList(storeId) {
    // console.log(storeId);
    this.salesApp.GetGroups(storeId).subscribe(data => {
      this.groupList = data
      this.groupDataObject = this.groupList.filter(x => x.GroupName == this.groupData)[0];
      //console.log(this.groupData);
    })
  }

  getSelectedType(selectedType) {

    this.onTypeChange();

    if (selectedType.Type == 'Category' && selectedType.Type != 'Sub Category' && selectedType.Type != 'Brand') {
      this.showCat = true
      this.showSubCat = false
      this.showBrand = false
      this.showOrderValue = true
      this.showOrderAmt = false
      this.showOrderCount = false

      // alert("please select category")
    }
    if (selectedType.Type == "Sub Category" && selectedType.Type != 'Category' && selectedType.Type != 'Brand') {
      this.showSubCat = true
      this.showCat = false
      this.showBrand = false
      this.showOrderValue = true
      this.showOrderAmt = false
      this.showOrderCount = false
      // alert("please select Sub category")
    }
    if (selectedType.Type == "Brand" && selectedType.Type != 'Sub Category' && selectedType.Type != 'Category') {
      this.showBrand = true
      this.showSubCat = false
      this.showCat = false
      this.showOrderValue = true
      this.showOrderAmt = false
      this.showOrderCount = false
      // alert("please select Brand")
    }
    if (selectedType.Type == 'Order Amount' && selectedType.Type != 'Order Count') {
      this.showOrderAmt = true
      this.showCat = false
      this.showSubCat = false
      this.showBrand = false
      this.showOrderCount = false
      this.showOrderValue = false
    }
    if (selectedType.Type == 'Order Count' && selectedType.Type != 'Order Amount') {
      this.showOrderCount = true
      this.showOrderAmt = false
      this.showCat = false
      this.showSubCat = false
      this.showBrand = false
      this.showOrderValue = false
    }
  }

  getAllCategory() {
    this.salesApp.getCategory().subscribe(data => {
      this.categoryData = data
    })
  }

  getSubCategory() {
    this.salesApp.getSubCategory().subscribe(data => {
      this.subCategoryData = data
    })
  }

  getSubSubCategory() {
    this.salesApp.getSubSubCategory().subscribe(data => {
      this.subSubCategoryData = data;
    })
  }

  addCriteria() {
    this.onAddCriteria();

    this.listData = [];
    if (this.selectedType == undefined || this.selectedType == "") {
      alert("please select Type")
      return false;
    }
    else if (this.selectedCondition == undefined || this.selectedCondition == "") {
      alert("please select condition")
      return false;
    }
    else if (this.selectedType.Type == 'Category' && this.selectedCategory == undefined) {
      alert("please select category")
      return
    }
    else if (this.selectedType.Type == 'Sub Category' && this.selectedSubCategory == undefined) {
      alert("please select Sub Category")
      return
    }
    else if (this.selectedType.Type == 'Brand' && this.selectedBrand == undefined) {
      alert("please select Brand")
      return
    }
    else if (this.orderAmount == undefined && this.selectedType.Type== "Order Amount") {
      alert("enter order amount")
      return
    }
    else if (this.Count == undefined && this.selectedType.Type== "Order Count") {
      alert("enter order count")
      return
    }
    else if(this.orderValue == undefined && this.selectedType.Type!= "Order Count" && this.selectedType.Type!= "Order Amount" ) {
      alert("enter order value")
      return
    }

    if (this.selectedCategory != undefined) {
      this.selectedCategoryId = this.selectedCategory.Categoryid
    }
    else if (this.selectedSubCategory != undefined) {
      this.selectedCategoryId = this.selectedSubCategory.SubCategoryId
    }
    else if (this.selectedBrand != undefined) {
      this.selectedCategoryId = this.selectedBrand.SubsubcategoryName
    }
    if (this.orderAmount != undefined) {
      this.Order1 = this.orderAmount
    }
    if (this.Count != undefined) {
      this.Order2 = this.Count
    }
    if (this.orderValue != undefined) {
      this.Order3 = this.orderValue
    }
    if (this.selectedType != undefined) {
      this.type = this.selectedType.code
    }
    if (this.selectedCondition != undefined) {
      this.typeValue = this.selectedCondition.value
    }
    if (this.selectWarehouse != undefined) {
      this.warehouseVal = this.selectWarehouse.WarehouseName
    }
    if (this.selectWarehouse != undefined && this.selectWarehouse.WarehouseId > 0) {
      this.whereclauseDisplay += this.selectWarehouse.WarehouseName + "  " + "and ";
    }
    if (this.startDates != undefined && this.endDates != undefined) {
      this.whereclauseDisplay += " Date between " + "'" + [moment(this.startDates).format('YYYY-MM-DD')] + "'" + " and " + "'" + [moment(this.endDates).format('YYYY-MM-DD')] + " 23:59:59'" + " and ";
    }
    if (this.selectedType != undefined && (this.selectedType.code >= 0 || this.selectedType.code <= 1)) {
      if (this.selectedType.code == 0) {
        if (this.havingclause == "") {
          this.havingclauseDisplay = " TotalAmount " + this.selectedCondition.Type + " " + (this.orderAmount > 0 ? this.orderAmount : 0);
        }
        else {
          this.havingclauseDisplay += " TotalAmount " + this.selectedCondition.Type + " " + (this.orderAmount > 0 ? this.orderAmount : 0);
        }
      }
      if (this.selectedType.code == 1) {
        if (this.havingclause == "") {
          this.havingclauseDisplay += " Count " + this.selectedCondition.Type + " " + (this.Count > 0 ? this.Count : 0);
        }
        else {
          this.havingclauseDisplay += " Count " + this.selectedCondition.Type + " " + (this.Count > 0 ? this.Count : 0);
        }
      }
      if (this.selectedType.code == 2) {
        this.whereclauseDisplay += this.selectedCategory.CategoryName + "  " + "and";
        if (this.havingclause == "") {
          this.havingclauseDisplay += " TotalAmount " + this.selectedCondition.Type + " " + (this.orderValue > 0 ? this.orderValue : 0);
        }
        else {
          this.havingclauseDisplay += " TotalAmount " + this.selectedCondition.Type + " " + (this.orderValue > 0 ? this.orderValue : 0);
        }
      }
      if (this.selectedType.code == 3) {
        this.whereclauseDisplay += this.selectedSubCategory.SubcategoryName + "  " + "and";
        if (this.havingclause == "") {
          this.havingclauseDisplay += " TotalAmount " + this.selectedCondition.Type + " " + (this.orderValue > 0 ? this.orderValue : 0);
        }
        else {
          this.havingclauseDisplay += " TotalAmount " + this.selectedCondition.Type + " " + (this.orderValue > 0 ? this.orderValue : 0);
        }
      }
      if (this.selectedType.code == 4) {
        this.whereclauseDisplay += this.selectedBrand.SubsubcategoryName + "  " + "and";
        if (this.havingclause == "") {
         this.havingclauseDisplay += " TotalAmount " + this.selectedCondition.Type + " " + (this.orderValue > 0 ? this.orderValue : 0);
        }
        else {
          this.havingclauseDisplay += " TotalAmount " + this.selectedCondition.Type + " " + (this.orderValue > 0 ? this.orderValue : 0);
        }
      }
      this.showCriteria = true
    }

    this.clauseDisplay = this.whereclauseDisplay + " " + this.havingclauseDisplay;
    this.newArrayDisplay.push(this.clauseDisplay)
    this.selectedType = "";
    this.selectedCategoryId = null;
    this.orderAmount = null;
    this.Count = null;
    this.orderValue = null;
    this.selectedCondition = "";
    this.selectWarehouse = undefined;
    this.startDates = null;
    this.endDates = null;
    this.whereclause = "";
    this.havingclause = "";
    this.selectedCategory = undefined;
    this.selectedBrand = undefined;
    this.selectedSubCategory = undefined;
    this.showCat = false;
    this.showSubCat = false;
    this.showBrand = false;
    this.showOrderValue = false;
    this.showOrderAmt = false;
    this.showOrderCount = false;
    this.whereclauseDisplay = ''
    this.havingclauseDisplay = ''
  }

  AllClear() {
    this.rawDataList = [];
    this.newArray = [];
    this.showTbl = false
    this.selectedType = ''
    this.selectedCondition = ''
    this.selectWarehouse = ''
    this.orderAmount = null
    this.orderValue = null
    this.Count = null
    this.selectedCategory = ''
    this.selectedSubCategory = ''
    this.selectedBrand = ''
    this.startDates = null;
    this.endDates = null;
    this.listData = []
    this.newArrayList = []
    this.newArrayDisplay = [];
    this.AddCriteria=false;
  }

  removeCustomer() {
    this.storeObject = '',
    this.groupDataObject = '';
    this.selectedList = [];
  }

  AddCustomer() {
    if (this.selectedList == undefined || this.selectedList.length==0) {
      alert("please add customer")
      return false
    }
    if (this.selectedList.length > 0) {
      const custids = [];
      if (this.selectedList && this.selectedList.length > 0) {
        this.selectedList.forEach(element => {
          custids.push(element.CustomerId);
        });
      }
      const payload1= {
        'GroupId': this.groupDataObject.Id,
        'CustomerId': custids
      }
      this.salesApp.addCustomer(payload1).subscribe(data => {
        this.response = data
        alert("customer updated");
        this.AllClear();
      })
    }
  }

  backBtn() {
    this.router.navigateByUrl("layout/salesApp/salesGroups")
  }

  //#endregion


  //#region code to send raw data to backend

  initializeRawData() {
    this.rawData = {
      WarehouseId: null,
      TypeCode: null,
      ConditionValue: null,
      SelectedBrandName: null,
      SelectedCategoryName: null,
      SelectedSubCategoryName: null,
      OrderAmount: null,
      OrderCount: null,
      OrderValue: null,
      EndDate: null,
      StartDate: null
    }
  }

  onWarehouseChange() {
    this.rawData.WarehouseId = this.selectWarehouse.WarehouseId;
    // console.log('selectWarehouse: ', this.rawData);
  }

  onConditionChange() {
    this.rawData.ConditionValue = this.selectedCondition.value;
    // console.log('selectedCondition: ', this.rawData);
  }

  onCategoryChange() {
    this.rawData.SelectedCategoryName = this.selectedCategory.CategoryName;
    // console.log('selectedCategory: ', this.rawData );
  }

  onSubCategoryChange() {
    this.rawData.SelectedSubCategoryName = this.selectedSubCategory.SubcategoryName;
    // console.log('selectedSubCategory', this.rawData);
  }

  onBrandChange() {
    this.rawData.SelectedBrandName = this.selectedBrand.SubsubcategoryName;
    // console.log('selectedBrand', this.rawData);
  }

  onOrderAmountChange() {
    this.rawData.OrderAmount = this.orderAmount;
    // console.log('orderAmount', this.rawData);
  }

  onOrderCountChange() {
    this.rawData.OrderCount = this.Count;
    // console.log('orderCount', this.rawData);
  }

  onOrderValueChange() {
    this.rawData.OrderValue = this.orderValue;
    // console.log('orderValue', this.rawData);
  }

  onStartDate() {
    this.rawData.StartDate = this.startDates
    // console.log('startDate', this.startDates);
  }

  onEndDate() {
    this.rawData.EndDate = this.endDates
    // console.log('endDate', this.rawData);
  }

  onTypeChange() {
    this.rawData.TypeCode = this.selectedType.code;

    this.rawData.SelectedCategoryName = null;
    this.rawData.SelectedSubCategoryName = null;
    this.rawData.SelectedBrandName = null;
    this.rawData.OrderAmount = null;
    this.rawData.OrderCount = null;
    this.rawData.OrderValue = null;

    this.selectedCategory = null;
    this.selectedSubCategory = null;
    this.selectedBrand = null;
    this.orderAmount = null;
    this.Count = null;
    this.orderValue = null;
    // console.log('selectedType', this.rawData);
  }

  onAddCriteria() {
    if (!this.rawDataList || this.rawDataList.length < 1) {
      this.rawDataList = [];
    }
    this.rawDataList.push(this.rawData);
    this.rawData={
      WarehouseId:  null,
      TypeCode: null,
      ConditionValue:null,
      SelectedCategoryName: null,
      SelectedSubCategoryName: null,
      SelectedBrandName: null,
      OrderAmount: null,
      OrderCount:  null,
      OrderValue:  null,
      StartDate:  null,
      EndDate: null,
    }
    this.AddCriteria=true;
  }

  
  AddCriteria:boolean=false;
  getSearchNew() {
    if (this.AddCriteria == false) {
      alert("Add Criteria Before search")
      return false;
    }
    else{
      this.blocked=true;
      
      this.salesApp.getCustomerDetail(this.rawDataList).subscribe(x =>{
        console.log('list is:', x);
        this.blocked=false;
        this.listData = x;
        if(this.listData.length==0) alert("data not found");
        
        this.AddCriteria=false;
      }),(err: any) => {
        console.log(err);
        
        this.blocked=false;
        alert(err)
        this.AddCriteria=false;
      }
      
    }
  }
  //#endregion
}

interface RawData {
  WarehouseId: number | null;
  TypeCode: number | null;
  ConditionValue: string;
  SelectedCategoryName: string | null;
  SelectedSubCategoryName: string | null;
  SelectedBrandName: string | null;
  OrderAmount: number | null;
  OrderCount: number | null;
  OrderValue: number | null;
  StartDate: Date | null;
  EndDate: Date | null;
}


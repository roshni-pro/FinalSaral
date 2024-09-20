import { Component, OnInit } from '@angular/core';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { StockHistoryService } from 'app/VirtualStockManagement/Services/stock-history.service';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';
import { StockHistoryPageFilter, StockHistoryList } from 'app/VirtualStockManagement/Interfaces/stock-history-page-filter';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';


@Component({
  selector: 'app-non-sellable-and-clearance-stocks',
  templateUrl: './non-sellable-and-clearance-stocks.component.html',
  styleUrls: ['./non-sellable-and-clearance-stocks.component.scss']
})
export class NonSellableAndClearanceStocksComponent implements OnInit {

  //stocks
  stockList = [
    { name: "Non Revenue Stocks", value: "NR" },
    { name: "Non Sellable Stocks", value: "N" },
    { name: "Clearance Stocks", value: "CL" }
  ]

  warehouseList: any[];
  warehouseID: any;
  itemValue: any={
    "itemname":'',
    "ItemMultiMRPId":null
  };
  itemList: any[];
  isSelected: boolean = true;
  selectedStockType: any = this.stockList[0];

  blocked:boolean=false;
  //Item Name
  selectedItemName: any;


  //stock result list
  stockTypeSearchList: any = [];
  totalRecord: number;
  stockTypeSearchDC:  stockTypeSearchDC;


  //history section 
  historyPopUp: boolean = false;
  historyListTotalRecords: number;
  stockHistoryPageFilter: StockHistoryPageFilter;
  stockHistory: StockHistoryList;
  isLoading: boolean;

  //transaction
  TransactionPopup: boolean = false;
  showTransactionRow: boolean = false;
  tranferQty: number = 0;
  stockTransactionList: any = [];
  selectedtransactionList: any = [];
  ClearanceLiveItemDC: ClearanceLiveItemDC;
  


  constructor(private apiService: InventoryAssignSupervisiorService,
    private warehouseService: WarehouseService,
    private virtualstockservice: VirtualStockService,
    private stockHistoryService: StockHistoryService,
    private exportService: ExportServiceService
  ) {

    this.stockHistory = {
      PageList: null,
      TotalRecords: 0,
      StockHistoryData : null
    }

    this.stockHistoryPageFilter = {
      ItemMultiMRPId: 0,
      WarehouseId: 0,
      RefStockType: null,
      Skip: 0,
      StockType: "",
      Take: 50,
      UserId: null
    }
  }

  ngOnInit() {
    this.warehouseService.getWarehouseCommon()
      .subscribe(result => {
        this.warehouseList = result;
        console.log("this.warehouseList",this.warehouseList);
        
      });
      this.isSelected=true;
  }



  GetItemsNameLists(e) {
  
  }


  selectedItem : any;
  searchStockList() {
    if (!this.selectedStockType || !this.warehouseID) {
      alert("Please Select Stock Type, warehouse");
      return;
    }
    let WarehouseId=[]
    this.warehouseID.forEach(e=>{
      WarehouseId.push(e.value);
    })
    let BID =[]
    if(this.BrandID!=undefined){
    this.BrandID.forEach(element => {
      BID.push(element.BrandNumber)
    });}
    this.stockTypeSearchDC = {
      Skip: 0,
      Take: 10,
      WarehouseIds: WarehouseId,
      StockType: this.selectedStockType.value,
      SubsubCategoryids: BID ? BID : [],
      ItemMultiMRPId: this.itemValue != undefined? this.itemValue.ItemMultiMRPId : null,
      ItemName : this.itemValue.itemname
    }

    this.load(null);

  }

  
  exportStockList() {

    if (!this.stockTypeSearchDC) {
      alert("please select warehouse and item");
      return;
    }
    this.stockTypeSearchDC.Take = this.totalRecord;
	let BID=[]
    if (this.stockTypeSearchList && this.stockTypeSearchList.length > 0) {
      this.blocked=true;
      let WarehouseId=[]
      this.warehouseID.forEach(e=>{
        WarehouseId.push(e.value);
      })
      if(this.BrandID!=undefined)
      {
        BID=[]
        this.BrandID.forEach(e=>{
          BID.push(e.BrandNumber);
        })
      }      
      let payload={
        "WarehouseIds":WarehouseId,
        "StockType":this.selectedStockType.value,
        "SubsubCategoryids":BID?BID:[]
      }
      // this.apiService.searchStockList(this.stockTypeSearchDC).subscribe(res => {
        // this.blocked=false;
        
      this.apiService.exportStockList(payload).subscribe(res => {
        // this.blocked=false;
        
        console.log(res,"resExport");
        
        if(this.selectedStockType.value == 'N')
        {
          let  result = res.map(function(a){
            return{
              "WarehouseName": a.WarehouseName,
              "ItemName": a.ItemName,
              "Item Number":a.ItemNumber,
              "ItemMultiMRPId": a.ItemMultiMRPId,
              "NonSellable Inventory":a.Inventory,
              "Reason to Transfer":a.Comment?a.Comment:'-----',
              "APP": a.APP,
              "Updated Date":a.UpdatedDate?moment(a.UpdatedDate).format("DD-MMM-YYYY"):'-----',
              "Updated By":a.PeopleFirstName?a.PeopleFirstName:'-----',
              "Store Name":a.StoreName?a.StoreName:'-----',   
              "catagory":a.CategoryName?a.CategoryName:'-----',
              "subcategory":a.SubcategoryName?a.SubcategoryName:'-----',
              "subsubcategory":a.SubsubcategoryName?a.SubsubcategoryName:'-----',
              // "BatchCode" : a.BatchCode?a.BatchCode:'----',
              // "MFGDate" : a.MFGDate?a.MFGDate:'N/A',       
              // "ExpiryDate" : a.ExpiryDate?a.ExpiryDate:'N/A'
            }
          })
          
        this.blocked=true;
        this.exportService.exportAsExcelFile(result, 'Stock Details');
        this.blocked=false;
        }else  if(this.selectedStockType.value == 'NR')
        {
          let  result = res.map(function(a){
            return{
              "WarehouseName": a.WarehouseName,
              "ItemName": a.ItemName,
              "Item Number":a.ItemNumber,
              "ItemMultiMRPId": a.ItemMultiMRPId,
              "NonRevenueInventory":a.Inventory,
              "Reason to Transfer":a.Comment?a.Comment:'-----',
              "APP": a.APP,
              "Updated Date":a.UpdatedDate?moment(a.UpdatedDate).format("DD/MM/YYYY"):'-----',
              "Updated By":a.PeopleFirstName?a.PeopleFirstName:'-----',
              "Store Name":a.StoreName?a.StoreName:'-----',   
              "catagory":a.CategoryName?a.CategoryName:'-----',
              "subcategory":a.SubcategoryName?a.SubcategoryName:'-----',
              "subsubcategory":a.SubsubcategoryName?a.SubsubcategoryName:'-----'       
            }
          })
          
        this.blocked=true;
        this.exportService.exportAsExcelFile(result, 'Stock Details');
        this.blocked=false;
        }
        else{
          let  result = res.map(function(a){
            return{
              "WarehouseName": a.WarehouseName,
              "Item Number":a.ItemNumber,
              "ItemName": a.ItemName,
              "ABCClassification":a.ABCClassification,
              "ItemMultiMRPId": a.ItemMultiMRPId,
              //"Clearance Inventory":a.Inventory,
              "CreatedDate": moment(a.CreatedDate).format("DD/MM/YYYY"),
              "APP":a.APP,
              "MRP": a.MRP,
              "BatchCode":a.BatchCode,
              "MFGDate":a.MFGDate,
              "ExpiryDate": moment(a.ExpiryDate).format("DD/MM/YYYY"),
              "StockQty":a.StockQty,
              "RemainShelfLifedays":a.RemainShelfLifedays,
              "RemainingShelfLife":a.RemainingShelfLife,
              "Reason to Transfer":a.Comment?a.Comment:'-----',
              "Updated Date":a.UpdatedDate?moment(a.UpdatedDate).format("DD/MM/YYYY"):'-----',
              "Updated By":a.PeopleFirstName?a.PeopleFirstName:'-----',  
              "Store Name":a.StoreName?a.StoreName:'-----', 
              "catagory":a.CategoryName?a.CategoryName:'-----',
              "subcategory":a.SubcategoryName?a.SubcategoryName:'-----',
              "subsubcategory":a.SubsubcategoryName?a.SubsubcategoryName:'-----' 
            }
          })
          
        // this.blocked=true;
        this.exportService.exportAsExcelFile(result, 'Stock Details');
        this.blocked=false;
        }        
        
      })
    } else {
      alert('List is empty');
    }

  }

  load(event) {

    this.showTransactionRow = false;
    if (!this.warehouseID) {
      return;
    }


    // if (event && this.selectedItemName && this.selectedStockType) {
      let WarehouseId=[]
      this.warehouseID.forEach(e=>{
        WarehouseId.push(e.value);
      })
      let BID=[]
      if(this.BrandID!=undefined){
      this.BrandID.forEach(element => {
        BID.push(element.BrandNumber)
      });}
      this.stockTypeSearchDC = {
        Skip: event ? event.first : 0,
        Take: event && event.rows ? event.rows : 10,
        WarehouseIds: WarehouseId,
        SubsubCategoryids: BID ? BID : [],
        StockType: this.selectedStockType.value,
        ItemMultiMRPId: this.itemValue != undefined ? this.itemValue.ItemMultiMRPId : null,
        ItemName : this.itemValue != undefined? this.itemValue.itemname : this.selectedItem
      }
    // }


    // if (this.selectedItemName && this.selectedStockType) {
      this.blocked=true;
    this.apiService.searchStockList(this.stockTypeSearchDC).subscribe(res => {
      this.blocked=false;
      console.log("-----------------------------------", res);
      if (res) {
//    
        this.stockTypeSearchList = res.allRecords;
        this.totalRecord = res.totalRecords;
        if (this.stockTypeSearchList && this.selectedStockType.value == "CL") {
          this.showTransactionRow = true;
          // this.iscl=true
        }
      } else {
        this.stockTypeSearchList = [];
        this.totalRecord = 0;
        this.showTransactionRow = false;
      }
    }, err => {
      console.log(err);
    })
    // } else {
    //   console.log(this.selectedItemName, this.selectedStockType);
    // }

  }

iscl:boolean=false

  getitemList(event) {
    // if (event.query.length > 2 && this.warehouseID) {
      // this.blocked=true;
      let WarehouseId=[]
      this.warehouseID.forEach(e=>{
        WarehouseId.push(e.value);
      })
      // this.virtualstockservice.searchWarehouseItems(event.query, this.warehouseID).subscribe(result => {
      //   this.blocked=false;
      //   this.itemList = result;
      //   console.log(this.itemList)
      // })
    // }
  }


  getStocksList(event) {
 
  }

  onSelectItem(event) {
    this.itemValue = event;
    this.isSelected = true;

  }

  cancel() {
    this.itemValue = null;
    this.isSelected = false;
  }

  skip:number
  take:number
  StockId:number
  StockType  :string
  clearanceData:any
  isClearance:boolean=false;
  clearanceDataTotalRecords:any
  openHistory(rowdata) {
  
if(this.selectedStockType.value=="CL"){
  this.skip=0;
  this.take=50
  this.StockId=rowdata.Id
  // this.StockType=this.selectedStockType.value
  this.isLoading=true;
  this.blocked=true;
  this.virtualstockservice.getClearanceStockList(this.skip,this.take, this.StockId,  this.selectedStockType.value).subscribe(x=>{
    this.blocked=false;
    console.log("data",x.TotalRecords);
    
    this.clearanceData = x.StockHistoryData;
    console.log("this.clearanceData",this.clearanceData);
    
    this.clearanceDataTotalRecords=x.TotalRecords;
    this.isLoading = false;

    if(this.clearanceDataTotalRecords>0){
      this.isClearance = true;
    }
    else{
      alert("No Data Found")
    }
  })
  
}
else{
  this.stockHistoryPageFilter = {
    ItemMultiMRPId: rowdata.ItemMultiMRPId,
    WarehouseId: rowdata.WarehouseId,
    RefStockType: null,
    Skip: 0,
    StockType: this.selectedStockType.value ,//== 'CL' ? "ClearanceStockNews" : "NonSellableStocks",
    Take: 50,
    UserId: null
  }
  this.StockId=rowdata.Id
  console.log(" this.stockHistoryPageFilter", this.stockHistoryPageFilter);
  
  console.log(rowdata, this.stockHistoryPageFilter, this.selectedStockType);
  this.historyPopUp=true;
  this.loadData(null,this.StockId);
}
  }

  export(){
    debugger
    var ToRecordType:any
    if(this.isClearance){
      ToRecordType=this.clearanceDataTotalRecords;
    }
    else{
      ToRecordType=this.stockHistory.TotalRecords
    }
    this.blocked=true;
  this.virtualstockservice.getExportHistory(this.StockId, this.selectedStockType.value).subscribe(x=>{
    console.log(x,"xxxxx");
    
    this.blocked=false;
    var result = x.StockHistoryData.map(function(a) {
      
      return {
        'WarehouseName': a.WarehouseName,
        'ItemMultiMRPId': a.ItemMultiMRPId,
        'ItemName': a.ItemName,
        'ItemNumber': a.ItemNumber,
        'MRP':a.MRP,
        'App' : a.APP,
        'NetInventory':a.NetInventory,
        'In Out Qty':a.Inventory,
        'Comment':a.Comment,
        'Date':a.CreatedDate,
        'User':a.PeopleFirstName
       };
     });
  

    this.exportService.exportAsExcelFile(result,this.selectedStockType.value=="NR"?"NonRevenueOrders":this.selectedStockType.value=="N"?"NonSellableOrder":"Clearenceorder"  )
  })
  }
  
  inventorypopup:boolean=false;
  qtyList:any;
  openInventoryPopup(rowdata) {
    this.inventorypopup = true;
    this.blocked=true;
    this.apiService.openInventoryQty(rowdata.ItemMultiMRPId,rowdata.WarehouseId,this.selectedStockType.value).subscribe(res => {
      this.blocked=false;
      console.log(res);
      this.qtyList = res;

    })
  }

  loadData(event,StockId) {
    
    if ( this.historyPopUp) {
      console.log('load event is: ', event);
      if (event) {
        this.stockHistoryPageFilter.Skip = event.first;
        this.stockHistoryPageFilter.Take = event.rows;
      }
      this.isLoading = true;
      this.blocked=true;
      this.historyPopUp=false;
      this.virtualstockservice.getClearanceStockList(this.stockHistoryPageFilter.Skip,this.stockHistoryPageFilter.Take ,StockId,this.stockHistoryPageFilter.StockType).subscribe(x => {
        
        console.log(x);
        
        this.blocked=false;
        this.stockHistory = x;
        this.isLoading = false;
        if(this.stockHistory.TotalRecords ==0){
          alert("No data found");
          this.historyPopUp=false;
        }
        else{
          this.historyPopUp=true;
        }
        
      });
    }
    
  }

  openTransactionPopup(rowData) {
    this.selectedtransactionList = [];
    (rowData);
    this.stockTransactionList = [];
    this.blocked=true;
    this.apiService.BatchwiseItemWithQty(rowData.Id).subscribe(res => {
      this.blocked=false;
      console.log("transfer list", res);
      this.stockTransactionList = res;
      if (this.stockTransactionList && this.stockTransactionList.length > 0) {
        this.stockTransactionList.forEach(element => {
          element.tranferQty = 0;
          element.UpdatedUnitPrice = element.UnitPrice;
          element.selected = true;
          element.discount = 0;
          element.selectedDiscountType = "Percentage";
          if(element.ExpiryDate && element.MFGDate){
            element.dateDifference = Math.floor((Date.parse(element.ExpiryDate) - Date.parse(element.MFGDate)) / 1000 / 60 / 60 / 24);
          }else{
            element.dateDifference = '';
          }
        });
      }
      this.TransactionPopup = true;
    });
  }

  tranferSelectedQuantity() {
    //selectedtransactionList: any = [];
    console.log(this.selectedtransactionList);

    let checkValidTransferQty = 0;
    let checkValidUnitPrice = 0;

    if (this.selectedtransactionList && this.selectedtransactionList.length == 0) {
      alert("please select elements and then enter transfer quantity to countinue");
      // checkValid = checkValid + 1;
      return;
    }

    if (this.selectedtransactionList && this.selectedtransactionList.length > 0) {

      this.selectedtransactionList.forEach(element => {
        if (element.tranferQty < 1 || element.tranferQty > element.AvailQty) {
          checkValidTransferQty = checkValidTransferQty + 1;
        }
        if (element.UpdatedUnitPrice < 1) {
          checkValidUnitPrice = checkValidUnitPrice + 1;
        }
      });
    }

    if (checkValidTransferQty > 0) {
      alert("Quantity Should be less than Available Quantity and more than zero");
      return;
    } else if (checkValidUnitPrice > 0) {
      alert("Enter Unit Price");
      return;
    } else {

    }


    if (this.selectedtransactionList && this.selectedtransactionList.length > 0 && checkValidTransferQty == 0 && checkValidUnitPrice == 0) {

      let TransferOpost = [];

      this.selectedtransactionList.forEach(element => {

        this.ClearanceLiveItemDC = {
          Id: element.Id,
          Qty: element.Qty,
          AvailQty: element.AvailQty,
          MFGDate: element.MFGDate,
          ExpiryDate: element.ExpiryDate,
          LiveQty: element.tranferQty,
          BatchCode: element.BatchCode,
          UnitPrice: element.UnitPrice,
          UpdatedUnitPrice: element.UpdatedUnitPrice,
          selectedDiscountType: element.selectedDiscountType,
          discount: element.discount,
          dateDifference: element.dateDifference
        }

        TransferOpost.push(
          this.ClearanceLiveItemDC
        )

      });

      console.log(TransferOpost);

      this.blocked=true;
      this.apiService.TransferBatchwiseItemWithQty(TransferOpost).subscribe(res => {
        this.blocked=false;
        console.log("TransferBatchwiseItemWithQty", res);
        if (res) {
          this.load(null);
          alert(res.SuccessMessage);
          this.TransactionPopup = false;
        }
      }, err => {
        alert("Error- Please try again")
      }

      );


    }

  }

  enableImputs(rowData, e) {
    console.log(rowData, e);
    rowData.selected = !rowData.selected;
    if (rowData.selected) {
      rowData.tranferQty = 0;
    }
  }

  changediscountType(e){
    e.discount = 0;
  }

  BrandList:any[]
  BrandID:any
  GetBrand()
  {
    this.BrandList=[]
    this.BrandID=undefined
    let WarehouseId=[]
    if(this.warehouseID !=undefined ){

      this.warehouseID.forEach(e=>{
        WarehouseId.push(e.value);
      })
    }

    const payload =
    {
      "warehouseids":WarehouseId,
      "StockType": this.selectedStockType.value,
    }
    // this.blocked=true;
    this.apiService.GetNonSellStkClearanceBrand(payload).subscribe(res => {
      // this.blocked=false;
      this.BrandList=res
      console.log("res",res)
    })
  }

  first:number=0
  cleart(){
    this.totalRecord=0;
    this.first=0;
  }
}


interface ClearanceLiveItemDC {
  Id: number,
  Qty: number,
  AvailQty: number,
  MFGDate: Date,
  ExpiryDate: Date,
  LiveQty: number,
  BatchCode: any,
  UnitPrice: number,
  UpdatedUnitPrice: number,
  selectedDiscountType: string,
  discount: number,
  dateDifference: any;
}


interface stockTypeSearchDC {
  Skip: number,
  Take: number,
  WarehouseIds: any,
  StockType: any,
  SubsubCategoryids:any
  ItemMultiMRPId: number | null
  ItemName : any;
}
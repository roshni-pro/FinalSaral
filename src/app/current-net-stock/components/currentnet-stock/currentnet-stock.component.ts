import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { VehicleService } from 'app/shared/services/vehicle.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-currentnet-stock',
  templateUrl: './currentnet-stock.component.html',
  styleUrls: ['./currentnet-stock.component.scss']
})
export class CurrentnetStockComponent implements OnInit {

  dboyList: any[];
  cols: any[];
  colmns:any[];
  dataAdd: any;
  isOpenPopup: boolean;
  isViewPopup: boolean = false;
  blocked: boolean;
  name: string = "";
  mobileno: string = "";
  aadharno: string = "";
  file: any;
  uploadFlagAdhar: boolean;
  uploadFlagPhoto: boolean;
  uploadFlagAdharBack: boolean;
  public imagePath;
  imgURL: any;
  selectAgentOrTrans: string;
  baseURL: any;
  AadharImage: any;
  AadharBackImage: any;
  PhotoImage: any;
  skip: any;
  take: any;
  totalRecords: number;
  cityList: any[];
  getDataList: any;
  isItemdetail: boolean;
  AgentList: any[];
  IsdisableAgent: boolean = false;
  IshowAdd: boolean = true;
  IshowEdit: boolean = true;
  @Input() Id: any;
  isInvalid: boolean = false;
  isdetails :boolean = false;
  masterwarehouseList: any[];
  regions:any[];
  hubs:any[];
  hubval:any[];
  statusval:string;
  pageNum: number = 1;
  search:any[];
  exportitem:any[];
  DboyValidity: boolean = false;
  CurrentDate: any;
  IsDisabled: boolean = false;
  DamageorderDetails:any;
  BuyerIds: any;
  selectedBuyer: any;
  length:number;
  amount:number;
  Getstock:any;
  NetTotalamount=0;
  isActiveValue:any;
  avgaging:any;
  avgData:any;
  itemmulid:any;
  rowData:any;
 
  constructor(private _service: VehicleService, private router: Router,private loaderService: LoaderService, private customerService: CustomerService, private route: ActivatedRoute, private exportService: ExportServiceService, private cityService: CityService, private messageService: MessageService, private datepipe: DatePipe, private pickerservice: PickerService) {
    this.dataAdd = {}; this.baseURL = environment.apiURL;
    this.CurrentDate = moment(new Date()).format('MM/DD/YYYY');
  }

  ngOnInit() {
  
    this.cols = [
      { field: 'ItemNumber', header: 'ItemNumber' },
      { field: 'ItemName', header: 'ItemName' },
      { field: 'ItemMultiMrpId', header: 'MultiMRPId' },
      { field: 'MRP', header: '(MRP)' },
      { field:'IsActive', header: 'Active' },
      { field: 'NetInventory', header: 'Net Inventory' },
      { field: 'CurrentNetInventory', header: 'CurrentNetInventory' },
      { field: 'OpenPOQTy', header: 'OpenPOQTy' },
      { field: 'CurrentDeliveryCanceledInventory', header: 'Del Can Inventory' },
      { field: 'AverageAging', header: 'AverageAging' }, 
      { field: 'AgingAvgPurchasePrice', header: 'AverageAging Price' },
      { field: 'FreestockNetInventory', header: 'FreestockNetInventory' },
      { field: 'ABCClassification', header: 'ABC Classification' },
      { field: 'Unitprice', header: 'Unit Price' }, 
      { field: 'CurrentNetStockAmount', header: 'Amt' },
      { field: 'AveragePurchasePrice', header: 'AveragePurchasePrice' },
      { field: 'MarginPercent', header: 'MarginPercent' }, 
      // { field: 'Action', header: 'Open order details' }, 
      // { field: 'Action1', header: 'Edit Order' },
    ];
   
    this.colmns = [
      { field: 'ItemMultiMrpId', header: 'ItemMultiMRPID' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'CreationDate', header: 'IN Date' },
      { field: 'AverageAging', header: 'Aging' },
      { field:'', header: 'Closing quantity' },
      { field: '', header: 'Closing Amount' },
    
    ];
    this.IsDisabled = false;
    this.IshowAdd = true;
    this.IshowEdit = false;
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.cityService.GetAllWarehouseName().subscribe(result => {
      console.log(result, 'result');
      
      this.cityList = result;
      console.log('-------', result);
    })
    if (this.Id != 0) {

      this._service.GetcurrentstockListById(this.Id).subscribe(res => {
        
        this.dataAdd = res;
        this.IsDisabled = true;
        this.dataAdd.WarehouseId = res.WarehouseId;
        this.dataAdd.Cityid = res.CityId;
        this.amount= res.NetTotalamount;
        this.getHubVal(res.CityId);
        this.IshowAdd = false;
        this.IshowEdit = true;
      });
    }

  }

  getHubVal(id) {
    console.log('Hubid',id);   
    this.BuyerIds = id;
  }
  
    Search() {
      this.loaderService.loading(true);
    this.cityService.GetSearchData(this.BuyerIds).subscribe(x => {
      console.log('searchdata',x);
      this.search = x;
      this.length=x.length;
      this.NetTotalamount = 0;
      this.loaderService.loading(false);
      // this.avgaging = x;
      for (var i = 0; i < this.search.length; i++) {
        if (this.search[i].CurrentNetStockAmount) {
            this.NetTotalamount += this.search[i].CurrentNetStockAmount;
        }
        // console.log('this.NetTotalamount',this.NetTotalamount);
    }
      //this.totalRecords = x;
    })
  }
  openAvgDetail(i) {
    debugger;
    console.log('i',i);
    if(i.AverageAging=='0')
    {
      alert("No data availalble");
    }
    
    else
    {
    this.getDataList = null;
    this.isItemdetail = true;
    this.blocked = true;
    this.pickerservice.GetAvgData(this.BuyerIds,i.ItemMultiMrpId).subscribe(x=>{
      this.avgData = x;
      console.log('this.avgData',this.avgData);
      this.blocked = false;      
      this.isdetails = true;
      this.DamageorderDetails=x.DamageorderDetails;
      // this.pickerservice.GetItemOrder1(i).subscribe(x => {
      //   this.dataAdd.DboyId = null;
      //   this.getDataList = x;
      //   this.dataAdd.DboyId =  this.getDataList.DboyId;
      //   this.DamageorderDetails=x.DamageorderDetails;
      //   // // this.DamageorderDetails.forEach(e1 => {
      //   // //   this.stockData.forEach(e2 => {
      //   // //     if(e1.DamageOrderDetailsId==e2.DamageOrderDetailsId){
      //   // //       e1.CurrentStock=e2.Damagestock;
      //   // //     }
      //   // //   });
          
      //   // });
        
      // }); 
    }) 
  }
}
  // Detail(i) {
  //    this.getDataList = null;
  //    this.isItemdetail = true;
  //    this.blocked = true;
 
  //    this.pickerservice.GetItemOrder1(i).subscribe(x => {
  //    console.log(x, 'xxxxxxxxxxxxxxxxxxxxxx');

  //     this.getDataList = x;
  //     this.DamageorderDetails=x.DamageorderDetails;
  //     this.blocked = false;      
  //     console.log('this.getDataList',this.getDataList);
  //     this.isdetails = true;
  //     console.log('isdetails',this.isdetails)
  //   });
  // }
  onPanelHide() {
    this.BuyerIds = []
    console.log("this.selectedWH");
    console.log(this.selectedBuyer);
    for (var i in this.selectedBuyer) {
      this.BuyerIds.push(this.selectedBuyer[i].WarehouseId)
    }
  }
  getIsActiveVal(val){
    this.isActiveValue = val;
    console.log('this.isActiveValue',this.isActiveValue);
    
  }
  
  ExportData(){

    let exportOrder=[];
    this.search.forEach(element => {
      exportOrder.push(
        {
      WarehouseName:element.WarehouseName,
      ItemNumber:element.ItemNumber,
      ItemMultiMrpId:element.ItemMultiMrpId,
      MRP:element.MRP,
      StockId:element.StockId,
      ItemName:element.ItemName,
      NetInventory:element.NetInventory,
      CurrentNetInventory:element.CurrentNetInventory,
      CurrentInventory:element.CurrentInventory,
      OpenPOQTy:element.OpenPOQTy,
      CurrentDeliveryCanceledInventory:element.CurrentDeliveryCanceledInventory,
      FreestockNetInventory:element.FreestockNetInventory,
      Unitprice:element.Unitprice,
      CurrentNetStockAmount:element.CurrentNetStockAmount,
      CreationDate:element.CreationDate,
      IsActive:element.IsActive,
      AverageAging:element.CurrentNetIAverageAgingnventory,
      AgingAvgPurchasePrice:element.AgingAvgPurchasePrice,
      AveragePurchasePrice:element.AveragePurchasePrice,
      ABCClassification:element.ABCClassification,
      MarginPercent:element.MarginPercent,
      ItemlimitQty:element.ItemlimitQty,
      ItemLimitSaleQty:element.ItemLimitSaleQty,
      PurchaseMinOrderQty:element.PurchaseMinOrderQty,
      })
    });
    this.exportService.exportAsExcelFile(exportOrder, 'Current Net Stock');
  }
  ExportRowData(i){
    debugger;
    this.pickerservice.GetExportRowData(this.BuyerIds,i.ItemMultiMrpId).subscribe(x => {
      this.rowData = x
      console.log(this.rowData, 'RowData');
 
     });
     let exportOrder=[];
     this.rowData.forEach(element => {
       exportOrder.push(
         {
       OrderId:element.OrderId,
       itemNumber:element.itemNumber,
       ItemMultiMRPId:element.ItemMultiMRPId,
       qty:element.qty,
       WarehouseId:element.WarehouseId,
       IsFreeItem:element.IsFreeItem,
       })
     });
    // let exportOrder=[];
    //   exportOrder.push(
    //     {
    //   OrderId:this.rowData.OrderId,
    //   ItemNumber:this.rowData.ItemNumber,
    //   ItemMultiMrpId:this.rowData.ItemMultiMrpId,
    //   qty:this.rowData.qty,
    //   WarehouseId:this.rowData.WarehouseId,
    //   IsFreeItem:this.rowData.IsFreeItem,
    //   });
    this.exportService.exportAsExcelFile(exportOrder, 'DeliveryCancel Details');
  }
  exportAvgData(){
    debugger;
    let exportOrder=[];
    this.avgData.forEach(element => {
      exportOrder.push(
        {
      WarehouseName:element.WarehouseName,
      ItemMultiMrpId:element.ItemMultiMrpId,
      InDate:element.CreationDate,
      Aging:element.AverageAging,
      ClosingQty:element.ItemlimitQty,
      CurrentNetStockAmount:element.CurrentNetStockAmount,
      })
    });
    this.exportService.exportAsExcelFile(exportOrder, 'DeliveryCancelDetails');
  }
  }

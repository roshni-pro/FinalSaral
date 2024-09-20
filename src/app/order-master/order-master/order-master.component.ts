import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { VehicleMasterService } from 'app/vehicle-master/services/vehicle-master.service';
import { environment } from 'environments/environment';
import { VehicleService } from 'app/shared/services/vehicle.service';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { event } from 'jquery';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { element } from 'protractor';
import { LoaderService } from 'app/shared/services/loader.service';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
import { EntityHistoryService } from 'app/shared/services/entity-history.service';
import * as JSZip from 'jszip';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver'; 
import { runInThisContext } from 'vm';
import { triggerAsyncId } from 'async_hooks';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.scss']
})
export class OrderMasterComponent implements OnInit {

  dboyList: any[];
  cols: any[];
  colum:any[];
  colos:any[];
  colmns:any[];
  clm:any[];
  colomns:any[];
  coloumns:any[];
  colu:any[];
  colIn:any[];
  dataAdd: any;
  isOpenPopup: boolean;
  isViewPopup: boolean = false;
  blocked: boolean;
  name: string = "";
  mobileno: string = "";
  rowDataV1:any;
  selectAgentOrTrans: string;
  baseURL: any;
  skip: any;
  take: any ;
  totalRecords: number;
  cityList: any[];
  getDataList: any;
  orderDispatched:any;
  orderDisDetails:any;
  orderDisMaster:any;
  orderReturnDetail:any;
  skFree:any;
  offerItem:any;
  stockData:any;
  dboydata:any;
  dispatchMaster:any;
  dMaster:any;
  dispatchMasterFinal:any;
  dispatchReturn:any;
  dispatcheddetails:any;
  skfree:any;
  isItemdetail: boolean;
  isViewHistorydetail: boolean;
  isItemHistorydetail: boolean;
  getOtpDetail:boolean;
  orderInvoiceImageDetail:boolean;
  isEWayDetail:boolean;
  ewayData:any;
  isManualEdit:boolean;
  isDisHistorydetail:boolean;
  isOpenDetail = false;
  isReportDetail=false;
  isDetailOpen=false;
  isEditDetail=false;
  isEditStatus = false;
  isrebookDetail=false;
  isHistoryDetail=false;
  AgentList: any[];
  IsdisableAgent: boolean = false;
  IshowAdd: boolean = true;
  IshowEdit: boolean = true;
  @Input() Id: any;
  isInvalid: boolean = false;
  isdetails :boolean = false;
  masterwarehouseList: any[];
  regions:any[];
  regions1:any[];
  MultiWarehouseModel :any;
  MultiCityModel:any;
  hubs:any[];
  dboySelected:any;
  hubval:any[];
  statusval:any="";
  pageNum: number = 1;
  search:any[];
  skcode:any;
  searchdata:any;
  custmobile:any;
  DboyValidity: boolean = false;
  CurrentDate: any;
  IsDisabled: boolean = false;
  orderDetails:any[];
  orderHistoryDetails:any[];
  BuyerIds = [];
  WareIds=[];
  paymentIds=[];
  selectedBuyer: any;
  selectedWarehouse:any;
  selectedPayment:any;
  alert:boolean=false;
  listSize = 10;
  currentList = 10;
  damageList:any[];
  SelectedWarehouseId : any;
  searchData:any;
  zoneid:any;
  warehouse:any;
  offeritem:any;
  offerbill:any;
  suminvoice:any;
  paymentstatus:any;
  customercritical:any;
  ordercount:any;
  kpp:any="";
  orderId:any=0;
  shopName:any="";
  LevelName:any;
  mobile:any="";
  customer:any=""
  skCode:any="";
  startDate:any="";
  newOrderDate:any ="";
  endDate:any="";
  payment:[];
  orderType:any=-1;
  shipFrom:any;
  shipTo:any;
  distance:any;
  vehicle:any;
  docNo:number;
  sort:any="DESC";
  warehouseid:any=0;
  TimeLeft:any="";
  end:any="";
  start:any="";
  warehid:any=0;
  cityid:any=0;
  pay=[];
  paymentData:any;
  paymentList:any;
  disHistoryData:any;
  order:any;
  itemHistoryData:any;
  historyData:any;
  historyList:any;
  viewHistoryData:any;
  entityName:any="";
  getotp:any;
  getinvoiceimage:any;
  orderName:any="OrderDispatchedMaster";
  BillDiscountAmount:any;
  reasonedit:any;
  reasonIndex = -1;
  getqty:any;
  detailList:any;
  manual:any;
  editTrue:any;
  orderListTrue:boolean=false;
  dispatchorderListTrue:boolean=false;
  amount:any;
  orderStatus:any;
  reason:any;
  invoiceDetails: {
    amount: '',
  };
  reloadPage = false;
  popupOpen:boolean=false;
  entity:any;
  AllOrderList:any;
  getdata:any;
  paymentOption = [
    {'LevelName': 'ePaylater'},
    {'LevelName': 'mPos'},
    {'LevelName': 'truepay'},
    {'LevelName': 'Cash'},
    {'LevelName': 'hdfc'},
    {'LevelName': 'Cheque'},
    {'LevelName': 'Gullak'},
    {'LevelName': 'credit hdfc'},
    {'LevelName': 'Razorpay QR'},
    {'LevelName': 'DirectUdhar'},
  ]
  editOrder={
    'status':"",
    'reason':""
  }
  rebookData = {
    'OrderId': 0,
    'WarehouseId':0,
    'NewDate' :this.newOrderDate,
  }
  saveData = {
    'BillDiscountAmount': 0,
    'ClusterId':0,
    'ClusterName' :"",
    'CreatedDate':"",
    'CustomerId': 0,
    'CustomerName':"",
    'CustomerType' : "",
    'Customerphonenum' : 0,
    'Deliverydate':"",
    'DispatchAmount': 0,
    'Distance' : 0,
    'IsPrimeCustomer' : "",
    'OfferCode': "",
    'OrderAmount' : 0,
    'OrderColor': "",
    'OrderDispatchedMasterId': 0,
    'OrderId':0,
    'OrderStatusOtp': 0,
    'OrderTakenSalesPerson': "",     
    'OrderTakenSalesPersonId': 0,
    'OrderType': 0,
    'OrderTypestr' : "",
    'ParentOrderId' : 0,
    'ReDispatchCount': 0,
    'ReasonCancle' : this.editOrder.reason,
    'RemainingTime' : 0,
    'SalesPerson': "",
    'ShopName' : "",
    'SkCode': "",
    'Status': this.editOrder.status,
    'TCSAmount': 0,
    'TotalCount': 0,
    'Trupay': "",     
    'WalletAmount': 0,
    'WarehouseId':0,
    'WarehouseName' :"",
    'custlat': 0,
    'custlg' : 0,
    'deliveryDistance' : 0,
    'invoice_no': 0,
    'reditemavaiableValue' : 0,
    'reditemavaiableValuestr': "",
    'whlat': 0,
    'whlg': 0,
    'oldStatus': ""
  }
  data = {
    'Cityid':this.cityid,
    'Cityids': this.BuyerIds,
    'CustomerType':this.customer,
    'ItemPerPage':'',
    'Mobile' : this.mobile,
    'OrderId' : this.orderId,
    'OrderType': this.orderType,
    'PageNo' : this.pageNum,
    'PaymentFrom' : this.paymentIds,
    'ShopName': this.shopName,
    'Skcode' : this.skCode,
    'SortDirection': this.sort,
    'TimeLeft': this.TimeLeft,
    'WarehouseId': this.warehid,
    'WarehouseIds': this.WareIds,
    'status': this.statusval,     
    'end': '',
    'start': ''
  };
  newdata ={
    'Cityids': this.BuyerIds,
    'PaymentFrom' : this.paymentIds,
    'WarehouseIds': this.WareIds
  };
  newSaledata ={
    'CityIds': this.BuyerIds,
    'PaymentFrom': [],
    'WarehouseIds': this.WareIds
  }
  saledata ={
    'CityIds': this.BuyerIds,
    'WarehouseIds': this.WareIds
  }
  entity1:any;
  CheckStockWithNumber : any;
  flag : boolean;
  Disptotalqty : any;
  rowDataV2:any;
  popupOpen1:boolean=false;
  myvar:boolean =true;
  ShowAlartMsg :boolean = false;
  canceledPic:any;
  entries:any = 20;
  HideCessColumn :boolean = false;
  constructor(private _service: VehicleService, private router: Router, private packingmaterialService : PackingMaterialService , private customerService: CustomerService,private loaderService: LoaderService, private route: ActivatedRoute, private exportService: ExportServiceService, private cityService: CityService, private messageService: MessageService, private datepipe: DatePipe, private pickerservice: PickerService,
    private httpClient: HttpClient) {
    this.dataAdd = {}; this.baseURL = environment.apiURL;
    this.CurrentDate = moment(new Date()).format('MM/DD/YYYY');
    this.entity="OrderDispatchedMaster";
    this.entity1="OrderMaster";
  }

  ngOnInit() {
    this.cols = [
      { field: 'OrderId', header: 'Order No.' },
      { field: 'invoice_no', header: 'Order Invoice No.' },
      { field: 'RemainingTime', header: 'Time Left (HH:MM:SS)' },
      { field:'OfferCode', header: 'Offer Code' },
      { field: 'Distance' , header: 'Order By' },
      { field: 'SalesPerson', header: 'Sales Person' },
      { field: 'Trupay', header: 'Payment Type' },
      { field: 'SkCode', header: 'Customer Detail' },
      { field: 'WarehouseName', header: 'WH' }, 
      { field: 'CreatedDate', header: 'Order Date' },
      { field: 'OrderAmount', header: 'Order Amount' },
      { field: 'reditemavaiableValuestr', header: 'Available Stock' },
      { field: 'DispatchAmount', header: 'Dispatch Amount' }, 
      { field: 'Status', header: 'Status' },
      { field: 'Action', header: 'Open order details' }, 
      { field: 'Action1', header: 'Edit Status & Reason' }, 
      { field: 'Action2', header: 'History' }, 
      { field: 'Action3', header: 'Payment Detail' }, 
      { field: 'Action5', header: 'Return Order' },
      

      // { field: 'Action1', header: 'Edit Order' },
    ];
    this.colmns = [
      { field: 'StoreName', header: 'Store Name' },
      { field: 'ABCClassification', header: 'ABC classification' },
      { field:'ItemMultiMRPId', header: 'MrpID' },
      { field: 'itemname', header: 'Item Name' },
      { field: 'itemcode', header: 'Item Code' },
      { field: 'UnitPrice', header: 'Unit Price' },
      { field: 'price', header: 'MRP Price' },
      { field: 'MinOrderQty', header: 'MOQ' }, 
      { field: 'qty', header: 'Quantity' },
      { field: 'ReasonCancle', header: 'Select Reason' },
      { field: 'TaxPercentage', header: 'vat Tax' },
      { field: 'TaxAmmount', header: 'Tax amount (hidden)' },
      { field: 'TotalAmountAfterTaxDisc', header: 'Total Amount Incl. Tax' },
      { field: 'CurrentStock', header: 'Current Stock' },
      { field: 'ActionEdit', header: 'Edit Quantity' },
      // { field: 'Action1', header: 'Edit Order' },
    ];
    this.clm = [
      { field: 'StoreName', header: 'Store Name' },
      { field: 'Category', header: 'ABC classification' },
      { field:'ItemMultiMRPId', header: 'MrpID' },
      { field: 'itemname', header: 'Item Name' },
      { field: 'itemcode', header: 'Item Code' },
      { field: 'UnitPrice', header: 'Unit Price' },
      { field: 'price', header: 'MRP Price' },
      { field: 'MinOrderQty', header: 'MOQ' }, 
      // { field: 'qty', header: 'Quantity' },
      { field: 'qty', header: 'Quantity' },
      { field: 'TaxPercentage', header: 'vat Tax' },
      { field: 'TaxAmmount', header: 'Tax amount (hidden)' },
      { field: 'TotalAmountAfterTaxDisc', header: 'Total Amount Incl. Tax' }, 
    ];

    this.colomns = [
      { field: 'CreatedDate', header: 'Payment Date' },
      { field:'PaymentFrom', header: 'Payment Type' },
      { field: 'GatewayTransId', header: 'Payment Ref#' },
      { field: 'amount', header: 'Amount' },
      { field: 'Fine', header: 'Cheque Bounce Fine Amount' },
      { field: 'status', header: 'Payment Status' },
      { field: 'ChequeStatusText', header: 'Sub Status (CMS Status)' }, 
      
    ];

    this.colum = [
      { field: 'Status', header: 'Status' },
      { field: 'DeliveryIssuanceId', header: 'Assignment No.' },
      { field:'Description', header: 'Order Cancel Description' },
      { field: 'username', header: 'Edit By' },
      { field: 'CreatedDate', header: 'Updated Date' },
      
    ];
    this.coloumns = [
      { field: 'AuditEntity', header: 'User' },
      { field: 'AuditHistory', header: 'Audit Timestamp' },
    ];
    this.colu = [
      { field: 'AuditEntity', header: 'ItemName' },
      { field: 'AuditHistory', header: 'Ordered Quantity' },
      { field: 'AuditEntity', header: 'Dispatched Quantity' },
      { field: 'AuditHistory', header: 'Reasoncancel' },
      
    ];
    this.colIn =[
      { field: 'InvoiceChallanNo', header: 'InvoiceChallanNo' },
      { field: 'Type', header: 'Type' },
      { field: 'ShippedtoWarehouseName', header: 'Shipped To' },
      { field: 'TransportMode', header: 'TransportMode' },
      { field: 'InvoiceType', header: 'Invoice Type' },
      { field: 'CreatedDate', header: 'Created Date' },
    ]
    
    this.IsDisabled = false;
    this.IshowAdd = true;
    this.IshowEdit = false;
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.GetAllCity();
  
    if (this.Id != 0) {

      this._service.GetdamageListById(this.Id).subscribe(res => {
        this.dataAdd = res;
        this.IsDisabled = true;
        this.dataAdd.WarehouseId = res.WarehouseId;
        this.dataAdd.Cityid = res.CityId;
        this.getDboy(this.dataAdd.WarehouseId);
        this.IshowAdd = false;
        this.IshowEdit = true;
      });
    }

  }

  
  load(event) {
    if(this.warehouseid==0 ||this.warehouseid =="" || this.warehouse == 0 || this.warehouse == "" )
      {
        alert("Please Select atleast one warehouse");
        //this.messageService.add({severity:'success', summary: 'Please Select atleast one Warehouse', detail:''});
      }
      else if(this.statusval =='Show All')
      {
    // this.blocked=true;
        // this.skip = 1;
        // this.take= 10;
        this.currentList=  event.first ? event.first + event.rows : 10;
        this.skip = this.currentList/ event.rows;
        this.take = event.rows;
        this.data.PageNo = this.skip;
        console.log('page', this.skip,this.take, this.currentList);
        this.loaderService.loading(true);
        this.cityService.GetSearch(this.data).subscribe(x => {
        console.log('load',this.take);
        this.loaderService.loading(false);
        console.log('searchdata',x);
        this.search = x.ordermaster;
        this.totalRecords = x.total_count;
    
      })
    } else {
      // this.skip = 1;
      // this.take= 10;
      this.currentList=  event.first ? event.first + event.rows : 10;
      this.skip = this.currentList/ event.rows;
      this.take = event.rows;
      this.data.PageNo = this.skip;
      this.loaderService.loading(true);
      this.cityService.GetSearch(this.data).subscribe(x => {
    
          console.log('searchdata',x);
          this.loaderService.loading(false);
          this.search = x.ordermaster;
          this.totalRecords = x.total_count;
        })
    }
  }
  loadfuntion(event) {
    this.reloadPage = false;
    this.onPanelHidePayment();
    console.log("Value of warehouse",this.warehouse);
    debugger;
    if((this.warehouseid==null ||this.warehouseid =="" || this.WareIds.length == 0))
      {
        alert("Please Select atleast one Warehouse");
        // this.messageService.add({severity:'success', summary: 'Please Select atleast one Warehouse', detail:''});
      }
      
    else {
      this.skip = 1;
  
      this.take = this.entries;
     
      this.reloadPage = true;
      var FromDate = this.data.start ? moment(this.data.start).format('MM/DD/YYYY HH:mm:ss') : null
      var ToDate = this.data.end ? moment(this.data.end).format('MM/DD/YYYY HH:mm:ss') : null

      this.data={
        'Cityid':this.cityid,
        'Cityids': this.BuyerIds,
        'CustomerType':this.customer,
        'ItemPerPage':this.take,
        'Mobile' : this.mobile,
        'OrderId' : this.orderId,
        'OrderType': this.orderType,
        'PageNo' : this.skip,
        'PaymentFrom' : this.paymentIds,
        'ShopName': this.shopName,
        'Skcode' : this.skCode,
        'SortDirection': this.sort,
        'TimeLeft': this.TimeLeft,
        'WarehouseId': this.warehid,
        'WarehouseIds': this.WareIds,
        'status': this.statusval,     
         'end': this.data.end,
         'start': this.data.start
      };
      console.log('data',this.data);
      this.data.start = FromDate;
      this.data.end = ToDate;
      // this.data.PaymentFrom = this.paymentIds;
      console.log(this.data.start, this.data.end);
      console.log('by',this.BuyerIds, this.data);
      this.loaderService.loading(true);
      this.cityService.GetSearch(this.data).subscribe(x => {
    
          console.log('searchdataaaaaaaaaaaaaaaa',x);
          this.loaderService.loading(false);
          this.searchdata = x;
          this.search = x.ordermaster;
          this.totalRecords = x.total_count;
          this.skcode= x.SkCode;
          this.custmobile = x.Customerphonenum;
        })
    }
  }
  GetAllCity(){
    this.cityService.GetAllCityName().subscribe(result => {
      console.log(result, "result");
      this.cityList = result;
      console.log('City List', this.cityList);
    })
  }

  getWarehouseVal(id) {
    console.log('Warehouse',id); 
    this.warehouseid=id;  
    this.cityService.GetWarehouse(id).subscribe(x => {
      console.log('regions',x);
      this.regions1 = x;
      this.regions = x.filter(x=>x.IsKPP==false);
      console.log('RRR',this.regions)
      
    })
  }
  getRegionVal(id) {
    this.dboySelected = id;
    console.log('Dboy',this.dboySelected);
  }
  getDBoyVal(id){
    this.dboySelected = id;
    console.log('Dboy',this.dboySelected);
  }
  getWarehouse(id) {
    this.warehouse = id;
    console.log('this.warehouse',this.warehouse );
  }
  getKPP(id) {
    this.kpp = id;
    console.log('kpp',id);
  }
  getOrderId(id) {
    this.orderId = id;
    console.log('orderId',id);
  }
  getSkCode(id) {
    this.skCode = id;
    console.log('skCode',id);
  }
  getShopName(id) {
    this.shopName = id;
    console.log('shopname',id);
  }
  getMobile(id) {
    this.mobile = id;
    console.log('mobile',id);
  }
  getStatusVal(id) {
    this.statusval = id;
    console.log('status',this.statusval);
    this.currentList = 10;
  }
  getStart(id) {
    this.startDate = id;
    console.log('startDate',this.startDate);
  }
  getNewOrderDate(id){
    this.newOrderDate=id;
    console.log('getNewOrderDate',this.newOrderDate);
    
  }
  getEnd(id) {
    this.endDate = id;
    console.log('endDate',this.endDate);
  }
  getPaymentType(id) {
    this.payment = id;
    console.log('payment',id);
  }
  getOrderType(id) {
    this.orderType = id;
    console.log('orderType',id);
  }
  getSort(id) {
    this.sort = id;
    console.log('sort',id);
  }
  getCustomer(id) {
    this.customer = id;
    console.log('payment',id);
  }
  getDboy(id) {
      this.cityService.warehousebased(id).subscribe(x => {
      console.log('dboyList',x);
      this.dboyList = x
     
    })
  }
  getShipFrom(id) {
    this.shipFrom = id;
    console.log('Ship From',id);
  }
  getShipTo(id) {
    this.shipTo = id;
    console.log('shipTo',id);
  }
  getDistance(id) {
    this.distance = id;
    console.log('distance',id);
  }
  getVehicle(id) {
    this.vehicle = id;
    console.log('vehicle',id);
  }
  getDocNo(id){
    this.docNo = id;
  }
    Search(event) {
    
      if(this.statusval==null)
      {
        this.messageService.add({severity:'success', summary: 'Please Select all fields', detail:''});
      }
      else{
      if(this.statusval =='Show All')
      {
        this.loadfuntion(event);
        
      }
      else{
        this.cityService.GetSearch(this.data).subscribe(x => {
     
    console.log('searchdata',x);
      this.search = x.ordermaster;
      this.totalRecords = x.total_count;
    })
  }
}
}
  Detail(i, itemData) {
    this.dboySelected = null;
    this.dataAdd.DboyId = null;
    this.getDataList = null;
    this.isOpenDetail = true;
    this.blocked = true;
    this.pickerservice.GetOrderData(i).subscribe(x=>{
      this.getdata = x;
      console.log('getdata',this.getdata);
      this.blocked = false;      
      this.isOpenDetail = true;
      this.orderDetails=x.orderDetails;
      this.ShowAlartMsg = false;
      debugger;
      console.log('Order Type',this.getdata);
      this.getDboy(this.getdata.WarehouseId);
      const openData = itemData.Trupay.split(',');
      if (this.getdata.OrderType == 4 && openData.includes('Cash')) {
          this.ShowAlartMsg = true;
      }
    }) 
    // console.log('Truepay',this.getdata.Truepay);
    this.pickerservice.GetOrderDispatched(i).subscribe(x=>{
      this.orderDispatched = x;
      console.log('orderDispatched',this.orderDispatched);
    }) 
    this.pickerservice.GetOrderDispatchedDetails(i).subscribe(x=>{
      this.orderDisDetails = x;
      console.log('orderDisDetails',this.orderDisDetails);
    }) 
    this.pickerservice.GetOrderDispatchedMaster(i).subscribe(x=>{
      this.orderDisMaster = x;
      console.log('orderDisMaster',this.orderDisMaster);
    }) 
    this.pickerservice.GetOrderDispatchedDeatilsReturn(i).subscribe(x=>{
      this.orderReturnDetail = x;
      console.log('orderReturnDetail',this.orderReturnDetail);
    }) 
    this.pickerservice.GetSKFree(i).subscribe(x=>{
      this.skFree = x;
      console.log('skFree',this.skFree);
    }) 
    this.pickerservice.GetOfferItem(i).subscribe(x=>{
      this.offerItem = x;
      console.log('offerItem',this.offerItem);
    }) 
    this.pickerservice.DboyData(this.WareIds[0]).subscribe(x=>{
      this.dboyList = x;
      console.log('dboyList',this.dboyList); 
    })
    // this.pickerservice.GetWarehouse(i).subscribe(x=>{
    //   this.getDataList = x;
    //   console.log('getDataList',this.getDataList);
    // })
   }


openDetail(i) {
  if(this.statusval=="Ready to Dispatch")
  {
  this.dboySelected = null;
  this.dataAdd.DboyId = null;
  this.getDataList = null;
  this.isDetailOpen = true;
  this.blocked = true;
  this.pickerservice.GetOrderData(i.OrderId).subscribe(x=>{
    this.stockData = x;
    this.getDataList = x;
    this.orderDetails=x.orderDetails;
    this.pickerservice.DboyData(i.WarehouseId).subscribe(x=>{
      this.dboydata = x;
      console.log('dboydata',this.dboydata);
      this.pickerservice.DispatchMaster(i.OrderId).subscribe(x=>{
        this.dispatchMaster = x;
        this.dMaster = x;
        console.log('DMaster',this.dMaster);
        this.pickerservice.DispatchMasterFinal(i.OrderId).subscribe(x=>{
          this.dispatchMasterFinal = x;
          console.log('dispatchMasterFinal',this.dispatchMasterFinal)
        this.pickerservice.DispatchReturn(i.OrderId).subscribe(x=>{
          this.dispatchReturn = x;
          console.log('dispatchMaster',this.dispatchReturn)
          this.pickerservice.DispatchDetails(i.OrderId).subscribe(x=>{
            this.dispatcheddetails = x;
            console.log('DispatchDetails',this.dispatcheddetails)
            this.pickerservice.skfree(i.OrderId).subscribe(x=>{
              this.dispatchMasterFinal = x;
              console.log('skfee',this.skfree)
            })
      //   this.ShowAlartMsg = false;
      //   if (d.OrderType == 4 && PaymentType.indexOf('Cash') > -1) {
      //       $scope.ShowAlartMsg = true;
      //   }})
          })
         })
       })
    })
  })
    this.loaderService.loading(false);
    this.blocked = false;
  }) 
}
else{
  this.getDataList = null;
  this.isDetailOpen = true;
  this.blocked = true;
  this.pickerservice.GetOrderData(i.OrderId).subscribe(x=>{
    this.stockData = x;
    this.getDataList = x;
    console.log('this.stockData',this.stockData);
    this.blocked = false;      
    this.isDetailOpen = true;
    this.orderDetails=x.orderDetails;
  }) 
  this.pickerservice.DboyData(i.WarehouseId).subscribe(x=>{
    this.dboydata = x;
    console.log('dboydata',this.dboydata); 
  })
  this.pickerservice.DispatchMaster(i.OrderId).subscribe(x=>{
    this.dispatchMaster = x;
    this.dMaster = x;
    console.log('dMaster',this.dMaster)
  })
  this.pickerservice.DispatchMasterFinal(i.OrderId).subscribe(x=>{
    this.dispatchMasterFinal = x;
    console.log('dispatchMasterFinal',this.dispatchMasterFinal)
  })
  this.pickerservice.DispatchDetails(i.OrderId).subscribe(x=>{
    this.dispatcheddetails = x;
    console.log('dispatcheddetails',this.dispatcheddetails)
  })
  this.pickerservice.skfree(i.OrderId).subscribe(x=>{
    this.skfree = x;
    console.log('skfree',this.skfree)
  })
  debugger;
  this.pickerservice.DispatchReturn(i.OrderId).subscribe(x=>{
    this.dispatchReturn = x;
    console.log('dispatchReturn',this.dispatchReturn)

   })
  this.loaderService.loading(false);
  this.blocked = false;
}
}
edit(i) {
  console.log('edit i',i);
  this.editTrue= i ;
  this.saveData.BillDiscountAmount = i.BillDiscountAmount;
  console.log('iiiii',this.saveData.BillDiscountAmount)
  this.saveData.ClusterId = i.ClusterId;
  console.log('ClusterId',this.saveData.ClusterId)
  this.saveData.ClusterName = i.ClusterName;
  this.saveData.CreatedDate = i.CreatedDate;
  this.saveData.CustomerId = i.CustomerId;
  this.saveData.CustomerName = i.CustomerName;
  this.saveData.CustomerType = i.CustomerType;
  this.saveData.Customerphonenum = i.Customerphonenum;
  this.saveData.Deliverydate = i.Deliverydate;
  this.saveData.DispatchAmount = i.DispatchAmount;
  this.saveData.Distance = i.Distance;
  this.saveData.IsPrimeCustomer = i.IsPrimeCustomer;
  this.saveData.OfferCode = i.OfferCode;
  this.saveData.OrderAmount = i.OrderAmount;
  this.saveData.OrderColor = i.OrderColor;
  this.saveData.OrderDispatchedMasterId = i.OrderDispatchedMasterId;
  this.saveData.OrderId = i.OrderId;
  this.saveData.OrderStatusOtp = i.OrderStatusOtp;
  this.saveData.OrderTakenSalesPerson = i.OrderTakenSalesPerson;
  this.saveData.OrderTakenSalesPersonId = i.OrderTakenSalesPersonId;
  this.saveData.OrderType = i.OrderType;
  this.saveData.OrderTypestr = i.OrderTypestr;
  this.saveData.ParentOrderId = i.ParentOrderId;
  this.saveData.ReDispatchCount = i.ReDispatchCount;
  this.saveData.ReasonCancle = this.editOrder.reason;
  this.saveData.RemainingTime = i.RemainingTime;
  this.saveData.SalesPerson = i.SalesPerson;
  this.saveData.ShopName = i.ShopName;
  this.saveData.Status = this.editOrder.status;
  this.saveData.TCSAmount = i.TCSAmount;
  this.saveData.TotalCount = i.TotalCount;
  this.saveData.Trupay = i.Trupay;
  this.saveData.WalletAmount = i.WalletAmount;
  console.log('i.WalletAmount',i.WalletAmount);
  this.saveData.WarehouseId = i.WarehouseId;
  this.saveData.WarehouseName = i.WarehouseName;
  this.saveData.custlat = i.custlat;
  this.saveData.custlg = i.custlg;
  this.saveData.deliveryDistance = i.deliveryDistance;
  this.saveData.invoice_no = i.invoice_no;
  this.saveData.reditemavaiableValue = i.reditemavaiableValue;
  this.saveData.reditemavaiableValuestr = i.reditemavaiableValuestr;
  this.saveData.whlat = i.whlat;
  this.saveData.whlg = i.whlg;

  this.saveData.oldStatus = i.Status;
  console.log('Status',i.status);
  this.isEditDetail = true;
  this.blocked = false;
}
editStatus(i){
  this.isEditStatus = true;
}
rebookDetail(order, warehouse){
  this.rebookData.OrderId = order;
  this.rebookData.WarehouseId = warehouse;
  this.rebookData.NewDate = new Date() ;
    // this.rebookData.NewDate = this.datepipe.transform(new Date(), 'dd-MM-yyyy')
  if(this.statusval=="Ready to Dispatch")
  {
  this.isrebookDetail = true;
}
else{
  this.isrebookDetail = true;
}
}


viewDetail(i) {
  if(this.statusval=="Ready to Dispatch")
  {
  this.paymentList = null;
  this.isItemdetail = true;
  this.blocked = true;
  this.pickerservice.GetPaymentData(i).subscribe(x=>{
    this.paymentData = x;
  }) 
}
else{

  this.getDataList = null;
  this.isItemdetail = true;
  this.blocked = true;
  this.pickerservice.GetPaymentData(i).subscribe(x=>{
    this.paymentData = x;
    console.log('paymentData',this.paymentData);
    this.blocked = false;      
    this.isItemdetail = true;
   
  }) 

}
}
viewHistoryDetail(i) {
  this.rowDataV1 = i;
this.popupOpen=true;

}

historyDetail(i) {
this.rowDataV2=i;  
this.popupOpen1=true;
}
disHistoryDetail(i) {
  if(this.statusval=="Ready to Dispatch")
  {
  this.paymentList = null;
  this.isDisHistorydetail = true;
  this.blocked = true;
  this.pickerservice.GetDisHistoryData(i).subscribe(x=>{
  this.disHistoryData = x;
  this.order = x.orderid;
  console.log('DisHistorydata',this.disHistoryData);
  this.blocked = false;      
    
  }) 
}
else{
  
  this.getDataList = null;
  this.isDisHistorydetail = true;
  this.blocked = true;
  this.pickerservice.GetDisHistoryData(i).subscribe(x=>{
    debugger;
    this.disHistoryData = x;
    this.order = x.orderid;
    console.log('this.orderid',this.order)
    console.log('disHistoryData',this.disHistoryData);
    this.blocked = false;      
    this.isDisHistorydetail = true; 
     this.blocked = false;      
  }) 

}
}
itemHistoryDetail(i){
  if(this.statusval=="Ready to Dispatch")
  {
  this.paymentList = null;
  this.isItemHistorydetail = true;
  this.pickerservice.GetItemHistoryData(i).subscribe(x=>{
    this.itemHistoryData = x;
    console.log('itemHistoryData',this.itemHistoryData);
         
  }) 
}
else{
  this.getDataList = null;
  this.isItemHistorydetail = true;
  
  this.pickerservice.GetItemHistoryData(i).subscribe(x=>{
    this.itemHistoryData = x;
    console.log('itemHistoryData',this.itemHistoryData);
         
    this.isItemHistorydetail = true;
  }) 
}
}
onCancel() {
  this.isrebookDetail=false;
}
onCanceled(){
  this.isEditDetail=false;
}
onManualCanceled(){
  this.isManualEdit=false;
  this.isOpenDetail = true;
  this.router.navigateByUrl('/layout/OrderMaster/orderMasterView');
}
onClose(){
  this.isOpenDetail = false;
  // this.router.navigateByUrl('/layout/OrderMaster/orderMasterView');
}
onCloseDetail(){
  this.isDetailOpen = false;
}
onCloseDisHistory(){
  this.isDisHistorydetail =false;
}
onClosePayment(){
  this.isItemdetail = false;
}
onCloseHistory(){
  this.popupOpen = false;
}
onCloseHistory1(){
  this.popupOpen1 = false;
}
onSave(){
  if(this.orderStatus == null ){
    alert("Please Select Status ");
  }
  else if(this.reason == null){
    alert("Please Select Reason");
  }
  else{
  this.saveData = {
    'BillDiscountAmount': this.editTrue.BillDiscountAmount,
    'ClusterId':this.editTrue.ClusterId,
    'ClusterName' :this.editTrue.ClusterName,
    'CreatedDate':this.editTrue.CreatedDate,
    'CustomerId': this.editTrue.CustomerId,
    'CustomerName':this.editTrue.CustomerName,
    'CustomerType' : this.editTrue.CustomerType,
    'Customerphonenum' :this.editTrue.Customerphonenum,
    'Deliverydate':this.editTrue.Deliverydate,
    'DispatchAmount': this.editTrue.DispatchAmount,
    'Distance' : this.editTrue.Distance,
    'IsPrimeCustomer' : this.editTrue.IsPrimeCustomer,
    'OfferCode': this.editTrue.OfferCode,
    'OrderAmount' : this.editTrue.OrderAmount,
    'OrderColor': this.editTrue.OrderColor,
    'OrderDispatchedMasterId':this.editTrue.OrderDispatchedMasterId,
    'OrderId':this.editTrue.OrderId,
    'OrderStatusOtp': this.editTrue.OrderStatusOtp,
    'OrderTakenSalesPerson': this.editTrue.OrderTakenSalesPerson,     
    'OrderTakenSalesPersonId':this.editTrue.OrderTakenSalesPersonId,
    'OrderType': this.editTrue.OrderType,
    'OrderTypestr' : this.editTrue.OrderTypestr,
    'ParentOrderId' : this.editTrue.ParentOrderId,
    'ReDispatchCount': this.editTrue.ReDispatchCount,
    'ReasonCancle' : this.editOrder.reason,
    'RemainingTime' : this.editTrue.RemainingTime,
    'SalesPerson': this.editTrue.SalesPerson,
    'ShopName' : this.editTrue.ShopName,
    'SkCode': this.editTrue.SkCode,
    'Status': this.editOrder.status,
    'TCSAmount': this.editTrue.TCSAmount,
    'TotalCount': this.editTrue.TotalCount,
    'Trupay': this.editTrue.Trupay,     
    'WalletAmount': this.editTrue.WalletAmount,
    'WarehouseId':this.editTrue.WarehouseId,
    'WarehouseName' :this.editTrue.WarehouseName,
    'custlat': this.editTrue.custlat,
    'custlg' : this.editTrue.custlg,
    'deliveryDistance' : this.editTrue.deliveryDistance,
    'invoice_no': this.editTrue.invoice_no,
    'reditemavaiableValue' : this.editTrue.reditemavaiableValue,
    'reditemavaiableValuestr': this.editTrue.reditemavaiableValuestr,
    'whlat': this.editTrue.whlat,
    'whlg': this.editTrue.whlg,
    'oldStatus': this.editTrue.status
  }

  this.loaderService.loading(true);
    this.pickerservice.SaveOrderData(this.saveData).subscribe(x => {
      this.isEditDetail = false;
      this.blocked = false;      
      
      this.loaderService.loading(false);
      window.location.reload();
    });
  }
}

  onPanelHide() {
    this.BuyerIds = []
    console.log("this.selectedWH");
    console.log(this.selectedBuyer);
    for (var i in this.selectedBuyer) {
      this.BuyerIds.push(this.selectedBuyer[i].Cityid)
    }
    this.selectedWarehouse = 0;
    this.getWarehouseVal(this.BuyerIds);
  }
  onPanelHideWarehouse() {
    this.WareIds = []
    console.log("Ware");
    console.log(this.selectedWarehouse);
    for (var i in this.selectedWarehouse) {
      this.WareIds.push(this.selectedWarehouse[i].WarehouseId);
      console.log("Idssss",this.WareIds);
    }

  }
  onPanelHidePayment() {
    debugger;
    this.paymentIds = []
    console.log("Payment");
    console.log(this.selectedPayment);
    for (var i in this.selectedPayment) {
      this.paymentIds.push(this.selectedPayment[i].LevelName);
      console.log("PaymentIds",this.paymentIds);
    }
    // this.paymentIds =[];
  }
  ExportExcelOrder(){
    if((this.data.start==null || this.data.start=="") && (this.data.end==null || this.data.end=="") )
        {
          this.messageService.add({severity:'success', summary: 'Please Select Date Range', detail:''});
        }
    else if(this.warehouseid==0)
        {
          alert("Please Select atleast one Warehouse");
        }
    else{
      this.newSaledata ={
        'CityIds': this.BuyerIds,
        'PaymentFrom': [],
        'WarehouseIds': this.WareIds
      }
      var FromDate = this.data.start ? moment(this.data.start).format('MM/DD/YYYY hh:mm A') : null
        var ToDate = this.data.end ? moment(this.data.end).format('MM/DD/YYYY hh:mm A') : null
        console.log("Data",FromDate,ToDate);
        
      this.cityService.exportToExcel(FromDate,ToDate,this.orderId,this.skCode,this.shopName,this.mobile,this.statusval,this.LevelName,this.orderType,this.newSaledata).subscribe(x => {
        console.log('ExportExcel',x);
        var filename = 'buyerData' + new Date;
         this.downloadURI(x, filename);
        // this.search = x
        // this.blocked = true;
        // let exportdata=[];
        // this.search.forEach(element => {      
        //   exportdata.push({
        //     MainOrderColor:element.OrderColor,
        //     OrderItemColor:element.OrderItemColor, 
        //     OrderTypestr:element.OrderTypestr,
        //     OrderId:element.OrderId,
        //     OfferCode:element.OfferCode,
        //     Skcode:element.Skcode,
        //     Customerphonenum:element.Customerphonenum,
        //     ShopName:element.ShopName,
        //     SalesPerson:element.SalesPerson,
        //     CustomerName:element.CustomerName,
        //     invoice_no:element.invoice_no,
        //     CreditNoteNumber:element.CreditNoteNumber,
        //     CreditNoteDate:element.CreditNoteDate,
        //     ItemId:element.ItemId,
        //     itemname:element.itemname,
        //     ABC_Classification:element.ABC_Classification,
        //     CategoryName:element.CategoryName,
        //     SubcategoryName:element.SubcategoryName,
        //     BrandName:element.BrandName,
        //     HSNCode:element.HSNCode,
        //     sellingSKU:element.sellingSKU,
        //     WarehouseName:element.WarehouseName,
        //     ClusterName:element.ClusterName,
        //     CreatedDate:element.CreatedDate,
        //     OrderBy:element.OrderBy,
        //     TotalAmt:element.TotalAmt,
        //     AvailableStockAmt:element.AvailableStockAmt,
        //     OrderedTotalAmt:element.OrderedTotalAmt,
        //     UnitPrice:element.UnitPrice,
        //     MinOrderQtyPrice:element.MinOrderQtyPrice,
        //     itqtymname:element.qty,
        //     DiscountAmount:element.DiscountAmount,
        //     DiscountPercentage:element.DiscountPercentage,
        //     TaxAmmount:element.TaxAmmount,
        //     TaxPercentage:element.TaxPercentage,
        //     SGSTTaxAmmount:element.SGSTTaxAmmount,
        //     SGSTTaxPercentage:element.SGSTTaxPercentage,
        //     CGSTTaxPercentage:element.CGSTTaxPercentage,
        //     IGSTTaxAmount:element.IGSTTaxAmount,
        //     IGSTTaxPercent:element.IGSTTaxPercent,
        //     deliveryCharge:element.deliveryCharge,
        //     GSTN_No:element.GSTN_No,
        //     Status:element.Status,
        //     ReasonCancle:element.ReasonCancle,
        //     comments:element.comments,
        //     ItemMultiMRPId:element.ItemMultiMRPId,
        //     DeliveryIssuanceIdOrderDeliveryMaster:element.DeliveryIssuanceIdOrderDeliveryMaster,
        //     IsPrimeCustomer:element.IsPrimeCustomer,
        //     StoreName:element.StoreName,
        //   });
        // });
        
        // this.blocked = false;
      //   if(exportdata.length > 0){
      //   this.exportService.exportAsExcelFile(exportdata, 'OrderMasterExport');
      //   }else{
      //     alert('No data found!!!');
      //   }
      });
   
  }
  }
//   ExportExcelOrder() {
//     if(this.warehouseid==0)
//     {
//       {
//           this.messageService.add({severity:'success', summary: 'Please Select atleast one Warehouse', detail:''});
//       }
//     }
//     else if((this.data.start==null || this.data.start=="") && (this.data.end==null || this.data.end=="") )
//     {
//           this.messageService.add({severity:'success', summary: 'Please Select Date Range', detail:''});
//     }
//   //   if(this.warehouseid==0)
//   //     {
//   //       this.messageService.add({severity:'success', summary: 'Please Select atleast one Warehouse', detail:''});
//   //     }
//   // else if((this.data.start==null || this.data.start=="") && (this.data.end==null || this.data.end=="") )
//   // {
//   //   this.messageService.add({severity:'success', summary: 'Please Select Date Range', detail:''});
//   // }
// else {
//     debugger;
//     this.blocked = true;
//     this.cityService.exportToExcel(this.data.start,this.data.end,this.orderId,this.shopName,this.skCode,this.mobile,this.statusval,this.LevelName,this.orderType,this.newdata).subscribe(result => {
      
//       this.blocked = false;
//       var filename = 'buyerData' + new Date;
//       this.downloadURI(result, filename)
//     });
//     console.log("result");
//   }
//   }
  downloadURI(uri, name) {
    
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }
  
// ExportExcelOrder(){
//   debugger;
//   if(this.warehouseid==0)
//       {
//         this.messageService.add({severity:'success', summary: 'Please Select atleast one Warehouse', detail:''});
//       }
//   else if((this.data.start==null || this.data.start=="") && (this.data.end==null || this.data.end=="") )
//   {
//     this.messageService.add({severity:'success', summary: 'Please Select Date Range', detail:''});
//   }

//     else{
//       this.newdata ={
//         'Cityids': this.BuyerIds,
//         'PaymentFrom' : this.paymentIds,
//         'WarehouseIds': this.WareIds
//       }
//       this.cityService.exportToExcel(this.data.start,this.data.end,this.orderId,this.shopName,this.skCode,this.mobile,this.statusval,this.LevelName,this.orderType,this.newdata).subscribe(x => {
//         debugger;
//         console.log('data',x);
//         // window.open(x, '_blank');
//         // this.createZip(x, 'Sample');  
//         // this.exportService.exportAsExcelFile(x, '_blank');
//       });
   
//   }
// }
// async createZip(files: any[], zipName: string) {  
//   const zip = new JSZip();  
//   const name = zipName + '.zip';  
//   // tslint:disable-next-line:prefer-for-of  
//   for (let counter = 0; counter < files.length; counter++) {  
//     const element = files[counter];  
//     const fileData: any = await this.getFile(element);  
//     const b: any = new Blob([fileData], { type: '' + fileData.type + '' });  
//     zip.file(element.substring(element.lastIndexOf('/') + 1), b);  
//   }  
//   zip.generateAsync({ type: 'blob' }).then((content) => {  
//     if (content) {  
//       FileSaver.saveAs(content, name);  
//     }  
//   });  
// }  
// async getFile(url: string) {  
//   const httpOptions = {  
//     responseType: 'blob' as 'json'  
//   };  
//   const res = await this.httpClient.get(url, httpOptions).toPromise().catch((err: HttpErrorResponse) => {  
//     const error = err.error;  
//     return error;  
//   });  
//   return res;  
// }  
exportSelfOrder(){
  debugger;
  if((this.data.start==null || this.data.start=="") && (this.data.end==null || this.data.end=="") )
      {
        this.messageService.add({severity:'success', summary: 'Please Select Date Range', detail:''});
      }
      if(this.warehouseid==0)
      {
        alert("Please Select atleast one Warehouse");
      }
    else{
      var FromDate = this.data.start ? moment(this.data.start).format('MM/DD/YYYY HH:mm:ss') : null
      var ToDate = this.data.end ? moment(this.data.end).format('MM/DD/YYYY HH:mm:ss') : null
      console.log('startDate',FromDate);
      console.log('End Date',ToDate);
      this.cityService.exportSelf(FromDate,ToDate, [1]).subscribe(x => {
        console.log('data',x);
        this.search = x
        this.blocked = true;
        let exportdata=[];
        this.search.forEach(element => {      
          exportdata.push({
            OrderTypestr:element.OrderTypestr,
            OrderId:element.OrderId,
            SalesPerson:element.SalesPerson,
            CustomerId:element.CustomerId,
            Skcode:element.Skcode,
            ShopName:element.ShopName,
            Status:element.Status,
            invoice_no:element.invoice_no,  
            BillingAddress:element.BillingAddress,
            ShippingAddress:element.ShippingAddress,
            TotalAmount:element.TotalAmount,
            GrossAmount:element.GrossAmount,
            DiscountAmount:element.DiscountAmount,
            TaxAmount:element.TaxAmount,
            TCSAmount:element.TCSAmount,
            CityId:element.CityId,
            WarehouseId:element.WarehouseId,
            WarehouseName:element.WarehouseName,
            ClusterId:element.ClusterId,
            ClusterName:element.ClusterName,
            Tin_No:element.Tin_No,
            CreatedDate:element.CreatedDate,
            Deliverydate:element.Deliverydate,
            UpdatedDate:element.UpdatedDate,
          });
        });
        
        this.blocked = false;
        if(exportdata.length > 0){
        this.exportService.exportAsExcelFile(exportdata, 'OrderMaster');
        }else{
          alert('No data found!!!');
        }
      });
   
  }
}
ExportSale(){
  if((this.data.start==null || this.data.start=="") && (this.data.end==null || this.data.end=="") )
      {
        this.messageService.add({severity:'success', summary: 'Please Select Date Range', detail:''});
      }
      if(this.warehouseid==0)
      {
        alert("Please Select atleast one Warehouse");
      }
  else{
    this.saledata ={
      'CityIds': this.BuyerIds,
      'WarehouseIds': this.WareIds
    }
    var FromDate = this.data.start ? moment(this.data.start).format('MM/DD/YYYY HH:mm:ss') : null
      var ToDate = this.data.end ? moment(this.data.end).format('MM/DD/YYYY HH:mm:ss') : null
    this.cityService.exportSale(FromDate,ToDate,this.orderId,this.shopName,this.skCode,this.mobile,this.statusval,this.LevelName,this.saledata).subscribe(x => {
      console.log('ExportSale',x);
      this.search = x
      this.blocked = true;
      let exportdata=[];
      this.search.forEach(element => {      
        exportdata.push({
          MainOrderColor:element.MainOrderColor,
          OrderItemColor:element.OrderItemColor,
          OrderTypestr:element.OrderTypestr,
          OrderId:element.OrderId,
          OfferCode:element.OfferCode,
          Skcode:element.Skcode,
          ShopName:element.ShopName,
          SalesPerson:element.SalesPerson,
          invoice_no:element.invoice_no,
          CreditNoteNumber:element.CreditNoteNumber,
          CreditNoteDate:element.CreditNoteDate,
          ItemId:element.ItemId,
          itemname:element.itemname,
          ABC_Classification:element.ABC_Classification,
          CategoryName:element.CategoryName,
          SubcategoryName:element.SubcategoryName,
          BrandName:element.BrandName,
          HSNCode:element.HSNCode,
          sellingSKU:element.sellingSKU,
          WarehouseName:element.WarehouseName,
          ClusterName:element.ClusterName,
          CreatedDate:element.CreatedDate,
          OrderBy:element.OrderBy,
          TotalAmt:element.TotalAmt,
          AvailableStockAmt:element.AvailableStockAmt,
          OrderedTotalAmt:element.OrderedTotalAmt,
          UnitPrice:element.UnitPrice,
          MinOrderQtyPrice:element.MinOrderQtyPrice,
          itqtymname:element.qty,
          DiscountAmount:element.DiscountAmount,
          DiscountPercentage:element.DiscountPercentage,
          TaxAmmount:element.TaxAmmount,
          TaxPercentage:element.TaxPercentage,
          SGSTTaxAmmount:element.SGSTTaxAmmount,
          SGSTTaxPercentage:element.SGSTTaxPercentage,
          CGSTTaxPercentage:element.CGSTTaxPercentage,
          IGSTTaxAmount:element.IGSTTaxAmount,
          IGSTTaxPercent:element.IGSTTaxPercent,
          deliveryCharge:element.deliveryCharge,
          GSTN_No:element.GSTN_No,
          Status:element.Status,
          ReasonCancle:element.ReasonCancle,
          comments:element.comments,
          ItemMultiMRPId:element.ItemMultiMRPId,
          DeliveryIssuanceIdOrderDeliveryMaster:element.DeliveryIssuanceIdOrderDeliveryMaster,
          IsPrimeCustomer:element.IsPrimeCustomer,
          StoreName:element.StoreName,
          paymentThrough:element.paymentThrough,
          ParentOrderId:element.ParentOrderId,
        });
      });
      
      this.blocked = false;
      if(exportdata.length > 0){
      this.exportService.exportAsExcelFile(exportdata, 'OrderMasterExport');
      }else{
        alert('No data found!!!');
      }
    });
 
}
}
openExport(){
    this.blocked = true;
    let exportdata=[];
    this.getdata.orderDetails.forEach(element => {      
      exportdata.push({
        ItemId:element.ItemId,
        ABCClassification:element.ABCClassification,
        itemname:element.itemname,
        itemcode:element.itemcode,
        UnitPrice: element.UnitPrice,       
        price:element.price,
        MinOrderQty:element.MinOrderQty,
        qty:element.qty,
        AmtWithoutTaxDisc:element.AmtWithoutTaxDisc,
        AmtWithoutAfterTaxDisc:element.AmtWithoutAfterTaxDisc,
        TaxPercentage:element.TaxPercentage,
        TaxAmmount:element.TaxAmmount,
        TotalAmountAfterTaxDisc:element.TotalAmountAfterTaxDisc,
        TotalAmt:element.TotalAmt,
      });
    });
    this.blocked = false;

    this.exportService.exportAsExcelFile(exportdata, 'OrderDetails');
  
}
detailOpenExport(){
    this.blocked = true;
    let exportdata=[];
    this.getDataList.orderDetails.forEach(element => {      
      exportdata.push({
        ItemId:element.ItemId,
        ABCClassification:element.ABCClassification,
        itemname:element.itemname,
        itemcode:element.itemcode,
        UnitPrice: element.UnitPrice,       
        price:element.price,
        MinOrderQty:element.MinOrderQty,
        qty:element.qty,
        AmtWithoutTaxDisc:element.AmtWithoutTaxDisc,
        AmtWithoutAfterTaxDisc:element.AmtWithoutAfterTaxDisc,
        TaxPercentage:element.TaxPercentage,
        TaxAmmount:element.TaxAmmount,
        TotalAmountAfterTaxDisc:element.TotalAmountAfterTaxDisc,
        TotalAmt:element.TotalAmt,
      });
    });
    this.blocked = false;

    this.exportService.exportAsExcelFile(exportdata, 'OrderDetails');
  
}

onSubmit(){
   {
    var FromDate = this.rebookData.NewDate ? moment(this.rebookData.NewDate).utc().format() : null
    this.rebookData.NewDate = FromDate;
    this.getDataList = null;
    this.isrebookDetail = true;
    this.blocked = true;
   
  
        if(confirm('Are you sure you want to continue')) {
          this.pickerservice.PostRebookData(this.rebookData).subscribe(x => {
            // this.getDataList = x;
            this.blocked = false;      
            // console.log('this.getDataList',this.getDataList);
            this.isrebookDetail = true;
            console.log('isdetails',this.isdetails);
            if(x.Status) {
            //  this.messageService.add({severity:'success', summary: 'Transaction Saved Successfully', detail:''});
            alert(x.message); 
            window.location.reload();
            } else {
              alert(x.message);
              window.location.reload();
            }                
          });
        } else {
          this.blocked = false;      
          this.isrebookDetail = true;
        }
  }
  }
  
  getSearchItem(event){
    console.log('event',event);
 
    this.cityService.searchItem(event).subscribe(x => {
      console.log('data',x);
      this.search = x;
})
}
clear(){

  window.location.reload();
}
getOrderStatus(status){
  this.orderStatus = status; 
this.editOrder.status =status ;
console.log('this.editOrder.status',this.editOrder.status);

this.editOrder.reason = '';
}
getReason(reason){
  this.reason = reason;
this.editOrder.reason = reason;
console.log("Reason",this.editOrder.reason);
}
getEditReason(id){
 this.reasonedit= id;

 
}
getQty(id){
  this.getqty= id;
}
SaveDispatchedOrder(i){
  debugger;
  if(this.dboySelected==null )
  {
    alert("Please Select Delivery Boy");
  }
  else
  {
    console.log('i',i);
    let today = new Date();
    let delivryDate = new Date(this.getdata.Deliverydate);
    delivryDate.setDate(delivryDate.getDate() - 2);
    if (today >= delivryDate) {                 
    var data = i;
   this.Disptotalqty = 0;
    for (var d = 0; d < i.orderDetails.length; d++) {
        
       this.Disptotalqty += i.orderDetails[d].qty;
    }
    if (this.Disptotalqty > 0) {
  this.flag = true;
  console.log('this.orderDetail::',this.orderDetails);
  var data;
  this.cityService.saveDispatchedOrder(i.OrderId).subscribe(x => {
    console.log('data',x);
    for (var i = 0; i < this.orderDetails.length; i++) {

      data = this.orderDetails[i];
      if ((data.qty || data.qty == null || data.qty == undefined) > data.CurrentStock && data.Deleted == false) {
        this.flag = false;
          alert("your stock not sufficient please purchase or remove item then dispatched: ( " + data.itemname + " )This much Qty required : " + data.qty);                    
      }
  }

                    //double check for inventory
                    for (var i = 0; i < this.orderDetails.length; i++) {
                      this.CheckStockWithNumber = {};
                      var first = true;
                      for (var j = i; j < this.orderDetails.length; j++) {
                          if (first) {
                              this.CheckStockWithNumber = this.orderDetails[j];
                              first = false;
                          }
                          else if ( this.CheckStockWithNumber.ItemMultiMRPId ==  this.orderDetails[j].ItemMultiMRPId &&  this.CheckStockWithNumber.IsFreeItem ==  this.orderDetails[j].IsFreeItem) {
                              var Stockcount = 0;
                              Stockcount =  this.CheckStockWithNumber.qty +  this.orderDetails[j].qty;

                              if (Stockcount >  this.orderDetails[j].CurrentStock && Stockcount > 0) {
                                  alert("your stock not sufficient please purchase or remove item: ( " +  this.orderDetails[j].itemname + " )This much Qty required : " + Stockcount);
                                  this.flag = false;
                                  return false;
                              }

                          }
                      }
                  }

                  if ( this.dboySelected == undefined) {
                      alert("Please Select Delivery Boy");
                      this.flag = false;

                  }
                  if (this.flag == true) {
                          // var obj = (this.dboySelected);
                          this.cityService.warehousebased(this.getdata.WarehouseId).subscribe(x => {
                            console.log('dboyList',x);
                            this.dboyList = x;
                          var obj = this.dboyList.filter(x=>x.PeopleID == this.dboySelected);
                        
                      this.getdata["DboyName"] = obj[0].DisplayName;
                      this.getdata["DboyMobileNo"] = obj[0].Mobile;
                      this.getdata["DBoyId"] = obj[0].PeopleID;
                      this.getdata;
                      this.cityService.OrderDispatchedDetails(this.getdata).subscribe(data=>{
                        if (data) {
                          alert(data);
                          this.isOpenDetail = false;
                          // popupclose   
                      }

                      },error=>{
                        alert(data.ErrorMessage);
                      });   
                    });
                  }

              });
          } else { alert(" You can't dispatched zero qty line item"); return false; }
          } else {
             // var m = moment(orderData.Deliverydate, 'DD/MM/YYYY', true);
              alert("Currencly you are not able to dispatched this Order  " + delivryDate); return false;
          }
    // alert(" Delivery Boy Dispatched");
}
}

excelWayBill(i){
  this.isEWayDetail = true;
  this.blocked = true;
 
  this.cityService.excelWayBill(i.WarehouseId).subscribe(x => {
    console.log('exportdata',x);
}) 
this.cityService.excelWayWarehouse(i.WarehouseId).subscribe(x => {
  console.log('excelwaydata',x);
  this.ewayData = x;
}) 
this.blocked = false;
}
ExportEWayOrder(){
  if(this.shipFrom==null || this.shipTo==null || this.distance==null)
    {
      alert("Please select All Fields");   
    }
  else{
    debugger;
    let exportdata=[]; 
    this.getdata.orderDetails.forEach(element => { 
        exportdata.push({
          SupplyType:this.ewayData.SupplyType,
          SubType:this.ewayData.SubType,
          DocType:this.ewayData.DocType,
          DocNo:this.docNo,
          DocDate:this.getdata.CreatedDate,
          TRANSACTIONTYPE:this.ewayData.TRANSACTIONTYPE,
          From_OtherPartyName:this.ewayData.CustomerName,
          From_GSTIN:this.ewayData.GSTin,
          From_Address1:this.ewayData.CompanyName,
          From_Address2:this.ewayData.CompanyName,
          From_Place:this.ewayData.CityName,
          From_PinCode:this.shipFrom,
          From_State:this.ewayData.StateName,
          DispatchState:this.ewayData.DispatchState,
          To_OtherPartyName:this.getdata.CustomerName,
          To_GSTIN:this.ewayData.To_GSTIN,
          To_Address1:this.getdata.ShippingAddress,
          To_Address2:this.ewayData.ShippingAddress,
          To_Place:element.City,
          To_PinCode:this.shipTo,
          To_State:this.ewayData.StateName,
          ShipToState:this.ewayData.StateName,
          Product:element.itemname,
          Description:element.itemname,
          HSN:element.HSNCode,
          Qty:element.qty,
          AssessableValue:element.ActualUnitPrice,
          TaxRate:this.getdata.TaxAmount,
          CGSTAmount:this.ewayData.CGSTAmount,
          SGSTAmount:this.ewayData.SGSTAmount,
          IGSTAmount:this.ewayData.IGSTAmount,
          CESSAmount:this.ewayData.CESSAmount,
          CESSNonAdvolAmount:this.ewayData.CESSNonAdvolAmount,
          Others:this.ewayData.Others,
          TotalInvoiceValue:element.TotalAmountAfterTaxDisc,
          TransMode:this.ewayData.TransMode,
          Distance:this.distance,
          TransName:this.ewayData.TransName,
          TransID:this.ewayData.TransID,
          TransDocNo:this.ewayData.TransDocNo,
          TransDate:element.UpdatedDate,
          VehicleNo:this.ewayData.VehicleNo,
          VehicleType:this.vehicle,
        });
      });
     
      if(exportdata.length > 0){
        alert("Data Inserted Successfully!");
      this.exportService.exportAsExcelFile(exportdata, 'OrderEwayBill');
      }else{
        alert('No data found!!!');
      }
 
}
}

ewayExport(){

}
getOTP(i){
  console.log('otp',i);
  this.getotp=i;
  this.cityService.getOtp(i.OrderId).subscribe(x => {
    console.log('id',x);
    if(x == 'Delivered')
    {
      alert("I hereby confirm that I called the "+ i.SkCode + " (" +i.Customerphonenum + ") and confirms that the Stock is delivered to the customer");
    }
    if(x == 'Delivery Redispatch')
    {
      alert("I hereby confirm that I called the "+ i.SkCode + " (" +i.Customerphonenum + ") and confirms that the order Delivery Redispatch");
    }
    if(x == 'Delivery Canceled')
    {
      alert("I hereby confirm that I called the "+ i.SkCode + " (" +i.Customerphonenum + ") and confirms that the order Delivery Canceled");
    }
    
    else{
    alert("I hereby confirm that I called the "+ i.SkCode + " (" +i.Customerphonenum + ") and confirms that the order "+ "" +i.Status + "")
    }
    this.getOtpDetail = true;
}) 
}
canceledImage(i){
  debugger;
  console.log('i',i);
  this.getinvoiceimage = i;
  this.cityService.viewCanceledImage(i.OrderId).subscribe(x => {
    this.canceledPic = x;
    console.log('image',x);
    this.orderInvoiceImageDetail = true;
}) 
}
editManual(item, i){

  console.log('manual',item);
  this.manual = item;
  console.log('Manual',this.manual);
  this.isManualEdit =true;
  this.reasonIndex = i;
//   this.cityService.editManual(i.OrderId).subscribe(x => {
//     console.log('image',x);
//     this.orderInvoiceImageDetail = true;
// }) 
}
open(rowdata){
  // this.isClick = true;
  this.packingmaterialService.GetInvoiceDtlsAcInvoice(rowdata.InvoiceChallanNo , rowdata.WareHouseId).subscribe(result=>{
  //  console.log(result);
    if(result){
      this.isReportDetail = true;
      this.detailList =  result;
      console.log(this.detailList);
    }else{
      this.messageService.add({ severity: 'error', summary: "No Record Found", detail: '' });
    }
    
  })
}
updatelineitem (data) {
  debugger;
  console.log('updatelineitem id called')
  if (this.manual.MinOrderQty <= this.manual.qty) {
      if (this.manual.qty >= 0) {
          if (this.manual.qty <= 0) {

              alert("Quantiy should not be negative");
              this.manual.qty = 0;
          } else {
              if (this.manual.MinOrderQty > 0) {
                this.manual.qty = this.manual.qty - this.manual.MinOrderQty;
              } else {
                this.manual.qty = this.manual.qty - 1;
              }
          }
      }
  }
  else {
      alert(" MinOrderQty is more than ordered qty ");
  }
}
updatelineitem1(data) {
  debugger;
  console.log('updatelineitem1 id called')
  if (this.manual.MinOrderQty == 0) {
    this.manual.qty = this.manual.qty + 1;
    
  }
  else if (this.manual.qty != this.manual.Noqty) {
    this.manual.qty = this.manual.qty + this.manual.MinOrderQty;
  }
  else {
      alert("Quantiy should not be greater then Max Quantiy")
  }
}
ok() {
       
  if (this.reasonedit == undefined || this.reasonedit == null) {
      alert("Select reason");
  } else {
    
    this.cityService.freebies(this.manual.OrderId,this.manual.ItemId,this.manual.WarehouseId).subscribe(results=> {
          var freebiesdata = results;
          console.log('freebiesdata',freebiesdata);
          if (freebiesdata)
          {
            this.orderDetails.forEach(element => {
              if (element.ItemId == freebiesdata.FreeItemId && element.IsFreeItem == true && element.FreeWithParentItemId == this.manual.ItemId)
              {

                  var multiply = this.manual.qty / freebiesdata.MinOrderQuantity;
                  var totalquantity = multiply * freebiesdata.NoOffreeQuantity;
                  element.qty = totalquantity;
                  element.Noqty = totalquantity;
          
                  this.manual.ReasonCancle = this.reasonedit
              };
            });           
          }
         
      });
      this.isManualEdit =false;
      // $modalInstance.close();
  }
};
printAllInvoice() {
    this.AllOrderList = this.getdata;
    console.log("AllorderList",this.AllOrderList);
    this.loaderService.loading(true);
    if(this.dispatchMaster == null)
    {
    this.cityService.GetInvoiceAmount(this.AllOrderList.GrossAmount).subscribe(x=>{
      // this.invoiceDetails.amount = x;
      console.log('this.amount',x);
      
    })
  }
  else{
    this.cityService.GetInvoiceAmount(this.dispatchMaster.GrossAmount).subscribe(x=>{
      // this.invoiceDetails.amount = x;
      console.log('this.amount',x);
      
    })
  }
    this.orderListTrue=true;
    this.loaderService.loading(false);
  }
  printInvoiceDispatch() {
    this.dispatchMaster = this.getDataList;
    console.log("dispatchMaster",this.dispatchMaster);
    this.loaderService.loading(true);
    
    this.cityService.GetInvoiceAmount(this.dispatchMaster.GrossAmount).subscribe(x=>{
      // this.invoiceDetails.amount = x;
      console.log('this.amount',x);
      
    })
  
    this.dispatchorderListTrue=true;
    this.loaderService.loading(false);
  }
  closeAllPrintList(){
    this.orderListTrue = false;
  }
  closeAllInvoicedispatchPrintList(){
    this.dispatchorderListTrue = false;
  }
  GetOrderTime(countdown) {
    
    var millis = 0;
    millis = countdown * 1000;

    var seconds = Math.floor((millis / 1000) % 60);
    var minutes = Math.floor(((millis / (1000 * 60)) % 60));
    var hours = Math.floor(((millis / (1000 * 60 * 60)) % 24));
    var days = Math.floor(((millis / (1000 * 60 * 60)) / 24));
    if (days != 0)
        hours += (days * 24);

    var template = '';
    if (hours >= 0 && hours <= 48)
    
        template = '<span class="label HIT badge badge-dark text-white ng-binding">' + hours + ':' + minutes + ':' + seconds + '</span>';
    else if (hours >= 48 && hours <= 72)
        template = '<span class="label Miss ng-binding  badge badge-secondary text-white" style="background-color:#a58902">' + hours + ':' + minutes + ':' + seconds + '</span>';
    else if (hours >= 72 && hours <= 100)
        template = '<span class="label Fail ng-binding  badge badge-warning text-white" style="background-color:#eb5a00">' + hours + ':' + minutes + ':' + seconds + '</span>';
    else if (hours > 100)
        template = '<span class="label BOLD ng-binding  badge badge-danger text-white" style="background-color:#f90808">' + hours + ':' + minutes + ':' + seconds + '</span>';
    return template;
}

onNumPerPageChange(num){
  if(this.warehouseid==null){
    alert("Please Select atleast One Warehouse");
  }
  else{
     this.entries = num;
     this.loadfuntion(num);
  }
}

}

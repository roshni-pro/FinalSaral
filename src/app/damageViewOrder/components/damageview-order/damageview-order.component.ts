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

@Component({
  selector: 'app-damageview-order',
  templateUrl: './damageview-order.component.html',
  styleUrls: ['./damageview-order.component.scss']
})
export class DamageviewOrderComponent implements OnInit {

  dboyList: any[];
  cols: any[];
  colmns: any[];
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
  Contains: any;
  searchKey: any;
  totalRecords: number;
  cityList: any[];
  getDataList: any;
  stockData: any;
  isItemdetail: boolean;
  AgentList: any[];
  IsdisableAgent: boolean = false;
  IshowAdd: boolean = true;
  IshowEdit: boolean = true;
  @Input() Id: any;
  isInvalid: boolean = false;
  isdetails: boolean = false;
  masterwarehouseList: any[];
  regions: any[];
  hubs: any[];
  hubval: any[];
  statusval: any;
  pageNum: number = 1;
  search: any[];
  DboyValidity: boolean = false;
  CurrentDate: any;
  IsDisabled: boolean = false;
  DamageorderDetails: any[];
  BuyerIds = [];
  selectedBuyer: any;
  alert: boolean = false;
  listSize = 10;
  currentList = 10;
  damageList: any[];
  SelectedWarehouseId: any;
  searchData: any;
  zoneid: any;
  isSearch: boolean = false;
  SelectedOrderType : any;
  first:number = 0;

  constructor(private _service: VehicleService, private router: Router, private customerService: CustomerService, private route: ActivatedRoute, private exportService: ExportServiceService, private cityService: CityService, private messageService: MessageService, private datepipe: DatePipe, private pickerservice: PickerService) {
    this.dataAdd = {}; this.baseURL = environment.apiURL;
    this.CurrentDate = moment(new Date()).format('MM/DD/YYYY');
  }

  ngOnInit() {
    this.cols = [
      { field: 'DamageOrderId', header: 'Damage Order No.' },
      { field: 'OrderId', header: 'Order No.' },      
      { field: 'invoice_no', header: 'Invoice No.' },
      { field: 'Skcode', header: 'Sk code' },
      { field: 'ShopName', header: 'Shop Name' },
      { field: 'CustomerName', header: 'Customer Name' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'ClusterName', header: 'Cluster Name' },
      { field: 'TotalAmount', header: 'Amount' },
      { field: 'CreatedDate', header: 'Order Date' },
      { field: 'Status', header: 'Status' },
      { field: 'isDamageOrder', header: 'OrderType' },
      { field: 'Action', header: 'Open order details' },
      // { field: 'Action1', header: 'Edit Order' },
    ];
    this.colmns = [
      { field: 'ItemMultiMRPId', header: 'ItemMultiMRPID' },
      { field: 'itemname', header: 'Item Name' },
      { field: 'ABCClassification', header: 'ABCClassification' },
      { field: 'itemcode', header: 'Item Code' },
      { field: 'UnitPrice', header: 'Unit Price' },
      { field: 'DefaultUnitPrice', header: 'Default Unit Price' },
      { field: 'price', header: 'MRP Price' },
      { field: 'MinOrderQty', header: 'MOQ' },
      { field: 'qty', header: 'Quantity' },
      { field: 'AmtWithoutTaxDisc', header: 'Amt Without Tax & Disc.' },
      { field: 'AmtWithoutAfterTaxDisc', header: 'Amount w/o tax after discount (hidden)' },
      { field: 'TaxPercentage', header: 'vat Tax' },
      { field: 'TaxAmmount', header: 'Tax amount (hidden)' },
      { field: 'TotalAmountAfterTaxDisc', header: 'Total Amount After Tax Disc (hidden)' },
      { field: 'TotalAmt', header: 'Total Amount Incl. Tax' },
      { field: 'CurrentStock', header: 'DamageStock' },
      // { field: 'Action1', header: 'Edit Order' },
    ];
    this.IsDisabled = false;
    this.IshowAdd = true;
    this.IshowEdit = false;
    this.SelectedOrderType = -1;
    this.SelectedWarehouseId = '';
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.getDboy();
    this.getAllZone();
    if (this.Id != 0) {

      this._service.GetdamageListById(this.Id).subscribe(res => {
        this.dataAdd = res;
        this.IsDisabled = true;
        this.dataAdd.WarehouseId = res.WarehouseId;
        this.dataAdd.Cityid = res.CityId;
        this.getZoneVal(res.CityId);
        this.getDboy();
        this.IshowAdd = false;
        this.IshowEdit = true;
      });
    }

  }
  DamageDataFun(event) {
    debugger;
    this.first = 0;
    this.skip = event && event.first ? event.first : 0;
    this.take = event && event.Last ? event.Last : 10;
    if (this.zoneid == null) {
      this.messageService.add({ severity: 'error', summary: 'Please Select Zone', detail: '' });
    }
    if (this.statusval == null) {
      this.messageService.add({ severity: 'error', summary: 'Please Select Status', detail: '' });
    }
    if (this.SelectedOrderType == null) {
      this.messageService.add({ severity: 'error', summary: 'Please Select Order Type', detail: '' });
    }
    else {
      if(this.BuyerIds.length > 0){
      this.cityService.exportItem(this.BuyerIds.join(), this.statusval,this.SelectedOrderType,this.skip,this.take).subscribe(x => {
        console.log('data', x);
        // this.search = x        
        this.search = x.ordermaster;
        this.totalRecords = x.total_count;

        this.blocked = true;
        let exportdata = [];
        this.search.forEach(element => {
          exportdata.push({
            WarehouseName: element.WarehouseName,
            DamageOrderId: element.DamageOrderId,
            invoice_no: element.invoice_no,
            Skcode: element.Skcode,
            ShopName: element.ShopName,
            ClusterName: element.ClusterName,
            SalesPerson: element.SalesPerson,
            UpdatedDate: element.UpdatedDate,
            Status: element.Status,
            TotalAmount: element.TotalAmount,
          });
        });

        this.blocked = false;

      });
    }
    }

  }
  loadfuntion(event) {
    debugger;
    if (this.statusval == null) {
      this.messageService.add({ severity: 'success', summary: 'Please Select all fields', detail: '' });
    }
    else if (this.statusval == 'Show All') {
      // this.blocked=true;
      this.currentList = 10;
      this.skip = 1;
      this.take = 10;
      console.log('page', this.skip, this.take, this.currentList);
      this.isSearch = true;
      this.cityService.GetDamageShowAllData(this.BuyerIds.join(), this.skip, this.take).subscribe(x => {
        console.log('load', this.take);
        console.log('searchdata', x);
        this.search = x.ordermaster;
        this.totalRecords = x.total_count;
      })
    }
    else {
      this.skip = 1;
      this.take = 10;
      this.cityService.GetDamageData(this.BuyerIds.join(), this.skip, this.take, this.statusval).subscribe(x => {
        this.isSearch = true;
        console.log('searchdata', x);
        this.search = x.ordermaster;
        this.totalRecords = x.total_count;
      })
    }
  }
  getAllZone() {
    this.cityService.GetAllZone().subscribe(result => {
      console.log(result, "result");
      this.cityList = result;
      console.log('-------', this.cityList);
    })
  }

  getZoneVal(id) {
    console.log('zoneid', id);
    this.zoneid = id;
    this.cityService.GetRegion(id).subscribe(x => {
      console.log('regions', x);
      this.regions = x
    })
  }
  getRegionVal(id) {
    console.log('hubs', id);
    this.cityService.GetHub(id).subscribe(x => {
      console.log('hubs', x);
      this.hubs = x
    })
  }
  getHubVal(id) {
    this.hubval = id;
    console.log('hub', id);
    this.getDboy();
  }
  getStatusVal(id) {
    this.statusval = id;
    console.log('status', id);
    this.currentList = 10;
  }
  getDboy() {
    this.cityService.warehouseRolebased(this.BuyerIds).subscribe(x => {
      console.log('dboyList', x);
      this.dboyList = x

    })
  }
  Search(event) {
    if (this.statusval == null) {
      // this.messageService.add({ severity: 'success', summary: 'Please Select all fields', detail: '' });
    }
    else {
      if (this.statusval == 'Show All') {
        this.loadfuntion(event);

      }
      else {
        this.cityService.GetDamageData(this.BuyerIds.join(), this.skip, this.take, this.statusval).subscribe(x => {
          this.isSearch = true;
          console.log('searchdata', x);
          this.search = x.ordermaster;
          this.totalRecords = x.total_count;
        })
      }
    }
  }
  Detail(i, event,detail) {
    debugger;
    var isDamageOrder = 0;
    if(detail.isDamageOrder)
    {
      isDamageOrder = 1;
    }
    if (this.statusval == "Ready to Dispatch") {
      this.getDataList = null;
      this.isItemdetail = true;
      this.blocked = true;
      this.pickerservice.GetStockData(i).subscribe(x => {
        this.stockData = x;
        this.isSearch = true;
        this.pickerservice.GetItemOrder1(i,isDamageOrder).subscribe(x => {
          this.dataAdd.DboyId = null;
          this.getDataList = x;
          this.dataAdd.DboyId = this.getDataList.DboyId;
          this.cityService.warehouseRolebased(this.getDataList.WarehouseId).subscribe(x => {
            console.log('dboyList', x);
            this.dboyList = x
          })
          this.DamageorderDetails = x.DamageorderDetails;
          this.DamageorderDetails.forEach(e1 => {
            this.stockData.forEach(e2 => {
              if (e1.DamageOrderDetailsId == e2.DamageOrderDetailsId) {
                e1.CurrentStock = e2.Damagestock;
              }
            });

          });
          this.blocked = false;
          this.isdetails = true;
        });
      })
    }
    else {
      this.isSearch = true;
      this.getDataList = null;
      this.isItemdetail = true;
      this.blocked = true;
      this.pickerservice.GetStockData(i).subscribe(x => {
        this.stockData = x;
        this.pickerservice.GetItemOrder1(i,isDamageOrder).subscribe(x => {
          if (this.statusval == "Pending") {
            this.dataAdd.DboyId = null;
          }
          else {
            this.dataAdd.DboyId = null;
            this.getDataList = x;
            this.dataAdd.DboyId = this.getDataList.DboyId;
            this.cityService.warehouseRolebased(this.getDataList.WarehouseId).subscribe(x => {
              console.log('dboyList', x);
              this.dboyList = x
            })
          }
          this.getDataList = x;
          this.DamageorderDetails = x.DamageorderDetails;
          this.DamageorderDetails.forEach(e1 => {
            this.stockData.forEach(e2 => {
              if (e1.DamageOrderDetailsId == e2.DamageOrderDetailsId) {
                e1.CurrentStock = e2.Damagestock;
              }
            });
          });
          this.blocked = false;
          this.isdetails = true;
        });
      })

    }
  }
  onPanelHide() {
    this.BuyerIds = []
    console.log("this.selectedWH");
    console.log(this.selectedBuyer);
    for (var i in this.selectedBuyer) {
      this.BuyerIds.push(this.selectedBuyer[i].WarehouseId)
    }
    this.getDboy();
  }
  searchDataExport: any[]
  ExportOrder() {
    this.first = 0;
    if (this.zoneid == null || this.statusval == null) {
      this.messageService.add({ severity: 'success', summary: 'Please Select Zone and Status', detail: '' });
    }
    else {
      if(this.BuyerIds.length > 0){
      this.cityService.exportItem(this.BuyerIds.join(), this.statusval,this.SelectedOrderType,this.skip,this.take).subscribe(x => {
        console.log('data', x);
        this.searchDataExport = x.ordermaster;
        this.totalRecords = x.total_count;
        this.blocked = true;
     
        this.searchDataExport.forEach(element => {
          // exportdata.push({
          //   WarehouseName:element.WarehouseName,
          //   DamageOrderId:element.DamageOrderId,
          //   invoice_no:element.invoice_no,
          //   Skcode:element.Skcode,
          //   ShopName:element.ShopName,
          //   ClusterName:element.ClusterName,
          //   SalesPerson:element.SalesPerson,
          //   UpdatedDate:element.UpdatedDate,
          //   Status:element.Status,
          //   TotalAmount:element.TotalAmount,
          // });

         let exportdata=[]
          exportdata = this.searchDataExport.map(function (a) {
            
            return {
              'DamageOrderId': a.DamageOrderId,
              'CustomerId': a.CustomerId,
              'CustomerName': a.CustomerName,
              ' Skcode': a.Skcode,
              'ShopName': a.ShopName,
              ' Status': a.Status,
              'invoice_no': a.invoice_no,
              'CustomerType': a.CustomerType,
              'BillingAddress': a.BillingAddress,
              'ShippingAddress': a.ShippingAddress,
              'TotalAmount': a.TotalAmount,
              'GrossAmount': a.GrossAmount,
              'DiscountAmount': a.DiscountAmount,
              'TaxAmount': a.TaxAmount,
              'WarehouseName': a.WarehouseName,
              'CreatedDate': a.CreatedDate,
              'Deliverydate': a.Deliverydate,
              'UpdatedDate': a.UpdatedDate,
              'ClusterName': a.ClusterName,
              'deliveryCharge': a.deliveryCharge,
              'WalletAmount': a.WalletAmount,
              'UsedPoint': a.UsedPoint,
              'RewardPoint': a.RewardPoint,
              'ShortAmount': a.ShortAmount,
              'comments': a.comments,
              'Tin_No': a.Tin_No,
              'ShortReason': a.ShortReason,
              'DamageorderDetails': a.DamageorderDetails,
              'orderProcess': a.orderProcess,
              'accountProcess': a.accountProcess,
              'chequeProcess': a.chequeProcess,
              'epaymentProcess': a.epaymentProcess,
              'DboyId': a.DboyId,
              'OrderId': a.OrderId,
              'isDamageOrder' : a.isDamageOrder == true ? 'Non Sellable Order' : 'Damage Order'
             };
          });
          this.exportService.exportAsExcelFile(exportdata, "DamageDataFile")
        });
      
        this.blocked = false;

      });
    }
    }

  }

  getSearchItem(event) {
    debugger;
    console.log("search key", this.searchKey)
    this.cityService.searchItem(this.searchKey).subscribe(x => {
      console.log('data', x);
      if (x.length > 0) {

        this.search = x;
        this.totalRecords = 0;
      } else {
        this.search = null;
        this.messageService.add({ severity: 'error', summary: 'Data Not Found', detail: '' });
        this.Search(event);
      }
    })
  }
}



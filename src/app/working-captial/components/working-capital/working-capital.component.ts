import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegionService } from 'app/shared/services/region.service';
import * as moment from 'moment';
import { WorkingCapitalService } from 'app/shared/services/working-capital.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { color } from 'html2canvas/dist/types/css/types/color';
@Component({
  selector: 'app-working-capital',
  templateUrl: './working-capital.component.html',
  styleUrls: ['./working-capital.component.scss']
})
export class WorkingCapitalComponent implements OnInit {
  @ViewChild('table', { static: false }) table: ElementRef;
  @ViewChild('tabledata', { static: false }) tabledata: ElementRef;
  regionList: any;
  selectedWarehouse: any;
  warehouseList: any;
  warehouseids: any;
  isInvalid: boolean;
  data: any
  workingCaptialList: any;
  cols: any;
  maxdays: any;
  mindays: any;
  RegionId: any;
  colArray: any;
  colArray2: any;
  firstSeven: any[];
  secondSeven: any[];
  ThirdSeven: any[];
  fourthSeven: any[];
  fifthSeven: any[];
  pages: any;
  AverageInventoryDays: any;
  AverageCashDays: any;
  AverageAssetDays: any;
  AvgSuplierCreditDays: any;
  NetWorkingCapital: any;
  array: any;
  exportColumns: any;
  MonthData: any;
  notShow: any;
  selectedRegion: any;
  regionids: any;
  regionData: any;
  filteredRegion: any;
  warehouseIdsList: any;
  filteredWarehouseids: any;
  AverageRTDDays: number;
  arr: any[];
  OnlinePayAmount: any[];

  // islistLoading: boolean = false;
  constructor(private warehouseService: WarehouseService, private workingCapital: WorkingCapitalService, private regionService: RegionService, private export_service: ExportServiceService) { this.isInvalid = false; this.notShow = true; }

  ngOnInit() {
    this.data = {};
    this.pages = [];
    this.regionids = [];
    this.mindays = moment().add(-7, 'days').toDate();
    this.maxdays = moment().toDate();
    //console.log(this.mindays)
    this.data.Month = moment().toDate();
    this.colArray = [

      {
        bool: 'true', index: '1', field: 'TotalAssets', header: 'Asset',
        innerMenu: [
          {
            bool: 'false', index: '1.1', field: 'Inventory', header: 'Inventory',
            innerMenu: [
              { bool: 'false', index: '1.1.1', field: 'InventoryAmount', header: 'Current Stock' },
              { bool: 'false', index: '1.1.2', field: 'DamageStockAmount', header: 'Damage Stock' },
              { bool: 'false', index: '1.1.3', field: 'NonSellableStockAmount', header: 'Non Sellable Stock' },
              { bool: 'false', index: '1.1.4', field: 'PendingGRNAmount', header: 'Pending GRN' },
            ]
          },
          {
            bool: 'false', index: '1.2', field: 'InventoryInTransit', header: 'Inventory in transit',
            innerMenu: [
              { bool: 'false', index: '1.2.1', field: 'IssuedAmount', header: 'Issued' },
              { bool: 'false', index: '1.2.2', field: 'ShippedAmount', header: 'Shipped Amount' },
              { bool: 'false', index: '1.2.3', field: 'DeliveryRedispatchAmount', header: 'Delivery Redispatch' },
              { bool: 'false', index: '1.2.4', field: 'DeliveryCanceledAmount', header: 'Delivery Canceled' }
            ]
          },
          {
            bool: 'false', index: '1.3', field: 'ReadyToDispatchAmount', header: 'Ready To Dispatch',
            innerMenu: [

            ]
          },
          {
            bool: 'false', index: '1.4', field: 'DeliveredButNotReconciled', header: 'Delivered But Not Reconciled',
            innerMenu: [

            ]
          },
          {
            bool: 'false', index: '1.5', field: 'SupplierAdvances', header: 'Supplier Advances(Non Recon)',
            innerMenu: [

            ]
          },
          {
            bool: 'false', index: '1.6', field: 'CashInOperation', header: 'Cash In Operation',
            innerMenu: [

            ]
          },
          {
            bool: 'false', index: '1.7', field: 'Cheque', header: 'Cheque',
            innerMenu: [
              { bool: 'false', index: '1.7.1', field: 'ChequeInOperation', header: 'Cheque In Operation' },
              { bool: 'false', index: '1.7.2', field: 'ChequeInBank', header: 'Cheque In Bank' },
              { bool: 'false', index: '1.7.3', field: 'ChequeBounce', header: 'Cheque Bounce (Ref)' },

            ]
          },
          {
            bool: 'false', index: '1.8', field: 'AgentDues', header: 'Agent Outstanding',
            innerMenu: [
            ]
          },
          {
            bool: 'false', index: '1.9', field: 'OnlinePrePaidAmount', header: 'Online Payment',
            innerMenu: [
              //{ bool: 'false', index: '1.9.2', field: 'OnlinePrePaidAmountePaylater', header: 'ePayLater' },
              //{ bool: 'false', index: '1.9.2', field: 'OnlinePrePaidAmountePaylater', header: 'ePayLater' },
              //{ bool: 'false', index: '1.9.3', field: 'OnlinePrePaidAmountmPos', header: 'mPOS' },

            ]
          }
        ]
      }, {
        bool: 'true', index: '2', field: 'Liability', header: 'Liability',

        innerMenu: [
          {
            bool: 'false', index: '2.1', field: 'Liability', header: 'Creditors',
            innerMenu: [
              {
                bool: 'false', index: '2.1.1', field: 'SupplierCredit', header: 'Net Supplier Credit',
                innerMenu: [

                ]
              },
              {
                bool: 'false', index: '2.1.2', field: 'GoodsReceivedNotInvoiced', header: 'Goods Received Not Invoiced',
                innerMenu: [

                ]
              },
              {
                bool: 'false', index: '2.1.3', field: 'IRPendingBuyerSide', header: 'IR Approval Pending',
                innerMenu: [

                ]
              },

              // { 
              //   bool: 'false', index: '2.3', field: 'SupplierAdvances', header: 'Supplier Advances',
              //   innerMenu: [

              //   ]
              // },
            ]
          },
        ]
      }, {
        bool: 'false', index: '3', field: 'AvgSale', header: 'Sales',
        innerMenu: [

        ]
      }, {
        bool: 'false', index: '4', field: 'InventoryDays', header: 'Inventory Days',
        innerMenu: [

        ]
      },
      {
        bool: 'false', index: '5', field: 'ReadyToDispatchDays', header: 'Ready To Dispatch Days',
        innerMenu: [

        ]
      },
      {
        bool: 'false', index: '6', field: 'CashDays', header: 'Cash Days',
        innerMenu: [

        ]
      },
      {
        bool: 'false', index: '7', field: 'AssetDays', header: 'Asset Days',
        innerMenu: [

        ]
      },
      {
        bool: 'false', index: '8', field: 'SupplierCreditDays', header: 'Supplier Credit Days',
        innerMenu: [

        ]
      },
      {
        bool: 'false', index: '9', field: 'WorkingCapital', header: 'Working Capital',
        innerMenu: [

        ]
      },
      {
        bool: 'false', index: '10', field: 'IncreaseInWC', header: 'Increase In WC',
        innerMenu: [

        ]
      }//,
      // {
      //   bool: 'false', index: '11', field: 'IRPendingBuyerSide', header: 'IRPending from Buyer Side',
      //   innerMenu: [

      //   ]
      // }

    ]
    this.colArray2 = [

      { index: '', field: 'AvgSale', header: 'Average Sale' },
      { index: '', field: 'AgentDues', header: 'Agent Dues' },
      { index: '', field: 'ShippedAmount', header: 'Shipped Amount' },
      { index: '', field: 'IssuedAmount', header: 'Issued Amount' },
      { index: '', field: 'ReadyToDispatchAmount', header: 'Ready To DispatchAmount' },
      { index: '', field: 'DeliveryRedispatchAmount', header: 'Delivery Redispatch Amount' },
      { index: '', field: 'DeliveryCanceledAmount', header: 'Delivery Canceled Amount' },
      { index: '', field: 'InventoryAmount', header: 'Inventory Amount' },
      { index: '', field: 'DeliveredButNotReconciled', header: 'Delivered But Not Reconciled' },
      { index: '', field: 'CashInOperation', header: 'Cash In Hand' },
      { index: '', field: 'ChequeInOperation', header: 'Cheque In Operation' },
      { index: '', field: 'ChequeInBank', header: 'Cheque In Bank' },
      { index: '', field: 'ChequeBounce', header: 'Cheque Bounce' },
      { index: '', field: 'SupplierCredit', header: 'Supplier Credit' },
      { index: '', field: 'SupplierAdvances', header: 'Supplier Advances' },
      { index: '', field: 'Invoiceintransit', header: 'Invoice intransit' },
      { index: '', field: 'AverageAssetDays', header: 'Average Asset Days' },
      { index: '', field: 'DamageStockAmount', header: 'Damage Stock Amount' },
      { index: '', field: 'OnlinePrePaidAmount', header: 'Online PrePaid Amount' },
      { index: '', field: 'PendingGRNAmount', header: 'Pending GRN Amount' },
      { index: '', field: 'TotalAssets', header: 'Total Assets' },
      { index: '', field: 'SupplierCreditDays', header: 'Supplier Credit Days' },
      { index: '', field: 'InventoryDays', header: 'Inventory Days' },
      { index: '', field: 'CashDays', header: 'Cash Days' },
      { index: '', field: 'AssetDays', header: 'Asset Days' },
      { index: '', field: 'WorkingCapital', header: 'Working Capital' },
      { index: '', field: 'IncreaseInWC', header: 'Increase In WC' },


    ]
    this.cols = [
      // { field: 'CreateDate', header: 'Create Date' },
      { field: 'AvgSale', header: 'Average Sale' },
      { field: 'AgentDues', header: 'Agent Dues' },
      { field: 'IssuedAmount', header: 'Issued Amount' },
      { field: 'ReadyToDispatchAmount', header: 'Ready To DispatchAmount' },
      { field: 'ShippedAmount', header: 'Shipped Amount' },
      { field: 'DeliveryRedispatchAmount', header: 'Delivery Redispatch Amount' },
      { field: 'DeliveryCanceledAmount', header: 'Delivery Canceled Amount' },
      { field: 'DeliveredButNotReconciled', header: 'Delivered But Not Reconciled' },
      { field: 'CashInOperation', header: 'Cash In Hand' },
      { field: 'ChequeInOperation', header: 'Cheque In Operation' },
      { field: 'ChequeInBank', header: 'Cheque In Bank' },
      { field: 'ChequeBounce', header: 'Cheque Bounce' },
      { field: 'SupplierCredit', header: 'Supplier Credit' },
      { field: 'InventoryAmount', header: 'Inventory Amount' },
      { field: 'SupplierAdvances', header: 'Supplier Advances' },
      { field: 'TotalAssets', header: 'Total Assets' },
      { field: 'SupplierCreditDays', header: 'Supplier Credit Days' },
      { field: 'InventoryDays', header: 'Inventory Days' },
      { field: 'CashDays', header: 'Cash Days' },
      { field: 'AssetDays', header: 'Asset Days' },
      { field: 'WorkingCapital', header: 'Working Capital' },
      { field: 'IncreaseInWC', header: 'Increase In WC' },
    ]
    var warehouseids = localStorage.getItem('warehouseids');

    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }
    this.warehouseService.GetAllWarehouseV1().subscribe(warehouses => {
      //console.log(warehouses);
      if (warehouseids) {
        this.warehouseIdsList = warehouses.filter(f => warehouseids.includes(f.WarehouseId))
        this.filteredWarehouseids = this.warehouseIdsList.map(x => x.RegionId);
        //
        this.warehouseIdsList = warehouses.filter(f => f.RegionId > 0)
        // 
        this.filteredRegion = this.filteredWarehouseids.filter(unique)
      } else {
        this.warehouseIdsList = warehouses;
        this.filteredWarehouseids = warehouses.map(x => x.RegionId);
        //
        this.warehouseIdsList = warehouses.filter(f => f.RegionId > 0)
        //
        this.filteredRegion = this.filteredWarehouseids.filter(unique);
        //console.log(this.filteredRegion);
      }

      this.regionService.GetAllRegion().subscribe(result => {
        var a = result.findIndex(x => x.RegionName == "TestRegion");
        if (a > 0) {

          result.splice(a, 1);
        }

        this.regionList = result.filter(f => this.filteredRegion.includes(f.RegionId))
        this.warehouseList = this.warehouseIdsList.filter(x => this.filteredRegion.includes(x.RegionId))
        this.selectedWarehouse = this.warehouseIdsList.filter(x => this.filteredRegion.includes(x.RegionId))
        this.warehouseids = this.selectedWarehouse.map(x => x.WarehouseId)
        this.data.warehouseids = this.warehouseids;
        //this.regionList = result;
        this.selectedRegion = this.regionList;
        this.regionids = this.selectedRegion.map(x => x.RegionId);
        this.regionData = {
          regionIds: this.regionids
        }


        this.onSearch()
        // this.regionService.getSpecificWarehousesidForRegion(this.regionData).subscribe(result =>{
        //   this.warehouseList = result;
        //   this.selectedWarehouse =  this.warehouseList;
        //   this.warehouseids = this.selectedWarehouse.map(x => x.WarehouseId)
        //   this.data.warehouseids = this.warehouseids;
        // })
      })
    })
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }
  // onRegionChange(regionId){
  //     this.regionService.getSpecificWarehousesid(regionId).subscribe(result =>{
  //       this.warehouseList = result;
  //       this.selectedWarehouse =  this.warehouseList;
  //       this.warehouseids = this.selectedWarehouse.map(x => x.WarehouseId)
  //       this.data.warehouseids = this.warehouseids;
  //     })
  // }
  selectedWarehouses() {
    this.data.warehouseids = this.selectedWarehouse.map(x => x.WarehouseId)
  }

  onSelectedRegionChange() {
    this.regionids = this.selectedRegion.map(x => x.RegionId)
    this.regionData = {
      regionIds: this.regionids
    }
    this.warehouseList = this.warehouseIdsList.filter(x => this.regionids.includes(x.RegionId))
    this.selectedWarehouse = this.warehouseIdsList.filter(x => this.regionids.includes(x.RegionId))
    //console.log(this.selectedWarehouses);
    this.warehouseids = this.selectedWarehouse.map(x => x.WarehouseId)
    this.data.warehouseids = this.warehouseids;
    // this.regionService.getSpecificWarehousesidForRegion(this.regionData).subscribe(result =>{
    //   this.warehouseList = result;
    //   this.selectedWarehouse =  this.warehouseList;
    //   this.warehouseids = this.selectedWarehouse.map(x => x.WarehouseId)
    //   this.data.warehouseids = this.warehouseids;
    // })

  }
  getFirstMatchValue(arr, field) {

    var returnvalue = 0;
    for (var j = 0; j < arr.length; j++) {
      if (arr[j].PaymentFrom == field) {
        returnvalue = arr[j].Amount;
        break;
      }
    }
    return returnvalue;
  }

  onSearch() {
    // this.islistLoading = true;
    this.array = [];
    this.pages = [];
    this.MonthData = []
    this.OnlinePayAmount = [];
    this.mindays = moment().add(-7, 'days').toDate();
    this.maxdays = moment().toDate();
    this.workingCapital.getWorkingcapital(this.data).subscribe(result => {
      console.log(result);
      this.pages = [];
      if (result.newdc != null) {

        this.isInvalid = false;
        this.AverageAssetDays = result.AverageAssetDays;
        this.AverageCashDays = result.AverageCashDays;
        this.AverageInventoryDays = result.AverageInventoryDays;
        this.AvgSuplierCreditDays = result.AvgSuplierCreditDays;
        this.NetWorkingCapital = result.NetWorkingCapital;
        this.AverageRTDDays = result.AverageRTDDays;
        // if(this.NetWorkingCapital == "Infinity"){
        //   this.NetWorkingCapital = false;
        // }else{

        // }

        // this.array.push(result.newdc[1]);
        for (var i in result.newdc) {
          result.newdc[i].CreateDate = moment(result.newdc[i].CreateDate).format("Do MMMM");
          this.MonthData.push(result.newdc[i])
        }

        var v = 0;
        for (var s = 0; s < result.newdc.length; s++) {
          for (var t = 0; t < result.newdc[s]["WorkingCapitalDCs"].OnlinePayments.length; t++) {
            var version = "1.9.";
            if (this.OnlinePayAmount.length == 0) {
              version += v + 1;
              this.OnlinePayAmount.push({ bool: false, index: version, field: result.newdc[s]["WorkingCapitalDCs"].OnlinePayments[t].PaymentFrom, header: result.newdc[s]["WorkingCapitalDCs"].OnlinePayments[t].PaymentFrom });
              v++;
            }
            else {
              var arrlength = this.OnlinePayAmount.length;
              var exists = false;
              for (var j = 0; j < arrlength; j++) {
                if (this.OnlinePayAmount[j].field == result.newdc[s]["WorkingCapitalDCs"].OnlinePayments[t].PaymentFrom) {
                  exists = true;
                  break;
                }
              }
              if (!exists) {
                version += v + 1;
                this.OnlinePayAmount.push({ bool: false, index: version, field: result.newdc[s]["WorkingCapitalDCs"].OnlinePayments[t].PaymentFrom, header: result.newdc[s]["WorkingCapitalDCs"].OnlinePayments[t].PaymentFrom });
                v++;

              }

            }
          }
        }

        this.colArray[0].innerMenu[8].innerMenu = this.OnlinePayAmount
        this.workingCaptialList = result.newdc;
        var k = this.workingCaptialList.length / 7;
        k = Math.ceil(k);
        //console.log(k);
        for (var j = 1; j <= k; j++) {
          this.pages.push(j);
        }
        // this.pages.reverse();


        if (this.workingCaptialList.length > 0 && this.workingCaptialList.length <= 7) {
          this.firstSeven = this.workingCaptialList.splice(0, 7)
          //console.log(this.firstSeven);
          this.workingCaptialList = this.firstSeven;
        } else if (this.workingCaptialList.length > 7 && this.workingCaptialList.length <= 14) {
          this.firstSeven = this.workingCaptialList.splice(0, 7)
          this.secondSeven = this.workingCaptialList.splice(0, 7)
          //console.log(this.firstSeven)
          //console.log(this.secondSeven)
          this.workingCaptialList = this.firstSeven;
        } else if (this.workingCaptialList.length > 14 && this.workingCaptialList.length <= 21) {
          this.firstSeven = this.workingCaptialList.splice(0, 7)
          this.secondSeven = this.workingCaptialList.splice(0, 7)
          this.ThirdSeven = this.workingCaptialList.splice(0, 7)
          //console.log(this.firstSeven)
          //console.log(this.secondSeven)
          //console.log(this.ThirdSeven)
          this.workingCaptialList = this.firstSeven;
        }
        else if (this.workingCaptialList.length > 21 && this.workingCaptialList.length <= 28) {

          this.firstSeven = this.workingCaptialList.splice(0, 7)
          this.secondSeven = this.workingCaptialList.splice(0, 7)
          this.ThirdSeven = this.workingCaptialList.splice(0, 7)
          this.fourthSeven = this.workingCaptialList.splice(0, 7)
          //console.log(this.firstSeven)
          //console.log(this.secondSeven)
          //console.log(this.ThirdSeven)
          this.workingCaptialList = this.firstSeven;
        }
        else if (this.workingCaptialList.length > 28 && this.workingCaptialList.length <= 31) {
          this.firstSeven = this.workingCaptialList.splice(0, 7)
          this.secondSeven = this.workingCaptialList.splice(0, 7)
          this.ThirdSeven = this.workingCaptialList.splice(0, 7)
          this.fourthSeven = this.workingCaptialList.splice(0, 7)
          this.fifthSeven = this.workingCaptialList.splice(0, 7)
          //console.log(this.firstSeven)
          //console.log(this.secondSeven)
          //console.log(this.ThirdSeven)
          this.workingCaptialList = this.firstSeven;
        }
      } else {
        this.pages = [];
        this.workingCaptialList = [];
        this.MonthData = [];
        this.isInvalid = true;
      }
    })

  }

  click(r) {
    //console.log(r);
  }

  onDateSelect(selectedDate) {
    this.mindays = this.data.StartDate ? this.data.StartDate : moment().add(-7, 'days').toDate();
    this.maxdays = moment().toDate();
  }
  onNext(pag) {
    //console.log(pag)
    if (pag == 1) {
      this.workingCaptialList = this.firstSeven;
    }
    if (pag == 2) {
      this.workingCaptialList = this.secondSeven;
    }
    if (pag == 3) {
      this.workingCaptialList = this.ThirdSeven;
    }
    if (pag == 4) {
      this.workingCaptialList = this.fourthSeven;
    }
    if (pag == 5) {
      this.workingCaptialList = this.fifthSeven;
    }
  }

  onExport() {
    // var arr = [];
    // for(var i in this.workingCaptialList){
    //   arr.push(this.workingCaptialList[i].CreateDate , this.workingCaptialList[i].WorkingCapitalDCs);
    // }
    this.export_service.ExportToExcel(this.table, 'TableData');
    // var table = document.getElementById("table");
    // var html = table.outerHTML;
    // var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    // elem.setAttribute("href", url);
    // elem.setAttribute("download", "export.xls"); // Choose the file name
    // return false;

  }

  onMonthExport() {

    this.export_service.ExportToExcel(this.tabledata, 'MonthData');
  }


  myClick(index) {


    // this.colArray.forEach(element => {
    //   this.arr.push('element.index')
    // });
    //console.log(this.arr);
    var ind = this.colArray;
    //console.log(ind);

  }

  toggleSection(itemIndex: number, childIndex?: number, grandChildIndex?: number) {


    if (childIndex && childIndex != 0 || childIndex != null) {
      this.colArray[itemIndex].innerMenu[childIndex].toggle = !this.colArray[itemIndex].innerMenu[childIndex].toggle;
      if (grandChildIndex) {
        this.colArray[itemIndex].innerMenu[childIndex].innerMenu[grandChildIndex].toggle = !this.colArray[itemIndex].innerMenu[childIndex].innerMenu[grandChildIndex].toggle;
      }
    }
    else {
      this.colArray[itemIndex].toggle = !this.colArray[itemIndex].toggle;
    }

  }

}


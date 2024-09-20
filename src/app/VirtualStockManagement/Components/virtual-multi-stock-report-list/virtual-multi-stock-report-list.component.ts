import { Component, OnInit } from '@angular/core';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { StockHistoryFilterDc } from 'app/VirtualStockManagement/Interfaces/stock-history-filter-dc';
import * as moment from 'moment';

@Component({
  selector: 'app-virtual-multi-stock-report-list',
  templateUrl: './virtual-multi-stock-report-list.component.html',
  styleUrls: ['./virtual-multi-stock-report-list.component.scss']
})
export class VirtualMultiStockReportListComponent implements OnInit {
  virtualList: any;
  exportData: any[];
  exportTransactionData: any[];
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  transactionList: any;
  transactionView: boolean;
  FromStock: any[];
  FromType: boolean;
  Type: any;
  virtualMasterList: any;
  warehouseList : any;
  data: any;
  whWiseData: boolean;
  mrpFilter: boolean;
  ItemFilter: boolean;
  filter: StockHistoryFilterDc;
  // WarehouseFilter : boolean;
  blocked: boolean;
  UnsettledvirtualList: any;

  constructor(private virtualService: VirtualStockService, private exportService: ExportServiceService, private warehouseService: WarehouseService) {
    this.data = {};
  }

  ngOnInit() {
    this.filter = {
      WarehouseId: 0,
      ItemMultiMRPId: 0
    };
    this.data.warehouseID = '';
    this.data.search = '';
    // this.whWiseData = false;
    this.mrpFilter = false;
    this.ItemFilter = false;
    // this.WarehouseFilter = false;
    this.warehouseService.GetWarehouses().subscribe(result => {
      this.warehouseList = result;
      console.log('result: ', this.warehouseList);

    });
    this.FromType = false;
    this.Type = '';
    this.getData();
    // this.virtualService.getVirtualStockList().subscribe(x => {
    //   this.virtualList = x;
    //   this.virtualMasterList = x;
    //   this.exportData = this.virtualList;
    // })
  }

  getData() {
    this.virtualService.getVirtualStockListByFilter(this.filter).subscribe(x => {
      this.virtualList = x;
      for (var i in this.virtualList) {
        this.virtualList[i].CreatedDate = this.virtualList[i].CreatedDate ? moment(this.virtualList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      this.virtualMasterList = x;
      this.exportData = this.virtualList;

    });
  }

  reset() {
    this.filter.ItemMultiMRPId = 0;
    this.filter.WarehouseId = 0;
    this.getData();
  }
  wareid:any
  onSelectWarehouse(r) {
    debugger;
    console.log(r);
    this.filter.WarehouseId = r.WarehouseId;
    this.whWiseData = true;
    this.getData();
  }

  openDetails(d, e) {
    this.Type = '';
    this.selectedRowDetails = d;
    this.blocked = true;
    this.virtualService.getVirtualTransactionList(this.selectedRowDetails.ItemMultiMRPID, this.selectedRowDetails.WarehouseId).subscribe(result => {

      this.transactionList = result;
      this.FromType = false;
      this.blocked = false;
      for (var i in this.transactionList) {
        if (this.transactionList[i].QTY < 0) {
          this.transactionList[i].StockType = "To" + " " + this.transactionList[i].StockType
        }
        else {
          this.transactionList[i].StockType = "From" + " " + this.transactionList[i].StockType
        }
      }
      console.log('this.transactionList', this.transactionList);
      this.exportTransactionData = this.transactionList;
    })
    this.transactionView = true;
    this.isDetails = true;
  }
  type(StockType) {

    if (StockType == 1) {
      this.FromStock = [];
      for (var i in this.transactionList) {
        if (this.transactionList[i].QTY < 0) {
          this.FromStock.push(this.transactionList[i]);
          this.FromType = true;
        }
      }
    }
    else if (StockType == 2) {
      this.FromStock = [];
      for (var i in this.transactionList) {
        if (this.transactionList[i].QTY > 0) {
          this.FromStock.push(this.transactionList[i]);
          this.FromType = true;
        }
      }
    }
  }
  exportTransaction() {
    this.exportService.exportAsExcelFile(this.exportTransactionData, 'ExportVirtualStockList');
  }
  export() {
    this.exportService.exportAsExcelFile(this.exportData, 'ExportVirtualStockList');
  }

  searchVirtualItemfilter(event) {

    let term = event.target.value
    console.log(term);
    var a = this.virtualList;

    if (term.length) {

      let virtualList = this.virtualMasterList.filter(x => x.ItemName.toString().toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (virtualList.length == 0) {
        this.virtualList = [];
      }
      else {
        this.virtualList = virtualList;
      }
    } else {
      this.virtualList = this.virtualMasterList
    }
  }

  searchVirtualMrpfilter(event) {

    let term = event.target.value
    console.log(term);
    var a = this.virtualList;

    if (term) {
      this.virtualList = this.virtualList.filter(x => x.ItemMultiMRPID == term);
      if (this.virtualList.length == 0) {
        this.virtualList = a;

        if (this.virtualList.length == 0) {
          // this.blocked = true;
          this.virtualService.getVirtualStockList().subscribe(x => {
            this.virtualList = x;
            this.virtualMasterList = x;
            this.exportData = this.virtualList;
          })

        }

      }

    } else {
      this.virtualService.getVirtualStockList().subscribe(x => {
        this.virtualList = x;
        this.virtualMasterList = x;
        this.exportData = this.virtualList;
      })

    }

  }
  searchFilter(event, warehouseID) {

    let mrp = event.target.value
    if (mrp.length) {
      this.virtualService.SearchByItemMultiMrpId(mrp, warehouseID).subscribe(x => {
        this.virtualList = x;
        this.exportData = this.virtualList;
      })
    }
    else {
      this.virtualService.getVirtualStockList().subscribe(x => {
        this.virtualList = x;
        this.virtualMasterList = x;
        this.exportData = this.virtualList;
      })
    }

  }
  searchFilterOption(search) {

    if (search == 'ItemMultiMRPID') {
      this.mrpFilter = true;
      this.ItemFilter = false;
      // this.WarehouseFilter = false;
    }
    else if (search == 'ItemName') {
      this.ItemFilter = true;
      this.mrpFilter = false;
      // this.WarehouseFilter = false;    
    }
    else {
      this.ItemFilter = false;
      this.mrpFilter = false;
      // this.WarehouseFilter = false;
    }
  }
  unsettledItemExport() {
    this.blocked = true;
    if (!this.filter.WarehouseId) {
      alert("Please select Warehouse first");
      this.blocked = false;
      return false;
    }

    this.virtualService.UnsettledVirtualItemList(this.filter.WarehouseId).subscribe(x => {   
      this.UnsettledvirtualList = x;
      this.blocked = false;
      this.exportService.exportAsExcelFile(this.UnsettledvirtualList, 'UnsettledVirtualStockList');
    })
  }
}

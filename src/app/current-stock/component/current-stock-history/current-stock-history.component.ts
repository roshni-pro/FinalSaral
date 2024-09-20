import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CurrentStockService } from '../../../shared/services/current-stock.service';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
@Component({
  selector: 'app-current-stock-history',
  templateUrl: './current-stock-history.component.html',
  styleUrls: ['./current-stock-history.component.scss']
})
export class CurrentStockHistoryComponent implements OnInit {
  @Input() warehouseId: any;
  @Input() stockId: any;
  @Input() itemNo: any;
  stockHistoryList: any[];
  cols: any[];
  inputModel: any
  totalRecords: any
  exportList: any
  constructor(private currentStockService: CurrentStockService,
    private exportService: ExportServiceService) {
    this.stockHistoryList = [];
    this.inputModel = {};
  }

  ngOnInit() {



    this.cols = [
      { field: 'itemname', header: 'Item Name' },
      { field: 'ManualReason', header: 'Manual Inventory' },
      { field: 'ManualInventoryIn', header: ' Manual Inventory QTy' },
      { field: 'InventoryIn', header: ' PO Receive' },
      { field: 'InventoryOut', header: 'Order Sale' },
      { field: 'DamageInventoryOut', header: 'Damage Inventory' },
      { field: 'PurchaseInventoryOut', header: 'Purchase Return' },
      { field: 'OrderCancelInventoryIn', header: 'Order Cancel In' },
      { field: 'TotalInventory', header: 'Inventory' },
      { field: 'OdOrPoId', header: 'OderId/PoId/ToId' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'UserName', header: 'Edited By' },
      { field: 'CreationDate', header: 'Date' },




      // { field: 'ManualInventoryIn', header: 'Manual Inventory In' },
      // { field: 'brand', header: 'PO Receive' },
      // { field: 'color', header: 'Order Sale' },
      // { field: 'DamageInventoryOut', header: 'Damage Inventory' },
      // { field: 'PurchaseInventoryOut', header: 'Purchase Return' },
      // { field: 'OrderCancelInventoryIn', header: 'Order Cancel In' },
      // { field: 'CurrentInventory', header: 'Inventory' },
      // { field: 'OdOrPoId', header: 'Order Id / PO Id' },
      // { field: 'WarehouseName', header: 'Warehouse Name' },
      // { field: 'UserName', header: 'Edited By' },
      // { field: 'CreationDate', header: 'Date' },

    ];

  }
  load(event) {
    console.log(event);
    this.inputModel.First = event.first;//(event.first == 0 || event.first) ? event.first  : 0;
    this.inputModel.Last = event.rows ? event.first + event.rows : 20;
    // this.inputModel.Contains = this.searchKey ? this.searchKey : null;
    // this.inputModel.ColumnName = event.sortField ? event.sortField : 'StockId';
    // this.inputModel.IsAscending = event.sortOrder == 1 ? true : false;
    var page = this.inputModel.Last / event.rows
    console.log(page)
    this.currentStockService.GetHistory(this.itemNo, event.rows, page, this.warehouseId, this.stockId).subscribe(result => {
      for (var i in result['ordermaster']) {
        result['ordermaster'][i].CreationDate = result['ordermaster'][i].CreationDate ? moment(result['ordermaster'][i].CreationDate).format('DD/MM/YYYY HH:mm') : null;
      }
      this.stockHistoryList = result['ordermaster'];
      this.totalRecords = result['total_count']
      console.log(this.stockHistoryList);

    });

  }
  exportCSV() {
    this.currentStockService.export(this.stockId, this.warehouseId).subscribe(result => {
      this.exportService.exportAsExcelFile(result, 'history_data');
    });
  }

}

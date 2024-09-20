import { Component, OnInit } from '@angular/core';
import { StockHistoryPageFilter } from 'app/VirtualStockManagement/Interfaces/stock-history-page-filter';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.scss']
})
export class StockHistoryComponent implements OnInit {
  stockHistoryPageFilter: StockHistoryPageFilter;
  warehouseId: number;
  stockList: any[];
  selectedStock: any;
  showHistory: boolean;
  warehouseList: any[];
  itemList: any[];
  itemValue: any;
  selectedItem: any;
  constructor(private virtualStockService: VirtualStockService, private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.warehouseId = null;
    this.selectedStock = null;
    this.showHistory = false;
    this.stockHistoryPageFilter = {
      UserId: null,
      Take: 10,
      Skip: 0,
      ItemMultiMRPId: null,
      WarehouseId: null,
      RefStockType: null,
      StockType: null
    }

    this.virtualStockService.GetAllStocks(1, 1).subscribe(x => {
      this.stockList = x;
      console.log('this.stockList: ', this.stockList);
    });
  }


  onSelectStock() {
    this.showHistory = false;
    if (this.selectedStock) {
      this.stockHistoryPageFilter.StockType = this.selectedStock.StockType;
      setTimeout(() => {
        this.showHistory = true;
      }, 100);
    }

    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.warehouseList = result;
        console.log('result: ', this.warehouseList);
      });

  }

  onWarehouseChange() {
    this.showHistory = false;
    console.log('this.warehouseId: ', this.warehouseId);
    this.stockHistoryPageFilter.WarehouseId = this.warehouseId;
    setTimeout(() => {
      this.showHistory = true;
    }, 100);

  }

  getitemList(event) {
    if (event.query.length > 2 && this.stockHistoryPageFilter.WarehouseId) {
      this.virtualStockService.searchWarehouseItems(event.query, this.stockHistoryPageFilter.WarehouseId).subscribe(result => {
        this.itemList = result;
      })
    }
  }


  onSelectItem(event) {
    this.itemValue = event;
    this.showHistory = false;
    if (this.itemValue) {
      this.stockHistoryPageFilter.ItemMultiMRPId = this.itemValue.ItemMultiMRPId;
    }
    setTimeout(() => {
      this.showHistory = true;
    }, 100);
    console.log('this.itemValue: ', this.itemValue);
  }

  cancelItem() {
    this.selectedItem = null;
    this.itemValue = null;
    this.stockHistoryPageFilter.ItemMultiMRPId = null;
    this.showHistory = false;
    setTimeout(() => {
      this.showHistory = true;
    }, 100);
  }
}

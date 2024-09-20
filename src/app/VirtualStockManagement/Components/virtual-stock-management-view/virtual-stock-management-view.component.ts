import { ItemService } from 'app/shared/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Stock } from './../../Interfaces/Stock';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { StockTransaction } from 'app/VirtualStockManagement/Interfaces/stockTransaction';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';

@Component({
  selector: 'app-virtual-stock-management-view',
  templateUrl: './virtual-stock-management-view.component.html',
  styleUrls: ['./virtual-stock-management-view.component.scss']
})
export class VirtualStockManagementViewComponent implements OnInit {
  VirtualStocks = { name: "VirtualStocks", quantity: 0 };

  quantityToAdd = 0;
  fromQuantity: Stock;
  toQuantity: Stock;
  invalidAmount: boolean;
  stockTransactionsList: StockTransaction[];
  itemValue: any;
  isLoading: boolean = false;

  DamagedStocks = { name: "DamagedStocks", quantity: 0 }
  ExpiredStocks = { name: "ExpiredStocks", quantity: 0 }
  FreeStocks = { name: "FreeStocks", quantity: 0 }
  ReservedStocks = { name: "ReservedStocks", quantity: 0 }
  RTDStocks = { name: "RTDStocks", quantity: 0 }
  RTVStocks = { name: "RTVStocks", quantity: 0 }
  DeliveredStocks = { name: "DeliveredStocks", quantity: 0 }
  CurrentStocks = { name: "CurrentStocks", quantity: 0 }
  InReceivedStocks = { name: "InReceivedStocks", quantity: 0 }
  InTransitStocks = { name: "InTransitStocks", quantity: 0 }
  //initial = true;
  initial = false;
  ItemMultiMRPId: number;
  WarehouseId: number;
  ItemName: any;
  stocksettle: boolean;
  virtual: boolean;
  reason: string;
  invalidreason: boolean;
  constructor(private messageService: MessageService, private virtualStockService: VirtualStockService,
    private router: Router, private r: ActivatedRoute, private itemService: ItemService, private renderer: Renderer2, private el: ElementRef,
    private route: ActivatedRoute) {
    this.fromQuantity = new Stock();
    this.toQuantity = new Stock();
    this.stockTransactionsList = [];
  }

  ngOnInit() {
    this.virtual = false;
    this.stocksettle = false;
    this.invalidreason = false;
    this.ItemMultiMRPId = Number(this.route.snapshot.paramMap.get("ItemMultiMRPId"));
    this.WarehouseId = Number(this.route.snapshot.paramMap.get("WarehouseId"));
    this.ItemName = String(this.route.snapshot.paramMap.get("ItemName"));
    if (this.ItemMultiMRPId != 0 && this.WarehouseId != 0) {
      this.stocksettle = true;
      this.initial = true;
      this.getSelectedStocksList(this.WarehouseId, this.ItemMultiMRPId);
    }
  }



  getSelectedStocksList(WarehouseId, ItemMultiMRPId) {
    this.isLoading = true;
    this.virtualStockService.GetAllStocks(WarehouseId, ItemMultiMRPId).subscribe(result => {
      console.log('abcd:', result);
      this.resetManageStock();
      result.forEach(item => {
        item.name = item.StockType;
        item.quantity = item.Qty;
        if (item.StockType == "DamagedStocks") { this.DamagedStocks = item }
        if (item.StockType == "ExpiredStocks") { this.ExpiredStocks = item }
        if (item.StockType == "FreeStocks") { this.FreeStocks = item }
        if (item.StockType == "ReservedStocks") { this.ReservedStocks = item }
        if (item.StockType == "RTDStocks") { this.RTDStocks = item }
        if (item.StockType == "RTVStocks") { this.RTVStocks = item }
        if (item.StockType == "VirtualStocks") { this.VirtualStocks = item; this.virtual = true; }
        if (item.StockType == "DeliveredStocks") { this.DeliveredStocks = item }
        if (item.StockType == "CurrentStocks") { this.CurrentStocks = item }
        if (item.StockType == this.InReceivedStocks.name) { this.InReceivedStocks = item }
        if (item.StockType == this.InTransitStocks.name) { this.InTransitStocks = item }
      });
      this.initial = true;
      this.isLoading = false;
    });
  }

  getStocksList(event) {
    this.getSelectedStocksList(this.itemValue.WarehouseId, this.itemValue.ItemMultiMRPId);
  }


  refresh(){
    
  }

  resetManageStock(){
    this.DamagedStocks = { name: "DamagedStocks", quantity: 0 }
    this.ExpiredStocks = { name: "ExpiredStocks", quantity: 0 }
    this.FreeStocks = { name: "FreeStocks", quantity: 0 }
    this.ReservedStocks = { name: "ReservedStocks", quantity: 0 }
    this.RTDStocks = { name: "RTDStocks", quantity: 0 }
    this.RTVStocks = { name: "RTVStocks", quantity: 0 }
    this.DeliveredStocks = { name: "DeliveredStocks", quantity: 0 }
    this.CurrentStocks = { name: "CurrentStocks", quantity: 0 }
    this.InReceivedStocks = { name: "InReceivedStocks", quantity: 0 }
    this.InTransitStocks = { name: "InTransitStocks", quantity: 0 }
    }
}

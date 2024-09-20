import { ItemService } from 'app/shared/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Stock } from './../../Interfaces/Stock';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { StockTransaction } from 'app/VirtualStockManagement/Interfaces/stockTransaction';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';

@Component({
  selector: 'app-virtual-stock-management',
  templateUrl: './virtual-stock-management.component.html',
  styleUrls: ['./virtual-stock-management.component.scss']
})
export class VirtualStockManagementComponent implements OnInit {

  VirtualStocks = { name: "VirtualStocks", quantity: 0 };

  isOpenPopup = false;
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

  onDrop(e) {
    this.el.nativeElement = e.nativeEvent.toElement;
    this.renderer.removeClass(this.el.nativeElement, 'drag-over-border');
    this.renderer.removeClass(this.el.nativeElement.parentElement, 'drag-over-border');
    this.renderer.removeClass(this.el.nativeElement.parentElement.parentElement, 'drag-over-border');
    this.renderer.removeClass(this.el.nativeElement.parentElement.parentElement.parentElement, 'drag-over-border');
    this.renderer.removeClass(this.el.nativeElement.parentElement.parentElement.parentElement.parentElement, 'drag-over-border');

    if (this[e.dragData["name"]]["name"] != "VirtualStocks") {
      this.fromQuantity = this[e.dragData["name"]];
      this.toQuantity = this[e.nativeEvent.toElement.id];
      //      this.quantityToAdd = this[e.dragData["name"]]['quantity'];
      this.quantityToAdd = 0;
      this.reason = null;
      this.invalidreason = false;
      if (this.fromQuantity['name'] != this.toQuantity['name'] && Number(this.fromQuantity['quantity']) > 0) {
        this.isOpenPopup = true;
      }
    }
    else {
      this.fromQuantity = this[e.dragData["name"]];
      this.toQuantity = this[e.nativeEvent.toElement.id];
      //this.quantityToAdd = this[e.dragData["name"]]['quantity'];
      this.quantityToAdd = 0;
      this.reason = null;
      this.invalidreason = false;

      if (this.fromQuantity['name'] != this.toQuantity['name']) {
        this.isOpenPopup = true;
      }
    }
  }

  calculateVirtualStock() {
    if (this.reason != null && this.reason != "") {

      if (this.fromQuantity["name"] != "VirtualStocks") {
        if (this.toQuantity["name"] != "VirtualStocks") { // if from and to stock are not virtual stock
          if (this.quantityToAdd > 0 && this.fromQuantity['quantity'] > 0) {
            let paid = this.fromQuantity['quantity'] - Number(this.quantityToAdd);
            this.toQuantity['quantity'] += Number(this.quantityToAdd);
            this.fromQuantity['quantity'] -= Number(this.quantityToAdd);

            if (this.fromQuantity['quantity'] <= 0) {
              this.VirtualStocks.quantity += Number(paid);
              this.fromQuantity['quantity'] -= Number(paid);
              // this.virtualStock.quantity += this.fromQuantity['quantity'];
              // this.fromQuantity['quantity'] -= this.fromQuantity['quantity'];
            }
            else {

            }
            let stockTransactionToVirtualStock = new StockTransaction();

            stockTransactionToVirtualStock.ItemMultiMRPId = this.itemValue.ItemMultiMRPId;
            stockTransactionToVirtualStock.WarehouseId = this.itemValue.WarehouseId;
            stockTransactionToVirtualStock.SourceStockType = this.fromQuantity["name"];
            stockTransactionToVirtualStock.DestinationStockType = "VirtualStocks";
            stockTransactionToVirtualStock.Qty = paid < 0 ? (this.quantityToAdd - (-paid)) : this.quantityToAdd;
            stockTransactionToVirtualStock.Reason = this.reason;
            this.stockTransactionsList.push(stockTransactionToVirtualStock);

            let stockTransactionToStock = new StockTransaction();
            stockTransactionToStock.ItemMultiMRPId = this.itemValue.ItemMultiMRPId;
            stockTransactionToStock.WarehouseId = this.itemValue.WarehouseId;
            stockTransactionToStock.SourceStockType = "VirtualStocks";
            stockTransactionToStock.DestinationStockType = this.toQuantity["name"];
            // stockTransactionToStock.Qty = -this.quantityToAdd;
            stockTransactionToStock.Qty = this.quantityToAdd;
            stockTransactionToStock.Reason = this.reason;
            this.stockTransactionsList.push(stockTransactionToStock);
            this.isOpenPopup = false;
          }
          else {
            this.invalidAmount = true;
          }
        }
        else { // if to stock is virtual stock
          if (Number(this.quantityToAdd) <= this.fromQuantity['quantity'] && Number(this.quantityToAdd) > 0) {
            // this.virtualStock.quantity += Number(this.quantityToAdd);
            this.fromQuantity['quantity'] -= Number(this.quantityToAdd);
            this.toQuantity['quantity'] += Number(this.quantityToAdd);
            let stockTransaction = new StockTransaction();
            stockTransaction.ItemMultiMRPId = this.itemValue.ItemMultiMRPId;
            stockTransaction.WarehouseId = this.itemValue.WarehouseId;
            stockTransaction.SourceStockType = this.fromQuantity["name"];
            stockTransaction.DestinationStockType = this.toQuantity["name"];
            stockTransaction.Qty = this.quantityToAdd;
            stockTransaction.Reason = this.reason;
            this.stockTransactionsList.push(stockTransaction);

            this.isOpenPopup = false;
            this.invalidAmount = false;
            this.invalidreason = false;
          }
          else {
            this.invalidAmount = true;
          }
        }
      }
      else { // if from stock is Virtual Stock
        if (Number(this.quantityToAdd) > 0) {
          this.fromQuantity['quantity'] -= Number(this.quantityToAdd);
          this.toQuantity['quantity'] += Number(this.quantityToAdd);

          let stockTransaction = new StockTransaction();
          stockTransaction.ItemMultiMRPId = this.itemValue.ItemMultiMRPId;
          stockTransaction.WarehouseId = this.itemValue.WarehouseId;

          stockTransaction.SourceStockType = this.fromQuantity["name"];
          stockTransaction.DestinationStockType = this.toQuantity["name"];
          
          // stockTransaction.Qty = -this.quantityToAdd;
          stockTransaction.Reason = this.reason;
          stockTransaction.Qty = this.quantityToAdd;

          this.stockTransactionsList.push(stockTransaction);

          this.isOpenPopup = false;
          this.invalidAmount = false;
          this.invalidreason = false;
          this.quantityToAdd = 0;

        }
        else {
          this.invalidAmount = true;
        }
      }


    } else {
      this.invalidreason = true;

    }
  }

  calculateSelectedVirtualStock() {
    if (this.reason != null && this.reason != "") {

      if (this.fromQuantity["name"] != "VirtualStocks") {
        if (this.toQuantity["name"] != "VirtualStocks") { // if from and to stock are not virtual stock
          if (this.quantityToAdd > 0 && this.fromQuantity['quantity'] > 0) {
            let paid = this.fromQuantity['quantity'] - Number(this.quantityToAdd);
            this.toQuantity['quantity'] += Number(this.quantityToAdd);
            this.fromQuantity['quantity'] -= Number(this.quantityToAdd);

            if (this.fromQuantity['quantity'] <= 0) {
              this.VirtualStocks.quantity += Number(paid);
              this.fromQuantity['quantity'] -= Number(paid);
              // this.virtualStock.quantity += this.fromQuantity['quantity'];
              // this.fromQuantity['quantity'] -= this.fromQuantity['quantity'];
            }
            else {

            }
            let stockTransactionToVirtualStock = new StockTransaction();

            stockTransactionToVirtualStock.ItemMultiMRPId = this.ItemMultiMRPId;
            stockTransactionToVirtualStock.WarehouseId = this.WarehouseId;
            stockTransactionToVirtualStock.SourceStockType = this.fromQuantity["name"];
            stockTransactionToVirtualStock.DestinationStockType = "VirtualStocks";
            stockTransactionToVirtualStock.Qty = paid < 0 ? (this.quantityToAdd - (-paid)) : this.quantityToAdd;
            stockTransactionToVirtualStock.Reason = this.reason;
            this.stockTransactionsList.push(stockTransactionToVirtualStock);
            let stockTransactionToStock = new StockTransaction();
            stockTransactionToStock.ItemMultiMRPId = this.ItemMultiMRPId;
            stockTransactionToStock.WarehouseId = this.WarehouseId;
            stockTransactionToStock.SourceStockType = "VirtualStocks";
            stockTransactionToStock.DestinationStockType = this.toQuantity["name"];
            stockTransactionToStock.Qty = this.quantityToAdd;
            stockTransactionToStock.Reason = this.reason;
            this.stockTransactionsList.push(stockTransactionToStock);
            this.isOpenPopup = false;
          }
          else {
            this.invalidAmount = true;
          }
        }
        else { // if to stock is virtual stock
          if (Number(this.quantityToAdd) <= this.fromQuantity['quantity'] && Number(this.quantityToAdd) > 0) {
            // this.virtualStock.quantity += Number(this.quantityToAdd);
            this.fromQuantity['quantity'] -= Number(this.quantityToAdd);
            this.toQuantity['quantity'] += Number(this.quantityToAdd);
            
            let stockTransaction = new StockTransaction();
            stockTransaction.ItemMultiMRPId = this.ItemMultiMRPId;
            stockTransaction.WarehouseId = this.WarehouseId;
            stockTransaction.SourceStockType = this.fromQuantity["name"];
            stockTransaction.DestinationStockType = this.toQuantity["name"];
            stockTransaction.Qty = this.quantityToAdd;
            stockTransaction.Reason = this.reason;
            this.stockTransactionsList.push(stockTransaction);

            this.isOpenPopup = false;
            this.invalidAmount = false;
            this.invalidreason = false;

          }
          else {
            this.invalidAmount = true;
          }
        }
      }
      else { // if from stock is Virtual Stock
        if (Number(this.quantityToAdd) > 0) {
          this.fromQuantity['quantity'] -= Number(this.quantityToAdd);
          this.toQuantity['quantity'] += Number(this.quantityToAdd);

          let stockTransaction = new StockTransaction();
          stockTransaction.ItemMultiMRPId = this.ItemMultiMRPId;
          stockTransaction.WarehouseId = this.WarehouseId;

          stockTransaction.SourceStockType = this.fromQuantity["name"];
          stockTransaction.DestinationStockType = this.toQuantity["name"];
          stockTransaction.Reason = this.reason;
          // stockTransaction.Qty = -this.quantityToAdd;
          stockTransaction.Qty = this.quantityToAdd;
          stockTransaction.Reason = this.reason;
          this.stockTransactionsList.push(stockTransaction);

          this.isOpenPopup = false;
          this.invalidAmount = false;
          this.invalidreason = false;
          this.quantityToAdd = 0;
        }
        else {
          this.invalidAmount = true;
        }
      }
    } else {
      this.invalidreason = true;

    }
  }

  saveTransaction() {
    this.isLoading = true;
    if (this.stockTransactionsList && this.stockTransactionsList.length > 0) {
      this.stockTransactionsList.forEach(x => {
        x.StockTransferType = 'ManualInventory'
      });
    }
    this.virtualStockService.saveTransaction(this.stockTransactionsList).subscribe(result => {
      this.isLoading = false;
      this.messageService.add({ severity: 'success', summary: result, detail: '' });
      this.stockTransactionsList = [];
      this.getSelectedStocksList(this.itemValue.WarehouseId, this.itemValue.ItemMultiMRPId);
    });
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

  navToVirtualStockDetailsList() {
    this.router.navigate(["virtualStockDetailList"], { relativeTo: this.r.parent });
  }

  onDragEnd(e) {
    this.el.nativeElement = e.nativeEvent.toElement;
    this.renderer.removeClass(this.el.nativeElement, 'drag-over-border');
  }

  getOptions(event) {
    alert(1);
    console.log('event: ', event);
  }

  refresh() {

  }
  resetManageStock() {
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

import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';
import { MessageService } from 'primeng/api';
import { StockTransaction } from 'app/VirtualStockManagement/Interfaces/stockTransaction';
import { Router } from '@angular/router';
import { StockHistoryPageFilter } from 'app/VirtualStockManagement/Interfaces/stock-history-page-filter';
import { StockHistoryService } from 'app/VirtualStockManagement/Services/stock-history.service';
// import { element } from 'protractor';
import { StockHelper } from 'app/VirtualStockManagement/Interfaces/stock-helper';

@Component({
  selector: 'app-manage-virtual-stock',
  templateUrl: './manage-virtual-stock.component.html',
  styleUrls: ['./manage-virtual-stock.component.scss']
})
export class ManageVirtualStockComponent implements OnInit {
  isLoading: boolean;
  stockList: any[];
  virtualStock: any;
  stockEditDc: StockEditDc;
  stockTransactionsList: StockTransaction[];
  //contains 
  selectedItemAndWarehouse: selectedItem;
  manageVirtualStock: boolean = true;
  showHistory: boolean;
  stockHistoryPageFilter: StockHistoryPageFilter;

  //batchcode
  bachCodeList: any = [];
  batchCodeTotalRecord: number = 0;
  selectedBactchCode: any = [];
  isBatchCodeInputEnable: boolean = false;
  isPhysicalToAnyStockTransfer: boolean = false; // or physical to physical or green to green
  isAnyToPhysicalStockTransfer: boolean = false; // // red to green
  isNonPhysicalToNonPhysicalStrockTransfer: boolean = false; // red to red tranfer only 
  barcodeKeyword: any;
  batchcodeList: any;
  isAnyToPhysicalStockTransferQty: number;
  nonPhysicaltoPhysicalBatchCodeList: any = [];


  constructor(private virtualStockService: VirtualStockService
    , private stockHistoryService: StockHistoryService
    , private el: ElementRef
    , private renderer: Renderer2
    , private messageService: MessageService
    , private router: Router) {

  }

  ngOnInit() {
    // this.resetAll();
  }

  refreshPage() {
    window.location.reload();

  }

  resetAll() {
    this.selectedItemAndWarehouse = null;
    this.nonPhysicaltoPhysicalBatchCodeList = [];
    this.stockTransactionsList = [];
    this.resetManageStock();
    this.stockList = null;
    this.showHistory = false;
    this.selectedBactchCode = [];
    if (this.bachCodeList && this.bachCodeList.length > 0) {
      this.bachCodeList.forEach(element => {
        element.transferQuantity = 0;
        element.selected = true;
      });
    }
    this.barcodeKeyword = '';
    this.isAnyToPhysicalStockTransferQty = 0;
  }

  getStocksList(event?) {
    console.log('this.selectedItemAndWarehouse', this.selectedItemAndWarehouse);
    this.stockHistoryService.getItemClassificationsAsync([this.selectedItemAndWarehouse]).subscribe(x => {
      if (x && x.length > 0) {
        this.selectedItemAndWarehouse.Category = x[0].Category;
      } else {
        this.selectedItemAndWarehouse.Category = 'D';
      }
      console.log('this.selectedItemAndWarehouse result:', x);
    });
    this.getSelectedStocksList(this.selectedItemAndWarehouse.WarehouseId, this.selectedItemAndWarehouse.ItemMultiMRPId);
  }

  getSelectedStocksList(WarehouseId, ItemMultiMRPId) {
    this.isLoading = true;
    this.virtualStockService.GetAllStocks(WarehouseId, ItemMultiMRPId).subscribe(result => {
      this.stockList = result;
      console.log("GetAllStocks,this.stockList ", this.stockList);

      // if (this.stockList && this.stockList.length > 0) {
      //   this.stockList.forEach(element => {
      //     if (element.StockType == "CurrentStocks" || element.StockType == "DamageStocks" || element.StockType == "FreeStocks") {
      //       element.stockTangibility = "Physical";
      //     } else {
      //       element.stockTangibility = "Non-Physical";
      //     }
      //   });
      // }

      console.log('abcd:', this.stockList);
      this.resetManageStock();
      this.stockTransactionsList = [];
      this.setVirtualStock();
      this.isLoading = false;
    });
  }

  setVirtualStock() {
    this.virtualStock = this.stockList.filter(x => { return x.StockType == 'VirtualStocks' })[0];
    console.log('this.virtualStock: ', this.virtualStock);
  }

  saveTransaction() {
    if (!this.stockTransactionsList || this.stockTransactionsList.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'nothing to save', detail: '' });
      return;
    }
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
      this.getSelectedStocksList(this.selectedItemAndWarehouse.WarehouseId, this.selectedItemAndWarehouse.ItemMultiMRPId);
    });
  }

  resetManageStock() {
    this.nonPhysicaltoPhysicalBatchCodeList = [];
    this.barcodeKeyword = '';
    this.isAnyToPhysicalStockTransferQty = 0;
    this.stockEditDc = {
      fromStock: null,
      toStock: null,
      qtyToTransfer: 0,
      isPopupOpened: false,
      reason: null,
      invalidQuantity: false,
      invalidReason: false
    };
    this.selectedBactchCode = [];
    if (this.bachCodeList && this.bachCodeList.length > 0) {
      this.bachCodeList.forEach(element => {
        element.transferQuantity = 0;
        element.selected = true;
      });
    }

    console.log("this.selectedBactchCode", this.selectedBactchCode);

  }

  onDrop(event, toStock) {
    this.stockEditDc.reason = '';
    this.barcodeKeyword = '';
    this.isAnyToPhysicalStockTransferQty = 0;
    this.nonPhysicaltoPhysicalBatchCodeList = [];
    this.selectedBactchCode = [];
    // console.log(`event is: `, event);
    // console.log(`toStock is: `, toStock);
    const fromStock = event.dragData;

    this.el.nativeElement = event.nativeEvent.toElement;
    this.renderer.removeClass(this.el.nativeElement, 'drag-over-border');
    this.renderer.removeClass(this.el.nativeElement.parentElement, 'drag-over-border');
    this.renderer.removeClass(this.el.nativeElement.parentElement.parentElement, 'drag-over-border');
    this.renderer.removeClass(this.el.nativeElement.parentElement.parentElement.parentElement, 'drag-over-border');
    this.renderer.removeClass(this.el.nativeElement.parentElement.parentElement.parentElement.parentElement, 'drag-over-border');


    if (!fromStock || !fromStock.IsDraggable) {
      this.messageService.add({ severity: 'error', summary: 'Not allowed', detail: '' });
      return;
    }
    if (!toStock.IsDroppable) {
      this.messageService.add({ severity: 'error', summary: 'Not allowed', detail: '' });
      return;
    }
    if (fromStock.StockType == toStock.StockType) {
      this.messageService.add({ severity: 'error', summary: 'Not allowed', detail: '' });
      return;
    }

    this.stockEditDc.fromStock = fromStock;
    this.stockEditDc.toStock = toStock;
    this.stockEditDc.qtyToTransfer = 0;
    this.stockEditDc.isPopupOpened = true;

    // console.log(this.stockEditDc.fromStock);


    this.isPhysicalToAnyStockTransfer = false; // or physical to physical
    this.isAnyToPhysicalStockTransfer = false; // 
    this.isNonPhysicalToNonPhysicalStrockTransfer = false; // red to red tranfer only 


    // debugger;
    if (this.stockEditDc.fromStock.StockType == "CurrentStocks" ||
      this.stockEditDc.fromStock.StockType == "DamageStocks" ||
      this.stockEditDc.fromStock.StockType == "FreeStocks" ||
      this.stockEditDc.fromStock.StockType == "NonSellableStocks" ||
      this.stockEditDc.fromStock.StockType == "ClearanceStockNews" ||
      this.stockEditDc.fromStock.StockType == "InventoryReserveStocks" ||
      this.stockEditDc.fromStock.StockType == "NonRevenueStocks"
    ) {

      let stockType: string = '';

      switch (this.stockEditDc.fromStock.StockType) {
        case "CurrentStocks":
          stockType = "C";
          break;
        case "DamageStocks":
          stockType = "D";
          break;
        case "FreeStocks":
          stockType = "F";
          break;
        case "NonSellableStocks":
          stockType = "N";
          break;
        case "ClearanceStockNews":
          stockType = "CL";
          break;
        case "InventoryReserveStocks":
          stockType = "IR";
          break;
          case "NonRevenueStocks":
            stockType = "NR";
            break;
      }

      // debugger;
      console.log(stockType);

      this.isPhysicalToAnyStockTransfer = true;

      this.GetStockBatchMastersDataNew(this.selectedItemAndWarehouse.ItemMultiMRPId, this.selectedItemAndWarehouse.WarehouseId, stockType);


    } else {
      if ((this.stockEditDc.fromStock.StockType == "VirtualStocks" || this.stockEditDc.fromStock.StockType == "ITIssueStocks" || this.stockEditDc.fromStock.StockType == "LostAndFoundStocks") &&
        (this.stockEditDc.toStock.StockType == "VirtualStocks" || this.stockEditDc.toStock.StockType == "ITIssueStocks" || this.stockEditDc.toStock.StockType == "LostAndFoundStocks")) {
        // alert("red to red")
        this.isNonPhysicalToNonPhysicalStrockTransfer = true;

      } else {
        // alert("red to green")
        this.isAnyToPhysicalStockTransfer = true; // red to green
      }
    }





  }


  // call in ondrop after bachCodeList returned from the server
  onDropUpdateQuantity() {
    // debugger
    // console.log('this.bachCodeList: ', this.bachCodeList);
    // console.log('this.stockTransactionsList: ', this.stockTransactionsList);
    if (this.bachCodeList && this.bachCodeList.length > 0 && this.stockTransactionsList && this.stockTransactionsList.length > 0) {
      this.bachCodeList.forEach(batch => {
        let tempBatchList = this.stockTransactionsList.filter(x => {
          return this.stockEditDc.fromStock.StockType == x.SourceStockType
            && batch.BatchCode == x.BatchCode
            && batch.MFGDate == x.MfgDate
            && batch.ExpiryDate == x.ExpDate
        });

        if (tempBatchList && tempBatchList.length > 0) {

          tempBatchList.forEach(x => {
            batch.Qty -= x.Qty;
          })

          // batch.Qty = tempBatchList.reduce((previousValue, currentValue) => previousValue.Qty - currentValue.Qty,
          //   batch.Qty);


        }

      });
    }
  }

  calculateVirtualStock() {

    // debugger;
    this.stockEditDc.invalidReason = false;
    this.stockEditDc.invalidQuantity = false;

    if (this.stockEditDc.qtyToTransfer < 1) {
      this.messageService.add({ severity: 'error', summary: 'negetive quantity cant be move', detail: '' });
      return;
    }

    if (!this.stockEditDc.reason) {
      this.stockEditDc.invalidReason = true;
      return;
    }
    if (this.stockEditDc.qtyToTransfer > this.stockEditDc.fromStock.Qty
      && !this.stockEditDc.fromStock.CanBeNegetive) {
      this.stockEditDc.invalidQuantity = true;
      return;
    }
    // debugger;
    if (this.stockEditDc.fromStock != this.virtualStock && this.stockEditDc.toStock != this.virtualStock) {
      let fromStockTransaction = new StockTransaction();
      fromStockTransaction.ItemMultiMRPId = this.selectedItemAndWarehouse.ItemMultiMRPId;
      fromStockTransaction.WarehouseId = this.selectedItemAndWarehouse.WarehouseId;
      fromStockTransaction.SourceStockType = this.stockEditDc.fromStock.StockType;
      fromStockTransaction.DestinationStockType = this.virtualStock.StockType;
      fromStockTransaction.Qty =
        (!this.stockEditDc.fromStock.CanBeNegetive
          && this.stockEditDc.fromStock.Qty < this.stockEditDc.qtyToTransfer) ? this.stockEditDc.fromStock.Qty : this.stockEditDc.qtyToTransfer;
      fromStockTransaction.Reason = this.stockEditDc.reason;
      this.stockTransactionsList.push(fromStockTransaction);

      let toTransactionToStock = new StockTransaction();
      toTransactionToStock.ItemMultiMRPId = this.selectedItemAndWarehouse.ItemMultiMRPId;
      toTransactionToStock.WarehouseId = this.selectedItemAndWarehouse.WarehouseId;
      toTransactionToStock.SourceStockType = this.virtualStock.StockType;
      toTransactionToStock.DestinationStockType = this.stockEditDc.toStock.StockType;
      toTransactionToStock.Qty = this.stockEditDc.qtyToTransfer;
      toTransactionToStock.Reason = this.stockEditDc.reason;
      this.stockTransactionsList.push(toTransactionToStock);

      this.stockEditDc.fromStock.Qty -= fromStockTransaction.Qty;
      this.virtualStock.Qty -= (this.stockEditDc.qtyToTransfer - fromStockTransaction.Qty);
      this.stockEditDc.toStock.Qty += this.stockEditDc.qtyToTransfer;
    } else {
      let toTransactionToStock = new StockTransaction();
      toTransactionToStock.ItemMultiMRPId = this.selectedItemAndWarehouse.ItemMultiMRPId;
      toTransactionToStock.WarehouseId = this.selectedItemAndWarehouse.WarehouseId;
      toTransactionToStock.SourceStockType = this.stockEditDc.fromStock.StockType;
      toTransactionToStock.DestinationStockType = this.stockEditDc.toStock.StockType;
      toTransactionToStock.Qty = this.stockEditDc.qtyToTransfer;
      toTransactionToStock.Reason = this.stockEditDc.reason;
      this.stockTransactionsList.push(toTransactionToStock);

      toTransactionToStock.sStockBatchMasterID = null;
      toTransactionToStock.sBatchMasterID = null;
      toTransactionToStock.dStockBatchMasterID = null;
      toTransactionToStock.dBatchMasterID = null;


      this.stockEditDc.fromStock.Qty -= this.stockEditDc.qtyToTransfer;
      this.stockEditDc.toStock.Qty += this.stockEditDc.qtyToTransfer;
    }
    console.log(this.stockTransactionsList);

    this.resetManageStock();
  }

  getWidth() {
    const width = 100 / this.stockList.length;
    const minwidth = 100 / 6;

    return (width < minwidth ? minwidth : width) + "%";
  }

  navToVirtualStockDetailsList() {
    this.router.navigateByUrl("layout/virtualstock/stock-history");
  }

  openHistoryPopup(stock: any) {

   

    if(stock.DisplayName != "Clearance Planned"){
      this.stockHistoryPageFilter = {
        ItemMultiMRPId: this.selectedItemAndWarehouse.ItemMultiMRPId,
        WarehouseId: this.selectedItemAndWarehouse.WarehouseId,
        RefStockType: null,
        Skip: 0,
        StockType: stock.StockType,
        Take: 50,
        UserId: null
      }
      this.showHistory = true;
    }
  }











  //Batch Code

  GetStockBatchMastersDataNew(ItemMultiMRPId, WarehouseId, stockType) {
 
    this.virtualStockService.GetStockBatchMastersDataNew(ItemMultiMRPId, WarehouseId, stockType).subscribe(x => {
    
      console.log('GetStockBatchMastersDataNew', x);
      if (x.length > 0) {
        this.bachCodeList = x;
        this.bachCodeList.map(
          element => {
            element.transferQuantity = 0;
            element.selected = true;
          }
        );
        // console.log("this.bachCodeList", this.bachCodeList);
        this.batchCodeTotalRecord = x.length;
        this.onDropUpdateQuantity();
      } else {
        this.bachCodeList = [];
      }
    });
  }

  GetBatchMasterList(e) {
    this.virtualStockService.GetBatchMasterList(this.selectedItemAndWarehouse.ItemMultiMRPId, this.selectedItemAndWarehouse.WarehouseId, e.query).subscribe(x => {
      console.log('GetBatchMasterList', x);
      if (x && x.length > 0) {
        this.batchcodeList = x;
      } else {
        this.bachCodeList = [];
      }
    });
  }


  onSelectBatchCode(e) {
    console.log(e);
    this.bachCodeList = e;
  }



  transferWithBatchCode(typeOfTransfer) {

    console.log(this.selectedBactchCode, this.stockEditDc);

    if (!this.stockEditDc.reason) {
      this.stockEditDc.invalidReason = true;
      return;
    }

    // debugger;

    if (typeOfTransfer == "isPhysicalToAnyStockTransfer") {
      let checkflag = 0;
      if (this.selectedBactchCode && this.selectedBactchCode.length > 0) {
        this.selectedBactchCode.forEach(element => {
          console.log(element);
          if (element.transferQuantity > 0 && element.transferQuantity <= element.Qty) {
            // checkflag = checkflag + 0;
          } else {
            checkflag = checkflag + 1;
          }
        });
      }

      if (checkflag > 0) {
        alert("Enter Valid Quantity");
        return;
      }
    }

    if (typeOfTransfer == "isAnyToPhysicalStockTransfer") {
      if (this.selectedBactchCode.length == 0) {
        alert("Elements should be present in the list");
        return;
      }
    }
    // debugger
    if (this.selectedBactchCode.length > 0) {
      this.selectedBactchCode.forEach(element => {
        if (this.stockEditDc.fromStock != this.virtualStock && this.stockEditDc.toStock != this.virtualStock) {
          let fromStockTransaction = new StockTransaction();
          fromStockTransaction.ItemMultiMRPId = this.selectedItemAndWarehouse.ItemMultiMRPId;
          fromStockTransaction.WarehouseId = this.selectedItemAndWarehouse.WarehouseId;
          fromStockTransaction.SourceStockType = this.stockEditDc.fromStock.StockType;
          fromStockTransaction.DestinationStockType = this.virtualStock.StockType;
          //new items
          fromStockTransaction.BatchCode = element.BatchCode;
          fromStockTransaction.MfgDate = element.MFGDate;
          fromStockTransaction.ExpDate = element.ExpiryDate;
          fromStockTransaction.fromBatchCodeQty = element.Qty;
          fromStockTransaction.StockBatchMasterId = element.StockBatchMasterId;
          fromStockTransaction.BatchMasterId = element.BatchMasterId;

          // fromStockTransaction.sStockBatchMasterID = element.StockBatchMasterId;
          // fromStockTransaction.sBatchMasterID = null;
          // fromStockTransaction.dStockBatchMasterID = null;
          // fromStockTransaction.dBatchMasterID = null;

          // fromStockTransaction.Qty =
          //   (!this.stockEditDc.fromStock.CanBeNegetive
          //     && this.stockEditDc.fromStock.Qty < this.stockEditDc.qtyToTransfer) ? this.stockEditDc.fromStock.Qty : this.stockEditDc.qtyToTransfer;


          fromStockTransaction.Qty = (!this.stockEditDc.fromStock.CanBeNegetive
            && this.stockEditDc.fromStock.Qty < element.transferQuantity) ? this.stockEditDc.fromStock.Qty : element.transferQuantity;



          fromStockTransaction.Reason = this.stockEditDc.reason;
          this.stockTransactionsList.push(fromStockTransaction);

          let toTransactionToStock = new StockTransaction();
          toTransactionToStock.ItemMultiMRPId = this.selectedItemAndWarehouse.ItemMultiMRPId;
          toTransactionToStock.WarehouseId = this.selectedItemAndWarehouse.WarehouseId;
          toTransactionToStock.SourceStockType = this.virtualStock.StockType;
          toTransactionToStock.DestinationStockType = this.stockEditDc.toStock.StockType;
          // toTransactionToStock.Qty = this.stockEditDc.qtyToTransfer;
          toTransactionToStock.Qty = element.transferQuantity;

          toTransactionToStock.Reason = this.stockEditDc.reason;
          //new items
          toTransactionToStock.BatchCode = element.BatchCode;
          toTransactionToStock.MfgDate = element.MFGDate;
          toTransactionToStock.ExpDate = element.ExpiryDate;

          this.stockTransactionsList.push(toTransactionToStock);

          this.stockEditDc.fromStock.Qty -= fromStockTransaction.Qty;
          toTransactionToStock.StockBatchMasterId = element.StockBatchMasterId;
          toTransactionToStock.BatchMasterId = element.BatchMasterId;

          // toTransactionToStock.sStockBatchMasterID = null;
          // toTransactionToStock.sBatchMasterID = null;
          // toTransactionToStock.dStockBatchMasterID = null;
          // toTransactionToStock.dBatchMasterID = element.BatchMasterId;

          // this.virtualStock.Qty -= (this.stockEditDc.qtyToTransfer - fromStockTransaction.Qty);
          // this.stockEditDc.toStock.Qty += this.stockEditDc.qtyToTransfer;

          this.virtualStock.Qty -= (element.transferQuantity - fromStockTransaction.Qty);
          this.stockEditDc.toStock.Qty += element.transferQuantity;


        } else {
          let toTransactionToStock = new StockTransaction();
          toTransactionToStock.ItemMultiMRPId = this.selectedItemAndWarehouse.ItemMultiMRPId;
          toTransactionToStock.WarehouseId = this.selectedItemAndWarehouse.WarehouseId;
          toTransactionToStock.SourceStockType = this.stockEditDc.fromStock.StockType;
          toTransactionToStock.DestinationStockType = this.stockEditDc.toStock.StockType;
          //new items
          toTransactionToStock.BatchCode = element.BatchCode;
          toTransactionToStock.MfgDate = element.MFGDate;
          toTransactionToStock.ExpDate = element.ExpiryDate;

          // toTransactionToStock.Qty = this.stockEditDc.qtyToTransfer;
          toTransactionToStock.Qty = element.transferQuantity;
          toTransactionToStock.Reason = this.stockEditDc.reason;

          toTransactionToStock.StockBatchMasterId = element.StockBatchMasterId;
          toTransactionToStock.BatchMasterId = element.BatchMasterId;

          // toTransactionToStock.sStockBatchMasterID = null;
          // toTransactionToStock.sBatchMasterID = null;
          // toTransactionToStock.dStockBatchMasterID = null;
          // toTransactionToStock.dBatchMasterID = null;

          this.stockTransactionsList.push(toTransactionToStock);

          // this.stockEditDc.fromStock.Qty -= this.stockEditDc.qtyToTransfer;
          // this.stockEditDc.toStock.Qty += this.stockEditDc.qtyToTransfer;

          this.stockEditDc.fromStock.Qty -= element.transferQuantity;
          this.stockEditDc.toStock.Qty += element.transferQuantity;
        }
      });
    } else {
      // alert("please select list with batch Code";)

      // this.messageService.add({ severity: 'error', summary: 'Please proceed with the list', detail: '' });
    }




    this.updateStockTransactionList();
    this.resetManageStock();
    console.log(this.stockTransactionsList);

  }


  updateStockTransactionList() {
    if (this.stockTransactionsList && this.stockTransactionsList.length > 0) {
      this.stockTransactionsList.forEach(elem => {
        elem.sBatchMasterID = null;
        elem.sStockBatchMasterID = null;
        elem.dBatchMasterID = null;
        elem.dStockBatchMasterID = null;

        if (StockHelper.IsPhysicalStock(elem.SourceStockType)) {
          elem.sStockBatchMasterID = elem.StockBatchMasterId;
        } else if (StockHelper.IsPhysicalStock(elem.DestinationStockType)) {
          elem.dBatchMasterID = elem.BatchMasterId;
        }

      });
    }
  }

  addRow() {
    // console.log(this.stockEditDc.toStock);

    console.log(typeof (this.barcodeKeyword));
    if (this.isAnyToPhysicalStockTransferQty && this.isAnyToPhysicalStockTransferQty > 0 && typeof (this.barcodeKeyword) == "object") {
      this.stockEditDc.invalidQuantity = false;
      let obj = {

        BatchCode: this.barcodeKeyword.BatchCode,
        CreatedDate: null,
        ExpiryDate: this.barcodeKeyword.ExpiryDate,
        MFGDate: this.barcodeKeyword.MFGDate,
        Qty: this.stockEditDc.fromStock.Qty,
        StockBatchMasterId: null,
        BatchMasterId: this.barcodeKeyword.Id,
        selected: false,
        transferQuantity: this.isAnyToPhysicalStockTransferQty

      }

      this.nonPhysicaltoPhysicalBatchCodeList.push(obj);
      this.barcodeKeyword = '';
      this.isAnyToPhysicalStockTransferQty = 0;
      // console.log(this.barcodeKeyword, this.isAnyToPhysicalStockTransferQty, obj, this.stockEditDc);
      console.log(this.nonPhysicaltoPhysicalBatchCodeList);
      this.selectedBactchCode = this.nonPhysicaltoPhysicalBatchCodeList;
    } else {
      // this.stockEditDc.invalidQuantity = true;
      alert("Please select batch code then enter quantity to continue")
    }
  }


  clearList() {
    this.selectedBactchCode = [];
    this.nonPhysicaltoPhysicalBatchCodeList = [];
    this.barcodeKeyword = '';
    this.isAnyToPhysicalStockTransferQty = 0;
  }




  enableTransferQtyWBatchCodeInput() {
    this.isBatchCodeInputEnable = !this.isBatchCodeInputEnable;
  }

  enableImputs(rowData, e) {
    console.log(rowData, e);
    rowData.selected = !rowData.selected;
    if (rowData.selected) {
      rowData.transferQuantity = 0;
    }
  }


}

interface selectedItem {
  ItemMultiMRPId: number,
  WarehouseId: number,
  warehouseName: string,
  Category?: string;
  // ItemNumber?: string;
}

interface StockEditDc {
  qtyToTransfer: number,
  fromStock: any,
  toStock: any,
  isPopupOpened: boolean,
  reason: string,
  invalidQuantity: boolean,
  invalidReason: boolean
}
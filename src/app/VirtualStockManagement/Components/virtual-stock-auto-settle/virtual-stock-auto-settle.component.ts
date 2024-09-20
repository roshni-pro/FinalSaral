import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from 'app/shared/services/config.service';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';
import { UnsettledVirtualStockDTO } from 'app/VirtualStockManagement/Interfaces/unsettled-virtual-stock-dto';
import { SettledVirtualStockDTO } from 'app/VirtualStockManagement/Interfaces/settled-virtual-stock-dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-virtual-stock-auto-settle',
  templateUrl: './virtual-stock-auto-settle.component.html',
  styleUrls: ['./virtual-stock-auto-settle.component.scss']
})
export class VirtualStockAutoSettleComponent implements OnInit {
  @ViewChild("customizer", { static: false }) customizer: ElementRef;

  @Input() warehouseId: number;
  @Input() itemMultiMRPId: number;


  size = "sidebar-md";
  isOpen = false;
  isActionPerformed: boolean;

  showSettleDialog: boolean;

  unSettledVirtualStockList: UnsettledVirtualStockDTO[];
  counterStockList: UnsettledVirtualStockDTO[];

  selectedStock: UnsettledVirtualStockDTO;

  showTransactionPopup: boolean;
  transactionStockList: UnsettledVirtualStockDTO[];
  constructor(
    private renderer: Renderer2,
    private messageService: MessageService,
    private virtualStockService: VirtualStockService
  ) {
  }

  @Output() directionEvent = new EventEmitter<Object>();

  ngOnInit() {
    this.showSettleDialog = false;
  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {

  }



  toggleCustomizer() {
    if (this.isOpen) {
      this.renderer.removeClass(this.customizer.nativeElement, "open");
      this.isOpen = false;
    } else {
      this.unSettledVirtualStockList = [];
      this.renderer.addClass(this.customizer.nativeElement, "open");
      this.getAllUnsettledVirtualStock();
      this.isOpen = true;
    }
  }

  closeCustomizer() {
    this.renderer.removeClass(this.customizer.nativeElement, "open");
    this.isOpen = false;
  }

  getAllUnsettledVirtualStock() {
    // debugger
    this.virtualStockService.getUnsettledVirtualStocks(this.warehouseId, this.itemMultiMRPId).subscribe(x => {
      this.unSettledVirtualStockList = x;
      this.updateAllUnSettledVirtualStock( this.unSettledVirtualStockList);
      console.log('x is: ', x);
    });
  }

  settleStock(stock: UnsettledVirtualStockDTO) {
    console.log('UnsettledVirtualStockDTO: ', stock);
    console.log('unSettledVirtualStockList: ', this.unSettledVirtualStockList);
    
    this.counterStockList = this.unSettledVirtualStockList.filter(x => {
      return x.GroupId !== stock.GroupId
        && ((stock.RemainingQty < 0 && x.RemainingQty > 0) || (stock.RemainingQty > 0 && x.RemainingQty < 0))
    });


    if (this.counterStockList && this.counterStockList.length > 0) {
      this.counterStockList.forEach(x => {
        x.IsChecked = false;
      })
    }

    console.log('this.counterStockList: ', this.counterStockList);
    
    let fileredCounterStockList: any = [];
    
    if(this.counterStockList && this.counterStockList.length>0){      
      this.counterStockList.forEach((element, index) => {
        // console.log(index);
        if(Math.abs(stock.RemainingQty) == Math.abs(element.RemainingQty)){
          this.counterStockList.splice(index,1);
          this.counterStockList.unshift(element);
          // fileredCounterStockList.push(element);
        }
      });
    }
    
    // this.counterStockList = fileredCounterStockList;

    this.selectedStock = stock;
    this.showSettleDialog = true;
  }

  showStock(stock: UnsettledVirtualStockDTO){
    this.virtualStockService.getByTransactionId(stock.TransactionId).subscribe(x =>{
      this.transactionStockList = x;
      this.updateAllUnSettledVirtualStock(this.transactionStockList);
      this.showTransactionPopup = true;
    });
  }

  private updateAllUnSettledVirtualStock(list: UnsettledVirtualStockDTO[]) {
    let virtualStock = 'VirtualStock';
    if (list && list.length > 0) {
      list.forEach(x => {
        if (x.RemainingQty > 0) {
          x.FromStock = x.StockType;
          x.ToStock = virtualStock;
          x.ClientQty = x.RemainingQty;
        } else {
          x.ToStock = x.StockType;
          x.FromStock = virtualStock;
          x.ClientQty = x.RemainingQty * (-1);
        }
      })
    }
  }

  private checkIfAvailableStock(checkedStock: UnsettledVirtualStockDTO) {
    
    let totalAvailableCount = this.selectedStock.ClientQty;
    let checkedCount = this.counterStockList
      .filter(x => { return x.IsChecked == true })
      .reduce((sum, current) => sum + current.ClientQty, 0);
    // console.log(totalAvailableCount, checkedCount, checkedStock.ClientQty);
    // if(totalAvailableCount == checkedStock.ClientQty){
      if (totalAvailableCount >= checkedCount + checkedStock.ClientQty) {
          checkedStock.IsChecked = true;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Quantity exceeds!!', detail: '' });
      }
    // }
    // else{
    //   this.messageService.add({ severity: 'error', summary: 'Only same number of stock can be adjusted', detail: '' });
    // }
  }


  checkUncheckStock(stock: UnsettledVirtualStockDTO) {
    if (stock.IsChecked) {
      stock.IsChecked = false;
    } else {
      this.checkIfAvailableStock(stock);
    }
  }

  saveSettledStock() {
    this.isActionPerformed = true;
    let vs: SettledVirtualStockDTO = {
      MatchToTransactionId: this.selectedStock.TransactionId,
      TransactionIdList: []
    }

    vs.TransactionIdList = this.counterStockList.filter(x => { return x.IsChecked == true }).map(x => x.VirtualStockIds);
    if (vs.TransactionIdList && vs.TransactionIdList.length > 0) {
      this.virtualStockService.settledVirtualStock(vs).subscribe(x => {
        if (x) {
          this.messageService.add({ severity: 'success', summary: 'Stock settled !!', detail: '' });
          this.getAllUnsettledVirtualStock();
          this.showSettleDialog = false;
          this.isActionPerformed =false; 
        } else {
          this.messageService.add({ severity: 'error', summary: 'Quantity exceeds!!', detail: '' });
          this.isActionPerformed =false;
        }

      });
    }
  }
}

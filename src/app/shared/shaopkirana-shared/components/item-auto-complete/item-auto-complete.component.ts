import { VirtualStockService } from './../../../../VirtualStockManagement/Services/virtual-stock.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ItemMasterService } from 'app/shared/services/item-master.service';
import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { ItemService } from 'app/shared/services/item.service';

@Component({
  selector: 'app-item-auto-complete',
  templateUrl: './item-auto-complete.component.html',
  styleUrls: ['./item-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemAutoCompleteComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: (c: FormControl) => {
        let err = {
          rangeError: {
            given: c.value,
            max: 10,
            min: 0
          }
        };

        return (c.value > 10 || c.value < 0) ? err : null;
      },
      multi: true
    }
  ]
})

export class ItemAutoCompleteComponent implements OnInit {

  @Input()
  itemValue: any;
  @Input()
  warehouseName: string;
  @Input() WarehouseId : any;
  @Input() ItemMultiMRPId : any;
  @Output() outputItem = new EventEmitter<string>();
  @Output() reset = new EventEmitter<string>();
  @Output() setInitialTrue = new EventEmitter<string>();
  @Output() onWarehouseChange = new EventEmitter<number>();
  @Input() isStockComponent: boolean;
  itemList: any[];
  selectedItem: any;
  warehouseList: any[];
  warehouseID: number = null;
  isSelected: boolean;
  isLoading: boolean;
  invalidItem: boolean;
  stocksettle : boolean;
  @Input() ItemName : any;
  constructor(private itemService: ItemService,
    private warehouseService: WarehouseService, private virtualstockservice: VirtualStockService) {
    this.isSelected = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.warehouseID = null;
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        // debugger;
        this.isLoading = false;
        this.warehouseList = result;
        this.warehouseList.sort((a,b) => (a.WarehouseName > b.WarehouseName) ? 1 : ((b.WarehouseName > a.WarehouseName) ? -1 : 0))
        if (this.warehouseName) {
          this.warehouseID = this.warehouseList.filter(x => {
            return x && x.code.toLowerCase() == this.warehouseName.toLowerCase();
          })[0].ID;
        }
        console.log('result: ', this.warehouseList);
      });
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  writeValue(value) {
    if (value !== undefined) {
      this.itemValue = value;
    }
  }

  registerOnTouched() { }


  getitemList(event) {
    // debugger;
    if (event.query.length > 2 && this.warehouseID) {
      this.isLoading = true;
      this.virtualstockservice.searchWarehouseItems(event.query, this.warehouseID).subscribe(result => {
        this.isLoading = false;
        this.itemList = result;
      })
    }
  }

  onSelectItem(event) {
    this.itemValue = event;
// debugger;
    const warehouse = this.warehouseList.filter(x => { return x.WarehouseId == this.warehouseID})[0];
    this.itemValue.warehouseName = warehouse.WarehouseName;

    this.propagateChange(this.itemValue);
    this.isSelected = true;
    this.outputItem.emit('getStockList');
  }

  cancel() {

    if(this.isStockComponent){
      this.selectedItem = null;
      this.propagateChange(this.itemValue);
      this.isSelected = false;
      this.reset.emit('resetStocks');
    } else {
      this.selectedItem = null;
      this.itemValue = null;
      this.propagateChange(this.itemValue);
      this.isSelected = false;
      this.reset.emit('resetStocks');
    }

   
  }


  onLedgerTypeChange() {
    this.selectedItem = null;
    this.itemValue = null;
    this.propagateChange(this.itemValue);
    this.isSelected = false;
    this.setInitialTrue.emit('setInitialTrue');
  }

  checkValid(event) {
    if (this.warehouseID == null) {
      this.invalidItem = true;
    }
    else {
      this.invalidItem = false;
    }
  }

}

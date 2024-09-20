import { VirtualStockService } from './../../../../VirtualStockManagement/Services/virtual-stock.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ItemMasterService } from 'app/shared/services/item-master.service';
import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { ItemService } from 'app/shared/services/item.service';

@Component({
  selector: 'app-selected-item-list',
  templateUrl: './selected-item-list.component.html',
  styleUrls: ['./selected-item-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectedItemListComponent),
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

export class SelectedItemListComponent implements OnInit {

  @Input()
  itemValue: any;
  @Input()
  warehouseName: string;
  @Input() WarehouseId : any;
  @Input() ItemMultiMRPId : any;
  @Output() outputItem = new EventEmitter<string>();
  @Output() setInitialTrue = new EventEmitter<string>();
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
    
    this.stocksettle = false;
    this.ItemMultiMRPId;
    this.WarehouseId;
    this.ItemName;
    if(this.ItemMultiMRPId != 0 && this.WarehouseId != 0)
    {
      this.stocksettle = true;
      // this.virtualstockservice.WHSelectedinitematAdmin(this.WarehouseId).subscribe(result => {
      //   
      //   this.itemList = result;
     
      for(var i in this.itemList)
      {
        if(this.itemList[i].ItemMultiMRPId == this.ItemMultiMRPId && this.itemList[i].ItemName == this.ItemName)
        {
          console.log('ItemMultiMRPIdItemMultiMRPId:',this.itemList[i]);
          this.selectedItem = this.itemList[i].ItemName
        }
      }
    // })
    }
    this.isLoading = true;
    this.warehouseID = null;
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.isLoading = false;
        this.warehouseList = result;
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
    this.propagateChange(this.itemValue);
    this.isSelected = true;
    this.outputItem.emit('getStockList');
  }

  cancel() {
    this.selectedItem = null;
    this.itemValue = null;
    this.propagateChange(this.itemValue);
    this.isSelected = false;
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


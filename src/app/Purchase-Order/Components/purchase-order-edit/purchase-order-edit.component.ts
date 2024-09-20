import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PurchaseOrderService } from 'app/shared/services/purchase-order.service';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-purchase-order-edit',
  templateUrl: './purchase-order-edit.component.html',
  styleUrls: ['./purchase-order-edit.component.scss']
})
export class PurchaseOrderEditComponent implements OnInit {

  poObject: any;
  poObjectListforView: any[];

  poItemsList: any[];
  itemList: any[];
  itemSearchName: any;
  isSearch: boolean;
  PurchaseOrderId: any;
  selectedItemObject: any;

  constructor(public purchaseOrderService: PurchaseOrderService) {
    this.itemSearchName = {};
    this.selectedItemObject = {};

    this.poObject = {};
  }

  ngOnInit() {
  }



  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {

      this.isSearch = true;

    }
  }



  GetPoForEdit(PurchaseOrderId) {
    

    console.log("PurchaseOrderId", PurchaseOrderId);
    this.purchaseOrderService.GetPoForEdit(PurchaseOrderId).subscribe(res => {
      this.poObjectListforView = res.PurchaseOrderMastersDTO;
      this.poObject = res.PurchaseOrderMastersDTO;
      this.poItemsList = res.PurchaseOrderDetailsDTO;
      console.log(" this.poObjectListforViewpoObjectListforViewpoObjectListforViewpoObjectListforView", this.poObjectListforView);
      console.log(" this.poItemsList", this.poItemsList);
      this.isSearch = true;

    })
  }


  onitemchange(Key) {
    this.purchaseOrderService.GetItemForEditPO(Key, this.poObject.WarehouseId).subscribe(res => {
      this.itemList = res;
      console.log(" this.itemList", this.itemList);
    })
  }

  onItemNameChange(e) {
    
    if (this.itemSearchName.length > 2) {
      this.purchaseOrderService.GetItemForEditPO(e.query, this.poObject.WarehouseId).subscribe(res => {
        this.itemList = res;
        console.log(" this.itemList", this.itemList);
      })
    }
  }

  onItemSelect(t) {
    this.selectedItemObject = t;
    console.log(":selectedItemObject", this.selectedItemObject);
    // console.log("selected" + JSON.stringify(t));
    
    var name = this.selectedItemObject.itemname;
    console.log("namenamenamenamenamenamenamenamenamenamename", name)
  }
}



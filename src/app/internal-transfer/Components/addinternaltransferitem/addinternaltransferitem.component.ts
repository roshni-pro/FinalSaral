import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MessageService } from 'primeng/api';
import { InternaltransfersService } from './../../Services/internaltransfers.service';
import { ItemService } from 'app/shared/services/item.service';
import { Component, OnInit, Input } from '@angular/core';
import { TransferOrder } from 'app/internal-transfer/classes/TransferOrder';

@Component({
  selector: 'app-addinternaltransferitem',
  templateUrl: './addinternaltransferitem.component.html',
  styleUrls: ['./addinternaltransferitem.component.scss']
})
export class AddinternaltransferitemComponent implements OnInit {

  @Input('displayct') displayct: any;
  @Input('items') items: any;
  warehousefromlist = [];
  immutablewarehousetolist = [];
  warehousetolist = [];
  displayPopup = false
  transferOrderItem: TransferOrder;
  transferOrderItemList: TransferOrder[] = [];
  searchval = '';
  searchableitems: any;
  blocked = false;
  nofromexists = false;
  cols = [
    { field: 'StockId', header: 'StockId' },
    { field: 'Itemname', header: 'Itemname' },
    { field: 'Noofpics', header: 'Noofpics' },
  ];
  invalidForm: boolean;

  editSaved = false;
  currentIndex: any;
  items2: any;

  constructor(private router: Router, private r: ActivatedRoute, private warehouseService: WarehouseService, private internaltransferservice: InternaltransfersService, private messageService: MessageService, private ItemService: ItemService, private InternaltransfersService: InternaltransfersService) {
    this.transferOrderItem = new TransferOrder();
  }

  ngOnInit() {
    this.getAllWarehouses()
  }

  getAllWarehouses() {
    this.blocked = true;

    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.blocked = false
        this.warehousefromlist = result;
        this.immutablewarehousetolist = result;
      });
  }



  globalsearch(textValue) {
    this.InternaltransfersService.getCurrentStockItems({ key: (textValue.query && textValue.query.toLowerCase() ? textValue.query.toLowerCase() : 'a'), whouseid: this.transferOrderItem.RequestFromWarehouseId })
      // this.InternaltransfersService.getCurrentStockItems({ key: textValue.query.toLowerCase(), whouseid: this.transferOrderItem.RequestToWarehouseId })

      .subscribe(result => {

        this.items = result;
      });

  }

  onCancel() {
    this.displayPopup = false;
    this.transferOrderItemList = [];

  }

  add(form) {

    if (!form.valid || !this.transferOrderItem.StockId || this.transferOrderItem.Itemname == '') {
      // this.messageService.add({ severity: 'error', summary: 'Form Invalid!', detail: '' });
      this.invalidForm = true;
    } else {
      this.invalidForm = false;
      //  let itm = this.transferOrderItem.Itemname;
      //this.transferOrderItem.Itemname = itm.itemname;
      if (this.transferOrderItemList.length == 0) {
        this.displayPopup = false;
        setTimeout(() => {
          this.displayPopup = true;

        }, 1);
      }

      this.transferOrderItemList.push(this.transferOrderItem);
      
      this.clearitem();
    }
  }

  setItem(event) {

    // this.transferOrderItem.Itemname = event.itemname
    this.transferOrderItem.StockId = event.StockId;
    this.transferOrderItem.Itemname = event;
    //this.transferOrderItem.Itemname = event.itemname;
  }

  trash(index) {
    this.transferOrderItemList.splice(index, 1);
  }

  save() {
    this.blocked = true;

    let transferOrderItemList = this.transferOrderItemList;
    transferOrderItemList.forEach(element => {
      element.Itemname = element.Itemname.itemname;
    });
    
    // this.InternaltransfersService.PostTransferOrderV2(transferOrderItemList)
    //   .subscribe(result => {
    //     this.blocked = false;

    //     if (result == "Add Successfuly.") {
    //       this.messageService.add({ severity: 'success', summary: result, detail: '' });
    //       setTimeout(() => {
    //         location.reload();

    //       }, 3000);
    //       //  this.router.navigate(["Addinternaltransferitem"], { relativeTo: this.r.parent });

    //     }
    //     else {
    //       this.messageService.add({ severity: 'error', summary: result, detail: '' });
    //     }
    //   });
  }

  clearitem() {
    
    let item = this.transferOrderItem;
   
    this.transferOrderItem = new TransferOrder();

    this.transferOrderItem.RequestFromWarehouseId = item.RequestFromWarehouseId;
    this.transferOrderItem.RequestToWarehouseId = item.RequestToWarehouseId;

  }

  checkIfFromExists(event) {

    if (this.transferOrderItem.RequestFromWarehouseId == null) {

      this.messageService.add({ severity: 'error', summary: '', detail: 'please select "Warehouse From" before searching items' });

    }

  }

  updateCurrentItem(form) {

    if (!form.valid || !this.transferOrderItem.StockId || this.transferOrderItem.Itemname == '') {
      // this.messageService.add({ severity: 'error', summary: 'Form Invalid!', detail: '' });
      this.invalidForm = true;
    } else {
      this.invalidForm = false;
      // let itm = this.transferOrderItem.Itemname;
      // this.transferOrderItem.Itemname = itm.itemname;
      if (this.transferOrderItemList.length == 0) {
        this.displayPopup = false;
        setTimeout(() => {
          this.displayPopup = true;

        }, 1);
      }
      // this.transferOrderItemList.push(this.transferOrderItem);
      this.transferOrderItemList[this.currentIndex] = this.transferOrderItem;
      this.clearitem();
      this.editSaved = false;

    }

  }

  setCurrentItem(i) {

    this.transferOrderItem = new TransferOrder(this.transferOrderItemList[i]);
    // this.transferOrderItem.Itemname = this.transferOrderItemList[i].Itemname;
    this.editSaved = true;
    this.currentIndex = i;
    this.returnListFromCityId()
  }

  returnListFromCityId() {
    if (this.transferOrderItem.RequestFromWarehouseId) {


      let cityId = this.warehousefromlist.filter(whouse => whouse.WarehouseId == this.transferOrderItem.RequestFromWarehouseId)[0].Cityid;
      this.warehousetolist = this.immutablewarehousetolist.filter(wh => wh.Cityid == cityId && wh.WarehouseId != this.transferOrderItem.RequestFromWarehouseId);
    }
    else {
      this.warehousetolist = this.immutablewarehousetolist;

    }
  }

}

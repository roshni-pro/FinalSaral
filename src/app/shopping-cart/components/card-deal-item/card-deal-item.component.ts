import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/shared/services/loader.service';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';


@Component({
  selector: 'app-card-deal-item',
  templateUrl: './card-deal-item.component.html',
  styleUrls: ['./card-deal-item.component.scss']
})
export class CardDealItemComponent implements OnInit {
  masterwarehouseList: any[];
  selectedWarehouseId: number = 0;
  isOpenPopup: boolean;
  ItemList: any[];
  ItemPerPage: any;
  PageNo: any;
  totalRecords: number;
  UnitPriceList: any[];
  selectedId: number = 0;
  multiMrpId: number = 0;
  MOQ: any;
  DealPrice: any;
  UnitPrice: any;
  itemName: any;
  Item: any;
  warehouseName: any;
  isSatatus: Boolean;
  isActive: boolean = true;
  data = {
    Id: 0,
    IsActive: true,
    ItemName: 0,
    ItemMultiMRPId: 0,
    MinOrderQty: 0,
    WarehouseName: '',
    WarehouseId: 0,
    DealPrice: 0,
    TotalLimit: 0,
    OrderLimit: 0,
    TotalConsume: 0,
    CustomerLimit: 0
  };
  IsStore :boolean=false;
  IsStoreCheck :any;
  constructor(private _Service: ShoppingCartService , private loaderService: LoaderService) { }

  ngOnInit() {
    this.isOpenPopup = false;
    this.getWarehouse();
  }
  onSelect(wid:any) {
    // this.warehouseName=event.target.options[event.target.options.selectedIndex].text;
    this.selectedWarehouseId = this.selectedWarehouseId;
    this.IsStoreCheck = this.masterwarehouseList.filter(x=>x.WarehouseId == wid)
    if(this.IsStoreCheck != null && this.IsStoreCheck !=undefined)
    {
      this.IsStore = this.IsStoreCheck[0].IsStore;
    }
  }
  getWarehouse() {
    this._Service.GetAllWarehouse().subscribe(result => {
      this.masterwarehouseList = result;
    });
  }
  load(event) {
    var Last = event.first ? event.first + event.rows : 20
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows
    this.selectedWarehouseId = this.selectedWarehouseId
    this._Service.GetCardDealItem(this.selectedWarehouseId, "", this.PageNo, this.ItemPerPage).subscribe(res => {
      this.ItemList = res.DealItemDcs;
      this.totalRecords = res.TotalItem;
    })
  }
  search(itemName) {
    if (this.selectedWarehouseId == 0) {
      alert("Please Select Warehouse")
      return
    }
    if (itemName == undefined) {
      itemName = "";
    }
    this._Service.GetCardDealItem(this.selectedWarehouseId, itemName, this.PageNo, this.ItemPerPage).subscribe(res => {
      this.ItemList = res.DealItemDcs;
      this.totalRecords = res.TotalItem;
    })
  }
  AddItem() {
    //this.selectedWarehouseId = null;
    this.isOpenPopup = true;
  }
  searchForItem(WarehouseId, itemName) {
    if (WarehouseId == 0) {
      alert("Please Select Warehouse")
      return
    }
    if (itemName == null || itemName == undefined) {
      alert("Enter Item Name")
      return
    }
    var data = {
      WarehouseId: WarehouseId,
      keyword: itemName
    };
    this.loaderService.loading(true);
    this._Service.GetItemSearchByKeyWord(data).subscribe(res => {
      this.UnitPriceList = res
      this.loaderService.loading(false);
      console.log(res)
    })
  }
  SaveDealItem(obj, DealPrice, MOQ) {
    if (this.selectedId == 0) {
      alert("Select Item")
      return
    }
    if (DealPrice == null || DealPrice == "") {
      alert("Please Select Deal Price")
      return
    }
    if (DealPrice != null || DealPrice != "") {
      if (DealPrice > this.UnitPrice) {
        alert("Deal Price should be less then Unit Price")
        return
      }
    }
    if (obj.totlimit == null || obj.totlimit == undefined || obj.totlimit == "") {
      alert("Enter Total Limit")
      return
    }
    if (obj.totlimit != null) {
      if ((obj.totlimit % this.MOQ != 0 ) && !this.IsStore) {
        alert("Total limit should be multiple of MOQ");
        return
      }
    }
    if (obj.orderlimit == null || obj.orderlimit == undefined || obj.orderlimit == "") {
      alert("Enter Order Limit")
      return
    }
    if (obj.orderlimit != null) {
      if ((obj.orderlimit % this.MOQ != 0) && !this.IsStore) {
        alert("Order limit should be multiple of MOQ");
        return
      }
      if (parseInt(obj.orderlimit) > parseInt(obj.totlimit)) {
        alert("Order Limit should be less then total limit");
        return
      }
    }
    var data = {
      IsActive: this.isActive,
      ItemName: "",
      ItemMultiMRPId: this.multiMrpId,
      MinOrderQty: MOQ,
      WarehouseName: "",
      WarehouseId: obj.WarehouseId,
      DealPrice: DealPrice,
      TotalLimit: obj.totlimit,
      OrderLimit: obj.orderlimit,
      TotalConsume: 0,
      CustomerLimit: obj.CustomerLimit
    };
    this._Service.SaveDealItem(data).subscribe(res => {
      if (res != null) {
        alert(res.msg)
        this.isOpenPopup = false;
        window.location.reload();
      }
    })
  }
  CheckChange(event) {
    if (event.target.checked) {
      this.isActive = true;
    }
    else {
      this.isActive = false;
    }
  }
  StatusChange(Id, Status) {
    if (Status) {
      this.isSatatus = false;
    }
    else {
      this.isSatatus = true;;
    }
    this._Service.DealItemStatusChange(Id, this.isSatatus).subscribe(res => {
      if (res != null) {
        alert(res.msg)
        this.search("");
      }
    })
  }
  onSelectchange() {
    // this.itemName= event.target.options[event.target.options.selectedIndex].text;
    var dt = this.UnitPriceList.filter(x => x.Itemid == this.selectedId);
    this.MOQ = dt[0]["MinOrderQty"];
    this.DealPrice = this.UnitPrice = dt[0]["UnitPrice"]
    this.multiMrpId = dt[0]["Id"]

  }
  onChangeDealPrice(DealPrice) {
    if (DealPrice > this.UnitPrice) {
      alert("Deal Price should be less then Unit Price")
    }
  }
  onChangeTotLimit(totLimit) {
    if (totLimit % this.MOQ != 0  && !this.IsStore) {
      alert("Total limit should be multiple of MOQ");
    }
  }
  onChangeOrderLimit(obj) {
    if (obj.orderlimit % this.MOQ != 0 && !this.IsStore) {
      alert("Order limit should be multiple of MOQ");
    }
    if (obj.orderlimit % this.MOQ == 0) {
      if (parseInt(obj.orderlimit) > parseInt(obj.totlimit)) {
        alert("Order Limit should be less then total limit");
      }
    }
  }
  cancle() {
    window.location.reload();
  }

  
}



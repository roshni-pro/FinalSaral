import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { ItemService } from 'app/shared/services/item.service';
import { AutoCompleteModule } from 'primeng/primeng';
import { Ampost } from './ipost';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-item-active-inactive',
  templateUrl: './item-active-inactive.component.html',
  styleUrls: ['./item-active-inactive.component.scss']
})


export class ItemActiveInactiveComponent implements OnInit {

  blocked: boolean;
  CityList: any;
  selectedItem: any;
  radiobtn: boolean;
  CityId: any;
  Cityid: any;
  ItemList: any;
  itemid: any;
  FindItemList: any;
  LimitItemList: any;
  isInvalid: boolean;
  showdata: boolean;
  PostObject: Ampost;
  public PostObjectList: Ampost[] = [];
  tempObject: any;
  searchDisable: boolean;
  PurchasePriceA: any;
  UnitPriceA: any;
  Statusvalue: boolean;
  mymodel: any = '';
  mymodel2: any = '';
  mymodel3: any = '';
  PercentCheck: any;
  IsBreak: boolean;

  constructor(
    private cityservice: CityService,
    private itemservice: ItemService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.showdata = false;
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
      this.blocked = false;
      console.log('x:', x);
    });
  }

  oncitychange(CityId) {
    
    if (CityId > 0) {
      this.CityId = CityId;
    }
  }

  onItemTextchange(event, CityId) {
    
    if (event.query.length > 2) {
      if (CityId > 0) {
        
        this.CityId = CityId
        this.itemservice.GetItemcity(event.query, this.CityId).subscribe(x => {
          this.ItemList = x;
        })
      } else {
        alert("Please select city.");
      }
    }
  }

  onmodelChange(ItemId) {
    this.radiobtn = true;
    this.selectedItem = this.selectedItem;
    // this.selectedItem = ItemId;
    this.filter();
    console.log(this.selectedItem);
    console.log(this.selectedItem.itemBaseName);
  }

  filter() {
    
    this.radiobtn = true;
    let ItemMultiMRPId = this.selectedItem.ItemMultiMRPId;
    let Number = this.selectedItem.Number;
    let CityId = this.CityId;
    this.itemservice.GetItemDetail(ItemMultiMRPId, CityId, Number).subscribe(x => {
      this.searchDisable = true;
      this.showdata = true;
      this.FindItemList = x;

      this.FindItemList.forEach(element => {
        if (element.active == true) {
          this.Statusvalue = true;
        } else {
          return this.Statusvalue = false;
        }
      });
      

      this.LimitItemList = this.FindItemList.filter((v, i) => this.FindItemList.findIndex(item => item.ItemMultiMRPId == v.ItemMultiMRPId && item.WarehouseId == v.WarehouseId) === i);
      


    })
  }

  onActiveInactive(name) {
    
    if (name == "A") {
      this.FindItemList.forEach(element => {
        element.active = true;
      });
    } else if (name == "B") {
      this.FindItemList.forEach(element => {
        element.active = false;
      });
    }
  }


  ChangeIsPrimeActive(IsActive, ItemMultiMRPId, MinOrderQty) {
    
    this.FindItemList.forEach(element => {
      if (element.ItemMultiMRPId == ItemMultiMRPId && element.MinOrderQty == MinOrderQty) {
        element.IsPrimeActive = IsActive;
      }
    });

  }


  valuePoPrice(name) {
    if (name <= this.FindItemList[0].MRP) {
      this.FindItemList.forEach(element => {
        element.POPurchasePrice = name;
      });
    }
    else {
      this.FindItemList.forEach(element => {
        element.POPurchasePrice = 0;
      });
      alert("Po Price should be less then equal to MRP.");
    }
  }

  PrimeonActiveInactive(name) {
    
    if (name == "A") {
      this.FindItemList.forEach(element => {
        element.IsPrimeActive = true;
      });
    } else if (name == "B") {
      this.FindItemList.forEach(element => {
        element.IsPrimeActive = false;
      });
    }
  }




  valueDis(name) {

    
    let discountnew = name;
    let margingnew = this.mymodel3;
    let x = this.FindItemList;
    if (this.mymodel3 <= 0) {
      this.mymodel3 = 0;
      margingnew = 0;
    }

    if (discountnew <= 100) {
      let withouttaxvalue = (x[0].PurchasePrice / ((100 + x[0].TotalTaxPercentage) / 100));
      let withouttax = Math.round(withouttaxvalue * 100) / 100;
      let netDiscountAmountvalue = (withouttax * (discountnew / 100));
      let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
      let NetPurchasePrice = withouttax - netDiscountAmount;
      let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (x[0].TotalTaxPercentage / 100))
      let value = x[0].PurchasePrice + (x[0].PurchasePrice * margingnew / 100);
      this.UnitPriceA = Math.round(value * 100) / 100;
      this.FindItemList.forEach(element => {
        element.Discount = discountnew;
      });
    } else {
      this.FindItemList.forEach(element => {
        element.Discount = 0;
      });
      alert("Dicount Less then equal to 100 %.");
    }
  }
  valueMargin(name) {
    
    let discountnew = this.mymodel2;
    let margingnew = name;
    let x = this.FindItemList;

    if (this.mymodel2 <= 0) {
      this.mymodel2 = 0;
      discountnew = 0;
    }
    let withouttaxvalue = (x[0].PurchasePrice / ((100 + x[0].TotalTaxPercentage) / 100));
    let withouttax = Math.round(withouttaxvalue * 100) / 100;
    let netDiscountAmountvalue = (withouttax * (discountnew / 100));
    let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
    let NetPurchasePrice = withouttax - netDiscountAmount;
    let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (x[0].TotalTaxPercentage / 100))
    let value = x[0].PurchasePrice + (x[0].PurchasePrice * margingnew / 100);
    this.UnitPriceA = Math.round(value * 100) / 100;
    this.FindItemList.forEach(element => {
      element.Margin = margingnew;
    });
  }

  valuePurPrice(name) {
    
    let discountnew = this.mymodel2;
    let margingnew = this.mymodel3;
    let purchasepricenew = name;
    let x = this.FindItemList;

    if (this.mymodel3 <= 0) {
      this.mymodel3 = 0;
      margingnew = 0;
    }
    if (this.mymodel2 <= 0) {
      this.mymodel2 = 0;
      discountnew = 0;
    }
    let withouttaxvalue = (purchasepricenew / ((100 + x[0].TotalTaxPercentage) / 100));
    let withouttax = Math.round(withouttaxvalue * 100) / 100;
    let netDiscountAmountvalue = (withouttax * (discountnew / 100));
    let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
    let NetPurchasePrice = withouttax - netDiscountAmount;
    let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (x[0].TotalTaxPercentage / 100))
    let value = purchasepricenew + (purchasepricenew * margingnew / 100);
    this.UnitPriceA = Math.round(value * 100) / 100;
    this.FindItemList.forEach(element => {
      element.PurchasePrice = purchasepricenew;
    });
  }



  valueLimitQty(name) {
    
    if (name > 0) {
      this.FindItemList.forEach(element => {
        element.ItemlimitQty = name;
        element.IsItemLimit = true;
      });
    } else {
      this.FindItemList.forEach(element => {
        element.ItemlimitQty = name;
        element.IsItemLimit = false;
      });
    }
  }
  SICDisMargin(item) {
    
    let withouttaxvalue = (item.PurchasePrice / ((100 + item.TotalTaxPercentage) / 100));
    let withouttax = Math.round(withouttaxvalue * 100) / 100;
    let netDiscountAmountvalue = (withouttax * (item.Discount / 100));
    let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
    let NetPurchasePrice = withouttax - netDiscountAmount;
    let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (item.TotalTaxPercentage / 100))
    let value = WithTaxNetPurchasePrice + (WithTaxNetPurchasePrice * item.Margin / 100);
    item.UnitPrice = Math.round(value * 100) / 100;
  }
  SICPurPrice(item) {

    if (item.PurchasePrice > 0) {
      
      let withouttaxvalue = (item.PurchasePrice / ((100 + item.TotalTaxPercentage) / 100));
      let withouttax = Math.round(withouttaxvalue * 100) / 100;
      let netDiscountAmountvalue = (withouttax * (item.Discount / 100));
      let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
      let NetPurchasePrice = withouttax - netDiscountAmount;
      let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (item.TotalTaxPercentage / 100))
      let value = WithTaxNetPurchasePrice + (WithTaxNetPurchasePrice * item.Margin / 100);
      item.UnitPrice = Math.round(value * 100) / 100;
    } else {
      alert("Purchase Price can't set to zero.")
      return false;
    }
  }

  Update(dataobject) {
    
    this.IsBreak = true;

    this.tempObject = dataobject;
    this.tempObject.forEach(element => {

      this.PercentCheck = 0;
      if (((element.POPurchasePrice - element.PurchasePrice) / element.POPurchasePrice) * 100 >= 2) {

        this.PercentCheck = ((element.POPurchasePrice - element.PurchasePrice) / element.POPurchasePrice) * 100;
        var FirstAlert = confirm(" Purchase price is  " + this.PercentCheck.toFixed(2) + " %  is less than of PO price , Do you want to process");
        if (FirstAlert == true) {
          console.log('first');

          var SecondAlert = confirm("Purchase price is " + this.PercentCheck.toFixed(2) + " %  is less than of PO price , Do you want to process");
          if (SecondAlert == true) {
            console.log('Second');
          }
          else {
            this.IsBreak = false;
            return false;
          }
        }
        else {
          this.IsBreak = false;
          return false;
        }
      }

      
      let limitqty = this.LimitItemList.find(x => x.ItemMultiMRPId == element.ItemMultiMRPId && x.WarehouseId == element.WarehouseId);

      let obj: Ampost = {
        ItemId: element.ItemId,
        ItemMultiMRPId: element.ItemMultiMRPId,
        POPurchasePrice: element.POPurchasePrice,
        Discount: element.Discount,
        Margin: element.Margin,
        UnitPrice: element.UnitPrice,
        ItemlimitQty: limitqty.ItemlimitQty == '0' ? '' : limitqty.ItemlimitQty,
        IsItemLimit: limitqty.IsItemLimit == 0 ? '' : limitqty.IsItemLimit,
        active: element.active,
        IsPrimeActive: element.IsPrimeActive,
        PurchasePrice: element.PurchasePrice,
        PrimePrice: element.PrimePrice
      }
      this.PostObjectList.push(obj);
    });
    if (!this.IsBreak) {
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {

        this.blocked = true;

        this.itemservice.postitemdetail(this.PostObjectList).subscribe(x => {
          let res = x;

          this.blocked = false;
          alert(res);
          this.refresh();
          // window.location.reload();
        });
      }
    });
  }

  clear() {
    this.selectedItem = null;
    this.searchDisable = false;
    this.showdata = false;
    this.FindItemList = null;
    this.ItemList = null;
    this.mymodel = null;
    this.mymodel2 = null;
    this.mymodel3 = null;
    this.PurchasePriceA = null;
    this.UnitPriceA = null;
  }
  refresh() {
    this.searchDisable = false;
    this.showdata = false;
    this.FindItemList = null;
    this.selectedItem = null;
    this.searchDisable = false;
    this.showdata = false;
    this.FindItemList = null;
    this.ItemList = null;
    this.mymodel = null;
    this.mymodel2 = null;
    this.mymodel3 = null;
    this.PurchasePriceA = null;
    this.UnitPriceA = null;
    this.ngOnInit();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
}

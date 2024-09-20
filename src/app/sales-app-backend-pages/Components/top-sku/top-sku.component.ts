import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { MessageService } from 'primeng/api';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { StoreService } from 'app/store/services/store.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConfirmationService } from 'primeng/api'

@Component({
  selector: 'app-top-sku',
  templateUrl: './top-sku.component.html',
  styleUrls: ['./top-sku.component.scss']
})
export class TopSKUComponent implements OnInit {

  constructor(private customerService: CustomerService, private cityService: CityService, private _Service: SalesAppServiceService,
    private messageService: MessageService, private storeservice: StoreService, private confirmationService: ConfirmationService) { }

  Datafilter: any;
  CityId: any;
  cityList: any[];
  masterwarehouseList: any[];
  masterStoreList: any[];
  ItemList: [];
  AddItemList: any[] = [];
  Searchby: any;
  item: any
  itemName: any
  display: boolean
  itemdata: any=[]
  cols: any[];
  index = 0;
  copyitem: boolean = false
  data: any
  DatafilterWareHouse: any;
  DatafilterStore: any;
  ItemListObj:{}
  ngOnInit() {

    this.cityService.GetAllCity().subscribe(result => {
      this.cityList = result;

    })
    this.getStoreList();
    this.cols = [

      { field: 'itemName', header: 'Item Name' },
      { field: 'UnitPrice', header: 'Selling price' },
      { field: 'WarehouseName', header: 'Warehouse name' }
    ]
    
  }
  getStoreList() {
    this.storeservice.GetStoreList().subscribe(
      (res) => {
        console.log("this.masterStoreList", res)
        this.masterStoreList = res;
        this.masterStoreList.unshift({ Name: "Select Here", id: 0 })
      },
      (err) => {
        console.log(err);
        alert("ERROR - Cannot Get Store List, Please Try Again");
      }
    );
    // console.log("this.masterStoreList",this.masterStoreList)
  }
  getItemList(event) {

    console.log("this.DatafilterStore", this.DatafilterStore);
    if (this.CityId == 0 || this.CityId == undefined) {
      this.showError("Select City");
      this.Searchby = "";
      return;
    }

    if (this.DatafilterWareHouse.WareHouseId == 0 || this.DatafilterWareHouse.WareHouseId == undefined) {
      this.showError("Select Warehouse");
      this.Searchby = "";
      return;
    }

    if (event.query.length > 2) {
      let data = {
        warehouseid: this.DatafilterWareHouse.WareHouseId,
        StoreId: this.DatafilterStore.Id == undefined ? 0 : this.DatafilterStore.Id,
        KeyValue: event.query,

      }

      console.log(data);

      this._Service.GetItemList(this.DatafilterWareHouse.WareHouseId, this.DatafilterStore.Id, event.query)
        .subscribe(result => {
          this.ItemList = result;
          console.log(result);
          
          if (this.ItemList == null || this.ItemList == undefined || this.ItemList.length == 0) {
            this.showError("No Item Found");
          }
          console.log("this.ItemList", this.ItemList);

        });
    }
  }
  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });

  }


  DeleteItem(item) {
    this.AddItemList.splice(this.AddItemList.indexOf(item), 1);
  }

  Refresh() {
    window.location.reload();
  }
  popup() {
    this.display = true
    this.Datafilter = []
    this.CityId = 0
    this.Datafilter.StoreId = 0

  }

  Remove(rowData) {
    this._Service.RemoveItem(rowData.Id).subscribe(res => {
      console.log(res);
      this.getAll();
    })
    this.showSuccessfull("Item Deleted");
  }
  confirm1(rowData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Remove(rowData);
      },
      reject: () => {
        this.showError('You have cancelled');
      }
    });
  }

  AddItems() {
    
    this.itemdata.forEach((element, index) => {
      element.SequenceNo = index + 1;
    });
    this.ItemListObj=
    {
      topSKUsItemDcs:this.itemdata,
      IsPromotional:false
    }
    console.log(this.itemdata);
    this._Service.AddItemList(this.ItemListObj).subscribe(res => {
      this.showSuccessfull("Updated List");
    })

  }
  getAll() {

    console.log(this.DatafilterStore);
    if (this.DatafilterStore.Name == "Select Here") {
      this.itemdata = [];
      this.showError("Select store");

    } else {
      if (this.DatafilterWareHouse == undefined || this.DatafilterWareHouse == undefined) {

        if (this.DatafilterWareHouse == undefined) {
          this.showError("Select warehouse");
          return;
        }
        if (this.DatafilterStore == undefined) {
          this.showError("Select store");
          return;
        }
      } else {
        this._Service.getAll(this.DatafilterWareHouse.WareHouseId, this.DatafilterStore.Id).subscribe(x => {
          this.itemdata = x;
          console.log("this.data", this.itemdata)
        })
      }
    }
  }
  GetWareHouse() {
    // console.log(this.CityId);
    this.customerService.getWareHouseByCity(this.CityId.Cityid).subscribe(x => {
      this.masterwarehouseList = x
    })
  }
  onSelectItem(obj) {
    debugger;
    console.log("this.DatafilterWareHouse", this.DatafilterStore);
    this.data = {
      ItemId: obj.ItemId,
      itemName: obj.itemname,
      UnitPrice: obj.UnitPrice,
      Margin: obj.Margin,
      WarehouseId: this.DatafilterWareHouse.WareHouseId,
      WarehouseName: this.DatafilterWareHouse.WareHouseName,
      StoreId: this.DatafilterStore.Id,
      SequenceNo: 0,
      Id: this.DatafilterStore.Id,
      IsActive: this.DatafilterStore.IsActive,
      IsDeleted: this.DatafilterStore.IsDeleted,
      StoreName: this.DatafilterStore.Name
    }
    console.log("this.dta", this.data);
    if (this.itemdata && this.itemdata.length > 0 && this.itemdata.length == 20) {
      var fldata = this.itemdata.filter(x => {
        if (x.itemId == obj.ItemId || x.ItemId == obj.ItemId) { this.showError("Item already exists"); }
      }
      );
      if (fldata.length != 0) {
        this.showError("item already added");
        this.Searchby = "";
        this.copyitem = true
      } else {
        this.itemdata.unshift(this.data)
        // this.AddDetails(Warehouse.WarehouseId);
        this.Searchby = "";
        this.copyitem = false
      }
    }
    else {
      if (this.itemdata.length >= 20) { this.showError("Max limit 20"); }
      else {
        debugger;
        console.log(this.itemdata, obj.ItemId);
        
        var fldata: any = this.itemdata.filter(x => (x.itemId == obj.ItemId) || (x.ItemId == obj.ItemId)
          // if (x.itemId == obj.ItemId || x.ItemId == obj.ItemId) {
          //   this.showError("Item already exists");
          //   return;
          // }
          // else { }
        
        )[0];
        if(fldata != undefined){
          this.showError("item already added");
          this.Searchby = "";
          this.copyitem = true  
        }else{
          this.itemdata.unshift(this.data)
          // this.AddDetails(Warehouse.WarehouseId);
          this.Searchby = "";
          this.copyitem = false
        }

      }
    }


  }

   
}

import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { Console, debug } from 'console';
import { Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-future-multi-mrp-mapping',
  templateUrl: './future-multi-mrp-mapping.component.html',
  styleUrls: ['./future-multi-mrp-mapping.component.scss']
})
export class FutureMultiMrpMappingComponent implements OnInit {

  //selectedSubsubCatregory:number=32;
  itemNO: number = 0;
  mapDetails: boolean = false;
  categoryListData: any;
  cityListData: any;
  selectedCity: any[] = [];
  selectedHub: any;
  subCatList = [];
  brandList: any[];
  hubList = [];
  selectedSubsubCatregory: any[] = [];
  selectedCatregory: any[] = [];
  selectedSubCat: any[] = [];
  blocked: boolean = false;
  getRoleData:any;
  sourceAssociateRole:any;
  hqMasterRole:any;
  inventoryForecastingExecutive : any;
  inventoryForecastingSeniorExecutive : any;
  searchItem:string;
  cityHub: any[];

  constructor(private _service: InventoryforcastserService,
              private router: Router) { }

  ngOnInit() {
    // this.getRoleData = (JSON.parse(localStorage.getItem('tokenData')).rolenames).split(',');
    this.getRoleData = (localStorage.getItem('role')).split(',');
    var sourceAssociate = 'Sourcing Associate'; 
    var HQMaster = 'HQ Master login';
    var InventoryForecastingExecutive = 'Inventory Forecasting Executive';
    var InventoryForecastingSeniorExecutive = 'Inventory Forecasting Senior Executive';
    
    this.sourceAssociateRole = this.getRoleData.find(x => x == sourceAssociate)
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster)
    this.inventoryForecastingExecutive = this.getRoleData.find(x => x == InventoryForecastingExecutive);
    this.inventoryForecastingSeniorExecutive = this.getRoleData.find(x => x == InventoryForecastingSeniorExecutive);
    this.selectedHub = localStorage.getItem('buyerEditHub') == '' ? '' : JSON.parse(localStorage.getItem('buyerEditHub'));
    this.cityList();
    this.categoryList();
     //when user move to future mrp page to buyer edit page, then localStorage work --started//
     this.selectedSubsubCatregory = localStorage.getItem('buyerEditBrand') == '' ? '' : JSON.parse(localStorage.getItem('buyerEditBrand'));
     //this.searchItem = localStorage.getItem('buyerEditItem') == (null || "null" || "undefined") ? '' : localStorage.getItem('buyerEditItem');
     if((this.selectedHub != null  && this.selectedSubsubCatregory != null)){
      setTimeout(() => {
        this.load(this.selectedSubsubCatregory,this.searchItem);
      }, 1000);
     }
     //when user move to future mrp page to buyer edit page, then localStorage work --started//
  }

  MapPopClose(){
    //this.mapDetails=false
    if((localStorage.getItem('buyerEditHub') == (null || '')) && 
          (localStorage.getItem('buyerEditBrand') == (null || ''))){
            this.mapDetails=false
    }else{
      this.router.navigate(['/layout/inventoryforcast/buyerEdit']);
    }
  }
  cityIdArr = [];
  getHubList(cities) {
    this.cityIdArr = [];
    this.subsubCatArr=[]
    this.cityIdArr.push(cities.Cityid)
    this.blocked = true;
    this._service.getHubList(this.cityIdArr).subscribe(res => {
      this.hubList = res.filter(x => x.IsKPP === false)

      this.blocked = false;
    });
  }
  // changes
  catId:any
  catIdArr:any[]=[]
  getSubCatList(categories) {
    this.subCatList = [];
    this.selectedSubCat = [];
    this.brandList = [];
    this.catId=categories.CategoryId
    this.catIdArr=[]
    this.catIdArr.push(this.catId)
    this.blocked = true;
    this._service.getSubCategories(this.catIdArr).subscribe(result => {
      this.subCatList = result;
      this.blocked = false;
    });
  }
  subCatBrand = []
  subsubCatArr: any = []

  // changes
  subcatId:number
  subcatArr:any[]=[]
  getBrandsnew(subcategories) { 
    this.brandList = [];
    this.selectedSubsubCatregory = [];
    
    // this.subCatID=subcategories.SubCategoryId
    this.subcatId=subcategories.SubCategoryId 
    this.subcatArr=[] 
    this.subcatArr.push(this.subcatId) 
    this.blocked = true;

    const payload = {
      categoryId: this.catIdArr,
      subcategoryId: this.subcatArr
    }
    this._service.getSubSubCatList(payload).subscribe(result => {
      this.brandList = result;
      this.blocked = false;
    });

  }
  // changes
  getSearchResult(selectedSubsubCatregory,selSearchItem) {
    selSearchItem == undefined ? null : selSearchItem;
    // if (this.selectedCity.length == 0) {
    //   alert('Please Select City')
    // } else {
      if (this.selectedHub == undefined) {
        alert('Please Select Hub');
        return false;
      } else {
        // if (this.selectedCatregory.length == 0) {
        //   alert('Please Select Category')
        // } else {
          // if (this.selectedSubCat.length == 0) {
          //   alert('Please Select Sub Category')
          // } else {
            if (this.selectedSubsubCatregory.length == 0) {
              alert('Please Select Sub Sub Category');
              return false;
            } else {
              this.load(selectedSubsubCatregory,selSearchItem);

            }
          //}
        //}
      }
    //}

  }
  GetFutureForcastItem = [];
  subCatBrandID = []
  val = false
  selectedWarehouseId = [];
  load(selectedSubsubCatregory,selSearchItem) {
    this.subCatBrandID = []
    this.subCatBrandID.push(selectedSubsubCatregory.BrandId)
    if (this.selectedSubsubCatregory) {
      this.blocked = true;
      this._service.searchFutureMRP(this.subCatBrandID,selSearchItem).subscribe(
        res => {
          this.GetFutureForcastItem = res
          if (this.GetFutureForcastItem.length > 0) {
            this.val = false
            this.blocked = false;
          }
          else {
            this.val = true
            this.blocked = false;
          }
        },
        err => {
          alert(err.error.ErrorMessage)
          this.blocked = false;
        }
      )
    }
  }

  getId: any;
  getItem(item) {

    this.getId = item;
    this.mapFutureMrpPop(details)
  }
  multiMRP: any = [];
  mapMrpList: any = [];
  mapMrpListCopy: any[];
  dbmapMrp: any = [];
  drpdwnMrpList: any = [];
  changeMapMrpList: any = [];
  CopyMrpItem: any = []
  response: any = [];
  isBlankList: number = 0;
  letItemCopy: any;

  mapFutureMrpPop(Item) {
    
    this.letItemCopy = Item
    this.selectedWarehouseId.push(this.selectedHub.WarehouseId)
    this.mapDetails = true;
    this.itemNO = Item.Number;
    console.log(this.selectedWarehouseId);
    this.blocked = true;
    this._service.mapFutureMrp(this.itemNO, this.selectedWarehouseId).subscribe((res) => {
      this.mapMrpList = [];
      this.selectedWarehouseId = []   
      this.response = res;
      this.mapMrpList = this.response.FutureForcastMappingDCs;
      console.log("All Data", this.mapMrpList);
      var allSelectedItems = [];
      this.dbmapMrp = this.response.MapMrpIds;
      console.log("db Data", this.dbmapMrp);
      if (this.mapMrpList && this.mapMrpList.length > 0) {
        this.mapMrpList.forEach(x => {
          var mapids = this.dbmapMrp.find(y => y.ItemMultiMrpId == x.ItemMultiMRPId);
          var otherSelectedItems = [];
          x.InnerList = (this.mapMrpList.filter(y => { return y.MRP != x.MRP }));
          var otherMapIds = this.dbmapMrp.filter(y => { return y.ItemMultiMrpId != x.ItemMultiMRPId });

          otherMapIds.forEach(y => {
            otherSelectedItems.push(y.ItemMultiMrpId);
            y.MapMrpIds.forEach(z => {
              otherSelectedItems.push(z);
              allSelectedItems.push(z);
            });
          });

          if (otherSelectedItems && otherSelectedItems.length > 0) {

            var innerlst = [];
            x.InnerList.forEach(y => {
              if (!otherSelectedItems.includes(y.ItemMultiMRPId)) {
                innerlst.push(y);
              }
            });
            x.InnerList = innerlst;
          }

          var selarr = [];

          if (mapids && mapids.MapMrpIds.length > 0) {
            x.InnerList.forEach(y => {
              if (mapids.MapMrpIds.includes(y.ItemMultiMRPId)) {
                selarr.push(y);
              }
            });
          }
          x.SelectedMRPList = selarr
        });

      }
      if (allSelectedItems && allSelectedItems.length > 0) {
        var finallist = [];
        this.mapMrpList.forEach(x => {
          if (!allSelectedItems.includes(x.ItemMultiMRPId))
            finallist.push(x);
        });
        this.mapMrpList = finallist;
      }
      this.blocked = false;
    })
    console.log(this.mapMrpList);
    this.isBlankList=0
    this.mapMrpList.forEach(element => {
      if(element.SelectedMRPList){
        if (element.SelectedMRPList.length > 0) {
          this.isBlankList++;
        }
      }
    });


  }
  onChange(event, item) {
    //#region 
    if (item.SelectedMRPList && item.SelectedMRPList.length > 0 && item.SelectedMRPList.map(e => e.MRP).indexOf(event.itemValue.MRP) > -1) {

      if (item.SelectedMRPList && item.SelectedMRPList.length > 0) {
        item.SelectedMRPList.forEach(x => {
          this.mapMrpList = this.mapMrpList.filter(y => { return y.MRP != x.MRP });
        });
      }
      var tempList = this.mapMrpList.filter(x => { return x.MRP != item.MRP });

      if (tempList && tempList.length > 0) {
        tempList.forEach(x => {
          if (item.SelectedMRPList && item.SelectedMRPList.length > 0) {
            x.InnerList = x.InnerList.filter(y => { return y.MRP != item.MRP });
            item.SelectedMRPList.forEach(inr => {
              x.InnerList = x.InnerList.filter(y => { return inr.MRP != y.MRP });


            });
          }
        });
      }

    } else {
      this.isBlankList=1;
      let copy = JSON.parse(JSON.stringify(event.itemValue));
      console.log(copy, 'copy')
      copy.InnerList = this.mapMrpList.filter(x => { return x.MRP != event.itemValue.MRP && (!x.SelectedMRPList || x.SelectedMRPList.length == 0) });
      console.log(copy.InnerList, 'copyinner');

      if (item.SelectedMRPList && item.SelectedMRPList.length > 0) {
        copy.InnerList = this.mapMrpList.filter(x => { return x.MRP != item.MRP });
      }
      this.mapMrpList.push(copy);

      var tempList = this.mapMrpList.filter(x => { return x.MRP != item.MRP && x.MRP != event.itemValue.MRP });
      if (tempList && tempList.length > 0) {
        tempList.forEach(x => {
          x.InnerList.push(event.itemValue);
        })
      }

      if (!item.SelectedMRPList || item.SelectedMRPList.length == 0) {
        if (tempList && tempList.length > 0) {
          let newTemp = JSON.parse(JSON.stringify(item));
          newTemp.SelectedMRPList = null;

          tempList.forEach(x => {
            x.InnerList.push(newTemp);
          })
        }
      }

      let temp = this.mapMrpList;
      this.mapMrpList = null;
      setTimeout(() => {
        this.mapMrpList = temp;
      }, 200);
    }
    //#endregion

  }
  futureMrpList: any = []
  futureUpdateData: any
  mapMrpUpdate() {
        
    var arr = [];
    this.mapMrpList.forEach(element => {
      var mapids = [];
      if (element.SelectedMRPList != undefined) {
        if (element.SelectedMRPList.length > 0) {
          element.SelectedMRPList.forEach(id => {
            mapids.push(id.ItemMultiMRPId);
          });
          arr.push({ "ItemMultiMRPId": element.ItemMultiMRPId, "WarehouseId": this.selectedHub.WarehouseId, "MappingMRPId": mapids });
          console.log(arr);

        }
      }
      // else {
      //   alert('alteast one map required')
      // }
    });

    if (this.isBlankList == 0 && arr.length == 0) {
      alert("Please Select Atleast One Map");
    } else {
      if (arr.length == 0) {
        this.mapMrpList.forEach(element => {
          arr.push({ "ItemMultiMRPId": element.ItemMultiMRPId, "WarehouseId": this.selectedHub.WarehouseId, "MappingMRPId": [] })
        })
      }

      this._service.mappingMrpUpdate(arr).subscribe((res): any => {
        var resu: any = res
        console.log(res)
        alert(resu.msg);
        // this.MapPopClose();
        if((localStorage.getItem('buyerEditHub') == (null || '')) && 
          (localStorage.getItem('buyerEditBrand') == (null || ''))){
            this.mapDetails=false
        }else{
          this.router.navigate(['/layout/inventoryforcast/buyerEdit']);
        }
        
       

      //  this.mapFutureMrpPop(this.letItemCopy);
      },
        err => {
          alert('ERROR - Data Not Updated');
          console.log(err);
        });
    }


  }
  cityList() {
    this._service.getCityList().subscribe(res => {
      console.log(res);
      this.cityListData = res;
      this.getAllHUbList();
    })
  }

  getAllHUbList(){
    this.cityHub = this.cityListData.map(function (elem) {
     return elem.Cityid ? elem.Cityid : elem
   });

   this.blocked = true;
   this._service.getMultiHubList(this.cityHub).subscribe(res => {
     this.hubList = res.filter(x => x.IsKPP === false);
     this.selectedHub = this.hubList.filter(x=> x.WarehouseId === this.selectedHub.WarehouseId)[0];
     this.blocked = false;
   });
}

  categoryList() {
    this.subCatList = [];
    this.brandList = [];
    this.selectedSubCat = [];
    this.selectedSubsubCatregory = [];
    this._service.getAllCategories().subscribe(res => {
      this.categoryListData = res;
      this.getAllSubCatList();
    })
  }

  getAllSubCatList(){
    var catIds = this.categoryListData.map(function (elem) {
      return elem.CategoryId ? elem.CategoryId : elem
    });
    this.blocked = true;
    this._service.getSubCategories(catIds).subscribe(result => {
      this.subCatList = result;
      this.blocked = false;
      this.getAllBrandCatList();
    });
  }
  getAllBrandCatList(){
    var catIds = this.categoryListData.map(function (elem) {
      return elem.CategoryId ? elem.CategoryId : elem
    });
    var SubCatIds = this.subCatList.map(function (elem) {
      return elem.SubCategoryId ? elem.SubCategoryId : elem
    });
    const payload = {
          categoryId: catIds,
          subcategoryId: SubCatIds
        }
    this.blocked = true;
    this._service.getSubSubCatList(payload).subscribe(result => {
      this.brandList = result;
      this.blocked = false;
    });
}
  
  clearRecord() {
    this.selectedCity = []
    this.selectedHub = []
    this.selectedCatregory = []
    this.selectedSubCat = []
    this.selectedSubsubCatregory = []
    this.hubList = [];
    this.subCatList = [];
    this.brandList = [];
    this.searchItem = undefined;
    this.GetFutureForcastItem = [];
    this.cityList();
    this.categoryList();
  }

  moveToEditPage(){ 
    this.router.navigate(['/layout/inventoryforcast/buyerEdit']);
  }

}
function details(details: any) {
  throw new Error('Function not implemented.');
}


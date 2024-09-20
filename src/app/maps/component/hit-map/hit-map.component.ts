import { Component, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { HeatmapServiceService } from 'app/shared/services/heatmap-service.service';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

declare var $: any;
declare var google: any;
interface City {
  name: string,
  code: string
}
interface warehouse {
  name: string,
  code: string
}
interface Cluster {
  name: string,
  code: string
}
interface BaseCategory {
  name: string,
  code: string
}
interface Category {
  CategoryId: any;
  name: string,
  code: string
}
interface SubCategory {
  name: string,
  code: string
}

interface SubsubCategory {
  name: string,
  code: string
}

interface Store {
  Id: number,
  Name: string,
}

interface Item {
  BrandId: any;
  WarehouseId: any;
  name: string,
  code: string
}

@Component({
  selector: 'app-hit-map',
  templateUrl: './hit-map.component.html',
  styleUrls: ['./hit-map.component.scss']
})
export class HitMapComponent implements OnInit {
  details: any;
  rangeDates: Date[];
  //---for use city
  CityList: City[];
  City: SelectItem[];
  selectedCity: any[];
  CityId: any;
  cityIdList: warehouse[];
  selectedcityIdList: any[];
  // for use subcategory
  SubCategorys: SubCategory[];
  SubCategoryId: any[];
  selectedSubCatregory: any[];
  SubCategoryList: SubCategory[];
  selectedSubCategoryIdList: any[];
  //-----//
  warehouseList: warehouse[];
  warehouse: SelectItem[];
  selectedwarehouse: any[];
  ClusterList: any[];
  Cluster: SelectItem[];
  WarehouseIdList: any[];
  //for use base category
  BaseCategoryIdList: any[];
  BaseCategoryId: any[];
  BaseCategoryList: BaseCategory[];
  BaseCategory: SelectItem[];
  selectedBaseCatregory: any[];
  //------///
  CategoryList: any[];
  Category: SelectItem[];
  selectedCatregory: any[];
  CategoryIdList: any[];
  //---for use sub sub category
  BrandId: any[];
  selectedSubsubCatregory: any[];
  SubsubCategoryIdList: any[];
  SubsubCategoryList: SubsubCategory[];
  SubsubCategory: SelectItem[];
  ///------///
  selectedItem: any[];
  ItemList: any[];
  Item: SelectItem[];
  selectedSubCategoryIdItem: any[];
  selectedCluster: any;
  selectedMapType: string;

  myInnerHeight = window.innerHeight - 200;
  showMap: boolean;
  SelectedDataType: string;
  inputParam: any;
  showOverlay: boolean;
  isOpen: boolean;
  isInvalid: boolean;
  isLoading: boolean;
  isGetComarisionMap: boolean;
  comparisionData: any;
  markerList: any[];
  isFilterErrorOcurred: boolean;
  storeList: any;
  selStoreId: any;
  constructor(private heatmapservice: HeatmapServiceService
    , private messageService: MessageService) { }

  ngOnInit() {
    this.isLoading = false;
    this.isInvalid = false;
    this.isFilterErrorOcurred = false;
    this.SelectedDataType = 'TotalOrder';
    this.showMap = true;
    this.selectedMapType = 'heatMap';


    var storeObj = {
      Id: 0,
      Name: "All"
    }
    this.heatmapservice.getStoreList().subscribe(res =>{
      res.unshift(storeObj);
      this.storeList = res;
      console.log(this.storeList);
    })

    this.heatmapservice.GetCities().subscribe(result => {
      console.log('test', result);
      this.CityList = result;
    });

    this.heatmapservice.GetBaseCategory().subscribe(result => {

      console.log('test', result);
      this.BaseCategoryList = result;
    });


  }
  Show(form) {
    if (form.invalid) {
      this.isInvalid = true;
    }
    else {

      this.isInvalid = false;
      if (this.setInputParam()) {
        return;
      }
      this.isLoading = true;
      this.showMap = false;
      if (this.selectedMapType == 'heatMap') {
        if (this.isGetComarisionMap) {
          this.heatmapservice.FilteredMapData(this.inputParam).subscribe(result => {
            this.comparisionData = result;
            console.log('this.comparisionData: ', this.comparisionData);
            this.updateMapName();
            this.showMap = true;
            this.isLoading = false;
          });
        }
        else if (!this.isGetComarisionMap) {
          this.heatmapservice.ClusterDashboard(this.inputParam).subscribe(result => {
            console.log('test', result);
            this.details = result;
            this.showMap = true;
            this.isLoading = false;

          });
        }
      } else if (this.selectedMapType == 'markerMap') {
        this.heatmapservice.getCustomerMapData(this.inputParam).subscribe(result => {
          this.markerList = result;
          this.showMap = true;
          this.isLoading = false;
          console.log('result is: ', this.markerList);
        });
      }

    }
  }

  setInputParam(): boolean {
    this.isGetComarisionMap = false;
    this.inputParam = {};
    if (this.rangeDates != null && this.rangeDates.length > 0) {
      this.inputParam.StartDate = this.rangeDates[0];
      this.inputParam.EndDate = this.rangeDates[1];
    }

    if(this.selStoreId != undefined){
      this.inputParam.StoreId = this.selStoreId.Id;
    }

    if (this.selectedCity && this.selectedCity.length > 0) {
      this.selectedcityIdList = this.selectedCity.map(x => x.CityId);
      this.inputParam.CityIds = this.selectedcityIdList;
    }

    if (this.selectedwarehouse && this.selectedwarehouse.length > 0) {
      this.inputParam.WareHouseIds = this.selectedwarehouse.map(x => x.WarehouseId);
    }

    if (this.selectedCluster && this.selectedCluster.length > 0) {
      this.inputParam.ClusterIds = this.selectedCluster.map(x => x.ClusterId);
    }

    if (this.selectedBaseCatregory && this.selectedBaseCatregory.length > 0) {
      this.isGetComarisionMap = true;
      this.inputParam.BaseCatIds = this.selectedBaseCatregory.map(x => x.BaseCategoryId);
      this.isFilterSelectedError(this.inputParam.BaseCatIds, 'Base Category');
    }


    if (this.selectedCatregory && this.selectedCatregory.length > 0) {

      this.inputParam.CategoryIds = this.selectedCatregory.map(x => x.CategoryId);
      this.isFilterSelectedError(this.inputParam.CategoryIds, 'Category');
    }

    if (this.selectedSubCatregory && this.selectedSubCatregory.length > 0) {
      this.inputParam.SubCatIds = this.selectedSubCatregory.map(x => x.SubCategoryId);
      this.isFilterSelectedError(this.inputParam.SubCatIds, 'Sub Category');
    }

    if (this.selectedSubsubCatregory && this.selectedSubsubCatregory.length > 0) {
      this.inputParam.BrandIds = this.selectedSubsubCatregory.map(x => x.BrandId);
      this.isFilterSelectedError(this.inputParam.BrandIds, 'Brand Name');
    }

    if (this.selectedItem && this.selectedItem.length > 0) {
      this.inputParam.ItemNumbers = this.selectedItem.map(x => x.ItemNumber);
      this.inputParam.MultiMrpIds = this.selectedItem.map(x => x.ItemMultiMrpId);
      this.isFilterSelectedError(this.inputParam.ItemNumbers, 'Item');
    }
    return this.isFilterErrorOcurred;
  }

  isFilterSelectedError(list: any[], filterName) {
    this.isFilterErrorOcurred = false;
    if (list && list.length > 4) {
      this.isFilterErrorOcurred = true;
      let message = 'Please select at max 4 filters: ' + filterName;
      this.messageService.add({ severity: 'error', summary: 'Error: ' + filterName, detail: message });
    }
  }


  onSelectCityList() {
    this.selectedwarehouse = [];
    this.selectedCluster = [];
    if (this.selectedCity && this.selectedCity.length > 0) {
      this.selectedcityIdList = this.selectedCity.map(x => x.CityId)

      this.heatmapservice.Warehouse(this.selectedcityIdList).subscribe(result => {
        this.warehouseList = result;
        console.log('this.warehouseList:', this.warehouseList);
      })
    }
  }
  onSelectWarehouseList() {
    this.selectedCluster = [];
    console.log('selectedwarehouse:', this.selectedwarehouse);
    if (this.selectedwarehouse && this.selectedwarehouse.length > 0) {
      let WarehouseIdList = this.selectedwarehouse.map(x => x.WarehouseId)
      console.log('WarehouseIdList: ', WarehouseIdList);
      this.heatmapservice.Cluster(WarehouseIdList).subscribe(result => {
        this.ClusterList = result;
        console.log('this.ClusterList:', this.ClusterList);
      })
    }
  }
  onSelectBaseCategoryList() {
    this.selectedCatregory = [];
    this.selectedSubCatregory = [];
    this.selectedSubsubCatregory = [];
    this.selectedItem = [];
    if (this.selectedBaseCatregory && this.selectedBaseCatregory.length > 0) {
      let BaseCategoryIdList = this.selectedBaseCatregory.map(x => x.BaseCategoryId)

      this.heatmapservice.Categories(BaseCategoryIdList).subscribe(result => {
        this.CategoryList = result;

      })
    }
  }

  onSelectCategoryList() {
    this.selectedSubCatregory = [];
    this.selectedSubsubCatregory = [];
    this.selectedItem = [];
    if (this.selectedCatregory && this.selectedCatregory.length > 0) {
      let CategoryIdList = this.selectedCatregory.map(x => x.CategoryId)
      this.heatmapservice.SubCategories(CategoryIdList).subscribe(result => {
        this.SubCategoryList = result;
      });
    }
  }
  onSelectSubCategoryList() {
    this.selectedSubsubCatregory = [];
    this.selectedItem = [];
    if (this.selectedSubCatregory && this.selectedSubCatregory.length > 0) {
      let selectedSubCategoryIdList = this.selectedSubCatregory.map(x => x.SubCategoryId)
      this.heatmapservice.Brands(selectedSubCategoryIdList).subscribe(result => {
        this.SubsubCategoryList = result;
      })
    }
  }

  onSelectSubCeategoryItem() {
    this.selectedItem = [];
    console.log('selectedItem:', this.selectedItem);
    if (this.selectedwarehouse && this.selectedwarehouse.length > 0 && this.selectedSubsubCatregory && this.selectedSubsubCatregory.length > 0) {
      let inputParam = {
        WarehouseId: this.selectedwarehouse.map(x => x.WarehouseId),
        BrandId: this.selectedSubsubCatregory.map(x => x.BrandId)
      }
      console.log('selectedSubCategoryIdItem: ', inputParam);
      this.heatmapservice.Items(inputParam).subscribe(result => {
        this.ItemList = result;
        console.log('this.ItemList:', this.ItemList);
      });
    }
  }

  updateMapName() {
    if (this.comparisionData && this.comparisionData.FilteredList && this.comparisionData.FilteredList.length > 0) {
      this.comparisionData.FilteredList.forEach(item => {
        if (this.comparisionData.FilteredWith == "SubCategory") {
          item.MapName = this.selectedSubCatregory.filter(x => {
            return x.SubCategoryId == item.FilterId;
          })[0].SubCategoryName;
        }
        if (this.comparisionData.FilteredWith == "BaseCategory") {
          console.log('selectedBaseCatregory: ', this.selectedBaseCatregory);
          item.MapName = this.selectedBaseCatregory.filter(x => {
            return x.BaseCategoryId == item.FilterId;
          })[0].BaseCategoryName;
        }
        if (this.comparisionData.FilteredWith == "Category") {
          console.log('Category: ', this.selectedCatregory);
          item.MapName = this.selectedCatregory.filter(x => {
            return x.CategoryId == item.FilterId;
          })[0].CategoryName;
        }
        if (this.comparisionData.FilteredWith == "Brand") {
          console.log('selectedSubsubCatregory: ', this.selectedSubsubCatregory);
          item.MapName = this.selectedSubsubCatregory.filter(x => {
            return x.BrandId == item.FilterId;
          })[0].BrandName;
        }
        if (this.comparisionData.FilteredWith == "Item") {
          console.log('Item: ', this.ItemList);
          item.MapName = this.ItemList.filter(x => {
            return x.ItemNumber == item.FilterId;
          })[0].ItemName;
        }

        //item.FilterId
      });
    }
  }
  ShowToolTip:boolean=false
  onClickToggle(i){
    this.ShowToolTip=i;
  }
}

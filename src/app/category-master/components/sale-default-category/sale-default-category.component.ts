import { Component, OnInit } from '@angular/core';
import { SaledefaultcategoryService } from 'app/shared/services/saledefaultcategory.service';
import { StoreService } from 'app/store/services/store.service';
import { debug } from 'console';
import { data } from 'jquery';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-sale-default-category',
  templateUrl: './sale-default-category.component.html',
  styleUrls: ['./sale-default-category.component.scss']
})
export class SaleDefaultCategoryComponent implements OnInit {

  ItemList: any[];
  categoryList: any;
  subcategoryList: any;
  brandList: any;
  isOpenPopup: boolean;
  selectedCategory: number;
  selectedSubCategory: any;
  selectedBrand: any;
  AddData: any;
  addItemList: Item[] = [];
  CategoryName: string
  SubCategoryName: string
  BrandName: string
  DataList: any[];
  blocked: boolean;
  columnList: any[];
  constructor(private storeService: StoreService, private _service: SaledefaultcategoryService,private confirmationService: ConfirmationService) {
    this.AddData = {};
  }

  ngOnInit() {
    this._service.getCategoryList().subscribe(x => {
      debugger
      this.categoryList = x;
    });
    this.getdata();
    this.columnList = [
      { field: 'CategoryName', header: 'Category' },
      { field: 'SubCategoryName', header: 'Sub-Category' },
      { field: 'SubSubCategoryName', header: 'Brand' }
    ]
  }
  getdata() {
    debugger
    this.blocked = true;
    this._service.GetCategoryList().subscribe(res => {
      this.DataList = res.SaleDefaultCategoryDcs
      this.blocked = false;
    })
  }
  onSelectCategory(event) {
    this.CategoryName = event.target['options']
    [event.target['options'].selectedIndex].text;
    this.blocked = true;
    this._service.getSubCategoryList(this.AddData.selectedCategory).subscribe(x => {
      debugger
      this.subcategoryList = x;
      this.blocked = false;
    });
  }
  onSelectSubCategory(event) {
    this.SubCategoryName = event.target['options']
    [event.target['options'].selectedIndex].text;
    this.brandList = [];
    this.blocked = true;
    debugger
    this._service.getBrand(this.AddData.selectedCategory,this.AddData.selectedSubCategory).subscribe(x => {
      debugger
      this.brandList = x;
      this.blocked = false;
    });
  }
  onSelectBrand(event) {
    this.BrandName = event.target['options']
    [event.target['options'].selectedIndex].text;
  }
  AddNewItem(data) {
    if (data.selectedCategory == null || data.selectedCategory == 0) {
      alert("Please Select Category");
      return;
    }
    if (data.selectedSubCategory == null || data.selectedSubCategory == 0) {
      alert("Please Select SubCategory");
      return;
    }
    if (data.selectedBrand == null || data.selectedBrand == 0) {
      alert("Please Select Brand");
      return;
    }
    debugger

    let obj: any = {
      categoryid: data.selectedCategory,
      SubCategoryid: data.selectedSubCategory,
      SubSubCategoryid: data.selectedBrand,
      Category: this.CategoryName,
      SubCategory: this.SubCategoryName,
      Brand: this.BrandName
    }
    for (let i of this.addItemList) {
      if (data.selectedCategory == i.categoryid && data.selectedSubCategory == i.SubCategoryid && data.selectedBrand == i.SubSubCategoryid) {
        alert("Item Already Added in List")
        return;
      }
    }
    this.addItemList.push(obj);
    this.AddData.selectedCategory = 0;
    this.AddData.selectedSubCategory = 0;
    this.AddData.selectedBrand = 0;
    this.subcategoryList = null;
    this.brandList = null;
  }
  SaveSaleDefaultCategory() {
    if(this.addItemList==null || this.addItemList.length==0){
      alert("Please Add Item");
      return;
    }
    this.AddData.ItemList = this.addItemList;
    this.blocked = true;
    this._service.SaveSaleDefaultCategory(this.AddData).subscribe(res => {
      if(res.Result){
        alert(res.msg)
      this.isOpenPopup = false;
      this.addItemList = [];
      this.AddData.ItemList = null;
      this.blocked = false;
      this.getdata();
      }
      else{
        alert(res.msg);
      }
    })
  }
  addNewStore() {
    this.isOpenPopup = true
  }
  Remove(item) {
    this.addItemList.splice(item, 1)
  }
  cancel() {
    this.isOpenPopup = false;
    this.AddData.selectedCategory = 0;
    this.AddData.selectedSubCategory = 0;
    this.AddData.selectedBrand = 0;
    this.subcategoryList = null;
    this.brandList = null;
    this.addItemList = [];
  }
  RowDelete(rowid) {
    //this.blocked = true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save the changes?',
      accept: () => {
        this._service.Removebrand(rowid.Id).subscribe(res => {
          this.getdata();
          this.blocked = false;
        })
      }
    })
  }
}
export class Item {
  categoryid: any
  SubCategoryid: any
  SubSubCategoryid: any
  Category: string
  SubCategory: string
  Brand: string

}

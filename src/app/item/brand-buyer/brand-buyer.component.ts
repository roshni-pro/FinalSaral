import { Component, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { SelectItem, MessageService } from 'primeng/api';
import { BrandbuyerService } from 'app/shared/services/brandbuyer.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { IfStmt } from '@angular/compiler';

interface SubsubCategory {
  name: string,
  code: string
}
interface Buyer {
  name: string,
  code: string
}
interface warehouse {
  name: string,
  code: string
}



@Component({
  selector: 'app-brand-buyer',
  templateUrl: './brand-buyer.component.html',
  styleUrls: ['./brand-buyer.component.scss']
})

export class BrandBuyerComponent implements OnInit {

  //---for use sub sub category
  BrandId: any[];
  selectedSubsubCatregory: any[];
  selectedCatregory: any[];
  selectedSubCat:any[];
  SubsubCategoryIdList: any[];
  SubsubCategoryList: SubsubCategory[];
  SubsubCategory: SelectItem[];
  BrandList: SubsubCategory[];
  cols: any[];
  isDetails: boolean;
  buyerList: Buyer[];
  warehouseList = [];
  subCatList=[];
  warehouse: SelectItem[];
  selectedwarehouse: any[];
  ClusterList: any[];
  Cluster: SelectItem[];
  WarehouseIdList: any[];
  brandList: any[];
  CategoryList: any[];
  IsSetAllWarehouse: boolean;
  categoryIdsList = []
  subsubcategoryIdsList = []
  warehouseIdsList = []
  masterwarehouseList: any[];
  blocked: boolean;

  constructor(private Brandbuyer: BrandbuyerService, private warehouseservice: WarehouseService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.IsSetAllWarehouse = false;
    this.isDetails = true;

    this.cols = [
      { field: 'BrandName', header: 'Brand Name' }
    ];


    this.Brandbuyer.getCategory().subscribe(result => {
      console.log('test', result);
      this.CategoryList = result;
    });



    this.warehouseservice.GetAllWarehouseWithoutKpp().subscribe(result => {
     // this.warehouseList = result;
      this.masterwarehouseList = result;
      console.log('this.warehouseList: ', this.warehouseList);
      // for (var i = 0; i < result.length; i++) {
      //   this.cols.push(result[i].WarehouseName);
      // }
    });

    this.Brandbuyer.GetBuyer().subscribe(result => {
      console.log('buyer test', result);
      this.buyerList = result;
    });

    // this.Brandbuyer.getDataTable().subscribe(result => {
    //   this.BrandList = result;
    //   console.log(' resultyujjhjhj', result);
    // });
  }

  getSubCatList(categories){
    
    this.subCatList=[];
    this.brandList=[];
    if (categories && categories.length) {
      let subcat = [];
      subcat = categories.map(function (elem) {
        return elem.CategoryId ? elem.CategoryId : elem
      });
      this.Brandbuyer.getSubCat(subcat).subscribe(result => {
        console.log('subCatList', result);
        this.subCatList = result;
      });
    }
  }


  getBrandsnew(subcategories) {
    
    this.brandList=[];
    this.selectedSubsubCatregory=[];
    if (subcategories && subcategories.length) {
      let subcat = [];
      subcat = subcategories.map(function (elem) {
        return elem.SubCategoryId ? elem.SubCategoryId : elem
      });
      this.Brandbuyer.getbrandsnew(subcat).subscribe(result => {
        console.log('test', result);
        this.brandList = result;
      });
    }
  }

  // getBrands(categories) {
  //   if (categories && categories.length) {
  //     let cat = [];
  //     cat = categories.map(function (elem) {
  //       return elem.CategoryId ? elem.CategoryId : elem
  //     });
  //     this.Brandbuyer.getbrands(cat).subscribe(result => {
  //       console.log('test', result);
  //       this.brandList = result;
  //     });
  //   }
  // }

  Save(branddetails) {
    this.Brandbuyer.saveBrands(this.BrandList).subscribe(result => {
    });
  }

  // getData(rowData) {
  //   console.log('rowData: ', rowData);
  // }

  updateWarehouseBuyer(warehouseId, buyerId, brandId) {
         
        this.blocked = true;
       let  whouseLists;
     if (this.IsSetAllWarehouse){  
          whouseLists = this.selectedwarehouse.map(function (elem) {
         return elem.WarehouseId ? elem.WarehouseId : elem;
       });
       } else{
          whouseLists = [];
       }
      this.Brandbuyer.updateBrandBuyer(warehouseId, brandId, buyerId, this.IsSetAllWarehouse, whouseLists).subscribe(result => {
      this.messageService.add({ severity: 'success', summary: 'Update Successfully!'});
      console.log('Updated Successfully.');
      this.Show();
      this.blocked = false;
    });
  }

  Show() {
    
    
    this.blocked = true;
    this.isDetails = false;
    this.BrandList = [];
    let filteredwhouselist = []
    this.warehouseList = [];
    if (this.selectedSubsubCatregory != undefined && this.selectedwarehouse != undefined){

    let subcategorylist = this.selectedSubsubCatregory.map(function (elem) {
      return elem.BrandId ? elem.BrandId : elem;
    });

    let whouseList = this.selectedwarehouse.map(function (elem) {
      return elem.WarehouseId ? elem.WarehouseId : elem;
    });
    whouseList.forEach(wh => {
      let filteredwhouse = this.masterwarehouseList.filter(obj => obj.WarehouseId == wh)[0];
      filteredwhouse ? filteredwhouselist.push(filteredwhouse) : '';
    });
    this.warehouseList = filteredwhouselist;
    this.cols = [];
    for (var i = 0; i < filteredwhouselist.length; i++) {
      this.cols.push(filteredwhouselist[i].WarehouseName);
    }   
      this.Brandbuyer.search(subcategorylist, whouseList).subscribe(result => {
      this.BrandList = result;
      this.messageService.add({ severity: 'success', summary: 'Details!', detail: '' });
      console.log('Data Find.');
      
    this.blocked = false;
    });
  }else{
    this.messageService.add({ severity: 'error', summary: 'Please select all Field!', detail: '' });
    
    this.blocked = false;
  }
    // location.reload();
  }
}

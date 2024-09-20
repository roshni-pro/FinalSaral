import { Component, OnInit } from '@angular/core';
import { BlockbrandService } from 'app/shared/services/blockbrand.service';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-block-brand',
  templateUrl: './block-brand.component.html',
  styleUrls: ['./block-brand.component.scss']
})
export class BlockBrandComponent implements OnInit {

  isShowPopup: boolean = true;
  categoryList: SelectItem[];
  subcategoryList: SelectItem[];
  selectedSubCategory: number[];
  selectedCategory: number;
  brandList: SelectItem[];
  selectedBrand: number;
  isSatatus: boolean;
  BlockBrandList: any[];
  isOpenPopup: boolean;
  Postdata: any;
  CustomerTypeId: number = 0;
  AppTypId: number = 0;
  CustomerTypeName: string = "";
  AppTypeName: string = "";
  ItemPerPage: any;
  PageNo: any;
  totalRecords: number;
  Isdisable: boolean;
  SubSubCatId: number = 0;
  brandName: string;
  SubCatName:string;
  masterwarehouseList:any[];
  selectedWarehouseId:number=0;
  selectedWarehouseName:string="";
  blocked:boolean;
  constructor(private _Service: BlockbrandService) { this.Postdata = {} }

  ngOnInit() {
    this.getWarehouse();
    this._Service.getCategoryList().subscribe(x => {
      this.categoryList = x;
      // this.categoryList.splice(0, 0, { label: 'Select', value: null })
    });
    this.GetBlockBrandList();
  }
  getWarehouse(){
    
    this._Service.GetAllWarehouse().subscribe(result => {
       this.masterwarehouseList = result;
     });
  }
  load(event) {
    var Last = event.first ? event.first + event.rows : 20
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows

    this._Service.getBlockBrandList(this.selectedWarehouseId, this.CustomerTypeId, this.AppTypId, this.PageNo, this.ItemPerPage).subscribe(x => {
      this.BlockBrandList = x.BlockBrandDcs;
      this.totalRecords = x.TotalItem;
    });

  }
  GetBlockBrandList() {
    this._Service.getBlockBrandList(this.selectedWarehouseId,this.CustomerTypeId, this.AppTypId, this.PageNo, this.ItemPerPage).subscribe(x => {
      this.BlockBrandList = x.BlockBrandDcs;
    });
  }
  onSelectCategory() {
    this.subcategoryList = [];
    if (this.Postdata.CatId) {
      this._Service.getSubCategoryList(this.Postdata.CatId).subscribe(x => {
        this.subcategoryList = x;
        console.log(x)
      });
    } else {

    }
  }
  onSelectSubCategory(args) {
    this.brandList = [];
    this.SubCatName = args.target.options[args.target.selectedIndex].text;
    this._Service.getBrand(this.Postdata.CatId,this.Postdata.SubCatId).subscribe(x => {
      this.brandList = x;
      console.log(x);
    });
  }
  onSelectSubSubCategory(args) {
    this.SubSubCatId = this.SubSubCatId;
    this.brandName = args.target.options[args.target.selectedIndex].text;
  }
  StatusChange(Id, Status) {
    if (Status) {
      this.isSatatus = false;
    }
    else {
      this.isSatatus = true;;
    }
    this._Service.BlockBrandStatusChange(Id, this.isSatatus).subscribe(res => {
      if (res != null) {
        alert(res.msg)
        this.GetBlockBrandList();
      }
    })
  }
  AddItem() {
    this.Postdata = {};
    this.isOpenPopup = true;
    this.brandName = "";
    this.SubSubCatId = 0;
    this.Isdisable = false;
    this.selectedWarehouseId=0;
    this.selectedWarehouseName="";
  }
  cancle() {
    this.Postdata = {};
    this.isOpenPopup = false;
    this.brandName = "";
    this.SubSubCatId = 0;
    this.Isdisable = false;
    this.selectedWarehouseId=0;
    this.selectedWarehouseName="";
  }

  ChangeCustomerType(args) {
    this.CustomerTypeName = args.target.options[args.target.selectedIndex].text;
  }
  ChangeAppType(args) {
    this.AppTypeName = args.target.options[args.target.selectedIndex].text;
    if (this.Postdata.AppType == 2) {
      this.Postdata.CustomerType = 4;
      this.CustomerTypeName = "All"
      this.Isdisable = true;
    }
    else {
      this.Postdata.CustomerType = 0;
      this.CustomerTypeName = "";
      this.Isdisable = false;
    }
  }
  onSelect(args){
    this.selectedWarehouseId=this.selectedWarehouseId;
    this.selectedWarehouseName = args.target.options[args.target.selectedIndex].text;
  }
  OnSubmit(data) {
    if (data.CatId == undefined) {
      alert("Category is Required.")
      return false;
    }
    if (data.SubCatId == undefined) {
      alert("Sub Category is Required.")
      return false;
    }
    if (this.SubSubCatId == 0) {
      alert("Brand is Required.")
      return false;
    }
    if (this.selectedWarehouseId == 0) {
      alert("Warehouse is Required.")
      return false;
    }
    if (data.AppType == undefined) {
      alert("App Type is Required.")
      return false;
    }
    if (data.CustomerType == 0 || data.CustomerType == undefined) {
      alert("Customer Type is Required.")
      return false;
    }
    let catname = this.categoryList.find(x => x.value == data.CatId);
    data.CategoryName = catname["label"];
    data.SubcategoryName = this.SubCatName;
    data.SubsubcategoryName = this.brandName;
    data.CustomerTypeName = this.CustomerTypeName;
    data.ApplicationType = this.AppTypeName;
    data.SubSubCatId = this.SubSubCatId;
    data.WarehouseId=this.selectedWarehouseId;
    data.WarehouseName=this.selectedWarehouseName;
    this._Service.AddBlockBrand(data).subscribe(res => {
      if (res != null) {
        alert(res.msg)
        this.isOpenPopup = false;
        this.Postdata = {};
        this.brandName = "";
        this.SubCatName="";
        this.SubSubCatId = 0;
        this.selectedWarehouseId=0;
        this.selectedWarehouseName="";
        this.Isdisable = false;
        this.GetBlockBrandList();
      }
    })
  }
  DeleteBlockBrand(Id) {
    this._Service.DeleteBlockBrand(Id).subscribe(res => {
      if (res != null) {
        alert(res.msg);
        this.GetBlockBrandList();
      }
    })
  }
  Refresh() {
    //window.location.reload();
    this.AppTypId = 0;
    this.CustomerTypeId = 0;
    this.selectedWarehouseId=0;
    this.GetBlockBrandList();
  }
  ExportData() {
    this._Service.ExportBlockBrandList().subscribe(result => {
      
      this._Service.exportAsExcelFile(result, "BlockBrand_Data");
    });
    
  }
}

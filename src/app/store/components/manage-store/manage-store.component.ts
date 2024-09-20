import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { StoreViewModel } from 'app/store/interfaces/store';
import { StoreBrandViewModel } from 'app/store/interfaces/store-brand';
import { StoreBrandDc } from 'app/store/interfaces/store-brand-dc';
import { StoreService } from 'app/store/services/store.service';
import { ConfirmationService, SelectItem } from 'primeng/api';


export interface StoreOwnerDc {
  DisplayName: string;
  UserName: string;
  Email: string;
  PeopleId: number;
}


@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.scss']
})
export class ManageStoreComponent implements OnInit {
  categoryList: SelectItem[];
  subcategoryList: SelectItem[];
  brandListToAdd: StoreBrandDc[];
  brandList: SelectItem[];
  isShowPopup: boolean;
  store: StoreViewModel;
  selectedCategory: number;
  selectedSubCategoryList: number[];
  selectedBrandList: number[];
  isFormInvalid: boolean;
  @Input() storeId: number;

  @Output() onCloseEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('frm', null) frm: NgForm;
  peopleList: StoreOwnerDc[];
  selectedOwner: StoreOwnerDc;
  isOwnerSelected: boolean;
  isOpenSalesLead : boolean = false;
  warehouseList : any;
  warehouseSalesLeadList : any;
  whSelectedList : any;
  previousEdit : any;
  WarehouseId : any;
  SalesLeadId : any;
  constructor(private storeService: StoreService, private confirmationService: ConfirmationService,
    private warehouseService : WarehouseService) { }

  ngOnInit() {
    debugger;
    this.WarehouseId = null;
    this.SalesLeadId = null;
    this.isOwnerSelected = true;
    this.isShowPopup = false;
    this.isFormInvalid = false;
    this.storeService.getCategoryList().subscribe(x => {
      this.categoryList = x;
      this.categoryList.splice(0, 0, { label: 'Select', value: null })
    });

    this.warehouseService.GetAllWarehouse().subscribe(warehouseList => {
      this.warehouseList = warehouseList;

    });

    //case of new added store
    if (!this.storeId) {
      this.store = {
        Id: 0,
        ImagePath: '',
        IsActive: true,
        IsDeleted: false,
        Name: '',
        IsUniversal: false,
        BrandList: [],
        OwnerId: null
      }
      this.isShowPopup = true;
    } else {
      this.storeService.getStoreById(this.storeId).subscribe(x => {        
        this.store = x;
        this.getSelectedOwner();
        this.storeService.getBrandUsingStoreId(this.storeId).subscribe(x => {
          this.isShowPopup = true;
          this.brandListToAdd = x;
          console.log('this.brandListToAdd: ', this.brandListToAdd);
          this.brandListToAdd.forEach(x => {
            x.IsSelected = true;

          });
          this.selectedBrandList = this.brandListToAdd.map(x => x.BrandCategoryMappingId);
          console.log('this.selectedBrandList : ', this.selectedBrandList);
        });

      });
    }
  }

  onClose() {
    this.onCloseEvent.emit();
  }

  onSelectCategory() {
    this.subcategoryList = [];
    if (this.selectedCategory) {
      console.log('this.selectedCategory: ', this.selectedCategory);
      console.log('this.selectedCategory: ', this.selectedCategory);
      this.storeService.getSubCategoryList(this.selectedCategory).subscribe(x => {
        this.subcategoryList = x;
      });
    } else {

    }
  }

  onSelectSubCategory() {
    
    this.brandList = [];
    if (this.selectedSubCategoryList && this.selectedSubCategoryList.length > 0) {
      let subCatString = this.selectedSubCategoryList.join(",");
      this.storeService.getBrand(subCatString).subscribe(x => {
        this.brandList = x;
      });
    } else {

    }
  }

  onSelectBrand() {
    

    console.log(this.selectedBrandList);

    if (this.selectedBrandList && this.selectedBrandList.length > 0) {
      this.isShowPopup = false;
      let brandString = this.selectedBrandList.join(",");

      this.storeService.getBrandToDisplay(brandString).subscribe(x => {

        this.brandListToAdd = x;
        if (this.brandListToAdd && this.brandListToAdd.length > 0) {
          this.brandListToAdd.forEach(x => {
            x.IsSelected = true;
          });
        }
        this.isShowPopup = true;
      });
    }
  }

  onSelectDeselect(brand: StoreBrandDc) {
    brand.IsSelected = !brand.IsSelected;
  }

  save() {
    this.isOwnerSelected = true;
    if (this.frm.invalid) {
      this.isFormInvalid = true;
    } else if (!this.store.OwnerId) {
      this.isOwnerSelected = false;
    } else {
      this.isFormInvalid = false;

      this.confirmationService.confirm({
        message: 'Are you sure that you want to save the changes?',
        accept: () => {
          this.updateBrandList();
          this.storeService.saveStore(this.store).subscribe(x => {
            this.onSave.emit();
          });
        }
      });

    }
  }

  getPeopleList(event) {
    let query = event.query;
    console.log('query is: ', query);
    // this.subject.next(query);

    this.storeService.getPeopleList(query).subscribe(x => {
      this.peopleList = x;
    });
  }

  onSelectPeople() {
    this.store.OwnerId = this.selectedOwner.PeopleId;
    this.isOwnerSelected = true;
  }

  onDeselectOwner(){
    this.selectedOwner = null;
    this.store.OwnerId = null;
  }

  private updateBrandList() {
    
    if (this.selectedBrandList && this.selectedBrandList.length > 0) {
      this.store.BrandList = [];

      this.brandListToAdd.forEach(x => {
        if (x.IsSelected) {
          let brand: StoreBrandViewModel = {
            BrandCategoryMappingId: x.BrandCategoryMappingId,
            Id: x.Id,
            IsActive: true,
            IsDeleted: false,
            StoreId: this.store.Id
          };

          this.store.BrandList.push(brand);
        } else if (x.Id > 0 && x.IsSelected !== true) {
          let brand: StoreBrandViewModel = {
            BrandCategoryMappingId: x.BrandCategoryMappingId,
            Id: x.Id,
            IsActive: false,
            IsDeleted: true,
            StoreId: this.store.Id
          };
          this.store.BrandList.push(brand);
        }

      });
    }
  }

  private getSelectedOwner() {
    if (this.store && this.store.OwnerId) {
      this.storeService.getOwnerById(this.store.OwnerId).subscribe(x => {
        this.selectedOwner = x;
        console.log(this.selectedOwner )
      });
    }
  }

  openSalesLead(){
    this.storeService.getWarehouseStoreMapping(this.storeId).subscribe(map=>{
      debugger;
      this.whSelectedList = map;
    })
    this.isOpenSalesLead = true;
  }
  onChangeWh(WarehouseId){
    this.storeService.getOwnerBGetWarehouseWiseSaleLeadyId(WarehouseId).subscribe(warehouseList => {
      debugger
      this.warehouseSalesLeadList = warehouseList;
    }); 
  }
  addList(WarehouseId,SalesLeadId){
    let obj={
      WarehouseId : WarehouseId,
      StoreId : this.storeId,
      SalesLeadId : SalesLeadId,
      Active : true
    }
    let data = [];
    data.push(obj);
    this.storeService.postWarehouseStoreMapping(data).subscribe(x=>{
      debugger;
      alert(x["Message"]);
        if(x.Status == true){
          this.WarehouseId = null;
          this.SalesLeadId = null;
        this.storeService.getWarehouseStoreMapping(this.storeId).subscribe(map=>{
          debugger;
          this.whSelectedList = map;
        })
      }
    })
  
  }
  openEdit(ir){    
    if(!this.previousEdit || this.previousEdit.isEdit == ir.isEdit){
      this.onChangeWh(ir.WarehouseId);
      ir.isEdit = true;
      this.previousEdit = ir;
    }
    if(this.previousEdit.isEdit != ir.isEdit){
      // ir.isEdit = false;
      this.onChangeWh(ir.WarehouseId);
      this.previousEdit.isEdit = false;
      ir.isEdit = true;
      this.previousEdit = ir;
    }
    debugger;
   
  }
  editSalesLead(rowData){
    if(rowData.SalesLeadId != ""){
      let data={
        Id : rowData.Id,
        WarehouseId : rowData.WarehouseId,
        StoreId : this.storeId,
        SalesLeadId : rowData.SalesLeadId,
        Active : rowData.IsActive
      }
      debugger;
      this.storeService.pUTtWarehouseStoreMapping(data).subscribe(putData=>{
        debugger;
        if(putData.Status == true){
          alert(putData["Message"]);
          this.previousEdit = null;
          this.openSalesLead();
        }
       
      })
    }else{
      alert('Select Sales Lead!');
    }
  }
  deleteSalesLead(rowData){
    this.storeService.deleteWarehouseStoreMapping(rowData.Id).subscribe(putData=>{
      // debugger;
      if(putData.Status == true){
        this.isOpenSalesLead = false;
        alert(putData["Message"]);
        this.openSalesLead();
      }
    })
  }

}

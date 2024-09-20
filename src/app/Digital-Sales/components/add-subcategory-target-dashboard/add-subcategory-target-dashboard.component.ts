import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { FormsModule } from '@angular/forms';
import { DynamicGrid } from 'app/Digital-Sales/digital.module';
import { exportdata } from 'app/Digital-Sales/digital.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { SubCatTarget } from 'app/shared/interface/CompanyTarget/company-target';
import { getDate } from 'date-fns';
@Component({
  selector: 'app-add-subcategory-target-dashboard',
  templateUrl: './add-subcategory-target-dashboard.component.html',
  styleUrls: ['./add-subcategory-target-dashboard.component.scss']
})
export class AddSubcategoryTargetDashboardComponent implements OnInit {
  Cityid: any;
  CityList: any[];
  SubCategoryList: any[];
  AddRecord: any;
  AddRecordList: any;
  blocked: boolean;
  isInvalid: boolean;
  StartDate: any;
  EndDate: any;
  showsection: boolean;
  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  BrandList: any;
  selectedBrand: any;
  RewardItemList: any;
  SubCatItemList: any;
  disablefield: boolean;
  displayBasic: boolean;
  displayModal: boolean;
  selectedelement: any;
  
  //exportdata:Array<exportdata> = [];

  constructor(private cityservice: CityService,
    private subcategoryservice: SubCategoryService,
    private digitalsaleService: DigitalSaleService,
    private SubSubCategoryService: SubSubCategoryService,
    private confirmationService: ConfirmationService) {
    this.AddRecord = {};
  }
  ngOnInit() {
    this.AddRecord.CityId = "";
    this.AddRecord.SubCategoryId = "";
    this.AddRecord.StartDate = new Date();
    this.AddRecord.StartDate = new Date(this.AddRecord.StartDate.setHours(0, 0, 0, 0));
    this.AddRecord.EndDate = new Date();
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
    });
    
  }

  
  GetSubCat() {
    this.SubCategoryList = null;
    this.subcategoryservice.GetAllSubCategory().subscribe(result => {
      this.SubCategoryList = result;
    })
  }

  CheckRecord(AddRecord) {
    if (this.AddRecord.CityId > 0 && this.AddRecord.SubCategoryId > 0) {
      this.showsection = true;
      this.disablefield = true;
      this.digitalsaleService.CheckIfExist(AddRecord).subscribe(result => {
        if (result) { alert("Record already exits"); } else {
          this.GetBrandBySubCategoryId(AddRecord.SubCategoryId);
          if (AddRecord.SubCategoryId > 0) {
            this.GetRewardItem();
            this.GetItem();
            this.addRow(undefined);
          }
        }
      });
    } else {
      alert("Select City and Subcate");
      return true;
    }
  }

  GetBrandBySubCategoryId(SubCategoryId) {
    this.SubSubCategoryService.GetSubSubCategoryBySubCategoryId(SubCategoryId).subscribe(result => {
      this.BrandList = result;
    });
  }
  GetRewardItem() {
    this.digitalsaleService.getRewardItemItem().subscribe(result => {
      this.RewardItemList = result;
    });
  }
  GetItem() {
    let id = this.AddRecord.CityId;
    this.digitalsaleService.getItembasedonCitySuCatTarget(id, this.AddRecord.SubCategoryId).subscribe(result => {
      this.SubCatItemList = result;
    });
  }
  addRow(index) {
    this.newDynamic = { Level: "" };
    if (this.dynamicArray.length <= 4) {
      this.dynamicArray.forEach(element => {
        
        if (element.SlabLowerLimit == this.newDynamic.SlabLowerLimit && element.SlabUpperLimit == this.newDynamic.SlabUpperLimit) {
          alert("already exits");
        }
      });
      if (this.dynamicArray.length == 0) {
        this.newDynamic.Level = 1;
      } else {
        this.newDynamic.Level = this.dynamicArray.length + 1;
      }

      this.dynamicArray.push(this.newDynamic);
    }
    else {
      if (this.dynamicArray.length > 4) {
        alert("Can't add more than 5 Slab");
        return true;
      }
    }

    return true;
  }
  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
    }
  }

  postdatatable() {
    
    let d = this.dynamicArray;
    let obj: exportdata = {
      CityId: this.AddRecord.CityId,
      SubCategoryId: this.AddRecord.SubCategoryId,
      StartDate: this.AddRecord.StartDate,
      EndDate: this.AddRecord.EndDate,
      SubCatTargetDetails: this.dynamicArray
    }

    this.digitalsaleService.PostSubCatTarget(obj).subscribe(x => {
      alert(x);
      window.location.reload();
    });
  }
  showBasicDialog(element) {
    this.selectedelement = []
    
    this.selectedelement = element;
    this.displayBasic = true;
  }

  brandChangeEvent(event: boolean) {
    alert(event);
  }
}

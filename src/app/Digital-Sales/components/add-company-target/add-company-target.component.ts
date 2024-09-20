import { Component, OnInit } from '@angular/core';
import { SubCatTarget } from 'app/shared/interface/CompanyTarget/company-target';
import { CityService } from 'app/shared/services/city.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { FormsModule } from '@angular/forms';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company-target',
  templateUrl: './add-company-target.component.html',
  styleUrls: ['./add-company-target.component.scss']
})
export class AddCompanyTargetComponent implements OnInit {
  isInvalid: boolean;
  companyTarget: SubCatTarget;
  CityList: any[];
  SubCategoryList: any[];
  BrandList: any[];
  SelectBrandIds:any[];
  minimumDate:any;
  constructor(private cityservice: CityService,
    private subcategoryservice: SubCategoryService,
    private brandService: SubSubCategoryService,
    private digitalsaleService: DigitalSaleService,
    private router: Router) { 
    }

  ngOnInit() {
    var lastDate= new Date();
    lastDate.setDate(lastDate.getDate() + 7);
    this.companyTarget = {
      CityId: 0,
      Id: 0,
      StartDate: new Date(),
      EndDate:  lastDate,
      SubCatId: 0,
      subCatTargetBrands: [],
      IsCustomerSpacific:false,
    }
  
    this.minimumDate=new Date();
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
    });
    this.SubCategoryList = null;
    this.subcategoryservice.GetAllSubCategory().subscribe(result => {
      this.SubCategoryList = result;
    })
  }

  AddBrand() { 
    //debugger;   
    if(this.companyTarget.CityId==0)
    {
      alert("select City");
      return false;
    }
    else if(this.companyTarget.SubCatId==0)
    {
      alert("select SubCategory ");
      return false;
    }   
    let strBrandIds='';
    this.companyTarget.subCatTargetBrands.forEach(function (subCatTargetBrand) {  
       if(subCatTargetBrand.BrandIds)
       {
        strBrandIds +=  strBrandIds? ','+ subCatTargetBrand.BrandIds:subCatTargetBrand.BrandIds;
       } 
    }); 
    
    if(this.companyTarget.subCatTargetBrands.length>0 && 
      (this.companyTarget.subCatTargetBrands[this.companyTarget.subCatTargetBrands.length-1].BrandIds=="" 
      || this.companyTarget.subCatTargetBrands[this.companyTarget.subCatTargetBrands.length-1].BrandIds==null))
    {
     alert("Please select atleast one brand.");
     return false;
    }
    else if(this.companyTarget.subCatTargetBrands.length>0 && this.companyTarget.subCatTargetBrands[this.companyTarget.subCatTargetBrands.length-1].SubCatTargetDetails.length==0)
    {
      alert("Please select atleast one level for brand.");
      return false;

    }

    if(strBrandIds && this.BrandList && this.BrandList.length>0)
    {
      let newBrandList=this.BrandList;
      strBrandIds.split(",").forEach(function (id) {  
        let index = newBrandList.findIndex(d => d.SubsubCategoryid ===Number(id)); //find index in your array
        if(index>-1)
        {
        newBrandList.splice(index, 1);
        }
      });  
      this.BrandList = newBrandList;
    }
    if(this.BrandList && this.BrandList.length>0)
    {
      this.companyTarget.subCatTargetBrands.push({
        Id: 0,
        BrandIds: null,
        SubCatTargetDetails: []
      });
    }
  }

  GetBrand(){
    this.companyTarget.subCatTargetBrands=[];
    this.BrandList = null;
    this.brandService.GetBrandBySubCategoryId(this.companyTarget.SubCatId).subscribe(result => {
      this.BrandList = result;
    })
  }

  SaveData(){
    if(this.companyTarget.StartDate>=this.companyTarget.EndDate)
    {
      alert("Start Date greater then EndDate.");
        return false;
    }
    this.digitalsaleService.PostSubCatTarget(this.companyTarget).subscribe(response => {
      alert(response.message);
      if(response.status)
      {
        window.location.reload();
      }
    });

  }
  
  WriteLog()
  {
   console.log(JSON.stringify(this.companyTarget));
  }

  brandChangeEvent(event: boolean) {
    alert(event);
  }
  back(){
    this.router.navigateByUrl("layout/digitalsales/CustomerTargetList")
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerRetention } from 'app/shared/interface/CustomerRetention/Customer-Retention';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';

@Component({
  selector: 'app-customer-retention-configuration',
  templateUrl: './customer-retention-configuration.component.html',
  styleUrls: ['./customer-retention-configuration.component.scss']
})
export class CustomerRetentionConfigurationComponent implements OnInit {
  CustomerType: any[];
  isInvalid: boolean;
  customerretention: CustomerRetention;
  minimumDate:any;
  constructor(
    private digitalsaleService: DigitalSaleService,
    private router: Router) { 
    }

  ngOnInit() 
  {

    this.CustomerType= [ { Id:1, Type:"High"},{Id:2, Type:"Mid"},{Id:3, Type:"Low"}];

    var lastDate= new Date();
    lastDate.setDate(lastDate.getDate() + 7);
    this.customerretention = {
      CustomerType: null,
      CustomerRetentionConfigDetails:[]
    }
    this.minimumDate=new Date();
  }

  AddDays() {   
        
    let strBrandIds='';
    this.customerretention.CustomerRetentionConfigDetails.forEach(function (CustomerRetentionConfigDetails) {  
       if(CustomerRetentionConfigDetails)
       {
        //strBrandIds +=  strBrandIds? ','+ subCatTargetBrand.BrandIds:subCatTargetBrand.BrandIds;
       } 
    }); 
    
    // if(this.customerretention.CustomerRetentionConfigDetails.length>0 && 
    //   (this.customerretention.CustomerRetentionConfigDetails[this.customerretention.CustomerRetentionConfigDetails.length-1].BrandIds=="" 
    //   || this.customerretention.CustomerRetentionConfigDetails[this.customerretention.CustomerRetentionConfigDetails.length-1].BrandIds==null))
    // {
    //  alert("Please select atleast one brand.");
    //  return false;
    // }
    // else if(this.companyTarget.subCatTargetBrands.length>0 && this.companyTarget.subCatTargetBrands[this.companyTarget.subCatTargetBrands.length-1].SubCatTargetDetails.length==0)
    // {
    //   alert("Please select atleast one level for brand.");
    //   return false;

    // }

    // if(strBrandIds && this.BrandList && this.BrandList.length>0)
    // {
    //   let newBrandList=this.BrandList;
    //   strBrandIds.split(",").forEach(function (id) {  
    //     let index = newBrandList.findIndex(d => d.SubsubCategoryid ===Number(id)); //find index in your array
    //     if(index>-1)
    //     {
    //     newBrandList.splice(index, 1);
    //     }
    //   });  
    //   this.BrandList = newBrandList;
    // }
    // if(this.BrandList && this.BrandList.length>0)
    // {
    //   this.companyTarget.subCatTargetBrands.push({
    //     Id: 0,
    //     BrandIds: null,
    //     SubCatTargetDetails: []
    //   });
    // }
  }

  SaveData(){
    
    // if(this.customerretention.CustomerRetentionConfigDetails>=this.customerretention.CustomerRetentionConfigDetails)
    // {
    //   alert("Start Date greater then EndDate.");
    //     return false;
    // }
    // this.digitalsaleService.PostSubCatTarget(this.customerretention).subscribe(response => {
    //   alert(response.message);
    //   if(response.status)
    //   {
    //     window.location.reload();
    //   }
    // });
  }
  
  WriteLog()
  {
   console.log(JSON.stringify(this.customerretention));
  }

  brandChangeEvent(event: boolean) {
    alert(event);
  }
  back(){
    this.router.navigateByUrl("layout/digitalsales/CustomerTargetList")
  }
}

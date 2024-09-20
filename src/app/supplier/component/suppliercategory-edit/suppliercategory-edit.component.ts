import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SupplierCategoryService } from 'app/shared/services/suppliercategory.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-suppliercategory-edit',
  templateUrl: './suppliercategory-edit.component.html',
  styleUrls: ['./suppliercategory-edit.component.scss']
})
export class SuppliercategoryEditComponent implements OnInit {
  @Input() SupplierCaegoryDetails: number;
  suppliercategory: any; 
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 

  constructor( private messageService : MessageService,private suppliercategoryservice: SupplierCategoryService, private router: Router) { this.suppliercategory = {}; }

  ngOnInit() {
   // this.isInvalid = false;
    if (this.SupplierCaegoryDetails) {
      this.suppliercategory=this.SupplierCaegoryDetails;
      console.log(this.SupplierCaegoryDetails)
      // this.suppliercategoryservice.SupplierCategoryGetByID(this.SupplierCaegoryDetails.SupplierCaegoryId).subscribe(result => {
      //   this.suppliercategory = result;
      //   console.log('GetByID: ', this.suppliercategory);
      // });
    }
 
  }

  update(suppliercategoryEditForm: any) {
    console.log('suppliercategoryEditForm: ', suppliercategoryEditForm);
    if (suppliercategoryEditForm.form.status == "VALID") {
      if (this.SupplierCaegoryDetails == null) {
        this.suppliercategoryservice.addSupplierCategory(this.suppliercategory).subscribe(result => {
          this.router.navigateByUrl('layout/supplier/suppliercategory');
          this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
          // this.expanded = false;
        },
          (err) => {
           // alert("error")
           this.messageService.add({severity:'error', summary: 'Error!', detail:''});
          });
      } else {
        this.suppliercategoryservice.UpdateArea(this.suppliercategory).subscribe(result => {
          //this.router.navigateByUrl('layout/supplier/suppliercategory');
          this.refreshParent.emit(false);
          this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
          // this.expanded = false;
        },
          (err) => {
           // alert("error")
           this.messageService.add({severity:'error', summary: 'Error!', detail:''});
          });
      }
    }else{
      this.isInvalid = true;
      this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
    }
   

  }



  // onclick(){
  //   console.log(this.country)
  //   this.countryservice.UpdateCountry(this.country).subscribe(result => {
  //     alert("Country Updated");
  //    // this.expanded = false;
  //   },
  //   (err)=>{
  //     alert("error")

  //   });
  // }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/supplier/suppliercategory');
  
  }


  // // updateCountryData() {
  // //   if (this.country) {
  // //     this.country.CreatedDate = this.country.CreatedDate ? new Date(this.country.CreatedDate) : null;

  // //   }
  // // }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CountryService } from 'app/shared/services/country.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {
  @Input() CountryId: number;
  country: any;
  peopleList: any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 

  constructor(private countryservice: CountryService, private router: Router, private messageService : MessageService) { this.country = {}; }

  ngOnInit() {
    this.isInvalid = false;
    if (this.CountryId) {
      console.log(this.CountryId)
      // this.countryservice.CountryGetByID(this.CountryId).subscribe(result => {
      //   this.country = result;
      //   this.country.CreatedDate = this.country.CreatedDate ? new Date(this.country.CreatedDate) : null;

      //   console.log('GetByID: ', this.country);
      // });
    }
    this.countryservice.ManagerName().subscribe(result => {
      this.peopleList = result;

    })

if(this.CountryId)
{
  this.country=this.CountryId;
}

  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }

  update(countryEditForm: any) {
    console.log('countryEditForm: ', countryEditForm);
    if (countryEditForm.form.status == "VALID") {
      if (this.CountryId == null) {
        this.countryservice.addCountry(this.country).subscribe(result => {

          if(result !="Already Exists"){
            this.router.navigateByUrl('layout/admin/country');
            this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
          }else{
            this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
          }
           // this.expanded = false;
          },

        // //   this.router.navigateByUrl('layout/admin/country');
        // //   this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
        // //   // this.expanded = false;
        // // },
          (err) => {
         //   alert("error")
            this.messageService.add({severity:'error', summary: 'Error!', detail:''});
          });
      } else {
        this.countryservice.UpdateCountry(this.country).subscribe(result => {
          console.log('this.CountryIsasasasasaad    : ',this.CountryId);


          if(result !="Already Exists"){
            this.router.navigateByUrl('layout/admin/country');
            this.refreshParent.emit();
            this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
          }else{
            this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
          }
           // this.expanded = false;
          },

        // // //  // this.router.navigateByUrl('layout/admin/country');
        // // //  this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
        // // //   this.refreshParent.emit(false);
        // // //   // this.expanded = false;
        // // // },
          (err) => {
         //   alert("error")
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
    this.router.navigateByUrl('layout/admin/country');
  
  }


  // // updateCountryData() {
  // //   if (this.country) {
  // //     this.country.CreatedDate = this.country.CreatedDate ? new Date(this.country.CreatedDate) : null;

  // //   }
  // // }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CityService } from 'app/shared/services/city.service';
import { ZoneService } from 'app/shared/services/zone.service';
import { CountryService } from 'app/shared/services/country.service';
import { PeopleService } from 'app/shared/services/people.service';
import { MessageService } from 'primeng/api';
import { GooglePlaceService } from 'app/shared/services/google-place.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {
  @Input() Cityid: any;
  city: any;
  peopleList: any;
  stateList: any;
  zoneList: any;
  countryList: any;
  CityName: string;

  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  cityKeyword: string;
  cityList: any[];
  selectedCity: any;

  constructor(private cityservice: CityService
    , private peopleservice: PeopleService
    , private messageService: MessageService
    , private countryservice: CountryService
    , private zoneservice: ZoneService
    , private router: Router
    , private googlePlaceService: GooglePlaceService) { this.city = {}; }

  ngOnInit() {

    //   if(this.Cityid){
    //     this.city = this.Cityid;

    //   console.log(this.Cityid)
    //   this.cityservice.CityGetByID(this.Cityid).subscribe(result => {
    //     this.city = result;
    //   //  this.city.DOB = this.city.DOB ? new Date(this.city.DOB) : null;
    //     this.city.CreatedDate = this.city.CreatedDate ? new Date(this.city.CreatedDate) : null;
    //     console.log('GetByID: ', this.city);

    //   });
    // }
// debugger;
    if (this.Cityid) {
      this.city = this.Cityid;
      if(this.city.CityName != null){
        this.isClearCity = false;
      }else{
        this.isClearCity = true;
      }
    }
    // this.cityservice.ManagerName().subscribe(result=>{
    //   this.peopleList=result;
    // })

    this.peopleservice.GetAll().subscribe(result => {
      this.peopleList = result;
    })


    this.cityservice.StateManagerName().subscribe(result => {
      this.stateList = result;
    })
    // this.cityservice.ZoneManagerName().subscribe(result=>{
    //   this.zoneList=result;
    // })
    this.zoneservice.GetAllZone().subscribe(result => {
      this.zoneList = result;
    })

    // this.cityservice.CountryManagerName().subscribe(result=>{
    //   this.countryList=result;
    // })
    this.countryservice.GetAllCountry().subscribe(result => {
      this.countryList = result;
    })

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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

  update(cityEditForm: any) {
    console.log('cityEditForm: ', cityEditForm);
    if (cityEditForm.form.status == "VALID") {
      if (this.Cityid == null) {
        if (this.CityName == this.CityName) {
          // this.messageService.add({ severity: 'error', summary: 'City Already Exist!', detail: '' });
debugger;
          this.cityservice.addCity(this.city).subscribe(result => {
            debugger;
            if(result.Msg == 'City Already Exist!'){
              this.messageService.add({ severity: 'error', summary: result.Msg, detail: '' });
            }else{
              this.router.navigateByUrl('layout/admin/city');
              this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
            }          
            // this.expanded = false;
          },
            (err) => {
              // alert("error")

              this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
            });
        }
      } else {
        debugger;
        this.cityservice.UpdateCity(this.city).subscribe(result => {
          console.log(this.Cityid);
          if(result.Msg == 'City Already Exist!'){
            this.messageService.add({ severity: 'error', summary: result.Msg, detail: '' });
          }else{
            this.router.navigateByUrl('layout/admin/city');
            this.refreshParent.emit();
  
            this.messageService.add({ severity: 'success', summary: 'Update Successfully!', detail: '' });
          }          
          // this.expanded = false;
        },
          (err) => {
            //alert("error")
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          });
      }

    } else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }


  }






  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/admin/city');
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  //#region city related methods 
  getcityList(autocompleteEvent: any) {
    debugger;
    if (!this.cityKeyword) {
      alert('please enter city name and search');
      return;
    }
    // alert('this.cityKeyword:'+ this.cityKeyword)
    this.googlePlaceService.GetCityList(this.cityKeyword).subscribe(x => {
      debugger;
      this.cityList = x;     
      autocompleteEvent.handleDropdownClick();
      console.log('this.cityList', this.cityList);
    });

  }

  selectCity(event) {
    this.selectedCity = event;
    this.city.CityName = event.structured_formatting.main_text;
    this.city.CityPlaceId = event.place_id;
    this.googlePlaceService.GetAddressByPlaceId(this.selectedCity.place_id).subscribe(y => {
      debugger;
      this.city.CityLatitude = y.results[0].geometry.location.lat;
      this.city.CityLongitude = y.results[0].geometry.location.lng;
    })
    debugger;
    // this.customer.ShippingCity = this.selectedCity.description
    // this.cplaceid = this.selectedCity.place_id
    //alert('selectcityid'+this.cplaceid)
    console.log('selectCity: ', event);

  }
  isClearCity : boolean = false;
  clearCity() {
    this.city.CityName = null;
    this.cityKeyword = null;
    this.isClearCity = true;
  }

}

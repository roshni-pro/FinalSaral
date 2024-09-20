import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GooglePlaceService } from 'app/shared/services/google-place.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { ConfirmationService } from 'primeng/api';
import { ShippingAddressInput } from '../interface/shipping-address-input';

@Component({
  selector: 'app-shiiping-address-entry',
  templateUrl: './shiiping-address-entry.component.html',
  styleUrls: ['./shiiping-address-entry.component.scss']
})
export class ShiipingAddressEntryComponent implements OnInit {

  @Input() customerId: number;
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onUpdate: EventEmitter<ShippingAddressInput> = new EventEmitter<ShippingAddressInput>();
  @Input() customer: any;
  
  visible: boolean = true;
  customerAddress: ShippingAddressInput;
  customerAddressToView: ShippingAddressInput;
  
  cityKeyword: string;
  cityList: any[];
  selectedCity: any;
  
  areaKeyword: string;
  areaList: any[];
  selectedArea: any;
  
  addressKeyword: string;
  addressList: any[];
  selectedAddress: any;

  constructor(private googlePlaceService: GooglePlaceService
    , private confirmationService: ConfirmationService
    , private loaderService: LoaderService) { }

  ngOnInit() {
    this.getCustomer();
  }


  getCustomer() {
    this.googlePlaceService.GetCustomer(this.customerId).subscribe(x => {
      this.customerAddress = x;
      this.customerAddressToView = JSON.parse(JSON.stringify(this.customerAddress)); 
      console.log(' this.customerAddresssdsdsdsd:', this.customerAddress);

      if (this.customerAddress && this.customerAddress.AddressPlaceId && this.customerAddress.AddressText) {
        this.selectedArea = {
          description: this.customerAddress.AddressText,
          place_id: this.customerAddress.AddressPlaceId
        };
      }else{
        this.clearAddress();
      }
      
      
      if (this.customerAddress && this.customerAddress.AreaPlaceId && this.customerAddress.AreaText) {
        this.selectedArea = {
          description: this.customerAddress.AreaText,
          place_id: this.customerAddress.AreaPlaceId
        };
      }else{
        this.clearArea();
        this.clearAddress();
      }

      

      if (this.customerAddress && this.customerAddress.CityName && this.customerAddress.CityPlaceId) {
        this.selectedCity= {
          description: this.customerAddress.CityName,
          place_id: this.customerAddress.CityPlaceId
        };
      }else{
        this.clearCity();
        this.clearArea();
        this.clearAddress();
      }

    });
  }
  hide() {
    this.onCancel.emit(true);
  }


  async updateAddress() {
    if (this.customerAddress && this.customerAddress.CityName 
      && this.customerAddress.AreaText && this.customerAddress.AreaPlaceId
      && this.customerAddress.AddressText && this.customerAddress.AddressPlaceId
      && this.customerAddress.ZipCode) {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: async () => {
          this.loaderService.loading(true);
          if (await this.setAreaLatLng()) {
            if (await this.setAddressLatLng()) {

            } else {
              return;
            }
          } else {
            return;
          }
          this.onUpdate.emit(this.customerAddress);
        }
      });


    } else {
      alert('please select address properly');
    }
  }
  cancel() {
    this.onCancel.emit(true);
  }

  //#region city related methods 
  getcityList(autocompleteEvent: any) {
    if(!this.cityKeyword){
      alert('please enter city name and search');
      return;
    }
    // alert('this.cityKeyword:'+ this.cityKeyword)
    this.googlePlaceService.GetCityList(this.cityKeyword).subscribe(x => {
      this.cityList = x;
      autocompleteEvent.handleDropdownClick();  
      console.log('this.cityList', this.cityList);
    });

  }

  selectCity(event) {
    this.selectedCity = event;
    this.customerAddress.CityName = event.structured_formatting.main_text;
    this.customerAddress.CityPlaceId = this.selectedCity.place_id; 
    // this.customer.ShippingCity = this.selectedCity.description
    // this.cplaceid = this.selectedCity.place_id
    //alert('selectcityid'+this.cplaceid)
    console.log('selectCity: ', event);

  }

  ClearShipCity() {
    this.clearCity();
    this.clearArea();
    this.clearAddress();
  }
  //#endregion


  //#region area related methods
  getarea(areaAutoCompleteEvent: any) {

    if (!this.selectedCity || !this.selectedCity.place_id) {
      this.customerAddress.CityName = null;
      alert('select city first');
      return;
    }
    this.googlePlaceService.GetArea(this.areaKeyword, this.selectedCity.place_id).subscribe(y => {
      this.areaList = y;
      areaAutoCompleteEvent.handleDropdownClick();  
      console.log('arealist', this.areaList);
    })

  }
  selectArea(event, cplaceid) {
    this.selectedArea = event;
    this.customerAddress.AreaText = this.selectedArea.description;
    this.customerAddress.AreaPlaceId = this.selectedArea.place_id;
    // this.ShippingArea = this.selectedArea.description
    // this.areaplaceid = this.selectedArea.place_id
    // console.log('selectArea: ', event);
  }

  ClearShipArea() {
    this.clearArea();
    this.clearAddress();
  }
  //#endregion


  //#region address related methods
  getaddress(addressautocompleteEvent: any) {
    if (!this.selectedArea || !this.selectedArea.place_id) {
      this.clearArea();
      alert('select area first');
      return;
    }

    this.googlePlaceService.GetAddress(this.addressKeyword, this.customerAddress.AreaPlaceId).subscribe(y => {
      this.addressList = y;
      addressautocompleteEvent.handleDropdownClick();  
      console.log('addresslist', this.addressList);
    })

  }
  async selectAddress(event) {
    this.selectedAddress = event;
    this.customerAddress.AddressText = this.selectedAddress.description;
    this.customerAddress.AddressPlaceId = this.selectedAddress.place_id;
    this.setAddressLatLng();
    console.log('selectArea: ', event);
  }


  ClearShipAddress() {
    this.clearAddress();
  }

  //#endregion



  //#region  common methods
  clearAddress() {
    this.addressKeyword =null;
    this.customerAddress.AddressLat = null;
    this.customerAddress.AddressLng = null;
    this.customerAddress.AddressPlaceId = null;
    this.customerAddress.AddressText = null;
    this.customerAddress.ZipCode = null;

  }

  clearArea() {
    this.areaKeyword = null;
    this.customerAddress.AreaLat = null;
    this.customerAddress.AreaLng = null;
    this.customerAddress.AreaPlaceId = null;
    this.customerAddress.AreaText = null;

  }

  clearCity() {
    this.customerAddress.CityName = null;
    this.cityKeyword = null;

  }


  async setAreaLatLng(): Promise<boolean> {
    let areaFullAddress = await this.googlePlaceService.GetAddressByPlaceId(this.customerAddress.AreaPlaceId).toPromise();
    console.log('areaFullAddress: ', areaFullAddress);
    if (areaFullAddress
      && areaFullAddress.results
      && areaFullAddress.results.length > 0
      && areaFullAddress.results[0].geometry
      && areaFullAddress.results[0].geometry.location
      && areaFullAddress.results[0].geometry.location.lat
      && areaFullAddress.results[0].geometry.location.lng) {

      this.customerAddress.AreaLat = areaFullAddress.results[0].geometry.location.lat;
      this.customerAddress.AreaLng = areaFullAddress.results[0].geometry.location.lng;
      return true;
    }
    else {
      return false;
    }
  }

  async setAddressLatLng(): Promise<boolean> {
    let addressFullAddress = await this.googlePlaceService.GetAddressByPlaceId(this.customerAddress.AddressPlaceId).toPromise();

    console.log('addressFullAddress: ', addressFullAddress);
    if (addressFullAddress
      && addressFullAddress.results
      && addressFullAddress.results.length > 0
      && addressFullAddress.results[0].geometry
      && addressFullAddress.results[0].geometry.location
      && addressFullAddress.results[0].geometry.location.lat
      && addressFullAddress.results[0].geometry.location.lng) {

      this.customerAddress.AddressLat = addressFullAddress.results[0].geometry.location.lat;
      this.customerAddress.AddressLng = addressFullAddress.results[0].geometry.location.lng;
      this.getAddressZipcode(addressFullAddress);
      return true;
    }
    else {
      return false;
    }

  }

  getAddressZipcode(fullAddress: any) {
    if (fullAddress
      && fullAddress.results
      && fullAddress.results.length > 0
      && fullAddress.results[0].address_components
      && fullAddress.results[0].address_components.length > 0) {
      let zip = fullAddress.results[0].address_components.filter(x => {
        return x.types.indexOf("postal_code") > -1;
      });
      console.log('zip: ', zip);
      if (zip && zip.length > 0) {
        this.customerAddress.ZipCode = zip[0].long_name;
      }

    }
  }
  //#endregion

}

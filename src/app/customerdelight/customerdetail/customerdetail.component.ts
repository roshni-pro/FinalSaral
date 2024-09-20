import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripTouchPoint } from 'app/operation-capacity/interface/trip-touch-point';
import { environment } from 'environments/environment';
import { DelightService } from '../delight.service';
import { MapsAPILoader, MouseEvent, ControlPosition, FullscreenControlOptions } from '@agm/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
declare var $: any;
declare const google: any;

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.scss']
})
export class CustomerdetailComponent implements OnInit {

  @Input() CustomerId: any;
  @Input() SelectedStatus: any;
  customer: any;
  blocked: boolean;
  latlong: any;
  newlatlong: any;
  shoplatlong: any;
  todaytracklatlong: any;
  // billingAddresslatlong : any;
  isOpenBillingAddress: boolean = false;
  baseURL: any;
  addData: any;
  CaptureImagePath: any;
  GSTImage: any;
  RegistrationImage: any;
  IsbuttonShow: boolean;
  CityName: any;

  source: TripTouchPoint;
  myInnerHeight = window.innerHeight - 100;
  zoom: number = 13;
  public origin: any;
  public shopOrigin: any;
  public todayTrackingOrigin: any;
  public billingAddressOrigin: any;
  getTodayLatLng: any;
  expectedWaypoints: any[];
  billingAddressOriginPoint: any[];
  actualWaypoints: any[];
  actualDestination: any;
  actualOrigin: any;
  showMap: boolean;
  showMarker: boolean;
  isTodayTrack: boolean = false;
  isOpenTodayTrack: boolean = false;
  selectedValues: string[] = [];
  isUpdateLatLng: boolean = false;
  isIsUpdateAddress: boolean = false;
  distanceShopShip: any;
  distanceShopTrack: any;
  distanceShipTrack: any;
  //#region direction options
  icon = '/assets/img/logo/truck/1.png';
  waypointMarker = '/assets/img/logo/marker_pointer.png';
  shopwaypointMarker = '/assets/img/logo/green.png';
  todayTrackwaypointMarker = '/assets/img/logo/red.png';
  billingaddresspointMarker = '/assets/img/logo/green.png';
  public renderOptions = {
    suppressMarkers: true,
    suppressInfoWindows: false,
    waypoints: {
      icon: '/assets/img/logo/dot.png',
      label: '',
      infoWindow: 'Waypoint',
      opacity: 0.5,
    }
  };

  public markerOptions = {
    origin: {
      infoWindow: 'Origin.',
      icon: '',
    },
    // waypoints: {
    //   infoWindow: '',
    //   icon: '',
    // },
    destination: {
      infoWindow: 'Destination',
      icon: '',
    },
  };
  lat: number = 0;
  lng: number = 0;
  private geoCoder;
  fullscreenControl: boolean;;
  public searchControl: FormControl;
  @ViewChild("search", null)
  public searchElementRef: ElementRef;
  autocomplete: any;
  options: FullscreenControlOptions;///22jan
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() custTracking: boolean;
  @Input() detail: any;
  Nodocument: boolean = false;
  Comment: any;
  public defaultCenter: any;
  public currentCenter: any;
  userLocationMarkerAnimation: string;
  selectedValue: any;


  constructor(private route: ActivatedRoute, private router: Router, private _service: DelightService,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private confirmationService: ConfirmationService) {
    this.customer = {};
    this.addData = {};
    this.baseURL = environment.apiURL + '/UploadedImages/';
  }

  ngOnInit() {
    this.baseURL = environment.apiURL + '/UploadedImages/';
    // this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.searchControl = new FormControl();
    // this.geoCoder = new google.maps.Geocoder;
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => this.setPlace());
      });
    });
    if (this.CustomerId != 0) {
      this.blocked = true;
      // debugger;
      this._service.GetCustomerByID(this.CustomerId, this.detail.Id).subscribe(res => {
       // debugger
        this.customer = res;
        if (this.customer != null) {
          if (this.customer.Nodocument == true) {
            this.Nodocument = this.customer.Nodocument;
            this.Comment = this.customer.Comment;
          }
        }
        if (res.CustomerStatus == "Reject" || res.CustomerStatus == "Verified" || res.CustomerStatus == "Pending") {
          this.IsbuttonShow = false;
        }
        else {
          this.IsbuttonShow = true;
        }
        this.latlong = res.lat + ",   " + res.lg;
        this.newlatlong = res.Newlat + ",   " + res.Newlg;
        this.shoplatlong = ((res.Shoplat != null ? res.Shoplat : 0) + ",   " + (res.Shoplg != null ? res.Shoplg : 0));

        if ((res.Shoplat != null && res.Shoplat != 0) && (res.lat != null && res.lat != 0)) {

          this.distanceShopShip = this.distance(res.Shoplat, res.Shoplg, res.lat, res.lg) * 1.60934;
        }

        if ((res.Shoplat != null && res.Shoplat != 0) && (res.Newlat != null && res.Newlat != 0)) {
          this.distanceShopTrack = this.distance(res.Shoplat, res.Shoplg, res.Newlat, res.Newlg) * 1.60934;
        }

        if ((res.lat != null && res.lat != 0) && (res.Newlat != null && res.Newlat != 0)) {
          this.distanceShipTrack = this.distance(res.lat, res.lg, res.Newlat, res.Newlg) * 1.60934;
        }

       
        if (this.customer.lat > 0 && this.customer.lg > 0) {

          this.selectedValue = "ShipLatLg";

        }
        else if (this.customer.Shoplat > 0 && this.customer.Shoplg > 0 && this.customer.lat == 0 && this.customer.lg == 0) {
          this.selectedValue = "ShopLatLg";

        }
        else if (this.customer.Newlat > 0 && this.customer.Newlg > 0 && this.customer.Shoplat == 0 && this.customer.Shoplg == 0 && this.customer.lat == 0 && this.customer.lg == 0) {

          this.selectedValue = "trackLatLg";
        }



        // debugger;;;
        this.customer.Active = res.Active == true ? 1 : 0;
        this.CaptureImagePath = res.CaptureImagePath;
        this.GSTImage = res.GSTImage;
        this.RegistrationImage = res.UploadRegistration;
        if(this.RegistrationImage == null){
          this.RegistrationImage = null;
        }
        if (this.customer.CaptureImagePath != null && this.customer.CaptureImagePath.indexOf('http') == -1) {
          this.CaptureImagePath = this.baseURL + this.customer.CaptureImagePath;
        }
        else {
          this.CaptureImagePath = this.customer.CaptureImagePath;
        }
        this.CityName = res.City;
        this.blocked = false;
        this.expectedWaypoints = [];
        this.shopOrigin = { lat: Number(res.Shoplat ? res.Shoplat.toFixed(6) : 0), lng: Number(res.Shoplg ? res.Shoplg.toFixed(6) : 0) };
        this.origin = { lat: Number(res.lat.toFixed(6)), lng: Number(res.lg.toFixed(6)), };
        // Shoplat:  Number(res.Shoplat.toFixed(6)), Shoplg: Number(res.Shoplg.toFixed(6))};
        // debugger;
        let objs = {
          location: { lat: Number(res.Newlat.toFixed(6)), lng: Number(res.Newlg.toFixed(6)) },
          // originLocation :  { lat: Number(res.lat.toFixed(6)), lng: Number(res.lg.toFixed(6)) }
        }
        this.expectedWaypoints.push(objs);
        // debugger;
        // this.getGeoLocation(res.BillingAddress);        
        this.customer.BillingAddress = res.BillingAddress;                    
        this.getLatLong(res.BillingAddress);
        this._service.getCustomerLocations(this.CustomerId).subscribe(x => {
          // debugger;
          if (x != null) {
            this.getTodayLatLng = x;
            this.getAddressForTodayTrack(x.lat, x.lg);
            this.todaytracklatlong = (x.lat ? x.lat : 0) + ",   " + (x.lg ? x.lg : 0);
            this.todayTrackingOrigin = { lat: Number(x.lat ? x.lat.toFixed(6) : 0), lng: Number(x.lg ? x.lg.toFixed(6) : 0) };
            this.defaultCenter = { lat: Number(x.lat ? x.lat.toFixed(6) : 0), lng: Number(x.lg ? x.lg.toFixed(6) : 0) };
            this.currentCenter = Object.assign({}, this.defaultCenter);
          } else {
            this.todaytracklatlong = 0 + ",   " + 0;
            this.todayTrackingOrigin = { lat: Number(0), lng: Number(0) };
          }
        })
      })
    }
  }
  setPlace() {
    debugger;
    let place = this.autocomplete.getPlace();
    if (place.geometry) {
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      this.newlatlong = this.lat + ",   " + this.lng;
      this.expectedWaypoints = [];
      let objs = {
        location: { lat: Number(this.lat.toFixed(6)), lng: Number(this.lng.toFixed(6)) },
        // originLocation :  { lat: Number(res.lat.toFixed(6)), lng: Number(res.lg.toFixed(6)) }
      }
      this.expectedWaypoints.push(objs);
      this.getAddress(this.lat, this.lng);
    }

  }
  Reject() {
    if (!this.Nodocument) {
      this.Comment = null;
    }
    debugger;
    // if(this.Nodocument && this.Comment != null || !this.Nodocument && this.Comment == null){      
    let data = {
      Nodocument: this.Nodocument,
      Comment: this.Comment,
      CustomerId: this.CustomerId,
      Id: this.customer.Id ? this.customer.Id : 0
    }
    console.log('object', data);
    this._service.Reject(data).subscribe(res => {
      alert("Request Rejected");
      this.addData = {};
      this.close.emit();
      this.router.navigateByUrl('layout/customerdelight/customerTracking');
    })
    // }else{
    //   if(this.Nodocument && this.Comment == null){
    //     alert('Comment is Mandatory!!!');
    //   }
    // }
  }

  Verified() {

    debugger;
    if (this.customer.CustomerType == "" || this.customer.CustomerType == undefined || this.customer.CustomerType == null) {
      alert("CustomerType is Required");
      return;
    }
    if (this.customer.Skcode == "") {
      alert("Skcode is Required");
      return;
    }
    if (this.customer.ShopName == "") {
      alert("ShopName is Required");
      return;
    }
    if (this.customer.Name == "") {
      alert("Customer Name is Required");
      return;
    }
    if (this.customer.Mobile == "") {
      alert("MobileNo is Required");
      return;
    }
    if (this.customer.ShippingAddress == "") {
      alert("Address is Required");
      return;
    }
    if (this.customer.AreaName == "" || this.customer.AreaName == null) {
      alert("AreaName is Required");
      return;
    }
    if (this.CityName == "" || this.CityName == null) {
      alert("City is Required");
      return;
    }
    if (this.customer.State == "" || this.customer.State == null) {
      alert("State is Required");
      return;
    }
    if (this.customer.ZipCode == "" || this.customer.ZipCode == null) {
      alert("ZipCode is Required");
      return;
    }
    if (this.customer.BillingAddress == "") {
      alert("BillingAddress is Required");
      return;
    }
    if (this.customer.BillingAddress1 == "" || this.customer.BillingAddress1 == null) {
      alert("BillingArea is Required");
      return;
    }
    if (this.customer.BillingCity == "" || this.customer.BillingCity == null) {
      alert("BillingCity is Required");
      return;
    }
    if (this.customer.BillingState == "" || this.customer.BillingState == null) {
      alert("BillingState is Required");
      return;
    }
    if (this.customer.BillingZipCode == "" || this.customer.BillingZipCode == null) {
      alert("BillingZipCode is Required");
      return;
    }
    if (!this.Nodocument) {
      this.Comment = null;
    }

    // if(this.Nodocument && this.Comment != null || !this.Nodocument && this.Comment == null){       
    this.addData.CustomerId = this.customer.CustomerId;
    this.addData.Address = this.customer.ShippingAddress;
    this.addData.City = this.CityName;
    this.addData.State = this.customer.State;
    this.addData.ZipCode = this.customer.ZipCode;
    this.addData.AreaName = this.customer.AreaName;
    if (this.selectedValue == "ShipLatLg") {
      this.addData.Newlat = this.customer.lat;
      this.addData.Newlg = this.customer.lg;

    }
    else if (this.selectedValue == "ShopLatLg") {
      this.addData.Newlat = this.customer.Shoplat;
      this.addData.Newlg = this.customer.Shoplg;

    }
    else if (this.selectedValue == "trackLatLg") {
      this.addData.Newlat = this.customer.Newlat;
      this.addData.Newlg = this.customer.Newlg;
    }

    this.addData.Nodocument = this.Nodocument;
    this.addData.Comment = this.Comment;
    this.addData.Id = this.customer.Id ? this.customer.Id : 0;
    this.addData.BillingAddress = this.customer.BillingAddress;
    this.addData.BillingCity = this.customer.BillingCity;
    this.addData.BillingState = this.customer.BillingState;
    this.addData.BillingZipCode = this.customer.BillingZipCode;
    this.addData.BillingAddress1 = this.customer.BillingAddress1;
    this.addData.CustomerType = this.customer.CustomerType;

    // this.addData.Newlat = this.lat == 0 ? this.customer.Newlat : this.lat;
    // this.addData.Newlg = this.lng == 0 ? this.customer.Newlg : this.lng;
    // if (this.isTodayTrack == true) {
    //   this.addData.Newlat = this.todayTrackingOrigin.lat;
    //   this.addData.Newlg = this.todayTrackingOrigin.lng;
    //   this.addData.Address = this.customer.TodayTrackAddress;
    //   this.customer.NewShippingAddress = this.customer.TodayTrackAddress;
    // }
    // if (this.isUpdateLatLng == true) {
    //   this.addData.Newlat = this.todayTrackingOrigin.lat;
    //   this.addData.Newlg = this.todayTrackingOrigin.lng;
    // }
    // if (this.isIsUpdateAddress == true) {
    //   this.addData.Address = this.customer.TodayTrackAddress;
    //   this.customer.NewShippingAddress = this.customer.TodayTrackAddress;
    // }


    if (this.customer.Active == "1") {
      this.addData.IsActive = true;
    }
    else {
      this.addData.IsActive = false;
    }
    debugger;
    this.addData.CustomerVerify = this.customer.CustomerVerify;
    console.log('addData', this.addData);
    debugger
    this._service.Verified(this.addData).subscribe(res => {
      alert("Verified Successfully");
      this.addData = {};
      this.close.emit();
      // this.router.navigateByUrl('layout/customerdelight/customerTracking');
    })
    // }else{
    //   if(this.Nodocument && this.Comment == null){
    //     alert('Comment is Mandatory!!!');
    //   }
    // }
  }
  openImage(img) {

    window.open(this.baseURL + img);
  }
  openShopImage(img) {

    window.open(img);
  }

  openRegistrationImage(img) {
    window.open(this.baseURL + img);
  }
  Back() {
    this.addData = {};
    this.close.emit();
    // this.router.navigateByUrl('layout/customerdelight/customerTracking');
  }
  markerDragEnd(lat, lng, $event: MouseEvent) {
    debugger;
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    // this.latlong = res.lat + ",   " + res.lg;
    this.newlatlong = this.lat + ",   " + this.lng;
    this.expectedWaypoints = [];
    let objs = {
      location: { lat: Number(this.lat.toFixed(6)), lng: Number(this.lng.toFixed(6)) },
      // originLocation :  { lat: Number(res.lat.toFixed(6)), lng: Number(res.lg.toFixed(6)) }
    }
    this.expectedWaypoints.push(objs);
    this.getAddress(this.lat, this.lng);
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(this.lat, this.lng);
    const request = {
      latLng: latlng
    };

    // geocoder.geocode(request, (results, status) => {
    // this.tournament.venue.address = results[0].formatted_address;
    //     console.log('1sddd:' +  results[0].formatted_address);
    // });
  }
  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          console.log('1sddd:' + results[0].formatted_address);
          this.customer.NewShippingAddress = results[0].formatted_address;
          // this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  getAddressForTodayTrack(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          console.log('1sddd:' + results[0].formatted_address);
          this.customer.TodayTrackAddress = results[0].formatted_address;
          // this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  getAddressForBilling(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          console.log('1sddd:' + results[0].formatted_address);
          this.customer.UpdatedBillingAddress = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  resetAllTracking() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this._service.removeAllCustomerLocations(this.CustomerId).subscribe(x => {
          debugger;
          this.close.emit();
        })
      }
    })

  }
  onClickTodayTrackForUpdate(lat, lng) {
    this.isOpenTodayTrack = true;
  }
  onClickBillingAddressForUpdate(lat, lng) {
    this.isOpenBillingAddress = true;
  }
  onClickConfirmation(selectedValues) {
    console.log('selectedValues', selectedValues);
    if (selectedValues.length == 0) {
      alert('Select Atleast One Option');
    } else {
      this.isOpenTodayTrack = false;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {

          if (selectedValues.length == 2) {
            this.isTodayTrack = true;
            this.isUpdateLatLng = false;
            this.isIsUpdateAddress = false;
            this.customer.NewShippingAddress = this.customer.TodayTrackAddress;
            this.newlatlong = this.todaytracklatlong;
          } else if (selectedValues == 'todaytracklatlong') {
            this.isUpdateLatLng = true;
            this.isTodayTrack = false;
            this.isIsUpdateAddress = false;
            this.newlatlong = this.todaytracklatlong;
          } else if (selectedValues == 'customer.TodayTrackAddress') {
            this.isIsUpdateAddress = true;
            this.isTodayTrack = false;
            this.isUpdateLatLng = false;
            this.customer.NewShippingAddress = this.customer.TodayTrackAddress;
          }
          this.newlatlong = this.todayTrackingOrigin.lat + ",   " + this.todayTrackingOrigin.lng;
        }, reject: () => {
          this.isTodayTrack = false;
          this.isUpdateLatLng = false;
          this.isIsUpdateAddress = false;
          this.selectedValues = [];
        }
      })
    }
  }
  mapReading() {
    this.userLocationMarkerAnimation = 'BOUNCE';
  }
  billingAddresslatlong: any;
  isBillingAddress: boolean = false;
  getLatLong(address) {
    debugger;
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'address': address }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        this.isBillingAddress = true;
        if (results[0]) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          this.billingAddresslatlong = (latitude ? latitude : 0) + ",   " + (longitude ? longitude : 0);
          this.billingAddressOrigin = { lat: Number(latitude ? latitude.toFixed(6) : 0), lng: Number(longitude ? longitude.toFixed(6) : 0) };
          this.billingAddressOriginPoint = [];
          let objs = {
            location: { lat: Number(latitude.toFixed(6)), lng: Number(longitude.toFixed(6)) },
          }
          this.billingAddressOriginPoint.push(objs);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  //   getGeoLocation(address: string): Observable<any> {
  //     console.log('Getting address: ', address);
  //     let geocoder = new google.maps.Geocode();
  //     return Observable.create(observer => {
  //         geocoder.geocode({
  //             'address': address
  //         }, (results, status) => {
  //           debugger;
  //             if (status == google.maps.GeocoderStatus.OK) {
  //                 observer.next(results[0].geometry.location);
  //                 observer.complete();
  //             } else {
  //                 console.log('Error: ', results, ' & Status: ', status);
  //                 observer.error();
  //             }
  //         });
  //     });
  // }
  // initializeLatLongByAddress(address) {
  //   debugger;
  //   var geocoder = new google.maps.Geocoder();
  //   var latitude = 0;
  //   geocoder.geocode( { 'address': address}, function(results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       var res = results[0];
  //       if(res.geometry){
  //         latitude = res.geometry.location.lat();
  //         var longitude = res.geometry.location.lng();          
  //       }
  //       // alert(latitude);
  //     } 
  //     // this.billingAddresslatlong = latitude;
  //   });  
  //   this.billingAddresslatlong = latitude;
  // }

  distance(lat, lg, newlat, newlg) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = newlat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (lg - newlg) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }
}

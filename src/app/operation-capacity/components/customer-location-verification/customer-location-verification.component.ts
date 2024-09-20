import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerLocationDiffDc } from 'app/operation-capacity/interface/customer-location-diff-dc';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
// import {} from '@types/googlemaps';
import { MapsAPILoader } from "@agm/core";
import { environment } from 'environments/environment';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-customer-location-verification',
  templateUrl: './customer-location-verification.component.html',
  styleUrls: ['./customer-location-verification.component.scss']
})
export class CustomerLocationVerificationComponent implements OnInit {

  @Input() warehouseId: number;
  @Input() warehouseList: any[];

  @Output() close: EventEmitter<any> = new EventEmitter();
  isVisible: boolean = true;
  customerList: any[];
  selectedCustomer: any;
  isCustomerSelected: boolean = false;
  customerLocationDiff: CustomerLocationDiffDc;

  showMap: boolean = false;
  zoom: number = 10;
  myInnerHeight = window.innerHeight - 200;
  // baseUrl = environment.apiImageUrl;
  newMarker = {
    url: '/assets/img/logo/orange.png', // url
    scaledSize: {
      width: 22,
      height: 30
    }
  };
  actualMarker = '/assets/img/logo/marker_pointer.png';
  warehouseMarker = '/assets/img/logo/wh.png';
  distanceInKmBetweenPoint: number;
  distanceBetweenNewPointAndWarehouse: number;
  distanceBetweenOldPointAndWarehouse: number;
  public renderOptions = {
    suppressMarkers: true,
    suppressInfoWindows: false,
    waypoints: {
      icon: '/assets/img/logo/dot.png',
      label: '',
      infoWindow: 'Waypoint',
      opacity: 0,
    }
  };
  origin: any;
  destination: any;
  constructor(private deliveryDashboardService: DeliveryDashboardService
    , private mapsAPILoader: MapsAPILoader
    , private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.searchCustomers();
  }
  hide() {
    this.close.emit();
  }

  onChangeHub() {
    this.deSelectCustomer();
    this.searchCustomers();
  }

  searchCustomers() {
    // console.log('$event is: ', event.query);
    this.deliveryDashboardService.getCustomerList(this.warehouseId).subscribe(res => {
      this.customerList = res;
    });
  }

  onSelectCustomer() {
    // console.log(event);
    if (this.selectedCustomer) {
      this.isCustomerSelected = true;
      this.deliveryDashboardService.getCustomerLocation(this.selectedCustomer.CustomerId).subscribe(x => {
        console.log('data isssss: ', x);
        this.customerLocationDiff = x;
        this.distanceInKmBetweenPoint =this.getDistanceBetween(this.customerLocationDiff.CustomerTableLatitude, this.customerLocationDiff.CustomerTableLongitude, this.customerLocationDiff.UploadImageLatitude, this.customerLocationDiff.UploadImageLongitude);
        this.distanceBetweenNewPointAndWarehouse = this.getDistanceBetween(this.customerLocationDiff.UploadImageLatitude, this.customerLocationDiff.UploadImageLongitude, this.customerLocationDiff.WarehouseLatitude, this.customerLocationDiff.WarehouseLongitude);
        this.distanceBetweenOldPointAndWarehouse = this.getDistanceBetween(this.customerLocationDiff.CustomerTableLatitude, this.customerLocationDiff.CustomerTableLongitude, this.customerLocationDiff.WarehouseLatitude, this.customerLocationDiff.WarehouseLongitude);
        this.origin = { lat: Number(this.customerLocationDiff.CustomerTableLatitude.toFixed(6)), lng: Number(this.customerLocationDiff.CustomerTableLongitude.toFixed(6)) };
        this.destination = { lat: Number(this.customerLocationDiff.UploadImageLatitude.toFixed(6)), lng: Number(this.customerLocationDiff.UploadImageLongitude.toFixed(6)) };
        this.showMap = true;
      });
    } else {
      this.selectedCustomer = false;
    }
  }

  deSelectCustomer() {
    this.isCustomerSelected = false;
    this.selectedCustomer = null;
    this.customerLocationDiff = null;
    this.showMap = false;
  }

  getDistanceBetween(lat1, long1, lat2, long2): number {

    if (lat1 && long1 && lat2 && long2) {
      var from = new google.maps.LatLng(lat1, long1);
      var to = new google.maps.LatLng(lat2, long2);

      var distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      distance = parseFloat((distance / 1000).toFixed(2));
      return distance;
    }else{
      return -1;
    }
  }


  changeLocation() {
    if (this.customerLocationDiff.CustomerUnloadLocationId) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          //Actual logic to perform a confirmation
          this.deliveryDashboardService.changeCustomerLocation(this.selectedCustomer.CustomerId, this.customerLocationDiff.CustomerUnloadLocationId).subscribe(res => {
            if (res) {
              alert('Location changed successfully');
              this.onSelectCustomer();
            } else {
              alert('Location not changed');
            }
          })
        }
      });

      // this.customerLocationDiff.CustomerUnloadLocationId = null;
    } else {
      alert('nothing have to update');
    }
  }

  removeLocation() {
    if (this.customerLocationDiff.CustomerUnloadLocationId) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          //Actual logic to perform a confirmation
          this.deliveryDashboardService.RemoveCustomerUnloadLocation(this.customerLocationDiff.CustomerUnloadLocationId).subscribe(res => {
            if (res) {
              alert('Location removed successfully');
              this.onSelectCustomer();
            } else {
              alert('Location not removed');
            }
          })
        }
      });

      // this.customerLocationDiff.CustomerUnloadLocationId = null;
    } else {
      alert('nothing have to update');
    }
  }

  openImage(){
    // window.open(this.baseUrl + this.customerLocationDiff.ImagePath, '_blank');
  }
}




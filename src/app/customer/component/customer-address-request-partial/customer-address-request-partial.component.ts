import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerAddressRequestVM } from 'app/shared/interface/customer-address-request-vm';
import { CustomerAddressRequestService } from 'app/shared/services/customer-address-request.service';
import { ConfirmationService } from 'primeng/api';
declare var $: any;
declare const google: any;

@Component({
  selector: 'app-customer-address-request-partial',
  templateUrl: './customer-address-request-partial.component.html',
  styleUrls: ['./customer-address-request-partial.component.scss']
})
export class CustomerAddressRequestPartialComponent implements OnInit {
  @Output() onHide = new EventEmitter<boolean>();
  display: boolean = true;
  @Input() selectedData : CustomerAddressRequestVM;
  myInnerHeight = window.innerHeight - 400;
  zoom: number = 13;
  public origin: any;
  lat: number = 0;
  lng: number = 0;
  fullscreenControl: boolean;;
  expectedWaypoints: any[];
  public markerOptions = {
    origin: {
      infoWindow: 'Origin.',
      icon: '',
    }
  };
  icon = '/assets/img/logo/truck/1.png';
  waypointMarker = '/assets/img/logo/marker_pointer.png';
  distance : any;
  blocked: boolean = false;
  constructor(private confirmationService: ConfirmationService,private customerAddressRequestService: CustomerAddressRequestService) { }

  ngOnInit() {
    debugger;
    this.selectedData;
    this.expectedWaypoints = [];
    // this.shopOrigin = { lat: Number(res.Shoplat ? res.Shoplat.toFixed(6) : 0), lng: Number(res.Shoplg ? res.Shoplg.toFixed(6) : 0) };
    this.origin = { lat: Number(this.selectedData.CustomerLat != null ? this.selectedData.CustomerLat.toFixed(6) : 0), lng: Number(this.selectedData.CustomerLng != null ? this.selectedData.CustomerLng.toFixed(6) : 0),};
    let objs = {
      location: { lat: Number(this.selectedData.NewLat ? this.selectedData.NewLat.toFixed(6) : 0), lng: Number(this.selectedData.NewLng ? this.selectedData.NewLng.toFixed(6) : 0) },
    }
    this.expectedWaypoints.push(objs);
      // Calculate and display the distance between markers
      if(this.selectedData.CustomerLat != null && this.selectedData.NewLat != null)
      {
        this.distance = (this._distanceBtwMarkers(this.selectedData.CustomerLat,this.selectedData.NewLat).toFixed(2));
      }    
  }

  hideThis(){
    this.onHide.emit(true);
  }
  _distanceBtwMarkers(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1 * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2 * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2-mk1) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }
  onApprove(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approve this request?',
      accept: () => {
        this.blocked = true;
        this.customerAddressRequestService.onApprove(this.selectedData).subscribe(x=>{          
          this.blocked = false;
          this.onHide.emit();
        })
      }
    })

  }
  onReject(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject this request?',
      accept: () => {
        this.blocked = true;
        this.customerAddressRequestService.onReject(this.selectedData).subscribe(x=>{          
          this.blocked = false;
          this.onHide.emit();
        })
      }
    })
  }

}

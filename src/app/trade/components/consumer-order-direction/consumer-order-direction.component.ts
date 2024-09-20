import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-consumer-order-direction',
  templateUrl: './consumer-order-direction.component.html',
  styleUrls: ['./consumer-order-direction.component.scss']
})
export class ConsumerOrderDirectionComponent implements OnInit {
  isShowDialog: boolean;
  @Input() location: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  lat: number = 22.7196;
  lng: number = 75.8577;
  zoom: number = 13;
  origin: any;
  destination: any;
  wayPoint: any;
  icon = '/assets/img/logo/truck/';
  myInnerHeight = window.innerHeight - 200;
  public renderOptions = {
    suppressMarkers: false,
    suppressInfoWindows: false,
    waypoints: {
      icon: '/assets/img/logo/dot.png',
      label: '',
      opacity: 0.5,
    },
    polylineOptions: { strokeColor: '#FF0000' } 
  };
  public markerOptions = {
    origin: {
      infoWindow: 'Origin.',
      icon: '',
    },
    destination: {
      infoWindow: 'Destination',
      icon: this.icon,
    },
  };

  constructor() { }

  ngOnInit() {

    console.log('location is: ', this.location);
    this.isShowDialog = true;
    this.lat =this.location.sellerLat;
    this.lng = this.location.sellerLng ;
    this.origin =  {   lat: this.location.sellerLat, lng: this.location.sellerLng };
    this.destination ={   lat: this.location.buyerLat, lng: this.location.buyerLng };
  }

  onCloseDialog(){
    this.close.emit(false);
  }

}

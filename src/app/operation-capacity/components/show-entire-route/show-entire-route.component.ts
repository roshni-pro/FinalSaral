import { Component, Input, OnInit } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-show-entire-route',
  templateUrl: './show-entire-route.component.html',
  styleUrls: ['./show-entire-route.component.scss']
})
export class ShowEntireRouteComponent implements OnInit {

  @Input() locationsList: any[];
  constructor() {


  }

  ngOnInit() {
    console.log('this.locationsList:', this.locationsList);
    if (this.locationsList != null && this.locationsList.length > 0) {
      let i=0;
      this.locationsList.forEach(item => {
        setTimeout(() => {
          // this.getReverseGeocodingData(item.location.lat, item.location.lng);  
        }, 1000*(i+++1));
        
      });
    }
  }


  getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        alert(status);
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        var address = (results[0].formatted_address);
        console.log('results[0].formatted_address:', results[0].formatted_address);
      }
    });
  }

}

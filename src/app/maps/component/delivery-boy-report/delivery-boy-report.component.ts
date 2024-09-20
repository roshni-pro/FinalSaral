import { Component, OnInit, OnChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SignalRService } from '../../../shared/services/signal-r.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { SalesAppCounterService } from 'app/shared/services/sales-app-counter.service';
declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-delivery-boy-report',
  templateUrl: './delivery-boy-report.component.html',
  styleUrls: ['./delivery-boy-report.component.scss']
})
export class DeliveryBoyReportComponent implements OnInit, OnDestroy {
  icon = '/assets/img/logo/truck/';
  maxIcon = 11;
  warehouseIcon = '/assets/img/logo/wh.png'
  private connection: any;
  private proxy: any;
  map: any;
  markers: marker[];
  allMarkers: marker[];
  myInnerHeight = window.innerHeight - 200;
  warehouseList: any[];
  selectedTarget: any;
  followMarker: any;
  // google maps zoom level
  zoom: number = 13;
  // initial center position for the map
  permission: any;
  selectedWarehouseId: number;

  lat: number = 22.7196;
  lng: number = 75.8577;
  public origin: any;
  public destination: any;

  fromDate: Date;
  toDate: Date;
  wayPoint: any[];
  isShowDirection: boolean;

  //#region direction options
  public renderOptions = {
    suppressMarkers: false,
    suppressInfoWindows: false,
    waypoints: {
      icon: '/assets/img/logo/dot.png',
      label: '',
      opacity: 0.5,
    }
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
  //#endregion


  constructor(private signalrService: SignalRService
    , private ref: ChangeDetectorRef
    , private warehouseService: WarehouseService
    , private salesAppCounterService: SalesAppCounterService) {


  }

  ngOnInit() {
    this.isShowDirection = false;
    this.markers = [
    ]
    this.followMarker = '';
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
      this.selectedWarehouseId = this.warehouseList[0].WarehouseId;
      console.log('result is:', result);
      this.filterWarehouse();
      this.salesAppCounterService.getInitialPoint(this.selectedWarehouseId).subscribe(pointList => {

        console.log('pointList: ', pointList);
        if (pointList && pointList.length) {
          let counter = 0;

          pointList.forEach(item => {
            counter = ((counter) % (this.maxIcon) + 1);
            this.markers.push({
              draggable: false,
              icon: this.icon + counter + '.png',
              lat: item.lat,
              lng: item.Long,
              label: (item.PeopleFirstName ? (item.PeopleFirstName + ' ') : '') + (item.PeopleLastName ? (item.PeopleLastName + ' ') : '') + (item.Mobile ? ('(' + item.Mobile + ')') : ''),
              id: item.SalesPersonId
            });


          });
        }

        this.allMarkers = JSON.parse(JSON.stringify(this.markers));

        this.initializeSignalRConnection();


      });


    });
    this.getDirection();
  }

  ngOnDestroy() {
    this.stopSignalRConnection();
  }

  private filterWarehouse() {
    if (this.warehouseList && this.warehouseList.length > 0) {
      var warehouses = this.warehouseList.filter(element => {
        return element.latitude && element.longitude;
      });
    }
    if (warehouses && warehouses.length > 0) {
      if (!this.allMarkers) {
        this.allMarkers = [];
      }
      warehouses.forEach(item => {
        this.allMarkers.push({
          draggable: false,
          icon: this.warehouseIcon,
          lat: item.latitude,
          lng: item.longitude,
          label: item.WarehouseName,
          id: item.WarehouseId
        });
      });

    }
  }

  onChangeWarehouse() {
    this.followMarker = '';
    this.allMarkers = [];
    this.markers = [];
    this.filterWarehouse();
    this.salesAppCounterService.getInitialPoint(this.selectedWarehouseId).subscribe(pointList => {

      console.log('pointList: ', pointList);
      if (pointList && pointList.length) {
        let counter = 0;
        pointList.forEach(item => {
          counter = ((counter) % (this.maxIcon) + 1);
          this.markers.push({
            draggable: false,
            icon: this.icon + counter + '.png',
            lat: item.lat,
            lng: item.Long,
            label: item.Mobile,
            id: item.SalesPersonId
          });


        });
      }

      this.allMarkers = JSON.parse(JSON.stringify(this.markers));
      this.changeWarehouseLatLong();
      this.isShowDirection = false;

    });
  }

  changeWarehouseLatLong() {
    let warehouse = this.warehouseList.filter(x => { return x.WarehouseId == this.selectedWarehouseId })[0];
    if (warehouse.latitude && warehouse.longitude) {
      this.lat = warehouse.latitude;
      this.lng = warehouse.longitude;
    } else if (this.allMarkers != null && this.allMarkers.length > 0) {
      this.lat = this.allMarkers[0].lat;
      this.lng = this.allMarkers[0].lng;
    }
  }

  onChangeFollowTarger() {
    if (this.followMarker != '') {
      console.log('this.followMarker:', this.followMarker);
      this.lat = this.followMarker.lat;
      this.lng = this.followMarker.lng;

      this.markers = this.allMarkers.filter(element => {
        return element.label == this.followMarker.label;
      });

      this.fromDate = new Date();
      let frmDate = moment(this.fromDate).format('YYYY-MM-DD');

      this.salesAppCounterService.getSalesPersonPoints(this.followMarker.id, frmDate, frmDate).subscribe(result => {
        console.log('result is : ', result);
        this.wayPoint = [];
        if (result != null && result.length > 0) {
          result.forEach(item => {
            this.wayPoint.push({
              location: { lat: Number(item.lat), lng: Number(item.Long) },
              stopover: false,

            })
          });

          console.log('this.wayPoint: ', this.wayPoint);
          this.origin = { lat: this.wayPoint[0].location.lat, lng: this.wayPoint[0].location.lng };
          this.destination = { lat: this.wayPoint[this.wayPoint.length - 1].location.lat, lng: this.wayPoint[this.wayPoint.length - 1].location.lng };
          this.markerOptions.destination.icon = this.followMarker.icon;
        }
        this.isShowDirection = true;
      });

    } else {
      this.markers = this.allMarkers;
      this.isShowDirection = false;
    }



  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };

    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }


  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  public initializeSignalRConnection(): void {
    let signalRServerEndPoint = environment.apiURL + '/signalr';
    this.connection = $.hubConnection(signalRServerEndPoint);
    this.proxy = this.connection.createHubProxy('chatHub');

    this.salesAppCounterService.permissions().subscribe(permission => {
      this.permission = permission;
      console.log('permissions are: ', permission);
      if (permission.Permissions == 'HQ Master login') {

        this.proxy.on('broadcastMessage', (serverMessage) => this.onMessageReceived(serverMessage));
      } else {

        this.proxy.on('addChatMessage', (serverMessage) => this.onMessageReceived(serverMessage));

      }
      this.ref.detectChanges();
    })
    this.connection.start().done((data: any) => {
      if (this.permission.Permissions != 'HQ Master login') {
        this.proxy.invoke('addToGroup', this.permission.WarehouseId)
          .catch((error: any) => {
            console.log('broadcastMessage error -> ' + error);
          });
      }
      console.log('Connected to Notification Hub');

      // this.broadcastMessage();
    }).catch((error: any) => {
      console.log('Notification Hub error -> ' + error);
    });
  }

  public stopSignalRConnection() {
    this.connection.stop();
  }

  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
  //#region lat lng methods
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)

  }


  private broadcastMessage(): void {
    this.proxy.invoke('send', 'text message', 'klkfksfskslk')
      .catch((error: any) => {
        console.log('broadcastMessage error -> ' + error);
      });
  }
  private onMessageReceived(serverMessage: string) {
    console.log('serverMessage: ', serverMessage);
    let latLong = JSON.parse(serverMessage);

    if (!this.isShowDirection && this.selectedWarehouseId == latLong.WarehouseId) {

      let truck: marker = {
        lat: latLong.lat,
        lng: latLong.Long,
        label: (latLong.PeopleFirstName ? (latLong.PeopleFirstName + ' ') : '') + (latLong.PeopleLastName ? (latLong.PeopleLastName + ' ') : '') + (latLong.Mobile ? ('(' + latLong.Mobile + ')') : ''),
        draggable: false,
        icon: this.icon,
        id: latLong.SalesPersonId
      }

      if (this.allMarkers) {
        let findTruck = this.allMarkers.filter(elem => {
          return elem.id == latLong.SalesPersonId;
        });

        if (findTruck && findTruck.length > 0) {
          findTruck[0].lat = latLong.lat;
          findTruck[0].lng = latLong.Long;
        } else {
          this.allMarkers.push(truck);
        }
      } else {
        this.allMarkers.push(truck);
      }

      this.onChangeFollowTarger();
    }
    else {
      if (latLong.SalesPersonId == this.followMarker.id) {
        this.destination = { lat: latLong.lat, lng: latLong.Long }
      }
    }
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);


  }


}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon: string;
  id: string;
}




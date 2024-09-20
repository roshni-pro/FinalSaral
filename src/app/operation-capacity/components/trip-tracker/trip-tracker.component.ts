import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripInformation } from 'app/operation-capacity/interface/trip-information';
import { TripOrderDetail } from 'app/operation-capacity/interface/trip-order-detail';
import { TripTouchPoint } from 'app/operation-capacity/interface/trip-touch-point';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
import { DBoyTrckerFirestoreService } from 'app/shared/services/dboy-trcker-firestore.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { event } from 'jquery';
import { Observable, Subscription } from 'rxjs';
let google;
import * as moment from 'moment';

@Component({
  selector: 'app-trip-tracker',
  templateUrl: './trip-tracker.component.html',
  styleUrls: ['./trip-tracker.component.scss']
})
export class TripTrackerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentLocation: any;
  warehouseId: number;
  tripList: any[];
  selectedTrip: any = null;
  tripPlannerVehicleId: number;

  touchPointList: TripTouchPoint[];
  tripInformation: TripInformation;
  source: TripTouchPoint;
  myInnerHeight = window.innerHeight - 200;
  zoom: number = 13;
  public origin: any;
  expectedWaypoints: any[];
  totalExpectedWapoint: any[];
  actualWaypoints: any[];
  actualDestination: any;
  actualOrigin: any;
  showMap: boolean;
  showMarker: boolean;
  showActualWaypoint: boolean = false;
  orderDetailList: TripOrderDetail[];
  isShowOrderDetail: boolean = false;
  //#region direction options
  icon = '/assets/img/logo/truck/1.png';
  waypointMarker = '/assets/img/logo/marker_pointer.png';
  warehouseMarker = '/assets/img/logo/wh.png';
  isRouteUpdating: boolean = false;

  shopMarker = {
    url: '/assets/img/logo/orange.png', // url
    scaledSize: {
      width: 22,
      height: 30
    } // anchor
  };

  ANIMETIONTEST = ""

  tripDate: Date;

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
  //#endregion
  actualRouteArray: any[] = [];

  //nikhil
  loadUnloadDistanceDetailPopUp: boolean = false;

  actualShopLat: any;
  actualShopLng: any;
  actualUnloadLat: any;
  actualUnloadLng: any;

  shopPosition: any;
  unloadPosition: any;


  popDetails: any;

  showActualPath: boolean = true;
  showExpectedPath: boolean = false;
  unloadMarker = {
    url: '/assets/img/logo/unload.png', // url
    scaledSize: {
      width: 22,
      height: 30
    } // anchor
  };

  selectedTripTime: number = 1; //1 for today 2 for previous
  selectedDate: Date = new Date();
  maxDate: Date = new Date();
  // unloadMarker = '/assets/img/logo/unload.png'

  constructor(private dBoyTrckerFirestoreService: DBoyTrckerFirestoreService,
    private deliveryDashboardService: DeliveryDashboardService,
    private loaderService: LoaderService, private activeRoute: ActivatedRoute, private router: Router,
    private cd: ChangeDetectorRef) {
    this.maxDate.setDate(this.maxDate.getDate() - 1);
    let warehouseId = this.activeRoute.snapshot.paramMap.get("warehouseId");
    if (warehouseId) {
      this.warehouseId = Number(warehouseId);
      this.getTripList();
    }

  }

  ngOnInit() {


  }


  getTripList() {

    this.loaderService.loading(true);
    this.tripList = null;
    if (this.selectedTripTime == 1) {
      this.deliveryDashboardService.getLiveTrips(this.warehouseId).subscribe(x => {
        this.selectedDate = new Date();
        this.tripList = x;
        console.log('trip listttt', x);
        this.loaderService.loading(false);
      });
    } else if (this.selectedTripTime == 2) {
      let date = moment(this.selectedDate).format('YYYY-MM-DD');
      this.deliveryDashboardService.getOldTrips(this.warehouseId, date).subscribe(x => {
        this.tripList = x;
        console.log('trip listttt', x);
        this.loaderService.loading(false);
      });

    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onChangeTripNo() {
    this.tripPlannerVehicleId = this.selectedTrip.TripPlannerVehicleId;
    this.actualRouteArray = [];
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.tripPlannerVehicleId) {

    }

    this.showMap = false;
    this.touchPointList = null;
    this.expectedWaypoints = [];
    this.totalExpectedWapoint = [];

    // console.log('this.selectedTripId: ', this.selectedTrip);
    this.deliveryDashboardService.getTouchPoints(this.selectedTrip.TripPlannerMasterId).subscribe(x => {
      this.touchPointList = x.TripTouchPointList;

      console.log('this.touchPointList :', this.touchPointList);
      this.tripInformation = x.tripInformation;
      console.log('this.tripInformation :',  this.tripInformation);


      if (this.tripInformation.TruckStatusId == 6) {
        this.deliveryDashboardService.getLiveTrackerTripHistory(this.selectedTrip.TripPlannerMasterId).subscribe(x => {
          // console.log('x freezed: ', x);
          this.actualWaypoints = [];
          this.showMarker = false;
          this.createActualWayPoints(x);

          // console.log('this.actualWaypoints areee: ', this.actualWaypoints);
        })
      } else {
        this.subscription = this.dBoyTrckerFirestoreService.getAllHistory(this.tripPlannerVehicleId).subscribe(data => {
          // console.log('x iixxixixi: ', data);
          this.actualWaypoints = [];
          this.showMarker = false;
          this.createActualWayPoints(data);

          // console.log('this.actualWaypoints: ', this.actualWaypoints);

        });
      }
      // console.log('list is: ', this.tripInformation);
      if (this.touchPointList && this.touchPointList.length > 0) {
        this.source = this.touchPointList.filter(x => { return x.CustomerId == 0 })[0];
        this.touchPointList = this.touchPointList.filter(x => { return x.CustomerId != 0 });
        this.updateTouchPointColorStatus();
        // this.origin = { lat: Number(this.source.Lat), lng: Number(this.source.Lng) };
        this.origin = { lat: Number(this.source.Lat.toFixed(6)), lng: Number(this.source.Lng.toFixed(6)) };

        // console.log('this.origin: ', this.origin);
        let index = 1;
        let tempTouchPointList = JSON.parse(JSON.stringify(this.touchPointList));
        tempTouchPointList = tempTouchPointList.sort((a, b) => a.RealSequenceNo - b.RealSequenceNo);
        tempTouchPointList.forEach(wp => {
          if (wp.Lat != 0 && wp.Lng != 0) {
            let obj = {
              location: { lat: Number(wp.Lat.toFixed(6)), lng: Number(wp.Lng.toFixed(6)), label: index++, obj: wp },
            }
            this.expectedWaypoints.push(obj);
          }
        })

        this.totalExpectedWapoint = JSON.parse(JSON.stringify(this.expectedWaypoints));


        this.expectedWaypoints.forEach(element => {

          if (element.location.obj.UnloadLat != null) {
            element.location.obj.UnloadLat = Number(element.location.obj.UnloadLat.toFixed(6));
            element.location.obj.UnloadLng = Number(element.location.obj.UnloadLng.toFixed(6));
          }

          let obj: any = {
            icon: {
              url: "",
              scaledSize: {
                width: 30,
                height: 35
              }
            },
            ANIMETIONTEST: ""
          }

          switch (element.location.obj.OrderStatus) {
            case "Delivered": {

              if (element.location.obj.IsSkip == false) {
                // console.log(element.location.obj.IsSkip);
                obj.icon.url = "/assets/img/logo/Delivered.png"
                Object.assign(element, obj)
                break;
              }
              else {
                // console.log(element.location.obj.IsSkip);
                obj.icon.url = "/assets/img/logo/Skip-Delivered.png"
                Object.assign(element, obj)
                break;
              }
            }
            case "Shipped": {
              if (element.location.obj.IsSkip == false) {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Shipped.png"
                Object.assign(element, obj)
                break;
              } else {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Skip-Shipped.png"
                Object.assign(element, obj)
                break;
              }

            }
            case "Delivery Canceled": {
              if (element.location.obj.IsSkip == false) {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Cancelled.png"
                Object.assign(element, obj)
                break;
              } else {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Skip-Cancelled.png"
                Object.assign(element, obj)
                break;
              }

            }
            case "Delivery Redispatch": {
              if (element.location.obj.IsSkip == false) {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Re-Dispached.png"
                Object.assign(element, obj)
                break;
              } else {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Skip-Re-Dispached.png"
                Object.assign(element, obj)
                break;
              }

            }
            case "multi": {
              if (element.location.obj.IsSkip == false) {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Multiple.png"
                Object.assign(element, obj)
                break;
              } else {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Skip-Multiple.png"
                Object.assign(element, obj)
                break;
              }

            }
            default: {
              if (element.location.obj.IsSkip == false) {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Other.png"
                Object.assign(element, obj)
                break;
              } else {
                // console.log(element.location.obj.OrderStatus);
                obj.icon.url = "/assets/img/logo/Skip-Other.png"
                Object.assign(element, obj)
                break;
              }
            }
          }
        });

        console.log('this.expectedWaypoints: ', this.expectedWaypoints);

        this.showMap = true;
      }

    })
  }
  back() {
    this.router.navigateByUrl('/layout/operation-capacity');
  }

  getTooltipData(touchPoint: TripTouchPoint) {
    let pointstatus = touchPoint.IsProcess ? 'Prcessed' : 'Not-processed';
    let orderCount = touchPoint.OrderCount;
    let totalAmount = touchPoint.TotalAmount;
    let orderStatus = touchPoint.OrderStatus == 'multi' ? 'N/A' : touchPoint.OrderStatus;
    let table: string = `<table class="tbll">
                            <tr>
                                <td>Status</td>
                                <td>${pointstatus}</td>
                            </tr>
                            <tr>
                                <td>Total Orders</td>
                                <td>${orderCount}</td>
                            </tr>
                            <tr>
                                <td>Order Status</td>
                                <td>${orderStatus}</td>
                            </tr>
                            <tr>
                                <td>Total Amount</td>
                                <td>${totalAmount}</td>
                            </tr>
                            ${touchPoint.IsSkip ? '<tr><td>Skipped Order</td><td>Yes</td></tr>' : ''}
                        </table>`;
    return table;
  }

  updateTouchPointColorStatus() {
    if (this.touchPointList && this.touchPointList.length > 0) {
      this.touchPointList.forEach(x => {
        if (x.OrderStatus) {
          let arr = x.OrderStatus.split(',');
          if (arr && arr.length == 1) {
            x.OrderStatus = arr[0];
          } else {
            x.OrderStatus = 'multi';
          }
        }
      })
    }
  }


  getHr(timeInMins) {
    let hour = Math.trunc(timeInMins / 60) + ' Hr:' + timeInMins % 60 + ' Min';
    return hour;
  }

  createActualWayPoints(data) {
    this.actualWaypoints = [];

    if (data && data.length > 0) {
      this.currentLocation = JSON.parse(JSON.stringify(data[data.length - 1]));
      setTimeout(() => {
        this.showMarker = true;
      }, 300);
    } else {
      this.currentLocation = null;
    }

    if (this.actualRouteArray && this.actualRouteArray.length > 0 && !this.isRouteUpdating) {
      if (data && data.length > 0) {
        let waypoints = [];
        data.forEach(element => {

          waypoints.push({ location: { lat: Number(element.Lat.toFixed(6)), lng: Number(element.Lng.toFixed(6)) } })
        });
        this.actualWaypoints = waypoints;
      }
      let obj = {
        destination: { lat: Number(data[data.length - 2].Lat.toFixed(6)), lng: Number(data[data.length - 2].Lng.toFixed(6)), label: 'B', obj: data[data.length - 2] },
        origin: { lat: Number(data[data.length - 1].Lat.toFixed(6)), lng: Number(data[data.length - 1].Lng.toFixed(6)), label: 'B', obj: data[data.length - 1] },
        waypoints: []
      }
      this.actualRouteArray.push(obj);
    }
    else if (!this.isRouteUpdating) {


      if (data && data.length > 0) {
        let ind = 1;
        let myData = data.map(x => {
          return { lat: x.Lat, lng: x.Lng, name: (ind++).toString() }
        });

        console.log('myData: ', JSON.stringify(myData));

        for (var i = 0, parts = [], max = 25 - 1; i < data.length; i = i + max)
          parts.push(data.slice(i, i + max + 1));

        this.actualRouteArray = [];
        let timei = 0;

        let partCount = 1;
        if (parts != null && parts.length > 0) {
          this.isRouteUpdating = true;
          parts.forEach(x => {
            let obj = {
              destination: { lat: Number(x[x.length - 1].Lat.toFixed(6)), lng: Number(x[x.length - 1].Lng.toFixed(6)), label: 'B', obj: x[x.length - 1] },
              origin: { lat: Number(x[0].Lat.toFixed(6)), lng: Number(x[0].Lng.toFixed(6)), label: 'A', obj: x[0] },
              waypoints: []
            }
            x.forEach(y => {
              obj.waypoints.push({ location: { lat: Number(y.Lat.toFixed(6)), lng: Number(y.Lng.toFixed(6)), label: '', obj: y }, stopover: false });
            });
            setTimeout(() => {
              this.actualRouteArray.push(obj);
              if (partCount++ == parts.length) {
                this.isRouteUpdating = false;
              }
            }, 1000 * timei++);

          })
          console.log('this.actualRouteArray: ', this.actualRouteArray);
        }

        console.log('parts: ', parts);
        console.log('data: ', data);
        this.actualOrigin = JSON.parse(JSON.stringify({ lat: data[0].Lat, lng: data[0].Lng }));
        this.actualDestination = JSON.parse(JSON.stringify({ lat: data[data.length - 1].Lat, lng: data[data.length - 1].Lng }));
        let skip = Math.trunc(data.length / 20);
        if (skip > 0) {
          let newData = [];
          let index = 0;
          if (skip == 1) {
            skip = 2;
          }
          skip = 1;
          while (index < data.length) {
            newData.push(data[index]);
            index = index + skip;
          }

          newData.push(data[data.length - 1]);
          data = newData;
        }
        let waypoints = [];
        data.forEach(element => {

          waypoints.push({ location: { lat: Number(element.Lat.toFixed(6)), lng: Number(element.Lng.toFixed(6)) } })
        });

        this.actualWaypoints = waypoints;
        console.log('actualWaypoints:', this.actualWaypoints);
        console.log('actualDestination:', this.actualDestination);
        console.log('actualOrigin:', this.actualOrigin);
      }
    } else {
      if (data && data.length > 0) {
        let waypoints = [];
        data.forEach(element => {

          waypoints.push({ location: { lat: Number(element.Lat.toFixed(6)), lng: Number(element.Lng.toFixed(6)) } })
        });
        this.actualWaypoints = waypoints;
      }
      console.log('Route is updating already!!!!!');
    }
  }

  onSelectWayopint(i: number) {
    this.showMap = false;

    if (i == -1) {
      this.expectedWaypoints = this.totalExpectedWapoint;
    } else {
      this.expectedWaypoints = [];

      // let obj: any = {
      //   lat: this.totalExpectedWapoint[i].location.lat,
      //   lg: this.totalExpectedWapoint[i].location.lng,

      //   animation: 'BOUNCE',

      // }

      this.expectedWaypoints.push(this.totalExpectedWapoint[i]);

    }
    this.showMap = true;
  }

  showHideActualWaypoint() {

    this.showActualWaypoint = !this.showActualWaypoint;
    let temp = this.actualRouteArray;
    this.actualRouteArray = null;
    var i = 1;
    if (this.showActualWaypoint && temp && temp.length > 0) {
      this.actualRouteArray = [];
      temp.forEach(x => {
        setTimeout(() => {
          this.actualRouteArray.push(x);
        }, 1000 * i++);
      })
    } else {
      this.actualRouteArray = temp;
    }

  }



  openTripPlannerConfirmedDetail(touchPoint: TripTouchPoint) {
    console.log('touchPoint: ', touchPoint);
    this.deliveryDashboardService.getTripOrderDetail(touchPoint.TripPlannerConfirmDtailId).subscribe(x => {
      console.log('x: ', x);
      this.orderDetailList = x;
      this.isShowOrderDetail = true;
    });
  }

  markerClicked(e, skcode) {
    console.log(e, skcode, this.source);

    // let ele = this.expectedWaypoints.filter(ele => ele.location.obj.Skcode == skcode);
    // this.expectedWaypoints.

    this.expectedWaypoints.forEach(element => {
      if (element.location.obj.Skcode == skcode) {

        element.ANIMETIONTEST = "BOUNCE"
        this.source.Lat = element.location.lat;
        this.source.Lng = element.location.lng;

        setTimeout(function () {
          element.ANIMETIONTEST = ""
        }, 2000);

      } else {
        element.ANIMETIONTEST = ""

      }
    });



  }

  resetMarker() {
    this.expectedWaypoints.forEach(element => {
      element.ANIMETIONTEST = ""
    });
  }

  showDistanceBetweenMarkers(e, wp: any) {
    this.loadUnloadDistanceDetailPopUp = true
    this.popDetails = wp;
    console.log(this.popDetails);
    this.actualShopLat = this.popDetails.location.lat
    this.actualShopLng = this.popDetails.location.lng
    this.actualUnloadLat = this.popDetails.location.obj.UnloadLat
    this.actualUnloadLng = this.popDetails.location.obj.UnloadLng

    this.shopPosition = {
      lat: this.popDetails.location.lat,
      lng: this.popDetails.location.lng
    }

    this.unloadPosition = {
      lat: this.popDetails.location.obj.UnloadLat,
      lng: this.popDetails.location.obj.UnloadLng
    }

  }

  showHideActualPath() {
    this.showActualPath = !this.showActualPath;
  }

  showHideExpectedPath() {
    this.showExpectedPath = !this.showExpectedPath;
  }

  onTripTimeChange() {
    this.selectedTrip =null;
    this.touchPointList = null;
    this.expectedWaypoints = [];
    this.totalExpectedWapoint = [];
    switch (this.selectedTripTime) {
      case 1:
        this.getTripList();
        break;
      case 2:
        this.tripList = null;
        this.selectedDate = moment().subtract(1, 'days').startOf('day').toDate();   
        this.getTripList();
        break;
    }
  }
}

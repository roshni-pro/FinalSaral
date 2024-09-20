import { Component, OnInit, OnChanges, ChangeDetectorRef, OnDestroy, EventEmitter, Output, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { ClusterService } from 'app/shared/services/cluster.service';
// import { FullscreenControlOptions, ControlPosition } from '@agm/core/services/google-maps-types';///22jan
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, FullscreenControlOptions, ControlPosition } from '@agm/core';
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window';
declare var google: any;
@Component({
  selector: 'app-view-cluster-city-map',
  templateUrl: './view-cluster-city-map.component.html',
  styleUrls: ['./view-cluster-city-map.component.scss']
})
export class ViewClusterCityMapComponent implements OnInit {
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Input() cityid: any;
  icon = '/assets/img/logo/truck/';
  maxIcon = 11;
  warehouseIcon = '/assets/img/logo/wh.png'
  private connection: any;
  private proxy: any;
  map: any;
  myInnerHeight = window.innerHeight - 100;
  warehouseList: any[];
  selectedTarget: any;
  followMarker: any;
  zoom: number = 13;

  options: FullscreenControlOptions;///22jan
  @Input() ClusterId: number;
  @Input() Id: number;
  @Input() ClusterName: any;
  @Input() WarehouseName: any;;
  @Input() WarehouseId: any;
  cluster: any;
  // ClusterName : any;
  latitude: number;
  longitude: number;
  lat: number = 22.7196;
  lng: number = 75.8577;
  public origin: any;
  public destination: any;
  showMap: boolean;

  polygon: any;

  fromDate: Date;
  toDate: Date;
  wayPoint: any[];
  isShowDirection: boolean;
  totalSummary: any[];
  toolTipContent: any;
  isOpenToolTip: boolean;
  zonesPath: any[];

  fullscreenControl: boolean;
  clusterWiseCityWise: any;
  public searchControl: FormControl;
  @ViewChild("search", null)
  public searchElementRef: ElementRef;
  autocomplete: any;
  showActiveMarkers: boolean;
  showInactiveMarkers: boolean;
  activeMarkers: any[];
  inactiveMarkers: any[];
  customerData: any[];
  selectedData: any[];
  warehouseData: any[];
  selectedPolygon: any;
  newLat: any;
  newLng: any;
  manualMarkerList: any[];
  apiresponse : any;
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



  constructor(private messageService: MessageService, private router: Router,
    private ref: ChangeDetectorRef,
    private clusterservice: ClusterService,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
      this.apiresponse = {};
     }

  ngOnInit() {
    this.showActiveMarkers = false;
    this.showInactiveMarkers = false;
    this.showMap = true;
    this.zonesPath = [];
    this.cityid = Number(this.route.snapshot.paramMap.get("CityId"));
    this.fullscreenControl = true;
    this.options = {
      position: ControlPosition.TOP_RIGHT
    }///22jan
    this.clusterservice.GetMap(this.cityid).subscribe(result => {
      this.clusterWiseCityWise = result;
      this.lat = this.clusterWiseCityWise.city.CityLatitude;
      this.lng = this.clusterWiseCityWise.city.CityLongitude;
      console.log(' this.clusterWiseCityWise: ', this.clusterWiseCityWise);
      this.generatePolygons();

    })
    this.GetwarehouseLatLong();
    this.GetCustomerLatLong();

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => this.setPlace());
      });
    });

  }

  setPlace() {
    let place= this.autocomplete.getPlace();
    if (place.geometry) {
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
    }

  }

  GetwarehouseLatLong() {
    this.clusterservice.GetwarehouseLatLong(this.cityid).subscribe(result => {
      

      this.warehouseData = result;
      // this.activeMarkers = [];
      // this.inactiveMarkers = [];

      let newListOfMarkers = [];
      if (this.warehouseData && this.warehouseData.length > 0) {
        this.warehouseData.forEach(x => {
          let obj: any = {
            lat: x.lat,
            lg: x.lg,
            title: x.WarehouseName,
            Address: x.Address,
            icon: 'assets/img/logo/wh.png',
            Active: x.Active
          }
        });

        //this.showMarkers = true;

      }

      console.log('GetwarehouseLatLong: ', result);


    })
  }

  GetCustomerLatLong() {
    this.clusterservice.GetCustomerLatLong(this.cityid).subscribe(result => {
      this.customerData = result;
      this.activeMarkers = [];
      this.inactiveMarkers = [];

      let newListOfMarkers = [];
      if (this.customerData && this.customerData.length > 0) {
        this.customerData.forEach(x => {
          let obj: any = {
            lat: x.lat,
            lg: x.lg,
            title: x.ShopName,
            Skcode: x.Skcode,
            Name: x.Name,
            ShippingAddress: x.ShippingAddress,
            //icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            icon: 'assets/img/logo/green.png',
            animation: '',
            Active: x.Active
          }
          if (!obj.Active) {
            obj.icon = 'assets/img/logo/red.png'
            this.inactiveMarkers.push(obj);
          }
          else {
            this.activeMarkers.push(obj);
          }
        });

        //this.showMarkers = true;

      }

      console.log('GetCustomerLatLong: ', result);
    })
  }

  onPolygonChange(event: any, cluster: any, index: number) {
    cluster.isChanges = true;
    
    this.showMap = false;
    this.clusterWiseCityWise.clusters[index].clusterlatlng = event.newArr[0];
    setTimeout(() => {
      this.showMap = true;
    }, 100);

  }

  UpdatePolygons() {
    
    let dataToSend = this.clusterWiseCityWise.clusters.filter(elem => {
      return elem.isChanges == true;
    });
    if (!dataToSend || dataToSend.length < 1) {
      
    //  alert('nothing to save');
      this.messageService.add({ severity: 'error', summary: 'Nothing to Save!', detail: '' });
    } else {
      
      dataToSend.forEach(x => {
        x.polygon = [];
        x.clusterlatlng.forEach(y => {
          x.polygon.push([y.lat, y.lng]);
        });
      })
      this.clusterservice.savepolygon(dataToSend).subscribe(x => {
      
        console.log('x: ', x);
        
        this.apiresponse = x;

        console.log('this.apiresponse.statusthis.apiresponse.statusthis.apiresponse.status ', this.apiresponse.status);
        console.log('x result: ', this.apiresponse.status);
        if(this.apiresponse.status == true){
        this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
        }else{
          this.messageService.add({ severity: 'error', summary: 'Polygon Invalid for cluster Please Correct!', detail: '' });
        }
      });
    }
  }

  // UpdatePolygons() {
  //   
  //   let dataToSend = this.clusterWiseCityWise.clusters.filter(elem => {
  //     return elem.isChanges == true;
  //   });
  //   if (!dataToSend || dataToSend.length < 1) {
  //     
  //     alert('nothing to save');
  //     this.messageService.add({ severity: 'error', summary: 'Nothing to Save!', detail: '' });//////
  //   } else if(dataToSend == "VALID"){/////else{
  //     
  //     dataToSend.forEach(x => {
  //       
  //       x.polygon = [];
  //       x.clusterlatlng.forEach(y => {
  //         x.polygon.push([y.lat, y.lng]);
  //       });
  //     })
  //     this.clusterservice.savepolygon(dataToSend).subscribe(x => {
  //       console.log('x: ', x);
  //       this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
  //     });
  //   }
  //   else {////////
  //     
  //     this.messageService.add({ severity: 'error', summary: 'Polygon Invalid for cluster!', detail: '' });///////
  //   }
    
  // }

  private generatePolygons() {
    this.zonesPath = [];
    let count = 1;
    console.log('this.clusterWiseCityWise:', this.clusterWiseCityWise);
    if (this.clusterWiseCityWise && this.clusterWiseCityWise.clusters && this.clusterWiseCityWise.clusters.length > 0) {
      this.clusterWiseCityWise.clusters.forEach(x => {
        x.strokeColor = this.generateColor(count++);
        x.strokeOpacity = 0.2;
        x.strokeWeight = 0;
        x.fillColor = this.generateColor(count++);
        x.fillOpacity = 0.2;
      });

      console.log('zonesPath: ', this.zonesPath);
    }


  }

  private generateColor(index) {
    // storing all letter and digit combinations 
    // for html color code 
    let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    return colorArray[index % colorArray.length];
  }

  onCancel() {
    this.router.navigateByUrl('layout/warehouse/viewcluster')
  }

  onSearchCustomer(event) {
    this.selectedData = this.customerData.filter(x => {
      return x.Skcode.toLowerCase().includes(event.query)
    })
  }
  onSelectCustomer(event) {
    console.log('event: ', event);
    console.log("this.activeMarkers", this.activeMarkers);
    console.log("this.inactiveMarkers", this.inactiveMarkers);
    this.resetBounce();
    let activeMarkr = this.activeMarkers.filter(x => { return x.Skcode == event.Skcode });
    
    if (activeMarkr && activeMarkr.length > 0) {
      let activeIndex = this.activeMarkers.indexOf(activeMarkr[0]);
      this.activeMarkers.splice(activeIndex, 1);
      setTimeout(() => {
        activeMarkr[0].animation = "BOUNCE"
        this.activeMarkers.push(activeMarkr[0]);
      }, 1000);

    }

    let inactiveMarker = this.inactiveMarkers.filter(x => { return x.Skcode == event.Skcode });
    if (inactiveMarker && inactiveMarker.length > 0) {
      let inactiveIndex = this.inactiveMarkers.indexOf(inactiveMarker[0]);
      this.inactiveMarkers.splice(inactiveIndex, 1);
      setTimeout(() => {
        inactiveMarker[0].animation = "BOUNCE";
        this.inactiveMarkers.push(inactiveMarker[0]);
      }, 1000);
    }
    this.lat = event.lat;
    this.lng = event.lg;
  }


  onChangeManualLocation() {
    this.manualMarkerList = [];
    this.lat = this.newLat;
    this.lng = this.newLng;

    let obj: any = {
      lat: this.lat,
      lg: this.lng,

      animation: 'BOUNCE',

    }

    this.manualMarkerList.push(obj);
  }


  polyClicked(polygon, clusterWiseCityWise) {
    this.selectedPolygon = polygon;
    console.log('polygon',clusterWiseCityWise);
    this.selectedPolygon.city = clusterWiseCityWise.city.CityName
    
}

resetBounce(){
  if(this.activeMarkers && this.activeMarkers.length >0){
    this.activeMarkers.forEach(x => x.animation = "");
  }
  if(this.inactiveMarkers && this.inactiveMarkers.length >0){
    this.inactiveMarkers.forEach(x => x.animation = "");
  }
}


}


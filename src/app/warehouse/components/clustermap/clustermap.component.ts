import { Component, OnInit, OnChanges, ChangeDetectorRef, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { MouseEvent, FullscreenControlOptions, ControlPosition } from '@agm/core';
import { SignalRService } from '../../../shared/services/signal-r.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

// import { FullscreenControlOptions, ControlPosition } from '@agm/core/services/google-maps-types';///22jan
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
declare var $: any;
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ClusterService } from 'app/shared/services/cluster.service';
import { resource } from 'selenium-webdriver/http';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-clustermap',
  templateUrl: './clustermap.component.html',
  styleUrls: ['./clustermap.component.scss']
})
export class ClustermapComponent implements OnInit {
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Input() CityId: any;
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
  options: FullscreenControlOptions;///22jan
  @Input() ClusterId: number;
  @Input() Id: number;
  @Input() ClusterName: any;
  @Input() WarehouseName: any;;
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
  selectedCluster: any[];
  fullscreenControl: boolean;
  clusterWiseCustomerIndividual: any[];
  blocked : boolean;

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


  constructor(private messageService: MessageService, private router: Router, private ref: ChangeDetectorRef, private clusterservice: ClusterService) { }

  ngOnInit() {
    this.showMap = true;
    this.fullscreenControl = true;
    this.options = {
      position: ControlPosition.TOP_RIGHT
    }///22jan
    this.isOpenToolTip = false;
    this.isShowDirection = false;
    this.markers = [
    ]
    this.followMarker = '';
    this.clusterservice.GetClusterWiseCustomerIndividual(this.ClusterId).subscribe(result => {
      this.clusterWiseCustomerIndividual = result;
      if (this.clusterWiseCustomerIndividual && this.clusterWiseCustomerIndividual.length > 0) {
        this.clusterWiseCustomerIndividual.forEach(x => {
          x.lng = x.lg;
          x.label = x.ShopName + ' (' + x.Skcode + ')'
        })
      }
    })
    // this.getDirection();
    this.GetCoordingate();

    this.GetClusterInfo();
    this.allMarkers = JSON.parse(JSON.stringify(this.markers));

  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };
  }

  GetCoordingate() {
    this.clusterservice.GetCoordingate(this.ClusterId).subscribe(result => {
      console.log('GetCoordingate: ', result);
      this.selectedCluster = result;
      this.generatePolygons();
    })

    this.GetCentreLtLgs();
  }
  onPolygonChange(event) {
    console.log('this.zonesPathaaaa : ', this.zonesPath);
    this.showMap = false; 
    this.zonesPath[0].ZonePaths = event.newArr[0];
    setTimeout(() => {
      this.showMap = true;
    }, 100);
  }

  GetCentreLtLgs() {
    this.clusterservice.GetCentreLtLgs(this.ClusterId).subscribe(result => {
      this.lat = result.CityLatitude;
      this.lng = result.CityLongitude;
      console.log('GetCentreLtLgs: ', result);
    })
  }

  GetClusterInfo() {
    this.clusterservice.GetClusterInfo(this.ClusterId).subscribe(result => {
      console.log('GetClusterInfo: ', result);
      //this.ClusterName =result;
      //this.WarehouseName = result;
    })
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }

  ngOnDestroy() {
    this.stopSignalRConnection();
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

  polyMouseUp(polygon, index, infoWindow, hideShow) {
    console.log('polygon hover');
    if (this.totalSummary && this.totalSummary.length > 0) {
      let toolTipContentList = this.totalSummary.filter(x => {
        return x.CityId == polygon.CityId;
      });
      if (toolTipContentList && toolTipContentList.length > 0) {
        this.toolTipContent = toolTipContentList[0];
      } else {
        this.toolTipContent = null;
      }
    }

    this.isOpenToolTip = hideShow;
  }


  updatepolygon() {
    let latLng: any[] = [];

    if (this.zonesPath && this.zonesPath.length > 0 && this.zonesPath[0].ZonePaths && this.zonesPath[0].ZonePaths.length > 0) {
      let arr = this.zonesPath[0].ZonePaths;
      console.log('arr:', arr);
      arr.forEach(x => {
        let lat = x.lat;
        let lng = x.lng;
        let newlatlng = [lat, lng];
        latLng.push(newlatlng);
      });

      var dataToPost = {
        ClusterId: this.ClusterId,
        polygon: latLng
      };

      this.blocked = true;
      // 
      this.clusterservice.updatepolygon(dataToPost).subscribe(result => {
        console.log('Update Polygon is :', result);
        console.log('Update Polygon status is :', result.status);
        this.blocked = false;
        if(result.status == true ){
          // 
        this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });    
        }else{
          // 
          this.messageService.add({ severity: 'error', summary: 'Polygon Invalid Please correct it properly!', detail: '' });    
        }
      });
      
    }
  }

  
  // updatepolygon() {
  //   let latLng: any[] = [];

  //   if (this.zonesPath && this.zonesPath.length > 0 && this.zonesPath[0].ZonePaths && this.zonesPath[0].ZonePaths.length > 0) {
  //     
  //     let arr = this.zonesPath[0].ZonePaths;
  //     console.log('arr:', arr);
  //     arr.forEach(x => {
  //       let lat = x.lat;
  //       let lng = x.lng;
  //       let newlatlng = [lat, lng];
  //       latLng.push(newlatlng);
  //     });
  //   if(this.zonesPath){
  //     
  //     var dataToPost = {
  //       ClusterId: this.ClusterId,
  //       polygon: latLng
  //     };

  //     this.blocked = true;
  //     this.clusterservice.updatepolygon(dataToPost).subscribe(result => {
  //       console.log('Update Polygon is :', result);
  //       this.blocked = false;
  //       this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });    
  //     });
  //   }else{
  //     
  //     this.messageService.add({ severity: 'error', summary: 'Polygon Invalid Please Correct!', detail: '' });    
  //   }
  //   }
  //   // else{
  //   //   var Polyres = 
  //   //   {                            
  //   //       status : false,
       
  //   //   };
  //   //   this.messageService.add({ severity: 'success', summary: 'Polygon Invalid please correct!', detail: '' });   
  //   // }

  // }
  

  onCancel() {
    this.router.navigateByUrl('layout/warehouse/cluster');
  } 

  private generatePolygons() {
    this.zonesPath = [];
    let count = 1;
    if (this.selectedCluster && this.selectedCluster.length > 0) {
      let newCluster = {
        "ClusterId": this.selectedCluster[0].Id,
        "ZoneID": this.selectedCluster[0].polygon,
        "strokeColor": this.generateColor(count++),
        "strokeOpacity": 0.1,
        "strokeWeight": 0,
        "fillColor": this.generateColor(count++),
        "fillOpacity": 0.1,
        "draggable": false,
        "editable": false,
        "visible": true,
        "ZonePaths": []
      }
      this.selectedCluster.forEach(cluster => {
        let newPath = { "lat": cluster.latitude, "lng": cluster.longitude };
        newCluster.ZonePaths.push(newPath);
      });
      this.zonesPath.push(newCluster);
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
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon: string;
  id: string;
}

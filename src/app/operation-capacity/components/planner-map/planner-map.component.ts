import { Component, Input, OnInit } from '@angular/core';
import { FullscreenControlOptions } from '@agm/core';
import { Router } from '@angular/router';
import { PlanMasterService } from 'app/operation-capacity/services/plan-master.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
@Component({
  selector: 'app-planner-map',
  templateUrl: './planner-map.component.html',
  styleUrls: ['./planner-map.component.scss']
})
export class PlannerMapComponent implements OnInit {
  //map
  lat: number;// = 22.7196;
  lng: number;// = 75.8577;
  zoom: number = 13;
  options: FullscreenControlOptions;
  myInnerHeight = 500 - 100;
  fullscreenControl: boolean;
  list: any;
  @Input() warehouseId: number;
  tripInfoList: any[];
  clusterWarehouseWise: any;
  zonesPath: any[];
  selectedPolygon: any;
  selectedClusterInfo: any;
  touchPoints: any[] = [];
  actualDestination: any;
  actualOrigin: any;
  icon = '/assets/img/logo/truck/1.png';
  waypointMarker = '/assets/img/logo/marker_pointer.png';
  waypoints: any[];
  showMap: boolean;
  warehouse: any;
  public renderOptions = {
    suppressMarkers: true,
    suppressInfoWindows: false,
    waypoints: {
      // icon: '/assets/img/logo/dot.png',
      label: '',
      infoWindow: 'Waypoint',
      opacity: 1,
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

  constructor(private router: Router, private planMasterService: PlanMasterService
    , private loaderService: LoaderService, private deliveryDashboardService: DeliveryDashboardService) { }

  ngOnInit() {
    this.showMap = true;
    this.list = [];
    this.zonesPath = [];
    console.log('wid', this.warehouseId);
    this.loaderService.loading(true);
    this.planMasterService.getTripInfo(this.warehouseId).subscribe(res => {
      this.loaderService.loading(false);
      this.tripInfoList = res;
      console.log('res', res);
    })
    this.loaderService.loading(true);
    this.planMasterService.getClusterWarehouseWise(this.warehouseId).subscribe(result => {
      this.loaderService.loading(false);
      this.clusterWarehouseWise = result;
      this.lat = this.clusterWarehouseWise.warehouse.latitude;
      this.lng = this.clusterWarehouseWise.warehouse.longitude;
      console.log(' this.clusterWarehouseWise: ', this.clusterWarehouseWise);
      this.generatePolygons();

    })
    this.loaderService.loading(true);
    this.planMasterService.getClusterList(this.warehouseId).subscribe(x => {
      this.generatePolygons();
      this.loaderService.loading(false);
    });
  }
  getHr(rowData) {
    return Math.trunc(rowData.TotalTimeInMins / 60);
  }
  plannerTab() {
    this.router.navigateByUrl('layout/operation-capacity/planMaster');
  }
  private generatePolygons() {
    this.zonesPath = [];
    let count = 1;
    console.log('this.clusterWarehouseWise:', this.clusterWarehouseWise);
    if (this.clusterWarehouseWise && this.clusterWarehouseWise.clusters && this.clusterWarehouseWise.clusters.length > 0) {
      this.clusterWarehouseWise.clusters.forEach(x => {
        x.strokeColor = this.generateColor(count++);
        x.strokeOpacity = 0.2;
        x.strokeWeight = 0;
        x.fillColor = this.generateColor(count++);
        x.fillOpacity = 0.2;
      });
      console.log('zonesPath: ', this.zonesPath);
    }


  }
  polyClicked(polygon, clusterWarehouseWise) {
    this.loaderService.loading(true);
    this.selectedPolygon = polygon;
    console.log('polygon', clusterWarehouseWise);
    this.selectedPolygon.warehouse = clusterWarehouseWise.warehouse.WarehouseName;
    this.loaderService.loading(true);
    this.deliveryDashboardService.getClusterWiseInfo(this.selectedPolygon.ClusterId).subscribe(x => {
      this.selectedClusterInfo = x;
      console.log('info', this.selectedClusterInfo);
      this.loaderService.loading(false);
    });
    this.loaderService.loading(false);
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


  getTouchPoints(tripPlannerMasterId: number) {
    this.touchPoints = [];
    this.showMap = false;
    this.planMasterService.getTripTouchPoints(tripPlannerMasterId).subscribe(x => {
      this.touchPoints = x;

      if (this.touchPoints && this.touchPoints.length) {
        
          let warehouse = this.touchPoints[this.touchPoints.length - 1];
          this.warehouse = warehouse;
          this.touchPoints.splice(this.touchPoints.length-1,1);
          this.actualOrigin = JSON.parse(JSON.stringify({ lat: warehouse.Lat, lng: warehouse.Lng }));
        this.actualDestination = JSON.parse(JSON.stringify({ lat: warehouse.Lat, lng: warehouse.Lng }));

        this.waypoints = [];
        let count = 1;
        this.touchPoints.forEach(element => {
          if (count < this.touchPoints.length) {
            this.waypoints.push({ location: { lat: Number(element.Lat).toFixed(6), lng: Number(element.Lng).toFixed(6) } })
          }
          count++;

        });
        this.showMap = true;
      }
      console.log('waypoints: ', this.waypoints);
      console.log('this.touchPoints: ', this.touchPoints);
    });
  }
}

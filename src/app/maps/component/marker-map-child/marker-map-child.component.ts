import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-marker-map-child',
  templateUrl: './marker-map-child.component.html',
  styleUrls: ['./marker-map-child.component.scss']
})
export class MarkerMapChildComponent implements OnInit, OnChanges {

  @Input('point-list') pointList: any[];
  @Input('selected-city') selectedCity: any[];
  @Input('selected-cluster') selectedCluster: any;
  @Input('ShowTool-Tip') ShowToolTip: boolean;
  zoom: number = 12;
  lat: any = 22.7196;
  lng: any = 75.8577;
  myInnerHeight = window.innerHeight - 200;
  markers: any[];
  zonesPath: any[];

  icon = '/assets/img/logo/';
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  constructor(private ref: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.markers = [];
    this.setMapLatLng();
    if (this.pointList != null && this.pointList.length > 0) {
      this.pointList.forEach(item => {
        if (item.lat != 0 && item.lng != 0) {
          item.icon =  item.TotalOrders > 0 ? this.icon + '/green.png' : this.icon + '/red.png';
          this.markers.push(item);
        }
        else {

        }
      });
      console.log('this.markers is: ', this.markers);
      this.ref.detectChanges();
    }

    this.generatePolygons();

  }

  onMouseOver(infoWindow, $event: MouseEvent) {
    // 
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

  ngOnChanges() {

  }

  private generatePolygons() {
    this.zonesPath = [];
    let count = 1;
    if (this.selectedCluster && this.selectedCluster.length > 0) {
      this.selectedCluster.forEach(cluster => {
        let newCluster = {
          "ClusterId": cluster.ClusterId,
          "ZoneID": cluster.ClusterName,
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

        if (cluster.LatLngs && cluster.LatLngs.length > 0) {
          cluster.LatLngs.forEach(path => {
            let newPath = { "lat": path.Latitude, "lng": path.Longitude };
            newCluster.ZonePaths.push(newPath);
          });

        }
        this.zonesPath.push(newCluster);
      })
    }
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  private setMapLatLng() {
    if (this.selectedCity && this.selectedCity.length > 0) {
      let itemList = this.selectedCity.filter(x => {
        return x.CityLatitude && x.CityLongitude;
      });

      if (itemList && itemList.length > 0) {
        this.lat = itemList[0].CityLatitude;
        this.lng = itemList[0].CityLongitude;
      }
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


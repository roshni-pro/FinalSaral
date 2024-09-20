import { ControlPosition, FullscreenControlOptions } from '@agm/core';
import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
declare var google: any;


@Component({
  selector: 'app-heat-map-child',
  templateUrl: './heat-map-child.component.html',
  styleUrls: ['./heat-map-child.component.scss']
})
export class HeatMapChildComponent implements OnInit {

  @Input('point-list') pointList: any[];
  @Input('selected-data-type') selectedDataType: string;
  @Input('selected-cluster') selectedCluster: any;
  @Input('selected-city') selectedCity: any[];
  @Input('map-name') mapName: string;
  @Input('ShowTool-Tip') ShowToolTip: boolean;
  
  map: any;
  heatmap: any = null;
  zonesPath: any[];
  totalSummary: any[];
  lat: any = 22.7196;
  lng: any = 75.8577;
  myInnerHeight = window.innerHeight - 200;
  zoom: number = 12;
  showMap: boolean;

  showOverlay: boolean;
  isOpenToolTip: boolean;
  toolTipContent: any;
  fullscreenControl: boolean;
  options: FullscreenControlOptions;
  constructor() { }

  ngOnInit() {
    this.fullscreenControl = true;
    this.map = null;
    this.isOpenToolTip = false;
    this.showMap = true;
    console.log('mapName: ', this.mapName);
    this.options = {
      position: ControlPosition.TOP_RIGHT
    }
  }

  onMapLoad(mapInstance: any) {
    this.map = mapInstance;
    const coords: any[] = this.getPoints();

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: coords,
      maxIntensity: 100,
      opacity: 1
    });
    this.heatmap.data.addListener('mouseover', function (event) {
      this.heatmap.data.revertStyle();
      this.heatmap.data.overrideStyle(event.feature, { strokeWeight: 8 });
    });

    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : this.changeGradient(0));
    this.generatePolygons();

    this.setTotalOrders();
    this.setMapLatLng();
  }

  polyMouseUp(polygon, index, infoWindow, hideShow) {
    console.log('polygon hover');
    if (this.totalSummary && this.totalSummary.length > 0) {
      let toolTipContentList = this.totalSummary.filter(x => {
        return x.ClusterId == polygon.ClusterId;
      });
      if (toolTipContentList && toolTipContentList.length > 0) {
        this.toolTipContent = toolTipContentList[0];
      } else {
        this.toolTipContent = null;
      }
    }

    this.isOpenToolTip = hideShow;
  }
 onMouseOver(infoWindow, $event: MouseEvent) {
    // 
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

  onChangeSelectionData() {
    this.setTotalOrders();

    this.showMap = false;
    setTimeout(() => {
      this.showMap = true;
    }, 100);
  }


  private getPoints(): any[] {
    if (this.pointList && this.pointList.length > 0) {
      return this.getDynamicPoints();
    }
    else {
      return [];
    }
  }


  private getDynamicPoints(): any[] {
    let listOfLatLng = [];
    let multipler;
    if (this.pointList && this.pointList.length > 0) {
      this.pointList.forEach(element => {
        if (element.lat && element.lng) {
          let weight = 0;
          if (this.selectedDataType == 'TotalOrder') {
            weight = element.TotalOrders;
          }
          else if (this.selectedDataType == 'FreqOfOrders') {
            element.TotalFrequence = Math.round((element.TotalOrders / element.OrderRetailers) * 100) / 100;
            weight = element.TotalFrequence;
          }
          else if (this.selectedDataType == 'KisanKiranaSales') {
            weight = element.KisanKiranaSales;
          }
          else if (this.selectedDataType == 'OrderRetailers') {
            weight = element.OrderRetailers;
          }
          else if (this.selectedDataType == 'OrderedBrands') {
            weight = element.OrderedBrands;
          }
          else if (this.selectedDataType == 'TotalSales') {
            weight = element.TotalSales;
          }

          listOfLatLng.push({ location: new google.maps.LatLng(element.lat, element.lng), weight: weight });
          //listOfLatLng.push(new google.maps.LatLng(element.lat, element.lng));

        }

      });
    }
    this.setMultipler(listOfLatLng);
    return listOfLatLng;
  }

  private setMultipler(listOfLatLng) {
    if (listOfLatLng != null && listOfLatLng.length > 0) {
      let max = Math.max.apply(Math, listOfLatLng.map(function (o) { return o.weight; }));
      let min = Math.min.apply(Math, listOfLatLng.map(function (o) { return o.weight; }));
      let diff = max - min;
      let div = 1000 / diff
      listOfLatLng.forEach(item => {
        item.weight = item.weight * div;
      });

      console.log('min', min);

    }

    return 0;

  }

  private changeGradient(number: number) {
    let gradient = [[
      'rgba(0, 255, 255, 0)',
      // 'rgba(0, 255, 255, 1)',
      // 'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'

      // 'rgba(251, 45, 45, 1)',
      // 'rgba(145, 3, 3, 1)',
      // 'rgba(80, 2, 2, 1)',
      // 'rgba(65, 1, 1, 1)',
      // 'rgba(0, 0, 0, 1)'
    ],
    [
      'rgba(0, 255, 255, 0)',
      'rgb(227, 98, 214, .8)',
      'rgb(194, 39, 179, .9)',
      'rgb(141, 32, 130, 1)',
      'rgb(71, 9, 65, 1)',
      'rgb(59, 1, 53, 1)'
    ],

    ]
    return gradient[number];

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

  private setTotalOrders() {
    if (!this.pointList || this.pointList.length < 1) {
      return;
    }
    const reduced = this.pointList.reduce(function (m, d) {
      if (!m[d.ClusterId]) {
        m[d.ClusterId] = { ...d, count: 1 };
        return m;
      }
      m[d.ClusterId].TotalOrders += d.TotalOrders;
      m[d.ClusterId].KisanKiranaSales += d.KisanKiranaSales;
      m[d.ClusterId].OrderRetailers += d.OrderRetailers;
      m[d.ClusterId].OrderedBrands += d.OrderedBrands;
      m[d.ClusterId].TotalSales += d.TotalSales;

      return m;
    }, {});



    let list = [];
    if (reduced) {
      Object.keys(reduced).forEach(item => {
        list.push(reduced[item]);
      });

    }
    this.totalSummary = list;

    if (this.totalSummary && this.totalSummary.length > 0) {
      this.totalSummary.forEach(x => {
        x.TotalFrequence = Math.round((x.TotalOrders / x.OrderRetailers) * 100) / 100;
      });
    }
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

}

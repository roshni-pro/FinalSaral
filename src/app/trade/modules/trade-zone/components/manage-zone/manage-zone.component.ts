import { Component, OnInit, OnChanges, ChangeDetectorRef, OnDestroy, EventEmitter, Output, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
declare var $: any;
declare const google: any;
import { Router, ActivatedRoute } from '@angular/router';
import { ClusterService } from 'app/shared/services/cluster.service';
// import { FullscreenControlOptions, ControlPosition } from '@agm/core/services/google-maps-types';///22jan
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, FullscreenControlOptions, ControlPosition } from '@agm/core';
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import { TradeZoneService } from '../../services/trade-zone.service';
import { TradeCustomerZoneViewDc } from '../../interfaces/trade-customer-zone-view-dc';
import { TradeCustomerZoneEditDc } from '../../interfaces/trade-customer-zone-edit-dc';
import { GetZoneIdList } from '../../interfaces/GetZoneIdList';

@Component({
  selector: 'app-manage-zone',
  templateUrl: './manage-zone.component.html',
  styleUrls: ['./manage-zone.component.scss']
})
export class ManageZoneComponent implements OnInit {
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
  actMarkers: number[];
  activeMarkers: any[];
  inactiveMarkers: any[];
  customerData: any[];
  selectedData: any[];
  warehouseData: any[];
  selectedPolygon: any;
  newLat: any;
  newLng: any;
  manualMarkerList: any[];
  apiresponse: any;
  zoneList: TradeCustomerZoneViewDc[];
  polygonArray: any[];
  tradeCustomerZoneEditDc: TradeCustomerZoneEditDc;
  customerId: number;
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

  sellerList: any;
  CustomerId: any;
  tradeData: any;
  viewMap: boolean;
  blocked: boolean;
  // polygonArray: any[];
  cityList: any[];
  isInvalid: boolean;
  dataToPost: TradeCustomerZoneViewDc;
  rowData: boolean;
  Id: any;
  dialoguebox : boolean;
  zoneName: string;
  buyersList : any;
  getZoneIdList : GetZoneIdList;
  refreshZoneList : any;

  constructor(private orderAssignmentsService: OrderAssignmentsService, private tradeZoneService: TradeZoneService, private messageService: MessageService, private router: Router,
    private ref: ChangeDetectorRef,
    private clusterservice: ClusterService,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private confirmationService: ConfirmationService,
    private ngZone: NgZone) {
    this.apiresponse = {};
    this.actMarkers =[];
  }

  ngOnInit() {

    this.getZoneIdList={
      ZoneId : null
    }
    this.viewMap = true;
    this.showActiveMarkers = false;
    this.showInactiveMarkers = false;
    this.showMap = true;
    this.zonesPath = [];
    this.polygonArray = [];
     this.activeMarkers = [];
    // this.cityid = Number(this.route.snapshot.paramMap.get("CityId"));
    this.fullscreenControl = true;
    this.options = {
      position: ControlPosition.TOP_RIGHT
    }
    this.tradeZoneService.getAllBuyers().subscribe(result => {
      this.buyersList = result;
      
      console.log('this.activeMarkers :', this.activeMarkers);
    });



    this.searchControl = new FormControl();
  }

  onDialogHide(){
    
  }
  // tradeCustomer(CustomerId) {
  //   
  //   this.tradeZoneService.tradeCustomerZone(CustomerId).subscribe(result => {
  //     this.zoneList = result;
  //     console.log('zonelistt:', this.zoneList)
  //     this.lat = Number(this.zoneList[0].PointList[0].PointLatitude); //this.clusterWiseCityWise.city.CityLatitude;
  //     this.lng = Number(this.zoneList[0].PointList[0].PointLongitude);

  //     this.generateZonePolygons();
  //   })
  // }

  setPlace() {
    let place = this.autocomplete.getPlace();
    if (place.geometry) {
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
    }

  }


  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    
    google.maps.event.addListener(drawingManager, 'polygoncomplete', (val) => this.setPolygon(val));
  }


  setPolygon(polygon): any {
    
    let path = polygon.getPath()
    let coordinates = [];

    for (let i = 0; i < path.length; i++) {
      coordinates.push({
        lat: path.getAt(i).lat(),
        lng: path.getAt(i).lng()
      });
    }

    this.polygonArray.push(coordinates);
    console.log('coordinates', this.polygonArray);
  }


  onPolygonChange(event: any, cluster: any, index: number) {
    cluster.isChanges = true;
    this.showMap = false;
    // this.clusterWiseCityWise.clusters[index].clusterlatlng = event.newArr[0];
    this.zoneList[index].PointList = event.newArr[0];

    setTimeout(() => {
      this.showMap = true;
      this.ref.detectChanges();
    }, 500);

  }

  UpdateZonePolygons() {
    let dataToPost = [];
    let dataToSend = this.zoneList.filter(elem => {
      return elem.isChanges == true;
    });
    if (!dataToSend || dataToSend.length < 1) {
      this.messageService.add({ severity: 'error', summary: 'Nothing to Save!', detail: '' });
    } else {
      console.log('dataToSend', dataToSend);
      console.log('this.tradeCustomerZoneEditDc', this.tradeCustomerZoneEditDc);
      dataToSend.forEach(item => {
        let itemToPost = {
          TradeCustomerZoneId: item.Id,
          polygon: []
        };

        item.PointList.forEach(y => {
          y.PointLatitude = String(y.lat);
          y.PointLongitude = String(y.lng);
          itemToPost.polygon.push([y.PointLatitude, y.PointLongitude]);
        });

        console.log('this.itemToPost', itemToPost)
        dataToPost.push(itemToPost);
      });
      console.log('this.dataToPost', dataToPost);
      console.log('this.dataToSend', dataToSend);
      this.blocked = true;
      this.tradeZoneService.updatePolygonList(dataToPost).subscribe(x => {
        console.log('x: ', x);
        this.blocked = false;
        this.apiresponse = x;
        console.log('x result: ', this.apiresponse.status);
        if (this.apiresponse.status == true) {
          this.messageService.add({ severity: 'success', summary: 'Updated Successfully!', detail: '' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Polygon Invalid for cluster Please Correct!', detail: '' });
        }
      });
    }
  }

  save()
  {
    this.dialoguebox = true;
  }

  saveMap(CustomerId,zoneName,zonenameForm) {
    
    if(zonenameForm.form.status == 'VALID')
    {
    this.dialoguebox = false;
    if (this.polygonArray && this.polygonArray.length > 0) {
      console.log(this.cluster);
      var dataToPost = {
        CustomerId: CustomerId.CustomerId,
        ZoneName: zoneName
      }
      let data:TradeCustomerZoneViewDc = this.getPostData(dataToPost);
      this.blocked = true;
      this.tradeZoneService.addNewZone(data).subscribe(result => {
        
        this.blocked = false;
        console.log('result :::', result);
        if(result> 0){
          this.messageService.add({ severity: 'success', summary: 'Added Successfully!', detail: '' });
        }else{
          this.messageService.add({ severity: 'danger', summary: 'zone crossover issue!', detail: '' });
        }
        // this.polygonArray = null;
        this.viewMap = true;
        this.updateZoneList();
      },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
        });
    }

    else if (!this.polygonArray || this.polygonArray.length < 1) {
      this.messageService.add({ severity: 'error', summary: 'Please Draw Cluster First!', detail: '' });
      return;
    }
  }
  else{
    this.isInvalid = true;
    this.messageService.add({ severity: 'error', summary: 'Please Fill the Zone Name!', detail: '' });

  }
  }

  getPostData(dataToPost): TradeCustomerZoneViewDc {
    // let dataToPost ;
    
    if (this.polygonArray && this.polygonArray.length > 0) {
      
      //console.log(',selectedCityselectedCityselectedCity', selectedCity);

      let i = 1;
      this.polygonArray.forEach(item => {
        let ZoneName = '';
        this.dataToPost = {
          Id: 0,
          TradeCustomerId: dataToPost.CustomerId,
          ZoneName: dataToPost.ZoneName,
          ZoneCenterLatitude: null,
          ZoneCenterLongitude: null,
          PointList: this.getLatLngObject(item)
        };

        this.dataToPost.ZoneCenterLatitude = this.dataToPost.PointList[0].PointLatitude;
        this.dataToPost.ZoneCenterLongitude = this.dataToPost.PointList[0].PointLongitude;
        // this.dataToPost.push(itemToPost);
      });
    }
    return this.dataToPost;
  }
  getLatLngObject(googleObjList: any[]): any[] {
    
    let latlngList = [];
    if (this.polygonArray && this.polygonArray.length > 0) {
      let selectedCity = this.zoneList.filter(x => {
        return x.TradeCustomerId == this.CustomerId.CustomerId;
      })[0];

      if (googleObjList && googleObjList.length > 0) {
        googleObjList.forEach(googleObj => {
          let obj = {
            
            TradeCustomerZoneId: 0,
            PointLatitude: googleObj.lat,
            PointLongitude: googleObj.lng,
          };
          latlngList.push(obj);
        });
      }
    }
    return latlngList;
  }


  getLatLongObject(googleObjList: any[]): any[] {
    let latlngList = [];
    if (googleObjList && googleObjList.length > 0) {
      googleObjList.forEach(googleObj => {
        let obj = {
          latitude: googleObj.lat,
          longitude: googleObj.lng,
          CityId: this.cluster.CityId
        };
        latlngList.push(obj);
      });
    }

    return latlngList;
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
      this.blocked = true;
      this.clusterservice.savepolygon(dataToSend).subscribe(x => {
        this.blocked = false;
        this.apiresponse = x;

        console.log('this.apiresponse.statusthis.apiresponse.statusthis.apiresponse.status ', this.apiresponse.status);
        console.log('x result: ', this.apiresponse.status);
        if (this.apiresponse.status == true) {
          this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Polygon Invalid for cluster Please Correct!', detail: '' });
        }
      });
    }
  }

  private generateZonePolygons() {

    let count = 1;
    if (this.zoneList && this.zoneList.length > 0) {
      this.zoneList.forEach(zone => {
        if (zone.PointList && zone.PointList.length > 0) {
          zone.PointList.forEach(point => {
            point.lat = point.PointLatitude ? Number(point.PointLatitude) : null,
              point.lng = point.PointLongitude ? Number(point.PointLongitude) : null
          });
        }
        zone.strokeColor = this.generateColor(count++);
        zone.strokeOpacity = 0.2;
        zone.strokeWeight = 0;
        zone.fillColor = this.generateColor(count++);
        zone.fillOpacity = 0.2;
      });

      console.log('zonesPath: ', this.zonesPath);
    }

    this.ref.detectChanges();
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
    // this.isdetailsclose.emit(false);//for cancel button in edit form
    this.router.navigateByUrl('layout/warehouse/cluster')
  }

  getSupplierList(event) {
    if (event.query.length > 2) {       
      this.orderAssignmentsService.getSellerByName(event.query).subscribe(result => {
        this.sellerList = result;
        console.log('this.ledgerList :', this.sellerList);
      });
      //this.sellerList = this.sellerList.filter(x=>x.CustomerName == event.query);
    }
  }

  onSelectSupplier(obj) {
    
    console.log('obj', obj);
    if(obj.Lat && obj.Lng){
      this.lat = obj.Lat? Number(obj.Lat): null;
      this.lng = obj.Lng? Number(obj.Lng): null;  
    }
    this.customerId = obj.CustomerId;
    this.updateZoneList();
    this.GetCustomerLatLong(this.customerId);
    // this.GetCustomerLatLong();
  }

  private updateZoneList(){
    this.blocked = true;
    this.tradeZoneService.tradeCustomerZone(this.customerId).subscribe(result => {
      this.zoneList = result;
      this.blocked = false;
      console.log('zonelistt:', this.zoneList)
      if (this.zoneList && this.zoneList.length > 0 && this.zoneList[0].PointList && this.zoneList[0].PointList.length >0) {
        this.lat = Number(this.zoneList[0].PointList[0].PointLatitude); //this.clusterWiseCityWise.city.CityLatitude;
        this.lng = Number(this.zoneList[0].PointList[0].PointLongitude);
        this.generateZonePolygons();
      }
    })
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
    console.log('polygon', clusterWiseCityWise);
    // this.selectedPolygon = polygon.ZoneName;
    this.GetCustomerLatLong(polygon.Id);

  }

  deleteZone(selectedPolygon) {
    console.log('selectedPolygon', selectedPolygon);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Zone?',
      accept: () => {
        
        this.blocked = true;
        this.Id = selectedPolygon.Id;
        
        this.tradeZoneService.deleteZone(selectedPolygon.Id).subscribe(x =>{
          this.selectedPolygon=null;
          this.updateZoneList();
        });
      }
    })
  }

  GetCustomerLatLong(Id) {
    
    this.tradeZoneService.getAllBuyerBySellerId(Id).subscribe(result => {
      
      this.customerData = result;
      console.log(':getAllBuyerBySellerId12345:',this.customerData);
      this.activeMarkers = [];
      this.inactiveMarkers = [];
      this.actMarkers = [];
      let newListOfMarkers = [];
      if(this.customerData && this.customerData.length > 0)
      {
        this.customerData.forEach(x => {
          let obj: any = {
            lat: x.Lat,
            lg: x.Lng,
            title: x.CustomerName,
            BuyerZoneId: x.BuyerZoneId,
            ZoneName: x.ZoneName,
            Mobile: x.Mobile,
            //icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            icon: 'assets/img/logo/green.png',
            animation: '',
          }
            this.activeMarkers.push(obj);
        });
      }
      if (this.customerData && this.customerData.length > 0) {
        for(var i in this.customerData)
        {
          this.actMarkers.push(this.customerData[i].ZoneId);
          console.log('actMarkers: ', this.actMarkers);
        }
    //    this.getZones(this.actMarkers);
        //this.showMarkers = true;

      }

      console.log('GetCustomerLatLong: ', result);
    })
      }
//   getZones(actMarkers)
//   {
//     this.getZoneIdList={
//       ZoneId : actMarkers
//     }
// 
//     this.tradeZoneService.getAllZones(this.getZoneIdList).subscribe(result => {
//       
//       console.log('tradeservicd',result);
//       // this.customerData = result;
//       if(result && result.length > 0)
//       {
//         result.forEach(x => {
//           let obj: any = {
//             lat: x.Lat,
//             lg: x.Lng,
//             title: x.CustomerName,
//             BuyerZoneId: x.BuyerZoneId,
//             ZoneName: x.ZoneName,
//             Mobile: x.Mobile,
//             //icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
//             icon: 'assets/img/logo/green.png',
//             animation: '',
//           }
//             this.activeMarkers.push(obj);
//         });
//       }
//       // this.activeMarkers = result
//       console.log('getAllBuyerByZone',this.activeMarkers);
//     });
//   }
  refreshZones()
  {
    
    this.tradeZoneService.refreshZonesToAllCustomers().subscribe(y=>
      {
        
        this.refreshZoneList = y;
        if(this.refreshZoneList == true)
        {
        this.messageService.add({ severity: 'success', summary: 'Zone is Refreshed Successfully', detail: '' });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Some Error Occured', detail: '' });
        }
        console.log('y',y);
      });
  }


}



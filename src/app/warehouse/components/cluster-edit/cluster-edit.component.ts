import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { ClusterService } from 'app/shared/services/cluster.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MessageService } from 'primeng/api';
import { CityService } from 'app/shared/services/city.service';
declare const google: any;
@Component({
  selector: 'app-cluster-edit',
  templateUrl: './cluster-edit.component.html',
  styleUrls: ['./cluster-edit.component.scss']
})
export class ClusterEditComponent implements OnInit {
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  peopleList: any;
  isInvalid: boolean;
  warehouseList: any;
  @Input() cityId: number;
  @Input() CityId: any;
  cityList: any[];
  clusterList: any[];
  CityLatitude: number;
  CityLongitude: number;
  clusterEditForm: any;
  polygonArray: any[];
  myInnerHeight = window.innerHeight - 200;
  ClusterData: any;
  cluster: any;
  zoom: number = 13;
  blocked: boolean;

  constructor(private messageService: MessageService, private warehouse: WarehouseService, private city: CityService, private clusterservice: ClusterService, private WarehouseService: WarehouseService, private router: Router) {
    this.cluster = {};
    this.clusterEditForm = {};

  }

  ngOnInit() {
    this.cluster.CityId = "";
    this.cluster.WarehouseId = "";
    this.cluster.Active = true;
    this.polygonArray = [];
    this.ClusterData = {};

    this.city.GetAllCity().subscribe(result => {
      this.cityList = result;
    })

    this.warehouse.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
    })

  }

  onCityChangeBasedWarehouse(cityId) {
    this.WarehouseService.GetAllCityId(this.cityId).subscribe(result => {
      this.warehouseList = result;
      this.cluster.WarehouseId = this.warehouseList[0].WarehouseId;
    });
  }


  onsearch(searchdata) {
    this.clusterservice.GetWarehouseByCity(searchdata).subscribe(result => {
      this.warehouseList = result;
    })
    this.GetCityLatLong(searchdata);
  }

  private GetCityLatLong(searchdata) {
    this.clusterservice.GetCityLatLong(searchdata).subscribe(result => {
      this.ClusterData.Latitude = result.CityLatitude;
      this.ClusterData.Longitude = result.CityLongitude;
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  update(clusterEditForm: any) {


    console.log('clusterEditForm: ', clusterEditForm);
    


    if (clusterEditForm.form.status == "VALID" && this.polygonArray && this.polygonArray.length > 0) {
      console.log(this.cluster);
      let data = this.getPostData();
      this.blocked = true;
      this.clusterservice.addCluster(data).subscribe(result => {
        
        this.blocked = false;
        console.log('result :::', result);
        console.log('result status :::', result.status);
      
        if(result.status == true){
          
        this.messageService.add({ severity: 'success', summary: 'Cluster Added Successfully!', detail: '' });
        // this.messageService.add({ severity: 'error', summary: 'Polygon Drawn Invalid Please Draw Correctly!', detail: '' });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Cluster is Not Added Because Polygon Drawn Invalid Please Draw Correctly To Add Cluster!', detail: '' });
        }
        //this.router.navigateByUrl('layout/warehouse/cluster');
      },
        (err) => {

          //alert("error");
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

        });
      (err) => {

        //alert("error")
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      };
    }
    else if (clusterEditForm.form.status != "VALID") {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
    else if (!this.polygonArray || this.polygonArray.length < 1) {
      this.messageService.add({ severity: 'error', summary: 'Please Draw Cluster First!', detail: '' });
      return;
    }


    this.router.navigateByUrl('layout/warehouse/cluster');

  }

  onCancel() {
    this.isdetailsclose.emit(false);//for cancel button in edit form
    this.router.navigateByUrl('layout/warehouse/cluster')
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

  getPostData(): any[] {
    let dataToPost = [];
    if (this.polygonArray && this.polygonArray.length > 0) {
      let selectedCity = this.cityList.filter(x => {
        return x.Cityid == this.cluster.CityId;
      })[0];

      let i = 1;
      this.polygonArray.forEach(item => {
        let clusterName = selectedCity.CityName.slice(0, 3) + i++;
        let itemToPost = {
          ClusterName: clusterName,
          WarehouseId: this.cluster.WarehouseId,
          Address: '',
          Phone: '',
          Active: this.cluster.Active,
          CityId: selectedCity.Cityid,
          CityName: selectedCity.CityName,
          AgentCode: '',
          DefaultLatitude: this.cluster.Latitude,
          DefaultLongitude: this.cluster.Longitude,
          LtLng: this.getLatLngObject(item)
        };

        dataToPost.push(itemToPost);
      });
    }
    return dataToPost;
  }
  getLatLngObject(googleObjList: any[]): any[] {
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

}


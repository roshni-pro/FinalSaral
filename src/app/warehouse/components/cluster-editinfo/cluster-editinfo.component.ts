import { Component, OnInit, OnChanges, ChangeDetectorRef, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SignalRService } from '../../../shared/services/signal-r.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
declare var $: any;
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ClusterService } from 'app/shared/services/cluster.service';
import { resource } from 'selenium-webdriver/http';
import { FullscreenControlOptions, ControlPosition } from '@agm/core/services/google-maps-types';
import { MessageService } from 'primeng/api';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';

@Component({
  selector: 'app-cluster-editinfo',
  templateUrl: './cluster-editinfo.component.html',
  styleUrls: ['./cluster-editinfo.component.scss']
})
export class ClusterEditinfoComponent implements OnInit {
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();


  warehouseList: any[];
  @Input() clusterDetail: any;
  cluster: any;
  constructor(private pilotService: PepolePilotService, private messageService: MessageService, private router: Router, private clusterservice: ClusterService) { }

  ngOnInit() {

    console.log('this.clusterDetailclusterDetailclusterDetail :: ', this.clusterDetail);

    this.pilotService.Warehouse().subscribe(result => {
      this.warehouseList = result.filter(x => x.Cityid == this.clusterDetail.CityId);
      if (this.warehouseList && this.warehouseList.length > 0) {
        //this.WarehouseId = this.warehouseList.filter(x => { return x.Selected == this.WarehouseId })
      }
    });
  }



  onsearch(searchdata) {
    this.clusterservice.GetWarehouseByCity(searchdata).subscribe(result => {
      this.warehouseList = result;
    })
  }

  onCancel() {
    this.router.navigateByUrl('layout/warehouse/cluster');
  }
  onWarehouseChange() {
    if(this.clusterDetail.WarehouseId){
      this.clusterDetail.WarehouseName = this.warehouseList.filter(x =>{
        return x.WarehouseId == this.clusterDetail.WarehouseId
      })[0].WarehouseName;
    }
  }


  updateClusterDetails(){
    this.clusterDetail.Active = true;
    this.clusterservice.UpdateCluster(this.clusterDetail).subscribe(result =>{
      console.log('result: ', result);
    });
  }

}

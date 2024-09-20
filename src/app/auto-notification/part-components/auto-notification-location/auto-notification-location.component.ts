import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ANEntityMaster } from 'app/shared/interface/auto-notification/anentity-master';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';

@Component({
  selector: 'app-auto-notification-location',
  templateUrl: './auto-notification-location.component.html',
  styleUrls: ['./auto-notification-location.component.scss']
})
export class AutoNotificationLocationComponent implements OnInit, OnDestroy {
  autoNotification: AutoNotification;
  isShowCity: boolean;
  isShowWarehouse: boolean;
  isShowCluster: boolean;

  cityList: any[];
  warehouseList: any[];
  clusterList: any[];
  @Input() anEntityMaster: ANEntityMaster;
  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }

  ngOnInit() {
    this.isShowCity = false;
    this.isShowWarehouse = false;
    this.isShowCluster = false;
    
    this.setLocationFlags();
    console.log('anEntityMaster:', this.anEntityMaster);
    this.getCityList();
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      this.initializeOrDestroy();
      console.log('this.autoNotification:', this.autoNotification);
    });

  }

  ngOnDestroy(){
   
    this.initializeOrDestroy();
  }

  onChangeCity() {
    
    this.autoNotification.WarehouseId = null;
    this.autoNotification.ClusterId = null;
    this.isShowWarehouse=false;
    this.isShowCluster = false;
    //this.autoNotificationHelperService.updateAutoNotification(this.autoNotification);
    if (this.autoNotification.CityId>0) {
      this.getWarehouse();
      this.isShowWarehouse=true;
      this.isShowCluster = true;
    } else {
      this.warehouseList = [];
    }
  }

  onChangeWarehouse() {
    //this.autoNotificationHelperService.updateAutoNotification(this.autoNotification);
    this.autoNotification.ClusterId = null;
    this.isShowCluster = false;
    if (this.autoNotification.WarehouseId>0) {
      this.getCluster();
      this.isShowCluster = true;
    } else {
      this.clusterList = [];
    }
  }

  onChangeCluster() {
    //this.autoNotificationHelperService.updateAutoNotification(this.autoNotification);
  }

  private initializeOrDestroy(){
    this.autoNotification.CityId = 0;
    this.autoNotification.WarehouseId = 0;
    this.autoNotification.ClusterId = null;
  }

  private setLocationFlags() {
    if (this.anEntityMaster.LocationExpression) {
      if (this.anEntityMaster.LocationExpression.indexOf('C') > -1) {
        this.isShowCity = true;
      }
      if (this.anEntityMaster.LocationExpression.indexOf('W') > -1) {
        this.isShowWarehouse = true;
      }
      if (this.anEntityMaster.LocationExpression.indexOf('L') > -1) {
        this.isShowCluster = true;
      }
    }
  }

  private getCityList() {
    this.autoNotificationService.City().subscribe(x => {
      this.cityList = x;
    });
  }

  private getWarehouse() {
    this.autoNotificationService.Warehouse(Number(this.autoNotification.CityId)).subscribe(x => {
      this.warehouseList = x;

    });
  }

  private getCluster() {
    this.autoNotificationService.Cluster(Number(this.autoNotification.WarehouseId)).subscribe(x => {
      this.clusterList = x;
    });
  }

}

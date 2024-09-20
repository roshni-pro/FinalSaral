import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-warehouse-action',
  templateUrl: './warehouse-action.component.html',
  styleUrls: ['./warehouse-action.component.scss']
})
export class WarehouseActionComponent implements OnInit {
  list:any;
  rowDataV1:any;
  popupOpen:boolean;
  historylist:any;
  lists:any;
  roleName:any;
  roleList:any;
  constructor(private warehouseService: WarehouseService,private confirmationService: ConfirmationService,private messageService : MessageService, private peoplePilot : PepolePilotService,private router :Router) { }

  ngOnInit() {
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      for (var i in this.roleList) {
        if ( this.roleList[i] == 'HQ Master login' || this.roleList[i] == 'Inbound Lead' || this.roleList[i] == 'Regional Inbound Lead' ||this.roleList[i] == 'Zonal Inbound Lead') {
          this.warehouseService.GetWarehoueAll().subscribe(result => {
            debugger;
            this.list = result;
          });
        }
      }
    });
  }
  start(listdata,Type){
    debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to IsDeliveryOptimizationEnabled?',
      accept: () => { 
        if(Type==0)
        {
          listdata.IsDeliveryOptimizationEnabled=true;
        }
        else
        {
          listdata.IsDeliveryOptimizationEnabled=true;
        }        
        this.warehouseService.UpdateWarehoueAction(listdata.WarehouseId,Type,listdata.IsDeliveryOptimizationEnabled).subscribe(result =>{
        this.lists=result;
        this.messageService.add({ severity: 'error', summary: 'DeliveryOptimizationEnabled Process!!', detail: '' });
        this.warehouseService.GetWarehoueAll().subscribe(result => {
        this.list = result;
        });
        });
      }
    });
  }
  stop(listdatas,Type){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to IsLocationEnabled?',
      accept: () => { if(Type==1)
        {
          listdatas.IsLocationEnabled=false;
        }
        else
        {
          listdatas.IsLocationEnabled=false;
        }
        this.warehouseService.UpdateWarehoueAction(listdatas.WarehouseId,Type, listdatas.IsLocationEnabled).subscribe(result =>{
          this.lists=result;
         this.messageService.add({ severity: 'success', summary: 'LocationEnabled SuccessFully', detail: '' });
         this.warehouseService.GetWarehoueAll().subscribe(result => {
          this.list = result;
        });
        });
      }
    });
  }

  openDetails(rowDataV1){
    this.popupOpen=true;
    this.warehouseService.getInventorycyclehistory(rowDataV1.WarehouseId).subscribe(result =>{
      this.historylist=result;
    });
  }
}

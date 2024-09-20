import { Component, OnInit } from '@angular/core';
import { NotificationDC } from 'app/notification/interface/notificationDc';
import { NotificationService } from 'app/notification/service/notification.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-people-sent-notification-list',
  templateUrl: './people-sent-notification-list.component.html',
  styleUrls: ['./people-sent-notification-list.component.scss']
})
export class PeopleSentNotificationListComponent implements OnInit {
  WarehouseId : number;
  warehouseList : any;
  blocked : boolean = false;
  peopleList : any;
  PeopleID : number;
  notificationList : any;
  totalRecords : number;
  skip : number;
  take : number;
  OrderId : number;
  notificationDC : NotificationDC;
  isInvalid : boolean = false;
  today: any;
  status : any;
  constructor(private warehouseService : WarehouseService,private notificationService : NotificationService,
    private confirmationService: ConfirmationService,private messageService : MessageService) { }

  ngOnInit() {
    this.WarehouseId = null;
    this.PeopleID = null;
    // this.blocked = true;
    this.warehouseService.getSpecificWarehouses().subscribe(result => {
      // debugger;
      this.warehouseList = result;
      this.blocked = false;
    });
  }
  onChangeWarehouse(WarehouseId){
    this.blocked = true;
    this.notificationService.getWarehouseWisePeoples(WarehouseId).subscribe(role=>{
      this.peopleList = role;
      this.blocked = false;
    })
  }
  onSearch(notifyForm){
    if (notifyForm.invalid) {
      this.isInvalid = true;
      return;
    }else{
    this.load(event);
    }
  }
  load(event){
    if(this.PeopleID > 0){
    var Last=  event.first ? event.first + event.rows : 10;
    this.skip=event.rows ? Last/ event.rows : 0;
    this.take= event.rows ? event.rows : 20;
    this.notificationDC = {
      OrderId : this.OrderId ? this.OrderId : null,
      PeopleId : this.PeopleID,
      skip : this.skip,
      take : this.take
    }
    this.blocked = true;
    this.notificationService.GetallNotificationsByOrderId(this.notificationDC).subscribe(x=>{
      this.blocked = false;
      // debugger;
      x.notificationmaster.forEach(element => {
        this.today = moment(new Date()).format('MM/DD/YYYY HH:mm:00');
        element.TimeLeft = moment(element.TimeLeft).format('MM/DD/YYYY HH:mm:00');
        if(element.TimeLeft >= this.today){
          // debugger;
          element.isTimeLeft = true;
          console.log('sgdh');
        }else{
          // debugger;
          element.isTimeLeft = false;
          console.log('sgdh vs');
        }   
      });     
      if(x.total_count > 0){
      this.notificationList = x.notificationmaster;
      this.totalRecords = x.total_count;
      this.notificationList.forEach(element => {
        if(element.AppId == 2){
          element.AppType = 'DeliveryApp';
        }else if(element.AppId == 3){
          element.AppType = 'SalesApp';
        }else if(element.AppId == 4){
          element.AppType = 'SarthiApp';
        }
     
      });
    }else{
      this.notificationList = null;
      this.totalRecords = null;
    }
    })
  }
  }
  ActiveInactive(ir,Status){
    // debugger;
    if(Status == 'Approved'){
     this.status =  ir.IsApproved;
    }else{
    this.status = false;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {        
        this.blocked = true;
        var statusApproved;
        if(this.status == true){
          statusApproved = 1;
        }else{statusApproved = 0;}
        this.notificationService.peopleSentNotificationApproved(ir.TripPlannerConfirmedDetailId,ir.OrderId,ir.ToPeopleId,statusApproved,ir.OrderStatus,ir.Id).subscribe(result => {
          this.blocked = false;
          if (result.Status) {
            // success message                                                     
            this.messageService.add({ severity: 'success', summary: 'Your PeopleSentNotifiocation Request is' + ' ' + Status + ' ' + 'Successfully!', detail: result.Message });         
            this.load(event);
          } else {
            // fail message
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
      },
      reject: () => {
        ir.IsApproved = !ir.IsApproved;
        this.messageService.add({ severity: 'error', summary: 'Your PeopleSentNotifiocation Request for' + ' ' + Status + ' ' + 'Process is Canceled!', detail: '' });
      }
    });
  }
}

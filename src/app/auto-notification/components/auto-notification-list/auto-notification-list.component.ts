import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, MessageService, Confirmation } from 'primeng/api';
import * as moment from 'moment';
import { AutoNotificationListService } from 'app/shared/services/auto-notification-list.service';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auto-notification-list',
  templateUrl: './auto-notification-list.component.html',
  styleUrls: ['./auto-notification-list.component.scss'],
})
export class AutoNotificationListComponent implements OnInit {
  IsPublish: boolean = false;
  rows: number;
  cols: any[];
  loading: boolean;
  C: Confirmation;
  AutoNotificationList: any[];
  blocked: boolean;
  IsActive: any;
  Id: any;  
  constructor(private messageService: MessageService,
    private autoNotificationListService: AutoNotificationListService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private autoNotificationService: AutoNotificationService) {

  }


  ngOnInit() {
    this.IsActive = "1";
    this.rows = 25;
    this.autoNotificationListService.AutoNotificationList().subscribe(result => {
      
      this.AutoNotificationList = result;
    })
  }

  addNotification() {
    this.router.navigateByUrl("layout/auto-notification/add");
  }


  publishStory(rowdata) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        
        this.blocked = true;
        this.autoNotificationService.PublishNotification(rowdata.Id).subscribe(result => {
          this.blocked = false;
          if (result) {
            // success message                            
            this.messageService.add({ severity: 'success', summary: 'Your Auto-Notifiocation Request is Updated Successfully!', detail: '' });
          } else {
            // fail message
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });

      },
      reject: () => {
        
        this.blocked = true;
        rowdata.IsPublish = false;
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Your AutoNotifiocation Request is Canceled!', detail: '' });
      }
    });
  }


  ActiveInactive(rowdata) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this.Id = rowdata.Id;
        this.autoNotificationService.IsActiveNotification(rowdata.Id, rowdata.IsActive).subscribe(result => {
          this.blocked = false;
          if (result) {
            // success message   
                                                  
            this.messageService.add({ severity: 'success', summary: 'Your Auto-Notifiocation Request is Activated Successfully!', detail: '' });         
            //window.location.reload();     
          } else {
            // fail message
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
      },
      reject: () => {
        rowdata.IsActive = !rowdata.IsActive;
        this.messageService.add({ severity: 'error', summary: 'Your AutoNotifiocation Request for IsActive Process is Canceled!', detail: '' });
      }
    });
  }

  onsearch(Active) {


    console.log(Active);


    
    this.autoNotificationListService.GetIsActiveWise(Active).subscribe(result => {
      console.log('resultresult::', result);
      this.AutoNotificationList = result;
      console.log(result);
    })



  }


}

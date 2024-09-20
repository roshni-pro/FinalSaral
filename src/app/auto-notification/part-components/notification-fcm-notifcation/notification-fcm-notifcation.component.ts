import { Component, OnInit } from '@angular/core';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { FCMNotification } from 'app/shared/interface/auto-notification/fcmnotification';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-notification-fcm-notifcation',
  templateUrl: './notification-fcm-notifcation.component.html',
  styleUrls: ['./notification-fcm-notifcation.component.scss']
})
export class NotificationFcmNotifcationComponent implements OnInit {

  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }
  fcmNotification: FCMNotification;
  autoNotification: AutoNotification;
  
  
  entityFieldList: MenuItem[];

  ngOnInit() {
    
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      
      this.initialzeOrDestroy();

    });
  }

  initialzeOrDestroy() {
    
    //this.fcmNotification.body = '';

    if (this.autoNotification.FCMNotification) {
      this.fcmNotification = JSON.parse(this.autoNotification.FCMNotification);
    } else {
      this.fcmNotification = {
        title: '',
        body: '',
        icon: ''
      }
      
      this.autoNotificationService.ANFieldMaster(this.autoNotification.EntityName).subscribe(x => {
        
            console.log('fields are', x);
            if (x && x.length > 0) {
              this.entityFieldList = [];
              x.forEach(x => {
                let item: MenuItem = {
                  label: x.FieldName,
                  id: x.DbObjectFieldName,
                  icon: 'pi pi-fw pi-chevron-right',
                  command: (event) => this.appendText(event)
                }
                this.entityFieldList.push(item);
              });
      
            }
          });
    }
  }



  appendText(event) {
    this.fcmNotification.body += ' [[' + event.item.id + ']]'

  }



  onFCMNotificationChange() {
    this.autoNotification.FCMNotification = JSON.stringify(this.fcmNotification);
  }

}

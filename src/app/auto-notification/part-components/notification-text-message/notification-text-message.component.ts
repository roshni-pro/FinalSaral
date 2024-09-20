import { Component, OnInit } from '@angular/core';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-notification-text-message',
  templateUrl: './notification-text-message.component.html',
  styleUrls: ['./notification-text-message.component.scss']
})
export class NotificationTextMessageComponent implements OnInit {

  autoNotification: AutoNotification;

  entityFieldList: MenuItem[];

  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }

  ngOnInit() {
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      this.initialzeOrDestroy();
    });

  }

  initialzeOrDestroy() {
    this.autoNotification.TextMessage = '';

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

  appendText(event) {
    this.autoNotification.TextMessage += ' [[' + event.item.id + ']]'

  }


}

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { Editor } from 'primeng/editor';
import { MenuItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  autoNotification: AutoNotification;
  editiorTextMessage: string;

  items2: MenuItem[];

  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }

  ngOnInit() {

    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      this.initialzeOrDestroy();

    });


    
  }
  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.initialzeOrDestroy();

  }

  initialzeOrDestroy() {
    this.autoNotification.AutoDialAudioText = '';
    this.autoNotification.TextMessage = '';
    this.autoNotification.AutoDialUrl = '';
    this.autoNotification.AutoDialAudioFile = '';
    this.editiorTextMessage = this.autoNotification.TextMessage;
  }

  onChangeSendToType(receiverType: string) {
    switch (receiverType) {
      case 'supplier':
        this.autoNotification.IsCustomerNotification = false;
        this.autoNotification.IsPeopleNotification = false;
        break;
      case 'customer':
        this.autoNotification.IsPeopleNotification = false;
        this.autoNotification.IsSupplierNotification = false;
        break;
      default:
        this.autoNotification.IsCustomerNotification = false;
        this.autoNotification.IsSupplierNotification = false;
        break;
    }
  }





}

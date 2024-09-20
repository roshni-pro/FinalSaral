import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';

@Component({
  selector: 'app-promotion-one-time-base',
  templateUrl: './promotion-one-time-base.component.html',
  styleUrls: ['./promotion-one-time-base.component.scss']
})
export class PromotionOneTimeBaseComponent implements OnInit, OnDestroy {
  autoNotification: AutoNotification;
  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }

  ngOnInit() {
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      this.initializeAndDestroy();
      console.log('Promotional one time BaseComponent - this.autoNotification: ', this.autoNotification);
    });
  }

  ngOnDestroy() {
    this.initializeAndDestroy();
  }


  initializeAndDestroy() {
    this.autoNotification.StartDate = null;
  }

}

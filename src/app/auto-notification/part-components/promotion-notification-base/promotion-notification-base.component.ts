import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { SelectItem } from 'primeng/api';
import { ANScheduleMaster } from 'app/shared/interface/auto-notification/anschedule-master';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';

@Component({
  selector: 'app-promotion-notification-base',
  templateUrl: './promotion-notification-base.component.html',
  styleUrls: ['./promotion-notification-base.component.scss']
})
export class PromotionNotificationBaseComponent implements OnInit, OnDestroy {

  autoNotification: AutoNotification;
  anEventTypeList: SelectItem[];

  anScheduleMasterList: ANScheduleMaster[];


  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }

  ngOnInit() {
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      this.initializeOrDestroy();
    });


    //this.autoNotificationHelperService.updateAutoNotification(this.autoNotification);

    this.getANEventTypeList();
    this.getANScheduleMaster();
  }


  ngOnDestroy() {
    this.initializeOrDestroy();
  }

  initializeOrDestroy() {
    this.autoNotification.ANEventType = 'Schedule';
    this.autoNotification.ANScheduleMaster = null;
  }


  onANScheduleMasterChange() {
    //this.updateNotification(this.autoNotification);
    if (this.autoNotification.ANScheduleMaster) {
      this.autoNotification.ANScheduleMasterId = this.autoNotification.ANScheduleMaster.Id;
    } else {
      this.autoNotification.ANScheduleMasterId = null;
    }

    //this.autoNotificationHelperService.updateAutoNotification(this.autoNotification);

  }


  private getANEventTypeList() {
    this.anEventTypeList = [
      { label: 'Schedule', value: 'Schedule' },
      { label: 'Transaction', value: 'Transaction' }
    ];
  }

  private getANScheduleMaster() {
    this.autoNotificationService.ANScheduleMaster().subscribe(x => {
      this.anScheduleMasterList = x;
      console.log('this.anScheduleMasterList:', this.anScheduleMasterList);
    });
  }



}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { ANScheduleMaster } from 'app/shared/interface/auto-notification/anschedule-master';
import { ANEntityMaster } from 'app/shared/interface/auto-notification/anentity-master';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-event-notification-base',
  templateUrl: './event-notification-base.component.html',
  styleUrls: ['./event-notification-base.component.scss']
})
export class EventNotificationBaseComponent implements OnInit, OnDestroy {
  autoNotification: AutoNotification;
  anScheduleMasterList: ANScheduleMaster[];
  anEventTypeList: SelectItem[];
  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }

  ngOnInit() {
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      this.initialzeOrDestroy();
    });
    this.getANScheduleMaster();
    this.getANEventTypeList();
  }

  ngOnDestroy() {
    this.initialzeOrDestroy();
  }

  private initialzeOrDestroy() {
    this.autoNotification.ANScheduleMaster = null;
    this.autoNotification.ANScheduleMasterId = null;
    this.autoNotification.ANEventType = '';
  }

  getANScheduleMaster() {
    this.autoNotificationService.ANScheduleMaster().subscribe(x => {
      this.anScheduleMasterList = x;
    });
  }


  private getANEventTypeList() {
    this.anEventTypeList = [
      { label: 'Schedule', value: 'Schedule' },
      { label: 'Transaction', value: 'Transaction' }
    ];
  }

  onANScheduleMasterChange() {
    if (this.autoNotification.ANScheduleMaster) {
      this.autoNotification.ANScheduleMasterId = this.autoNotification.ANScheduleMaster.Id;
    } else {
      this.autoNotification.ANScheduleMasterId = null;
    }
  }

  onANEventTypeChange(){
    
    if(this.autoNotification.ANEventType != 'Schedule'){
      this.autoNotification.ANScheduleMaster = null;
      this.onANScheduleMasterChange();
      this.autoNotification.StartDate = null;
      this.autoNotification.EndDate = null;
    }
  }

}

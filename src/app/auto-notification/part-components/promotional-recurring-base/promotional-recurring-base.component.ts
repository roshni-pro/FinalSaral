import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { ANFrequencyMaster } from 'app/shared/interface/auto-notification/anfrequency-master';

@Component({
  selector: 'app-promotional-recurring-base',
  templateUrl: './promotional-recurring-base.component.html',
  styleUrls: ['./promotional-recurring-base.component.scss']
})
export class PromotionalRecurringBaseComponent implements OnInit, OnDestroy {
  autoNotification: AutoNotification;
  anFrequencyMastersList: ANFrequencyMaster[];
  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }

  ngOnInit() {
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      this.initializeAndDestroy();
      console.log('PromotionalRecurringBaseComponent - this.autoNotification: ', this.autoNotification);
    });

    this.getANFrequencyMaster();
    // this.autoNotification.ANFrequencyMasterId
  }

  ngOnDestroy() {
    this.initializeAndDestroy();
  }

  onANFrequencyMasterChange() {
    if (this.autoNotification.ANFrequencyMasterId) {
      let frequence = this.anFrequencyMastersList.filter(x => { return x.Id == this.autoNotification.ANFrequencyMasterId })[0];
      this.autoNotification.ANFrequencyMaster = frequence;
      this.autoNotification.RecurEvery = null;
    } else {
      this.autoNotification.ANFrequencyMaster = null;
    }

  }


  private getANFrequencyMaster() {
    this.autoNotificationService.ANFrequencyMasters().subscribe(x => {
      this.anFrequencyMastersList = x;
      console.log('this.anFrequencyMastersList', this.anFrequencyMastersList);
    });
  }

  initializeAndDestroy() {
    this.autoNotification.ANFrequencyMasterId = null;
    this.autoNotification.ANFrequencyMaster = null;
    this.autoNotification.RecurEvery = null;
    this.autoNotification.StartDate = null;
    this.autoNotification.EndDate = null;
  }

}

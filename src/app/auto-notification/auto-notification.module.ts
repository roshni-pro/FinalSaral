import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoNotificationRoutingModule } from './auto-notification-routing.module';
import { ManageAutoNotificationComponent } from './components/manage-auto-notification/manage-auto-notification.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { AutoNotificationLocationComponent } from './part-components/auto-notification-location/auto-notification-location.component';
import { PromotionNotificationBaseComponent } from './part-components/promotion-notification-base/promotion-notification-base.component';
import { EventNotificationBaseComponent } from './part-components/event-notification-base/event-notification-base.component';
import { PromotionalRecurringBaseComponent } from './part-components/promotional-recurring-base/promotional-recurring-base.component';
import { PromotionOneTimeBaseComponent } from './part-components/promotion-one-time-base/promotion-one-time-base.component';
import { EventConditionComponent } from './part-components/event-condition/event-condition.component';
import { ReadableAutoNotificationComponent } from './part-components/readable-auto-notification/readable-auto-notification.component';
import { NotificationDetailsComponent } from './part-components/notification-details/notification-details.component';
import { NotificationTextMessageComponent } from './part-components/notification-text-message/notification-text-message.component';
import { NotificationFcmNotifcationComponent } from './part-components/notification-fcm-notifcation/notification-fcm-notifcation.component';
import { AutoNotificationListComponent } from './components/auto-notification-list/auto-notification-list.component';


@NgModule({
  declarations: [ManageAutoNotificationComponent, AutoNotificationLocationComponent, PromotionNotificationBaseComponent, EventNotificationBaseComponent, PromotionalRecurringBaseComponent, PromotionOneTimeBaseComponent, EventConditionComponent, ReadableAutoNotificationComponent, NotificationDetailsComponent, NotificationTextMessageComponent, NotificationFcmNotifcationComponent,AutoNotificationListComponent],
  imports: [
    CommonModule,
    AutoNotificationRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class AutoNotificationModule { }

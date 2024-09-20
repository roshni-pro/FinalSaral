import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { PeopleSentNotificationListComponent } from './components/people-sent-notification-list/people-sent-notification-list.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PeopleSentNotificationListComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ShaopkiranaSharedModule,
    SharedModule,
    FormsModule,
  ]
})
export class NotificationModule { }

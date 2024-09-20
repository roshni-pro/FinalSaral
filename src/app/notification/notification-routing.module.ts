import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleSentNotificationListComponent } from './components/people-sent-notification-list/people-sent-notification-list.component';


const routes: Routes = [
  {path: '', component: PeopleSentNotificationListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }

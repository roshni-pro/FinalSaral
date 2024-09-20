import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAutoNotificationComponent } from './components/manage-auto-notification/manage-auto-notification.component';
import { AutoNotificationListComponent } from './components/auto-notification-list/auto-notification-list.component';


const routes: Routes = [
  {path: 'add', component: ManageAutoNotificationComponent},
  {path: 'edit/:autoNotificationID', component: ManageAutoNotificationComponent},
  {path: 'autoNotificationList', component: AutoNotificationListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoNotificationRoutingModule { }

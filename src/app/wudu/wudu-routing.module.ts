import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WuduAppVersionComponent } from './components/wudu-app-version/wudu-app-version.component';
import { WuduNotificationComponent } from './components/wudu-notification/wudu-notification.component';
import { WuduDashboardComponent } from './components/wudu-dashboard/wudu-dashboard.component';

const routes: Routes = [
  { path: 'appversion', component: WuduAppVersionComponent },
  { path: 'wudu-notification', component: WuduNotificationComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WuduRoutingModule { }

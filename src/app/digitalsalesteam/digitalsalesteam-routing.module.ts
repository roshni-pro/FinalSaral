import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './component/notification/notification.component';
import { ApplicationbannerComponent } from './component/applicationbanner/applicationbanner.component';
import { BrandstoreComponent } from './component/brandstore/brandstore.component';
import { FlashdealComponent } from './component/flashdeal/flashdeal.component';
import { MurliComponent } from './component/murli/murli.component';


const routes: Routes = [
   { path: 'notification', component: NotificationComponent },
  { path: 'application-banner', component: ApplicationbannerComponent },
  { path: 'murli', component: MurliComponent },
  { path: 'flash-deal', component: FlashdealComponent },
  { path: 'brand-store', component: BrandstoreComponent },
  // { path: 'brand-store-list', component: BannerstorelistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalsalesteamRoutingModule { }

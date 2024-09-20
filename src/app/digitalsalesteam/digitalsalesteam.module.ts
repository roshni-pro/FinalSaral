import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalsalesteamRoutingModule } from './digitalsalesteam-routing.module';
import { NotificationComponent } from './component/notification/notification.component';
import { ApplicationbannerComponent } from './component/applicationbanner/applicationbanner.component';
import { BrandstoreComponent } from './component/brandstore/brandstore.component';
import { FlashdealComponent } from './component/flashdeal/flashdeal.component';
import { MurliComponent } from './component/murli/murli.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


@NgModule({
  declarations: [NotificationComponent, ApplicationbannerComponent, BrandstoreComponent, FlashdealComponent, MurliComponent],
  imports: [
    CommonModule,
    DigitalsalesteamRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class DigitalsalesteamModule { }

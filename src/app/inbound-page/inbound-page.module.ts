import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboundPageRoutingModule } from './inbound-page-routing.module';
import { InboundDashboardPageComponent } from './Component/inbound-dashboard-page/inbound-dashboard-page.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SharedModule } from 'primeng/primeng';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [InboundDashboardPageComponent],
  imports: [
    CommonModule,
    InboundPageRoutingModule,
    ShaopkiranaSharedModule,
    SharedModule,
    CardModule
    
  ]
})
export class InboundPageModule { }

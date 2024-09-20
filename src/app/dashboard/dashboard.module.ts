import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SharedModule } from 'primeng/primeng';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import {AccordionModule} from 'primeng/accordion';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ShaopkiranaSharedModule,
    AccordionModule,
    ChartModule
  ]
})
export class DashboardModule { }

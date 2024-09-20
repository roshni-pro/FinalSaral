import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyDashboardRoutingModule } from './company-dashboard-routing.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { DemanditemComponent } from './components/demanditem/demanditem.component';
import { DemandcustomerComponent } from './components/demandcustomer/demandcustomer.component';



@NgModule({
  declarations: [DemanditemComponent, DemandcustomerComponent],
  imports: [
    CommonModule,
    CompanyDashboardRoutingModule,
    SkSharedModule
  ]
})
export class CompanyDashboardModule { }

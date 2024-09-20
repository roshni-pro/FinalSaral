import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './components/buyer/buyer.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BuyerDetailsComponent } from './components/buyer-details/buyer-details.component';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { BuyerInoutComponent } from './components/buyer-inout/buyer-inout.component';
import {BuyerDashboardComponent} from './components/buyer-dashboard/buyer-dashboard.component';
import {DropdownModule} from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [BuyerComponent, BuyerDetailsComponent, BuyerInoutComponent,BuyerDashboardComponent],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    ShaopkiranaSharedModule,
    TableModule,
    DialogModule,
    StepsModule,
    CalendarModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    DropdownModule,
    MenubarModule
  ]
})
export class BuyerModule { }

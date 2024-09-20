import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from 'primeng/chart';

import { DeliveryCapacityOptiRoutingModule } from './delivery-capacity-opti-routing.module';
import { DeliveryCapacityComponent } from './Components/delivery-capacity/delivery-capacity.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { WarehouseScheduleCapacityComponent } from './Components/warehouse-schedule-capacity/warehouse-schedule-capacity.component';
import { YearCalendarModule } from '@iomechs/angular-year-calendar';
import { HolidaysComponent } from './Components/holidays/holidays.component';
import { ClusterHolidaysComponent } from './Components/cluster-holidays/cluster-holidays.component';
import { CustomerHolidaysComponent } from './Components/customer-holidays/customer-holidays.component';
import { PriorityWarehouseStoresComponent } from './Components/priority-warehouse-stores/priority-warehouse-stores.component';

// import { AngularCalendarYearViewModule } from 'angular-calendar-year-view';

@NgModule({
  declarations: [DeliveryCapacityComponent, WarehouseScheduleCapacityComponent, HolidaysComponent, ClusterHolidaysComponent, CustomerHolidaysComponent,PriorityWarehouseStoresComponent],
  imports: [
    CommonModule
    , DeliveryCapacityOptiRoutingModule
    , ShaopkiranaSharedModule
    , SkSharedModule
    ,YearCalendarModule
    ,ChartModule
    // ,AngularCalendarYearViewModule
  ]
})
export class DeliveryCapacityOptiModule { }

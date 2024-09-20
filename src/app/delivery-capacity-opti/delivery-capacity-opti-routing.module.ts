import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryCapacityComponent } from './Components/delivery-capacity/delivery-capacity.component';
import { WarehouseScheduleCapacityComponent } from './Components/warehouse-schedule-capacity/warehouse-schedule-capacity.component';
import { HolidaysComponent } from './Components/holidays/holidays.component';
import { PriorityWarehouseStoresComponent } from './Components/priority-warehouse-stores/priority-warehouse-stores.component';


const routes: Routes = [

  {
    path:'DeliveryCapacity-Report',
    component:DeliveryCapacityComponent
  },
  {
    path:'WarehouseCapacity-Schedule',
    component:WarehouseScheduleCapacityComponent
  },
  {
    path:'HolidaysComponent',
    component:HolidaysComponent
  },
  {
    path:'PriorityWarehouseStores',
    component:PriorityWarehouseStoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryCapacityOptiRoutingModule { }

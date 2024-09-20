import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleMasterRoutingModule } from './vehicle-master-routing.module';
import { AddVehicleMasterComponent } from './components/add-vehicle-master/add-vehicle-master.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { VehicleMasterListPageComponent } from './components/vehicle-master-list-page/vehicle-master-list-page.component';
import { TabViewModule } from 'primeng/tabview';
import { DriverMstComponent } from './components/driver-mst/driver-mst.component';
import { DboyMstComponent } from './components/dboy-mst/dboy-mst.component';
import { AddDboyMstComponent } from './components/add-dboy-mst/add-dboy-mst.component';


@NgModule({
  declarations: [AddVehicleMasterComponent, VehicleMasterListPageComponent,DriverMstComponent,DboyMstComponent, AddDboyMstComponent],
  imports: [
    CommonModule,
    VehicleMasterRoutingModule,
    ShaopkiranaSharedModule,
    TabViewModule
  ]
})
export class VehicleMasterModule { }

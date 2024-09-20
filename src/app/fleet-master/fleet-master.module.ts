import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetMasterRoutingModule } from './fleet-master-routing.module';
import { AddFleetMasterComponent } from './components/add-fleet-master/add-fleet-master.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FleetMasterListComponent } from './components/fleet-master-list/fleet-master-list.component';


@NgModule({
  declarations: [AddFleetMasterComponent, FleetMasterListComponent],
  imports: [
    CommonModule,
    FleetMasterRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class FleetMasterModule { }

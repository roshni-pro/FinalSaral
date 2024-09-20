import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFleetMasterComponent } from './components/add-fleet-master/add-fleet-master.component';
import { FleetMasterListComponent } from './components/fleet-master-list/fleet-master-list.component';



const routes: Routes = [
  {path: 'fleet', component: AddFleetMasterComponent},
  {path: 'edit-fleet/:Id', component: AddFleetMasterComponent},
  {path: 'fleet-master-List', component: FleetMasterListComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetMasterRoutingModule { }

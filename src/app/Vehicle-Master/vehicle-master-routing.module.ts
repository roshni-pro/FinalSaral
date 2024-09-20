import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDboyMstComponent } from './components/add-dboy-mst/add-dboy-mst.component';
import { AddVehicleMasterComponent } from './components/add-vehicle-master/add-vehicle-master.component';
import { DboyMstComponent } from './components/dboy-mst/dboy-mst.component';
import { DriverMstComponent } from './components/driver-mst/driver-mst.component';
import { VehicleMasterListPageComponent } from './components/vehicle-master-list-page/vehicle-master-list-page.component';



const routes: Routes = [
  {path: 'vehicle', component: AddVehicleMasterComponent},
  {path: 'vehicle-master-List', component: VehicleMasterListPageComponent},
  {path: 'edit-vehicle/:Id', component: AddVehicleMasterComponent},
  {path: 'driverMaster', component:DriverMstComponent},
  {path:'dboy', component:DboyMstComponent},
  {path:'Adddboy', component:AddDboyMstComponent},
  {path: 'edit-Dboy/:Id', component: AddDboyMstComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleMasterRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseCreationComponent } from './components/warehouse-creation/warehouse-creation.component';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';
import { ClusterComponent } from './components/cluster/cluster.component';
import { ClusterEditComponent } from './components/cluster-edit/cluster-edit.component';
import { AreaComponent } from './components/area/area.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { AddagentComponent } from './components/addagent/addagent.component';
import { AddcityComponent } from './components/addcity/addcity.component';
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';
import { ClustercitymapComponent } from './components/clustercitymap/clustercitymap.component';
import { ClustermapComponent } from './components/clustermap/clustermap.component';
import { RefreshClusterCustomerComponent } from './components/refresh-cluster-customer/refresh-cluster-customer.component';
import { ViewClusterComponent } from './components/view-cluster/view-cluster.component';
import { ViewClusterMapComponent } from './components/view-cluster-map/view-cluster-map.component';
import { ViewClusterCityMapComponent } from './components/view-cluster-city-map/view-cluster-city-map.component';
import { InventCyclesWarehouesComponent } from './components/InventCyclesWarehoues/invent-cycles-warehoues/invent-cycles-warehoues.component';
import { WarehousemapComponent } from './components/warehousemap/warehousemap.component';
import { WarehouseActionComponent } from './components/warehouse-action/warehouse-action.component';


const routes: Routes = [
  {path: 'warehouse', component: WarehouseCreationComponent},
  {path: 'add', component: AddWarehouseComponent},
  {path: 'cluster', component: ClusterComponent},
  {path: 'cluster-edit', component: ClusterEditComponent},
  {path: 'area', component: AreaComponent},
  {path: 'area-edit', component: AreaEditComponent},
  {path: 'addagent', component: AddagentComponent},
  {path: 'addcity', component: AddcityComponent},
  {path: 'addvehicle', component: AddvehicleComponent},
  {path: 'clustercitymap/:CityId', component: ClustercitymapComponent},
  {path: 'clustermap', component: ClustermapComponent},
  {path: 'refreshclustercustomer/:CityId', component: RefreshClusterCustomerComponent},

  {path: 'viewcluster', component: ViewClusterComponent}, 
 {path: 'viewclustercitymap/:CityId', component: ViewClusterCityMapComponent},
  {path: 'viewclustermap', component: ViewClusterMapComponent},
  {path: 'InventCyclesWarehoue', component: InventCyclesWarehouesComponent},
  {path: 'ExecutiveTracking', component:WarehousemapComponent},
  {path: 'warehouseAction', component: WarehouseActionComponent},
];

@NgModule({   
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }

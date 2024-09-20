import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClusterStoreBeatMappingComponent } from './components/cluster-store-beat-mapping/cluster-store-beat-mapping.component';


const routes: Routes = [
  { path: 'clusterStoreBeatMapping', component: ClusterStoreBeatMappingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClusterStoreBeatMappingRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreClusterBeatMappingComponent } from './components/store-cluster-beat-mapping/store-cluster-beat-mapping.component';
import { StoreListComponent } from './components/store-list/store-list.component';


const routes: Routes = [
  {path: 'store-list', component: StoreListComponent},
  { path: 'StoreClusterBeatMapping', component: StoreClusterBeatMappingComponent},
  { path: '**', component: StoreListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

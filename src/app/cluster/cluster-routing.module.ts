import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClusterStoreComponent } from './components/cluster-store/cluster-store.component';

const routes: Routes = [
  { path: 'clusterStoreBeatMapping', component: ClusterStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClusterRoutingModule { }

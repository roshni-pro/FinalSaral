import { BrandlistComponent } from './../components/brandlist/brandlist.component';
import { WhousBrandGraphComponent } from './../components/whous-brand-graph/whous-brand-graph.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehousematerialslistComponent } from '../components/warehousematerialslist/warehousematerialslist.component';

const routes: Routes = [
  { path: '', component: WarehousematerialslistComponent },
  { path: 'brandbuyerallocationroot', component: WarehousematerialslistComponent },
  { path: 'graph', component: WhousBrandGraphComponent },
  { path: 'brandList', component: BrandlistComponent }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseMaterialsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddwarehouseVedioComponent } from './component/addwarehouse-vedio/addwarehouse-vedio.component';
import { WarehouseVedioComponent } from './component/warehouse-vedio/warehouse-vedio.component';
import { WarehousesvedioDetailComponent } from './component/warehousesvedio-detail/warehousesvedio-detail.component';


const routes: Routes = [
  {path: 'warehousevedio', component: WarehouseVedioComponent},
  {path: 'addwarehouse-vedio', component: AddwarehouseVedioComponent},
  {path: 'warehouse-detail', component: WarehousesvedioDetailComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehousevedioRoutingModule { }

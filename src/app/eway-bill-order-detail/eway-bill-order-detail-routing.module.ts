import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EwaybillorderdetailComponent } from './ewaybillorderdetail/ewaybillorderdetail.component';

const routes: Routes = [
  {
    path:'Ewaybill',
    component:EwaybillorderdetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EwayBillOrderDetailRoutingModule { }

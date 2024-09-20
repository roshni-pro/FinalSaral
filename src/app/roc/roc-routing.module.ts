import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerRocComponent } from './Component/buyer-roc/buyer-roc.component';


const routes: Routes = [
  {
    path:'BuyerROC',
    component:BuyerRocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ROCRoutingModule { }

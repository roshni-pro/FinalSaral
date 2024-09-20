import { CouponcodesComponent } from './Components/couponcodes/couponcodes.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: CouponcodesComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class CouponCodesRoutingModule { }

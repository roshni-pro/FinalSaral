import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EwayPageComponent } from './eway-page/eway-page.component';


const routes: Routes = [
  {
    path:'Ebill',
    component:EwayPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EwayDetailsRoutingModule { }

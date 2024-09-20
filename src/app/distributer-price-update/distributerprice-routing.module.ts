import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistributerpriceComponent } from './components/distributerprice/distributerprice.component';


const routes: Routes = [
  {path: 'distributerprice', component: DistributerpriceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributerpriceRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenNetworkPincodeComponent } from './open-network-pincode/open-network-pincode.component';


const routes: Routes = [
  {path: 'direct-open-network-pincode', component: OpenNetworkPincodeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectOpenNetworkPincodeRoutingModule { }

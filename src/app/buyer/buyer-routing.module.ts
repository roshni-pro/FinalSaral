import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerComponent } from './components/buyer/buyer.component';
import { BuyerDetailsComponent } from './components/buyer-details/buyer-details.component';
import { BuyerInoutComponent } from './components/buyer-inout/buyer-inout.component';
import { BuyerDashboardComponent } from './components/buyer-dashboard/buyer-dashboard.component';




const routes: Routes = [
 {path: 'buyer', component: BuyerComponent},
 {path: 'buyer-details', component: BuyerDetailsComponent},
 {path:'buyer-inout',component:BuyerInoutComponent},
 {path:'buyer-dashboard', component:BuyerDashboardComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }

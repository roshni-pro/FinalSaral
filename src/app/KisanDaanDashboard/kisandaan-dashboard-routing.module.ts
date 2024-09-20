import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KisanDaanAddDetailsComponent } from './components/kisan-daan-add-details/kisan-daan-add-details.component';
import { KkCustomerDashboardComponent } from './components/kk-customer-dashboard/kk-customer-dashboard.component';


const routes: Routes = [ 
{path:'KisanDaanDashboard', component: KisanDaanAddDetailsComponent},
{path:'CustomerDashboard', component: KkCustomerDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KisandaanDashboardRoutingModule { }

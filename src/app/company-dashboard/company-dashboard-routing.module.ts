import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemanditemComponent } from './components/demanditem/demanditem.component';
import { DemandcustomerComponent } from './components/demandcustomer/demandcustomer.component';

const routes: Routes = [
 
  {path: 'demanditem', component: DemanditemComponent},
  {path: 'demandcustomer', component: DemandcustomerComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyDashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './components/sales/sales.component';
import { CustomerdelightComponent } from './components/customerdelight/customerdelight.component';
import { AgentKPPComponent } from './components/agent-kpp/agent-kpp.component';
import { SourcingComponent } from './components/sourcing/sourcing.component';
import { OperationComponent } from './components/operation/operation.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { CustomerDelightComponent } from './components/customer-delight/customer-delight.component';

const routes: Routes = [
 //{ path: 'deletepeople', component: DeletePeopleComponent},
  { path: 'sales', component: SalesComponent},
  { path: 'customerdelight', component: CustomerdelightComponent},
  { path: 'agent-kpp', component: AgentKPPComponent}, 
  { path: 'sourcing', component: SourcingComponent} ,
  { path: 'operation', component: OperationComponent},
  { path: 'purchase', component: PurchaseComponent}, 
  { path: 'customer-delight', component: CustomerDelightComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TownhallRoutingModule { }

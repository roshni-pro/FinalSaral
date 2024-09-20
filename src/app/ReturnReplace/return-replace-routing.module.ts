import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReturnReplaceDashboardComponent } from './components/return-replace-dashboard/return-replace-dashboard.component';
import { PlannerListComponent } from './components/planner-list/planner-list.component';
import { SalesReturnComponent } from 'app/sales-app-backend-pages/Components/sales-return/sales-return.component';
import { SalesReturnDashboardComponent } from './components/sales-return-dashboard/sales-return-dashboard.component';


const routes: Routes = [
  { path: 'return-replace-dashboard', component: ReturnReplaceDashboardComponent },
  { path: 'return-replace-planner-dashboard', component: PlannerListComponent },
  { path: 'refund-dashboard', component: SalesReturnDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnReplaceRoutingModule { }

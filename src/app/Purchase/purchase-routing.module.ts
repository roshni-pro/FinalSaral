import { ReturnListComponent } from './component/return-list/return-list.component';
import { ReturnApprovalComponent } from './component/return-approval/return-approval.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReturnComponent } from './component/return/return.component';


const routes: Routes = [
  { path: 'return/:id', component: ReturnComponent },
  { path: 'returnList', component: ReturnListComponent }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }

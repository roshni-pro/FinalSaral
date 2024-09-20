import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchMasterApproverComponent } from './batch-master-approver/batch-master-approver.component';
import { BatchMasterComponent } from './batch-master/batch-master.component';


const routes: Routes = [
  {
    path:'batchMaster',
    component:BatchMasterComponent
  },
  {
    path:'batchMasterApprover',
    component:BatchMasterApproverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchmasterRoutingModule { }

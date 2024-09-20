import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MastercheckerComponent } from './component/masterchecker/masterchecker.component';;
import { MastercheckerEditComponent } from './component/masterchecker-edit/masterchecker-edit.component';
import { ApproverComponent } from './component/approver/approver.component';
import { ChecherdetailsComponent } from './component/checherdetails/checherdetails.component';

const routes: Routes = [
  { path: 'masterchecker', component: MastercheckerComponent },
  { path: 'mastercheckeredit', component: MastercheckerEditComponent },
  { path: 'supplierOnboardapprover', component: ApproverComponent },
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class CheckerRoutingModule { }
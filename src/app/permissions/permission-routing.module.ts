import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { PageMasterComponent } from './components/page-master/page-master.component';
import { RolePagePermissionComponent } from './components/role-page-permission/role-page-permission.component';
import { PageButtonPermissionComponent } from './components/page-button-permission/page-button-permission.component';
import { RequestToBeApprovedComponent } from './request-to-be-approved/request-to-be-approved.component';
import { UserAccessDApprovedComponent } from './user-access-dapproved/user-access-dapproved.component';
import { PermissionLookupComponent } from './permission-lookup/permission-lookup.component';
import { RoleRequestComponent } from './components/role-request/role-request.component';




const routes: Routes = [
  { path: 'pagemaster', component: PageMasterComponent },
  { path: 'role-page-permission', component: RolePagePermissionComponent },
  { path: 'page-button-permission', component: PageButtonPermissionComponent },
  { path: 'RequestAccess', component: PermissionLookupComponent },
  { path: 'RequestAdd', component: RoleRequestComponent },
  { path: 'RequestApprove', component: RequestToBeApprovedComponent },
  { path: 'RequestApprovebyUAC', component: UserAccessDApprovedComponent }
   
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }

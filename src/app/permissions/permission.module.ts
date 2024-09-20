import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PageMasterComponent } from './components/page-master/page-master.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { RolePagePermissionComponent } from './components/role-page-permission/role-page-permission.component';
import { PageButtonPermissionComponent } from './components/page-button-permission/page-button-permission.component';
import { RoleRequestComponent } from './components/role-request/role-request.component';
import { RequestToBeApprovedComponent } from './request-to-be-approved/request-to-be-approved.component';
import { UserAccessDApprovedComponent } from './user-access-dapproved/user-access-dapproved.component';
import { PermissionLookupComponent } from './permission-lookup/permission-lookup.component';
// import { PermissionModalComponent } from './permission-modal/permission-modal.component';


@NgModule({
  declarations: [
    PageMasterComponent,
    RolePagePermissionComponent,
    PageButtonPermissionComponent,
    RoleRequestComponent,
    RequestToBeApprovedComponent,
    UserAccessDApprovedComponent,
    PermissionLookupComponent,
    // PermissionModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    PermissionRoutingModule,
    ShaopkiranaSharedModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
  ]
})
export class PermissionModule { }

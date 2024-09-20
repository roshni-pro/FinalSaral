import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterOwnerComponent } from './components/master-owner/master-owner.component';
import { ExportRequestComponent } from './components/export-request/export-request.component';


const routes: Routes = [
  { path: 'master-owner', component: MasterOwnerComponent},
  { path: 'export-request', component: ExportRequestComponent}
 ];

 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class MasterexportRoutingModule { }

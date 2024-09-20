import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterOwnerComponent } from './components/master-owner/master-owner.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { MasterexportRoutingModule } from './masterexport-routing.module';
import { ExportRequestComponent } from './components/export-request/export-request.component';



@NgModule({
  declarations: [
    MasterOwnerComponent,
    ExportRequestComponent],
  imports: [
    CommonModule,
    ShaopkiranaSharedModule,
    MasterexportRoutingModule
  ]
})
export class MasterExportModule { }

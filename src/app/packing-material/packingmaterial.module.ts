import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackingmaterialRoutingModule } from './packingmaterial-routing.module';
import { MaterialItemMasterComponent } from './components/material-item-master/material-item-master.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PackingMaterialPOComponent } from './components/packing-material-po/packing-material-po.component';
import { AddMaterialPOComponent } from './components/add-material-po/add-material-po.component';
import { MaterialGRApprovalComponent } from './components/material-grapproval/material-grapproval.component';
import { PackingMaterialIRComponent } from './components/packing-material-ir/packing-material-ir.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
// import { AddMaterialItemMasterComponent } from './components/add-material-item-master/add-material-item-master.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { PackingMaterialDashboardComponent } from './components/packing-material-dashboard/packing-material-dashboard.component';


@NgModule({
  declarations: [MaterialItemMasterComponent, PackingMaterialPOComponent, AddMaterialPOComponent, MaterialGRApprovalComponent, PackingMaterialIRComponent, InvoiceFormComponent, InvoiceListComponent, PackingMaterialDashboardComponent],
  imports: [
    CommonModule,
    PackingmaterialRoutingModule,
    ShaopkiranaSharedModule,
    FormsModule,
    TableModule,
    DialogModule
  ]
})
export class PackingmaterialModule { }

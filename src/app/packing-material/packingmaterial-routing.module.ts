import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialItemMasterComponent } from './components/material-item-master/material-item-master.component';
import { PackingMaterialPOComponent } from './components/packing-material-po/packing-material-po.component';
// import { AddMaterialItemMasterComponent } from './components/add-material-item-master/add-material-item-master.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { PackingMaterialDashboardComponent } from './components/packing-material-dashboard/packing-material-dashboard.component';


const routes: Routes = [
  { path: 'item', component: MaterialItemMasterComponent },
  { path: 'Po', component: PackingMaterialPOComponent },
  // { path: 'add', component: AddMaterialItemMasterComponent },
  { path: 'add-invoice', component: InvoiceFormComponent },
  { path: 'invoice', component: InvoiceListComponent },
  { path: 'dashboard', component: PackingMaterialDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackingmaterialRoutingModule { }

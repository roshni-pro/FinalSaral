import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxMasterComponent } from './component/tax-master/tax-master.component';
import { AddTaxMasterComponent } from './component/add-tax-master/add-tax-master.component';
import { TaxGroupComponent } from './component/tax-group/tax-group.component';
import { AddTaxGroupComponent } from './component/add-tax-group/add-tax-group.component';

const routes: Routes = [
  {path: 'taxmaster', component: TaxMasterComponent},
  {path: 'add', component: AddTaxMasterComponent},
  {path: 'taxgroup', component: TaxGroupComponent},
  {path: 'taxgroup-add', component: AddTaxGroupComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxMasterRoutingModule { }

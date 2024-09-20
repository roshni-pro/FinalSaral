import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombodashboardComponent } from './component/combodashboard/combodashboard.component';
import { AddcomboComponent } from './component/addcombo/addcombo.component';
import { CombodetailsComponent } from './component/combodetails/combodetails.component';
import { EditcomboComponent } from './component/editcombo/editcombo.component';


const routes: Routes = [
  {path: 'combodashboard', component: CombodashboardComponent},
  {path: 'addcombo', component: AddcomboComponent},
  {path: 'combodetail', component: CombodetailsComponent},
   {path: 'editcombo/:ComboName/:Id', component: EditcomboComponent},
  //{path: 'editcombo/:ComboName', component: EditcomboComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CombodashboardRoutingModule { }

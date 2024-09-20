import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GullakCashBackComponent } from './gullak-cash-back/gullak-cash-back.component';
import { GullakCashBackDetailsComponent } from './gullak-cash-back-details/gullak-cash-back-details.component';
import { AddgullakComponent } from './addgullak/addgullak.component';


const routes: Routes = [
  {path: 'gullak', component: GullakCashBackComponent},
  {path: 'addgullak', component: AddgullakComponent},
  {path: 'gullakdetails', component: GullakCashBackDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GullakcashbackRoutingModule { }

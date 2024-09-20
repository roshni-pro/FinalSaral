import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashCompComponent } from './cash-comp/cash-comp.component';
import {DropdownModule} from 'primeng/dropdown';


const routes: Routes = [
  {
    path: 'CashMannagement',
    component: CashCompComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashModRoutingModule { }

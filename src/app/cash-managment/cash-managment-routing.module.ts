import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MtDCollectionScreenComponent } from './Component/mt-dcollection-screen/mt-dcollection-screen.component';
import { MultiCashierComponent } from './multi-cashier/multi-cashier.component';


const routes: Routes = [
  {
    path:'MTDCollection',
    component:MtDCollectionScreenComponent
  },
  {
    path:'MultiCashier',
    component:MultiCashierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashManagmentRoutingModule { }

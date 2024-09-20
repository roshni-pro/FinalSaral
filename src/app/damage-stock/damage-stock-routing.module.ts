import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DamagestockComponent } from './components/damagestock/damagestock.component';


const routes: Routes = [
  {path:'item',component:DamagestockComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DamageStockRoutingModule { }

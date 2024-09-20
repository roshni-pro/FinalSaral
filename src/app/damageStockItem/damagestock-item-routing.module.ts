import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DamagestockItemComponent } from './components/damagestock-item/damagestock-item.component';


const routes: Routes = [
  {path:'itemlist',component:DamagestockItemComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DamagestockItemRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentnetStockComponent } from './components/currentnet-stock/currentnet-stock.component';


const routes: Routes = [
  {path:'stocklist',component:CurrentnetStockComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentNetStockRoutingModule { }

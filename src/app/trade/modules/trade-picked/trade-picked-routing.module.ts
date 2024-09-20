import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradePickedSummaryComponent } from './components/trade-picked-summary/trade-picked-summary.component';


const routes: Routes = [
  {path:'summary', component: TradePickedSummaryComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradePickedRoutingModule { }

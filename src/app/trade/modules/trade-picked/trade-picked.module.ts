import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradePickedRoutingModule } from './trade-picked-routing.module';
import { TradePickedSummaryComponent } from './components/trade-picked-summary/trade-picked-summary.component';


@NgModule({
  declarations: [TradePickedSummaryComponent],
  imports: [
    CommonModule,
    TradePickedRoutingModule
  ]
})
export class TradePickedModule { }

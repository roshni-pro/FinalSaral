import { PrPaymentSummaryComponent } from './Components/ir/pr-payment-summary/pr-payment-summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IRComponent } from './Components/ir/ir.component';

const routes: Routes = [
  { path: '', component: IRComponent },
  { path: 'PrPaymentSummary', component: PrPaymentSummaryComponent },
  { path: 'PrPaymentSummaryReload', component: PrPaymentSummaryComponent },
  { path: 'PR', component: IRComponent },
  { path: 'IR', component: IRComponent },
  { path: 'closed-pr', component: IRComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IRPaymentsRoutingModule { }

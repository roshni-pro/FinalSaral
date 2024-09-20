import { AgentPaymentSettlementListComponent } from './components/agent-payment-settlement-list/agent-payment-settlement-list/agent-payment-settlement-list.component';
import { AgentPaymentSettlementComponent } from './components/agent-payment-settlement/agent-payment-settlement.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AgentPaymentSettlementComponent },
  { path: 'agentpaymentsettlement', component: AgentPaymentSettlementComponent },
  { path: 'settlementlist', component: AgentPaymentSettlementListComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AgentPaymentSettlementRoutingModule { }

import { AgentCommissionListComponent } from './components/agent-commission-list/agent-commission-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentCommissionComponent } from './components/agent-commission/agent-commission.component';

const routes: Routes = [
  { path: '', component: AgentCommissionComponent },
  { path: 'addAgentCommissionPayment', component: AgentCommissionComponent },
  { path: 'agentCommissionPaymentList', component: AgentCommissionListComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AgentCommissionPaymentRoutingModule { }

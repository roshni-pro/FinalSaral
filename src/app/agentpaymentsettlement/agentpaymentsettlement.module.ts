import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentPaymentSettlementComponent } from './components/agent-payment-settlement/agent-payment-settlement.component';
import { AgentPaymentSettlementRoutingModule } from './agentpaymentsettlement-routing.module';
import { AgentPaymentSettlementListComponent } from './components/agent-payment-settlement-list/agent-payment-settlement-list/agent-payment-settlement-list.component';



@NgModule({
  declarations: [AgentPaymentSettlementComponent, AgentPaymentSettlementListComponent],
  imports: [
    CommonModule,
    AgentPaymentSettlementRoutingModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    BlockUIModule,
    DialogModule,
    ProgressSpinnerModule,
  ]
})
export class AgentpaymentsettlementModule { }

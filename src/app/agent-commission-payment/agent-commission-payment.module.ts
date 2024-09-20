import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentCommissionPaymentService } from './services/agent-commission-payment.service';
import { AgentCommissionComponent } from './components/agent-commission/agent-commission.component';
import { AgentCommissionListComponent } from './components/agent-commission-list/agent-commission-list.component';
import { AgentCommissionPaymentRoutingModule } from './agent-commission-payment-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [AgentCommissionComponent, AgentCommissionListComponent],
  imports: [
    CommonModule,
    AgentCommissionPaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    NgbModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule,
    BlockUIModule
  ],
  providers: [AgentCommissionPaymentService]
})
export class AgentCommissionPaymentModule { }

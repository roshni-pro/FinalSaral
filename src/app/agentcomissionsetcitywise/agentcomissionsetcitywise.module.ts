import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentcomissionsetcitywiseRoutingModule } from './agentcomissionsetcitywise-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { AgentcomissionsetcitywiseComponent } from './components/agentcomissionsetcitywise/agentcomissionsetcitywise.component';
import { AgentcomissionsetcitywiseAddComponent } from './components/agentcomissionsetcitywise-add/agentcomissionsetcitywise-add.component';
import { AgenttotalcomissionComponent } from './components/agenttotalcomission/agenttotalcomission.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


@NgModule({
  declarations: [AgentcomissionsetcitywiseComponent, AgentcomissionsetcitywiseAddComponent, AgenttotalcomissionComponent],
  imports: [
    CommonModule,
    AgentcomissionsetcitywiseRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    NgbModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule,
    ShaopkiranaSharedModule,
  ]
})
export class AgentcomissionsetcitywiseModule {

}

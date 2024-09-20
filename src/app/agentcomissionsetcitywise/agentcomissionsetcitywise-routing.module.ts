import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentcomissionsetcitywiseComponent } from './components/agentcomissionsetcitywise/agentcomissionsetcitywise.component';
import { AgentcomissionsetcitywiseAddComponent } from './components/agentcomissionsetcitywise-add/agentcomissionsetcitywise-add.component';
import { AgenttotalcomissionComponent } from './components/agenttotalcomission/agenttotalcomission.component';


const routes: Routes = [ 
{ path: 'agentcomissionsetcitywise', component: AgentcomissionsetcitywiseComponent },
{ path: 'agentcomissionsetcitywise-add', component: AgentcomissionsetcitywiseAddComponent },
{ path: 'agenttotalcomission', component: AgenttotalcomissionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentcomissionsetcitywiseRoutingModule { }

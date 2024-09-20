import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintTicketComponent } from './components/complaint-ticket/complaint-ticket.component';


const routes: Routes = [
  {
    path:'complaint-ticket',component:ComplaintTicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintTicketRoutingModule { }

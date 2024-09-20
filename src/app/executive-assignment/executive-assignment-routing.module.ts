
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExecutiveassignmentComponent } from './Components/executiveassignment/executiveassignment.component';






const routes: Routes = [
  { path: '', component: ExecutiveassignmentComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutiveAssignmentRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanAppliedDetailsComponentComponent } from './components/loan-applied-details-component/loan-applied-details-component.component';


const routes: Routes = [
  {path:'loanAppliedList', component: LoanAppliedDetailsComponentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmeLoanRoutingModule { }

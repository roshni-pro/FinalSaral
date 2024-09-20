import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkBuisnessLeadComponent } from './components/sk-buisness-lead/sk-buisness-lead.component';
import { SKBuisnessSequenceComponent } from './components/skbuisness-sequence/skbuisness-sequence.component';
import { ArthmateStampComponent } from './components/arthmate-stamp/arthmate-stamp.component';
import { ArthmateRepaymentUpdateComponent } from './components/arthmate-repayment-update/arthmate-repayment-update.component';

const routes: Routes = [
  {path:'', component: SkBuisnessLeadComponent},
  {path:'sequence/:Id', component: SKBuisnessSequenceComponent},
  {path:'arthmateStamp',component:ArthmateStampComponent },
  {path:'RepaymentUpdate', component: ArthmateRepaymentUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkBuisnessLeadRoutingModule { }

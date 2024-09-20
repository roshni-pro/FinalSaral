import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorrectionLedgerEntryComponent } from './Component/correction-ledger-entry/correction-ledger-entry.component';


const routes: Routes = [
  {
    path:'CorrectionLedgerEntry',
    component:CorrectionLedgerEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerCorrectionRoutingModule { }

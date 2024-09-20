import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LedgerconfigurationdetailsComponent } from './components/ledgerconfigurationdetails/ledgerconfigurationdetails.component';
import { LedgerlistComponent } from './part-components/ledgerlist/ledgerlist.component';


const routes: Routes = [
 
  { path: 'ledgerconfigurationdetails', component: LedgerconfigurationdetailsComponent },
  { path: 'ledgerconfigurationdetails/:detailId', component: LedgerconfigurationdetailsComponent },
  { path:'ledgermasterlist',component:LedgerlistComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerconfigurationRoutingModule { }

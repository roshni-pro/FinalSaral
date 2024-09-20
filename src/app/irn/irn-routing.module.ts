import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IRNErrorMasterComponent } from './components/irnerror-master/irnerror-master.component';

const routes: Routes = [ {path: 'irn-errormaster', component: IRNErrorMasterComponent},];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IRNRoutingModule { }



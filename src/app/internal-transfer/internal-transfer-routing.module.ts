import { InternaltransferComponent } from './Components/internaltransfer/internaltransfer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddinternaltransferitemComponent } from './Components/addinternaltransferitem/addinternaltransferitem.component';

const routes: Routes = [
  { path: '', component: InternaltransferComponent },
  { path: 'Addinternaltransferitem', component: AddinternaltransferitemComponent },

  

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternaltransferRoutingModule { }

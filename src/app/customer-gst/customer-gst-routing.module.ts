import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerGstComponent } from './components/customer-gst.component';


const routes: Routes = [
  {path: 'customer-gst', component: CustomerGstComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGstRoutingModule { }

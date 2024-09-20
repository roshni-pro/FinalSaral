import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpreportdisplayComponent } from './components/opreportdisplay/opreportdisplay.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderProcessReportComponent } from './components/order-process-report/order-process-report.component';



const routes: Routes = [
  { path: '', component: OpreportdisplayComponent },
  { path:'OrderProcessReport', component: OrderProcessReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OpreportsRoutingModule { }

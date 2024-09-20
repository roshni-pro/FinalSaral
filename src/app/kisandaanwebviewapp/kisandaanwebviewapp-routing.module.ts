import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerkisanwebviewComponent } from './components/customerkisanwebview/customerkisanwebview.component';
import { KisanDaanComponent } from './components/kisan-daan/kisan-daan.component';
import { KisandaangallaryComponent } from './components/kisandaangallary/kisandaangallary.component';


const routes: Routes = [
  {path:'KisanDan/:customerid/:lang/:wid', component: KisanDaanComponent},
  {path:'CustomerKisanDan/:CustomerId', component: CustomerkisanwebviewComponent},
  {path:'kisandaangallary/:customerid/:lang/:wid', component: KisandaangallaryComponent},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KisandaanwebviewappRoutingModule {}

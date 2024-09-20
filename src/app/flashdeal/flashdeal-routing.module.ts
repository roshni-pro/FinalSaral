import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodayFlashDealComponent } from './components/today-flash-deal/today-flash-deal.component';


const routes: Routes = [
  { path: 'TodayFlashDeal', component: TodayFlashDealComponent},

 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class FlashdealRoutingModule { }

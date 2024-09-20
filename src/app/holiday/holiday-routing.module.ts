import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { TatHolidayComponent } from './component/tat-holiday';
import { TatHolidayComponent } from './component/tat-holiday/tat-holiday.component';
const routes: Routes = [
  { path: 'tatholiday', component: TatHolidayComponent}
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class HolidayRoutingModule { }
export const routedComponents = [TatHolidayComponent];
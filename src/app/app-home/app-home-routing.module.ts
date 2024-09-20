import { AppHomeComponent } from './components/app-home/apphome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: AppHomeComponent}
 ];
 

 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHomeRoutingModule { }

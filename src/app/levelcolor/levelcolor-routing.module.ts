import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LevelcolorComponent } from './component/levelcolor/levelcolor.component';


const routes: Routes = [
  { path: 'Levelcolor', component: LevelcolorComponent}
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class LevelcolorRoutingModule { }

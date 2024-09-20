import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CPMatrixComponent } from './component/cpmatrix/cpmatrix.component';


const routes: Routes = [
  { path: 'cpmatrix', component: CPMatrixComponent},
 
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class CpmatrixRoutingModule { }

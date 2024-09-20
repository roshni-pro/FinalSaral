import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrangebookmasterComponent } from './components/orangebookmaster/orangebookmaster.component';
import { OrangebookacceptanceComponent } from './components/orangebookacceptance/orangebookacceptance.component';
import { OrangebookindexComponent } from './components/orangebookindex/orangebookindex.component';


const routes: Routes = [
  { path: 'orangebookmaster', component: OrangebookmasterComponent},
  { path: 'orangebookacceptance', component: OrangebookacceptanceComponent},
  { path: 'orangebookindex', component: OrangebookindexComponent},
 
  
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class OrangebookRoutingModule { }

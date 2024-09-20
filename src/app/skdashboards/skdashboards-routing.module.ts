import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LedgerdashboardComponent } from './components/ledgerdashboard/ledgerdashboard.component';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';



const routes: Routes = [
  { path: 'LedgerDashboard', component: LedgerdashboardComponent},
  
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class SkdashboardsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManualSalesOrdersComponent } from './manual-sales-orders/manual-sales-orders.component';
import { AddManualSalesOrderComponent } from './add-manual-sales-order/add-manual-sales-order.component';


const routes: Routes = [
  { path: 'manual-sales-orders', component: ManualSalesOrdersComponent },
  { path: 'add-manual-sales-orders', component: AddManualSalesOrderComponent },
 ];
 
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class ManualSalesRoutingModule { }

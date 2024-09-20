import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnReplaceRoutingModule } from './return-replace-routing.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { ReturnReplaceDashboardComponent } from './components/return-replace-dashboard/return-replace-dashboard.component';
import { ReturnReplaceItemsComponent } from './components/return-replace-items/return-replace-items.component';
import { CarouselModule } from 'primeng/carousel';
import { GenerateOrderByPlannerComponent } from './components/generate-order-by-planner/generate-order-by-planner.component';
import { PlannerListComponent } from './components/planner-list/planner-list.component';
import { SalesReturnDashboardComponent } from './components/sales-return-dashboard/sales-return-dashboard.component';


@NgModule({
  declarations: [ReturnReplaceDashboardComponent, ReturnReplaceItemsComponent, GenerateOrderByPlannerComponent, PlannerListComponent, SalesReturnDashboardComponent],
  imports: [
    CommonModule,
    ReturnReplaceRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    ShaopkiranaSharedModule,
    CarouselModule, 
  ]
})
export class ReturnReplaceModule { }

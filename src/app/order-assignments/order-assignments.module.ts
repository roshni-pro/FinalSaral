import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderAssignmentsRoutingModule } from './order-assignments-routing.module';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { TreeModule } from 'primeng/tree';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderAssignmentsComponent } from './Components/order-assignments/order-assignments.component';
import { OrderAssignentItemDetailsComponent } from './Components/order-assignent-item-details/order-assignent-item-details.component';
import { DboyAssignmentSummaryComponent } from './Components/dboy-assignment-summary/dboy-assignment-summary.component';
import { OrderConfigurationComponent } from './Components/orderConfiguration/order-configuration/order-configuration.component';
import { OrderCancelRequestComponent } from './Components/orderCancelRequest/order-cancel-request/order-cancel-request.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [OrderAssignmentsComponent, OrderAssignentItemDetailsComponent, DboyAssignmentSummaryComponent, OrderConfigurationComponent, OrderCancelRequestComponent],

  imports: [
    CommonModule,
    OrderAssignmentsRoutingModule,
    ShaopkiranaSharedModule,
    SkSharedModule,
    TreeModule,
    OrganizationChartModule,
    NgbModule,
    CalendarModule,


  ]
})
export class OrderAssignmentsModule { }

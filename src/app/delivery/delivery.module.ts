import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';

import { TableModule } from 'primeng/table';
;

//import { AddPeopleComponent } from './components/people-add/people-add.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { DeliveryBoyComponent } from './components/delivery-boy/delivery-boy.component';
import { AddDeliveryBoyComponent } from './components/add-delivery-boy/add-delivery-boy.component';
import { DeliveryBoyDetailsComponent } from './components/delivery-boy-details/delivery-boy-details.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { RedispatchorderapprovalComponent } from './components/redispatchorderapproval/redispatchorderapproval.component';
import { AssignmenttatComponent } from './components/assignmenttat/assignmenttat.component';
import { CreatedeliveryassignmentComponent } from './components/createdeliveryassignment/createdeliveryassignment.component';
import { AssignmentPaymentComponent } from './components/assignment-payment/assignment-payment.component';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { DeliveryCancellationReportComponent } from './components/delivery-cancellation-report/delivery-cancellation-report.component';
import { AgentcollectionComponent } from './components/agentcollection/agentcollection.component';
import { DboySignedDesignSlipComponent } from './components/dboy-signed-design-slip/dboy-signed-design-slip.component';
import { CustomerWalletComponent } from './components/customer-wallet/customer-wallet.component';
import { DeliveryAssignmentComponent } from './components/delivery-assignment/delivery-assignment.component';
import { AssignmentReportComponent } from './components/assignment-report/assignment-report.component';
import { NgxPrintModule } from 'ngx-print';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import { environment } from 'environments/environment';
import { AgmOverlays } from 'agm-overlays';
import { DeliveryOrderAssignmentChangeComponent } from './components/delivery-order-assignment-change/delivery-order-assignment-change.component';

//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [VehiclesComponent, AddVehicleComponent, VehicleDetailsComponent, DeliveryBoyComponent, AddDeliveryBoyComponent, DeliveryBoyDetailsComponent, RedispatchorderapprovalComponent, AssignmenttatComponent, CreatedeliveryassignmentComponent, AssignmentPaymentComponent, DeliveryCancellationReportComponent, AgentcollectionComponent, DboySignedDesignSlipComponent, CustomerWalletComponent, DeliveryAssignmentComponent, AssignmentReportComponent, DeliveryOrderAssignmentChangeComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DynamicDialogModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    NgxPrintModule,
    AgmDirectionModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKeyGoogle, // "AIzaSyCbogFMyrNTlMdtsrYzgffJ3guhCdzRS2Y",
      libraries: ['drawing', 'places']
    }),
    AgmDirectionModule,
    // DropdownModule

  ]


})
export class DeliveryModule { }

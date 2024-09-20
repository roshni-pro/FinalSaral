import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastermoduleRoutingModule } from './mastermodule-routing.module';
import { OutboundDeliveryComponent } from './component/outbound-delivery/outbound-delivery.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from "../../app/shared/shared.module";
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { OutboundDeliverylistComponent } from './component/outbound-deliverylist/outbound-deliverylist.component';


@NgModule({
  declarations: [OutboundDeliveryComponent, OutboundDeliverylistComponent, ],
  imports: [
    CommonModule,
    MastermoduleRoutingModule,
    SharedModule, 
    NgbModule,
    ShaopkiranaSharedModule
  ]
})
export class MastermoduleModule { }

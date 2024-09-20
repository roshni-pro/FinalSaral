import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerdelightComponent } from './components/customerdelight/customerdelight.component';
import { TableModule } from 'primeng/table';
import { TownhallRoutingModule } from './townhall-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ChartsModule } from 'ng2-charts';
import { SalesComponent } from './components/sales/sales.component';
import { AgentKPPComponent } from './components/agent-kpp/agent-kpp.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SourcingComponent } from './components/sourcing/sourcing.component';
import { OperationComponent } from './components/operation/operation.component';
import { CustomerDelightComponent } from './components/customer-delight/customer-delight.component';
import { TownHallNavigationComponent } from './components/town-hall-navigation/town-hall-navigation.component';


@NgModule({
  declarations: [CustomerdelightComponent, SalesComponent, AgentKPPComponent, PurchaseComponent, SourcingComponent, OperationComponent, CustomerDelightComponent, TownHallNavigationComponent],
  // 
  imports: [
    CommonModule,
    TownhallRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    ChartsModule,
    DropdownModule
    // DropdownModule

  ]


})
export class TownhallModule { }

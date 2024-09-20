import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedgerdashboardComponent } from './components/ledgerdashboard/ledgerdashboard.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkdashboardsRoutingModule } from './skdashboards-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [LedgerdashboardComponent],

  imports: [
    CommonModule,
    SkdashboardsRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule

  ]


})
export class SkdashboardsModule { }

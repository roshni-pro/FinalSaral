import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';

import { DistributerpriceRoutingModule } from './distributerprice-routing.module';
import { DistributerpriceComponent } from './components/distributerprice/distributerprice.component';


@NgModule({
  declarations: [DistributerpriceComponent],
  imports: [
    CommonModule,
    NgbModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    DistributerpriceRoutingModule,
    HttpClientModule,
    ShaopkiranaSharedModule
  ]
})
export class DistributerpriceModule { }

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
import { GullakCashBackDetailsComponent } from './gullak-cash-back-details/gullak-cash-back-details.component';
import { GullakCashBackComponent } from './gullak-cash-back/gullak-cash-back.component';
import { GullakcashbackRoutingModule } from './gullakcashback-routing.module';
import { AddgullakComponent } from './addgullak/addgullak.component';



@NgModule({
  declarations: [GullakCashBackComponent, GullakCashBackDetailsComponent, AddgullakComponent],
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
    GullakcashbackRoutingModule,
    HttpClientModule,
    ShaopkiranaSharedModule
  ]
})
export class GullakcashbackModule { }

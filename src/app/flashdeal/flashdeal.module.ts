import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashdealRoutingModule } from './flashdeal-routing.module';
import { TodayFlashDealComponent } from './components/today-flash-deal/today-flash-deal.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [TodayFlashDealComponent],

  imports: [
    CommonModule,
    FlashdealRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule

  ]


})
export class FlashdealModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HolidayRoutingModule } from './holiday-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TatHolidayComponent } from './component/tat-holiday/tat-holiday.component';
import { DateTimePickerComponent } from './component/tat-holiday/date-time-picker.component';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


@NgModule({
  declarations: [TatHolidayComponent, DateTimePickerComponent],

  imports: [
    CommonModule,
    HolidayRoutingModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
    ShaopkiranaSharedModule
  ],


})
export class HolidayModule { }

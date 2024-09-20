import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WuduRoutingModule } from './wudu-routing.module';
import { WuduAppVersionComponent } from './components/wudu-app-version/wudu-app-version.component';
import { TableModule } from 'primeng/table';
//import { AddPeopleComponent } from './components/people-add/people-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { WuduNotificationComponent } from './components/wudu-notification/wudu-notification.component';


@NgModule({
  declarations: [WuduAppVersionComponent, WuduNotificationComponent],
  imports: [
    CommonModule,
    WuduRoutingModule,
    TableModule,
    ShaopkiranaSharedModule,
    FormsModule
  ]
})
export class WuduModule { }

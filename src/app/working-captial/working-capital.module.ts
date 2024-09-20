
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
//import { AddPeopleComponent } from './components/people-add/people-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { WorkingCaptialRoutingModule } from './working-capital-routing.module';
import { WorkingCapitalComponent } from './components/working-capital/working-capital.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AddWorkingCapitalComponent } from './components/add-working-capital/add-working-capital.component';
import { WorkingCapitalCalanderComponent } from './components/working-capital-calander/working-capital-calander.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { DateTimePickerComponent } from './components/date-time-picker.component';

@NgModule({
  declarations: [WorkingCapitalComponent, AddWorkingCapitalComponent, WorkingCapitalCalanderComponent, DateTimePickerComponent
  ],
  // WarehouseSupplierComponent, AddWarehouseSupplierComponent, WarehouseSupplierDetailComponent,
  imports: [
    CommonModule,
    WorkingCaptialRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    ReactiveFormsModule,
    // DropdownModule

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
  ]


})
export class WorkingCaptialModule { }

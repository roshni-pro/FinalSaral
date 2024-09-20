import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionanswerRoutingModule } from './questionanswer-routing.module';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SurveyModuleComponent } from './components/survey-module/survey-module.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';


@NgModule({
  declarations: [SurveyModuleComponent, SurveyListComponent],

  imports: [
    CommonModule,
    QuestionanswerRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule

  ]


})
export class QuestionanswerModule { }

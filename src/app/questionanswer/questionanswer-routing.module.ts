import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyModuleComponent } from './components/survey-module/survey-module.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';

const routes: Routes = [
  { path: 'surveymodule/:SurveyId', component: SurveyModuleComponent},
  { path: 'surveylist', component: SurveyListComponent},
 
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class QuestionanswerRoutingModule { }

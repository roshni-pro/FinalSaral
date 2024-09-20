import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SmsTemplateComponent} from './components/sms-template/sms-template.component';
import {TemplatemasterComponent} from './components/templatemaster/templatemaster.component'


const routes: Routes = [
  {
    path:'smsTemplate',
    component:SmsTemplateComponent
  },
  {
    path:'templateMaster',
    component:TemplatemasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsTemplateRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsTemplateRoutingModule } from './sms-template-routing.module';
import { SmsTemplateComponent } from './components/sms-template/sms-template.component';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module'; 
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { TemplatemasterComponent } from './components/templatemaster/templatemaster.component';
import {ToastModule} from 'primeng/toast';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  declarations: [SmsTemplateComponent, TemplatemasterComponent],
  imports: [
    CommonModule,
    SmsTemplateRoutingModule,
    SkSharedModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    RadioButtonModule,
    ConfirmDialogModule,
    CheckboxModule
  ]
})
export class SmsTemplateModule { }

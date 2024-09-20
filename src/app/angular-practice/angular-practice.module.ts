import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularPracticeRoutingModule } from './angular-practice-routing.module';
import { LoginwithFlexComponent } from './components/loginwith-flex/loginwith-flex.component';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module'; 
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { ReactiveFormsModule,FormsModule} from "@angular/forms";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { WebdashbordComponent } from './components/webdashbord/webdashbord.component';

@NgModule({
  declarations: [LoginwithFlexComponent, WebdashbordComponent],
  imports: [
    CommonModule,
    AngularPracticeRoutingModule,
    SkSharedModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MessagesModule,MessageModule
  ]
})
export class AngularPracticeModule { }

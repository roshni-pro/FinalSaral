import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsAppTemplateRoutingModule } from './whats-app-template-routing.module';
import { WhatsAppTemplateComponent } from './Component/whats-app-template/whats-app-template.component';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/primeng';
import { SendWhatsappComponent } from './Component/send-whatsapp/send-whatsapp.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [WhatsAppTemplateComponent, SendWhatsappComponent],
  imports: [
    CommonModule,
    WhatsAppTemplateRoutingModule,
    SkSharedModule,
    ShaopkiranaSharedModule,
    FormsModule,
    InputTextareaModule,
    ProgressSpinnerModule
  ]
})
export class WhatsAppTemplateModule { }

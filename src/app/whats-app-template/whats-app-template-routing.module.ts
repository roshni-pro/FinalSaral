import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendWhatsappComponent } from './Component/send-whatsapp/send-whatsapp.component';
import { WhatsAppTemplateComponent } from './Component/whats-app-template/whats-app-template.component';


const routes: Routes = [
  {
    path:'whatsAppIntegration',
    component:WhatsAppTemplateComponent
  },
  {
    path:'Send-WhatsApp',
    component:SendWhatsappComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsAppTemplateRoutingModule { }

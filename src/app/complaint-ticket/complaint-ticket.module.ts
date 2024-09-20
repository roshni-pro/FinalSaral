import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintTicketRoutingModule } from './complaint-ticket-routing.module';
import { ComplaintTicketComponent } from './components/complaint-ticket/complaint-ticket.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  declarations: [ComplaintTicketComponent],
  imports: [
    CommonModule,
    ComplaintTicketRoutingModule,
    ShaopkiranaSharedModule,
    TableModule,
  DialogModule,
CalendarModule,
CarouselModule,
ProgressSpinnerModule  ]
})
export class ComplaintTicketModule { }

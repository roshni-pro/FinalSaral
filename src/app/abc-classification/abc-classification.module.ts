import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPrintModule } from 'ngx-print';
import { AbcClassificationRoutingModule } from './abc-classification-routing.module';
import { ABCClassificationComponent } from './components/abc-classification/abc-classification.component';


@NgModule({
  declarations: [ABCClassificationComponent],
  imports: [
    CommonModule,
    AbcClassificationRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    NgxPrintModule
  ]
})
export class AbcClassificationModule { }

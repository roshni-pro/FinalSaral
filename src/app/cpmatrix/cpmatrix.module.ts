import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpmatrixRoutingModule } from './cpmatrix-routing.module';
import { CPMatrixComponent } from './component/cpmatrix/cpmatrix.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [CPMatrixComponent],

  imports: [
    CommonModule,
    CpmatrixRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule

  ]


})
export class CpmatrixModule { }

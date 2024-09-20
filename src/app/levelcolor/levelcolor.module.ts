import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelcolorRoutingModule } from './levelcolor-routing.module';
import { LevelcolorComponent } from './component/levelcolor/levelcolor.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [LevelcolorComponent],

  imports: [
    CommonModule,
    LevelcolorRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule

  ]


})
export class LevelcolorModule { }

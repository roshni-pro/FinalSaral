import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrangebookRoutingModule } from './orangebook-routing.module';
import { OrangebookmasterComponent } from './components/orangebookmaster/orangebookmaster.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { OrangebookacceptanceComponent } from './components/orangebookacceptance/orangebookacceptance.component';
import { OrangebookindexComponent } from './components/orangebookindex/orangebookindex.component';
import { OrangebookIndexEditComponent } from './components/orangebook-index-edit/orangebook-index-edit.component';



@NgModule({
  declarations: [OrangebookmasterComponent, OrangebookacceptanceComponent, OrangebookindexComponent, OrangebookIndexEditComponent],
  // 
  imports: [
    CommonModule,
    OrangebookRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule
    // DropdownModule

  ]


})

export class OrangebookModule { }

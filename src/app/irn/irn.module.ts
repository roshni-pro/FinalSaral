import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRNRoutingModule } from './irn-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { IRNErrorMasterComponent } from './components/irnerror-master/irnerror-master.component';





@NgModule({
  declarations: [IRNErrorMasterComponent],
  imports: [
    CommonModule,
    FormsModule,
    IRNRoutingModule
  ]

})
export class IRNModule { }

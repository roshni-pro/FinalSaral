import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CombodashboardRoutingModule } from './combodashboard-routing.module';
import { CombodashboardComponent } from './component/combodashboard/combodashboard.component';
import { AddcomboComponent } from './component/addcombo/addcombo.component';
import { CombodetailsComponent } from './component/combodetails/combodetails.component';
import { HttpClientModule } from '@angular/common/http';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { EditcomboComponent } from './component/editcombo/editcombo.component';


@NgModule({
  declarations: [CombodashboardComponent, AddcomboComponent, CombodetailsComponent, EditcomboComponent],
  imports: [
    CommonModule,
    NgbModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    CombodashboardRoutingModule,
    HttpClientModule,
    ShaopkiranaSharedModule
  ]
})
export class CombodashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TaxMasterRoutingModule } from './taxmaster-routing.module';

import {TableModule} from 'primeng/table';
;

//import { AddPeopleComponent } from './components/people-add/people-add.component';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { TaxMasterComponent } from './component/tax-master/tax-master.component';
import { AddTaxMasterComponent } from './component/add-tax-master/add-tax-master.component';
import { TaxDetailsComponent } from './component/tax-details/tax-details.component';
import { TaxGroupComponent } from './component/tax-group/tax-group.component';
import { AddTaxGroupComponent } from './component/add-tax-group/add-tax-group.component';
import { TaxGroupDetailsComponent } from './component/tax-group-details/tax-group-details.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [TaxMasterComponent, AddTaxMasterComponent, TaxDetailsComponent , TaxGroupComponent,AddTaxGroupComponent,TaxGroupDetailsComponent],
  imports: [
    CommonModule,
    TaxMasterRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    ShaopkiranaSharedModule
   // DropdownModule

  ]
  

})
export class TaxMasterModule { }

import { BlockUIModule } from 'primeng/blockui';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'primeng/accordion';
import { TableModule, Table, TableBody } from 'primeng/table';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { InternaltransferComponent } from './Components/internaltransfer/internaltransfer.component';
import { InternaltransferRoutingModule } from './internal-transfer-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddinternaltransferitemComponent } from './Components/addinternaltransferitem/addinternaltransferitem.component';



@NgModule({
  declarations: [InternaltransferComponent, AddinternaltransferitemComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TabViewModule,
    TableModule,
    ShaopkiranaSharedModule,
    BlockUIModule,
    InternaltransferRoutingModule,
    MultiSelectModule
  ]
})
export class InternalTransferModule { }

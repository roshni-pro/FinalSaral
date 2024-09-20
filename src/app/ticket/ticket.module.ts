import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';

import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { TradeModule } from 'app/trade/trade.module';

import { TicketGenerationComponent } from './Components/ticket-generation/ticket-generation.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { AssignedticketsComponent } from './Components/assignedtickets/assignedtickets.component';
import { TicketcategoryComponent } from './Components/ticketcategory/ticketcategory.component';
import { AddTickerCategoryComponent } from './Components/add-ticker-category/add-ticker-category.component';
//import { TestTicketCategoryComponent } from './Components/test-ticket-category/test-ticket-category.component';

// import {MatFormFieldModule} from '@angular/material/form-field';

import { TestCategoryComponent } from './Components/test-category/test-category.component';
//import { TestingCategoryComponent } from './Components/testing-category/testing-category.component';

// import { TreeTableDemo } from './treetabledemo';
// import { TreeTableDemoRoutingModule } from './treetabledemo-routing.module';
// import { TreeTableModule } from 'primeng/treetable';

// import {TreeNode} from 'primeng/api';
import { TreeModule } from 'primeng/primeng';
import { TicketCategoryComponent } from './Components/ticket-category/ticket-category.component';
import { TicketactivityComponent } from './Components/ticket-activity/ticketactivity/ticketactivity.component';





@NgModule({
  declarations: [TicketGenerationComponent, AssignedticketsComponent, TicketcategoryComponent, AddTickerCategoryComponent, TestCategoryComponent, TicketCategoryComponent, TicketactivityComponent],
  imports: [
    CommonModule,
    TreeModule,
    // TreeNode,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    NgbModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule,
    BlockUIModule,
    TicketRoutingModule,
    CommonModule,
    TradeModule,
    ShaopkiranaSharedModule,
    SkSharedModule,
    CalendarModule,
    DialogModule,
    MultiSelectModule,
    CheckboxModule,

  ],
})

export class TicketModule { }

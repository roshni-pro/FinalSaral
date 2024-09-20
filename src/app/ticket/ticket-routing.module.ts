import { AssignedticketsComponent } from './Components/assignedtickets/assignedtickets.component';

import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { TicketGenerationComponent } from './Components/ticket-generation/ticket-generation.component';
import { TicketcategoryComponent } from './Components/ticketcategory/ticketcategory.component';
import { AddTickerCategoryComponent } from './Components/add-ticker-category/add-ticker-category.component';
//import { TestTicketCategoryComponent } from './Components/test-ticket-category/test-ticket-category.component';
import { TestCategoryComponent } from './Components/test-category/test-category.component';
//import { TestingCategoryComponent } from './Components/testing-category/testing-category.component';
import { TicketCategoryComponent } from './Components/ticket-category/ticket-category.component';
import { TicketactivityComponent } from './Components/ticket-activity/ticketactivity/ticketactivity.component';



const routes: Routes = [
  { path: '', component: AssignedticketsComponent },
  { path: 'AssignedTickets', component: AssignedticketsComponent },
  { path: 'TicketGeneration', component: TicketGenerationComponent },
  { path: 'Category', component: TicketcategoryComponent },
  { path: 'AddTicketCategory', component: AddTickerCategoryComponent },
  { path: 'Ticketactivity', component: TicketactivityComponent },

  
 // { path: 'TicketCategorys', component: TestTicketCategoryComponent },
  { path: 'test', component: TestCategoryComponent },
 // { path: 'testCategory', component: TestingCategoryComponent },
  { path: 'TicketCategory', component: TicketCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class TicketRoutingModule { }

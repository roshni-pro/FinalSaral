import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpenseTypeComponent } from './components/expense-type/expense-type.component';
import { ExpenseDetailsComponent } from './components/expense-details/expense-details.component';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { BookExpenseComponent } from './components/book-expense/book-expense.component';
import { BookExpenseListComponent } from './components/book-expense-list/book-expense-list.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ManageVendorComponent } from './components/manage-vendor/manage-vendor.component';
import { BookExpenseListPageComponent } from './components/book-expense-list-page/book-expense-list-page.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';

@NgModule({
  declarations: [ExpenseComponent, ExpenseTypeComponent, ExpenseDetailsComponent, BookExpenseComponent, BookExpenseListComponent, ExpenseListComponent, ManageVendorComponent,BookExpenseListPageComponent,VendorListComponent],
   imports: [
    CommonModule,
    ExpenseRoutingModule,
    DialogModule,
    FormsModule,
    AutoCompleteModule,
    SkSharedModule,
    ShaopkiranaSharedModule,
    InputSwitchModule,

  ]
})
export class ExpenseModule { }

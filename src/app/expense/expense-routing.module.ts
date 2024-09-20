import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpenseTypeComponent } from './components/expense-type/expense-type.component';
import { ExpenseDetailsComponent } from './components/expense-details/expense-details.component';
import { BookExpenseComponent } from './components/book-expense/book-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ManageVendorComponent } from './components/manage-vendor/manage-vendor.component';
import { BookExpenseListPageComponent } from './components/book-expense-list-page/book-expense-list-page.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';

const routes: Routes = [
  {path: 'manage', component: ExpenseComponent},
  {path: 'type', component: ExpenseTypeComponent},
  {path: 'book', component: BookExpenseComponent},
  {path: 'details/:editableExpenseDetails', component: ExpenseDetailsComponent},
  {path:'expenselist',component:ExpenseListComponent},
  {path: 'manage/:Id', component: ExpenseComponent},
  {path:'managevendor',component:ManageVendorComponent },
  {path:'book-expense-list',component:BookExpenseListPageComponent },
  {path:'vendorlist',component:VendorListComponent },
  {path:'managevendor/:Id',component:ManageVendorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }

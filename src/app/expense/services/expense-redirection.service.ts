import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExpenseRedirectionService {

  expenseModuleURL: string;
  constructor(private router: Router) { 
    this.expenseModuleURL = 'expense';
  }

  openExpenseTypeList (){
    this.router.navigateByUrl(this.expenseModuleURL + '/type')
  }

}

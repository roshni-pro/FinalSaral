import { Injectable } from '@angular/core';
import { ExpenseType } from '../interfaces/expense-type';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {

  constructor() { }

  getExpenseTypeList(): Observable<ExpenseType[]>{
    let obs= new BehaviorSubject<ExpenseType[]>([
      {Code: 'Salary', Name: 'Salary', ID : 1},
      {Code: 'Rent', Name: 'Rent', ID : 2},
      {Code: 'Warehouse', Name: 'Warehouse', ID : 3},
      {Code: 'HQ', Name: 'HQ', ID : 4},
    ]);
    return obs;
  }


}

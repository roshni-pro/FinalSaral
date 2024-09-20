import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ExpenseListDC } from '../interfaces/expense-list-dc';
import { Expense } from '../interfaces/expense';
import { ExpenseDetails } from '../interfaces/expense-details';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  getExpenseLedgerTypeList():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/AccountLedgerType/GetList');
  }
  getByName(name: string, ledgerTypeID: number): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/LadgerUI/GetByName/name/' + name +'/ledgerTypeId/' + ledgerTypeID);
  }

  getExpenseList(): Observable<ExpenseListDC[]>{
    return this.http.get<ExpenseListDC[]>(this.apiURL + '/api/Expense/GetExpenseList' );
  }

  // GetDepartment
  getDepartment():Observable<any[]>{
    return this.http.get<ExpenseListDC[]>(this.apiURL + '/api/Department/GeAll' );
  }

  // GetDepartment
  getById(expenseId: number):Observable<Expense>{
    return this.http.get<Expense>(this.apiURL + '/api/Expense/GetById/' + expenseId );
  }
  addExpense(expense:Expense):Observable<Expense>{
    
    return this.http.post<Expense>(this.apiURL + '/api/Expense/AddExpense/', expense);
  }
  addExpenseDetails(expenseDetails:ExpenseDetails):Observable<ExpenseDetails>{
    return this.http.post<ExpenseDetails>(this.apiURL + '/api/Expense/AddExpenseDetails/', expenseDetails);
  }
  getDetailsList(Id:number):Observable<ExpenseDetails[]>{
    
    return this.http.get<ExpenseDetails[]>(this.apiURL + '/api/Expense/GetDetailsList?expenseId='+Id );

  }
  deleteExpenseDetails(Id:number):Observable<any>{
    return this.http.delete<any>(this.apiURL + '/api/Expense/DeleteDetails?Id='+Id );
  }
  updateExpenseDetails(expenseDetails:ExpenseDetails):Observable<ExpenseDetails>{
    return this.http.put<ExpenseDetails>(this.apiURL + '/api/Expense/UpdateExpenseDetails/', expenseDetails);
  }
  getTDSLedgerList(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/LadgerUI/GetTDSLedgerList');

  }
  getExpensePageList(): Observable<Expense[]>{
    return this.http.get<Expense[]>(this.apiURL + '/api/Expense/GetExpenseListData');

  }
  deleteExpense(Id:number):Observable<any>{
    return this.http.delete<any>(this.apiURL + '/api/Expense/DeleteExpense?Id='+Id );
  }
  getCheckerList(name:string):Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/Expense/GetCheckerList?name='+name);
  }
  
}

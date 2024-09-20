import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookExpense, BookExpensePager } from '../interfaces/book-expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookExpenseService {

  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  SaveBookExpense(bookExpense: BookExpense): Observable<any>{
    return this.http.post<any>(this.apiURL + '/api/BookExpense/SaveBookExpense', bookExpense);
  }

  GetPage(pager: BookExpensePager): Observable<any>{
    
    return this.http.post<any>(this.apiURL + '/api/BookExpense/GetPage', pager);
  }

  GetViewData(bookExpenseID: number): Observable<any>{
    
    return this.http.get<any>(this.apiURL + '/api/BookExpense/GetDetails/'+ bookExpenseID);
  }
  
}


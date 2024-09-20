import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthEndService {
  apirUrl:any;
  constructor(private http:HttpClient) {
    this.apirUrl = environment.apiURL
   }

   getMonthEndData(month:any,year:any):Observable<any>{
     return this.http.get<any>(this.apirUrl + '/api/Report/GetMonthEndData?month='+ month +'&Year='+ year);
   }
   MTDSalesMonthReport():Observable<any>{
    return this.http.get<any>(this.apirUrl + 'api/Report/MTDSalesMonthReport');
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  apiURL: string;
  User: any;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }     

  ADDholiday(CompanyHoliday): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CompanyHoliday/ADDHoliday?CompanyHoliday=',CompanyHoliday );
  }
  getholiday():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CompanyHoliday/GetHolidays');
  }
}

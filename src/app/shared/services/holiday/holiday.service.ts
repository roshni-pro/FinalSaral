import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interface/user';
import { CompanyHoliday } from '../../interface/holiday/company-holiday';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  apiURL: string;
  User: any;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }     

  ADDholiday(CompanyHolidayList: any[]): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CompanyHoliday/ADDHoliday',CompanyHolidayList );
  }
  // ADDholiday(CompanyHoliday): Observable<any[]> {
  //   
  //   return this.http.post<any[]>(this.apiURL + '/api/CompanyHoliday/ADDHolidayList',CompanyHoliday );
  // }
  
  getholiday():  Observable<CompanyHoliday[]> {
    return this.http.get<CompanyHoliday[]>(this.apiURL + '/api/CompanyHoliday/GetHolidays');
  }

  DeleteHoliday(companyHolidayId: number): Observable<boolean>{
    return this.http.delete<boolean>(this.apiURL + '/api/CompanyHoliday/DeleteHoliday/' + companyHolidayId);
  }

  EditHoliday(CompanyHoliday): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CompanyHoliday/EditHoliday',CompanyHoliday );
  }
  getCityList():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CompanyHoliday/City');
  }

  GetWarehouseList(commaSeperatedCityList :string):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CompanyHoliday/Warehouse/' + commaSeperatedCityList);
  }


}

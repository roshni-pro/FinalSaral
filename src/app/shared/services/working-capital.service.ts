import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class WorkingCapitalService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  getWorkingcapital(data):Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/Report/GetWorkingCapital',data);
  }
  GetWorkingCapitalById(warehouseid,date):Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Report/GetWorkingCapitalById?warehouseid='+warehouseid +'&date='+date);
  }

  UpdateWorkingCapitalById(data):Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Report/UpdateWorkingCaptialById',data);
  }

  getWorkingCapitalCalender(data):Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/CompanyHoliday/GetWCCalander?year='+data.currentYear +'&month='+data.currentMonth);
  }

  SaveWCCalander(data):Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CompanyHoliday/SaveWCCalander', data);
  }

  
}

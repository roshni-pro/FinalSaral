import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class CpmatrixService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetMonthCpMatrix(month,year):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CpMatrix/Get/{month}/{year}?month=' + month + ' ' + '&year=' + year);
  }

  
    
 

}

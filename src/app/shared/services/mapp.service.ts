import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class MappService {
  apiURL: string;  
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
 
  AreaGetByID(number):  Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/WarehouseCategory/?i=' +"1");
  }

  

}

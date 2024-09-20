import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
  getHistory(entity , id):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/History?entityName='+entity + '&&entityId='+id);
  }

  getPeopleHistory(id):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Peoples/History?PeopleId='+id);
  }
}

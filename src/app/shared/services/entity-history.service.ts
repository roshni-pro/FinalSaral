import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

export interface EntityHistory{
  Route: string;
  UserName: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntityHistoryService {
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }     

  insertPageVisits(entityHistory: EntityHistory): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/History/InsertPageVisits', entityHistory);
  }
  rolePageVisits(entityHistory: EntityHistory): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/History/RolePageVisits', entityHistory);
  }
  angularPageList(userid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/History/AngularPageList?userid='+ userid);
  }
}

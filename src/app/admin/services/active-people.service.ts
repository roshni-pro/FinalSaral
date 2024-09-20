import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivePeopleService {
  apiURL:string;

  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;
    //this.apiURL = 'http://localhost:26265/';
  }

  getPeopleByKey(key:any): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Peoples/PeopleInActiveList?key='+key);
  }

  updateInActivePeopleById(id:any,comment:string,status:boolean): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Peoples/UpdateInActivePeopleId?PeopleId='+id+'&Comment='+comment+'&Status='+status);
  }

}

  
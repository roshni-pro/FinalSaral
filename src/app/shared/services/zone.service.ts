import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PagerDataV7 } from '../interface/pager-data-v7';


@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetAllZone():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/zone');
  }
  ZoneGetByID(name):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/zone/GetByName?name=' + name);

  }

  ManagerName():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/zone/GetActiveAgentsForZone');
  }

  

  // CountryName():  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/zone/GetActiveAgentsForCountry');
  // }

  addZone(zoneservice):  Observable<any> {
    // return this.http.post<any>(this.apiURL + '/api/zone/add',zoneservice);
    return this.http.post<any>(this.apiURL + '/api/zone',zoneservice);
    }
  
  
  UpdateZone(details):  Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/zone/update', details);
  }

  DeleteZone(id: number):Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/zone/DeleteV7?id=' + id);
  }


}


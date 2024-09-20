import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  apiURL: string;  
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetAllArea():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/area/all');
  }
  AreaGetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/area/GetArea?CityId='+id);
  }

  addArea(areaservice):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/area/add',areaservice);
    }
  
    GetByID(id: number):  Observable<any> {
      return this.http.get<any>(this.apiURL + '/api/area/GetByID?areaId=' + id);
    }  


    // GetByID(id: number):  Observable<any> {
    //   return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
    // }  
  
    UpdateArea(details):  Observable<any> {
      return this.http.put<any>(this.apiURL + '/api/area/put', details);
    }
    // DeleteCountry(id): Observable<any> {
    //   return this.http.delete<any>(this.apiURL + '/api/Countries/Remove?id='+ id);
    // }

    
    DeleteArea(id: number):Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/area/delete?id=' + id);
  }

}

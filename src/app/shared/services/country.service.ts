import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetAllCountry():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Countries');
  }
  CountryGetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Countries/GetById?CountryId=' + id);
  }
  ManagerName():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Countries/GetActiveAgentsForCuntry');
  }

  addCountry(countryservice):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Countries/add',countryservice);
    }
  
    
    // GetByID(id: number):  Observable<any> {
    //   return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
    // }  
  
    UpdateCountry(details):  Observable<any> {
      return this.http.put<any>(this.apiURL + '/api/Countries/update', details);
    }
    // DeleteCountry(id): Observable<any> {
    //   return this.http.delete<any>(this.apiURL + '/api/Countries/Remove?id='+ id);
    // }

    
    DeleteCountry(id: number):Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Countries/RemoveV7?id=' + id);
  }

}

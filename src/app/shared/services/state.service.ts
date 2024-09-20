import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetAllState():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/States/GetV7');
  }
  StateGetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/States/GetById?Stateid=' + id);
  }
  StateGetByIDs(id: number):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/States/GetstatebyCity?StateId=' + id);
  }
  ZoneManagerName():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/States/GetActiveAgentsForZone');
  }
  
  // StateManagerName():  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/States/GetActiveAgentsForState');
  // }

  ManagerName():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/States/GetActiveAgentsForCuntry');
  }

  addState(stateservice):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/States/addV7',stateservice);
    }
  
    
    // GetByID(id: number):  Observable<any> {
    //   return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
    // }  
  
    UpdateState(details):  Observable<any> {
      return this.http.put<any>(this.apiURL + '/api/States/addPutV7', details);
    }
    // DeleteCountry(id): Observable<any> {
    //   return this.http.delete<any>(this.apiURL + '/api/Countries/Remove?id='+ id);
    // }

    
    DeleteState(id: number):Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/States/RemoveV7?id=' + id);
  }

}

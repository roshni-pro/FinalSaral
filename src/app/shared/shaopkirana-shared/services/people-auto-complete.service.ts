import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleAutoCompleteService {

  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetPeopleListByName(name: string): Observable<any> {
    
    return this.http.get<any[]>(this.apiURL + '/api/AgentCommissionPayment/GetPeopleByName?name=' + name);
  }

}

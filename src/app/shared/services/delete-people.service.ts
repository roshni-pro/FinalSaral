import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeletePeopleService {

  apiURL: string;
  User:any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
   }
   getremovedpeople() : Observable<any[]>
   {
 
     return this.http.get <any[]>(this.apiURL + '/api/Peoples/getremovedpeople');
   }

   unDeletePeoples(id : number) : Observable<any[]>
   {
 
     return this.http.delete <any>(this.apiURL + '/api/Peoples/Undeleted?peopleid='+ id);
   }
   getbyid(peopleId : number) : Observable<any[]>
   {
 
     return this.http.get <any>(this.apiURL + '/api/Peoples/GetByIdAsync?peopleId='+ peopleId);
   }
   getbyname(DisplayName : string) : Observable<any[]>
   {
 
     return this.http.get <any>(this.apiURL + '/api/Peoples/GetByIdAsync'+ DisplayName);
   }


  
  }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PagerDataV7 } from '../interface/pager-data-v7';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiURL: string;
  User:any;
  comment : string;

 
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

}
GetAllRoles(): Observable<any[]> {
  
  return this.http.get<any[]>(this.apiURL + '/api/Roles');
}
Updaterole(Role):  Observable<any> {
 
  console.log("hjcgsahjgsuya");
  return this.http.put<any>(this.apiURL +'/api/Roles',Role); 
  console.log("kjsdfkjdsaf");
}

addRole(data):  Observable<any> {
  console.log(this.apiURL)
  return this.http.post<any>(this.apiURL + '/api/Roles',data);
  }  

  DeleteRole(id:number): Observable<any> {
       return this.http.delete<any>(this.apiURL + '/api/Roles/DeleteV7?id='+ id);
}
}

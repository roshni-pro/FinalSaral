import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  readonly rootUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  getAllPagePermission(): Observable<any[]>{
    return  this.http.get<any[]>(this.rootUrl+'/api/usersroles/GetAllPagePermission');
   }
}

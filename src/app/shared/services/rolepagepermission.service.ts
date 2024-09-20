import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
@Injectable({
  providedIn: 'root'
})
export class RolepagepermissionService {
  apiURL: string;
 
  User:any;
  comment : string;
 
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  RoleAccess(): Observable<any[]>{

    return this.http.get<any[]>(this.apiURL + '/api/RolePagePermission/GetAllRoleforRequestAccess');

  }
  Pages(): Observable<any[]>{
    
    return this.http.get<any[]>(this.apiURL + '/api/PageMaster/GetAllPagesForDropDown');

  }
  
Role():  Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/RolePagePermission/GetAllRole');
}
GetAllPagesForDropDown(id):  Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/RolePagePermission/GetAllPagesForDropDown?Id='+id);
}
SaveRolePageData(rolePageList,roleID):  Observable<any[]> {
  return this.http.post<any[]>(this.apiURL + '/api/RolePagePermission/SaveRolePageData?roleId='+roleID,rolePageList);
}

saveInRole(roleList): Observable<any[]>{
  
  return this.http.post<any[]>(this.apiURL + '/api/RolePagePermission/SaveRoleRequest',roleList);
  
}
saveAspnetUserInRole(roleList): Observable<any[]>{
  
 return this.http.post<any[]>(this.apiURL + '/api/Account/rolessave',roleList);
 
}
 

}

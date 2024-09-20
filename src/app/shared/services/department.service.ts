import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetAllDepartment():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Department/GetDepartment');
  }
  DepartmentGetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Department/GetById?id=' + id);
  }
 
   addDepartment(departmentservice):  Observable<any> {
  // //   console.log("test")
  // //   console.log(this.apiURL + '/api/Department' ,departmentservice)
    //  return this.http.post<any>(this.apiURL + '/api/Department/Post' ,departmentservice);
     return this.http.post<any>(this.apiURL + '/api/Department/PostV7' ,departmentservice);
     }
       
    
    // GetByID(id: number):  Observable<any> {
    //   return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
    // }  
  
    UpdateDepartment(details):  Observable<any> {
      return this.http.put<any>(this.apiURL + '/api/Department/put',details);
    }
    // DeleteCountry(id): Observable<any> {
    //   return this.http.delete<any>(this.apiURL + '/api/Countries/Remove?id='+ id);
    // }

    
    DeleteDepartment(id: number):Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Department/DeleteV7?id=' + id);
  }

}

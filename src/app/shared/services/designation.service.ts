import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }


  GetAllDesignation():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Designation');
  }
  DesignationGetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Designation/GetById?Designationid='+id);
  }
  
  addDesignation(designationservice):  Observable<any> {
    // console.log("test")
    // console.log(this.apiURL + '/api/Designation' ,designationservice)
      // return this.http.post<any>(this.apiURL + '/api/Designation/add' ,designationservice);
      return this.http.post<any>(this.apiURL + '/api/Designation' ,designationservice);
    }
  
    
    // GetByID(id: number):  Observable<any> {
    //   return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
    // }  
  
    UpdateDesignation(details):  Observable<any> {
      // return this.http.put<any>(this.apiURL + '/api/Designation/cv' + details.ID , details);
      return this.http.put<any>(this.apiURL + '/api/Designation/cv', details);
    }
    // DeleteDesignation(id): Observable<any> {
    //   return this.http.delete<any>(this.apiURL + '/api/Designation/Remove?id='+ id);
    // }

    
    DeleteDesignation(id: number):Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/Designation/Delete?id=' + id);
    return this.http.delete<any>(this.apiURL + '/api/Designation/DeleteV7?id=' + id);
  }
  
}

import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
  
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  // GetAllSkill():  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/Skill');
  // }
  GetAllSkill():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Skill/GetSkill');
  }
  SkillGetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Skill/GetById?id='+id);
  }
 

  addSkill(skillservice):  Observable<any> {
    // console.log("test")
    // console.log(this.apiURL + '/api/Skill' ,countryservice)
      // return this.http.post<any>(this.apiURL + '/api/Skill/add' ,skillservice);
      // return this.http.post<any>(this.apiURL + '/api/Skill/Post' ,skillservice);
      return this.http.post<any>(this.apiURL + '/api/Skill/PostV7' ,skillservice);
      
    }
  
    
    // GetByID(id: number):  Observable<any> {
    //   return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
    // }  
  
    UpdateSkill(details):  Observable<any> {
      return this.http.put<any>(this.apiURL + '/api/Skill/PUT',details);
    }
    // DeleteCountry(id): Observable<any> {
    //   return this.http.delete<any>(this.apiURL + '/api/Countries/Remove?id='+ id);
    // }

    
    DeleteSkill(id: number):Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/Skill/Delete?id=' + id);
    // return this.http.delete<any>(this.apiURL + '/api/Skill?id=' + id);
    return this.http.delete<any>(this.apiURL + '/api/Skill/DELETEV7?id=' + id);
    
  }

}




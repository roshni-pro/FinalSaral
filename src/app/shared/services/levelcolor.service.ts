import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class LevelcolorService {


  apiURL: string;
  // PeopleAll:any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  levelcolur(): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/TargetModule/GetUpdateLevel');
  }
  
  levelsave(list):  Observable<any[]> {
    
    return this.http.post<any[]>(this.apiURL + '/api/TargetModule/UpdateLevel',list);
  }

}

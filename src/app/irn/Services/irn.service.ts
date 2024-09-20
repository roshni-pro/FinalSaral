import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class IRNService {
  apiURL: string;
  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  GetIRNErrorMaster(whouseid): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/IRNErrorMaster');
  }
}
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  apiURL: string;
  User: any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  GetmemberShiplist():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Customers/GetmemberShipList');
  }

  AddMemberShips(memberShipdata): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Customers/AddMemberShip', memberShipdata);
  }
  
  UpdateMemberShip(memberShipdata): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Customers/AddMemberShip', memberShipdata);
  }

  UploadImage(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadMembershipLogoV7',src);
  }

  GetmemberShipbyId(Id):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Customers/GetmemberShipbyId?Id='+Id);
  }
}

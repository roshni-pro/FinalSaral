import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LmdVendorService {

  apiUrl = environment.apiURL + '/api/LMDVendor/';
  constructor(private http: HttpClient) { }

  getLMDVendorList(Keyword: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'GetLMDVendorList?Keyword=' + Keyword);
  }
  insertLMDVendor(Name: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'InsertLMDVendor?Name=' + Name);
  }
  updateLMDVendor(lmdVendorListDC: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'UpdateLMDVendor' , lmdVendorListDC);
  }
  deleteLMDVendor(Id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'DeleteLMDVendor?Id=' + Id);
  }
}

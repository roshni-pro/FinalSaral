import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClearanceNonChangeRequestService {

  apiURL: string;
  constructor(private http: HttpClient) {this.apiURL = environment.apiURL; }
  GetData(status,skip, take,keyword): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/ClearanceNonConfigAprovPageSearch?status='+status+'&skip='+skip+'&take='+take+'&keyword='+keyword);
 }
 
 popupData(id){

  return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/GetExistShelfLife?Id='+ id);
 }

 ApproveRequest(data){
  return this.http.post<any[]>(this.apiURL + '/api/ClearanceNonSaleable/ApproveShelfLife',data);
 }
 RejectRequest(data){
  return this.http.post<any[]>(this.apiURL + '/api/ClearanceNonSaleable/RejectShelfLife',data);
 }
}

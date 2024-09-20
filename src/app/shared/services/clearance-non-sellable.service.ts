import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClearanceNonSellableService {
  apiURL: string;
  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
  }
  GetConfigData(Storeid): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/GetStoreWiseShelfLife?Storeid=' +Storeid);
  }

  UpdateConfigData(data): Observable<any[]>{
    console.log(data);
    
    return this.http.post<any>(this.apiURL + '/api/ClearanceNonSaleable/UpdateStoreWiseShelfLife', data);
  }
}

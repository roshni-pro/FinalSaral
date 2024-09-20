import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HopService {
  apirUrl: any;
  constructor(private http: HttpClient) {
    this.apirUrl = environment.apiURL
  }

  getOverallSummary(payload): Observable<any> {
    return this.http.post<any>(this.apirUrl + '/api/HOP/GetAchievedOverallSummary/', payload)
  }

  getWarehouseData(details): Observable<any> {
    return this.http.post<any>(this.apirUrl + '/api/HOP/GetAchievedWarehouseData/', details)
  }

  getStoreData(details): Observable<any> {
    return this.http.post<any>(this.apirUrl + '/api/HOP/GetAchievedStoreData/', details)
  }

  getBrandData(details): Observable<any> {
    return this.http.post<any>(this.apirUrl + '/api/HOP/GetAchievedBrandData/', details)
  }



  //hop-fields-dashboard APIs
  GetDropDownValues(): Observable<any> {
    return this.http.get<any>(this.apirUrl + '/api/HOP/GetDropDownValues');
  }

  // https://uat.shopkirana.in//api/Warehouse
  GetAllWarehouses(): Observable<any> {
    return this.http.get<any>(this.apirUrl + '/api/Warehouse');
  }

  AllFieldDashboardData(FieldDashboardMasterFilter): Observable<any> {
    return this.http.post<any>(this.apirUrl + '/api/HOP/LoadFieldDashboard', FieldDashboardMasterFilter)
  }

}

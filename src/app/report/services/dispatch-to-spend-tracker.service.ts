import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispatchToSpendTrackerService {
  apirUrl: any;
  constructor(private http: HttpClient) {
    this.apirUrl = environment.apiURL
  }

  getMultiHubList(): Observable<any> {
    return this.http.get<any>(this.apirUrl + '/api/BuyerForecast/GetWarehouse?cityId=')
  }

  getClusterList(warehouseIds): Observable<any> {
    return this.http.post<any>(this.apirUrl + 'api/Masters/Clusters', warehouseIds)
  }

  getPersonList(clusteIds): Observable<any> {
    return this.http.post<any>(this.apirUrl + 'api/ClusterStoreExecutive/GetExecutiveListByClusterIds', clusteIds)
  }

  getDispatchToSpendTrackerList(details): Observable<any> {
    return this.http.post<any>(this.apirUrl + 'api/Report/GetDispatchToSpendTracker', details)
  }
}

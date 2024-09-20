import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) { 
    this.apiUrl = environment.apiURL;
  }
  monthSale(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/DashboardReport/MonthSale');
  }
  fillrate(WarehouseId): Observable<any> {
    //debugger;
    return this.httpClient.post<any>(this.apiUrl + '/api/DashboardReport/fillrate?WarehouseId=' +  WarehouseId,null);
  }
  storesMonthSales(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/DashboardReport/StoresMonthSales');
  }
}

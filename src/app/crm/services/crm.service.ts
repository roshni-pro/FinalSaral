import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrmService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  getCity(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/City');
  }

  getWarehouseByCityID(CityId: number): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Warehouse/GetWarehouseCity/?CityId='+ CityId);
  }

  // https://uat.shopkirana.in/api/OrderMaster/getdetail/?Warehouseid=1&start=2021/08/01 12:00 AM&end=2022/01/10 11:59 PM

  getResultFirstCustomerByDateRange(warehouseID,startDate,endDate): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/OrderMaster/getdetail/?Warehouseid='+warehouseID+'&start='+startDate+' 12:00 AM'+'&end='+endDate+' 11:59 PM');
  }
}

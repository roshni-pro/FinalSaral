import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpreportsService {

  apiUrl: string;
  
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getOPReports(filter): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/Report/GetOrderColorReport', filter);
  }

  // GetBuyerDetailsByBuyerIds(idList): Observable<any> {
  //   return this.httpClient.post<any>(this.apiUrl + '/api/Coupons/GetBuyerDetailsByBuyerIds', idList);
  // }

  
  // https://uat.shopkirana.in/api/BuyerDashboard/GetAllActiveWarehouse
  getAllActiveWarehouse(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/BuyerDashboard/GetAllActiveWarehouse');
  }

  // https://uat.shopkirana.in/api/OrederProcessReport?WarehouseId=1,169,213,7
  getOrederProcessReport(warehouseId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/OrederProcessReport?WarehouseId='+warehouseId);
  }
  ExportOPReports(filter): Observable<any> {
    debugger
    return this.httpClient.post<any>(this.apiUrl + '/api/Report/OPReportExport', filter);
  }


}

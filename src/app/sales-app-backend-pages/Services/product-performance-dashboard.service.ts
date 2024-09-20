import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductPerformanceDashboardService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;


  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetWarehouses()
  {
    return this.http.get<any>(this.apiURL+'api/WarehouseQuadrant/GetWarehouses')
  }

  getQuadrantItemforSearch(Data): Observable<any> {

    return this.http.post<any>(this.apiURL + 'api/WarehouseQuadrant/GetQuadrantItemforSearch', Data);
  }
  getWarehouseQuadrantBrandList(warehouseid,storeid): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/WarehouseQuadrant/GetWarehouseQuadrantBrandList?warehouseid='+warehouseid+'&storeid='+storeid);
  }
  GetStoreList(warehouseid): Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/WarehouseQuadrant/GetStoresBySalesLead?warehouseid='+warehouseid);
  }

  getOverAllMedian(ItemNumber): Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/WarehouseQuadrant/GetOverAllMedian?ItemNumber='+ItemNumber);
  }
  updateSalesForcastValue(Data): Observable<any> {

    return this.http.post<any>(this.apiURL + 'api/WarehouseQuadrant/UpdateSalesForcastValue', Data);
  }
  Uploader(file: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/WarehouseQuadrant/UploadQuadrantFile', file)
  }
  exportAllQuadrantData(Data): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/WarehouseQuadrant/ExportAllQuadrantData', Data)
  }
  getQuadrantitemhistory(QuadrantDetailId): Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/WarehouseQuadrant/GetQuadrantitemhistory?QuadrantDetailId='+QuadrantDetailId);
  }
  GetUserRole() : Observable<any>{
    return this.http.get<any>(this.apiURL + '/api/Account/GetUserRole');
  }
  ExportAllProductPerformanceData()
  {
    return this.http.get<any>(this.apiURL+'api/WarehouseQuadrant/ExportAllProductPerformanceData')
  }


}

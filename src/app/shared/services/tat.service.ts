import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class TatService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  DBoy(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveryOrder');
  }

  DboybasedonWarehouseId(WarehouseId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveryOrder?WarehouseId=' + WarehouseId);
  }

  GetAssignmentTATReport(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/DeliveryAssignment/GetAssignmentTATReportDTO', data);
  }

  // https://uat.shopkirana.in/api/Warehouse
  warehouse(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse');
  }

  // https://uat.shopkirana.in/api/TurnAroundTime/GetDboyList?warehouseID=208
  GetDboyList(WarehouseId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TurnAroundTime/GetDboyList?warehouseID=' + WarehouseId);
  }

  //  https://uat.shopkirana.in/api/TurnAroundTime/GetDataSet
  getTATReport(TATdata): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TurnAroundTime/GetDataSet', TATdata);
  }
}


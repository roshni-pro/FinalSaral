import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatorCustomerCallSMSRequest } from '../interface/paginator-customer-call-smsrequest';
@Injectable({
  providedIn: 'root'
})
export class ExecutivelistbywareidService {
  apiURL: string;
  constructor(private httpClient:HttpClient) { 
    this.apiURL = environment.apiURL;
  }


  getExcutiveByWarehouse(warehouseId:any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL + '/api/ClusterStoreExecutive/GetExecutiveList/' + warehouseId);
  }

  getExcutiveRoute(peopleId:any,date: string):Observable<any[]>{
    // var date = new Date();
    return this.httpClient.get<any[]>(this.apiURL + '/api/SalesApp/GetExecutiveRoute?peopleId='+peopleId+'&date='+date)
  }

  ExecutiveTrackingSalesData(PeopleId:any, WarehouseId:any, StartDate:any):Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + '/api/MobileExecutive/ExecutiveTrackingSalesData?PeopleId='+PeopleId+'&WarehouseId='+WarehouseId+'&StartDate='+StartDate)
  }
}

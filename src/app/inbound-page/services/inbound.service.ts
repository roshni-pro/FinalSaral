import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InboundService {
  apiUrl:any
  
  constructor( private http:HttpClient) { 
    this.apiUrl=environment.apiURL
  }
  
  getWarehouseList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/Warehouse');
  }
  StoreList():Observable<any>
  {
    return this.http.get<any>(this.apiUrl+'api/BuyerForecast/GetGroupNames')
  }
  getStockAging(payload):Observable<any>
  {
    return this.http.post<any>(this.apiUrl+'api/InboundPage/stockAging',payload)
  }
  getDashBoardData():Observable<any>
  {
    return this.http.get<any>(this.apiUrl+'api/InboundPage/GetInboundDashboard')
  }

  getDashBoardHeading(payload):Observable<any>
  {
    return this.http.post<any>(this.apiUrl+'api/InboundPage/GetInboundDashboard',payload)
  }
  getNetInventoryData(payload):Observable<any>
  {
    return this.http.post(this.apiUrl+'api/InboundPage/InboundInventory',payload)
  }
  getCurrentInventoryData()
  {
    return this.http.get(this.apiUrl+'api/InboundPage/InboundCurrentInventory')
  }
  getDamageData(obj)
  {
    return this.http.post(this.apiUrl+'api/InboundPage/InboundDamage',obj)
  }
  getNonSellableData(obj)
  {
    return this.http.post(this.apiUrl+'api/InboundPage/InboundNonSellable',obj)
  }
  getClearanceData(obj)
  {
    return this.http.post(this.apiUrl+'api/InboundPage/InboundClearance',obj)
  }
  searchInbound(obj)
  {
    return this.http.post(this.apiUrl+'api/InboundPage/SearchInbound',obj)
  }
  
}



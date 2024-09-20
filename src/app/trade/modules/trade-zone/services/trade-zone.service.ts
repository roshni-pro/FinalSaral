import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TradeCustomerZoneViewDc } from '../interfaces/trade-customer-zone-view-dc';
import { TradeCustomerZoneEditDc } from '../interfaces/trade-customer-zone-edit-dc';
import { GetZoneIdList } from '../interfaces/GetZoneIdList';

@Injectable({
  providedIn: 'root'
})
export class TradeZoneService {

  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.tradeapiURL;
  }
  tradeCustomerZone(sellerId): Observable<TradeCustomerZoneViewDc[]> {
    return this.httpClient.get<TradeCustomerZoneViewDc[]>(this.apiUrl + '/api/TradeCustomerZone/GetbySellerId/' + sellerId);
  }
  updatePolygonList(zonePointList: any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiUrl + '/api/TradeCustomerZone/UpdatePolygonList?zonePointList=', zonePointList);
  }
  addNewZone(zone : TradeCustomerZoneViewDc): Observable<number> {
    return this.httpClient.post<number>(this.apiUrl + '/api/TradeCustomerZone/AddNewZone', zone);
  }

  getAllBuyers(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/TradeCustomerZone/GetAllBuyers');
  }

  // getAllBuyerByZone( getZoneIdList: GetZoneIdList): Observable<any> {
  //   
  //   return this.httpClient.get<any[]>(this.apiUrl + '/api/TradeCustomerZone/GetAllBuyerByZone'+ getZoneIdList);
  // }
  getAllZones( zoneId: GetZoneIdList): Observable<any> {
    
    return this.httpClient.post<any[]>(this.apiUrl + '/api/TradeCustomerZone/GetAllBuyerByZones', zoneId);
  }
  getAllBuyerBySellerId( sellerId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/TradeCustomerZone/GetAllBuyerBySellerId/'+ sellerId);
  }
  refreshZonesToAllCustomers(): Observable<any> {
    
    return this.httpClient.get<any>(this.apiUrl + '/api/TradeCustomer/RefreshZonesToAllCustomers');
  }

  deleteZone( zoneid: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/TradeCustomerZone/DeleteZone/'+ zoneid);
  }
}

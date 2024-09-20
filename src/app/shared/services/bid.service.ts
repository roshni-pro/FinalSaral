import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PaginatorViewModel } from '../interface/paginator-view-model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BidService {

  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.tradeapiURL;
  }
  getItemPaginatorAsync(vm: PaginatorViewModel): Observable<any>{
    return this.httpClient.post<any>( this.apiUrl + "/api/Bid/GetItemPaginatorAsync", vm);
  }

  getDemandOrStockSummary(param: any): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/GetDemandOrStockSummary", param);
  }

  getDemandOrStockItems(param: any): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/GetDemandOrStockItems", param);
  }

  GetCustomerDemandOrStockForItem(param: any): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/GetCustomerDemandOrStockForItem", param);
  }

  GetDemandOrStockItemSummary(param: any): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/GetDemandOrStockItemSummary", param);
  }
  
  GetDemandOrStockCustomer(param: any): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/GetDemandOrStockCustomer", param);
  }

  GetCustomerDemandOrStockForCustomer(param: any): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/GetCustomerDemandOrStockForCustomer", param);
  }

  GetDemandOrStockCustomerSummary(param: any): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/GetDemandOrStockCustomerSummary", param);
  }

  UpdateBidUI(popUpData): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/UpdateBidUI", popUpData);
  }
  
  InactiveAsyncA7UI(popUpData): Observable<any[]>{
    return this.httpClient.post<any[]>( this.apiUrl + "/api/Bid/InactiveAsyncA7UI", popUpData);
  }



  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PaginatorViewModel } from '../interface/paginator-view-model';
import { skip } from 'rxjs/operators';
import { PaginatorViewModelTradeorder } from '../interface/paginator-view-model-tradeorder';
import { PostIssues } from '../interface/trade/issueTree';
import { filterConsumerOrderdc } from '../interface/trade/filterConsumerOrder-dc';

@Injectable({
  providedIn: 'root'
})
export class TradeOrdersService {

  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.tradeapiURL;
  }

  topTradeItems(numberOfItems: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/TradeOrders/TopTradeItemsBackend/' + numberOfItems + '/' + 'sell');
  }

  topTopOrdersTradeItems(vm: PaginatorViewModel): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiUrl + '/api/TradeOrders/TopOrders', vm);
  }

  topOrderSummary(vm: PaginatorViewModel): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiUrl + '/api/TradeOrders/TopOrderSummary?vm  ', vm);
  }

  getallorder(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/TradeOrders/GetAllOrders');
  }

  getallorderWithSearch(vm: PaginatorViewModelTradeorder): Observable<any> {
    
    return this.httpClient.post<any>(this.apiUrl + '/api/TradeOrders/GetAllOrdersSearch', vm);
  }

  getIssuelist(primaryKey): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/Ticket/GetIssueListV1?primaryKey=' + primaryKey);
  }
  addChild(postIssues: PostIssues): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/Ticket/PostIssueListA7', postIssues);
  }
  deleteNode(primaryKey): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/deleteNode?primaryKey=' + primaryKey);
  }

  getConsumerOrders(ConsumerOrderfilterDc: filterConsumerOrderdc): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiUrl + '/api/ShoppingCart/GetAllSellOrderA7', ConsumerOrderfilterDc);
  }

  getConsumerOrdersV2(filter): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiUrl + '/api/ShoppingCart/GetSellOrderForAssignDboy', filter);
  }




  getAllSellers(): Observable<any[]> {
    
    return this.httpClient.get<any[]>(this.apiUrl + '/api/TradeCustomer/GetAllSeller');
  }

  changeorderStatus(changeOrderStatusOb): Observable<any[]> {
    return this.httpClient.post<any>(this.apiUrl + '/api/ShoppingCart/StatusUpdateA7', changeOrderStatusOb);
  }

  getCartInvoice(cartId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/TradeOrders/CartInvoice/' + cartId + '/A4');
  }

  getDboydetails(DboyMobile): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/ShoppingCart/getDboydetailsA7?Mobile=' + DboyMobile);
  }

  getExportOrderA7(exportExcel): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiUrl + '/api/ShoppingCart/ExportOrderA7', exportExcel);
  }
  CutLineItem(OrderId,CartId,userId): Observable<any> {  
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "CustomerId": userId
        })
      }    
    return this.httpClient.get<any>(this.apiUrl + '/api/ShoppingCart/LineItem/Status/Update/'+ OrderId + '/Cancelled/'+CartId,httpOptions);
  }


  GetSellerDeliveryBoyForAssignment(sellerId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/ShoppingCart/GetSellerDeliveryBoyForAssignment/' + sellerId);
  }



  getDBoyList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/ShoppingCart/GetDboyListA7');
  }


  getAllClusters(cityName): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/TradeCustomer/GetAllClusters/' + cityName);
  }
 
  
  getSellerDeliveryBoyForAssignment(sellerId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/ShoppingCart/GetSellerDeliveryBoyForAssignment/' + sellerId);
  }

}

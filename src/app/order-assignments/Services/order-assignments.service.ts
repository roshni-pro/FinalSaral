import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatorViewModel } from 'app/shared/interface/paginator-view-model';
import { PaginatorViewModelTradeorder } from 'app/shared/interface/paginator-view-model-tradeorder';
import { PostIssues } from 'app/shared/interface/trade/issueTree';
import { filterConsumerOrderdc } from 'app/shared/interface/trade/filterConsumerOrder-dc';
import { TradeCustomerZoneViewDc } from 'app/trade/modules/trade-zone/interfaces/trade-customer-zone-view-dc';
import { tkSellerDashboardFilter } from 'app/shared/interface/trade/tkSellerDashboardFilter';
import { TkSellerwiseDashboardComponent } from 'app/trade/components/tk-sellerwise-dashboard/tk-sellerwise-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class OrderAssignmentsService {

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

  saveBidReport(ManageBid, CustomerId): Observable<any> {

    let headers = new HttpHeaders();

    // let peopleId = localStorage.getItem('userid');

    headers.append('CustomerId', CustomerId);
    const httpOptions = {
      headers: new HttpHeaders({
        'CustomerId': CustomerId
      })
    };


    return this.httpClient.post<any>(this.apiUrl + '/api/Bid/ManageBid', ManageBid, httpOptions);
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

  AssignDboyToCart(deliveryBoyAssignmentSummary): Observable<any> {


    let headers = new HttpHeaders();
    let CustomerId = deliveryBoyAssignmentSummary.SellerId

    headers.append('CustomerId', CustomerId);
    const httpOptions = {
      headers: new HttpHeaders({
        'CustomerId': CustomerId
      })
    };
    return this.httpClient.post(this.apiUrl + '/api/ShoppingCart/AssignDboyToCart/', deliveryBoyAssignmentSummary, httpOptions)
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

  getAllSeller(): Observable<any[]> {
    //  ;
    return this.httpClient.get<any[]>(this.apiUrl + '/api/TradeCustomer/GetAllSeller');
  }

  getSellerByName(keyword: string): Observable<any[]> {
    //  ;
    return this.httpClient.get<any[]>(this.apiUrl + '/api/TradeCustomer/GetSellerByName/' + keyword);
  }
  getSellerDeliveryBoyForAssignment(sellerId: any): Observable<any[]> {

    return this.httpClient.get<any[]>(this.apiUrl + '/api/ShoppingCart/GetSellerDeliveryBoyForAssignment/' + sellerId);
  }


  getDboyCartSummary(dataToPost): Observable<any> {

    return this.httpClient.post<any>(this.apiUrl + '/api/ShoppingCart/GetDboyCartSummary', dataToPost);
  }

  // after changes

  getConsumerOrdersV3(filter): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiUrl + '/api/ShoppingCart/GetPickedOrderForAssignDboy', filter);
  }

  AssignDboyToCartV2(deliveryBoyAssignmentSummary): Observable<any> {


    let CustomerId = localStorage.userid;

    const httpOptions = {
      headers: new HttpHeaders({
        'CustomerId': CustomerId
      })
    };
    return this.httpClient.post(this.apiUrl + '/api/ShoppingCart/PickedOrder/', deliveryBoyAssignmentSummary, httpOptions)
  }

  getDboyCartSummaryV2(dataToPost): Observable<any> {

    return this.httpClient.post<any>(this.apiUrl + '/api/ShoppingCart/GetPickerCartSummary', dataToPost);
  }

  cancelLineITem(item): Observable<any> {
    let CustomerId = localStorage.userid;
    

    const httpOptions = {
      headers: new HttpHeaders({
        'CustomerId': CustomerId
      })
    };
    return this.httpClient.get<any>(this.apiUrl + '/api/ShoppingCart/LineItem/Status/Update/' + item.OrderId + '/' + 'Cancelled' + '/' + item.cartId, httpOptions);
  }

  confirmOrder(item): Observable<any> {

    let CustomerId = localStorage.userid;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'CustomerId': CustomerId
      })
    };
    return this.httpClient.post<any>(this.apiUrl + '/api/ShoppingCart/StatusUpdateA7', item, httpOptions);
  }

  getZonesBySellerId(sellerId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/TradeCustomerZone/GetbySellerId/' + sellerId);
  }

  getTkSellerDashboard(tkSellerDashboardData:tkSellerDashboardFilter): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/TradeDashboard/TkSellerDashboardA7',tkSellerDashboardData);
  }

  getTkSellerDetails(tkSellerDashboardData:tkSellerDashboardFilter): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/TradeDashboard/TkSellerDashboardDetails',tkSellerDashboardData);
  }

  getTklistlist(dataTopost): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/TradeDashboard/GetTkDetailsfrmSkApp', dataTopost);
  }
}






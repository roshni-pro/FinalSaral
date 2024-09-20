import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TradeCustomerPaginator } from '../interface/trade/trade-customer-paginator';
import { CustomerFilters } from '../interface/trade/customer-filters';
import { customerWalletDc } from '../interface/trade/customerWalletDc';
import { customerNotification } from '../interface/trade/customerNotification';
import { bulkNotification } from '../interface/trade/bulkNotification';

@Injectable({
  providedIn: 'root'
})
export class TradeCustomerService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.tradeapiURL;

  }
   
  GetCxSearchPage(customerFilterPage : CustomerFilters): Observable<any> {
    return this.http.post(this.apiURL + '/api/TradeCustomer/GetCxSearchPage', customerFilterPage);
  }

  
  GetAllCustomerExport(): Observable<any> {
    return this.http.get(this.apiURL + '/api/TradeCustomer/GetAllCustomerExport');
  }

  list(): Observable<any> {
    return this.http.get(this.apiURL + '/api/TradeCustomer/GetList');
  }
  GetById(CustomerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TradeCustomer/GetById?CustomerId=' + CustomerId);
  }

  GetWalletDetails(CustomerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TradeCustomer/GetWalletDetails?CustomerId=' + CustomerId);
  }

  SkCode(SkCode): Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/TradeCustomer/SkCode' + SkCode);
  }

  UpdateCustomers(customer): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TradeCustomer/PutItemForCustomerUI', customer);
  }



  UpdateCustomer(Customer): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Customers', Customer);
  }

  PostCustomer(customer): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TradeCustomer/PutItemForCustomerUI', customer);
  }

  GetCustomerSellRequest(customerID): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeCustomer/GetCustomerSellRequest/' + customerID);
  }

  GetCustomerRatings(customerID): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeCustomer/GetCustomerRatings/' + customerID);
  }

  addWalletAmount(CustomerWalletDc:customerWalletDc): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/TradeCustomer/AddWalletPoints',CustomerWalletDc);
  }

  GetCustomerSellRequestV1(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeCustomer/GetCustomerSellRequestV1');
  }

  ApproveSellRequest(sellRequest: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + '/api/TradeCustomer/ApproveSellRequest', sellRequest);
  }

  RejectSellRequest(sellRequest: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + '/api/TradeCustomer/RejectSellRequest', sellRequest);
  }

  requestRemarks(sellRequestremark: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + '/api/TradeCustomer/SellRequestRemark', sellRequestremark);
  }

  // GetCustomerMessageList(pager: TradeCustomerPaginator): Observable<any> {
  //   return this.http.post<any>(this.apiURL + '/api/TradeCustomer/GetCustomerMessageList', pager);
  // }

  GetCustomerMessageList(Cityid: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TradeCustomer/GetCustomerMessageList?Cityid='+ Cityid);
  }

  SendCustomerMessageList(data: any): Observable<boolean> {
    return this.http.post<any>(this.apiURL + '/api/ClientChat/SendCustomerMessageList', data);
  }


  currentversion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Company/currentversion');
  }

  updateversion(TradeAppVersionDc): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Company/updateversion?TradeAppVersionDc=' , TradeAppVersionDc);
  }

  saveReferralText(text): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Company/updateReferralText?Text='+text);
  }

  getReferralText(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Company/referralText');
  }
  
  GetCartDetailsById(CustomerId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/ShoppingCart/GetMyOrderA7?CustomerId='+ CustomerId);
  }
  getBuyerZoneList(buyerId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeCustomerZone/GetBuyerZoneList/'+ buyerId);
  }

  SendCustomerNotificationList(CustomerNotification: customerNotification): Observable<boolean> {
    return this.http.post<any>(this.apiURL + '/api/Notification/CustomerNotificatonforA7', CustomerNotification);
  }

  sendBulkNotification(mobileNolist:bulkNotification): Observable<any[]>{
    let CustomerId = localStorage.userid;
    return this.http.post<any>(this.apiURL + '/api/Notification/BulkNotificaton',mobileNolist);
   }

   GetNotificationDetails(skip,take): Observable<any>{
    return this.http.get<any[]>(this.apiURL + '/api/Notification/GetBulkNotification?Skip='+ skip +'&Take='+ take);
   }


}

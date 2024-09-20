import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CustomerLedgerMessagePager } from '../interface/customer-ledger-message-pager';

@Injectable({
  providedIn: 'root'
})
export class CustomerLedgerConsentService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }
 
  WarehouseGetByID(): Observable<any[]> {
     return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
  }
  GetBylist(name: string, warehouseid: any[]): Observable<any> {
    return this.http.get<any[]>(this.apiURL + '/api/CustomerLedgerConsent/GetCustomer?name=' + name + '&WarehouseId=' + warehouseid);
  }
  GetSearch(pager: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/CustomerLedgerConsent/GetPage', pager);
  }
  Save(customerLedgerConsentDC: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/CustomerLedgerConsent/AddConsent', customerLedgerConsentDC);
  }
  GetCustomerconsentList(searchModal:any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerLedgerConsent/GetConsentList', searchModal);
  }
  GetMsgSendCustomerList(customerLedgerMessagePager:CustomerLedgerMessagePager):Observable<any[]>{
    return this.http.post<any[]>(this.apiURL + '/api/CustomerLedgerConsent/GetMsgSendList',customerLedgerMessagePager);
  }

  UploadNewCustomerList(list: any[]):Observable<boolean>{
    return this.http.post<boolean>(this.apiURL + '/api/CustomerLedgerConsent/UploadNewCustomerList',list);
  }
  ExportConsent(searchModal:any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerLedgerConsent/GenerateExcel', searchModal);
  }
}

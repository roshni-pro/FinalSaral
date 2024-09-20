import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { WuDuSmsCx } from 'app/shared/interface/wuduinterfaces/wu-du-sms-cx';

@Injectable({
  providedIn: 'root'
})
export class WuduService {

  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.tradeapiURL;

  }


  currentversion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Company/currentversionWudu');
  }

  updateversion(TradeAppVersionDc): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Company/updateversionWudu', TradeAppVersionDc);
  }

  GetwuduCustomerList(City): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/HisabKitab/GetwuduCustomerList?City='+City);
  }
  GetwuduCustomerListMongo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/HisabKitab/GetwuduCustomerListMongo');
  }
  SendCustomerMessageList(wuDuSmsCx: WuDuSmsCx): Observable<boolean> {
    return this.http.post<any>(this.apiURL + '/api/HisabKitab/SendwuduCustomerMessageList', wuDuSmsCx);
  }
  SendNotification(wuDuSmsCx: WuDuSmsCx): Observable<boolean> {
    return this.http.post<any>(this.apiURL + '/api/HisabKitab/wuduCxNotification', wuDuSmsCx);
  }
  GetloginCustomers(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get<any[]>(this.apiURL + '/api/HisabKitab/GetwuduloginCustomers', httpOptions);
  } 
  
}

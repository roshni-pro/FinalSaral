import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponcodesService {


  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.tradeapiURL;
  }

  GetCouponCodeDetails(filter): Observable<any> {
    let CustomerId = localStorage.userid;

    const httpOptions = {
      headers: new HttpHeaders({
        'CustomerId': CustomerId
      })
    };
    
    return this.httpClient.post<any>(this.apiUrl + '/api/Coupons/GetCouponCodeDetails', filter, httpOptions);
  }

  GetBuyerDetailsByBuyerIds(idList): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/Coupons/GetBuyerDetailsByBuyerIds', idList);
  }

}

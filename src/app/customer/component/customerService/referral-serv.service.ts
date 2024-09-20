import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReferralServService {
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  GetCustomerReferralData(payload): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/RetailerApp/GetCustomerReferralData', payload);
  }

  // api/RetailerApp/GetCustomerWiseReferralList?Skcode='sk11'
  GetCustomerWiseReferralList(skCode): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/RetailerApp/GetCustomerWiseReferralList?Skcode=' + skCode);
  }


  //VAN Transaction page
  // http://localhost:26265/api/VANTransaction/GetVANTransactionList
  GetVANTransactionList(vanDC): Observable<any> {
    return this.http.post(this.apiURL + "/api/VANTransaction/GetVANTransactionList", vanDC);
  }

  // http://localhost:26265/api/VANTransaction/GetSubVANTransactionList?Id=4
  GetSubVANTransactionList(id): Observable<any> {
    return this.http.get(this.apiURL + "/api/VANTransaction/GetSubVANTransactionList?Id=" + id);

  }
}

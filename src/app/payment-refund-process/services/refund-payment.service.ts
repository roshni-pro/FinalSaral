import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RefundPaymentService {
  apiURL: string;


  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getWarehouse(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL + '/api/Warehouse');
  }

  searchList(details): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/api/PaymentRefund/GetPaymentRefundList', details);
  }

  // http://localhost:26265/api/PaymentRefund/PaymentRefundExport
  PaymentRefundExport(details): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/api/PaymentRefund/PaymentRefundExport', details);
  }

  // http://localhost:26265/api/PaymentRefund/GetPaymentRefundHistory
  // GetPaymentRefundHistory(details): Observable<any> {
  //   return this.httpClient.post<any>(this.apiURL + 'api/PaymentRefund/GetPaymentRefundHistory', details);
  // }

  GetPaymentRefundHistory(id): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/api/PaymentRefund/GetPaymentRefundHistory/'+id);
  }
  addPaymentRefundManualComment(id,Comment): Observable<any>{    
    return this.httpClient.get<any>(this.apiURL + '/api/PaymentRefund/AddPaymentRefundManualComment/'+ id +'/'+ Comment );
  }

  // https://uat.shopkirana.in/api/PaymentRefund/Process?PaymentRefundRequestId=3
  Process(PaymentRefundRequestId): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + 'api/PaymentRefund/Process?PaymentRefundRequestId=' + PaymentRefundRequestId);
  }


}
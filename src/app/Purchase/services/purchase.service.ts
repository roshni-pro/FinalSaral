import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { POReturnRequestPager } from '../interface/purchaseModel';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  GetPurchaseOrderById(purchaseOrderId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/POReturn/Model/' + Number(purchaseOrderId));
  }

  makeCancelRequest(poReturnRequest): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/POReturn/MakeCancelRequest', poReturnRequest);
  }

  isGRExistsForPO(purchaseOrderMasterId: number): Observable<boolean> {
    return this.http.get<any>(this.apiURL + '/api/POReturn/IsGRExistsForPO/' + purchaseOrderMasterId);
  }
  isIRExistsForGR(goodReceiptDetailId: number, serialNumber: number): Observable<boolean> {
    return this.http.get<any>(this.apiURL + '/api/POReturn/IsIRExistsForGR/' + goodReceiptDetailId + '/' + serialNumber);
  }

  getPOReturnRequestList(returnPager: POReturnRequestPager): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/POReturn/GetList', returnPager);
  }

  ApproveCancelRequest(poReturnRequestId): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/POReturn/ApproveCancelRequest', poReturnRequestId);
  }

  RejectCancelRequest(poReturnRequestId): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/POReturn/RejectCancelRequest', poReturnRequestId);
  }


}

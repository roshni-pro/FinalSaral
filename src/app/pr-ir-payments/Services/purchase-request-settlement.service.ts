import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PurchaseRequestSettlementContainer, PurchaseRequestSettlementFilter, PurchaseRequestPaymentSettlementDc } from '../Interfaces/purchase-request-settlement-filter';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestSettlementService {
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL + '/api/PurchaseRequestSettlement';
  }

  getPageList(filter: PurchaseRequestSettlementFilter) : Observable<PurchaseRequestSettlementContainer>{
    return this.http.post<PurchaseRequestSettlementContainer>(this.apiURL + '/GetPageList', filter);
  }

  getIRList(supplierId: number) : Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/GetIRList/'+ supplierId);
  }

  settlePayment(settlement: PurchaseRequestPaymentSettlementDc) : Observable<any[]>{
    return this.http.post<any[]>(this.apiURL + '/SettlePayment', settlement);
  }

  getAdvanceOutstanding(supplierIdList: any[]) : Observable<any[]>{
    return this.http.post<any[]>(this.apiURL + '/GetAdvanceOutstanding', supplierIdList);
  }


}

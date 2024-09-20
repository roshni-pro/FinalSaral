import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { IrOutstandingPaginator } from 'app/shared/interface/supplier/ir-outstanding-paginator';
import { IrOutstandingListDC } from 'app/shared/interface/supplier/ir-outstanding-list-dc';
import { Observable } from 'rxjs';
import { IrPaymentSummaryPaginator } from 'app/shared/interface/supplier/ir-payment-summary-paginator';
import { IRPaymentSummariesDC } from 'app/shared/interface/supplier/irpayment-summaries-dc';
import { IrPaymentSummaryListDC } from 'app/shared/interface/supplier/ir-payment-summary-list-dc';
import { IrOutstandingViewPaginator } from 'app/shared/interface/supplier/ir-outstanding-view-paginator';

@Injectable({
  providedIn: 'root'
})
export class IrService {
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  getIrOutstandingList(paginator: IrOutstandingPaginator): Observable<IrOutstandingListDC>{

    return this.http.post<IrOutstandingListDC>( this.apiURL + '/api/IR/GetIrOutstandingList', paginator);
  }

  irPaymentSummariesGet(paginator: IrPaymentSummaryPaginator): Observable<IrPaymentSummaryListDC>{

    return this.http.post<IrPaymentSummaryListDC>( this.apiURL + '/api/IR/IRPaymentSummariesGet', paginator);
  }

  supplierPaymentReport(irPaymentSummaryId: number): Observable<string>{
    return this.http.get<string>( this.apiURL + '/api/SupplierLedger/SupplierPaymentReport/' + irPaymentSummaryId);
  }

  getIrOutstandingViewList(paginator: IrOutstandingViewPaginator): Observable<IrOutstandingListDC>{

    return this.http.post<IrOutstandingListDC>( this.apiURL + '/api/IR/GetIrOutstandingViewList', paginator);
  }


  getBySummaryId(irPaymentSummaryId: number): Observable<any[]>{
    return this.http.get<any[]>( this.apiURL + '/api/IR/GetBySummaryId/' + irPaymentSummaryId);
  }

  getIRStaus(): Observable<string[]>{
    return this.http.get<any[]>( this.apiURL + '/api/IR/GetIRStaus' );
  }
  updatebankname( Id, BankId): Observable<string>{
    return this.http.get<string>( this.apiURL + '/api/IR/updatebankname?Id='+Id+'&BankId='+BankId);
  }
}

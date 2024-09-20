import { PrPaymentSummaryPaginator } from '../Interfaces/PrPayments';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrPayments } from '../Interfaces/PrPayments';

@Injectable({
  providedIn: 'root'
})
export class IrpaymentsService {

  apiURL: string;
  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getPrPayments(): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/PRApproval/GetApprovedList');
  }

  getIrPayments(): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/PRApproval/GetIrList');
  }

  sendForApproval(approvalList): Observable<any> {
    return this.http.post<any>(this.apiURL + '/approvalList', approvalList);
  }

  GetApprovedData(whouseId): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/PRApproval/GetApprovedData/' + whouseId);
  }

  // getIrListByFilter(paginator): Observable<any> {
  //   
  //   return this.http.get<any>(this.apiURL + '/api/PRApproval/GetApprovedWHWise?warehouseid=' + Number(paginator.WarehouseId));
  // }

  getPrListByFilter(paginator): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PurchaseRequestPayments/GetPrListByFilter', paginator);
  }

  makePRPayment(payment: PrPayments): Observable<PrPayments> {

    return this.http.post<PrPayments>(this.apiURL + '/api/PurchaseRequestPayments/MakePRPayment', payment);
  }

  prPaymentSummariesGet(paginator: PrPaymentSummaryPaginator): Observable<any> {
    
    return this.http.post<PrPaymentSummaryPaginator>(this.apiURL + '/api/PurchaseRequestPayments/GetPaymentSummaryList', paginator);
  }

  supplierPaymentReport(prPaymentSummaryId: number): Observable<string> {
    
    return this.http.get<string>(this.apiURL + '/api/PurchaseRequestPayments/SupplierPaymentReport/' + prPaymentSummaryId);
  }

  getBySummaryId(prPaymentSummaryId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/PurchaseRequestPayments/GetBySummaryId/' + prPaymentSummaryId);
  }


  getAllBySummaryId(prPaymentSummaryId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/PurchaseRequestPayments/GetAllBySummaryId/' + prPaymentSummaryId);
  }



  updateIRPayment(paymentList: any[]): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + '/api/PurchaseRequestPayments/UpdatePRPayment', paymentList);
  }

  getPrPaymentsByDate(paginator): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PurchaseRequestPayments/GetPRPaymentsListByDate', paginator);
  }

  rejectPRPayment(purchaseRequestPaymentÌd: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PurchaseRequestPayments/RejectPRPayment/' + purchaseRequestPaymentÌd);
  }

  getSupplierPRPaymentExport(prPaymentSummaryId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/PurchaseRequestPayments/GetSupplierPRPaymentExport/' + prPaymentSummaryId);
  }

  getSupplierIRPaymentExport(irPaymentSummaryId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/PurchaseRequestPayments/GetSupplierIRPaymentExport/' + irPaymentSummaryId);
  }

  getGRDataFilter(PurchaseOrderId: number): Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/PRApproval/CheckGR?PurchaseOrderId=' + PurchaseOrderId);

  }

  UpdateStatus(data): Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/PRApproval/RejectPRAccount', data);
  }

  updatebankname(Id,BankId):Observable<string>{
    return this.http.get<string>(this.apiURL+'/api/PurchaseRequestPayments/updatebankname?Id='+Id+'&BankId='+BankId);
  }

  GetBankNumberByPurchaseOrderId(PurchaseOrderId: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PurchaseRequestPayments/GetBankNumberByPurchaseOrderId?PurchaseOrderId='+PurchaseOrderId);
  }


}

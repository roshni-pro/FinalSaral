import { DebugElement, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderReconciliationServiceService {
  apiURL: string;
  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  getAllCityNew(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetCityIsCommon');
  }
  GetWarehouseListForTargetV2(Payload: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/DeliveyMapping/WarehouseGetByCityListCommon', Payload)
  }
  getOrderToOrderReconcillationList(Payload: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/GetOrderToOrderReconcillationList', Payload)
  }
  Uploader(file: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/UploadBankFile', file)
  }
  UploaderUpi(file: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/UploadUpiFile', file)
  }

  uploadHDFCFile(file: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/UploadHDFCFile', file)
  }

  getBankStatementFileDetails(payload:any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/GetBankStatementFileDetails',payload);
  }

  updateBankResonId(id, Reason: any, comment: any): Observable<any> {
    return this.http.put<any>(this.apiURL + 'api/OrderReconcillation/UpdateBankResonId?id=' + id + '&Reason=' + Reason + '&comment=' + comment, null);
  }
  UpdateOrderReconcilationIdWise(id, comment: any, status: any): Observable<any> {
    return this.http.put<any>(this.apiURL + 'api/OrderReconcillation/UpdateOrderReconcilationIdWise?id=' + id + '&comment=' + comment + '&status=' + status, null);
  }
  getOrderToOrderReconcilationHistories(orderid, paymentType: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/GetOrderToOrderReconcilationHistories?orderid=' + orderid + '&mop=' + paymentType,null);
  }
  getOrderToOrderReconciliationDashboard(Payload: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/GetOrderToOrderReconciliationDashboard', Payload)
  }
  ExportorderReconcilationDashboard(Payload: any):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/ExportorderReconcilationDashboard', Payload)
  }
  ExportOrderToOrderReconcillationList(Payload: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/ExportOrderToOrderReconcillationList', Payload)
  }
  GetMisDetail(payload:any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderReconcillation/GetMisDetail',payload);
  }
  GetMistobank(FromDate,Todate): Observable<any> {
   
    return this.http.get<any>(this.apiURL + 'api/OrderReconcillation/GetMistobank?FromDate=' + FromDate + '&Todate=' + Todate);
  }
  Getorderidforverifiedbank(id):Observable<any>{
    return this.http.get<any>(this.apiURL+'api/OrderReconcillation/Getorderidforverifiedbank?Id='+id);
  }
}

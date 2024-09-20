import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosSystemService {
  apiUrl: string;

  constructor(private httpClient: HttpClient) { this.apiUrl = environment.apiURL;}

  public editDataDetails: any = [];
  private messageSource = new  BehaviorSubject(this.editDataDetails);
  currentMessage = this.messageSource.asObservable();
  FromBucket(message: any[]) {  debugger;  this.messageSource.next(message)  }
  

  GetWarehouse(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/DeliveyMapping/GetStoreWarehouse');
  }
 
  searchList(Payload:any) {
    debugger
    return this.httpClient.post<any>(this.apiUrl + 'api/BackendOrder/GetOrderDetailByWarehouse',Payload);
  }
  GetBackendInvoiceData(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/OrderDispatchedMaster/GetBackendInvoiceData?id='+id);
  }
  GetBackendOrderInvoiceHtml(OrderId,mobilenumber): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'api/BackendOrder/GetBackendOrderInvoiceHtml?id=' + OrderId + "&Mobile=" + mobilenumber,null)
  }
  UpdatePaymentStatus(Payload:any) {
    debugger
    return this.httpClient.post<any>(this.apiUrl + 'api/BackendOrder/UpdatePaymentStatus',Payload);
  }
  CheckUPIResponse(OrderId,amount): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'UPI/CheckUPIResponse?OrderId=' + OrderId + "&amount=" + amount)
  }
  GenerateBackEndAmtQRCode(Payload:any) {
    debugger
    return this.httpClient.post<any>(this.apiUrl + 'UPI/GenerateBackEndAmtQRCode',Payload);
  }
  GetQrEnabledData(WarehouseId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/BackendOrder/GetQrEnabledData?warehouseid=' + WarehouseId )
  }
  GetOfferItem(OrderId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/offer/GetOfferItem?oderid=' + OrderId )
  }
  Getpaymentstatus(OrderId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/OrderMastersAPI/Getpaymentstatus?OrderId=' + OrderId )
  }
  GetInvoiceAmountToWord(amount): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/OrderMaster/GetInvoiceAmountToWord?Amount=' + amount )
  }

 
}

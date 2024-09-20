import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpiTransactionDetailsServiceService {
  url: string;
  apiURL: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiURL;
    this.apiURL = environment.apiURL + '/api/OnlineTransaction/';
  }

  getUpiTransactionData(payload) {
    debugger
    return this.http.post(this.apiURL + 'GetUPITransactionData',payload);
  }
  ExportgetUpiTransactionData(payload)
  {
    return this.http.post(this.apiURL + 'ExportGetUPITransactionData',payload);

  }
  getWarehouses()
  {
    return this.http.get(this.url+'/api/Warehouse')
  }
  Uploader(file: any): Observable<any> {

    return this.http.post<any>(this.url + 'api/TestCashCollection/StoreCreditLimitUploader',file)
  }
  DownloadSampleFile(){
    return this.http.get<any>(this.url + 'api/TestCashCollection/DownloadStoreCreditLimitUploader')
  }
  GetStoreList(): Observable<any>{
    return this.http.get<any>(this.url + 'api/TestCashCollection/GetStoreList');
  }
  SearchCreditList(Data:any)
  {
    return this.http.post(this.url + 'api/TestCashCollection/SearchCreditList',Data);
  }
  EditCreditList(Id,Amount,IsActive)
  {
    return this.http.get<any>(this.url+'api/TestCashCollection/EditCreditList?Id='+Id+'&Amount='+Amount+'&IsActive='+IsActive)
  }
  GetpayLaterCollection(Data:any)
  {
    return this.http.post(this.url + 'api/TestCashCollection/GetpayLaterCollection',Data);
  }
  CurrencyDenomination()
  {
    return this.http.get<any>(this.url+"api/MobileDelivery/CurrencyDenomination")
  }
  GetBankName()
  {
    return this.http.get<any>(this.url+"api/MobileDelivery/GetBankName")
  }
  CashPayment(obj:any)
  {
    return this.http.post<any>(this.url+"api/Currency/CashPaymentPayLater",obj)
  }
  ChequePaymentAdd(obj:any)
  {
    return this.http.post<any>(this.url+"api/Currency/ChequePaymentAddPayLater",obj)
  }
  OnlinePayment(obj:any)
  {
    return this.http.post<any>(this.url+"api/Currency/OnlinePaymentPayLater",obj)
  }
  CurrencyUploadChequeImage(file:any)
  {
    return this.http.post<any>(this.url+"api/Currency/CurrencyUploadedChequeImage",file)
  }
  AddCustomerLimit(obj)
  {
    return this.http.post<any>(this.url+"api/Currency/AddCustomerLimit",obj)
  }

  GetSkCodeCustomerList(SkCode)
  {
    return this.http.get<any>(this.url +'api/Currency/GetSkCodeCustomerList?Skcode='+SkCode)
  }
  AllStore()
  {
    return this.http.get<any>(this.url+"/api/Store/GetAllStore")
  }
  ExportCreditList(Data:any)
  {
    return this.http.post(this.url + 'api/TestCashCollection/ExportCreditList',Data);
  }
  ExportpayLaterCollection(Data:any)
  {
    return this.http.post(this.url + 'api/TestCashCollection/ExportPayLaterData',Data);
  }
  PaymentApprove(Id:any)
  {
    return this.http.get<any>(this.url+'api/Currency/PaymentApprove?Id='+Id)
  }
  PaymentReject(Id:any)
  {
    return this.http.get<any>(this.url+'api/Currency/PaymentReject?Id='+Id)
  }
  getwarehouselist(){
    return this.http.get<any>(this.url+'api/TestCashCollection/GetAllWarehouseList')
  }
  GetMopWisepayLaterData(obj:any): Observable<any>{
    return this.http.post<any>(this.url + 'api/TestCashCollection/GetMopWisepayLaterData',obj);
  }
}

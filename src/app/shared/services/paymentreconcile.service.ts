import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class PaymentreconcileService {
  apiURL: string;
  User: any;
  comment: string;


  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  SearchStatusValue(value: any, FromDate: any, ToDate: any): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/UploadFileSearch?value=' + value + '&&' + 'start=' + FromDate + '&&' + 'end=' + ToDate);
  }

  SearchValue(OrderId: any, SKCode: any, FromDate: any, ToDate: any): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/SearchData?OrderId=' + OrderId + '&&' + 'SKCode=' + SKCode + '&&' + 'start=' + FromDate + '&&' + 'end=' + ToDate);
  }

  SearchAllValue(value: any, OrderId: any, SKCode: any, FromDate: any, ToDate: any): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/MultiSearchData?value=' + value + '&&' + 'OrderId=' + OrderId + '&&' + 'SKCode=' + SKCode + '&&' + 'start=' + FromDate + '&&' + 'end=' + ToDate);
  }

  GetStatusHDFC(UploadId, value): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/Onchangehdfc?UploadId=' + UploadId + '&status=' + value);
  }

  GetStatusHDFCNet(UploadId, value): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/OnchangeHDFCNet?UploadId=' + UploadId + '&status=' + value);
  }

  GetStatusePay(UploadId, value): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/OnchangeEpay?UploadId=' + UploadId + '&status=' + value);
  }

  GetStatusmPos(UploadId, value): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/Onchangempos?UploadId=' + UploadId + '&status=' + value);
  }

  GetValuebased(value): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/GetData?value=' + value);
  }

  GetValuebasedFile(value): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/OnlineTransaction/select?value=' + value);
  }

  UploadFilesHDFC(src, value): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/EpayLaterUpload/post?fileType=' + value, src);

  }

  UploadFilesePay(src, value): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/EpayLaterUpload/post?fileType=' + value, src);

  }


  UploadFilemPos(src, value): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/EpayLaterUpload/post?fileType=' + value, src);

  }

  UploadFileHDFCNet(src, value): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/MposUpload/post?fileType=' + value, src);

  }

  GetHDFCdata(UploadId: any): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/OnlineTransaction/GethdfcDetails?UploadId=' + UploadId);
  }

  GetEpaydata(UploadId: any): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/OnlineTransaction/GetEpayDetails?UploadId=' + UploadId);
  }

  GetmPosdata(UploadId: any): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/OnlineTransaction/GetmPosDetails?UploadId=' + UploadId);
  }

  GetHDFCNetdata(UploadId: any): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/OnlineTransaction/GethdfcNetDetails?UploadId=' + UploadId);
  }
  exportDateBased(value, dateto, datefrom): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/OnlineTransaction/GetExportData?value=' + value + '&start=' + datefrom + '&end=' + dateto);
  }
  SearchAssignmentID(searchKey): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/OnlineTransaction/SearchAssignmentWise?AssignmentID=' + searchKey);
  }

  UpdateStatus(data): Observable<any> {

    return this.http.put<any>(this.apiURL + '/api/OnlineTransaction/StatusData', data);
  }

  getWarehouseList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetHub');
  }

  // http://localhost:26265/api/VANPaymantUpload/VANPaymantUploadFile  

  VANPaymantUploadFile(file): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/VANPaymantUpload/VANPaymantUploadFile', file);
  }

  // http://localhost:26265/api/VANTransaction/GetSubVANTransactionList?Id=1 ---------GET API
  GetSubVANTransactionList(id): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/VANTransaction/GetSubVANTransactionList?Id=' + id);
  }

  // http://localhost:26265/api/VANTransaction/GetRTGSpaymentReconcilationlist----------POST API
  GetRTGSpaymentReconcilationlist(body): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/VANTransaction/GetRTGSpaymentReconcilationlist', body);
  }

}

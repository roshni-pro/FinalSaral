import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatorCustomerCallSMSRequest } from '../interface/paginator-customer-call-smsrequest';

@Injectable({
  providedIn: 'root'
})
export class EwayBillOrderService {
  apiURL: string;
  User:any;
  comment : string;

  constructor( private http: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  GetEwaybillOrder(data : PaginatorCustomerCallSMSRequest): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/EwayBillOrderController/GetEwaybillOrderSearchMongo',data);
  }

  GetEwaybillUpdate(dataToPost): Observable<any[]> {   
    return this.http.post<any[]>(this.apiURL + '/api/EwayBillOrderController/updateEwaybillOrder', dataToPost) ;     //OrderId='+ OrderId + '&filepath=' + filename + '&Id=' + Id + '&EwayBillNumber=' + EwayBillNumber,null);
  }

  UploadDoc(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/EwayBillOrderController/UploadEwayBillDocV7',src);

  }


}



import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class PurchaseregisterService {
  apiURL: string;  
  User:any;
  comment : string;
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetPurchasereport(FromDate:any,ToDate:any):  Observable<any[]> {    
    return this.http.get<any[]>(this.apiURL + '/api/PurchaseOrderDetailRecived/GetPurchaseReport?from='+FromDate + '&&' + 'to=' + ToDate );
  }
  GetPurchaseRegistorData(purchaseRegisterDC):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/PurchaseOrderDetailRecived/GetPurchaseRegistorData',purchaseRegisterDC );
  }
}

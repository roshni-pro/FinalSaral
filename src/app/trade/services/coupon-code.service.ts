import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CouponCodes } from '../interfaces/coupon-code';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponCodeService {
  tradeApiUrl: string;
  constructor(private http: HttpClient) {
    this.tradeApiUrl = environment.tradeapiURL;
   }

   getCustomerCouponList(customerId:  number): Observable<CouponCodes[]>{
     return this.http.get<CouponCodes[]>(this.tradeApiUrl + '/api/Coupons/GetCustomerCouponList/' + customerId);
   }

   addNewCoupon(customerId: number, couponCode: CouponCodes): Observable<any>{
    let CustomerId = localStorage.userid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "CustomerId": CustomerId
      })
    }   
    return this.http.post<any>(this.tradeApiUrl + '/api/Coupons/AddNewCoupon/' + customerId, couponCode, httpOptions);
   }


   inActiveCoupon(couponCodeId: string): Observable<any>{
    let CustomerId = localStorage.userid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "CustomerId": CustomerId
      })
    }   
    return this.http.get<any>(this.tradeApiUrl + '/api/Coupons/InActive/'+ couponCodeId, httpOptions);
   }

   addCouponList(couponList: any[]): Observable<any[]>{
    let CustomerId = localStorage.userid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "CustomerId": CustomerId
      })
    }   
    return this.http.post<any[]>(this.tradeApiUrl + '/api/Coupons/AddCouponList/', couponList, httpOptions);
   }

   
}

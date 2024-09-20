import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MopService {
  apiURL:string;
  constructor(private httpClient : HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getOrderMOP(OrderID:number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL +'/api/OrderMastersAPI/Getpaymentstatus?OrderId='+OrderID);
  }
  //OrderID:number,customerCode:any,FromMOP:any,ToMOP:any,transactionId:any
  GetChangeOnlieOrderMop(OrderID:number,customerCode:any,FromMOP:any,ToMOP:any,transactionId:any):Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL +'/api/OrderMastersAPI/GetChangeOnlieOrderMop?OrderId='+OrderID+'&CustomerId='+customerCode+'&FromMOP='+FromMOP+'&ToMOP='+ToMOP+'&tranId='+transactionId);
  }
}

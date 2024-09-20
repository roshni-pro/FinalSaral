import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InActiveCustOrderService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  inOderCusOrderList(pageNo,details): Observable<any[]>{
    return this.http.post<any>(this.apiURL + 'api/InActiveCustOrderMaster?list=20&page='+pageNo ,details)
  }

  exportInOderCusOrderList(totalCount,pageNo,details): Observable<any[]>{
    return this.http.post<any>(this.apiURL + 'api/InActiveCustOrderMaster?list='+ totalCount +'&page='+pageNo ,details)
  }

  getList(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + 'api/Warehouse/GetHub')
  }

  searchResultBasedOnkey(start:any,end:any,skcode:any,mobile:any,status:any,data:any): Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/InActiveCustOrderMaster/Search?list=20&page=1&start=' + start + '&end=' + end + '&Skcode=' + skcode + '&Mobile=' + mobile + '&status=' + status,data)
  }

  getInActiveCustOrderMaster(orderId:any): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + 'api/InActiveCustOrderMaster?id='+orderId)
  }

  getCustomer(CustomerId:any):Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + 'api/InActiveCustOrderMaster/Customer?CustomerId='+CustomerId)
  }

  inActiveCustomerOrderMaster(details): Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/InActiveCustOrderMaster',details)
  }


}

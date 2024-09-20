import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderConcernService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }


  getOrderConcern(detail): Observable<any> {
    // return this.http.get<any>(this.apiURL + '/api/OrderConcern/GetOrderConcern?keyword='+ keyword);
    return this.http.post<any>(this.apiURL + '/api/OrderConcern/GetOrderConcern',detail);
  }
  postOrderForStatus(orderForStatus): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/OrderConcern/PostOrderForStatus', orderForStatus);
  }
  test(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderConcern/Test');
  }
  postOrderConcernMasterdata(orderConcernMasterDc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/OrderConcern/InsertOrderConcernMaster',orderConcernMasterDc);
  }
  getOrderConcernMasterData(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderConcern/getOrderConcernMasterData');
  }
  updateOrderForStatus(orderForStatus): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/OrderConcern/UpdateOrderConcernMaster', orderForStatus);
  }
  deleteOrderConcernMaster(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderConcern/DeleteOrderConcernMaster?Id='+ Id);
  }
  // GetExecutiveListByClusterIds(Clusterids): Observable<any> {
  //   return this.http.post<any>(this.apiURL + '/api/ClusterStoreExecutive/GetExecutiveListByClusterIds', Clusterids);
  // }
}

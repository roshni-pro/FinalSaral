import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }

   GetOrderListByWarehouse(warehouseId):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrderMaster?list=20&page=1&WarehouseId='+ warehouseId);
  }
   GetOrder():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'api/orders');
  }

  SearchOrderList(orderId, skcode, shopName, mobile, status, warehouseId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SearchOrder?start=null&end=null&OrderId='+ orderId +'&Skcode='+ skcode +'&ShopName='+ shopName +'&Mobile='+ mobile +'&status='+ status + '&WarehouseId=' + warehouseId);
  }

  GetById(orderId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrderMaster?id='+ orderId);
  }

  GetByCustomerId(customerId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrderMaster/GetByCustomerId?id='+ customerId);
  }

  UpdateOrderDetails(item): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/OrderMaster', item);
  }
  GetData(FilterOrderDTO): Observable<any> {
   return this.http.post<any>(this.apiURL + '/api/OrderMaster/GetOrderDCR', FilterOrderDTO);
 }
 RejectOrderId(postdata){
  return this.http.post<any>(this.apiURL + '/api/DeliveryCancelRequest/Reject', postdata);
 }
 getOrderDetails(OrderId): Observable<any[]> {

  return this.http.get<any[]>(this.apiURL + '/api/DeliveryCancelRequest/getOrderDetails?OrderId='+ OrderId);
}
 updateOrderStatus(data){
   return this.http.post<any>(this.apiURL+'/api/DeliveryTask/PostDCROrder',data)
 }
 getOrderCallback(FilterOrderDTO): Observable<any> {
  return this.http.post<any>(this.apiURL + '/api/DeliveryCancelRequest/getOrderCallback', FilterOrderDTO);
}
UpdateCallBackdate(FilterOrderDTO): Observable<any> {
  return this.http.post<any>(this.apiURL + '/api/DeliveryCancelRequest/UpdateCallBackdate', FilterOrderDTO);
}
UpadteDCStatus(FilterOrderDTO): Observable<any> {
  return this.http.post<any>(this.apiURL + '/api/DeliveryTask/UpadteDCStatus', FilterOrderDTO);
}
getOrderHistory(OrderId): Observable<any[]> {
 return this.http.get<any[]>(this.apiURL + '/api/OrderMaster/orderhistory?orderId='+ OrderId);
}
getexport(): Observable<any[]> {
 return this.http.get<any[]>(this.apiURL + '/api/DeliveryCancelRequest/orderhistory');
}
getDCRExport(type,startTime,dateTime): Observable<any[]> {
 return this.http.get<any[]>(this.apiURL + '/api/DeliveryCancelRequest/GetDCRDailyReport?type='+ type +'&startTime='+ startTime + '&dateTime=' + dateTime);
}
}

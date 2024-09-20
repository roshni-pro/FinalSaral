import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }
  
  getWarehouseWisePeoples(wid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PeopleSentNotification/GetWarehouseWisePeoples?wid=' + wid);
  } 
  GetallNotificationsByOrderId(NotificationDC): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PeopleSentNotification/GetallNotificationsByOrderId',NotificationDC);
  }
  peopleSentNotificationApproved(TripPlannerConfirmedDetailId,orderId,Peopleid,status,orderStatus,Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryApp/NotifyDeliveryAPPForOrderCancled?TripPlannerConfirmedDetailId=' + TripPlannerConfirmedDetailId + '&orderId=' + orderId + '&Peopleid=' + Peopleid  + '&status=' + status  + '&orderStatus=' + orderStatus + '&Id=' + Id );
    // return this.http.get<any>(this.apiURL + '/api/PeopleSentNotification/PeopleSentNotificationApproved?Id=' + Id + '&PeopleId=' + PeopleId + '&IsNotificationApproved=' + IsNotificationApproved);    
  }
}

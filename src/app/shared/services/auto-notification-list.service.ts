import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PaginatorViewModel } from '../interface/paginator-view-model';
@Injectable({
  providedIn: 'root'
})
export class AutoNotificationListService {
  apiURL: string;
  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
   }

   
   AutoNotificationList():  Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL + '/api/AutoNotification/AutoNotificationList');
  }
  
  GetIsActiveWise(active: boolean):  Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/api/AutoNotification/GetIsActiveWise?active='+ active);
  }

  // AutoNotificationList(Take:number, Skip:number): Observable<any[]>{
  //   
  //   return this.httpClient.get<any[]>( this.apiURL + '/api/AutoNotification/AutoNotificationList?Take='+Take + '&Skip=' + Skip);
  // }
  // AutoNotificationList(vm): Observable<any[]>{
  //   
  //   return this.httpClient.get<any[]>( this.apiURL + '/api/AutoNotification/AutoNotificationListt'+vm);
  // }

}
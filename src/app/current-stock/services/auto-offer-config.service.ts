import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutoOfferConfigService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  getStoreList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/offer/GetStores');
  }
  getData(StoreId): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/StoreList?StoreId='+StoreId);
  }
  
  getUpdateList(StoreId,Discount){
    return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/UpdateStoreList?StoreId='+StoreId+'&Discount='+Discount);
  }

}

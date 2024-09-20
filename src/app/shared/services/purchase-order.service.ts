import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {


  apiURL: string;
  // PeopleAll:any;

  User: any;
  comment: string;
  apiUrl: string;
  httpClient: any;
  tradeapiURL: any;


  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

    this.tradeapiURL = environment.tradeapiURL;


  }


  Getirgrdiffrence(FromDate, ToDate): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PoReports/GrButNoIR?startDate=' + FromDate + '&endDate=' + ToDate);
  }




  GetPoForEdit(PurchaseOrderId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PurchaseOrderDetail/GetPoForEdit?PurchaseOrderId=' + PurchaseOrderId);
  }


  GetItemForEditPO(Key, WarehouseId): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/itemMaster/SearchinitemPOadd?key=' + Key + "&WarehouseId=" + WarehouseId);
  }







}




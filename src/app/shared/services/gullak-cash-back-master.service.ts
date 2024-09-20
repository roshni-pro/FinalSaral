import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GullakCashBackMasterService {

  apiURL: string;
  httpClient: any;
  tradeapiURL: any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
    this.tradeapiURL = environment.tradeapiURL;
  }

  GetAllWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/');
  }

  GetGullakCashBackList(warehouseid,CustomerTypeId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/GullakCashBack/GetGullakCashBackList?warehouseid='+ warehouseid+'&Customertype='+CustomerTypeId)
  }

  GullakCashBackStatusChange(Id, Status): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/GullakCashBack/GullakCashBackStatusChange?Id=' + Id + '&status=' + Status)
  }

  AddGullakCashBack(data){
    return this.http.post<any>(this.apiURL + '/api/GullakCashBack/GullakCashBackSave', data)
  }
}

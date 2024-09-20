import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashdealService {
  apiURL: string; 
  User: any;
  comment: string;
  apiUrl: string;
  httpClient: any;
  tradeapiURL: any;

  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
    this.tradeapiURL = environment.tradeapiURL;
  }

    GetTodayFlashDeal(WarehouseId:number,itemname:string,StartDate:any,EndDate:any):Observable<any[]> {
      
      return this.http.get<any[]>(this.apiURL + '/api/AppHomeSection/GetTodayFlashDeal?WarehouseId=' + WarehouseId + '&itemname=' + itemname + '&StartDate=' + StartDate + '&EndDate=' + EndDate);
    }
 

}

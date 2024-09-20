import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemTrendsService {

  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.tradeapiURL;
  }

  companyChartData(input: any): Observable<any[]>{
    return this.httpClient.post<any[]>(this.apiUrl +'/api/ItemTrends/ChartData', input);
  }


  itemsearch(input: any): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiUrl +'/api/TradeItem/GetItemAutoCompleteAsync?searchString='+ input);
  }


}

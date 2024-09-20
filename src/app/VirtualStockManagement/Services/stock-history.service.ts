import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { StockHistoryPageFilter, StockHistoryList } from '../Interfaces/stock-history-page-filter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockHistoryService {

  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL + '/api/StockHistory/';
  }

  getStockList(filter: StockHistoryPageFilter): Observable<StockHistoryList> {
    return this.http.post<StockHistoryList>(this.apiURL + 'GetStockList', filter);
  }


  getItemClassificationsAsync(itemList: any[]): Observable<any[]> {
    return this.http.post<any[]>(environment.apiURL + '/api/CurrentStock/GetItemClassificationsAsync', itemList);
  }


}

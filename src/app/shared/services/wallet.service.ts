import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL
  }
  getWarehouse() {
    return this.http.get(this.apiUrl + '/api/Warehouse/GetHub');
  }

  GetWalletList(StartDate, EndDate, warehouseId, skip, take) {
    return this.http.get<any>(this.apiUrl + '/api/wallet/walletListWithPaging?start=' + StartDate + '&end=' + EndDate + '&WarehouseId=' + warehouseId + '&skip=' + skip + '&take=' + take)
  }
  SearchWallet(StartDate, EndDate, warehouseId) {
    return this.http.get<any>(this.apiUrl + '/api/wallet/Search?start=' + StartDate + '&end=' + EndDate + '&WarehouseId=' + warehouseId)
  }
  GlobalSearch(keyward) {
    return this.http.get<any>(this.apiUrl + '/api/wallet/WalletListByKeyward?key=' + keyward)
  }

  // CashConversion() {
  //   return this.http.get<any>(this.apiUrl + '/api/wallet/cash')
  // }
  AddCashConversion(data) {
    return this.http.post<any>(this.apiUrl + '/api/wallet/cash', data);
  }
  GetManualName() {
    return this.http.get<any>(this.apiUrl + '/api/wallet/GetManualName');
  }
  AddWallet(data) {
    return this.http.post<any>(this.apiUrl + '/api/wallet', data);
  }
  history(CustomerId, list, page) {
    return this.http.get<any>(this.apiUrl + '/api/wallet?CustomerId=' + CustomerId + '&list=' + list + '&page=' + page)
  }
  HistoryExportData(CustomerId) {
    return this.http.get<any>(this.apiUrl + '/api/wallet/Export?CustomerId=' + CustomerId)
  }
}

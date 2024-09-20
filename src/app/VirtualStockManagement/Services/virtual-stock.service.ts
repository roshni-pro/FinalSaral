import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { VirtualStockPaginator } from '../Interfaces/VirtualStockPaginator';
import { UnsettledVirtualStockDTO } from '../Interfaces/unsettled-virtual-stock-dto';
import { SettledVirtualStockDTO } from '../Interfaces/settled-virtual-stock-dto';
import { ManualStockUpdatePagerFilter } from '../Interfaces/manual-stock-update-pager-filter';
import { StockHistoryFilterDc } from '../Interfaces/stock-history-filter-dc';

@Injectable({
  providedIn: 'root'
})
export class VirtualStockService {

  url: string;
  apiURL: string;
  // apiURl: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiURL;
    this.apiURL = environment.apiURL + '/api/StockTransaction/';
    // this.apiURl = environment.virtualStockapiURl + 'api/CurrentStock/';
  }

  saveTransaction(stockTransactionsList): Observable<any> {
    return this.http.post<any>(this.apiURL + 'ManualStockUpdateRequest', stockTransactionsList);
  }

  // GetAllStocks(warehouseId, itemMultiMRPId): Observable<any> {

  //   let stock = this.http.get<any>(this.apiURL + 'GetAllStocks?warehouseId=' + warehouseId + '&itemMultiMRPId=' + itemMultiMRPId);
  //   
  //   return stock;
  // }

  GetAllStocks(warehouseId, itemMultiMRPId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'GetAllStocks/' + warehouseId + '/' + itemMultiMRPId);
  }

  getUnsettledVirtualStocks(warehouseId, itemMultiMRPId): Observable<UnsettledVirtualStockDTO[]> {
    return this.http.get<UnsettledVirtualStockDTO[]>(this.apiURL + 'GetUnsettledVirtualStocks/' + warehouseId + '/' + itemMultiMRPId);
  }



  getTransactionList(page): Observable<any> {
    let transactionList = this.http.get<any>(this.apiURL + 'GetManualStockRequests/skip/' + page.skip + '/take/' + page.take);
    return transactionList;
  }

  getTransactionListByName(filterValue: string, warehouseId: number, creationDate, page): Observable<any> {
    if (filterValue == "") {
      filterValue = "noFilter"
    }

    let transactionList = this.http.get<any>(this.apiURL + 'GetTransactionListByName/filterValue/' + filterValue + '/warehouseId/' +
      warehouseId + '/creationDate/' + creationDate + '/skip/' + page.skip + '/take/' + page.take);
    return transactionList;
  }

  searchWarehouseItems(key, wID, type?): Observable<any> {
    return this.http.get<any>(this.apiURL + 'WHSearchinitematAdmin?key=' + key + '&warehouseid=' + wID + '&type=' + type);
  }

  StockList(Keyword, Skip, Take, warehouseId, itemMultiMRPId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'StockList?Keyword=' + Keyword + '&Skip=' + Skip + '&Take=' + Take + '&warehouseId=' + warehouseId + '&itemMultiMRPId=' + itemMultiMRPId);
  }
  getVirtuals(vs: VirtualStockPaginator): Observable<any> {

    return this.http.post<any[]>(this.apiURL + 'GetVirtuals', vs);
  }

  settledVirtualStock(vs: SettledVirtualStockDTO): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + 'SettledVirtualStock', vs);
  }

  getManualStockUpdateRequestList(filter: ManualStockUpdatePagerFilter): Observable<any> {
    return this.http.post<any>(this.apiURL + 'GetManualStockUpdateRequestList', filter);
  }


  getByTransactionId(transactionId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'GetByTransactionId/' + transactionId);
  }
  // WHSelectedinitematAdmin(wID): Observable<any> {
  //   return this.http.get<any>(this.apiURL + 'WHSelectedinitematAdmin?warehouseid=' + wID);
  // }

  getVirtualStockList(): Observable<any> {
    return this.http.get<any>(this.url + '/api/MultiStockReport/GetVirtualStockList');
  }

  getVirtualStockListByFilter(filter: StockHistoryFilterDc): Observable<any[]> {
    return this.http.post<any[]>(this.url + '/api/MultiStockReport/GetVirtualStockListByFilter', filter);
  }

  getVirtualTransactionList(ItemMultiMRPID, WarehouseId): Observable<any> {

    return this.http.get<any>(this.url + '/api/MultiStockReport/GetVirtualMultiMrpIdList?ItemMultiMRPID=' + ItemMultiMRPID + '&WarehouseId=' + WarehouseId);
  }
  getWarehousewiseList(WarehouseId): Observable<any> {

    return this.http.get<any>(this.url + '/api/MultiStockReport/GetWarehousewiseList?WarehouseId=' + WarehouseId);
  }
  SearchByItemMultiMrpId(ItemMultiMRPID, WarehouseId): Observable<any> {

    return this.http.get<any>(this.url + '/api/MultiStockReport/SearchByItemMultiMrpId?ItemMultiMRPID=' + ItemMultiMRPID + '&WarehouseId=' + WarehouseId);
  }

  getFetchDynamicStockList(warehouseId, TableName): Observable<any> {

    return this.http.get<any>(this.url + '/api/StockTransaction/FetchDynamicStock?warehouseId=' + warehouseId + '&TableName=' + TableName);
  }
  UnsettledVirtualItemList(warehouseId): Observable<any> {

    return this.http.get<any>(this.url + '/api/MultiStockReport/UnsettledVirtualItemList?warehouseId=' + warehouseId);
  }

  GetStockBatchMastersData(ItemMultiMRPId, WarehouseId): Observable<any> {
    return this.http.get<any[]>(this.url + 'api/CurrentStock/GetStockBatchMastersData?ItemMultiMRPId=' + ItemMultiMRPId + '&WarehouseId=' + WarehouseId);
  }

  GetStockBatchMastersDataNew(ItemMultiMRPId, WarehouseId, stockType): Observable<any> {
    return this.http.get<any[]>(this.url + 'api/CurrentStock/GetStockBatchMastersDataNew?ItemMultiMRPId=' + ItemMultiMRPId + '&WarehouseId=' + WarehouseId + '&stockType=' + stockType);
  }

  GetBatchMasterList(ItemMultiMRPId, WarehouseId, keyword): Observable<any> {
    return this.http.get<any[]>(this.url + 'api/CurrentStock/GetBatchMasterList?ItemMultiMRPId=' + ItemMultiMRPId + '&WarehouseId=' + WarehouseId + '&keyword=' + keyword);
  }

  getClearanceStockList(skip,take,StockId,StockType): Observable<any> {
    return this.http.get<any[]>(this.url + 'api/ClearanceStock/StockHistory?skip=' + skip + '&take=' + take + '&StockId=' + StockId+'&StockType='+StockType);
  }

  getExportHistory(stockId,stockType): Observable<any>{
    return this.http.get<any[]>(this.url + 'api/ClearanceStock/ExportStockHistory?stockId='+stockId+ '&stockType=' + stockType)
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VirtualStockPaginator } from 'app/VirtualStockManagement/Interfaces/VirtualStockPaginator';

@Injectable({
  providedIn: 'root'
})
export class CurrentStockService {

  apiURL: string;
  // apiURl: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
    //  this.apiURl = environment.virtualStockapiURl;
  }

  GetCurrentStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CurrentStock');
  }

  GetWarehousebased(warehouseId): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/CurrentStock/GetWarehousebased?WarehouseId=' + warehouseId);
  }

  GetWarehouseManualEdit(warehouseId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CurrentStock/ManualEntriesTotalExport?WarehouseId=' + warehouseId);
  }

  GetCurrentStockByWarehouse(warehouseId, pager): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CurrentStock/GetWarehousebasedV7?WarehouseId=' + warehouseId, pager);
  }

  BatchcodewiseExport(warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL +'/api/CurrentStock/BatchcodeWiseCurrentStock?warehouseid=' + warehouseId);
  }

  GetItemClassificationsAsync(itemList): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CurrentStock/GetItemClassificationsAsync', itemList);
  }

  GetItemClassificationsForExportAsync(itemList): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CurrentStock/GetItemClassificationsForExportAsync', itemList);
  }

  UpdateCurrentStock(item): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/CurrentStock/PUT', item);
  }

  ExportList(itemNumber, warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentStock/Export?ItemNumber=' + itemNumber + '&WarehouseId=' + warehouseId);
  }

  GetHistory(itemNumber, list, page, warehouseId, stockId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentStock?ItemNumber=' + itemNumber + '&list=' + list + '&page=' + page + '&WarehouseId=' + warehouseId + '&StockId=' + stockId);
  }

  export(itemNumber, warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentStock/Export?StockId=' + itemNumber + '&WarehouseId=' + warehouseId);
  }

  getItemList(detail): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentStock/WidCurrentStock?ItemNumber=' + detail.ItemNumber + '&ItemMultiMRPId=' + detail.ItemMultiMRPId + '&WarehouseId=' + detail.WarehouseId);
  }
  stockTransfer(data): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/CurrentStock/StockTransfer', data);
  }
  stockTransferNew(data): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/CurrentStock/StockTransferNew', data);
  }

  TransferToFreeStock(data): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/CurrentStock/TransferToFreeStock', data);
  }
  transferToFreeStockV1(data): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/CurrentStock/TransferToFreeStockV1', data);
  }

  getExportData(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentStock/getExportData?WarehouseId=' + WarehouseId);
  }
  ManualEntriesExport(warehouseId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CurrentStock/ManualEntriesExport?WarehouseId=' + warehouseId);
  }
  getVirtuals(vs: VirtualStockPaginator): Observable<any> {
    return this.http.post<any[]>(this.apiURL + '/api/CurrentStock/GetVirtuals', vs);
  }

  getVirtualDataForExport(vs: VirtualStockPaginator): Observable<any> {
    return this.http.post<any[]>(this.apiURL + '/api/CurrentStock/GetVirtualsExport', vs);
  }
  getCurrentStockBatchMastersData(stockId,stockType): Observable<any> {
    return this.http.get<any[]>(this.apiURL + '/api/CurrentStock/GetCurrentStockBatchMastersData?stockId='+stockId + '&stockType=' + stockType);
  }
  getStockBatchMastersData(ItemMultiMRPId,WarehouseId,stockType): Observable<any> {
    return this.http.get<any[]>(this.apiURL + '/api/CurrentStock/GetStockBatchMastersDataNew?ItemMultiMRPId='+ItemMultiMRPId + '&WarehouseId=' + WarehouseId + '&stockType=' + stockType);
  }
}

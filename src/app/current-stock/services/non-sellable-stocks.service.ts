import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NonSellableStocksService {

  apiUrl: any;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getNonSallabeStockList(payload: any): Observable<any> {
    return this.http.post<any>('http://localhost:26265/api/NonSellableStock/PostWarehouseList', payload);
  }

  GetNonSellableStockHistoryAll(ids: any): Observable<any> {
    return this.http.post<any>('http://localhost:26265/api/NonSellableStock/GetNonSellableStockHistoryAll',ids);
  }

  GetStockBatchMastersDataNew(ItemMultiMRPId: any,WarehouseId:any,stockType:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/api/CurrentStock/GetStockBatchMastersDataNew?ItemMultiMRPId='+ItemMultiMRPId+'&WarehouseId='+WarehouseId+'&stockType='+stockType);
  }
  GetDamageHistory(ItemNumber: any,list:any,page:any,WarehouseId:any,StockId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/api/damagestock/GetDamageHistory?ItemNumber='+ItemNumber+'&list='+list+'&page='+page+'&WarehouseId='+WarehouseId+'&StockId='+StockId);
  }

  GetWarehouseCustomer(whId:any,skcode:any): Observable<any> {  
    return this.http.get<any>(this.apiUrl+'/api/damagestock/GetWarehouseCustomer/'+whId+'/'+skcode);
  }

  SearchedItemList(key:any,WarehouseId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/api/damagestock/getall?key='+key+'&WarehouseId='+WarehouseId);
  }

  getNonSellableOrderList(ItemMultiMRPId:any,WarehouseId:any,stockType:any): Observable<any> {
    return this.http.get<any>('https://uat.shopkirana.in/api/CurrentStock/GetStockBatchMastersDataNew?ItemMultiMRPId=928&WarehouseId=7&stockType=D');
    return this.http.get<any>(this.apiUrl+'/api/CurrentStock/GetStockBatchMastersDataNew?ItemMultiMRPId='+ItemMultiMRPId+'&WarehouseId='+WarehouseId+'&stockType='+stockType);
  }

  createNonSellableOrderList(payload:any): Observable<any> {
    return this.http.post<any>('http://localhost:26265/api/damageorder/createDS',payload);
  }
  
}

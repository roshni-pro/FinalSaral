import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingOrderService {

  apiURL:string;

  constructor(private httpClient : HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getWarehouse(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/Warehouse');
  }

  getCity(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/City');
  }

  getOrderPendingList(pageNo:number, warehouseId:number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/OrderPending?list=50&page=' +pageNo + '&WarehouseId=' +warehouseId);
  }

  searchOrdeListrWithKey(start:any, end:any, orderId:number, skcode:any, shopName:string, mobile:string, warehouseId:number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/SearchOrder?start='+start+'&end='+end+'&OrderId='+orderId+'&Skcode='+skcode+'&ShopName='+shopName+'&Mobile='+mobile+'&WarehouseId='+warehouseId+'&status=Pending');
  }

  excelDataWithKey(start:any, end:any, orderId:number, skcode:any, shopName:string, mobile:string, warehouseId:number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/SearchOrder?type=export&start='+start+'&end='+end+'&OrderId='+orderId+'&Skcode='+skcode+'&ShopName='+shopName+'&Mobile='+mobile+'&status=Pending&WarehouseId='+warehouseId);
  }
}

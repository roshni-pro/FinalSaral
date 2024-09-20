import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClearanceStockMovementOrderService {
  apiURL: string;
  constructor(private http: HttpClient) {this.apiURL = environment.apiURL; }

  WarehouseGetByID(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
 } //old api for warehouse --simran

 
 getWarehouseCommon(): Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
}

 getAddWarehouseList(): Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/WarehouseByUser');
}

 getSearchItemsById(Warehouseid,OrderType,Key): Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/GetClearanceOrderTypeItems?Warehouseid='+Warehouseid+'&OrderType='+OrderType+'&Key='+Key);
}
 
getBatchCodeByMrp(ItemMultiMRPId,WarehouseId,OrderType): Observable<any[]>{
  return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/GetClearanceOrderItemBatchs?ItemMultiMRPId='+ItemMultiMRPId+'&WarehouseId='+WarehouseId+'&OrderType='+OrderType);
}

addClearanceNonSellableOrder(body:any): Observable<any>{
  debugger
  return this.http.post<any>(this.apiURL + '/api/ClearanceNonSaleable/AddClearanceNonSellableOrder',body);
}

getClearanceStockMovementOrderList(payload:any): Observable<any[]>{
  return this.http.post<any[]>(this.apiURL + '/api/ClearanceNonSaleable/GetClearanceStockMovementOrderList',payload); 
}
getCleNonSaleableMovementOrderDetails(Id): Observable<any[]>{
  
  return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/GetCleNonSaleableMovementOrderDetails?Id='+Id); 
}

updateClearanceNonOrderStatus( id , Status,  comment): Observable<any>{
  return this.http.get<any>(this.apiURL + '/api/ClearanceNonSaleable/UpdateClearanceNonSellableOrderStatus?id='+id+'&Status='+Status+'&comment='+comment); 
}

updateCleNonSaleableMovementOrderQuantity(OrderMasterId,Quantity,OrderDetailId): Observable<any>{

  return this.http.get<any>(this.apiURL + '/api/ClearanceNonSaleable/UpdateCleNonSaleableMovementOrderQuantity?OrderMasterId='+OrderMasterId+'&Quantity='+Quantity+'&OrderDetailId='+OrderDetailId); 
}
AvailableItemForClNSOrders(WarehouseId,skip,take){
  return this.http.get<any>(this.apiURL + '/api/Clearance/AvailableItemForClNSOrder?WarehouseId='+WarehouseId+'&skip='+skip+'&take='+take); 

}

getBuyerList(WarehouseId,StockType): Observable<any>{
  return this.http.get<any>(this.apiURL + '/api/ClearanceNonSaleable/BuyerNameListByWhid?WarehouseId='+WarehouseId+'&StockType='+StockType); 
}

getItemsbyBuyer(Buyerid,WarehouseId,OrderType): Observable<any>{
  return this.http.get<any>(this.apiURL + '/api/ClearanceNonSaleable/GetClearanceItemListByBuyerId?Buyerid='+Buyerid+'&WarehouseId='+WarehouseId+'&OrderType='+OrderType); 
}

getExportdata(Data): Observable<any>{
  return this.http.post<any>(this.apiURL + '/api/ClearanceNonSaleable/GetClearanceStockMovementOrderListExport',Data); 
  //http://localhost:26265/api/ClearanceNonSaleable/GetClearanceStockMovementOrderListExport
}

}

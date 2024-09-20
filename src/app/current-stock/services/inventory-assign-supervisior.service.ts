import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryAssignSupervisiorService {
  apiUrl: any;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  //-------------------------------------Inventory Supervisor services --Start------------------------------------------

  getWarehouseList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/Warehouse');
  }

  getWarehouseListNew(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/DeliveyMapping/GetWarehouseIsCommon');
  }

  getSuperVisiorListbyWareId(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/InventoryCycle/getAllSupervisor?warehouseId=' + id);
  }

  getWhSuperVisoryCycleDays(whId: number, startDate: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/InventoryCycle/GetWhSupervisorInventoryCycleDays?warehouseId=' + whId + '&startDate=' + startDate);
  }

  savedSuperVisorDay(whId: number, startDate: any, selPeopleId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/InventoryCycle/AssignSupervisorDay?WarehouseId=' + whId + '&AssignDate=' + startDate, selPeopleId);
  }

  //-------------------------------------Inventory Supervisor services --End------------------------------------------



  //-------------------------------------Inventory Cycle services --Start---------------------------------------------

  getAssignWarehouseList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/BuyerDashboard/GetAllActiveWarehouse');
  }
  GetgetInventoryCycleSearchListPagination(Warehouseid: number, skip: number, take: number, Date: any) {
    return this.http.get<any>(this.apiUrl + 'api/InventoryCycle/GetInventWithPaging?Warehouseid=' + Warehouseid + '&skip=' + skip + '&take=' + take + '&Date=' + Date);
  }
  //-------------------------------------Inventory Cycle services --End-----------------------------------------------



  //-------------------------------------Movement Stock Request --Start-----------------------------------------------

  getMovementStockForWarehouseList(movementStockObj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/damagestock/GetMovementStockForWarehouse', movementStockObj);
  }

  whMovementRequestProcess(reqId: number, status: any, comment: any,stockType): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/damagestock/WarehouseMovementReqestProcess?requestId=' + reqId + '&Status=' + status + '&comment=' + comment + '&stockType=' + stockType);
  }

  getMovementStockForHQList(movementStockObj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/damagestock/GetMovementStockForHQ', movementStockObj);
  }

  hQMovementRequestProcess(reqId: number, status: any, comment: any,stockType): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/damagestock/HQMovementReqestProcess?requestId=' + reqId + '&Status=' + status + '&comment=' + comment + '&stockType=' + stockType);
  }

  //-------------------------------------Movement Stock Request --End-------------------------------------------------


  searchStockList(payload): Observable<any> {
    return this.http.post<any>(this.apiUrl+ 'api/NonSellable/GetNonSellableAndClearanceStockList', payload);
  }

  exportStockList(payload): Observable<any> {
    return this.http.post<any>(this.apiUrl+ 'api/NonSellable/ExportNonSellableAndClearanceStkList',payload);
  }

  TransferBatchwiseItemWithQty(payload): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/NonSellable/TransferBatchwiseItemWithQty', payload);
  }

  BatchwiseItemWithQty(stockId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/NonSellable/BatchwiseItemWithQty?stockId=' + stockId);
  }

  openInventoryQty(multiMrpId: number,warId:number,stockType:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/CurrentStock/GetStockBatchMastersDataNew?ItemMultiMRPId='+ multiMrpId + '&WarehouseId='+ warId + '&stockType=' +stockType);
  }

  GetNonSellStkClearanceBrand(payload): Observable<any> {
    //debugger;
    return this.http.post<any>(this.apiUrl + 'api/NonSellable/GetNonSellStkClearanceBrand', payload);
  }
  getAllNonRevenueSettelmentOrders(Payload:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/NonRevenue/GetAllNonRevenueSettelmentOrders', Payload)
  }

  // http://localhost:26265//api/StockHistory/GetStockList
}

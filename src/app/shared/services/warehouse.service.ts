import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  

  GetAllWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse');
  } 
  GetAllWarehouseForCityWiseWh(): Observable<any[]> {
    // return this.http.get<any[]>(this.apiURL + '/api/Warehouse');
    return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
  } 

  GetWarehouseNew(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
  } 

  City():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City');
  }

  getWarehouseCommon(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
  }

  GetAllWarehouseV1(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/WhForWarkingCapital');
  }
  AllWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetAllWarehousekpp');
  }
  GetWarehouses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
    // return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
  } //old api for warehouses --simran
  GetWarehousesForEWayBill(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
  } //old api for warehouses --simran

  


  getSpecificWarehouses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/getSpecificWarehouses');
  }

  async getSpecificWarehouses1() {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/getSpecificWarehouses');
  }
  GetWOKPP(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'api/Warehouse/GetWarehouseWOKPP');
  }

  GetAllTaxGroup(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TaxGroup');
  }

  GetAllCityId(cityid): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetWarehouseCity/?cityid=' + cityid);
  }
  GetAllCityIdKPP(cityid): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetWarehouse/?cityid=' + cityid);
  }
  GetWarehouse(): Observable<any[]> {
    return this.http.put<any[]>(this.apiURL + '/api/Warehouse', null);
  }

  GetByID(ID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse?ID=' + ID);
  }
  addWarehouse(warehouse): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Warehouse', warehouse);
  }

  UpdateWarehouse(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Warehouse', details);
  }
  DeleteWarehouse(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Warehouse?id=' + ID);
  }
  DeleteWarehouseId(WarehouseId): Observable<any> {
    return this.http.delete<any>(this.apiURL + 'api/Warehouse/?Id=' + WarehouseId);
  }

  WarehouseManagerName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetActiveAgentsForWarehouse');
  }
  GetAllWarehouseWithoutKpp(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetWarehouseWOKPP');
  }

  GetAllRegion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Regions');
  }

  ChangeWarehouseID(wid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/ChangeWarehouseID/?wid=' + wid);
  }

  GetMultipleWarehouses(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetMultipleWarehouses');
  }

  GetWarehouseAssign(): Observable<any> {
    // return this.http.get<any>(this.apiURL + '/api/Warehouse/OnAssign');
    return this.http.get<any>(this.apiURL + 'api/BuyerDashboard/GetAllActiveWarehouse');
    // api/BuyerDashboard/GetAllActiveWarehouse
  }
  GetCustomizedPrepaidOrder(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomizedPrepaidOrder/GetCustomizedPrepaidOrder');
  }
  AddCustomizedPrepaidOrders(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomizedPrepaidOrder/AddCustomizedPrepaidOrders', data);
  }
  GetCustomizedOrderDelete(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomizedPrepaidOrder/GetCustomizedOrderDelete', data);
  }

  ADDCustomizedOrder(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomizedPrepaidOrder/ADDCustomizedOrder', data);
  }
  GetCompanyWheelConfigurations(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomizedPrepaidOrder/GetCompanyWheelConfigurations');
  }
  updateCompanyWheelConfigurations(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomizedPrepaidOrder/updateCompanyWheelConfigurations', data);
  }
  updateWheelPointWeightPercentConfigs(WheelPointWeightPercentConfig): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomizedPrepaidOrder/updateWheelPointWeightPercentConfigs', WheelPointWeightPercentConfig);
  }
  updateMaxWalletPointsSet(WheelPointupdate): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerWalletPoint/updateMaxWalletPointsSet', WheelPointupdate);
  }
  getCompanyDetails(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomerWalletPoint/getCompanyDetails');
  }
  GetUpComingFlashDealImages(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Companys/GetUpComingFlashDealImage');
  }
  UpdateUpComingFlashDealImage(FlashDealImage): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Companys/UpdateUpComingFlashDealImage', FlashDealImage);
  }
  RemoveUpComingFlashDealImage(FlashDealImage): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Companys/RemoveUpComingFlashDealImage', FlashDealImage);
  }
  GetWarehoueAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/GetWarehoueAll');
    // return this.http.get<any>(this.apiURL + '/api/InventoryCycle/GetAllInventoryWarehouse');
  }
  updateWarehoueInventry(listdata): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/InventoryCycle/updateWarehoueInventry', listdata);
  }
  StopWarehoueInventry(listdata): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/InventoryCycle/StopWarehoueInventry', listdata);
  }
  DeleteTodayInventoryCycleData(WarehouseId):Observable<any>{
     return this.http.get<any>(this.apiURL + '/api/InventoryCycle/DeleteTodayInventoryCycleData?WarehouseId='+ WarehouseId);
  }
  getInventorycyclehistory(WarehoueId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/getInventorycyclehistory/?WarehoueId=' + WarehoueId);
  }
  getWarehousePVHistory(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/getWarehousePVHistory?WarehouseId=' + WarehouseId);
  }
  AddStoreMinOrder(data): Observable<any> {
    debugger
    return this.http.post<any>(this.apiURL + '/api/CustomizedPrepaidOrder/AddStoreMinOrder', data);
  }
  StoreMinOrderList(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomizedPrepaidOrder/GetStoreMinOrderList');
  }
  UpdateStoreMinOrderList(rowData):Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/CustomizedPrepaidOrder/UpdateStoreMinOrderList',rowData);
  }

  GetAllStore(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CustomizedPrepaidOrder/GetAllStore');
  }
  GetActiveWarehouses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/BuyerDashboard/GetAllActiveWarehouse');
  }
  GetActiveWarehousescitys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetActiveWarehouseCity');
  }
  GetWarehouseByCity(cityid: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetWarehouseByCity/?cityid=' + cityid);
  }
  warehouseDashboardById(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CancellationReport/WarehouseDashboardById?WarehouseId=' + WarehouseId);
  }
  warehouseDboyReport(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CancellationReport/WarehouseDboyReport?WarehouseId=' + WarehouseId);
  }
  warehouseSaleManReport(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CancellationReport/WarehouseSaleManReport?WarehouseId=' + WarehouseId);
  }
  insertClearanceNonSaleablePrepareItem(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/InsertClearanceNonSaleablePrepareItem?WarehouseId=' + WarehouseId);
  }
  
  UpdateWarehoueAction(WarehouseId,Type,Flag): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/UpdateWarehoueAction?WarehouseId='+ WarehouseId+'&Type='+ Type+'&Flag='+Flag);
  }
  ShowButton():Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/GetAllInventoryWarehouse' );
  }

  AvailableItemForClNSOrders(WarehouseId,skip,take){
    return this.http.get<any>(this.apiURL + '/api/Clearance/AvailableItemForClNSOrder?WarehouseId='+WarehouseId+'&skip='+skip+'&take='+take); 
  
  }
  // startPVwarehouseInventory(WarehouseId): Observable<any> {
  //   return this.http.get<any>(this.apiURL + '/api/InventoryCycle/StartPVwarehouseInventory?WarehouseId='+WarehouseId);
  // }
  startPVwarehouseInventory(warehouesDC): Observable<any> {
    debugger;
    return this.http.post<any>(this.apiURL + '/api/InventoryCycle/StartPVwarehouseInventory',warehouesDC);
  }
  stopPVwarehouseInventory(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/StopPVwarehouseInventory?WarehouseId='+WarehouseId);
  }
  getWarehouseList(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/GetWarehouseList');
  }
}


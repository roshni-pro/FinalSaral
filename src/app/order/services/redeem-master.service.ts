import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedeemMasterService {
  
  apiURL: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getZone(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL + '/api/inventory/GetZone');
  }

  getRegionWithZoneId(zoneId:number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/inventory/GetRegion?zoneid=' +zoneId);
  }

  getWareHouseWithRegionId(regionId:number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/inventory/GetWarehouse?regionId=' +regionId);
  }

  getWareHouseBasedData(pageNo:number ,wareHouseId:number) :Observable<any[]>{
    //return this.httpClient.get<any[]>(this.apiURL + 'api/OrderMastersAPI/Warehousebased?list=30&page=1&WarehouseId=' +wareHouseId);
    return this.httpClient.get<any[]>(this.apiURL + 'api/OrderMastersAPI/Warehousebased?list=30&page=' +pageNo + '&WarehouseId=' +wareHouseId);
  }

  searchData(status:string, id:number) :Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/OrderMastersAPI/getsearchdata?Status=' +status + '&hubid=' +id);
  }

  getAllDeliveryBoy(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/Peoples/GetAll');
  }

  updateCancelOrderId(id:number): Observable<any[]>{
    return this.httpClient.put<any[]>(this.apiURL + '/api/OrderMastersAPI/cancel?cancel=cl&id=' +id, null);
  }

  updateOrderStatus(data:any): Observable<any[]>{
    return this.httpClient.put<any[]>(this.apiURL + 'api/OrderMastersAPI/dreamitem', data);
  }

  saveCommentOrderId(data:any): Observable<any[]>{
    return this.httpClient.put<any[]>(this.apiURL + 'api/OrderMastersAPI/CommentBox', data);
  }

  //Order-sattle
  getWarehouses(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/Warehouse');
  }

  getDeliveryBoybyWarehouseID(warehouseID): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/DeliveryOrder?WarehouseId=' +warehouseID )
  }

  // https://uat.shopkirana.in/api/OrderDispatchedMaster/klop?list=40&page=1&DBoyNo=all&datefrom=01/01/2022%2012:00%20AM&dateto=02/01/2022%2011:59%20PM&OrderId=123&DeliveryIssuanceIdOrderDeliveryMaster=asd&WarehouseId=53
  getOrderDispatchedMasterResults(DBoyMobileNo, datefrom, dateto, OrderId, DeliveryIssuanceIdOrderDeliveryMaster, WarehouseId){
    // DBoyMobileNo - if(no)=> select 'all' by default
    return this.httpClient.get<any>(this.apiURL + 'api/OrderDispatchedMaster/klop?list=40&page=1&DBoyNo='+DBoyMobileNo+'&datefrom='+datefrom+' 12:00 AM'+'&dateto='+dateto+' 11:59 PM'+'&OrderId='+OrderId+'&DeliveryIssuanceIdOrderDeliveryMaster='+DeliveryIssuanceIdOrderDeliveryMaster+'&WarehouseId='+WarehouseId)
  }

  // https://uat.shopkirana.in/api/OrderDispatchedMaster?list=40&page=1&DBoyNo=all&datefrom=&dateto=&OrderId=undefined&WarehouseId=53
  OrderDispatchedMaster(DboyNumber, OrderId, WarehouseId){
    return this.httpClient.get<any>(this.apiURL + 'api/OrderDispatchedMaster?list=40&page=1&DBoyNo='+DboyNumber+ '&datefrom='+'&dateto='+'&OrderId='+OrderId+'&WarehouseId='+WarehouseId)
  }

  // https://uat.shopkirana.in/api/OrderDispatchedMasterFinal/Multisettle
  selectedMultiSattle(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/api/OrderDispatchedMasterFinal/Multisettle', payload);
  }
  
  // https://uat.shopkirana.in/api/OrderDispatchedMasterFinal
  settle(payload): Observable<any>{
    return this.httpClient.post(this.apiURL + '/api/OrderDispatchedMasterFinal', payload)
  }

}

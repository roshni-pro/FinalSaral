import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetAllCity(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetActiveWarehouseCity');
  } //old api for city --simran



  getAllCityNew(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetCityIsCommon');
  }


  getActiveWarehouseCityDelivery(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetActiveWarehouseCityDelivery');
  }
 //new api for warehouse and city --simran\
 getCommonCity(): Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetCityIsCommon');
}


  GetAllCitylist(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City');
  }
  GetRegion(id): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/inventory/GetRegion?zoneid=' + id);
  }
  // http://localhost:26265/api/CustomerRefferalConfig/GetCustReffConfigList?ReferralType=2&cityID=0
  GetCustomerRefferalConfig(ReferralType, cityID): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CustomerRefferalConfig/GetCustReffConfigList?ReferralType=' + ReferralType + '&cityID=' + cityID);
  }

  checkCustomerRefferalConfig(payload): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerRefferalConfig/CheckCustReffConfig', payload);
  }

  DeleteCustomerRefferalConfig(deleteID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/CustomerRefferalConfig/RemoveCustReffConfig?deleteID=' + deleteID);
  }
  // http://localhost:26265/api/CustomerRefferalConfig/SetCustReffConfigActiveStatus?IsActive=false&id=10013

  SetCustReffConfigActiveStatus(Obj): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerRefferalConfig/SetCustReffConfigActiveStatus',Obj);
  }

  // http://localhost:26265/api/CustomerRefferalConfig/GetCustRefStatus
  GetCustomerRefstatus(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CustomerRefferalConfig/GetCustRefStatus');
  }

  SubmitBulkCustReferralData(payload): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerRefferalConfig/SubmitBulkCustReferralData', payload);
  }













  // GetWarehouse(id): Observable<any> {

  //   return this.http.post<any>(this.apiURL + '/api/Warehouse/GetWarehouseCitiesOnOrder'+  id,'');
  // }
  GetWarehouse(id): Observable<any[]> {

    return this.http.post<any[]>(this.apiURL + '/api/Warehouse/GetWarehouseCitiesOnOrder', id);
  }
  GetItems(id): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CurrentStock/GetWarehouseStockItem?WarehouseId=' + id);
  }

  GetDamageData(id, page, take, status): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/DamageOrderMaster/PostDamageOrderbyStatus?list=' + take + '&page=' + page + '&WarehouseId=' + id + '&Orderstatus=' + status, '');
  }
  GetOrderData(id, page, take, status): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/OrderMaster/GetOrderAdvanceSearchMongo' + take + '&page=' + page + '&WarehouseId=' + id + '&Orderstatus=' + status, '');
  }

  GetSearch(data): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/OrderMaster/GetOrderAdvanceSearchMongo', data);
  }

  GetDamageShowAllData(id, page, take): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/DamageOrderMaster/PostDamageOrder?list=' + take + '&page=' + page + '&WarehouseId=' + id, '');
  }
  GetStockData(id): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/damagestock/postList?WarehouseId=' + id, '');
  }

  GetSearchData(id): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/CurrentNetStock?WarehouseId=' + id);
  }
  GetDamageStockData(data): Observable<any> {
    debugger
    return this.http.post<any>(this.apiURL + '/api/damagestock/filtre', data);
  }

  GetHub(id): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/inventory/GetWarehouse?regionId=' + id);
  }

  GetAllZone(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/inventory/GetZone');
  }
  GetAllCityName(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/getSpecificCitiesforuser');
  }
  GetAllWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse');
  }
  GetAllWarehouseName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse');
  }
  cityget(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City/cityget');
  }

  cityForStoreMinOrder(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + "/api/BuyerForecast/GetCities");
  }

  getWarehouseByCityID(cityId:any):Observable<any[]>{
    return this.http.post<any[]>(this.apiURL + '/api/BuyerForecast/GetWarehouseMulti',cityId);
  }

  cityPost(cityListUpdated): Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/City/cityupdate', cityListUpdated);
  }


  CityGetByID(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/City//GetById?Cityid=' + id);
  }

  //   DeletePeople(id: number):Observable<any> {
  //     this.comment = "comment"
  //     return this.http.delete<any>(this.apiURL + '/api/Peoples/?PeopleID=' + id + '&&' + 'DeleteComment=' + this.comment);
  //   }
  GetByStateID(stateID: number): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/City/GetByStateID/' + stateID);
  }

  ManagerName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City/GetActiveAgentsForCity');
  }

  StateManagerName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/States');
  }

  ZoneManagerName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City/GetActiveAgentsForZone');
  }

  CountryManagerName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City/GetActiveAgentsForCountry');
  }

  addCity(item): Observable<any> {
    // console.log("test")
    // console.log(this.apiURL + '/api/City' ,cityservice)
    return this.http.post<any>(this.apiURL + '/api/City', item);
  }


  // GetByID(id: number):  Observable<any> {
  //   return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
  // }  

  UpdateCity(City): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/City/', City);
  }
  // DeleteCity(id): Observable<any> {
  //   return this.http.delete<any>(this.apiURL + '/api/City/Remove?id='+ id);
  // }

  DeleteCity(id): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/City/DeleteV7?id=' + id);
  }
  GetActiveCity(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City/GetActiveCity');
  }
  warehouseRolebased(warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Peoples/WarehouseRolebased?WarehouseId=' + warehouseId);
  }
  warehousebased(warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryBoy/WarehousebasedDeliveryBoyRole?WarehouseId=' + warehouseId);
  }
  freebies(OrderId, ItemId, WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedMaster/GetFreebiesItem?OrderId=' + OrderId + '&ParentItemId=' + ItemId + '&WarehouseId=' + WarehouseId);
  }

  searchItem(event): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DamageOrderMaster/SerachDamageOrder?key=' + event);
  }
  saveDispatchedOrder(orderId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedMaster/GetFreeItemStock?orderId=' + orderId);
  }
  OrderDispatchedDetails(data): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/OrderDispatchedDetails/V1', data);
  }

  excelWayBill(warehouseid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/freestocks/GetWarehouseFreeStock?WarehouseId=' + warehouseid);
  }
  getOtp(orderid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/GetLastOtpStatus?OrderId=' + orderid);
  }
  viewCanceledImage(orderid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryCancelledDraft/GetOrderImage?OrderId=' + orderid);
  }
  editManual(orderid, parentid, warehouseid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedMaster/GetFreebiesItem?OrderId=' + orderid + '&ParentItemId=' + parentid + '&WarehouseId=' + warehouseid);
  }
  excelWayWarehouse(warehouseid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse?id=' + warehouseid);
  }

  exportItem(id, status,OrderType,skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DamageOrderMaster/ExportDamageOrder?WarehouseId=' + id + '&Orderstatus=' + status + '&OrderType=' + OrderType +'&skip=' + skip + '&take=' + take);
  }
  exportToExcel(start, end, orderid, skcode, shopname, mobile, statusval, level, ordertype, newdata): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SearchOrder/ExportOrderMaster?type=export&start=' + start + '&end=' + end + '&OrderId=' + orderid + '&Skcode=' + skcode + '&ShopName=' + shopname + '&Mobile=' + mobile + '&status=' + statusval + '&LevelName=' + level + '&OrderType=' + ordertype, newdata);
  }
  exportSelf(start, end, data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/OrderMaster/getselforder?start=' + start + '&end=' + end, data);
  }
  exportSale(start, end, orderid, skcode, shopname, mobile, statusval, level, saledata): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SearchOrder/ExportSalesOrderMaster?type=export&start=' + start + '&end=' + end + '&OrderId=' + orderid + '&Skcode=' + skcode + '&ShopName=' + shopname + '&Mobile=' + mobile + '&status=' + statusval + '&LevelName=' + level, saledata);
  }
  getSumInvoice(orderid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/getSuminvoiceHSNCodeData?OrderId=' + orderid);
  }
  GetInvoiceAmount(amount): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/GetInvoiceAmountToWord?Amount=' + amount);
  }
  GetTCSPercent(CustomerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/GetTCSPercent?CustomerId=' + CustomerId);
  }

  GetWarehouseid(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse?id=' + id);
  }
  GetWarehouseDetail(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse');
  }
  GetOfferItem(oderid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetOfferItem?oderid=' + oderid);
  }
  GetOfferBill(oderid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetOfferBill?oderid=' + oderid);
  }
  RTDgetSuminvoiceHSNCodeData(oderid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/RTDgetSuminvoiceHSNCodeData?OrderId=' + oderid);
  }
  GetSuminvoice(OrderId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/getSuminvoiceHSNCodeData?OrderId=' + OrderId);
  }
  Getpaymentstatus(OrderId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMastersAPI/Getpaymentstatus?OrderId=' + OrderId);
  }
  CheckCustomerCritical(customerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/CheckCustomerCriticalInfo?customerId=' + customerId);
  }
  GetOrderCount(OrderId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InActiveCustOrderMaster/GetOrderCount?OrderId=' + OrderId);
  }
  GetSkFree(OrderId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/freeitem/SkFree?oderid=' + OrderId);
  }

}

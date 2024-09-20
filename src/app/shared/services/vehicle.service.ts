import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  GetAllWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/');
  }
  AddDboy(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Account/PostDBoyMaster/', data)
  }
  EditDboy(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/DBoyMaster/PostDBoyMaster/', data)
  }
  DboyActiveInactive(Id, bool): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/DboyActiveDeactiveList?Id=' + Id + '&IsActive=' + bool);
  }
  DboyIsBlocked(Id, bool) {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/DboyBlockById?Id=' + Id + '&IsBlocked=' + bool);
  }

  GetdboyList(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/GetDBoyMaster')
  }
  
  GetVehicleDetailsByDboyId(id: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/GetVehicleDetailsByDboyId?Id='+id)
  }
  
  SearchdboyList(name, status, cityid, warehousid,skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/SearchDBoyMaster?key=' + name + "&statusValue=" + status + "&cityId=" + cityid + "&warehousid=" + warehousid+"&skip="+skip +"&take="+take)
  }
  Exportdboy(SelectedWarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/ExportDBoyMaster?wid=' + SelectedWarehouseId)
  }
  UploadDboyDoc(ImageUrl) {
    return this.http.post<any>(this.apiURL + '/api/DBoyMaster/DocumentImageUpload', ImageUrl);
  }
  GetdboyListPaging(skip, take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/GetDBoyMasterPagination?skip=' + skip + '&take=' + take)
  }
  AgentList(CityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/Activeagent?CityId=' + CityId);
  }
  GetdboyListById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DBoyMaster/GetDBoyMasterById?Id=' + Id)
  }
  GetdamageListById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/api/inventory/GetRegion?zoneid=' + Id)
  }
  GetStockListById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/damagestock/postList?WarehouseId=' + Id)
  }
  GetdamageStockListById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentStock/GetWarehouseStockItem?WarehouseId=' + Id)
  }
  GetcurrentstockListById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentNetStock?WarehouseId=' + Id)
  }
  //==============driver master service===============

  AddDriver(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/DriverMaster/PostDriverMaster/', data)
  }

  DriverActiveInactive(Id, bool): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DriverMaster/DriverActiveDeactiveList?Id=' + Id + '&IsActive=' + bool);
  }
  DriverIsBlocked(Id, bool) {
    return this.http.get<any>(this.apiURL + '/api/DriverMaster/DriverBlockById?Id=' + Id + '&IsBlocked=' + bool);
  }
  GetDriverList(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DriverMaster/GetDriverMaster')
  } 
  SearchDriverList(name, status, cityid, warehousid,skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DriverMaster/SearchDriverMaster?key=' + name + "&statusValue=" + status + "&cityId=" + cityid + "&warehousid=" + warehousid +"&skip="+skip +"&take="+take)
  }
  ExportDriver(wid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DriverMaster/ExportDriverMaster?wid=' + wid)
  }
  UploadDriverDoc(ImageUrl) {
    return this.http.post<any>(this.apiURL + '/api/DriverMaster/DocumentImageUpload', ImageUrl);
  }
  GetdriverListPaging(skip, take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DriverMaster/GetDriverMasterPagination?skip=' + skip + '&take=' + take)
  }
}

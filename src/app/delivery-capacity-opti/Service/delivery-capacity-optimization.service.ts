import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AnyAaaaRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class DeliveryCapacityOptimizationService {
  apiURL:string
  constructor(private http:HttpClient) {
    this.apiURL = environment.apiURL;
   }
   
  GetWareHouse(): Observable<any> 
  {
    return this.http.get(this.apiURL+'api/Warehouse/GetWarehouseWOKPP')
  }

  GetWareHouseNew(): Observable<any> 
  {
    return this.http.get(this.apiURL+'api/DeliveyMapping/GetWarehouseIsCommon')
  }


  extraVehicleRequired(payload): Observable<any> 
  {
    return this.http.post(this.apiURL+'api/WarehouseUtilization/UpdateVehicleCount ',payload)
  }
  GetWarehouseUtilizationList(payload:any):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'api/WarehouseUtilization/GetWarehouseUtilizationList',payload);  // http://localhost:26265/api/DeliveryCapacity/GetData
  } 
  
  ExportWarehouseUtilizationList(payload:any):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'api/WarehouseUtilization/ExportWarehouseUtilizationList',payload); 
  } 
  // http://localhost:26265/api/WarehouseUtilization/ExportWarehouseUtilizationList
  
  PostDefaultDeliveryCapacity(Data:any):Observable<any>
  {   
    return this.http.post(this.apiURL+'api/DeliveryCapacity/DefaultDeliveryCapacity',Data)  //api/DeliveryCapacity/DefaultDeliveryCapacity
  }

  PostUpdatetDeliveryCapacity(Data:any):Observable<any>
  {
    return this.http.post(this.apiURL+'api/DeliveryCapacity/UpdatetDeliveryCapacity',Data)  //api/DeliveryCapacity/UpdatetDeliveryCapacity
  } 

  GetHolidayWorkingList(warehouseid:any,year): Observable<any>{
    return this.http.get<any>(this.apiURL+'api/DeliveryCapacity/HolidayWorkingList?warehouseid='+warehouseid+ '&year=' + year)
  }

  SelectedData(Data): Observable<any>{
    return this.http.post<any>(this.apiURL+'api/DeliveryCapacity/SelectedDefaultCapacity',Data) // http://localhost:26265/api/DeliveryCapacity/SelectedData?warehouseId=7
  }

  selectUpdtData(Data): Observable<any>{
    return this.http.post<any>(this.apiURL+'api/DeliveryCapacity/SelectedUpdatedCapacity',Data) 
  }
  exportPreviousMonthData(warehouseId,createdDate,enddate)
  {
     return this.http.get(this.apiURL+'api/DeliveryCapacity/ExportPreviousMonthData?warehouseid='+warehouseId+'&createdDate='+ createdDate+'&EndDate='+enddate)
  }
  GetHistroyData(warehouseId)
  {
    return this.http.get(this.apiURL+'api/DeliveryCapacity/GetHistroyDataDeliveryCapacity?warehouseId='+warehouseId)
  }
}
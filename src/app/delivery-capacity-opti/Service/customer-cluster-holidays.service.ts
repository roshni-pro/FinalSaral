import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {clusterHolidayDc} from '../Components/cluster-holidays/cluster-holidays.component';
@Injectable({
  providedIn: 'root'
})
export class CustomerClusterHolidaysService {
  apiURL:string
  constructor(private http:HttpClient){
    this.apiURL = environment.apiURL;
  }
   
  GetHolidayWorkingList(warehouseid:number,clusterid:number): Observable<any>{
    return this.http.get<any>(this.apiURL+'api/ClusterHoliday/getClusterHoliday?warehouseid='+warehouseid+'&clusterId='+clusterid)
  }

  ClusterHolidayHistoryData(ClusterId :number) :Observable<any>
  {
    return this.http.get<any>(this.apiURL+'api/DeliveryCapacity/ClusterHolidayHistoryData?ClusterId='+ClusterId)
  }

  CustomerHolidayHistoryData(ClusterId :number, CustomerId :number) :Observable<any>
  {
    return this.http.get<any>(this.apiURL+'api/DeliveryCapacity/CustomerHolidayHistoryData?ClusterId='+ClusterId+ '&CustomerId='+CustomerId)
  }

  PostclusterHolidayList(DC:clusterHolidayDc){
    return this.http.post<any>(this.apiURL+'api/ClusterHoliday/AddClusterHoliday',DC)
  }

  ClusterCustomersList(payload){
    return this.http.post<any>(this.apiURL+'api/ClusterHoliday/GetCustomerWithST',payload)
  }

  getCustomersList(ware:number,clust:number,payload){
    debugger
    return this.http.post<any>(this.apiURL+'api/ClusterHoliday/GetCustomer?warehouseid='+ware+'&clusterid='+clust,payload)
  }
 
  UpdateCustomerHoliday(Data:any){
    return this.http.post<any>(this.apiURL+'api/ClusterHoliday/UpdateCustomerHoliday',Data)
  }

  UploadCustomers(wh:any,cl:any){
    var obj={};
    return this.http.post<any>(this.apiURL+'api/ClusterHoliday/HolidayListUploder?warehouseid='+wh+'&clusterId='+cl,obj)
  }
  CustomerHolidayHistroy(ClusterId)
  {
    return this.http.get(this.apiURL+'api/DeliveryCapacity/CustomerHolidayHistoryData?ClusterId='+ClusterId)
  }
  GetPriorityWarehouseStore(payload:any){
    return this.http.post<any>(this.apiURL+'api/DeliveryCapacity/GetPriorityWarehouseStore',payload)
  }
  AddnewPriority(payload:any){
    return this.http.post<any>(this.apiURL+'api/DeliveryCapacity/AddnewPriority',payload)
  }
  AddnewWhPriority(payload:any){
    return this.http.post<any>(this.apiURL+'api/DeliveryCapacity/AddnewWhPriority',payload)
  }
  ActiveInactivePriorityStoreIdWies(id:any,s:any){
    return this.http.get<any>(this.apiURL+'api/DeliveryCapacity/ActiveInactivePriorityStoreIdWies?Id='+id+'&Status='+s);
  }
  ChangeEditPriority(payload:any){
    return this.http.post<any>(this.apiURL+'api/DeliveryCapacity/ChangeEditPriority',payload)
  }
  GetWarehoseCOnfig(ware:any){
    return this.http.get<any>(this.apiURL+'api/DeliveryCapacity/GetWarehoseCOnfig?warehouse=' +ware)
  }
}

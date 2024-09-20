import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OutBoundMappingMaster} from './../interfaces/outbounddeliverymaster'

@Injectable({
  providedIn: 'root'
})
export class OutBoundDeliveryMasterService {

  apiURL: string;
  User:any;


                                         
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  Add(data:OutBoundMappingMaster):Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/VehicleMaster/AddOutBoundDeliveryMapping',data);
  }

  Edit(data:OutBoundMappingMaster):Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/VehicleMaster/EditOutBoundDeliveryMapping',data);
  }

  getMappingList(skip:number,take:number,warehouesid:number):Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/GetOutBoundMappingList?skip=' +skip +'&take=' + take +'&warehouesid='+warehouesid);
  }
  getOutbyId(Id:number){
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/GetOutBoundDeliveryDetails?Id=' +Id);

  }
  
  getVehicleRegistrationNoLIst(CityId:number){
    return this.http.get<any[]>(this.apiURL + '/api/VehicleMaster/VehicleRegistrationNoLIst?CityId=' +CityId);

    }

    getDriverList(CityId:number){
        return this.http.get<any[]>(this.apiURL + '/api/VehicleMaster/DriverList?CityId=' +CityId);
    
        }

        getDboyList(CityId:number){
            return this.http.get<any[]>(this.apiURL + '/api/VehicleMaster/getDboyList?CityId=' +CityId);
        
            }

  getOutBoundDetailsById(warehouesid:number,clusterId : number,AgentId : number,skip:number,take:number):Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/GetOutBoundDetailsById?WarehouseId=' + warehouesid + '&ClusterId=' + clusterId + '&AgentId=' + AgentId + '&Skip=' +skip +'&take=' + take);
  }
  postActivety(Id,bool){
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/MappingActiveDeactiveList?Id=' +Id +'&IsActive='+ bool);
  }
}




// api/VehicleMaster/VehicleRegistrationNoLIst?CityId=1
// api/VehicleMaster/DriverList?CityId=1
// api/VehicleMaster/getDboyList?CityId=1

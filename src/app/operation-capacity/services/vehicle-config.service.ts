import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleConfigService {
  private apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL + '/api/VehicleType/';
  }

  getVehicleTypeList(WarehouseId){
    return this.httpClient.get<any[]>(this.apiUrl + 'GetVehicleTypeList/?WarehouseId=' + WarehouseId);
  }


  insertVechicleAttandance(Payload){
    return this.httpClient.post<any[]>(this.apiUrl + 'InsertVechicleAttandance',Payload);
  }
  editVechicleTypeList(Payload){
    debugger
    return this.httpClient.post<any[]>(this.apiUrl + 'UpdateVehicleType',Payload);
  }

  deleteVechicleTypeList(Id:number){
    return this.httpClient.get<any[]>(this.apiUrl + 'DeleteVechicleTypeList/?Id='+Id);
  }
  // http://localhost:26265/api/VehicleType/DeleteVechicleTypeList?Id=21    
  // http://localhost:26265/api/VehicleType/DeleteVechicleTypeList?Id=21     (Get)
  // http://localhost:26265/api/VehicleType/UpdateVehicleType   (POst)
  // http://localhost:26265/api/VehicleType/InsertVechicleAttandance     (Post)                                                       
  
}

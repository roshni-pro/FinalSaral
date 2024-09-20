import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryProvisioningService {
  apiURL:string
  constructor(private http:HttpClient) { 
    this.apiURL = environment.apiURL;
  }
  GetBrandList():Observable<any>{
    return this.http.get<any>(this.apiURL+'api/JITLiveItem/GetBrandListByWarehouseId')
  }
  GetAllBrandList():Observable<any>{
    return this.http.get<any>(this.apiURL+'api/SubsubCategory/GetAllBrandList')
  }

  GetProvisionData(porvisioningModel:any):Observable<any>{
    return this.http.post<any>(this.apiURL+'api/InventoryProvisioning/GetProvisioningData',porvisioningModel)
  }

  GetProvisionGraphData(porvisioningModel:any):Observable<any>{
    return this.http.post<any>(this.apiURL+'api/InventoryProvisioning/InventoryProvisioningGraphAllData',porvisioningModel)
  }
}

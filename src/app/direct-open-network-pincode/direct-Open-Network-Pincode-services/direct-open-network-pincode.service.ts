import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectOpenNetworkPincodeService {

  apiURL:string;

  constructor(private httpClient : HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getWarehouseList(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + '/api/Warehouse/GetHub');
  }

  getClusterbyWarehouseID(WarehouseID): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + '/api/cluster/GetClusterWiseWareHouse?warehouseid='+WarehouseID);
  }

  GetPincodeList(): Observable<any>{
    return this.httpClient.get<any>(this.apiURL + "/api/DON_PinCode/GetPincodeList");
  }

  // http://localhost:26265/api/DONPinCode/SubmitPincode
  submitPincodeList(body): Observable<any>{
    return this.httpClient.post<any>(this.apiURL + "/api/DON_PinCode/SubmitPincode", body);
  }

  // http://localhost:26265/api/DONPinCode/RemovePincode?deleteID=29
  deletePincode(deleteID): Observable<any>{
    return this.httpClient.delete<any>(this.apiURL + "/api/DON_PinCode/RemovePincode?deleteID="+deleteID);
  }

}

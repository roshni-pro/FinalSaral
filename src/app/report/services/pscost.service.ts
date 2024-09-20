import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PscostService {
  UatApi:any
  apiURL:any
  constructor(private http: HttpClient) { 
    this.UatApi = environment.apiURL;
  }
  getWarehouses(): Observable<any>
  {
    return this.http.get<any>(this.UatApi +'/api/Warehouse/GetAllWarehouse');
  }
  getPSCostPO(payload): Observable<any>
  {
    debugger
  return this.http.post<any>(this.UatApi+'/api/PurchaseOrderMaster/PSCostPO',payload)  
}
  getPSCostInternal(payload)
  {
     return this.http.post<any>(this.UatApi+'api/PurchaseOrderMaster/InternalPsCost',payload)
   //return this.http.post<any>(this.UatApi+'/api/PurchaseOrderMaster/InternalPsCost',payload)
  }
}


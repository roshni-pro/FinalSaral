import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class DeliveryBoyService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
                                         
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
   
  GetAllDeliveryBoy():  Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/DeliveryBoy');
  }
  // GetAllTaxGroup():  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/DeliveryBoy');
  // }
  GetByID(ID):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryBoy/GetByID?id='+ID);
  }
  addDeliveryBoy(dboy): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/DeliveryBoy', dboy);
  }

  UpdateDeliveryBoy(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/DeliveryBoy' , details);
  }
  DeleteDeliveryBoy(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/DeliveryBoy?id='+ ID);
  }
  getAjent():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Agents');
  }
  getWarehousebyId(WarehouseId):  Observable<any[]> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryOrder?Warehouseid=' + WarehouseId);
  }
}
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
   
  GetAllVehicles():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Vehicles');
  }
  // GetAllTaxGroup():  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/Vehicles');
  // }
  GetByID(ID):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Vehicles/VehicleNumber?VehicleNumber='+ID);
  }
  addVehicle(warehouse): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Vehicles', warehouse);
  }

  UpdateVehicle(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Vehicles' , details);
  }
  DeleteVehicle(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Vehicles?id='+ ID);
  }
}

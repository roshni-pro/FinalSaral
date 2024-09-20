import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';



@Injectable({
  providedIn: 'root'
})
export class RegionService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetAllRegion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Regions');
  }
  RegionGetByID(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Regions/GetById?RegionId=' + id);
  }
  ManagerName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Regions/GetActiveAgentsForRegion');
  }

  addRegion(regionservice): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Regions/add', regionservice);
  }


  // GetByID(id: number):  Observable<any> {
  //   return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
  // }  

  UpdateRegion(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Regions/update', details);
  }

  DeleteRegion(id: number): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Regions/RemoveV7?id=' + id);
  }

  getSpecificWarehousesid(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/getSpecificWarehousesid?regionId=' + id);
  }
  getSpecificWarehousesidForRegion(ids): Observable<any> {
    console.log(ids);
    return this.http.post<any>(this.apiURL + '/api/Warehouse/getSpecificWarehousesidForRegion',ids);
  }

}

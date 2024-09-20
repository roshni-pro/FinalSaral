import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeatmapServiceService {
  apiURL: string;
  User: any;
  comment: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }


  GetCities(): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/Masters/GetCities');
  }

  Warehouse(CityId: any[]): Observable<any[]> {
    return this.http.post<any>(this.apiURL + '/api/Masters/Warehouses', CityId);
  }


  Cluster(warehouseId: any[]): Observable<any[]> {

    return this.http.post<any[]>(this.apiURL + '/api/Masters/Clusters', warehouseId);
  }

  GetBaseCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Masters/BaseCategories');
  }

  Categories(baseCategoryId: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Masters/Categories', baseCategoryId);
  }

  SubCategories(categoryId: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Masters/SubCategories', categoryId);
  }

  Brands(subcategoryId: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Masters/Brands', subcategoryId);
  }

  Items(getItemsParams: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Masters/Items', getItemsParams);
  }
  ClusterDashboard(details): Observable<any[]> {
    return this.http.post<any>(this.apiURL + '/api/ClusterDashboard/MapData', details);

  }

  getCustomerMapData(details): Observable<any[]> {
    return this.http.post<any>(this.apiURL + '/api/ClusterDashboard/CustomerMapData', details);

  }

  FilteredMapData(details): Observable<any[]> {
    return this.http.post<any>(this.apiURL + '/api/ClusterDashboard/FilteredMapData', details);
  }

  getStoreList():Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + 'api/Store/GetStoreList');
  }

}

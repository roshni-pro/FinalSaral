import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveyMappingService {
  apiUrl = environment.apiURL + '/api/DeliveyMapping';
  constructor(private httpClient: HttpClient) { }

  getCityList(): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + '/GetCityList');
  } //old api for cities --simran

  getCityListNew(): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + '/GetCityIsCommon');
  }

  getWarehouseList(cityId: number): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + '/GetWarehoueList/' + cityId);
  }



}

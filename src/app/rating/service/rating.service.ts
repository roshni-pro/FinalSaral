import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }
 
  addRatingMaster(RatingMasterDc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/RatingMaster/AddRatingMaster', RatingMasterDc);
  }
  updateRatingMaster(RatingMasterDc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/RatingMaster/UpdateRatingMaster', RatingMasterDc);
  }
  getRatingMaster(AppType): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/RatingMaster/GetRatingMaster?AppType='+ AppType);
  }
  getRatingDetails(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/RatingMaster/GetRatingDetails?Id='+ Id);
  }
  getUserRating(AppType,key,skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/UserRating/GetUserRating?AppType='+ AppType + '&key=' + key + '&skip=' + skip + '&take=' + take);
  }
  exportUserRating(AppType,key): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/UserRating/ExportUserRating?AppType='+ AppType + '&key=' + key);
  }
  getCityWiseHubList(cityIds): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetCityWiseHubList', cityIds);
  }
  getHubWiseDboyList(WarehouseIdDC): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetHubWiseDboyList', WarehouseIdDC);
  }
  getHubWiseCustomerRatingList(CustomerRatingFilter): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetHubWiseCustomerRatingList', CustomerRatingFilter);
  }
  getHubWiseClusterList(WarehouseIdDC): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetHubWiseClusterList', WarehouseIdDC);
  }
  getHubWiseSalesPersonList(WarehouseIdDC): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetHubWiseSalesPersonList', WarehouseIdDC);
  }
  getHubWiseSalesPersonRatingList(SalesRatingFilter): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetHubWiseSalesPersonRatingList', SalesRatingFilter);
  }
  getHubWiseDboyRatingList(DboyRatingFilter): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetHubWiseDboyRatingList', DboyRatingFilter);
  }
  getExportHubWiseDboyRatingList(dboyRatingFilter): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetExportHubWiseDboyRatingList', dboyRatingFilter);
  }
  getExportHubWiseSalesPersonRatingList(salesRatingFilter): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetExportHubWiseSalesPersonRatingList', salesRatingFilter);
  }
  getExportHubWiseCustomerRatingList(CustomerRatingFilter): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UserRating/GetExportHubWiseCustomerRatingList', CustomerRatingFilter);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearancePerfomanceDashboardService {

  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL;}

  GetBrandList(payload):Observable<any>
  {
    return this.http.post<any>(this.apiURL + '/api/Clearance/GetClearanceDashboardBrandList', payload);
   }
  GetSearchData(payload:any):Observable<any>
  {
   debugger
    return this.http.post<any>(this.apiURL + '/api/Clearance/GetClearanceDashboardData',payload);
   }
   GetExportSearchData(payload:any):Observable<any>
  {
    return this.http.post<any>(this.apiURL + '/api/Clearance/ExportClearanceDashboardData',payload);
   }
}

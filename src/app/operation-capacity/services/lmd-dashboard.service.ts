import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LMDDashboardInput, LMDOverAllData } from '../interface/lmdover-all-data';
import { LMDVehicle } from '../interface/lmdvehicle';

@Injectable({
  providedIn: 'root'
})
export class LmdDashboardService {
  apiUrl = environment.apiURL + '/api/LMDDashboard/';
  constructor(private http: HttpClient) { }

  exportLMDDashboard(request: LMDDashboardInput): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'ExportLMDDashboard', request);
  }

  getListLMDDashboard(request: LMDDashboardInput): Observable<LMDVehicle[]> {
    return this.http.post<LMDVehicle[]>(this.apiUrl + 'GetListLMDDashboard', request);
  }

  getListLMDChart(request: LMDDashboardInput): Observable<LMDOverAllData[]> {
    return this.http.post<LMDOverAllData[]>(this.apiUrl + 'GetListLMDChart', request);
  }

  exportLMDChart(request: LMDDashboardInput): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'ExportLMDChart', request);
  }

  getFTLData(request: LMDDashboardInput): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'GetFTLData', request);
  }

  exportFTLData(request: LMDDashboardInput): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'ExportFTLData', request);
  }

  exportFTLFullData(request: LMDDashboardInput): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'ExportFTLFullData', request);
  }

  getDesciplineChartData(request: LMDDashboardInput): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'GetDesciplineChartData', request);
  } 
  
  getDesciplineDataReport(request: LMDDashboardInput): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'GetDesciplineDataReport', request);
  }
}

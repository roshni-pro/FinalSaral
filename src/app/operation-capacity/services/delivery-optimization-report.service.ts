import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { DboyPerformanceInputDC } from '../interface/dboy-performance-input-dc';
import { TripReportInputDc } from '../interface/trip-report-input-dc';
import { TripSummaryReportInputDc } from '../interface/trip-summary-report-input-dc';
import { VehiclePerformanceInputDc } from '../interface/vehicle-performance-input-dc';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOptimizationReportService {
  apiUrl = environment.apiURL + '/api/DeliveryOptimizationReport';
  constructor(private http: HttpClient) { }


  dboyPerformanceList(dboyPerformanceInputDC: DboyPerformanceInputDC): Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl + '/dboyPerformanceList', dboyPerformanceInputDC);
  }

  dboyPerformanceExport(dboyPerformanceInputDC: DboyPerformanceInputDC): Observable<string>{
    return this.http.post<string>(this.apiUrl + '/DboyPerformanceExport', dboyPerformanceInputDC);
  }

  
  vehiclePerformanceReport(vehiclePerformanceInputDc: VehiclePerformanceInputDc): Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl + '/VehiclePerformanceReport', vehiclePerformanceInputDc);
  }

  vehiclePerformanceExport(vehiclePerformanceInputDc: VehiclePerformanceInputDc): Observable<string>{
    return this.http.post<string>(this.apiUrl + '/VehiclePerformanceExport', vehiclePerformanceInputDc);
  }
  
  tripSummaryDashboardSummary(tripSummaryReportInputDc:TripSummaryReportInputDc): Observable<any>{
    return this.http.post<any>(this.apiUrl + '/TripSummaryDashboardSummary', tripSummaryReportInputDc);
  }

  tripSummaryDashboardCost(tripSummaryReportInputDc:TripSummaryReportInputDc): Observable<any>{
    return this.http.post<any>(this.apiUrl + '/TripSummaryDashboardCost', tripSummaryReportInputDc);
  }

  tripSummaryDashboardLineChart(tripSummaryReportInputDc:TripSummaryReportInputDc): Observable<any>{
    return this.http.post<any>(this.apiUrl + '/TripSummaryDashboardLineChart', tripSummaryReportInputDc);
  }


  tripReportOrderOverview(tripReportInputDc:TripReportInputDc): Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl + '/TripReportOrderOverview', tripReportInputDc);
  }  

  tripReportOverview(tripReportInputDc:TripReportInputDc): Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl + '/TripReportOverview', tripReportInputDc);
  }

  tripReportExport(tripReportInputDc:TripReportInputDc): Observable<string>{
    return this.http.post<string>(this.apiUrl + '/TripReportExport', tripReportInputDc);
  }
}

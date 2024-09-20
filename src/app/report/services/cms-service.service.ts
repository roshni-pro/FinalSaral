import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CmsServiceService {
  apiURL:string

  constructor(private http:HttpClient) {this.apiURL = environment.apiURL;}

  SearchCmsReport(payload):Observable<any>{
   return this.http.post<any>(this.apiURL+'api/Currency/GetCMSReportdata',payload);
  }
  
  ExportLandPreport(ExportData):Observable<any>{
    return this.http.post<any>(this.apiURL+'api/Report/LossPreventionDAta',ExportData);
  }

}

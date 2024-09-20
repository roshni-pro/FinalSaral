import { HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncidentReportDc } from '../interface/IncidentReport';

@Injectable({
  providedIn: 'root'
})
export class IncidentreportingService {

  apiURL: string;


  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  addIncidentReport(IncidentReportDc : IncidentReportDc):  Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/incidentReport/AddIncidentReport',IncidentReportDc);
  }
  getIncidentReportOpenList():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/incidentReport/GetIncidentReportOpenList');
  }
  closingstatus(CaseNo: number,isActive: boolean,Comment : any){
    
    return this.http.get<any>(this.apiURL + '/api/incidentReport/ClosingStatus/'+ CaseNo +"/"+ isActive + "/" + Comment );
  }
  getIncidentReportClosedList():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/incidentReport/GetIncidentReportClosedList');
  }
  reOpenStatus(CaseNo: number,isActive: boolean,Comment : any){
    
    return this.http.get<any>(this.apiURL + '/api/incidentReport/ReOpenStatus/'+ CaseNo +"/"+ isActive + "/" + Comment );
  }
  caseNoGenterated():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/incidentReport/CaseNoGenterated');
  }

}

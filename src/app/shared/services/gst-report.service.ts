import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GstReportService {

  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  GetPurchasereport(FromDate:any,ToDate:any,stateid:any): Observable<string> {
    return this.http.get<string>(this.apiURL + '/api/GSTReport/B2B?from='+FromDate + '&&' + 'to=' + ToDate + '&&' + 'Stateid=' +stateid)
    
   
  }
  
  
}
    
    
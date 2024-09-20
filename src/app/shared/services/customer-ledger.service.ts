import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerLedgerService {

  apiURL: string;
  
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  generateReport(viewModel: any):  Observable<string> {
    return this.http.post<string>(this.apiURL + '/api/CustomerLedger/GenerateReport', viewModel);
  }
  generateReportExcel(viewModel: any):  Observable<string> {
    
    return this.http.post<string>(this.apiURL + '/api/CustomerLedger/GenerateReportRaw', viewModel);
  }
}

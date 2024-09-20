import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderSalseReportService {

  apiURL: string;
  User: any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }


  GetOrderStatusReport(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Report/GetOrderStatusReport',data);
  }
}

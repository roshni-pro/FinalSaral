import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmeloanService {
  apiURL: string;
  // url: string;

   constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL
    // this.url = environment.apiURL;
  }
  GetWarehouses(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get<any[]>(this.apiURL + '/api/SMELoan/GetWarehouse', httpOptions);
  }

  getLoanAppliedDetailsV2(warehouseid, skcode, skip, take): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get<any>(this.apiURL + '/api/SMELoan/GetLoanAppliedDetails?WarehouseId=' + warehouseid+'&SkCode='+skcode+'&First='+skip+'&Last='+take , httpOptions);
  }
}

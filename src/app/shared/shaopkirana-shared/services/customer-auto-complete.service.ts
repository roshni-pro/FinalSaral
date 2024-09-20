import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerAutoCompleteService {

  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetCustomerListByName(name: string, warehouseid: Number): Observable<any> {
    return this.http.get<any[]>(this.apiURL + '/api/CustomerLedgerConsent/GetCustomer?name=' + name + '&WarehouseId=' + warehouseid);
  }

}

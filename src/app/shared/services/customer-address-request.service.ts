import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CustomerAddressRequestVM } from '../interface/customer-address-request-vm';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerAddressRequestService {

  readonly apiUrl = environment.apiURL + '/api/CustomerAddressRequest';
  constructor(private http: HttpClient) { }

  getCustomerAddressRequestList(skip: number, take:number, warehouseId:number): Observable<CustomerAddressRequestVM[]> {
    return this.http.get<CustomerAddressRequestVM[]>(this.apiUrl + '/GetLists?skip=' + skip + '&take=' + take + '&warehouseId=' + warehouseId);
  }

  getCustomerAddressRequestCount(warehouseId:number): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/GetCount?warehouseId=' + warehouseId);
  }

  onApprove(selectedData): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Approve' , selectedData);
  }

  onReject(selectedData): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Reject' ,selectedData);
  }
}

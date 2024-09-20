import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { CustomerGst } from 'app/shared/interface/customer-gst';

@Injectable({
  providedIn: 'root'
})
export class CustomerGstService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;
  apiUrl: string;
  httpClient: any;

  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
  }
  WarehouseGetByID():  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
  }

  GetGstList(CustomerGst:CustomerGst):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/signup/GetAllGSTCustomer',CustomerGst);
  }
  GetDetailList(GSTVerifiedRequestId):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/signup/GetAllGSTCustomerdetails?GSTVerifiedRequestId='+ GSTVerifiedRequestId);
  }
  PostStatus(custData):  Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/signup/updateGSTCustomerdetails',custData);
  }

}

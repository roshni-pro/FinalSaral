import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Vendor } from '../interfaces/vendor';
import { VendorPager } from '../interfaces/VendorPager';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }
  
  GetExpenseTDS() :Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/Vendor/GetExpenseTDS');
  }
  AddVendor(vendor:Vendor):Observable<Vendor>{
    return this.http.post<Vendor>(this.apiURL + '/api/Vendor/AddVendor',vendor);
  }
  GetVendorList(paginator:VendorPager):Observable<Vendor[]>{
    return this.http.post<Vendor[]>(this.apiURL + '/api/Vendor/GetVendorList',paginator);
  }
  GetVendorById(Id) :Observable<Vendor>{
    return this.http.get<Vendor>(this.apiURL + '/api/Vendor/GetVendorById?Id='+Id);
  }
}

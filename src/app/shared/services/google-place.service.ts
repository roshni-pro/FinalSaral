import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingAddressInput } from 'app/customerdelight/interface/shipping-address-input';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GooglePlaceService {

  apiUrl: string = environment.apiURL;
  constructor(private http: HttpClient) { }

  GetCityList(keyword: string) : Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl +'/api/GooglePlace/GetCityList?keyword='+ keyword);
  }


  GetArea(keyword: string, placeId: string) : Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl +'/api/GooglePlace/GetArea?keyword='+ keyword + '&placeId=' + placeId);
  }

  GetAddress(keyword: string, placeId: string) : Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl +'/api/GooglePlace/GetAddress?keyword='+ keyword + '&placeId=' + placeId);
  }

  GetCustomer(customerId: number) : Observable<ShippingAddressInput>{
    return this.http.get<ShippingAddressInput>(this.apiUrl +'/api/GooglePlace/GetCustomer?customerId='+ customerId);
  }

  GetAddressByPlaceId(placeId: string):Observable<any>{
    return this.http.get<ShippingAddressInput>(this.apiUrl +'/api/GooglePlace/GetAddressByPlaceId?placeId='+ placeId);
  }
}

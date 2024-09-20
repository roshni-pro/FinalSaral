import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ShippingAddressInput } from './interface/shipping-address-input';

@Injectable({
  providedIn: 'root'
})
export class DelightService {

  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }


  CustomerList(Data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerTracking/GetCustomerTrackingList', Data);
  }
  getClusterByCity(cityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Test/GetClusterCityWise?cityid=' + cityId);
  }

  GetCustomerByID(CustomerId, Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomerTracking/GetCustomeDetailbyId?CustomerId=' + CustomerId + '&Id=' + Id);
  }

  Reject(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerTracking/Reject', data);
  }

  Verified(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerTracking/Verified', data);
  }
  ExportCustomerDelight(Data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerTracking/ExportCustomerDelight', Data);
  }

  DelightCount(Id, cityid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomerTracking/GetDelightCount?clusterId=' + Id + '&CityId=' + cityid);
  }
  removeAllCustomerLocations(customerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomerTracking/RemoveAllCustomerLocations?customerId=' + customerId);
  }
  getCustomerLocations(customerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomerTracking/GetCustomerLocations?customerId=' + customerId);
  }

  getCustomeDetailbyIdNew(customerId: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomerTracking/GetCustomeDetailbyIdNew?CustomerId=' + customerId);
  }

  getTrackingCustomerDocument(customerId: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomerTracking/GetTrackingCustomerDocument/' + customerId);
  }

  updateTrackingCustomerDocument(custDetail): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CustomerTracking/UpdateTrackingCustomerDocument', custDetail);
  }

  updateShippingAddress(shippingAddress: ShippingAddressInput): Observable<string> {
    return this.http.post<string>(this.apiURL + '/api/CustomerTracking/UpdateShippingAddress', shippingAddress);
  }

  verifyTrackingCustomerDocument(customerId, isGSTDocument): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CustomerTracking/VerifyTrackingCustomerDocument?customerId=' + customerId + '&isGSTDocument=' + isGSTDocument);
  }

  customerVerifyRequest(requestInput: any): Observable<string> {
    return this.http.post<any>(this.apiURL + '/api/CustomerTracking/CustomerVerifyRequest', requestInput);
  }

  virtuallyVerify(customerId): Observable<string> {
    return this.http.get<any>(this.apiURL + '/api/CustomerTracking/VirtuallyVerify?customerId=' + customerId);
  }

  updateCustomerStatus(customerStatus): Observable<string> {
    return this.http.post<any>(this.apiURL + '/api/CustomerTracking/UpdateCustomerStatus', customerStatus);
  }

  updateCustomerBillingAddress(customerDetail): Observable<string> {
    return this.http.post<any>(this.apiURL + '/api/CustomerTracking/UpdateCustomerBillingAddress', customerDetail);
  }

  rejectAllRequest(customerId: number): Observable<string> {
    return this.http.get<string>(this.apiURL + '/api/CustomerTracking/RejectAllRequest/' + customerId);
  }

  isDocumentNotExists(customerId: number, documentNumber: string): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/api/CustomerTracking/IsDocumentNotExists?CustomerId=' + customerId + '&DocumentNo=' + documentNumber);
  }

  updateCustomerBillingCity(customerId: number, billingState: string, billingCity: string): Observable<string> {
    return this.http.get<string>(this.apiURL + '/api/CustomerTracking/UpdateCustomerBillingCity?billingCity=' + billingCity +
    '&billingState=' + billingState + '&CustomerID=' + customerId);
    // return this.http.get<string>(this.apiURL + '/api/CustomerTracking/UpdateCustomerBillingCity?customerID=' + customerId +
    //   '&billingState=' + billingState + '&billingCity=' + billingCity);
  }

  Getstates(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/States');
  }
  Getcity(Statid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/City/Customercity?Statid=' + Statid);
  }



}

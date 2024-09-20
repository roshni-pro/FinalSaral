import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverycancellationreportService {
  apiURL: string;  
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  getreportdeliverycancellation():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryTask/getreportdeliverycancellation');
  }
  SearchCancellationReport(DepId : any):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryTask/SearchCancellationReport?DepId='+ DepId);
  }
  CustomerWalletCharges(CustomerId : any):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/wallet/CustomerWalletCharges?CustomerId='+ CustomerId);
  }
  Export(CustomerId : any):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/wallet/Export?CustomerId='+ CustomerId);
  }
  GetManualName():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/wallet/GetManualName');
  }
}

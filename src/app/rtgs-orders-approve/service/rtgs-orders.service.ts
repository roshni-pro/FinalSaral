import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CustDC } from '../interface/rtgs-order-details-dc';

@Injectable({
  providedIn: 'root'
})
export class RtgsOrdersService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getRTGSOrderList(RTGSOrderDetailsDC): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/RTGSOrdersApprove/GetRTGSOrderList' ,RTGSOrderDetailsDC);
  }
  updateRTGSOrder(RTGSOrderDetailsDC): Observable<any> {
    //this.apiURL + 
    return this.http.post<any>(this.apiURL + '/api/RTGSOrdersApprove/UpdateRTGSOrder' ,RTGSOrderDetailsDC);
  }
  getByName(name: string): Observable<CustDC[]>{
    return this.http.get<CustDC[]>( this.apiURL + '/api/RTGSOrdersApprove/GetCustomerid?keyword=' +name);
  }     
}

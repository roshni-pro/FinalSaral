import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  GetPaymentRequestData() {
    throw new Error("Method not implemented.");
  }
  apiURL: string;


                                     
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetRedispatchdata():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveryIssuance/GetRedispatchdata');

  }

  ApprovedRedispatchorder(approveddata):Observable<any[]> {
    
    return this.http.put<any[]>(this.apiURL + '/api/DeliveryIssuance/approvedredispatch',approveddata);
  }

  DBoy():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveryOrder');
  }

  getAgent(WarehouseId):Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Currency/Activeagent?WarehouseId='+WarehouseId);
  }

  getordersbyId(mob):Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveryOrder?mob=' + mob);
  }

  getOrderIdList(orderId):Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveryOrder/GetOfferOnOrder?OrderId=' + orderId);
  }

  approval(dataToPost:any):Observable<any>{
    return this.http.post(this.apiURL + 'api/DeliveryIssuance/approvalorder',dataToPost);
  }
  
  issuanceData(payload:any):Observable<any>{
    return this.http.post(this.apiURL + 'api/DeliveryIssuance/CreateAssignment/V1',payload);
  }

}
      



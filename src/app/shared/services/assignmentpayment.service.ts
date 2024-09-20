import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class AssignmentpaymentService {
  apiURL: string;  

  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  // Change WarehouseId to array by Anoop 5/2/2021
  GetAssignmentAgent(WarehouseId: any[]):  Observable<any[]> {
    return this.http.get<any>(this.apiURL + '/api/Currency/Activeagent?warehouseId=' + WarehouseId);
  }

// Addded by Anoop 8/2/2021
PostAssignmentAgent(warehouseid: any[]):  Observable<any[]> {
  
  return this.http.post<any>(this.apiURL + '/api/Currency/ActiveagentData', warehouseid);
}



  GetAssignment(searchdata):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/AssignmentPayment/GetAssignment',searchdata);
  }

  
  GetOrderList(DeliveryIssuanceId):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/AssignmentPayment/GetOrderList?DeliveryIssuanceId=' + DeliveryIssuanceId);
  }

  assignmentpayment(data):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/AssignmentPayment/assignmentpayment',data);
  }

}
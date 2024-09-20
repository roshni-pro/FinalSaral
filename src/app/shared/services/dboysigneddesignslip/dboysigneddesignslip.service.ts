import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DboysigneddesignslipService {
  apiURL: string;  
  User:any;
  comment : string;
  
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  getSignedDepositSlip(SlipId,AssignmentId,DboyId,StartDate,EndDate,PageNumber,PageSize,Type):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/DBoyAssignmentDeposit/getSignedDepositSlip?SlipId='+SlipId + '&AssignmentId=' + AssignmentId + '&DboyId=' + DboyId + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&PageNumber='+ PageNumber + '&PageSize=' + PageSize+ '&Type=' + Type);
  }
  GetDboyWarehouseBased(WarehouseId):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetDboyWarehouseBased?WarehouseId='+WarehouseId);
  }
}

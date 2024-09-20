import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {
  apiURL: string;  

  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  
  getAllWarehouseNew():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
  }
  getAllCluster(WarehouseId):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/hubwise?WarehouseId='+ WarehouseId);
  }
  getProfilingList(customerProfileSearchDc){ 
    return this.http.post<any>(this.apiURL + '/api/CustomerProfile/GetProfilingList',customerProfileSearchDc);
  }
  callAndVisitHistoryDataGet(CustomerId){ 
    return this.http.get<any>(this.apiURL + '/api/CustomerProfile/CallAndVisitHistoryDataGet?CustomerId='+CustomerId);
  }
  callandVisitHistorySummaryGet(Id){ 
    return this.http.get<any>(this.apiURL + '/api/CustomerProfile/CallandVisitHistorySummaryGet?Id='+Id);
  }
  isPhysiclVisit(Id: number,IsPhysicalVisit: boolean){ 
    return this.http.get<any>(this.apiURL + '/api/CustomerProfile/IsPhysicalVisit?CheckOutReasonId='+ Id +"&IsPhysicalVisit="+ IsPhysicalVisit );
  }
  customerProfilingInsertPhysicalVisit(Id: number){ 
    return this.http.get<any>(this.apiURL + '/api/CustomerProfile/CustomerProfilingInsertPhysicalVisit?CustomerId='+ Id);
  }
  export(customerProfileSearchDc){ 
    return this.http.post<any>(this.apiURL + '/api/CustomerProfile/Export',customerProfileSearchDc);
  }
  exportAll(customerProfileSearchDc){ 
    return this.http.post<any>(this.apiURL + '/api/CustomerProfile/ExportAll',customerProfileSearchDc);
  }
  istellyCaller(){ 
    return this.http.get<any>(this.apiURL + '/api/CustomerProfile/IstellyCaller');
  }
  getDigitalOtp(OrderId: number){ 
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/GetDigitalOtp?OrderId='+ OrderId);
  }
}

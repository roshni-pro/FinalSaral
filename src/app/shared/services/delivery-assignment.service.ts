import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAssignmentService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;


  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }


  GetBBoyListByWhereHouseId(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryOrder/GetDboy?WarehouseId=' + WarehouseId);
  }

  SearchAssignment(AssignmentIds): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryIssuance/SearchAssignment?AssignmentIds=' + AssignmentIds);
  }
  GetDBoyHistory(DeliveryIssuanceId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryIssuance/DeliveryIssuanceHistory?DeliveryIssuanceId=' + DeliveryIssuanceId);
  }
  GetShortItemsData(DeliveryIssuanceId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryAssignment/GetShortItems?DeliveryIssuanceId=' + DeliveryIssuanceId);
  }
  GetAssingmentamount(DeliveryIssuanceId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryIssuance/GetAssingmentamount?id=' + DeliveryIssuanceId);
  }

  AssignmentProductsList(DeliveryIssuanceId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryIssuance/AssignmentProductsList?AssignmentId=' + DeliveryIssuanceId);
  }
  GetAssOrder(DeliveryIssuanceId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryIssuance/GetAssOrder?AssignmentId=' + DeliveryIssuanceId);
  }
  GetDirectionDetails(DeliveryIssuanceId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryTask/AssignmentDirection?assignmentId=' + DeliveryIssuanceId);
  }
  getViewAssignData(ids, DeliveryIssuanceId, type): Observable<any> {
    if (type == 'viewAssign') {
      return this.http.get<any>(this.apiURL + 'api/vehicleassissment?ids=' + ids + "&DeliveryIssuanceId=" + DeliveryIssuanceId + "&test=" + 'test');
    } else {
      return this.http.get<any>(this.apiURL + 'api/DeliveryOrderAssignmentChange?DeliveryIssuanceId=' + DeliveryIssuanceId);
    }
  }
  updateStatus(DeliveryIssuanceId, OrderId, status): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/DeliveryTask/AssignmentOrderStatusUpdate?assignmentId=' + DeliveryIssuanceId + "&orderId=" + OrderId + "&status=" + status);
  }
  updateSummeryAssignment(DeliveryIssuanceId, payload): Observable<any> {
    return this.http.put<any>(this.apiURL + 'api/DeliveryAssignment/AssignmentPayment?DeliveryIssuanceId=' + DeliveryIssuanceId, payload);
  }
  IcVerified(payload): Observable<any> {
    return this.http.put<any>(this.apiURL + 'api/DeliveryAssignment/IcVerified', payload);
  }
  ExportAssignment(url, payload): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/AssignmentReport/ExportAssignmentReport' + url, payload);
  }
  searchAllDataWithoutDate(url, payload): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/AssignmentReport/GetReportData' + url, payload);
  }
  finalLizedData(id, postData): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/DeliveryAssignment/Finalization?DeliveryIssuanceId=' + id, postData);
  }

  DeliveryIssuance(itemsPerPage, pageno, PeopleID, start, end): Observable<any> {
    return this.http.get<any>(this.apiURL + "api/DeliveryIssuance?list=" + itemsPerPage + "&page=" + pageno + "&id=" + PeopleID + "&start=" + start + "&end=" + end);
  }
}

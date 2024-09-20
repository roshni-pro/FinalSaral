import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BatchMasterService {
  apiURL: string;
  constructor(private http: HttpClient) {this.apiURL = environment.apiURL; }

  GetItemsByItemNumber(ItemNumber,skip,take): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Batch/GetBatchDetailsByNumberOrCode?ItemNumber='+ItemNumber+'&skip='+skip+'&take='+take);
 }
 EditBatchDetails(Id:number,ExpiryDate:any): Observable<any>{
  return this.http.get<any>(this.apiURL + '/api/Batch/EditBatchDetails?Id='+Id+'&ExpiryDate='+ExpiryDate);
 }
 GetBatchApproverDetails(Status,ItemNumber,skip,take): Observable<any>{
  return this.http.get<any>(this.apiURL + '/api/Batch/GetBatchApproverDetails?Status='+Status+'&ItemNumber='+ItemNumber+'&skip='+skip+'&take='+take);
 }
 ApprovedRejectedBatchDetails(Id, Status): Observable<any>{
  return this.http.get<any>(this.apiURL + '/api/Batch/ApprovedRejectedBatchDetails?Id='+Id+'&Status='+Status);
 }
}

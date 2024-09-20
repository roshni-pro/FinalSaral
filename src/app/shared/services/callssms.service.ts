import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PaginatorViewModel } from '../interface/paginator-view-model';
import { skip } from 'rxjs/operators';
import { PaginatorViewModelTradeorder } from '../interface/paginator-view-model-tradeorder';

@Injectable({
  providedIn: 'root'
})
export class CallssmsService {

  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL;
  }



  getallCallDataWithpg(vm: PaginatorViewModel): Observable<any> {

    return this.httpClient.post<any>(this.apiUrl + '/api/CallSMSRequest/getCallSMSRequest', vm);
  }
  getAddressUpdateRequestList(filterDto): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/SalesApp/GetAddressUpdateRequest', filterDto);
  }
  updateAddressUpdateRequest(ObjId, Status): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/SalesApp/UpdateAddressRequest?ObjId=' + ObjId + '&Status=' + Status);
  }
  ExportAddressUpdateRequest(filterDto): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/SalesApp/ExportAddressUpdateRequest', filterDto);
  }


}



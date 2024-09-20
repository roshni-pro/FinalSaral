import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtaUpdateOrderService {

  url: string;
  apiURL: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiURL;
    this.apiURL = environment.apiURL + '/api/Test/';
  }

  UploadFlashDoc(ETDDate,data):Observable<any[]>{
    return this.http.post<any[]>(this.apiURL + 'ETDDateUpadteOrder?ETDDate='+ETDDate,data);
  }

  UploadRtdDoc(rtdDate,selectedWarehouse,data):Observable<any[]>{
    return this.http.post<any[]>(this.apiURL + 'RTDUpdateddate?RtdDate='+rtdDate+ '&Wid=' +selectedWarehouse,data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountLedgerTypeService {
  apiURL: string;
  
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getList(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/AccountLedgerType/GetList');
  }
  postData(ledgerConfigurationMaster): Observable<any>{
    
    return this.http.post<any>(this.apiURL + '/api/LedgerConfigurationMaster/PostLedger',ledgerConfigurationMaster);
  }
  saveDetails(ledgerConfigurationdetails):Observable<any>{
    return this.http.post<any>(this.apiURL + '/api/LedgerConfigurationMaster/SaveDetails',ledgerConfigurationdetails);

  }
  getVocherTypeList(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/AccountLedgerType/GetVocherList');

  }

}

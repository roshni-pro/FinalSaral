import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LedgerConfigurationMasterVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-master-vm';
import { Observable } from 'rxjs';
import { LedgerConfigurationParameterVM } from '../../interface/ledger-configuration/ledger-configuration-parameter-vm';

@Injectable({
  providedIn: 'root'
})
export class LedgerConfigurationService {

  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  getByID(masterId: number): Observable<LedgerConfigurationMasterVM>{
    return this.http.get<LedgerConfigurationMasterVM>(  this.apiURL +'/api/LedgerConfigurationMaster/GetByID/'+ masterId);
  }
  getMasterList(): Observable<any[]>{
    return this.http.get<any[]>(  this.apiURL +'/api/LedgerConfigurationMaster/GetList');
  }
  updateEntityName(ledgerconfigurationdetails): Observable<LedgerConfigurationMasterVM>{
    return this.http.put<LedgerConfigurationMasterVM>(  this.apiURL +'/api/LedgerConfigurationMaster/UpdateEntity',ledgerconfigurationdetails);
  }
  addParamEntry(ledgerconfigparameter):Observable<LedgerConfigurationParameterVM>{
    
    return this.http.post<LedgerConfigurationParameterVM>(  this.apiURL +'/api/LedgerConfigurationMaster/AddParamEntry',ledgerconfigparameter);

  }

  saveDetails(ledgerconfigdetails):Observable<any>{
    
    return this.http.post<any>(this.apiURL + '/api/LedgerConfigurationMaster/SaveDetails',ledgerconfigdetails);
  }


  DeleteParameter(ledgerconfigdetails):Observable<any>{
    
    return this.http.post<any>(this.apiURL + '/api/LedgerConfigurationMaster/SaveDetails',ledgerconfigdetails);
  }



  saveCondition(ledgerconfigcondition):Observable<any>{
    
    return this.http.post<any>(this.apiURL + '/api/LedgerConfigurationMaster/SaveCondition',ledgerconfigcondition);
  }


  delete(id:number):Observable<any[]>{
    
    return this.http.get<any[]>(this.apiURL +'/api/LedgerConfigurationMaster/Delete?id='+id);
  }
}

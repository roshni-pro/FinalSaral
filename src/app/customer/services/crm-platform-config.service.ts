import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrmPlatformConfigService {

  apiURL: string;  

  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  
  cRMPlatformConfigGetList():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRMPlatformConfig/CRMPlatformConfigGetList');
  }
  activeInactiveCRMTag(Id,IsActive):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRMPlatformConfig/ActiveInactiveCRMTag?Id='+ Id + '&IsActive=' + IsActive);
  }
  insertCRMPlatformConfig(InsertCRMPlatformConfigDc):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CRMPlatformConfig/InsertCRMPlatformConfig', InsertCRMPlatformConfigDc);
  }
  updateCRMPlatformConfig(InsertCRMPlatformConfigDc):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CRMPlatformConfig/UpdateCRMPlatformConfig', InsertCRMPlatformConfigDc);
  }
  deleteCRMPlatformConfig(Id):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRMPlatformConfig/DeleteCRMPlatformConfig?Id='+ Id);
  }
  getCRMPlatformConfigById(Id):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRMPlatformConfig/GetCRMPlatformConfigById?Id=' + Id);
  }

  // Platform
  cRMPlatformGetList():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRMPlatformConfig/CRMPlatformGetList');
  }
  insertCRMPlatform(InsertCRMPlatformConfigDc):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CRMPlatformConfig/InsertCRMPlatform', InsertCRMPlatformConfigDc);
  }
  updateCRMPlatform(InsertCRMPlatformConfigDc):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/CRMPlatformConfig/UpdateCRMPlatform', InsertCRMPlatformConfigDc);
  }
  deleteCRMPlatform(Id):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRMPlatformConfig/DeleteCRMPlatform?Id='+ Id);
  }
  //platform end

  //config
  cRMPlatformMappingGetList():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRMPlatformConfig/CRMPlatformMappingGetList');
  }
  activeInactiveCRMPlatformMapping(CrmId,CrmPlatformId,UpdateCrmPlatformMapping):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRMPlatformConfig/ActiveInactiveCRMPlatformMapping?CrmId='+CrmId +'&CrmPlatformId=' + CrmPlatformId + '&UpdateCrmPlatformMapping=' + UpdateCrmPlatformMapping);
  }
}

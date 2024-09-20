import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GitConfigurationService {

  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
   }

  getStoreList():Observable<any>{
    return this.http.get<any[]>(this.apiURL + 'api/Store/GetStoreList');
  }

  GetSubSubCategory(GroupId):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'api/JITConfiguration/BrandListByStore?GroupId='+GroupId);
  }

  getDataforGroup(payload):Observable<any>{
    return this.http.post<any[]>(this.apiURL + 'api/JITConfiguration/GetBrandList',payload);
  }

  uploadExcel(formData):Observable<any>{
    return this.http.post<any[]>(this.apiURL + 'api/JITConfiguration/JITUploadFile',formData);
  }

  deleteBrandConfig(Id):Observable<any>{
    return this.http.get<any[]>(this.apiURL + 'api/JITConfiguration/DeleteJITConfig?Id='+Id);
  }

  updateBrandConfig(Id,Percentage,showType,BrandId):Observable<any>{
    return this.http.get<any[]>(this.apiURL + 'api/JITConfiguration/UpdatePercentange?Id='+Id+'&Percentage='+Percentage+'&showType='+showType+'&BrandId='+BrandId);
  }

  insertBrandConfig(body):Observable<any>{
    return this.http.post<any[]>(this.apiURL + 'api/JITConfiguration/InsertJITConfig',body);
  }

  getListconfig(payload):Observable<any>{
    return this.http.post<any[]>(this.apiURL + 'api/JITConfiguration/GetJITConfigList',payload);
  }

  ActiveInactiveId(Id,IsActive):Observable<any>{
    return this.http.get<any[]>(this.apiURL + 'api/JITConfiguration/ActiveInactiveJITConfig?Id='+Id+'&IsActive='+IsActive);
  }

  exportData(payload):Observable<any>{
    return this.http.post<any[]>(this.apiURL + 'api/JITConfiguration/ExportJITConfig',payload);
  }

  //api/JITConfiguration/ActiveInactiveJITConfig?Id=
}

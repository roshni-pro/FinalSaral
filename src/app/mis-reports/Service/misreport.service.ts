

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MisreportService {

  UatApi: any;

  constructor(private http: HttpClient) {
    this.UatApi = environment.apiURL;
  }
  
  PkgMatCostuploader(file): Observable<any> {
    return this.http.post<any>( this.UatApi + 'api/ClusterHoliday/PackageMaterialCostUploder', file);
  }

  GetPackageMaterialCost(obj): Observable<any> {
    return this.http.post<any>( this.UatApi + 'api/ClusterHoliday/GetPackageMaterialCost',obj);
  }

  SkpKppUploader(file): Observable<any> {
    return this.http.post<any>( this.UatApi + 'api/ClusterHoliday/SkpKppCommissionUploder', file);
  }

  GetGetSkpKppCommission(obj): Observable<any> {
    return this.http.post<any>( this.UatApi + 'api/ClusterHoliday/GetGetSkpKppCommission',obj);
  }

  AccountMisTemplateExport(m): Observable<any> {
    return this.http.post<any>( this.UatApi + 'api/AccountMIS/AccountMisTemplateExport',m);
  }

  AccountMISTemplateUploder(MonthDate,file): Observable<any> {
    return this.http.post<any>(this.UatApi + 'api/AccountMIS/AccountMISTemplateUploder?MonthDate='+MonthDate,file);
  }

  ExportAllAccountMISData(obj): Observable<any> {
    return this.http.post<any>(this.UatApi+ 'api/AccountMIS/ExportAllAccountMISData',obj);
  }
  GetAccountMISData(ReportFilterDc): Observable<any> {
    return this.http.post<any>(this.UatApi + 'api/AccountMIS/GetAccountMISData',ReportFilterDc);
  }

  GetMultipleCities(stateid): Observable<any> {
    return this.http.post<any>(this.UatApi + 'api/AccountMIS/GetMultipleCities',stateid);
  }

  InsertAccountMISData(m): Observable<any>
  {
    return this.http.get(this.UatApi+'api/AccountMIS/InsertAccountMISData?MOnthdate='+m)
  }
}
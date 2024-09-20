import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearanceItemService {
  apiUrl: any;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getClearanceLiveItem(SearchClearanceLiveItemDc): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/Clearance/GetClearanceLiveItem',SearchClearanceLiveItemDc);
  }
  
  getClearanceLiveItemExport(ExportClearanceLiveItemFilterDc): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/Clearance/GetClearanceLiveItemExport',ExportClearanceLiveItemFilterDc);
  }
  activeInactive(Id,isActive): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/Clearance/ActiveInactive?ClearanceId='+Id + '&isActive=' + isActive);
  }
  getClearanceStockList(SearchClearanceStockDc): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/Clearance/GetClearanceStockList',SearchClearanceStockDc);
  }
  updateClearanceStockLiveItem(updateClearanceStockDc): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/Clearance/UpdateClearanceStockLiveItem',updateClearanceStockDc);
  }
  getGroupList():Observable<any>{
    return this.http.get<any>(this.apiUrl+'api/Clearance/GetGroupNameList');
  }

  getExportData(ExportStockDc):Observable<any>{
    return this.http.post<any>(this.apiUrl+'api/Clearance/GetClearanceStockListExport',ExportStockDc);
    //http://localhost:26265/api/Clearance/GetClearanceStockListExport
  }
  ClearanceLiveItemsAllExport(payload:any):Observable<any>
   {
     return this.http.post<any>(this.apiUrl + '/api/Clearance/ClearanceLiveItemsAllExport',payload);
    }
}

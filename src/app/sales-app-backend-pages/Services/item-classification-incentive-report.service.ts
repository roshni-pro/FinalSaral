import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemClassificationIncentiveReportService {
  apiUrl: any;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
   }
  //  getWarehouseList(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl + '/api/Warehouse');
  // }

  GetAllCity(): Observable<any[]> {
   return this.http.get<any[]>(this.apiUrl + '/api/Warehouse/GetActiveWarehouseCity');
   }

   GetAllCityNew(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/api/DeliveyMapping/GetCityIsCommon')
    }


  getWareHouseByCity(cityId): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/Warehouse/WarehouseGetByCityListCommon');
  }

  getWareHouseByCityV2(cityId): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/DeliveyMapping/WarehouseGetByCityListCommon',cityId);
  }
  GetStoreList(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/api/Store/GetStoreList');
  }

  getSearchData(ReportFilterDc): Observable<any>{
    return this.http.post<any>(this.apiUrl+'api/MobileExecutive/ItemClassificationIncentiveReport',ReportFilterDc);
  }

  GetAllExecutiveAttendenceForReport(AttendenceReportDC): Observable<any>{
    debugger;
    return this.http.post<any>(this.apiUrl+'api/MobileExecutive/GetAllExecutiveAttendenceForReport',AttendenceReportDC);
  }

  GetExecutiveAttendenceMonthViewForReport(id,month,year): Observable<any>{
    return this.http.get<any>(this.apiUrl+'api/MobileExecutive/GetExecutiveAttendenceMonthViewForReport?ExecutiveId='+id+'&Month='+month+'&Year='+year);
  }

  DateWiseExport(Date:any,WarehousIds:any): Observable<any>{
    //debugger;
    return this.http.post<any>(this.apiUrl+'api/MobileExecutive/ExecutiveAttendanceReportDateWise?date='+Date,WarehousIds);
  }

  ExportAllincentiveData(ReportFilterDc): Observable<any>{
    return this.http.post<any>(this.apiUrl+'api/MobileExecutive/GetItemClassificationIncentiveAllExport',ReportFilterDc);
  }

  ExportAllReport(payload:any): Observable<any>{
    //debugger
    return this.http.post<any>(this.apiUrl+'api/MobileExecutive/ExportAllExecutiveAttendenceForReport',payload);
  }

  detailExport(executiveId,dateTime1): Observable<any>{
    return this.http.get<any>(this.apiUrl+'api/MobileExecutive/ExportExecutiveAttendenceRowDetails?ExecutiveId='+executiveId+'&date='+dateTime1);
  }

  GetSuccessStoreTarget(FilterDc): Observable<any>{
    return this.http.post<any>(this.apiUrl+'api/MobileExecutive/ExportSuccessStoreTarget',FilterDc);
  }

  UploadItem(warehouseId,file):Observable<any>
  {
    
    return this.http.post(this.apiUrl+'api/itemimageupload/UploadExcel?WarehouseId='+warehouseId,file);
  }

  ExportExcel(obj):Observable<any>
  {
    return this.http.get(this.apiUrl+'api/itemimageupload/ExportExcel?WarehouseId='+obj);
  }
  GetMarketingCostDashboard(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/MobileExecutive/MarketingCostDashboard', data)
  }

  
}

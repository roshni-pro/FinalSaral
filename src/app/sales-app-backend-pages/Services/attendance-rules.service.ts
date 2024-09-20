import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceRulesService {
  apiUrl: any;
  constructor(private http: HttpClient) {this.apiUrl = environment.apiURL;}

  getAttendanceCityList(ChannelId:number):Observable<any>{
    //return this.http.get<any>(this.apiUrl +'api/MobileSales/GetAttendanceConfigListByStoreId?StoreId='+storeId);
    return this.http.get<any>(this.apiUrl +'api/MobileExecutive/GetAttendanceConfigListByStoreId?ChannelMasterId='+ChannelId);
  }
  DeleteAttendanceConfigById(attendaceConfigId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl +'api/MobileExecutive/DeleteAttendanceConfigById?AttendaceConfigId='+attendaceConfigId);
  }
  GetAttendanceConfigById(attendaceConfigId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl +'api/MobileExecutive/GetAttendanceConfigById?AttendaceConfigId='+attendaceConfigId);
  }
  ActiveInactiveCity(attendaceConfigId:number,isActive:boolean):Observable<any>{
    return this.http.get<any>(this.apiUrl +'api/MobileExecutive/ActiveInactiveCityAttendance?AttendaceConfigId='+attendaceConfigId+'&IsActive='+isActive);
  }
  InsertUpdateAttendanceConfig(AttendanceRuleConfigDC:any):Observable<any>{
    return this.http.post<any>(this.apiUrl +'api/MobileExecutive/InsertUpdateAttendanceConfig',AttendanceRuleConfigDC);
  }

  Editlog(attConfigId,skip,take):Observable<any>{
    return this.http.get<any>(this.apiUrl +'api/MobileExecutive/GetAttendanceConfigLog?AttendanceRuleConfigId='+attConfigId+'&Skip='+skip+'&Take='+take);
  }
  GetCityListForAttendanceConfig(ChannelId:number,isEdit:boolean): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'api/MobileExecutive/GetCityListForAttendanceConfig?ChannelId='+ChannelId+'&IsEdit='+isEdit);
  }


  public editDataDetails: any = [];
///public subject = new Subject<any>();
private messageSource = new  BehaviorSubject(this.editDataDetails);
currentMessage = this.messageSource.asObservable();
changeMessage(message: string) {
this.messageSource.next(message)
}

}

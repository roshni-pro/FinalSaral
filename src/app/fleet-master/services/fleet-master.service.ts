import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FleetMasterService {

  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }
 
  addFleetMaster(AddFleetMasterdc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/FleetMasters/AddFleetMaster', AddFleetMasterdc);
  }

  getFleetMasterList(skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/FleetMasters/GetFleetMasterList?skip=' + skip + '&take=' + take );
  }
  getfleetMasterbyId(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/FleetMasters/FleetMasterbyId?Id=' + Id);
  }

  updateFleetMaster(AddFleetMasterdc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/FleetMasters/UpdateFleetMaster/V7', AddFleetMasterdc);
  }
  getData(FromDate,ToDate,search,statusValue,Cityid,skip,take): Observable<any> {
    debugger  
    return this.http.get<any>(this.apiURL + '/api/FleetMasters/ExportFleetMasterList?startDate=' + FromDate + '&endDate=' + ToDate + '&search='+search +'&statusValue='+statusValue +'&Cityid=' +Cityid+"&skip="+skip +"&take="+take);
  }

  postactivety(Id,bool){
    return this.http.get<any>(this.apiURL + '/api/FleetMasters/FleetActiveDeactiveList?Id=' +Id +'&IsActive='+ bool);
  }
  postIsBlocked(Id,bool){
    return this.http.get<any>(this.apiURL + '/api/FleetMasters/FleetBlockById?Id=' +Id +'&IsBlocked='+ bool);
  }
  deleteAccountRow(Id){
    return this.http.get<any>(this.apiURL + '/api/FleetMasters/DeleteFleetAccountDeatilsById?Id=' +Id);
  }
  UploadImageDoc(ImageUrl) {
    return this.http.post<any>(this.apiURL + '/api/FleetMasters/DocumentImageUpload', ImageUrl);
  }

  accountApprove(Id: any,Isapprove: boolean) {
    return this.http.get<any>(this.apiURL + '/api/FleetMasters/ApprovedByAccount?FleetMasterId='+Id+'&Isapprove='+Isapprove);
  }
  // api/FleetMasters/FleetActiveDeactiveLis
}

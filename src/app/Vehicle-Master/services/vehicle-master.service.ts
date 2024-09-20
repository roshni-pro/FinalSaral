import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleReportDC } from 'app/operation-capacity/interface/vehicle-report-dc';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleMasterService {

  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }
 
  
  addFleetMaster(AddFleetMasterdc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/VehicleMaster/AddVehicleMaster', AddFleetMasterdc);
  }

  getVehicleMasterList(skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/GetVehicleMasterList?skip=' + skip + '&take=' + take );
  }
  vehicleMasterbyId(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/VehicleMasterbyId?Id=' + Id);
  }

  editVehicleMaster(AddFleetMasterdc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/VehicleMaster/EditVehicleMaster', AddFleetMasterdc);
  }
  uploadImage(ImageUrl): Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/DBoyMaster/DocumentImageUpload',ImageUrl);
  }
  gettransportList(fleettype,Warehouseid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/TransportList?fleetType=' + fleettype+'&Warehouseid=' +Warehouseid);
  }
  getVehicleList(FleetMasterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/VehicleList?FleetMasterId=' + FleetMasterId);
  }
  getData(FromDate,ToDate,search,searchdata,WarehouseId,Cityid,skip,take): Observable<any> {
    debugger
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/ExportVehicleMasterList?startDate=' + FromDate + '&endDate=' + ToDate + '&search='+search+'&statusValue='+searchdata+'&WarehouseId='+WarehouseId +"&Cityid="+Cityid +"&skip="+skip +"&take="+take);
    
  }
  
  postactivety(Id,bool){
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/ActiveDeactiveList?Id=' +Id +'&IsActive='+ bool);
  }
  postIsBlocked(Id,bool){
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/VehicleBlockById?Id=' +Id +'&IsBlocked='+ bool);
  }


  GetVehicleListByWarehouseId(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/GetVehicleListByWarehouseId?WarehouseId='+ WarehouseId);
  }
  GetVehicleReport(datatopost): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/VehicleMaster/GetVehicleReport', datatopost);
  }
  GetAllVehicleReportOfDate(datatopost): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/VehicleMaster/GetAllVehicleReportOfDate', datatopost);
  }

  exportVehicleReport(datatopost): Observable<string> {
    return this.http.post<string>(this.apiURL + '/api/VehicleMaster/ExportVehicleReport', datatopost);
  }

  GetThresholdkgList(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/PlanMaster/GetThresholdkgList');
  }
  
}

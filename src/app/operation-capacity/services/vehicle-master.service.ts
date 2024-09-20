import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  gettransportList(fleettype): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/TransportList?fleetType=' + fleettype);
  }
  getVehicleList(FleetMasterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/VehicleList?FleetMasterId=' + FleetMasterId);
  }
  getData(FromDate,ToDate,search): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/ExportVehicleMasterList?startDate=' + FromDate + '&endDate=' + ToDate + '&search='+search );
  }
  
  postactivety(Id,bool){
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/ActiveDeactiveList?Id=' +Id +'&IsActive='+ bool);
  }
  postIsBlocked(Id,bool){
    return this.http.get<any>(this.apiURL + '/api/VehicleMaster/VehicleBlockById?Id=' +Id +'&IsBlocked='+ bool);
  }
  TripAssignmentProductsList(tripPlannerMasterId: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryIssuance/TripAssignmentProductsList?TripPlannerMasterId=' + tripPlannerMasterId);
  }
  TripGetAssignmentOrder(tripPlannerMasterId: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryIssuance/TripGetAssignmentOrder?TripPlannerMasterId=' + tripPlannerMasterId);
  }
  whForRedispatch(peopleid: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/WhForRedispatch?peopleid=' + peopleid);
  }
  approvalorder(OrderRedispatchCountApproval): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/DeliveryIssuance/approvalorder',OrderRedispatchCountApproval);
  }
  getRedispatchOrder(wid : number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryApp/GetRedispatchOrder?WarehouseId=' + wid);
  }
  getAssingmentamount(id : number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryIssuance/GetAssingmentamount?id=' + id);
  }
  // CheckAssignmentEwayBillAndIRNno(tripPlannerMasterId: number): Observable<any> {
  //   debugger;
  //   return this.http.get<any>(this.apiURL + '/api/PlanMaster/CheckAssignmentEwayBillAndIRNno?tripMasterId=' + tripPlannerMasterId);
  // }


  
}

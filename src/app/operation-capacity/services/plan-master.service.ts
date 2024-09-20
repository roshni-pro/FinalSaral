import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { CustomTrip } from '../interface/custom-trip';
import { TripPlannerConfirmedMasterVM } from '../interface/trip-planner-confirmed-master-vm';
import { TripPlannerConfirmedOrderVM } from '../interface/trip-planner-confirmed-order-vm';
import { TripPlannerOrderPager } from '../interface/trip-planner-order-pager';
import { VehicleDboyDriverDDs } from '../interface/vehicle-dboy-driver-dcs';

@Injectable({
  providedIn: 'root'
})
export class PlanMasterService {
  private apiUrl: string;
  private apiURL : string;
  private apiUrL: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL + '/api/PlanMaster/';
    this.apiURL = environment.apiURL;
    this.apiUrL= environment.apiURL + '/api/Ewaybill/';
  }

  GenerateEwayBYIRN(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrL + 'GenerateEwayBYIRN' , payload);
  }
  // http://localhost:26265/api/PlanMaster/GetODDetailsList?OrderId=144
  GetODDetailsList(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'GetODDetailsList' , payload);
  }
  
  // getWarehouseList(): Observable<SelectItem[]> {
  //   return this.httpClient.get<SelectItem[]>(this.apiUrl + 'GetWarehouseList');
  // } --old api for warehouse //simran

  getWarehouseList(): Observable<SelectItem[]> {
    
    return this.httpClient.get<SelectItem[]>(this.apiURL + 'api/DeliveyMapping/GetWarehouseIsCommon');
  }
  
  getSpecificWarehouses(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL + 'api/Warehouse/getSpecificWarehouses');
  } 

  getClusterList(warehouseId: number): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + 'GetClusterList/' + warehouseId);
  }

  getTripList(warehouseId: number): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + 'GetTripList/' + warehouseId);
  }

  getTrip(tripMasterId: number): Observable<TripPlannerConfirmedMasterVM> {
    return this.httpClient.get<TripPlannerConfirmedMasterVM>(this.apiUrl + 'GetTripV1/' + tripMasterId);
  }
  // getTripV1(tripMasterId: number): Observable<TripPlannerConfirmedMasterVM> {
  //   return this.httpClient.get<TripPlannerConfirmedMasterVM>(this.apiUrl + 'GetTripV1/' + tripMasterId);
  // }
  getTripPlannerOrderList(tripPlannerMasterId: number): Observable<TripPlannerConfirmedOrderVM[]> {
    return this.httpClient.get<TripPlannerConfirmedOrderVM[]>(this.apiUrl + 'GetTripPlannerOrderList/' + tripPlannerMasterId);
  }

  getTripPlannerConfirmedOrderList(tripPlannerConfirmedMasterId: number): Observable<TripPlannerConfirmedOrderVM[]> {
    return this.httpClient.get<TripPlannerConfirmedOrderVM[]>(this.apiUrl + 'GetTripPlannerConfirmedOrderList/' + tripPlannerConfirmedMasterId);
  }
  getTripInfo(warehouseId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'GetTripInfo/' + warehouseId );
  }


  saveTripPlannerConfirmedMaster(tripPlannerMasterId: number): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + 'SaveTripPlannerConfirmedMaster/' + tripPlannerMasterId);
  }

  updateOrder(tripPlannerConfirmedMasterId: number, orderList: TripPlannerConfirmedOrderVM[], isNewPickerOrder: boolean): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'UpdateOrder/' + tripPlannerConfirmedMasterId  + '/' + isNewPickerOrder, orderList);
  }
  getVehicleMappingList(warehouseId,TripDate): Observable<VehicleDboyDriverDDs> {
    return this.httpClient.get<VehicleDboyDriverDDs>(this.apiUrl + 'GetVehicleMappingList?wareHouseId=' + warehouseId + '&TripDate=' + TripDate);
  }
  
  // getAgentList(clusterId: number): Observable<SelectItem[]> {
  //   return this.httpClient.get<SelectItem[]>(this.apiUrl + 'GetAgentList/' + clusterId);
  // }

  getAgentMappingList(warehouseId): Observable<VehicleDboyDriverDDs> {
    return this.httpClient.get<VehicleDboyDriverDDs>(this.apiUrl + 'GetAgentMappingList/' +warehouseId);
  }
  getAgentMappingListV2(warehouseId: number,tripPlannerMasterId:number,fleetType:string): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'GetAgentMappingListV3/' + warehouseId + '/'+ tripPlannerMasterId +'/'+fleetType );
  }
  getClusterWarehouseWise(WarehouseId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'GetClusterWarehouseWise?WarehouseId=' + WarehouseId);
  }
  getClusterTripInfo(WarehouseId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'GetClusterTripInfo/' + WarehouseId );
  }

  updateTrip(master: TripPlannerConfirmedMasterVM ,IsNewPickerOrder:boolean): Observable<boolean> {
    
    return this.httpClient.post<boolean>(this.apiUrl + 'UpdateTrip'+ '/' + IsNewPickerOrder, master  );
  }

  getAllOrderList(master: TripPlannerOrderPager): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'GetAllOrderList', master);
  }

  createTrip(tripPlannerConfirmedMasterId: number, reportingTime: Date, startKm: number, lateReportingTimeInMins : number, penaltyCharge: number,DriverId:number,VehicleId:number,AgentId:number,DboyId:number,TripDate:string,IsReplacementVehicleNo : boolean,ReplacementVehicleNo:string, vehicleFare:number): Observable<any> {
    debugger
    let param = {
      tripPlannerConfirmedMasterId: tripPlannerConfirmedMasterId,
      startingKm: startKm,
      reportingTime: reportingTime,
      lateReportingTimeInMins: lateReportingTimeInMins,
      penaltyCharge: penaltyCharge,
      DriverId:DriverId,
      VehicleId:VehicleId,
      AgentId:AgentId,
      DboyId:DboyId,
      TripDate:TripDate,
      IsReplacementVehicleNo : IsReplacementVehicleNo,
      ReplacementVehicleNo : ReplacementVehicleNo,
      VehicleFare:vehicleFare
    }
    return this.httpClient.post<any>(this.apiUrl + 'CreateTrip', param);
  }

  getWarehouseVehicleDetail(warehouseId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'GetWarehouseVehicleDetail/' + warehouseId);
  }
  extraVehicleRequired(warehouseId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'ExtraVehicleRequired/warehouseId?warehouseId=' + warehouseId);
  }
  availableVehiclesDetails(warehouseId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'AvailableVehiclesDetails/warehouseId?warehouseId=' + warehouseId);
  }
  vehiclesNotUtilized(warehouseId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'VehiclesNotUtilized/warehouseId?warehouseId=' + warehouseId);
  }

  createCustomTrip(customTrip: CustomTrip): Observable<number> {
    return this.httpClient.post<number>(this.apiUrl + 'CreateCustomTripV1', customTrip);
  }

  createCustomTripV1(customTrip: CustomTrip): Observable<number> {
    return this.httpClient.post<number>(this.apiUrl + 'CreateCustomTripV1', customTrip);
  }

  generateInvoiceManifest(tripPlannerMasterId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'GenerateInvoiceManifest/' + tripPlannerMasterId);
  }

  getTripTouchPoints(tripPlannerMasterId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'GetTripTouchPoints/' + tripPlannerMasterId);
  }

  createPicker(tripPlannerConfirmedMasterId: number,dboyId : number,IsNewPicker:boolean): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'CreatePicker?tripPlannerConfirmedMasterId=' + tripPlannerConfirmedMasterId + '&dboyId=' + dboyId+ '&IsNewPicker='+IsNewPicker,null);
  }
  getVechicleAttandanceList(payload){
    debugger
    return this.httpClient.post<any[]>(this.apiUrl + 'GetAttandanceList',payload)
  }
 
  InsertVechicleAttandance(payload){
    return this.httpClient.post<any[]>(this.apiUrl + 'InsertVechicleAttandance',payload)
  }
  getVechicleNumberList(WarehouseId){
    return this.httpClient.get<any[]>(this.apiUrl+'VechicleNumberList?WarehouseId='+ WarehouseId)
  }
  getAllVehicleReportOfDate(vechicleExportDC){
    return this.httpClient.post<any[]>(this.apiUrl+'GetAllVehicleReportOfDate', vechicleExportDC)
  }

  getVehicleNumberListByWids(WarehouseIds){
    return this.httpClient.post<any[]>(this.apiUrl+'GetVehicleNumberList', WarehouseIds)
  }

  deleteVechicleAttandance(AttandanceId,userid,VehicleMasterId){
    return this.httpClient.get<any[]>(this.apiUrl+'DeleteVechicleAttandance?userid='+userid+'&AttandanceId='+AttandanceId +'&VehicleMasterId=' + VehicleMasterId)
  } 
  historyVechicleAttandanceList(VehicleMasterId,Skip,Take){
    return this.httpClient.get<any[]>(this.apiUrl+'HistoryVechicleAttandanceList?VehicleMasterId='+VehicleMasterId+'&Skip='+Skip+'&Take='+Take);
  }

  updateTodayAttandance(WarehouseId){
    return this.httpClient.get<any[]>(this.apiUrl+'UpdateTodayAttandance?WarehouseId='+ WarehouseId)
  }

  updateFutureAttandance(payload){
    return this.httpClient.post<any[]>(this.apiUrl+'ActiveStatuswiseAttandance',payload)
  }
  
  getFutureAttandanceDate(WarehouseId,VehicleMasterId,month,year){
    return this.httpClient.get<any[]>(this.apiUrl+'FutureAttandanceData?WarehouseId='+WarehouseId+'&VehicleMasterId='+VehicleMasterId + '&month=' + month+'&year='+year)
  }


  IsAddNewPickerAllowed(tripPlannerConfirmedMasterId){
    return this.httpClient.get<any[]>(this.apiUrl+'IsAddNewPickerAllowed?tripPlannerConfirmedMasterId='+tripPlannerConfirmedMasterId)
  }


  IsAddNewPickerFinalized(tripPlannerConfirmedMasterId){
    return this.httpClient.get<any[]>(this.apiUrl+'IsAddNewPickerFinalized?tripPlannerConfirmedMasterId='+tripPlannerConfirmedMasterId)
  }
  exportVehicleAttandanceList(payload){
    return this.httpClient.post<any[]>(this.apiUrl + 'ExportTripPlannerVechicleAttandanceList',payload)
  }
  exportTripVechicleList(payload){
    return this.httpClient.post<any[]>(this.apiUrl + 'ExportTripVechicleList',payload)
  }
  getFleetType(warehouseid){
    return this.httpClient.get<any[]>(this.apiUrl + 'GetFleetTypeList?WarehouseId='+warehouseid)
  }
  addNewAdhocVehicle(payload){
    return this.httpClient.post<any[]>(this.apiUrl + 'AddNewAdhocVehicle',payload)
  }
  getAdhocFleetList(warehouseid){
    return this.httpClient.get<any[]>(this.apiUrl + 'GetAdhocFleetList?WarehouseId='+warehouseid)
  }

  getFixedCost(vehicleMasterId){
    return this.httpClient.post<number>(this.apiUrl + 'GetFixedCost?vehicleMasterId='+vehicleMasterId, null)
  }
  
  getStoreType(warehouseid){
    return this.httpClient.get<number>(environment.apiURL + '/api/ZilaDeliveryApp/GetStoreType?warehouseId='+warehouseid)
  }


  // http://localhost:26265/api/PlanMaster/GetAdhocFleetList?WarehouseId=7
  // http://localhost:26265/api/PlanMaster/AddNewAdhocVehicle           (post)

}

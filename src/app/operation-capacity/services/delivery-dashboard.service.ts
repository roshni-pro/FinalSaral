import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyRecord } from 'dns';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CustomerLocationDiffDc } from '../interface/customer-location-diff-dc';
import { TripOrderDetail } from '../interface/trip-order-detail';
import { TripSummary } from '../interface/trip-summary';
import { TripTouchPoint } from '../interface/trip-touch-point';
import { TripTouchPointInformation } from '../interface/trip-touch-point-information';
@Injectable({
  providedIn: 'root'
})
export class DeliveryDashboardService {
  private apiUrl: string;
  private apiURL: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL + '/api/DeliveyMapping/';
    this.apiURL = environment.apiURL;
  }

  getCityList(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiUrl +'GetCityList');
  }
  getWarehoueList(cityId): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiUrl +'GetWarehoueList/cityId?cityId=' + cityId);
  }
  orderStatusCountList(warehoueId): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl +'OrderStatusCountList?warehoueId=' + warehoueId);
  }
  numberOfOrderClusterWise(warehoueId,flage): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl +'NumberOfOrderClusterWise?warehoueId=' + warehoueId + '&flage=' + flage);
  }
  numberOfOrderClusterWiseOrderlist(warehouseId,flage,Skip,Take): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl +'NumberOfOrderClusterWiseOrderlist?WarehouseId=' + warehouseId + '&flage=' + flage +'&Skip=' + Skip +'&Take=' + Take);
  }
  getOfferOnOrder(OrderId): Observable<any>{
    return this.httpClient.get<any>(this.apiURL +'/api/OrderDispatchedDetails?id=' + OrderId);
  }
  getTrips(warehouseId, filterType: number): Observable<any[]>{
    return this.httpClient.get<any>(this.apiURL +'/api/DeliveryDashboard/GetTrips?warehouseId=' + warehouseId + '&filterType=' + filterType);
  }
  getTripSummary(tripMasterId): Observable<TripSummary[]>{
    return this.httpClient.get<TripSummary[]>(this.apiURL +'/api/DeliveryDashboard/GetTripSummary?tripMasterId=' + tripMasterId);
  }
  getZilaTripSummary(tripMasterId): Observable<TripSummary[]>{
    return this.httpClient.get<TripSummary[]>(this.apiURL +'/api/ZilaDeliveryApp/ZilaGetTripSummary?tripMasterId=' + tripMasterId);
  }

  getClusterWiseInfo(ClusterId): Observable<any>{
    return this.httpClient.get<any>(this.apiURL +'/api/DeliveryDashboard/GetClusterWiseInfo/ClusterId?ClusterId=' + ClusterId);
  }
  getTouchPoints(tripPlannerMasterId): Observable<TripTouchPointInformation>{
    return this.httpClient.get<TripTouchPointInformation>(this.apiURL +'/api/DeliveryDashboard/GetTouchPoints/' + tripPlannerMasterId);
  }
  getVehicleLiveDetails(warehouseId: number): Observable<any>{
    return this.httpClient.get<any>(this.apiURL +'/api/DeliveyMapping/GetVehicleLiveDetails?WarehouseId=' + warehouseId);
  }

  getVehicleLiveDetailsList(warehouseId: number, status: number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL +'/api/DeliveyMapping/GetVehicleLiveDetailsList?WarehouseId=' + warehouseId + "&CurrentStatus=" +status);
  }

  getLiveTrips(warehouseId): Observable<any[]>{
    return this.httpClient.get<any>(this.apiURL +'/api/DeliveryDashboard/GetLiveTripList?warehouseId=' + warehouseId);
  }

  getOldTrips(warehouseId: number, tripDate: string): Observable<any[]>{
    debugger;
    return this.httpClient.get<any>(this.apiURL +'/api/DeliveryDashboard/GetLiveTripList?warehouseId=' + warehouseId + '&tripTime=' + tripDate);
  }

  getLiveTrackerTripHistory(tripPlannerMasterId: number): Observable<any[]>{
    return this.httpClient.get<any>(this.apiURL +'/api/DeliveryDashboard/GetLiveTrackerTripHistory/' + tripPlannerMasterId);
  }
  IsRunningUtility(warehouseId:number): Observable<any>{
    return this.httpClient.get<any>(this.apiURL +'/api/OrderProcess/AutoReadyToPick?warehouseId='+warehouseId);
  }

  getTripOrderDetail(tripPlannerConfirmDtailId: number): Observable<TripOrderDetail[]>{
    return this.httpClient.get<any[]>(this.apiURL +'/api/DeliveryDashboard/GetTripOrderDetail/' + tripPlannerConfirmDtailId);
  }

  getCustomerList(warehouseId: number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL +'/api/DeliveryDashboard/GetCustomerList/warehouse/' + warehouseId );
  }

  getCustomerLocation(customerId: number): Observable<CustomerLocationDiffDc>{
    return this.httpClient.get<CustomerLocationDiffDc>(this.apiURL +'/api/DeliveryDashboard/GetCustomerLocation/' +customerId);
  }

  changeCustomerLocation(customerId: number, customerUnloadLocationId: number): Observable<boolean>{
    return this.httpClient.get<boolean>(this.apiURL +'/api/DeliveryDashboard/ChangeCustomerLocation/customer/' +customerId + "/customerUnloadLocation/" + customerUnloadLocationId);
  }

  RemoveCustomerUnloadLocation(customerUnloadLocationId: number): Observable<boolean>{
    return this.httpClient.get<boolean>(this.apiURL +'/api/DeliveryDashboard/RemoveCustomerUnloadLocation/' +customerUnloadLocationId);
  }

  searchSKP_KPP_OwnerList(Warehouseid,TripType ): Observable<boolean>{
    return this.httpClient.get<boolean>(this.apiURL +'/api/DeliveryApp/SearchSKP_KPP_OwnerList?Warehouseid=' +Warehouseid + '&TripType=' + TripType);
  }

  generateNonLastMileTrip(tripParam): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/OrderProcess/GenerateNonLastMileTrip' ,tripParam);
  }
  LMDDashboardPart1(LMDDashboardPart1InputDc): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDDashboardPart1' ,LMDDashboardPart1InputDc);
  }
  LMDDashboardPart2(LMDDashboardPart1InputDc): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDDashboardPart2' ,LMDDashboardPart1InputDc);
  }
  LMDTransporterGet(WarehouseIds): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDTransporterGet' ,WarehouseIds);
  }
  LMDDashboardPart3(LMDDashboardPart1InputDc): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDDashboardPart3' ,LMDDashboardPart1InputDc);
  }
  LMDDashboardPart4(LMDDashboardPart1InputDc): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDDashboardPart4' ,LMDDashboardPart1InputDc);
  }
  LMDDashboardExportAll(LMDDashboardPart1InputDc): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDDashboardExportAll' ,LMDDashboardPart1InputDc);
  }
  LMDDashboardExportSummary(LMDDashboardPart1InputDc): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDDashboardExportSummary' ,LMDDashboardPart1InputDc);
  }
  LMDDashboardExportOrder(LMDDashboardPart1InputDc): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDDashboardExportOrder' ,LMDDashboardPart1InputDc);
  }
  LMDChart(LMDDashboardPart1InputDc): Observable<any>{
    return this.httpClient.post<any>(this.apiURL +'/api/DeliveryOptimizationReport/LMDChart' ,LMDDashboardPart1InputDc);
  }
}

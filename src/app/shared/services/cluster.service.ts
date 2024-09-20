import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { ClusterExecutiveBeat } from 'app/executive-assignment/Components/executiveassignment/executiveassignment.component';


@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  apiURL: string;
  // PeopleAll:any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetAllCluster(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/cluster/all');
  }
  ClusterGetByID(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetById?id=' + id);
  }
  // ManagerName():  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/cluster/GetActiveAgentsForCluster');
  //  }
  getClusterBywarehouse(ExecutiveId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ClusterStoreExecutive/GetExecutiveWiseClusterList/' + ExecutiveId);
  }

  addCluster(items): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/cluster/add  ', items);
  }



  UpdateCluster(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/cluster/update', details);
  }


  DeleteCluster(id: number): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/cluster/delete?id=' + id);
  }

  ClusterSearchData(searchdata): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/cluster/Citybased?cityid=' + searchdata.CityId);
  }

  // AddClusterWarehouse(CityId): Observable<any> {

  //   return this.http.get<any>(this.apiURL + '/api/cluster/GetCitWise?cityId=' + CityId);
  // }
  AddClusterWarehouse(CityId, active): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetCitWise?cityId=' + CityId + ' ' + '&active=' + active);
  }


  TotalActiveAgent(searchdata): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/cluster/GetagentCount?cityid=' + searchdata.CityId);
  }

  GetMap(cityid): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/cluster/GetClusterCityWise?cityid=' + cityid);
  }

  GetVehicleClusterWise(clusterId, warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetVehicles?clusterId=' + clusterId + ' ' + '&warehouseId=' + warehouseId);
  }

  GetAgentClusterWise(ClusterId, WarehouseId): Observable<any> {
    //  return this.http.get<any>(this.apiURL + '/api/cluster?clusterId=' +clusterId + '&&warehouseId=' +warehouseId );
    return this.http.get<any>(this.apiURL + '/api/cluster/GetPeoples?clusterId=' + ClusterId + '&warehouseId=' + WarehouseId);
  }
  addAgentCluster(Details): Observable<any[]> {

    return this.http.post<any[]>(this.apiURL + '/api/cluster?cla=', Details);
  }
  AddCity(Data): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/cluster/addCity', Data);
    // return this.http.post<any>(this.apiURL + '/api/cluster/GetCitWise?cityId='+CityId);
  }

  Activeagent(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Agents/Activeagent?WarehouseId=?' + WarehouseId);
  }

  GetActiveCount(CityId): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/cluster/GetActiveCount?cityid=' + CityId);
  }
  GetcustCount(CityId): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/cluster/GetcustCount?cityid=' + CityId);
  }

  GetagentCount(CityId): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/cluster/GetagentCount?cityid=' + CityId);
  }


  AddVehicles(clv): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/cluster/addClusterVehicleV1', clv);
  }

  AddAgents(cla): Observable<any[]> {
    console.log('cla is: ', cla);
    //  return this.http.post<any[]>(this.apiURL + '/api/cluster/addAgentClusterV7?cla=',cla);
    return this.http.post<any[]>(this.apiURL + '/api/cluster/addAgentCluster', cla);
  }

  GetCityLatLong(CityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetCityLatLong?cid=' + CityId);
  }
  GetWarehouseByCity(CityId: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetWarehouseByCity?cid=' + CityId);
  }
  

  exportFullCluster(CityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetCitWise?cityId=' + CityId);
  }

  GetClusterWiseCustomerIndividual(ClusterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetClusterWiseCustomerIndividual?clustid=' + ClusterId)
  }

  GetCoordingate(ClusterId): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/cluster/GetCoordinate?clstid=' + ClusterId)
  }

  GetCentreLtLgs(ClusterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetCentreLtLg?clustid=' + ClusterId)
  }

  GetClusterInfo(ClusterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetClusterInfo?clustrId=' + ClusterId)
  }

  updatepolygon(polygon: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/cluster/updatepolygon', polygon);
  }
  GetwarehouseLatLong(Cityid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetwarehouseLatLong?cityid=' + Cityid);
  }
  GetCustomerLatLong(Cityid): Observable<any[]> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetCustomerLatLong?cityid=' + Cityid);
  }

  savepolygon(clusterpolygonlist: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/cluster/updatepolygonList?clusterpolygonlist=', clusterpolygonlist);
  }

  ActiveInactiveClusters(ClusterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/UpdateActiveClusters?ClusterId=' + ClusterId);
  }


  warehousecitybased(cityid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetWarehouseCity/?cityid=' + cityid);
  }



  InActiveInactiveClusters(ClusterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/UpdateActiveClusters?ClusterId=' + ClusterId);
  }

  RefereshCityCluster(Cityid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/RefereshCityCluster?cityId=' + Cityid);
  }


  GetClusterRefreshData(Cityid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetClusterRefreshData?cityId=' + Cityid);
  }

  GetClusterRefreshDataValidation(Cityid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetClusterRefreshDataValidation?cityId=' + Cityid);
  }

  GetClusterExportData(clusterId) {

    return this.http.get<any>(this.apiURL + '/api/cluster/getExportCluster?clusterId=' + clusterId);

  }

  updatecustomerCluster(clusterId, isUpdateExec: boolean): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/cluster/UpdateClusterCustomer?clusterid=' + clusterId + '&isChangeExecute=' + isUpdateExec);
  }

  getCurrentClusterAgent(clusterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/getCurrentClusterAgent?clusterid=' + clusterId);
  }


  setSalesExecutiveToCluster(executiveData) {

    return this.http.get<any[]>(this.apiURL + '/api/cluster/setSalesExecutiveToCluster?executiveId=' + executiveData.PeopleID + '&clusterid=' + executiveData.clusterId + '&updateAllCustomersExecutives=' + executiveData.updateAllCustomersExecutives);
  }

  InsertStoreMapped(StoreUpdateInsert): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ClusterStoreExecutive', StoreUpdateInsert);
  }
  UpdateStoreMapped(StoreUpdateInsert): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/ClusterStoreExecutive', StoreUpdateInsert);
  }
  DeleteStoreMapped(Id): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/ClusterStoreExecutive?Id='+ Id);
  }
  

  GetClusterStoreExecutive(WarehouseId) {
  
    return this.http.get<any[]>(this.apiURL +'/api/ClusterStoreExecutive?WarehouseId=' + WarehouseId);

  }


  getExecutiveList(warehouseId) {
    return this.http.get<any[]>(this.apiURL +'/api/ClusterStoreExecutive/GetExecutiveList/' + warehouseId);
  }

  assignBeat(beatList): Observable<string>{
    return this.http.post<string>(this.apiURL +'/api/MobileExecutive/AssignBeatFromUploader' , beatList);

    // return this.http.post<string>(this.apiURL +'/api/CustomerExecutiveMapping/AssignBeat' , beatList);
  }

  customerList(executiveId: number): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL +'/api/CustomerExecutiveMapping/CustomerList/' + executiveId);
  }

  GetMappedClusterExecutiveList(ClusterId) {
 
    return this.http.get<any[]>(this.apiURL +'/api/ClusterStoreExecutive/Mapped?ClusterId=' + ClusterId);
  }

  getMappedCustomerOnCluster(SearchMappedExeOnClusterdata): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/MobileExecutive/MappedCustomerOnCluster',SearchMappedExeOnClusterdata);
  }
  ValidatingAssignBeat(ValidatingAssignBeat): Observable<string>{
    return this.http.post<string>(this.apiURL +'/api/MobileExecutive/ValidatingAssignBeat' , ValidatingAssignBeat);
  }

  ExecutiveBeatUpload(BeatUpload): Observable<string>{
    return this.http.post<string>(this.apiURL +'/api/MobileExecutive/ExecutiveBeatUpload' , BeatUpload);
  }
  ClearStoreExecutiveCacheKey(): Observable<string>{
    return this.http.get<string>(this.apiURL +'api/ClusterStoreExecutive/ClearStoreExecutiveCacheKey');
  }
  ExportExecutiveMapping(): Observable<string>{
    return this.http.get<string>(this.apiURL +'/api/MobileExecutive/GetExecutiveChannelMapping');
  }
}

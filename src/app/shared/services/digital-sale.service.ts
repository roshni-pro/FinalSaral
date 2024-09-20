import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class DigitalSaleService {
  apiURL: string;
  User: any;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  getRewardItemItem(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubCatTarget/RewardItem');
  }
  getItembasedonCitySuCatTarget(cityid, SubCatId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubCatTarget/GetItemCitybasedSubcattarget?CityId=' + cityid + '&SubCatId=' + SubCatId);
  }

  PostSubCatTarget(itemobject): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SubCatTarget/PostSubCatTargetData', itemobject);
  }
  CheckIfExist(object): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SubCatTarget/CheckIfExist', object);
  }

  GetAllSubcategoryTarget(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubCatTarget/GetAllSubcategoryTarget');
  }
  GetAllSubcategorytarget(datatoPost): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SubCatTarget/GetAllSubcategoryTarget', datatoPost);
  }

  //  for uploading target customer skcodes

  ImportTargetCust(Id,formData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SubCatTarget/UploadSubCategoryCustomerTarget?Id='+Id, formData);
  }


  GetAllAgentPitch(object): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/AgentPitch/GetAllAgentPitch', object);
  }

  GetActiveWarehouseSaleExecutives(WarehouseId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/AsignDay/Activesalesexe?WarehouseId=' + WarehouseId);
  }
  GetBrandTarget(SubcatBarndId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubCatTarget/GetBrandTarget?subCatTargetBrandId=' + SubcatBarndId);
  }

  GetBrandCustomerTarget(SubcatBarndId): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/SubCatTarget/GetBrandCustomerTarget?subCatTargetBrandId=' + SubcatBarndId);
  }
  getMRPlistItem(cityId, subCatId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/digitalsale/CitySubcatMRPItem?CityId=' + cityId + '&SubCatId=' + subCatId);
  }

  GetPrimeItem(itemMultiMrpId, cityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/digitalsale/GetPrimeItem?ItemMultiMrpId=' + itemMultiMrpId + '&CityId=' + cityId);
  }

  UpdatePrimeItems(primeItemlist): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/digitalsale/UpdatePrimeItems', primeItemlist);
  }

  exportPrimeItemlist(cityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/digitalsale/GetCityAllPrimeItem?CityId=' + cityId);
  }
  InactiveBrandCustomerTarget(SubcatBarndDC): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SubCatTarget/InactiveBrandCustomerTarget', SubcatBarndDC);
  }
  GetCluster(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/GetClusterWiseWareHouse?warehouseid=' + Id);
  }
  GetSalesExecutive(WhId): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/ClusterStoreExecutive/GetExecutiveList/' + WhId)
  }
  GetSalesDashboardReport(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SalesApp/SalesDashboardReport', data)
  }
  GetExecuteBeatTargetList(warehouseId, ClusterId, skip, take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ExecuteBeatTarget/ExecuteBeatTargetList?warehouseId=' + warehouseId + '&ClusterId=' + ClusterId + '&skip=' + skip + '&take=' + take);
  }
  SaveExecutiveBeatTarget(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ExecuteBeatTarget/SaveExecuteBeatTarget', data)
  }
  CustomerCount(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ExecuteBeatTarget/ClusterCustomerCount?clustId=' + Id);
  }
  ExecutiveBeatById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ExecuteBeatTarget/ExecutiveBeatById?objectId=' + Id);
  }
  DeleteExecutiveBeat(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ExecuteBeatTarget/DeleteExecutiveBeat?objectId=' + Id);
  }
  ActiveInActiveExecutiveBeat(Id, status): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ExecuteBeatTarget/ActiveInActiveExecutiveBeat?objectId=' + Id + '&status=' + status);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { StoreOwnerDc } from '../components/manage-store/manage-store.component';
import { SearchMappedExeOnClusterDc } from '../interfaces/SearchMappedExeOnClusterDc';
import { StoreViewModel } from '../interfaces/store';
import { StoreBrandDc } from '../interfaces/store-brand-dc';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  apiUrl: string;
  apiUrl2: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL + '/api/Store/';
    this.apiUrl2 = environment.apiURL;
  }

  getCategoryList(): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + 'GetCategoryList');
  }

  getSubCategoryList(categoryId: number): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + 'GetSubCategoryList/' + categoryId);
  }
  

  getBrand(subCategoryId: string): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + 'GetBrand/' + subCategoryId);
  }
  getBrandList(subCategoryId: string): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl2 + '/api/SubsubCategory/GetSubSubCategoryBySubCategoryId?subCatID=' + subCategoryId);
  }
  // getBrandToDisplay(brandCategoryMappingIdList: string): Observable<StoreBrandDc[]>{
  //   return this.httpClient.get<StoreBrandDc[]>(this.apiUrl + 'GetBrandToDisplay/' + brandCategoryMappingIdList);
  // }

  getBrandToDisplay(brandCategoryMappingIdList: any): Observable<any[]> {

    var datatopost =
    {
      brandCategoryMappingIdList: brandCategoryMappingIdList
    }

    return this.httpClient.post<any[]>(this.apiUrl + 'GetBrandToDisplay', datatopost);
  }

  saveStore(store: StoreViewModel): Observable<number> {
    return this.httpClient.post<number>(this.apiUrl + 'SaveStore', store);
  }

  getStoreList(): Observable<StoreViewModel[]> {
    return this.httpClient.get<StoreViewModel[]>(this.apiUrl + 'GetStoreList');
  }

  getBrandUsingStoreId(storeId: number): Observable<StoreBrandDc[]> {
    return this.httpClient.get<StoreBrandDc[]>(this.apiUrl + 'GetBrandUsingStoreId/' + storeId);
  }

  getStoreById(storeId: number): Observable<StoreViewModel> {
    return this.httpClient.get<StoreViewModel>(this.apiUrl + 'GetStoreById/' + storeId);
  }

  getPeopleList(keyword): Observable<StoreOwnerDc[]> {
    return this.httpClient.get<StoreOwnerDc[]>(this.apiUrl + 'GetPeopleList?keyword=' + keyword);
  }

  getOwnerById(ownerId: number): Observable<StoreOwnerDc> {
    return this.httpClient.get<StoreOwnerDc>(this.apiUrl + 'GetOwnerById/' + ownerId);
  }
  getOwnerBGetWarehouseWiseSaleLeadyId(warehouseId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'GetWarehouseWiseSaleLead?warehouseId=' + warehouseId);
  }
  getWarehouseStoreMapping(StoreId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'GetWarehouseStoreMapping?StoreId=' + StoreId);
  }
  postWarehouseStoreMapping(data): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'PostWarehouseStoreMapping' , data);
  }
  pUTtWarehouseStoreMapping(data): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + 'PUTtWarehouseStoreMapping' , data);
  }
  deleteWarehouseStoreMapping(Id: number): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + 'DeleteWarehouseStoreMapping?Id=' + Id);
  }
  
  
  
  
  // api/Store/GetStoreList
  GetStoreList(): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl2 + '/api/Store/GetStoreList');
  }

  // api/Warehouse/GetAllWarehouse
  GetWareHouseList(): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl2 + '/api/Warehouse/GetAllWarehouse');
  }

  // api/ClusterStoreBeatMapping/GetClusterListByWId/{WarehouseId}
  GetClusterList(WarehouseId): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl2 + '/api/MobileExecutive/GetClusterListByWId/'+WarehouseId);
  }

  // getClusterBywarehouse(ExecutiveId): Observable<any> {
  //   return this.httpClient.get<any>(this.apiUrl2 + 'api/ClusterStoreExecutive/GetExecutiveWiseClusterList/' + ExecutiveId);
  // }

  // api/ClusterStoreBeatMapping/StoreClusterExecutive
  StoreClusterExecutive(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl2 + '/api/MobileExecutive/StoreClusterExecutive' , payload);
  }

  getMappedCustomerOnCluster(SearchMappedExeOnClusterDc : SearchMappedExeOnClusterDc): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl2 + '/api/MobileExecutive/MappedCustomerOnCluster',SearchMappedExeOnClusterDc);
  }

  MappedCustomerOnStoreCluster(SearchMappedExeOnClusterDc : SearchMappedExeOnClusterDc): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl2 + '/api/MobileExecutive/MappedCustomerOnStoreCluster',SearchMappedExeOnClusterDc);
  }

  validatingAssignBeat(ValidatingAssignBeat): Observable<string>{
    return this.httpClient.post<string>(this.apiUrl2 +'/api/MobileExecutive/ValidatingAssignBeat' , ValidatingAssignBeat);
  }
  AssignBeat(beatList): Observable<string>{
    return this.httpClient.post<string>(this.apiUrl2 +'/api/MobileExecutive/AssignBeatFromUploader' , beatList);
  }

}

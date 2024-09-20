import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleIncentiveService {
  apiURL: string;
  User:any;
  comment : string;
  
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  
  }

  GetExecutiveList(WarehouseId: number): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(this.apiURL + '/api/SalesAppReport/GetExecutiveList/' + WarehouseId);
  }
  GetExecutiveListV1(WarehouseId:number,storeId:number): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(this.apiURL + '/api/SalesIncentive/GetExecutiveList/' + WarehouseId +'/'+storeId);
  }
  SubCategoriesList(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Masters/SubCategoriesList');
  }
  getSubCat(): Observable<any[]> { 
    return this.http.get<any[]>(this.apiURL + '/api/Masters/SubCategoriesList');
  }
  getStoreSubCat(StoreId:number): Observable<any[]> { 
    return this.http.get<any[]>(this.apiURL + '/api/SalesIncentive/GetStoreBySubCategoryList?StoreId=' + StoreId);
  }
  getCategory(catList: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Masters/CategoriesList',catList);
  }
  subcategoryIdBrandList(subcatMappingIdlist: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Masters/subcategoryIdBrandList',subcatMappingIdlist);
  }
  GetBrandsWiseItemList(warehouseId:number,BrandId: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/SalesAppReport/GetBrandsWiseItemList/' + warehouseId, BrandId);
  }
  GetsalesCommissionCatMaster(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SalesAppReport/GetsalesCommissionCatMaster');
  }
  GetSalesCommissionEventMasterList(CommissionCatMasterId:number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SalesAppReport/GetSalesCommissionEventMasterList?CommissionCatMasterId='+CommissionCatMasterId);
  }
  AddSaleIncentive(dataTopost): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SalesIncentive/AddSaleIncentive',dataTopost);
  }
  GetSalesPersonCommissionList(dataTopost): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/SalesIncentive/GetSalesPersonCommissionList',dataTopost);
  }
  DeleteEventbyExecutive(SalesComissionTransactionId:number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SalesIncentive/DeleteEventbyExecutive?SalesComissionTransactionId='+SalesComissionTransactionId);
  }
  StopEventbyExecutive(SalesComissionTransactionId:number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SalesIncentive/StopEventbyExecutive?SalesComissionTransactionId='+SalesComissionTransactionId);
  }
  Export(dataTopost): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SalesIncentive/Export',dataTopost);
  }
}





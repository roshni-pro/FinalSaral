import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DfrCfrService {
  apirUrl:any;
  constructor(private http:HttpClient) {
    this.apirUrl = environment.apiURL
   }

   getWarehouseList():Observable<any>{
     return this.http.get<any>(this.apirUrl + '/api/Warehouse/GetWarehouseWOKPP')
   }

   getCategoryList():Observable<any>{
    return this.http.get<any>(this.apirUrl + '/api/Masters/AllCategories')
   }

   getSubCategoryList(id):Observable<any>{
    return this.http.post<any>(this.apirUrl + '/api/Masters/SubCategories',id)
   }

   getBuyerList(details):Observable<any>{
    return this.http.post<any>(this.apirUrl + '/api/BrandBuyer/BrandBuyerDetail',details)
   }

   getBrandList(brandData){
    return this.http.post<any>(this.apirUrl + '/api/Masters/Brands',brandData)
   }

   getCFRDashboardTableData(cfrDetails){
    return this.http.post<any>(this.apirUrl + '/api/Report/GetCFRDashBoardData',cfrDetails)
   }

   getDFRDashboardTableData(dfrDetails){
    return this.http.post<any>(this.apirUrl + '/api/Report/GetDFRDashBoardData',dfrDetails)
   }

   getnewDfrReportData(DFrDc){
    return this.http.post<any>(this.apirUrl+'/api/Report/DFRPendingOrderDetails',DFrDc)
   }

   getBuyerListFromWarehouseId(warehouseIds){
    return this.http.post<any>(this.apirUrl + '/api/BrandBuyer/GetBuyerBrandList',warehouseIds)
   }
}

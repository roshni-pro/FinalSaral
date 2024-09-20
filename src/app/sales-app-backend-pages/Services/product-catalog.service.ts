import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { data } from 'jquery';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {

apiURL:string;
  constructor(private http:HttpClient) {this.apiURL = environment.apiURL; }

  insertProductCatalog(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/InsertProductCatalog',data);
  }

  getAllProductCatalog(skip,take):Observable<any>{
    return this.http.get<any[]>(this.apiURL + 'api/MobileSales/GetAllProductCatalog?skip='+skip+"&take="+take);
  }
  getProdCatItemById(Warehouseid,SectionId):Observable<any>{
    return this.http.get<any[]>(this.apiURL + 'api/MobileExecutive/GetProdCatItemById?Warehouseid='+Warehouseid+"&SectionId="+SectionId);
  }
  deleteProductCatalogById(id:any):Observable<any>{
    
    return this.http.get<any>(this.apiURL+'api/MobileSales/DeleteProductCatalogItemById?id='+id);
  }
  updateProductCatalog(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/MobileSales/UpdateProductCatalog',data);
  }
  GetAllWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse');
  }
  getProductCatalogByWId(Id): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + 'api/MobileExecutive/GetProductCatalogByWId?WarehouseId='+Id);

  }

}


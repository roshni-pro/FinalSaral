import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandbuyerService {
  apiURL: string = environment.apiURL;
  User:any;
  comment : string;
  constructor(private http: HttpClient) {this.apiURL = environment.apiURL;}

  getSubCat(catList: any[]): Observable<any[]> {
    
    return this.http.post<any[]>(this.apiURL + '/api/Masters/SubCategories', catList);
  }

  
  getbrandsnew(subcatList: any[]): Observable<any[]> {
    
    return this.http.post<any[]>(this.apiURL + '/api/Masters/Brands', subcatList);
  }


  getbrands(catList: any[]): Observable<any[]> {
    
    return this.http.post<any[]>(this.apiURL + '/api/Masters/GetBrandbasedCatId', catList);
  }

  search(subcategorylist, whouseList): Observable<any[]> {
    
    let searchObject = {subcategorylist, whouseList}
    
    return this.http.post<any[]>(this.apiURL + '/api/BrandBuyer/search', searchObject);
  }  

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Masters/AllCategories');
  }

  
  // getbrands(): Observable<any[]> { 
  //   return this.http.post<any[]>(this.apiURL + '/api/itemMaster/GetBuyer');
  // }


  GetBuyer(): Observable<any[]> { 
    return this.http.get<any[]>(this.apiURL + '/api/itemMaster/GetBuyerRoleWise');
  }


  saveBrands(brandList: any[]): Observable<any[]> {
    
    return this.http.post<any[]>(this.apiURL + '/api/itemMaster/SaveBrands', brandList);
  }
  getDataTable(): Observable<any[]> {  
    return this.http.get<any[]>(this.apiURL + '/api/BrandBuyer/GetDataTable');
  }

  updateBrandBuyer(warehouseId, brandId, buyerId,IsSetAllWarehouse,whouseLists){
    
    let uri = '/api/BrandBuyer/UpdateBrandBuyer/wid/{warehouseId}/brandId/{brandId}/buyerId/{buyerId}/IsSetAllWarehouse/{IsSetAllWarehouse}';
    uri = uri.replace('{warehouseId}', warehouseId);
    uri = uri.replace('{brandId}', brandId);
    uri = uri.replace('{buyerId}', buyerId);
    uri =uri.replace('{IsSetAllWarehouse}', IsSetAllWarehouse);
    uri =uri.replace('{warehouseIds}', whouseLists);
    return this.http.post<any[]>(this.apiURL + uri,whouseLists);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaledefaultcategoryService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  SaveSaleDefaultCategory(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SaleDefaultCategory/category', data);
  }

  GetCategoryList(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SaleDefaultCategory/GetSaleDefaultCategoryList')
  }

  Removebrand(BrandId):Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SaleDefaultCategory/BrandRemove?Id=' + BrandId)
  }
  //========================
  getCategoryList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Store/GetCategoryList');
  }

  getSubCategoryList(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubCategory/GetSubCategoryByCategoryId?catId=' + categoryId);
  }

  getBrand(subCategoryId,SubCategoryId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/BlockBrand/GetSubSubCategoryBySubCategoryId?Categoryid=' + subCategoryId+'&SubCategoryId='+SubCategoryId);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClearanceNonSellableService {
  apiURL: string;
  constructor(private http: HttpClient) {this.apiURL = environment.apiURL; }
  
  GetCategoryList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/ClearanceNonSaleable/ClearanceNonConfigPageCategoryList');
 }
 
 getSubCategoryList(categoryId: number): Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/SubCategory/GetSubCategoryByCategoryId?catId=' + categoryId);
}

 getBrand(CategoryId,SubCategoryId): Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/BlockBrand/GetSubSubCategoryBySubCategoryId?Categoryid=' + CategoryId+'&SubCategoryId='+SubCategoryId);
}

getItems(categoryid,subcategoryid,subsubcategoryid): Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + 'api/Clearance/GetItemList?categoryid=' + categoryid+'&subcategoryid='+subcategoryid+'&Brandid='+subsubcategoryid);
}
UpdateBulkData(data:any){
  return this.http.post<any[]>(this.apiURL + '/api/ClearanceNonSaleable/ClearanceNonConfigPageUpdateShelfLife',data);
}
SearchDataList(data:any){
  return this.http.post<any[]>(this.apiURL + '/api/ClearanceNonSaleable/ClearanceNonConfigPageListItems',data);
}
}

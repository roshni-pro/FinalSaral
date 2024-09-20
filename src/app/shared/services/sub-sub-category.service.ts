import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubSubCategoryService {
  [x: string]: any;
  GetAllCategory() {
    throw new Error("Method not implemented.");
  }
  GetAllType() {
    throw new Error("Method not implemented.");
  }
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
   
  GetAllSubSubCategory():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubsubCategory');
  }
  NewGetAllSubSubCategory():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubsubCategory/Allsubsubcategory');
  }
  GenerateSubSubCode():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubsubCategory/GenerateSubSubCode');
  }  
  GetByID(ID):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubsubCategory/GetByID?ID='+ID);
  }
  addSubSubCategory(SubSubCategory): Observable<any> {
    // return this.http.post<any>(this.apiURL + '/api/SubsubCategory/add', SubSubCategory);
    return this.http.post<any>(this.apiURL + '/api/SubsubCategory', SubSubCategory);
  }
  
  UpdateSubSubCategory(data): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/SubsubCategory' , data);
  }
  
  GetCategoryByBrand(ssid,sid):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ssitem/GetCategoryByBrand?subsubcategoryId='+ssid+ '&subCategoryId='+sid);
  }
  GetSubSubCode():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubsubCategory/GenerateSubSubCode');
  }
  GetAllSubCat():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubCategory/getallsubcategory');
  }
  GetSubCategory():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubCategory/GetSubCategoryMappingID');
  }
  DeleteSubSubCategory(ID): Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/SubsubCategory?ID='+ ID);
     return this.http.delete<any>(this.apiURL + '/api/SubsubCategory/?id='+ ID);
    
  }

  UploadImage(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadSubSubCategoryImageV7',src);
  }
  newUploadImage(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadSubSubCategoryImage',src);
  }

  GetSubSubCategoryBySubCategoryId(id):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubsubCategory/GetSubSubCategoryBySubCategoryId?subCatID='+id);
  }

  GetBrandBySubCategoryId(id):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubsubCategory/GetBrandBySubCategoryId?subCatID='+id);
  }

  GetItemByBrandIds(brandIds,cityId): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SubsubCategory/GetItemByBrandIds?cityId='+cityId,brandIds);
  }

  GetFreeItemsByBrandIds(brandIds,cityId,IsFreeItem): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SubsubCategory/GetFreeItemsByBrandIds?cityId='+cityId +'&IsFreeItem='+IsFreeItem,brandIds);
  }

  GetAllBrands(CustomerId): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/ssitem/GetAllBrands?CustomerId='+CustomerId);
  }
  GetBrand(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubsubCategory/GetallBrandA7');
  }
  GetBrandidbyitem(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubsubCategory/GetBrandidbyitem?SubsubCategoryid='+id);
  }
  GetSPI(id,multimrpid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubsubCategory/SPI?brandid='+id + '&itemmultimrpid='+multimrpid);
  }
  GetPPI(id,multimrpid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubsubCategory/PPI?brandid='+id + '&itemmultimrpid='+multimrpid);
  }
}

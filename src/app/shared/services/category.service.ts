import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }


   GetAllNewCategory():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/ssitem/GetaLLCategoryBySubCategoryV1');
  }
   
  GetAllCategory():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Category');
  }
  GetSubCategory(id) :  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubCategory/GetSubCategoryByCategoryId?catID='+id);
  }

  GetAllCategoryv1(subcategoryId):  Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/ssitem/GetCategoryBySubCategory?subcategoryId='+subcategoryId);
  }

  GetAllCategoryV2(subcategoryId):  Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/ssitem/GetCategoryBySubCategory?subcategoryId='+subcategoryId);
  }
  GetByID(ID):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Category/GetByID?id='+ID);
  }
  addCategory(Category): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Category',Category);
  }
  addBaseCategory(Category): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Category',Category);
  }

  UpdateCategory(details): Observable<any> {
    
    // return this.http.put<any>(this.apiURL + '/api/Category/PUT' , details);
    return this.http.put<any>(this.apiURL + '/api/Category' , details);
  }
  DeleteCategory(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Category/DeleteV7?ID='+ ID);
  }
  
  UploadImage(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadCategoryImageV7',src);
  }

  UploadRDSImageV7(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadRDSImageV7',src);
  }
  UploadRDSBaseImageV7(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload',src);
  }
  selectedCategoryChanged(subsubcategoryId,subcategoryId):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ssitem/GetCategoryByBrand?subsubcategoryId=' + subsubcategoryId  + '&subCategoryId='+subcategoryId);
  }
}

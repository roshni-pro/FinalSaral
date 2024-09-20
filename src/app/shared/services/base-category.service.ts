import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseCategoryService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetAllBaseCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/BaseCategory');
  }
  getAllBaseCategoryList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/BaseCategory/GetBaseCategoryList');
  }
  GetAllCategoryImage(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CategoryImage');
  }
  getCategoryImage(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/CategoryImage/GetCategoryImage');
  }
  GetByID(ID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/BaseCategory/GetByID?ID=' + ID);
  }
  addBaseCategory(BaseCategory): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/BaseCategory', BaseCategory);
  }
  GetAllCategoryV(BaseCategoryId): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/usersroles/GetAllPagePermission' + BaseCategoryId);
  }
  EditBaseCategory(details): Observable<any> {
    // return this.http.put<any>(this.apiURL + '/api/BaseCategory/PUT' , details);
    return this.http.put<any>(this.apiURL + '/api/BaseCategory', details);
  }
  UpdateBaseCategory(details): Observable<any> {
    // return this.http.put<any>(this.apiURL + '/api/BaseCategory/PUT' , details);
    return this.http.put<any>(this.apiURL + '/api/BaseCategory/PUTV7', details);
  }
  DeleteBaseCategory(ID): Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/BaseCategory?ID='+ ID);
    return this.http.delete<any>(this.apiURL + '/api/BaseCategory/DeleteV7?ID=' + ID);

  }
  RemoveBaseCategory(ID): Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/BaseCategory?ID='+ ID);
    return this.http.delete<any>(this.apiURL + '/api/BaseCategory/?id=' + ID);

  }
  RemoveCategoryImage(ID): Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/BaseCategory?ID='+ ID);
    return this.http.delete<any>(this.apiURL + '/api/CategoryImage?id=' + ID);
    // return this.http.delete<any>(this.apiURL + '/api/CategoryImage/DeleteV7?id='+ ID);

  }

  UploadImageBase(src): Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/BaseCategory?ID='+ ID);
    return this.http.post<any>(this.apiURL + '/api/logoUpload', src);
  }

  UploadImage(src): Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/BaseCategory?ID='+ ID);
    return this.http.post<any>(this.apiURL + '/api/logoUpload', src);
  }
  AddCategory(details): Observable<any> {
    // return this.http.put<any>(this.apiURL + '/api/BaseCategory/PUT' , details);
    return this.http.post<any>(this.apiURL + '/api/CategoryImage/AddCategoryImage', details);
  }
  PutCategory(details): Observable<any> {
    // return this.http.put<any>(this.apiURL + '/api/BaseCategory/PUT' , details);
    return this.http.put<any>(this.apiURL + '/api/CategoryImage', details);
  }
}

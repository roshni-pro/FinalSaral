import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  apiURL: string;
  apiMediaURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;
  path: any;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
    this.apiMediaURL = environment.mediaURL;
  }

  GetAllSubCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubCategory/getallsubcategory');
  }

  GetByID(ID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubCategory/GetByID?ID=' + ID);
  }
  addSubCategory(SubCategory): Observable<any> {
    // return this.http.post<any>(this.apiURL + '/api/SubCategory/add', SubCategory);
    return this.http.post<any>(this.apiURL + '/api/SubCategory', SubCategory);
  }
  UpdateSubCategory(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/SubCategory', details);
  }
  DeleteSubCategory(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/SubCategory/DeleteV7?ID=' + ID);
  }
  UploadImage(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadSubCategoryImageV7', src);
  }

  StoreImageUpload(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/StoreImageUpload', src);
  }

  UploadVideo(src: any): Observable<any> {
    // let headers = new Headers();
    // // In Angular 5, including the header Content-Type can invalidate your request /
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');

    // const headers = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data',
    //   'Accept': 'application/json'
    // });

    // return this.http.post<any>(this.apiMediaURL + '/api/Video/UploadPermanent', src, { headers: headers });
    return this.http.post<any>(this.apiMediaURL + '/api/Video/UploadPermanent', src);
  }

  UploadImagge(src): Observable<any> {
    // return this.http.delete<any>(this.apiURL + '/api/BaseCategory?ID='+ ID);
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadSubSubCategoryImage', src);
  }

  UpdateMRPMedia(obj: any): Observable<any> {
    // http://localhost:26265/api/itemMaster/UpdateMRPMedia
    return this.http.post<any>(this.apiURL + '/api/itemMaster/UpdateMRPMedia', obj);
  }

  GetSubCategoryByCategoryId(categoryid): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubCategory/GetSubCategoryByCategoryId?catId=' + categoryid);
  }
  GetAllSeasonConfig(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/itemMaster/GetAllSeasonConfig');
  }
  GetSeasonIdByCatId(categoryid): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'api/PurchaseOrderNew/GetSeasonIdByCatId?CatId=' + categoryid);
  }

  // http://localhost:26265/api/itemMaster/UpdateMRPMedia

}

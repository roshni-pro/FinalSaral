import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class OrangebookversionService {

  apiURL: string;

  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  currentversion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrangeBook/GetOrangeBookVersion');
  }

  obversionlist(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrangeBook/GetOBVersionList');
  }
  obversionlistnew(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrangeBook/GetPeopleAcceptance');
  }

  obversionhistory(category,subcategory): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrangeBook/GetOBVersionHistory?catid=' + category + '&subcatid='+ subcategory);
  }
  OBCurrentVersion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrangeBook/GetOrangeBookActiveVersion');
  }
  OBversionData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/OrangeBook/GetOrangeBookVersionData');
  }

  updateversion(filepath, category, subcategory): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/OrangeBook/AddOrangeBookVersion?CategoryId=' + category + '&filepath=' + filepath + '&SubCategoryId=' + subcategory, null);
  }
  UploadImage(src, version): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadOrangeBookV7?version=' + version, src);

  }

  OBversionAcceptance(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrangeBook/GetOrangeBookVersionPeople');
  }

  AddODversionAcceptance(cat, subcat, ver): Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/OrangeBook/AddOrangeBookVersionAcceptance?cat=' + cat + '&subcat=' + subcat + '&version=' + ver, null);
  }

  NavbarNotification(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrangeBook/GetOrangeBookNotification');
  }

  GetCategories(): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/OrangeBook/GetOBCategory');
  }

  GetSubCategories(category): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/OrangeBook/GetOBSubCategory?categoryid=' + category);
  }

}

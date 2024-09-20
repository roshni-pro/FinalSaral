import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})

export class SupplierCategoryService {

  apiURL: string;
 // PeopleAll:any;
 User:any;


                                         
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
 
  GetSupplierCategory():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SupplierCategory');
  }

  SupplierCategoryGetByID(id):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SupplierCategory/?id=' + id);
  }


  UpdateArea(details):  Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/SupplierCategory', details);
  }
  // DeleteCountry(id): Observable<any> {
  //   return this.http.delete<any>(this.apiURL + '/api/Countries/Remove?id='+ id);
  // }

  addSupplierCategory(suppliercategoryservice):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SupplierCategory',suppliercategoryservice);
    }
  
  
  DeleteArea(SupplierCaegoryId):Observable<any> {
  return this.http.delete<any>(this.apiURL + '/api/SupplierCategory?id=' + SupplierCaegoryId);
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PagerDataV7 } from '../interface/pager-data-v7';

@Injectable({
  providedIn: 'root'
})
export class DistributerpriceService {
  apiURL:string;
  User:any;
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  // getallcategory(id: number): Observable<any[]> {
  //   
  //     return this.http.get<any[]>(this.apiURL + '/api/DistributorApp/GetCategory?warehouseid=' + id);
  //   }


    getallcategory(): Observable<any[]> {
      
        return this.http.get<any[]>(this.apiURL + '/api/Category');
      }

    
    getallSubcategory(catid: number): Observable<any[]> {
      
        return this.http.get<any[]>(this.apiURL + '/api/DistributorApp/GetSubCategory?catid=' + catid);
      }
   
      getallBrandcategory(catid: number,subcatid: number): Observable<any[]> {
        
          return this.http.get<any[]>(this.apiURL + '/api/DistributorApp/GetBrand?catid=' + catid + '&subcatid=' + subcatid ) ;
        }
        Search(searchitem:any): Observable<any> {
          
          // return this.http.post<any>(this.apiURL + '/api/DistributorApp/SearchDistributorItem',searchitem);
          return this.http.post<any>(this.apiURL + '/api/DistributorApp/SearchDistributorItemV7',searchitem);
       }
       
       getsave(itemupdate:any): Observable<any> {
        
        return this.http.post<any>(this.apiURL + '/api/DistributorApp/UpdateDistributionPrice/',itemupdate);
     }
     
}

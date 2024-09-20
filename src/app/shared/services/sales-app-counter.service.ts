import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalesAppCounterService {

  apiURL: string;  
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  
  getInitialPoint(warehouseID: number):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SalesAppCounter/GetInitialPoint/warehouseid/' + warehouseID);
  }

  getSalesInitialPoint(warehouseID: number):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SalesAppCounter/GetSalesInitialPoint/warehouseid/' + warehouseID);
  }

  getSalesPersonDetails(Keyword):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SalesAppCounter/GetSalesPersonDetails/' + Keyword);
  }

  getSalesPersonPoints(salesPersonId: number, fromDate: string, toDate: string){
    let url = '/api/SalesAppCounter/GetSalesPersonPoints/salesPersonId/{salesPersonId}/fromDate/{fromDate}/toDate/{toDate}';
    url = url.replace('{salesPersonId}', salesPersonId.toString());
    url = url.replace('{fromDate}', fromDate.toString());
    url = url.replace('{toDate}', toDate.toString());
    return this.http.get<any[]>(this.apiURL + url);
  }
  getSalesPersonPointsNew(salesPersonId: number, fromDate: string, toDate: string){
     
    let url = '/api/SalesAppCounter/GetSalesPersonPointsNew/salesPersonId/{salesPersonId}/fromDate/{fromDate}/toDate/{toDate}';
    url = url.replace('{salesPersonId}', salesPersonId.toString());
    url = url.replace('{fromDate}', fromDate.toString());
    url = url.replace('{toDate}', toDate.toString());
    return this.http.get<any[]>(this.apiURL + url);
  }
  permissions():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SalesAppCounter/Permissions' );
  }
  
}

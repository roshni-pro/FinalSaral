import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Gullakcashback } from '../interface/gullakcashback';

@Injectable({
  providedIn: 'root'
})
export class GullakService {
  apiURL: string; 
  User: any;
  comment: string;
  apiUrl: string;
  httpClient: any;
  tradeapiURL: any;
  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
    this.tradeapiURL = environment.tradeapiURL;
  }


  WarehouseGetByID(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
 }




 postdata(gullaccashback: Gullakcashback):  Observable<any> {
   
  return this.http.post<any>(this.apiURL + '/api/Gullak/saveGullak',gullaccashback);
  }
  
  postGullakdata(gullaccashback: Gullakcashback):  Observable<any> {
    
   return this.http.post<any>(this.apiURL + '/api/Gullak/SaveExtraGullak',gullaccashback);
   }
  
  updatedata(gullaccashback: Gullakcashback):  Observable<any> {
    
   return this.http.put<any>(this.apiURL + '/api/Gullak/update',gullaccashback);
   }

  GetTodayFlashDeal(WarehouseId:number,itemname:string,StartDate:any,EndDate:any):Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/Gullak/GetTodayFlashDeal?WarehouseId=' + WarehouseId + '&itemname=' + itemname + '&StartDate=' + StartDate + '&EndDate=' + EndDate);
  }
  Search(WarehouseId:any,StartDate:any,EndDate:any): Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Gullak/Search?warehouseid=' + WarehouseId + '&StartDate=' + StartDate + '&EndDate=' + EndDate);
 }
 
 getgullakActive(Id:string,IsActive:boolean): Observable<any[]> {
  
  let id = Number(Id);
  return this.http.get<any[]>(this.apiURL + '/api/Gullak/Activegullak?Id='+ id +'&IsActive='+ IsActive);
}
}

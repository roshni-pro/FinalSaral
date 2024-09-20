import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { Warehousevedio } from '../interface/warehousevedio';

@Injectable({
  providedIn: 'root'
})
export class WarehousevedioService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }


  

  postdata(warehousevedio: Warehousevedio):  Observable<any> {
    
   return this.http.post<any>(this.apiURL + '/api/RetailerApp/ManageWarehouseVideo',warehousevedio);
   }

   Search(WarehouseId:any,StartDate:any,EndDate:any): Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/RetailerApp/GetVideoWarehouse?warehouseId=' + WarehouseId + '&StartDate=' + StartDate +'&EndDate=' +EndDate );
 }

 
 vTData(TodayD:any): Observable<any> {
  
  return this.http.get<any>(this.apiURL + '/api/RetailerApp/GetVideo?TodayDate=' + TodayD );
}

Activideo(id,IsActive): Observable<any> {
  
  return this.http.get<any>(this.apiURL + '/api/RetailerApp/ActiveVideoDetails?id=' +id+'&IsActive='+IsActive);
}
//  Getdata(WarehouseId:any,TodayD:any): Observable<any> {
//   
//   return this.http.get<any>(this.apiURL + '/api/RetailerApp/GetVideoWarehouse?warehouseId?=' + WarehouseId + '&TodayDate=' + TodayD );
// }


// getVideoActive(Id:string,IsActive:boolean): Observable<any[]> {
//   
//   let id = Number(Id);
//   return this.http.get<any[]>(this.apiURL + '/api/Gullak/Activegullak?Id='+ id +'&IsActive='+ IsActive);
// }

}

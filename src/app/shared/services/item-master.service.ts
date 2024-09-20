import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {
  apiURL: string;  
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetItemM(WarehouseId):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'api/itemMaster/GetWarehouseItem?WarehouseId=' + WarehouseId);
  }
 GetMaster():  Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/itemMaster');
  }

  Get():  Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/itemMaster/Central');
    }
  
    GetCityId(Cityid,WarehouseId,Categoryid,SubCategoryId : number):  Observable<any> {
      return this.http.get<any>(this.apiURL + 'api/itemMaster?Cityid=' + Cityid + WarehouseId + Categoryid + SubCategoryId);
    }  

    GetItemMaster():  Observable<any[]> {
      return this.http.get<any[]>(this.apiURL + 'api/itemMaster');
    }

      GetByID(name: string):  Observable<any> {
        return this.http.get<any>(this.apiURL + 'api/StockReporting/GetByName/'+ name);
      }  
      UpdateArea(viewModel):  Observable<any> {
        return this.http.post<any>(this.apiURL + 'api/StockReporting/GetReport', viewModel);
      }
      DeleteArea(Id: number):Observable<any> {
      return this.http.delete<any>(this.apiURL + 'api/itemMaster/?id='+ Id);
    }

}

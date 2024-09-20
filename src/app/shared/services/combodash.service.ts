import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { ComboItemlist, Combo } from '../interface/combo';

@Injectable({
  providedIn: 'root'
})
export class CombodashService {

  apiURL: string;  
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  WarehouseGetByID():  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
  }

  getBylist(name:string ,warehouseid:any): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/ComboItem/getItem?name=' + name +'&warehouseid='+ warehouseid);
  }


  EditBylist(ComboName:any,Id:string): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/ComboItem/EditGetList?ComboName=' +ComboName +'&Id=' +Id);
  }

  updatelist(cs:Combo):  Observable<any> {
    
    return this.http.put<any>(this.apiURL + '/api/ComboItem/EditCombo',cs);
  }
  Postitem(comboDC:Combo):  Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/ComboItem/saveItem',comboDC);
    }
    GetItemList(): Observable<any[]> {
      
      return this.http.get<any[]>(this.apiURL + '/api/ComboItem/GetList');
    }
    uploadImage(ImageUrl): Observable<any> {
    
      return this.http.post<any>(this.apiURL + '/api/ComboItem/UploadcomboImage',ImageUrl);
    }
    getcomboActive(Id:string,IsActive:boolean): Observable<any[]> {
      
      return this.http.get<any[]>(this.apiURL + '/api/ComboItem/Activecombo?Id='+ Id +'&IsActive='+ IsActive);
    }
    getcomboPublish(Id:string,IsPublish:boolean): Observable<any[]> {
      
      return this.http.get<any[]>(this.apiURL + '/api/ComboItem/Publishcombo?Id='+ Id +'&IsPublish='+ IsPublish);
    }

    GetListforItem(Id:string): Observable<any[]> {
      
      return this.http.get<any[]>(this.apiURL + '/api/ComboItem/GetListforItem?Id='+ Id);
    }
    GetListItem(Id:string): Observable<any[]> {
      
      return this.http.get<any[]>(this.apiURL + '/api/ComboItem/GetListItem?Id='+ Id);
    }
    GetListforSearch(warehouseid): Observable<any[]> {
      
      return this.http.get<any[]>(this.apiURL + '/api/ComboItem/GetListforSearch?Warehouseid='+ warehouseid);
    }
    GetListforSearchComboName(ComboName): Observable<any[]> {
      
      return this.http.get<any[]>(this.apiURL + '/api/ComboItem/GetListforSearchComboName?ComboName='+ ComboName);
    }
    // RemoveItem(cs:Combo):  Observable<any> {
    //   
    //   return this.http.put<any>(this.apiURL + '/api/ComboItem/RemoveItem',cs);
    // }
}


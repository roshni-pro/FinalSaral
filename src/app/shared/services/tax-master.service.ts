import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class TaxMasterService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
   
  GetAllTaxMaster():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TaxMaster');
  }
  
  GetByID(ID):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TaxMaster/GetByID?ID='+ID);
  }
  addTaxMaster(TaxMaster): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TaxMaster', TaxMaster);
  }

  UpdateTaxMaster(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/TaxMaster' , details);
  }
  // PutTaxMaster(): Observable<any> {
  //   return this.http.put<any>(this.apiURL + '/api/TaxMaster' , null);
  // }

  DeleteTaxMaster(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/TaxMaster/DeleteV7?ID='+ ID);
  }
  DeleteTaxMasters(TaxID): Observable<any> {
    return this.http.delete<any>(this.apiURL + 'api/TaxMaster/DeleteV7?id='+ TaxID);
  }

}

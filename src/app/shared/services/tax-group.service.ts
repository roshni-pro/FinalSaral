import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxGroupService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
   
  GetAllTaxGroup():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TaxGroup');
  }
  GetAllTaxMaster():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TaxMaster');
  }
  GetByID(ID):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TaxGroup/GetByID?ID='+ID);
  }
  addTaxGroup(TaxGroup): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TaxGroup', TaxGroup);
  }
  PutTax(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/TaxGroup' , details);
  }
  
  

  // UpdateTaxGroup(details): Observable<any> {
  //   return this.http.put<any>(this.apiURL + '/api/TaxGroup/PUT' , details);
  // }
  DeleteTaxGroup(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/TaxGroup/DeleteV7?id='+ ID);
  }
  DeleteTax(GruopID): Observable<any> {
    return this.http.delete<any>(this.apiURL + 'api/TaxGroup/DeleteV7?id='+ GruopID);
  }
  
  addTaxGroupDetail(TaxGroupDetail): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/TaxGroupDetails', TaxGroupDetail);
  }


}

import { Injectable, DebugElement } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
   
  GetAllAgent():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Agents');
  }
  // GetAllTaxGroup():  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/Agent');
  // }
  GetByID(ID):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Agents/GetAgentOrderData?AgentCode='+ID + '&&list='+30 +'&&page='+1) ;
  }
  addAgent(dboy): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Agents', dboy);
  }

  UpdateAgent(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Agents' , details);
  }
  DeleteAgent(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Agents?id='+ ID);
  }

  // kishandans(customerid: number,langs: string,wids:number): Observable<any> {
  //   
  //   return this.http.get<any>(this.apiURL + '/api/KishanDan/GetKishan?Customerid=' + customerid + '&eng='+ langs + '&wid=' + wids); 
  // }

  kishandans(customerid: number,lang: string,wids:number):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/KishanDan/GetKishan?warehouseid=' + wids + '&lang='+ lang + '&Customerid=' +customerid ); 
  }
}

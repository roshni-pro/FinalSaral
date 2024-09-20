import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AgentcomissionsetcitywiseService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
 
                                          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
 
  GetAllCity():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City');
  }
  
addagentcomissioncitywise(CityWiseActivationConfiguration:any):Observable<any> {
  
  console.log(this.apiURL)
  return this.http.post<any>(this.apiURL + '/api/AgentCommission/CityWiseActivationConfiguration',CityWiseActivationConfiguration);
  } 


  Getagentcommissioncitywise():Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/AgentCommission/Getagentcommissioncitywise');
  }


  GetTotalCommision():Observable<any[]>{
    
    return this.http.get<any[]>(this.apiURL + '/api/AgentCommission/Getagenttotalcommission');
  }
  
  GetAllCustomer(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Customers');
  }

  Deleteagentcommission(id): Observable<any> {
    
    return this.http.delete<any>(this.apiURL + '/api/AgentCommission/DeleteDetails?id=' +id);
  }
  SearchAllAgentData(CityId,FromDate,ToDate):Observable<any>{
    
    return this.http.get<any>(this.apiURL +'/api/AgentCommission/getagentcomissionsetforcitydata?CityId=' + CityId + '&FromDate=' + FromDate + '&ToDate='+ ToDate);
  }
  exportAgentcommissioncitywise():Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/AgentCommission/exportAgentcommissionCityWise');
  }
  exportStockwise(id):Observable<any>{
    return this.http.post<any>(this.apiURL + '/api/damagestock/GetDamageHistoryAll?WarehouseId=' +id, '');
  }
  Activeagentcommission(id): Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/AgentCommission/ActiveDetails?id=' +id);
  }
}
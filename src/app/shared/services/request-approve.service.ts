import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class RequestApproveService {
  apiURL: string;
 
  User:any;
  comment : string;
  constructor(private http: HttpClient) {

    this.apiURL = environment.apiURL;
   }
   GetOwnRequests():Observable<any[]>{

    return this.http.get<any[]>(this.apiURL + '/api/RolePagePermission/GetOwnRequests');

  }

  GetRequests():Observable<any[]>{

    return this.http.get<any[]>(this.apiURL + '/api/RolePagePermission/GetPendingRequest');

  }
  GetRequestsUAC():Observable<any[]>{

    return this.http.get<any[]>(this.apiURL + '/api/RolePagePermission/GetPendingRequestForUAC');

  }
  UpdateStatus(data):Observable<any>{

    return this.http.put<any>(this.apiURL + '/api/RolePagePermission/UpdateStatus',data);

  }
  RejectByHead(data):Observable<any>{

    return this.http.put<any>(this.apiURL + '/api/RolePagePermission/RejectByHead',data);

  }
  UpdateStatusUAC(data):Observable<any>{

    return this.http.put<any>(this.apiURL + '/api/RolePagePermission/UpdateStatusbyUAC',data);

  }
   
  RejectByUAC(data):Observable<any>{

    return this.http.put<any>(this.apiURL + '/api/RolePagePermission/RejectByUAC',data);

  }

  showpages(id):Observable<any[]>{

    return this.http.get<any[]>(this.apiURL + '/api/RolePagePermission/GetPageRequests?ReqId= '+ id);

  }

}
